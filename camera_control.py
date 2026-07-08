# -*- coding: utf-8 -*-
"""
라쿤봇(RaccoonBot) 카메라 제어 프로그램 (조종 박스 확장 및 Clamping 부드러운 제어 버전)
=======================================================================
작성자: Antigravity AI Assistant
목적: 웹캠 화면에 직관적인 조종 가이드 박스를 시각화하고, 배경 차단 수준 및 카메라 장치 채널을
      실시간으로 조작하여 라쿤봇을 안전하고 편리하게 3D 제어할 수 있는 교육용 프로그램입니다.
기능:
  1. 조종 영역(Control Box) 확대 및 하단 배치:
     - 책상 위에 손을 편하게 둔 상태에서도 감지되도록 화면 전역인 x:20~620, y:70~460 영역으로 최대 확장
  2. 경계 이탈 시 끊김 없는 Clamping 제어:
     - 가이드 박스 밖으로 손이 나가도 조작이 끊기지(Hold) 않고, 가동 범위 한계점에 고정된 채 부드럽게 조종 유지
     - `in_box` 제약 조건 제거 및 Y/Z축 상대 매핑 비율에 Clamping(0.0 ~ 1.0) 보정 적용
  3. 실시간 카메라 채널 선택 (CAM SELECT) 지원:
     - HUD 하단에 [CAM SELECT] 버튼 탑재. 마우스 클릭 시 0 -> 1 -> 2번 카메라로 즉시 핫스왑 전환
     - 전환 실패 시 기존에 잘 나오던 카메라 채널로 안전하게 자동 복구(Fallback) 처리
  4. 다중 웹캠 장치 자동 순회 탐색 (0 -> 1 -> 2번 순차 접근으로 최초 연결 안전성 보장)
  5. 프레임 캡처 실패 시 무부하 딜레이 (0.2초 sleep 추가하여 무한 루프로 인한 CPU 폭주 방지)
  6. 배경 숨김 모드 (BG MODE) 실시간 전환 지원:
     - [BG MODE] HUD 버튼을 추가하여 SPOTLIGHT(배경 15%), BLACK(배경 0%), ORIGINAL(배경 100%) 실시간 토글
  7. 미세 진동 차단 및 스무딩:
     - EMA 필터와 3mm 데드존 필터 적용
  8. 두 손 손가락 제스처 기반 3D + 그리퍼 제어:
     - 오른손: 엄지-검지 간격 = X축(앞/뒤), 중지 화면 높이 = Z축(위/아래)
     - 왼손  : 엄지-검지 간격 = Y축(좌우),   중지 펴기/굽히기 = 그리퍼 열기/닫기
     - 엄지-검지 간격은 손바닥 크기로 정규화하여 카메라와의 거리에 무관하게 동작
     - 감지되지 않은 손이 담당하는 축은 직전 값을 유지(Hold)
  9. 6가지 그래픽 버튼 구성 (START/PAUSE, SPEED, SENS, BG MODE, CAM SELECT, RESET HOME)
"""

import cv2
import numpy as np
import math
import time
import sys
import threading
import ctypes

# =============================================================================
# 0. 기능 활성화 스위치
# =============================================================================
# 손 동작(모션) 인식 기능을 영구적으로 끄려면 False로 둡니다.
# False이면 Mediapipe Hands 모델을 초기화하지 않고, 카메라 프리뷰와
# 마우스 HUD 버튼(속도/민감도/배경/카메라 전환/홈 복귀)만 동작합니다.
ENABLE_HAND_TRACKING = True

# 손 추적이 꺼져 있으면 mediapipe가 설치되지 않은 PC에서도 실행 가능하도록 조건부 import
if ENABLE_HAND_TRACKING:
    import mediapipe as mp

# 로보메이션 로봇 제어 라이브러리 가져오기
try:
    from roboid import *
    ROBOID_AVAILABLE = True
except ImportError:
    ROBOID_AVAILABLE = False
    print("[경고] roboid 라이브러리를 로드할 수 없습니다. 시뮬레이션 모드로 작동합니다.")

# =============================================================================
# 1. 제어 파라미터 및 안전 제한 설정 (단위: cm)
# =============================================================================
# 라쿤봇 안전 가동 범위 설정 (cm 단위)
LIMIT_X_MIN, LIMIT_X_MAX = 10.0, 20.0   # 앞 / 뒤 이동 범위 (단위: cm)
LIMIT_Y_MIN, LIMIT_Y_MAX = -15.0, 15.0 # 좌 / 우 이동 범위 (단위: cm)
LIMIT_Z_MIN, LIMIT_Z_MAX = 5.0, 20.0   # 위 / 아래 이동 범위 (단위: cm) (바닥 충돌 보호)

# 속도 프리셋 목록 (LOW: 50, MID: 100, HIGH: 150)
SPEED_PRESETS = [50, 100, 150]
SPEED_LABELS = ["LOW", "MID", "HIGH"]
current_speed_idx = 1  # 기본값: MID (100)

# 민감도(전체 움직임 배율) 프리셋 목록 (LOW: 0.6x, MID: 1.0x, HIGH: 1.4x)
SENS_PRESETS = [0.6, 1.0, 1.4]
SENS_LABELS = ["LOW (0.6x)", "MID (1.0x)", "HIGH (1.4x)"]
current_sens_idx = 1  # 기본값: MID (1.0x)

# 배경 숨김 모드 목록 (SPOTLIGHT: 85% 어둡게, BLACK: 100% 차단, ORIGINAL: 원본 프레임)
BG_MODES = ["SPOTLIGHT", "BLACK", "ORIGINAL"]
current_bg_idx = 0  # 기본값: SPOTLIGHT

# 스무딩 필터 계수 (Exponential Moving Average)
# 값이 너무 낮으면 목표 좌표를 뒤늦게 쫓아가 "반응이 느림"으로 체감됨
FILTER_ALPHA = 0.35

# 제어 명령 전송 주기 제한 (단위: 초)
# 주기가 길면 로봇이 이전 목표에 도달해 멈춘 뒤 다음 명령을 기다리게 되어
# "뚝뚝 끊기는" 동작으로 체감됨. 카메라 프레임(약 30fps)에 맞춰 더 자주 전송.
SEND_INTERVAL = 0.03

# 미세 진동 방지용 좌표 변화 임계값 (단위: cm)
# 전송 주기가 짧아져 프레임당 이동 거리가 작아지므로 임계값도 함께 낮춤
DELTA_THRESHOLD = 0.12

# =============================================================================
# 2. 조종 가이드 영역 (Control Zone Box) 좌표 설정 (640x480 화면 하단/중앙 배치)
# =============================================================================
# 640x480 프레임 안에서 헤더(상단 60px)와 버튼 패널을 피해 최대로 확장 (기존 400x320 대비 약 1.8배 면적)
BOX_X_MIN, BOX_X_MAX = 20, 620  # 가로 600px 크기로 최대 확장
BOX_Y_MIN, BOX_Y_MAX = 70, 460  # 세로 390px 크기로 최대 확장

# =============================================================================
# 3. 전역 상태 제어 변수
# =============================================================================
is_paused = False             # 조종 통신 일시 정지 여부
request_home_reset = False    # 홈 위치 복귀 요청 플래그
current_gripper_state = 1     # 0: 닫힘, 1: 열림 (초기값: 열림)
last_send_time = time.time()  # 마지막 명령 발송 시각

# 마지막으로 전송된 좌표 기록 (미세 진동 차단용)
last_sent_x = 15.0
last_sent_y = 0.0
last_sent_z = 12.0

# 보간된(부드러워진) 현재 로봇 좌표 초기값 설정 (가동 범위의 중심)
smooth_x = 15.0
smooth_y = 0.0
smooth_z = 12.0

# =============================================================================
# 4. 실시간 카메라 전환(핫스왑) 함수 및 전역 카메라 변수
# =============================================================================
cap = None
current_cam_idx = 0

# Windows에서는 DirectShow 백엔드가 기본(MSMF)보다 장치 열기와 핫스왑이 빠르고 안정적임
CAP_BACKEND = cv2.CAP_DSHOW if sys.platform == "win32" else cv2.CAP_ANY

def open_capture(idx):
    """지정 인덱스의 카메라를 열고 640x480으로 설정합니다. 실패 시 None을 반환합니다."""
    temp_cap = cv2.VideoCapture(idx, CAP_BACKEND)
    if temp_cap.isOpened():
        temp_cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        temp_cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        return temp_cap
    temp_cap.release()
    return None

def change_camera(idx):
    """
    실시간으로 비디오 스트림을 해제하고 지정된 인덱스의 카메라를 연결합니다.
    연결에 실패할 경우, 이전 활성 카메라 인덱스로 복구(Fallback)하여 프로그램의 중단을 방지합니다.
    """
    global cap, current_cam_idx
    prev_idx = current_cam_idx

    # 기존 카메라 연결 해제
    if cap is not None:
        cap.release()

    print(f"[정보] {idx}번 카메라 장치 연결을 새로 시도합니다...")
    new_cap = open_capture(idx)

    if new_cap is not None:
        cap = new_cap
        current_cam_idx = idx
        print(f"[성공] {idx}번 카메라로 정상 전환되었습니다.")
        return True

    print(f"[오류] {idx}번 카메라 연결에 실패했습니다. 기존 {prev_idx}번 카메라로 안전 복구합니다.")
    # Fallback: 이전 카메라 장치로 재연결
    cap = open_capture(prev_idx)
    if cap is None:
        # 복구조차 실패하면 루프가 종료되므로 원인을 명확히 알림
        print(f"[치명적 오류] 기존 {prev_idx}번 카메라 복구에도 실패했습니다. 프로그램을 종료합니다.")
        cap = cv2.VideoCapture()  # isOpened()가 False인 빈 객체로 루프 안전 종료 유도
    return False

# =============================================================================
# 4.5 전체 화면 표시 설정 (레터박스 스케일링 + 마우스 좌표 역매핑)
# =============================================================================
is_fullscreen = True  # 시작 시 전체 화면으로 표시 ('F' 키로 창 모드 전환 가능)

# 모니터 해상도 조회 (Windows). 고DPI 배율 환경에서 실제 픽셀 크기를 얻도록 DPI 인식 설정
try:
    ctypes.windll.user32.SetProcessDPIAware()
    SCREEN_W = ctypes.windll.user32.GetSystemMetrics(0)
    SCREEN_H = ctypes.windll.user32.GetSystemMetrics(1)
except Exception:
    SCREEN_W, SCREEN_H = 1920, 1080

display_scale = 1.0
display_off_x = 0
display_off_y = 0

def update_display_mapping():
    """전체 화면 여부에 따라 640x480 캔버스 -> 화면 표시 좌표 변환 파라미터를 갱신합니다."""
    global display_scale, display_off_x, display_off_y
    if is_fullscreen:
        # 4:3 비율을 유지한 채 화면에 맞는 최대 배율 (남는 영역은 검은 여백)
        display_scale = min(SCREEN_W / 640.0, SCREEN_H / 480.0)
        display_off_x = int((SCREEN_W - 640 * display_scale) / 2)
        display_off_y = int((SCREEN_H - 480 * display_scale) / 2)
    else:
        display_scale = 1.0
        display_off_x = 0
        display_off_y = 0

# =============================================================================
# 5. 마우스 클릭 이벤트 핸들러 (HUD 버튼 6개 클릭 감지)
# =============================================================================
clicked_button_idx = -1
click_feedback_time = 0.0

def mouse_callback(event, x, y, flags, param):
    global is_paused, current_speed_idx, current_sens_idx, current_bg_idx, request_home_reset, current_cam_idx
    global clicked_button_idx, click_feedback_time

    if event == cv2.EVENT_LBUTTONDOWN:
        # 전체 화면(확대) 표시 좌표를 원본 640x480 캔버스 좌표로 역변환
        x = int((x - display_off_x) / display_scale)
        y = int((y - display_off_y) / display_scale)
        # 하단 버튼 영역 Y축 범위: 415 ~ 455
        if 415 <= y <= 455:
            # 1. PAUSE / START 버튼 클릭 (x: 8 ~ 103)
            if 8 <= x <= 103:
                is_paused = not is_paused
                clicked_button_idx = 0
                click_feedback_time = time.time()
                print(f"[HUD 버튼] 조종 모드 전환 -> {'일시 정지(PAUSED)' if is_paused else '조종 시작(ACTIVE)'}")
                
            # 2. SPEED 조절 버튼 클릭 (x: 111 ~ 206)
            elif 111 <= x <= 206:
                current_speed_idx = (current_speed_idx + 1) % len(SPEED_PRESETS)
                clicked_button_idx = 1
                click_feedback_time = time.time()
                print(f"[HUD 버튼] 로봇 이동 속도 설정 -> {SPEED_LABELS[current_speed_idx]} ({SPEED_PRESETS[current_speed_idx]})")
                
            # 3. SENS 민감도 조절 버튼 클릭 (x: 214 ~ 309)
            elif 214 <= x <= 309:
                current_sens_idx = (current_sens_idx + 1) % len(SENS_PRESETS)
                clicked_button_idx = 2
                click_feedback_time = time.time()
                print(f"[HUD 버튼] 움직임 민감도(배율) 설정 -> {SENS_LABELS[current_sens_idx]}")
                
            # 4. BG MODE 조절 버튼 클릭 (x: 317 ~ 412)
            elif 317 <= x <= 412:
                current_bg_idx = (current_bg_idx + 1) % len(BG_MODES)
                clicked_button_idx = 3
                click_feedback_time = time.time()
                print(f"[HUD 버튼] 배경 차단 모드 설정 -> {BG_MODES[current_bg_idx]}")
                
            # 5. CAM SELECT 조절 버튼 클릭 (x: 420 ~ 515)
            elif 420 <= x <= 515:
                clicked_button_idx = 4
                click_feedback_time = time.time()
                # 0, 1, 2 순환하며 카메라 전환 시도. 바로 다음 채널이 없으면(예: 1번 미장착)
                # 그 다음 채널(2번)까지 순차 시도하여 모든 카메라에 도달 가능하도록 함
                switched = False
                for step in (1, 2):
                    next_cam_idx = (current_cam_idx + step) % 3
                    if next_cam_idx == current_cam_idx:
                        continue
                    if change_camera(next_cam_idx):
                        print(f"[HUD 버튼] 카메라 채널 핫스왑 완료 -> CAM {next_cam_idx}")
                        switched = True
                        break
                if not switched:
                    print(f"[HUD 버튼] 다른 카메라 채널을 찾지 못함 -> 기존 CAM {current_cam_idx} 유지")
                
            # 6. RESET HOME 버튼 클릭 (x: 523 ~ 632)
            elif 523 <= x <= 632:
                request_home_reset = True
                clicked_button_idx = 5
                click_feedback_time = time.time()
                print("[HUD 버튼] 로봇 안전 홈 위치 복귀 요청 발송")

# =============================================================================
# 6. 하드웨어 연결 및 라이브러리 초기화
# =============================================================================
raccoon = None
is_robot_connected = False

# 로봇(USB-BLE 동글) 미연결 시 wait_until_ready()가 무한 대기하여 카메라 화면조차
# 뜨지 않는 문제 방지: 연결을 백그라운드 스레드에서 시도하고 제한 시간만 기다린다.
ROBOT_CONNECT_TIMEOUT = 8.0  # 초

if ROBOID_AVAILABLE:
    def _connect_robot():
        global raccoon, is_robot_connected
        try:
            print("[정보] 라쿤봇 하드웨어 연결을 시도합니다...")
            robot = Raccoon()
            wait_until_ready()
            robot.lock_horz()    # 말단 장치 수평 잠금
            robot.open_gripper() # 그리퍼 초기 열기
            raccoon = robot
            is_robot_connected = True
            print("[성공] 라쿤봇이 정상 연결되었습니다.")
        except Exception as e:
            print(f"[오류] 라쿤봇 연결 실패: {e}")
            print("[정보] 시뮬레이션 모드로 작동을 시작합니다.")

    _connect_thread = threading.Thread(target=_connect_robot, daemon=True)
    _connect_thread.start()
    _connect_thread.join(ROBOT_CONNECT_TIMEOUT)
    if not is_robot_connected:
        print(f"[정보] {ROBOT_CONNECT_TIMEOUT:.0f}초 내에 로봇을 찾지 못해 시뮬레이션 모드로 시작합니다."
              " (이후 연결되면 자동으로 CONNECTED 상태로 전환됩니다.)")
else:
    print("[정보] 시뮬레이션 모드로 작동을 시작합니다.")

# =============================================================================
# 7. Mediapipe 및 OpenCV 환경 구축 (다중 웹캠 자동 탐색 포함)
# =============================================================================
if ENABLE_HAND_TRACKING:
    mp_hands = mp.solutions.hands
    mp_drawing = mp.solutions.drawing_utils
    hands = mp_hands.Hands(
        max_num_hands=2,
        min_detection_confidence=0.75,
        min_tracking_confidence=0.7
    )
else:
    mp_hands = None
    mp_drawing = None
    hands = None
    print("[정보] 모션 인식(손 동작 인식) 기능이 비활성화되어 있습니다. 카메라 프리뷰와 HUD 버튼만 동작합니다.")

# 다중 카메라 인덱스 자동 검색 시도 (0번 -> 1번 -> 2번)
for cam_idx in range(3):
    print(f"[정보] {cam_idx}번 카메라 장치 연결을 시도합니다...")
    temp_cap = open_capture(cam_idx)
    if temp_cap is not None:
        cap = temp_cap
        current_cam_idx = cam_idx
        print(f"[성공] {cam_idx}번 카메라 장치가 활성화되었습니다.")
        break

if cap is None or not cap.isOpened():
    print("[치명적 오류] 사용 가능한 카메라 장치(0, 1, 2)를 찾을 수 없거나 활성화할 수 없습니다.")
    if is_robot_connected and raccoon:
        raccoon.stop()
        raccoon.dispose()
    sys.exit()

# 창 생성 및 마우스 이벤트 바인딩 (기본: 전체 화면)
window_name = "RaccoonBot HUD Interface"
cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
if is_fullscreen:
    cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
else:
    cv2.resizeWindow(window_name, 640, 480)
update_display_mapping()
cv2.setMouseCallback(window_name, mouse_callback)

# 외부 런처(Electron)에서 stdin으로 "STOP"을 보내면 안전 종료 절차를 밟도록 감시 스레드 가동
# (강제 kill 시 로봇 안전 정지 코드가 실행되지 못하는 문제 방지)
stop_requested = False

def _stdin_watcher():
    global stop_requested
    if sys.stdin is None:
        return
    try:
        for line in sys.stdin:
            if line.strip().upper() == "STOP":
                break
    except Exception:
        pass
    # STOP 수신 또는 stdin EOF(런처 프로세스 종료) 시 모두 안전 종료
    stop_requested = True

threading.Thread(target=_stdin_watcher, daemon=True).start()

# 프레임 레이트(FPS) 계산용
prev_frame_time = 0
fps = 0

print("\n=======================================================")
print("  라쿤봇 카메라 가이드라인 및 화면 조정 프로그램이 시작됩니다.")
print("  - 화면 [가이드 박스] 범위가 600x390으로 최대 확장되었습니다.")
# 끊김 현상 제거 설명 추가
print("  - 가이드 박스를 이탈하더라도 조작이 끊기지 않고 부드럽게 한계점에 유지됩니다.")
print("  - 하단 [BACKGROUND] 버튼으로 배경의 차단 강도를 조작할 수 있습니다.")
print("  - 하단 [CAM SELECT] 버튼으로 카메라 채널을 실시간 전환 가능합니다.")
print("  - 두 손 제어 매핑:")
print("      오른손: 엄지-검지 간격 = 앞/뒤(X), 중지 높이 = 위/아래(Z)")
print("      왼손  : 엄지-검지 간격 = 좌/우(Y), 중지 펴기/굽히기 = 그리퍼 열기/닫기")
print("  - 전체 화면으로 시작합니다. 'F' 키로 전체 화면/창 모드를 전환할 수 있습니다.")
print("  - 종료 키: 'q' 또는 'ESC'")
print("=======================================================\n")

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        # 카메라 프레임 수신 실패 시 폭주 방지를 위해 0.2초 딜레이
        print("[경고] 카메라 프레임을 가져올 수 없습니다. 0.2초 대기 후 재시도합니다.")
        time.sleep(0.2)
        continue

    # 카메라 입력을 직관적인 조종 환경을 위해 좌우 반전(미러링) 처리
    frame = cv2.flip(frame, 1)
    frame = cv2.resize(frame, (640, 480))
    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(image_rgb) if ENABLE_HAND_TRACKING else None

    # ---------------------------------------------------------------------
    # 설정된 배경 차단 모드에 맞는 가상 배경 캔버스 생성
    # ---------------------------------------------------------------------
    current_bg_mode = BG_MODES[current_bg_idx]
    
    if current_bg_mode == "BLACK":
        # 완전 차단: 배경을 검은색 단색으로 채움
        bg_frame = np.zeros((480, 640, 3), dtype=np.uint8)
    elif current_bg_mode == "SPOTLIGHT":
        # 스포트라이트: 배경 밝기를 15% 수준으로 강하게 감소시킴
        bg_frame = cv2.convertScaleAbs(frame, alpha=0.15, beta=0)
    else:
        # ORIGINAL: 배경 그대로 표시
        bg_frame = frame.copy()

    canvas = bg_frame.copy()

    hand_detected = False
    in_box = False
    finger_count = 0
    num_hands = 0
    right_detected = False
    left_detected = False
    left_mid_up = None        # 왼손 중지 펴짐 여부 (그리퍼 판정용)
    right_pinch_pts = None    # 오른손 엄지-검지 (X축 시각화)
    left_pinch_pts = None     # 왼손 엄지-검지 (Y축 시각화)
    right_mid_px = None       # 오른손 중지 끝 (Z축 시각화)
    left_mid_px = None        # 왼손 중지 끝 (그리퍼 시각화)
    raw_x, raw_y, raw_z = smooth_x, smooth_y, smooth_z

    if results and results.multi_hand_landmarks:
        hand_detected = True
        hand_list = results.multi_hand_landmarks
        handedness_list = results.multi_handedness
        num_hands = len(hand_list)

        # ---------------------------------------------------------------------
        # A. 손가락 관절 뼈대선 렌더링 + 손 영역 마스크 생성 (감지된 모든 손 처리)
        # ---------------------------------------------------------------------
        frame_with_skeleton = frame.copy()
        mask = np.zeros((480, 640), dtype=np.uint8)

        for hand_landmarks in hand_list:
            mp_drawing.draw_landmarks(
                frame_with_skeleton,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=4), # 관절 녹색
                mp_drawing.DrawingSpec(color=(255, 255, 0), thickness=2, circle_radius=1) # 뼈대 노란색
            )

            # 손 영역 다각형(Convex Hull)을 구하여 마스크에 누적
            hand_pixel_points = []
            for lm in hand_landmarks.landmark:
                px = max(0, min(639, int(lm.x * 640)))
                py = max(0, min(479, int(lm.y * 480)))
                hand_pixel_points.append([px, py])
            hull = cv2.convexHull(np.array(hand_pixel_points, dtype=np.int32))
            cv2.drawContours(mask, [hull], -1, 255, -1)

        # 손 외곽선이 칼같이 잘리지 않도록 40x40 커널로 여유 있게 마스크 팽창
        dilation_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (40, 40))
        mask = cv2.dilate(mask, dilation_kernel, iterations=1)

        # ---------------------------------------------------------------------
        # A-2. 좌/우 손 식별 (frame을 미리 좌우 반전했으므로 라벨이 실제 손과 일치)
        #  - 오른손: 엄지-검지 간격 = X축(앞/뒤),  중지 높이 = Z축(위/아래)
        #  - 왼손  : 엄지-검지 간격 = Y축(좌우),    중지 올림/내림 = 그리퍼
        #  - 감지되지 않은 손이 담당하는 축은 직전 값을 유지(Hold)
        # ---------------------------------------------------------------------
        right_lm = None
        left_lm = None
        for i, hd in enumerate(handedness_list):
            label = hd.classification[0].label
            if label == "Right" and right_lm is None:
                right_lm = hand_list[i].landmark
            elif label == "Left" and left_lm is None:
                left_lm = hand_list[i].landmark

        sens_scale = SENS_PRESETS[current_sens_idx]  # 현재 민감도 배율

        def _pinch_ratio(lm):
            # 엄지(4)-검지(8) 간격을 손바닥 크기(손목0-새끼MCP17)로 정규화 -> 카메라 거리 무관
            palm = math.hypot(lm[0].x - lm[17].x, lm[0].y - lm[17].y)
            if palm < 1e-6:
                return 0.0
            return math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y) / palm

        z_center = (LIMIT_Z_MIN + LIMIT_Z_MAX) / 2.0  # 12.5cm
        z_range = LIMIT_Z_MAX - LIMIT_Z_MIN           # 15.0cm 가동 폭

        # ----- 오른손: X축(엄지-검지 간격) + Z축(중지 화면 높이) -----
        if right_lm is not None:
            right_detected = True
            right_pinch_pts = (
                (int(right_lm[4].x * 640), int(right_lm[4].y * 480)),
                (int(right_lm[8].x * 640), int(right_lm[8].y * 480)),
            )
            # X: 벌림 비율 0.3(오므림)~1.1(활짝) -> 뒤(10cm)~앞(20cm)
            t_x = max(0.0, min(1.0, (_pinch_ratio(right_lm) - 0.3) / (1.1 - 0.3)))
            raw_x = 15.0 + (t_x - 0.5) * (LIMIT_X_MAX - LIMIT_X_MIN) * sens_scale

            # Z: 오른손 중지 끝(12)의 화면 세로 위치 -> 위(20cm)~아래(5cm)
            mid_y_px = right_lm[12].y * 480
            right_mid_px = (int(right_lm[12].x * 640), int(mid_y_px))
            t_z = max(0.0, min(1.0, (mid_y_px - BOX_Y_MIN) / (BOX_Y_MAX - BOX_Y_MIN)))
            raw_z = z_center + (0.5 - t_z) * z_range * sens_scale
            in_box = (BOX_Y_MIN <= mid_y_px <= BOX_Y_MAX)

        # ----- 왼손: Y축(엄지-검지 간격) + 그리퍼(중지 올림/내림) -----
        if left_lm is not None:
            left_detected = True
            left_pinch_pts = (
                (int(left_lm[4].x * 640), int(left_lm[4].y * 480)),
                (int(left_lm[8].x * 640), int(left_lm[8].y * 480)),
            )
            # Y: 벌림 비율 0.3~1.1 -> 우(-15cm)~좌(+15cm)
            t_y = max(0.0, min(1.0, (_pinch_ratio(left_lm) - 0.3) / (1.1 - 0.3)))
            raw_y = (t_y - 0.5) * 2.0 * LIMIT_Y_MAX * sens_scale

            # 그리퍼: 왼손 중지(12)가 펴짐(위) = 열림 / 굽힘(아래) = 닫힘
            left_mid_px = (int(left_lm[12].x * 640), int(left_lm[12].y * 480))
            left_mid_up = left_lm[12].y < left_lm[10].y
            # 표시용: 왼손에서 펴진 손가락 수(엄지 제외)
            finger_count = sum([
                left_lm[8].y < left_lm[6].y,
                left_lm[12].y < left_lm[10].y,
                left_lm[16].y < left_lm[14].y,
                left_lm[20].y < left_lm[18].y,
            ])

        # ---------------------------------------------------------------------
        # C. 누끼 합성 적용 (배경 모드가 ORIGINAL이 아닐 때만 캔버스에 덮어씀)
        # ---------------------------------------------------------------------
        if current_bg_mode in ["BLACK", "SPOTLIGHT"]:
            mask_3ch = cv2.merge([mask, mask, mask])
            canvas = np.where(mask_3ch == 255, frame_with_skeleton, bg_frame)
        else:
            canvas = frame_with_skeleton.copy()

        # 안전 구역 Clamping 처리
        raw_x = max(LIMIT_X_MIN, min(LIMIT_X_MAX, raw_x))
        raw_y = max(LIMIT_Y_MIN, min(LIMIT_Y_MAX, raw_y))
        raw_z = max(LIMIT_Z_MIN, min(LIMIT_Z_MAX, raw_z))

        # 지수 이동 평균(EMA) 필터로 부드럽게 감속 보정 (일시정지 아닐 때 항시 실행)
        if not is_paused:
            smooth_x = FILTER_ALPHA * raw_x + (1 - FILTER_ALPHA) * smooth_x
            smooth_y = FILTER_ALPHA * raw_y + (1 - FILTER_ALPHA) * smooth_y
            smooth_z = FILTER_ALPHA * raw_z + (1 - FILTER_ALPHA) * smooth_z

        # ---------------------------------------------------------------------
        # F. 로봇 제어 신호 송출 제어 (이탈 시 정지 제약을 없애고 전송 주기 및 데드존만 충족하면 상시 전송)
        # ---------------------------------------------------------------------
        current_time = time.time()

        # 송신 주기가 충족되었고 일시정지 상태가 아닐 때 좌표 전송
        # (홈 복귀 요청은 손 감지 여부와 무관하게 루프 하단의 공통 블록에서 처리)
        # (in_box 제약 제거하여 끊김 해결!)
        if not is_paused and not request_home_reset and (current_time - last_send_time >= SEND_INTERVAL):
            target_x_rounded = round(smooth_x, 1)
            target_y_rounded = round(smooth_y, 1)
            target_z_rounded = round(smooth_z, 1)
            
            # 3D 거리 오차 계산
            delta_dist = math.sqrt(
                (target_x_rounded - last_sent_x)**2 + 
                (target_y_rounded - last_sent_y)**2 + 
                (target_z_rounded - last_sent_z)**2
            )
            
            # 노이즈로 인한 덜덜거림을 차단하는 3mm(0.3cm) 데드존 필터
            if delta_dist >= DELTA_THRESHOLD:
                if is_robot_connected and raccoon:
                    try:
                        if raccoon.can_move_to(target_x_rounded, target_y_rounded, target_z_rounded):
                            # wait=False 필수: 기본값(True)이면 로봇이 각 목표 지점에
                            # 도착할 때까지 이 호출이 블로킹되어 프레임 처리 자체가 멈춤
                            raccoon.move_to(target_x_rounded, target_y_rounded, target_z_rounded, SPEED_PRESETS[current_speed_idx], wait=False)
                    except Exception as ex:
                        print(f"[오류] 명령 송신 실패: {ex}")
                
                last_sent_x = target_x_rounded
                last_sent_y = target_y_rounded
                last_sent_z = target_z_rounded
                
            last_send_time = current_time
            
        # 그리퍼 제어: 왼손 중지 올림(펴짐)=열림 / 내림(굽힘)=닫힘
        # (왼손 미감지 시 left_mid_up=None이라 현재 상태를 그대로 유지)
        if left_mid_up is False and current_gripper_state != 0:
            current_gripper_state = 0
            if is_robot_connected and raccoon:
                try:
                    raccoon.close_gripper()
                except Exception as ex:
                    print(f"[오류] 그리퍼 닫기 오류: {ex}")
            print("[그리퍼] 닫힘 (CLOSED)")

        elif left_mid_up is True and current_gripper_state != 1:
            current_gripper_state = 1
            if is_robot_connected and raccoon:
                try:
                    raccoon.open_gripper()
                except Exception as ex:
                    print(f"[오류] 그리퍼 열기 오류: {ex}")
            print("[그리퍼] 열림 (OPEN)")
            
    else:
        # 손 감지가 되지 않았을 때는 기본 배경 프레임 사용
        canvas = bg_frame.copy()

    # 홈 복귀 별도 감지 (손 유무 상관없이 물리 버튼 즉시 반영)
    if request_home_reset:
        smooth_x, smooth_y, smooth_z = 15.0, 0.0, 12.0
        if is_robot_connected and raccoon:
            try:
                raccoon.move_to(15.0, 0.0, 12.0, SPEED_PRESETS[current_speed_idx], wait=False)
            except Exception as ex:
                print(f"[오류] 홈 리셋 명령 전송 실패: {ex}")
        last_sent_x, last_sent_y, last_sent_z = 15.0, 0.0, 12.0
        request_home_reset = False
        print("[RESET] 홈 위치로 복귀 완료.")

    # =============================================================================
    # 7. 화면 조정 가이드라인 박스 및 오버레이 그리기 (HUD 위)
    # =============================================================================
    if hand_detected:
        if in_box:
            box_color = (0, 255, 0)  # 안전 진입 상태: 녹색 테두리
            box_thickness = 1
            box_text = "Z RANGE (RIGHT MIDDLE FINGER)"
            box_text_color = (0, 255, 0)
        else:
            box_color = (0, 165, 255)  # 가이드 박스 이탈: 주황색 테두리 (정지 없음, Clamped 상태로 제어됨)
            box_thickness = 2
            box_text = "Z RANGE (RIGHT MIDDLE FINGER)"
            box_text_color = (0, 165, 255)
    else:
        box_color = (120, 120, 120)  # 손 미감지 상태: 회색
        box_thickness = 1
        box_text = "WAITING FOR HAND..."
        box_text_color = (180, 180, 180)

    # 가이드 박스 그리기 (라벨은 상단 정보 라인과 겹치지 않게 박스 안쪽 하단에 표시)
    cv2.rectangle(canvas, (BOX_X_MIN, BOX_Y_MIN), (BOX_X_MAX, BOX_Y_MAX), box_color, box_thickness)
    cv2.putText(canvas, box_text, (BOX_X_MIN + 6, BOX_Y_MAX - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.45, box_text_color, 1, cv2.LINE_AA)

    # ---------------------------------------------------------------------
    # 손가락 제어 시각화 (핀치 간격/중지 위치에 실시간 좌표값 표시)
    # ---------------------------------------------------------------------
    def draw_pinch(pts, label, color):
        """엄지-검지 두 점을 잇는 선과 중앙 라벨을 그립니다."""
        p1, p2 = pts
        cv2.line(canvas, p1, p2, color, 2, cv2.LINE_AA)
        cv2.circle(canvas, p1, 4, color, -1)
        cv2.circle(canvas, p2, 4, color, -1)
        mx, my = (p1[0] + p2[0]) // 2, (p1[1] + p2[1]) // 2
        cv2.putText(canvas, label, (mx + 8, my - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 3, cv2.LINE_AA)
        cv2.putText(canvas, label, (mx + 8, my - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1, cv2.LINE_AA)

    def draw_marker(pt, label, color):
        """중지 끝 등 단일 지점에 마커와 라벨을 그립니다."""
        cv2.circle(canvas, pt, 7, color, 2)
        cv2.putText(canvas, label, (pt[0] + 10, pt[1] + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 3, cv2.LINE_AA)
        cv2.putText(canvas, label, (pt[0] + 10, pt[1] + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1, cv2.LINE_AA)

    # 오른손: X축(엄지-검지, 자홍) / Z축(중지, 하늘색)
    if right_pinch_pts is not None:
        draw_pinch(right_pinch_pts, f"X {smooth_x:.1f}cm", (255, 0, 255))
    if right_mid_px is not None:
        draw_marker(right_mid_px, f"Z {smooth_z:.1f}cm", (255, 200, 0))

    # 왼손: Y축(엄지-검지, 초록) / 그리퍼(중지, 상태색)
    if left_pinch_pts is not None:
        draw_pinch(left_pinch_pts, f"Y {smooth_y:.1f}cm", (0, 255, 0))
    if left_mid_px is not None:
        grip_txt = "GRIP OPEN" if current_gripper_state == 1 else "GRIP CLOSE"
        grip_col = (0, 255, 0) if current_gripper_state == 1 else (0, 165, 255)
        draw_marker(left_mid_px, grip_txt, grip_col)

    # =============================================================================
    # 8. 프리미엄 가상 HUD UI 디자인 그리기
    # =============================================================================
    # 헤더 바 렌더링
    cv2.rectangle(canvas, (0, 0), (640, 60), (20, 20, 20), -1)
    cv2.line(canvas, (0, 60), (640, 60), (0, 255, 0), 2)
    
    cv2.putText(canvas, "RACCOON BOT CUSTOM HUD CONTROLLER", (15, 38), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2, cv2.LINE_AA)
                
    # 라쿤봇 물리 연결 감지 정보 표시
    if is_robot_connected:
        status_text = "CONNECTED"
        status_color = (0, 255, 0)
    else:
        status_text = "SIMULATOR (OFFLINE)"
        status_color = (0, 165, 255)
        
    cv2.rectangle(canvas, (430, 12), (625, 48), (30, 30, 30), -1)
    cv2.rectangle(canvas, (430, 12), (625, 48), status_color, 1)
    cv2.putText(canvas, status_text, (445, 36), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, status_color, 1, cv2.LINE_AA)

    # 상단 정보 라인: 기존 좌/우 대형 패널을 상단 두 줄 텍스트로 압축하여 중앙 카메라 시야 확보
    # (검은 외곽선을 먼저 두껍게 그려 밝은 배경에서도 가독성 유지)
    def draw_hud_text(text, org, color, scale=0.5):
        cv2.putText(canvas, text, org, cv2.FONT_HERSHEY_SIMPLEX, scale, (0, 0, 0), 3, cv2.LINE_AA)
        cv2.putText(canvas, text, org, cv2.FONT_HERSHEY_SIMPLEX, scale, color, 1, cv2.LINE_AA)

    # 좌측 상단 1행: 로봇 목표 XYZ 좌표
    draw_hud_text(f"X:{smooth_x:.1f}  Y:{smooth_y:.1f}  Z:{smooth_z:.1f} cm", (15, 82), (0, 255, 255), 0.55)

    # 좌측 상단 2행: 조종 작동 상태 (이탈 시 HOLD가 아니라 CLAMPED로 유연하게 제어됨을 표기)
    if is_paused:
        status_desc = "PAUSED (MOTION LOCKED)"
        desc_color = (0, 0, 255)
    elif not in_box and hand_detected:
        status_desc = "ACTIVE (CLAMPED)"
        desc_color = (0, 165, 255)
    elif not hand_detected:
        status_desc = "WAITING FOR HAND"
        desc_color = (120, 120, 120)
    else:
        status_desc = "ACTIVE (TRACKING)"
        desc_color = (0, 255, 0)
    draw_hud_text(status_desc, (15, 102), desc_color, 0.45)

    # 우측 상단 1행: 그리퍼 상태
    gripper_str = "OPEN" if current_gripper_state == 1 else "CLOSED"
    gripper_color = (0, 255, 0) if current_gripper_state == 1 else (0, 165, 255)
    draw_hud_text(f"Gripper: {gripper_str}", (400, 82), gripper_color, 0.5)

    # 우측 상단 2행: 좌/우 손 감지 상태 (R=X/Z 이동, L=Y/그리퍼)
    r_txt = "R:X+Z" if right_detected else "R:--"
    l_txt = "L:Y+GRIP" if left_detected else "L:--"
    both_color = (0, 255, 255) if (right_detected and left_detected) else (255, 255, 255) if hand_detected else (120, 120, 120)
    draw_hud_text(f"{r_txt}  {l_txt}", (400, 102), both_color, 0.45)
                
    # ---------------------------------------------------------------------
    # H. 하단 가상 제어판 버튼 패널 렌더링 (6버튼 레이아웃)
    # ---------------------------------------------------------------------
    cv2.rectangle(canvas, (0, 390), (640, 480), (20, 20, 20), -1)
    cv2.line(canvas, (0, 390), (640, 390), (0, 255, 0), 1)
    
    button_configs = [
        {"title": "START/PAUSE", "val": "PAUSED" if is_paused else "ACTIVE", "color": (0, 0, 255) if is_paused else (0, 255, 0)},
        {"title": "SPEED PRESET", "val": SPEED_LABELS[current_speed_idx], "color": (255, 255, 0)},
        {"title": "SENSITIVITY", "val": SENS_LABELS[current_sens_idx], "color": (0, 255, 255)},
        {"title": "BACKGROUND", "val": BG_MODES[current_bg_idx], "color": (0, 165, 255)},
        {"title": "CAM SELECT", "val": f"CAM {current_cam_idx}", "color": (255, 165, 0)},
        {"title": "RESET HOME", "val": "GO HOME", "color": (255, 0, 255)}
    ]
    
    # 0.15초 동안 마우스 클릭 시 시각적 하이라이트 제공 (피드백 이펙트)
    is_feedback_active = (time.time() - click_feedback_time) < 0.15
    
    # 6개 버튼 가로 매핑 좌표 (여백 8px 구조로 조밀하게 배치)
    button_coords = [
        (8, 103),
        (111, 206),
        (214, 309),
        (317, 412),
        (420, 515),
        (523, 632)
    ]
    
    for idx, config in enumerate(button_configs):
        bx1, bx2 = button_coords[idx]
        by1, by2 = 415, 455
        
        if is_feedback_active and clicked_button_idx == idx:
            cv2.rectangle(canvas, (bx1, by1), (bx2, by2), config["color"], -1)
            text_color = (0, 0, 0)
        else:
            cv2.rectangle(canvas, (bx1, by1), (bx2, by2), (40, 40, 40), -1)
            cv2.rectangle(canvas, (bx1, by1), (bx2, by2), config["color"], 1)
            text_color = (255, 255, 255)
            
        cv2.putText(canvas, config["title"], (bx1 + 5, by1 + 15), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.33, (180, 180, 180), 1, cv2.LINE_AA)
        cv2.putText(canvas, config["val"], (bx1 + 5, by1 + 32), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.38, text_color if clicked_button_idx == idx and is_feedback_active else config["color"], 2, cv2.LINE_AA)

    # FPS 출력 및 시스템 안내 메시지
    new_frame_time = time.time()
    fps = 1 / (new_frame_time - prev_frame_time + 1e-6)
    prev_frame_time = new_frame_time
    cv2.putText(canvas, f"FPS: {int(fps)}", (15, 380), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.4, (120, 120, 120), 1, cv2.LINE_AA)
    cv2.putText(canvas, "Click HUD Button | 'F' Fullscreen | 'Q' Exit", (300, 380),
                cv2.FONT_HERSHEY_SIMPLEX, 0.4, (120, 120, 120), 1, cv2.LINE_AA)

    # 최종 합성된 캔버스 렌더링 (전체 화면 모드에서는 비율 유지 확대 + 레터박스)
    if is_fullscreen:
        disp_w = int(640 * display_scale)
        disp_h = int(480 * display_scale)
        scaled = cv2.resize(canvas, (disp_w, disp_h), interpolation=cv2.INTER_LINEAR)
        screen_canvas = np.zeros((SCREEN_H, SCREEN_W, 3), dtype=np.uint8)
        screen_canvas[display_off_y:display_off_y + disp_h, display_off_x:display_off_x + disp_w] = scaled
        cv2.imshow(window_name, screen_canvas)
    else:
        cv2.imshow(window_name, canvas)

    # 키 입력 대기 및 종료 감지
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q') or key == 27:
        print("[정보] 사용자에 의해 제어 루프를 탈출합니다.")
        break

    # 'F' 키: 전체 화면 <-> 창 모드 전환
    if key in (ord('f'), ord('F')):
        is_fullscreen = not is_fullscreen
        if is_fullscreen:
            cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
        else:
            cv2.setWindowProperty(window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_NORMAL)
            cv2.resizeWindow(window_name, 640, 480)
        update_display_mapping()
        print(f"[정보] 화면 모드 전환 -> {'전체 화면' if is_fullscreen else '창 모드'}")

    # 외부 런처의 안전 종료(STOP) 요청 감지
    if stop_requested:
        print("[정보] 런처의 종료 요청을 수신하여 안전 종료를 시작합니다.")
        break

    # 사용자가 창을 X 버튼으로 닫은 경우 감지 (미감지 시 창이 계속 되살아남)
    if cv2.getWindowProperty(window_name, cv2.WND_PROP_VISIBLE) < 1:
        print("[정보] 화면 창이 닫혀 제어 루프를 종료합니다.")
        break

# =============================================================================
# 9. 자원 해제 및 안전한 하드웨어 접속 종료
# =============================================================================
if cap is not None:
    cap.release()
if hands is not None:
    hands.close()
cv2.destroyAllWindows()

if is_robot_connected and raccoon:
    try:
        print("[정보] 라쿤봇을 안전 정지 상태로 초기화 후 접속을 해제합니다...")
        raccoon.stop()
        raccoon.dispose()
        print("[정보] 하드웨어 리소스 해제가 완료되었습니다.")
    except Exception as e:
        print(f"[오류] 라쿤봇 리소스 해제 중 실패: {e}")
