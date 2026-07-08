window.CONTENT_KO = {
  nav: {
    home: "라쿤봇 개요",
    usage: "사용법",
    peripherals: "추가 장치",
    unplugged: "언플러그드 코딩",
    plugged: "플러그드 코딩",
    specs: "로봇 사양",
    control: "로봇 제어"
  },
  appTitle: "라쿤봇 사용 가이드",
  langLabel: "언어",
  pages: {
    home: {
      title: "라쿤봇 개요",
      html: `
        <p><strong>라쿤봇(RaccoonBot)</strong> 로봇팔은 초소형/초경량의 4축(4자유도) 로봇팔입니다.
        블루투스 5.0 통신 방식을 통해 연결되며, 로봇 교육 및 연구 환경에 최적화된 제품입니다.</p>
        <ul>
          <li>IoT 환경에서 동작하는 무선 네트워크 기반의 씬-클라이언트(Thin Client) 로봇입니다.</li>
          <li>대용량 배터리가 내장되어 외부 전원 연결 없이도 동작할 수 있습니다.</li>
          <li><a href="https://robomationlab.com/" target="_blank">RobomationLAB</a> 통합 개발 환경과 연동되어 코딩 및 인공지능 교육을 즉시 시작할 수 있습니다.</li>
          <li>네트워크 없는 환경에서도 Teaching &amp; Playback 기능을 통해 언플러그드 학습이 가능합니다.</li>
          <li>다양한 작업에 대응할 수 있도록 여러 종류의 End-Effector를 장착할 수 있습니다.</li>
          <li>전용 Peripheral 장치(예: 컨베이어 등)와 연동이 가능하며, 로봇 본체의 전원으로 구동되므로 별도의 외부 전원 공급이 필요하지 않습니다.</li>
          <li>초등 수준의 교육 과정에서도 활용할 수 있도록 4자유도 구조로 설계되었습니다.</li>
          <li>각 축의 기계적인 연결 구조가 단순하여 Kinematics 및 Inverse Kinematics 해석이 직관적입니다.</li>
          <li>iOS 및 Android 스마트 기기와 호환됩니다.</li>
          <li>RobomationLAB 외에도 Scratch, Python 환경을 지원합니다.</li>
        </ul>

        <h3>라쿤봇 구조</h3>
        <p>라쿤봇은 4축 4관절 로봇으로, 4개의 관절과 위팔 / 아래팔 / 말단장치 장착부로 구성되어 있습니다.</p>

        <h3>라쿤봇 구성품</h3>
        <p>라쿤봇은 사용자가 언플러그드 코딩(Unplugged Coding)부터 플러그드 코딩(Plugged Coding)까지 학습하는 데 필수적인 기본 구성이 모두 포함되어 있습니다.</p>
        <ul>
          <li>라쿤봇 본체</li>
          <li>집게 그리퍼</li>
          <li>그리퍼 연결 케이블</li>
          <li>Mini Dongle+</li>
          <li>USB-C 충전 케이블</li>
          <li>라쿤봇 가이드 스티커 2종</li>
          <li>원통 나무 블럭 4종</li>
          <li>설명서</li>
        </ul>

        <blockquote class="warn">
          <strong>주의!</strong> 라쿤봇의 무게는 약 850g으로, 책상에서 떨어질 경우 제품이 손상되거나 발에 떨어져 부상을 입을 수 있습니다. 취급 시 주의해 주십시오.
        </blockquote>
      `
    },
    usage: {
      title: "사용법",
      html: `
        <h3>라쿤봇 설치</h3>
        <p>라쿤봇은 모든 구성이 완료된 상태로 제공됩니다. 제품을 포장 박스에서 꺼낸 후 전원을 켜면, 바로 동작 대기 상태로 진입하며 즉시 사용할 수 있습니다.<br>
        언플러그드 코딩(Unplugged Coding)은 바로 사용 가능하며, 플러그드 코딩(Plugged Coding)은 <strong>Mini Dongle+</strong>로 연결하여 사용합니다.</p>

        <h3>모드 및 상태</h3>
        <p>라쿤봇은 초기 대기 상태와 2가지의 동작 모드가 있습니다. 동작 모드는 코딩(Coding) 모드 / 언플러그드(Unplugged) 모드 2가지로 나뉩니다.</p>
        <ol>
          <li><strong>대기 상태</strong> — 처음 전원을 켜면 라쿤봇이 대기 상태(Standby Status)로 진입합니다. 대기 모드에서 Teach 버튼을 누르면 자동으로 언플러그드 모드로 전환되어 별도의 설정 과정 없이 바로 학습 및 제어를 시작할 수 있습니다. 이전에 저장된 동작을 재생하거나, 새로운 동작을 추가 및 저장할 수 있습니다.</li>
          <li><strong>코딩 모드</strong> — Mini Dongle+에 연결하여 사용자가 직접 코딩으로 라쿤봇을 제어할 수 있습니다. RobomationLAB, Scratch, Python 환경을 통해 코딩을 수행할 수 있으며, 기초부터 고급 수준의 코딩 학습이 모두 가능합니다.</li>
          <li><strong>언플러그드 모드</strong> — 복잡한 코딩 없이 Teaching &amp; Playback 기능을 통해 다양한 미션을 수행하며, 로봇팔의 정교한 동작 원리를 손쉽게 학습하고 체험할 수 있습니다. 컨베이어 등 주변 장치와의 연동을 통해 실제 공장 자동화 시스템을 구현할 수 있습니다.</li>
        </ol>

        <h3>인터페이스</h3>
        <p>라쿤봇은 블루투스 5.0을 통해 연결되며, 각 구성 요소는 다음과 같습니다.</p>
        <table>
          <tr><th>번호</th><th>이름</th><th>설명</th></tr>
          <tr><td>1</td><td>PLAY 버튼</td><td>학습된 동작 재생/멈춤, 로봇에 학습된 동작 저장</td></tr>
          <tr><td>2</td><td>POWER 버튼</td><td>전원 켜기/끄기, 모든 동작 중지 및 홈 위치로 이동</td></tr>
          <tr><td>3</td><td>DELETE 버튼</td><td>최근 학습된 동작 1개 삭제, 학습된 모든 동작 삭제</td></tr>
          <tr><td>4</td><td>상태 LED</td><td>동작 상태 표시</td></tr>
          <tr><td>5</td><td>모드 LED</td><td>동작 모드 표시</td></tr>
          <tr><td>6</td><td>충전 LED</td><td>충전 및 배터리 상태 표시</td></tr>
          <tr><td>7</td><td>주변 장치 연결부</td><td>주변 장치(예: 컨베이어) 연결 단자</td></tr>
          <tr><td>8</td><td>충전 연결부</td><td>USB 충전 단자</td></tr>
          <tr><td>9</td><td>리셋 스위치</td><td>전원 리셋 스위치</td></tr>
          <tr><td>10</td><td>TEACH 버튼</td><td>조인트 각도 저장, 그리퍼 열기/닫기와 함께 동작 저장, 동작 중간에 대기 시간 추가</td></tr>
          <tr><td>11</td><td>말단 장치 연결부</td><td>말단 장치(예: 집게 그리퍼)를 연결</td></tr>
          <tr><td>12</td><td>조인트 LED</td><td>조인트 상태 표시</td></tr>
          <tr><td>13</td><td>그리퍼 연결부</td><td>라쿤봇과 연결</td></tr>
          <tr><td>14</td><td>조임 노브</td><td>말단 장치 고정</td></tr>
        </table>

        <h3>버튼 입력</h3>
        <p>라쿤봇에는 Power, Play, Delete, Teach 4개의 버튼이 있으며, 클릭(Click) / 더블클릭(Double Click) / 길게 누르기(Long Click) 세 가지 방식으로 동작합니다.</p>

        <h4>1. Power 버튼</h4>
        <table>
          <tr><th>입력 방식</th><th>기능 설명</th><th>비고</th></tr>
          <tr><td>클릭</td><td>라쿤봇 켜짐</td><td>전원이 꺼진 상태</td></tr>
          <tr><td>클릭</td><td>모든 동작 중지, Home으로 이동</td><td>전원이 켜진 상태</td></tr>
          <tr><td>길게 누르기</td><td>라쿤봇 꺼짐</td><td></td></tr>
        </table>

        <h4>2. Play 버튼</h4>
        <table>
          <tr><th>입력 방식</th><th>기능 설명</th><th>비고</th></tr>
          <tr><td>클릭</td><td>학습된 동작 재생 / 중지</td><td>Playback</td></tr>
          <tr><td>더블 클릭</td><td>학습된 동작 무한 반복 재생</td><td>Playback</td></tr>
          <tr><td>길게 누르기</td><td>학습된 동작 라쿤봇 내부 메모리에 저장</td><td></td></tr>
        </table>

        <h4>3. Delete 버튼</h4>
        <table>
          <tr><th>입력 방식</th><th>기능 설명</th><th>비고</th></tr>
          <tr><td>클릭</td><td>최근 학습된 동작 1개 삭제</td><td></td></tr>
          <tr><td>길게 누르기</td><td>학습된 모든 동작 삭제</td><td></td></tr>
        </table>

        <h4>4. Teach 버튼</h4>
        <table>
          <tr><th>입력 방식</th><th>기능 설명</th><th>비고</th></tr>
          <tr><td>클릭</td><td>조인트 각도 저장</td><td>Teaching</td></tr>
          <tr><td>더블 클릭</td><td>그리퍼 열기/닫기와 함께 동작 저장</td><td></td></tr>
          <tr><td>길게 누르기</td><td>동작 중간에 대기 시간 추가</td><td>1초 간격으로 조인트 LED와 부저가 점멸</td></tr>
        </table>

        <h3>표시 장치 (LED)</h3>
        <h4>1. 상태 LED</h4>
        <table>
          <tr><th>색상</th><th>동작</th><th>설명</th></tr>
          <tr><td>꺼짐</td><td>꺼짐</td><td>대기 상태</td></tr>
          <tr><td>초록색</td><td>켜짐</td><td>학습된 동작을 실행함</td></tr>
          <tr><td>초록색</td><td>점멸</td><td>학습된 동작을 반복 실행함</td></tr>
          <tr><td>파란색</td><td>켜짐</td><td>블루투스 연결 완료(대기중)</td></tr>
          <tr><td>파란색</td><td>점멸</td><td>블루투스 통신중</td></tr>
          <tr><td>주황색</td><td>켜짐</td><td>로봇팔이 Home으로 이동중</td></tr>
          <tr><td>주황색</td><td>점멸</td><td>학습된 데이터 저장</td></tr>
          <tr><td>무지개색</td><td>점멸</td><td>저장 데이터 삭제중</td></tr>
          <tr><td>빨간색</td><td>점멸</td><td>점검 필요</td></tr>
        </table>

        <h4>2. 모드 LED</h4>
        <table>
          <tr><th>색상</th><th>동작</th><th>설명</th></tr>
          <tr><td>흰색</td><td>켜짐</td><td>대기 상태</td></tr>
          <tr><td>초록색</td><td>켜짐</td><td>언플러그드 모드</td></tr>
          <tr><td>노란색</td><td>켜짐</td><td>언플러그드 모드의 자동 수평/수직 유지 기능 활성화</td></tr>
          <tr><td>파란색</td><td>켜짐</td><td>코딩 모드</td></tr>
          <tr><td>빨간색</td><td>점멸</td><td>점검 필요</td></tr>
        </table>

        <h4>3. 조인트 LED</h4>
        <table>
          <tr><th>색상</th><th>동작</th><th>설명</th></tr>
          <tr><td>흰색</td><td>켜짐</td><td>대기 상태</td></tr>
          <tr><td>보라색</td><td>한번 켜짐</td><td>Teach 버튼 누름 / 조인트 각도 저장</td></tr>
          <tr><td>초록색</td><td>켜짐/점멸</td><td>언플러그드 모드 / 동작중</td></tr>
          <tr><td>노란색</td><td>켜짐/점멸</td><td>자동 수평/수직 유지 기능 활성화 / 동작중</td></tr>
          <tr><td>파란색</td><td>켜짐/점멸</td><td>코딩 모드 / 동작중</td></tr>
          <tr><td>빨간색</td><td>빠른 점멸</td><td>장애물 감지</td></tr>
          <tr><td>빨간색</td><td>느린 점멸</td><td>배터리 없음</td></tr>
        </table>

        <h3>말단 장치 (End-Effector)</h3>
        <p>기본 구성품으로 포함된 집게 그리퍼(Finger Gripper)는 말단 장치 장착부(End-Effector Mount)에 정확히 맞춰 끼우고, 조임 노브(Clamping Knob)를 시계 방향으로 돌려 고정합니다. 제거 시에는 반시계 방향으로 돌립니다.
        그리퍼 연결부와 말단장치 연결부는 전용 케이블로 연결하며, 케이블은 소모품이므로 반복 사용으로 손상될 수 있어 필요 시 교체합니다.</p>

        <h3>초기 위치 (Home Position)</h3>
        <p>라쿤봇의 전원을 켜면 로봇팔이 홈(Home) 위치로 자동 이동합니다. 홈 위치는 로봇이 동작을 시작하기 전의 기준 자세입니다.</p>

        <h3>충전</h3>
        <p>라쿤봇은 USB-C 포트를 통해 충전합니다. USB 5V / 3A 규격의 충전기 사용을 권장하며, 완충까지 약 3시간이 소요됩니다.</p>
        <blockquote class="warn">
          <strong>주의:</strong> 고속 충전기(고전압 충전기)를 사용할 경우 전원 회로가 손상될 수 있습니다. 반드시 USB 5V / 3A 규격의 충전기를 사용하십시오. 충전 포트에 6V 이상의 전압이 입력되면 보호 회로가 작동하여 충전이 자동으로 차단됩니다.
        </blockquote>

        <h4>충전 LED</h4>
        <table>
          <tr><th>색상</th><th>동작</th><th>케이블 상태</th><th>설명</th></tr>
          <tr><td>꺼짐</td><td>꺼짐</td><td>없음</td><td>배터리 충분</td></tr>
          <tr><td>빨간색</td><td>느린 점멸</td><td>없음</td><td>배터리 보통</td></tr>
          <tr><td>빨간색</td><td>보통 점멸</td><td>없음</td><td>배터리 낮음</td></tr>
          <tr><td>빨간색</td><td>빠른 점멸</td><td>없음</td><td>배터리 없음</td></tr>
          <tr><td>꺼짐</td><td>꺼짐</td><td>연결됨</td><td>충전 완료</td></tr>
          <tr><td>빨간색</td><td>켜짐</td><td>연결됨</td><td>충전중</td></tr>
        </table>
      `
    },
    peripherals: {
      title: "추가 장치",
      html: `
        <h3>말단 장치 (End-Effector)</h3>
        <p>말단장치는 라쿤봇의 가장 끝부분에 장착되어 실제로 물체를 잡거나, 놓거나, 이동시키는 역할을 담당하는 장치입니다. 교체형 구조로 설계되어 있어, 작업 목적에 따라 다양한 형태의 장치를 손쉽게 장착하고 교환할 수 있습니다. 집게 그리퍼(Finger Gripper)가 기본으로 제공됩니다.</p>

        <h3>집게 그리퍼 (Finger Gripper)</h3>
        <p>라쿤봇의 기본 말단장치로, 두 개의 그리핑 암(Gripping Arm)을 사용해 물체를 잡거나 놓습니다.</p>
        <ul>
          <li><strong>2-지점 대칭 구조</strong> — 두 개의 그리핑 암이 동시에 안쪽으로 움직이며 물체를 안정적으로 고정. 소형 블록, 공, 큐브 등 다양한 형태의 물체를 집기에 적합.</li>
          <li><strong>모듈형 장착 방식</strong> — 말단장치 장착부에 손쉽게 결합, 별도 도구 없이 탈착 가능. 본체 하단에 전원 및 제어 신호를 전달하는 4핀 커넥터.</li>
          <li><strong>Teaching &amp; Playback 연동</strong> — 언플러그드 모드에서 학습한 그리퍼의 동작 상태(잡기/놓기)가 자동으로 기록되고 재생 시 동일하게 재현.</li>
        </ul>

        <h3>주변 장치 (Peripheral Device)</h3>
        <p>주변 장치는 라쿤봇 본체에 연결되어 로봇팔에 새로운 기능을 확장해주는 장치입니다. 분류, 이동, 적재 등의 자동화 실습에 적합하며, 교체형(Modular) 구조로 설계되어 있습니다. 4핀 커넥터를 통해 전원과 제어 신호를 공급받으며, Teaching &amp; Playback 기능에서도 동작 상태가 함께 기록됩니다.</p>

        <h3>컨베이어 (Conveyor)</h3>
        <p>라쿤봇과 연동하여 물체를 자동으로 이동시키는 주변 장치입니다 (출시 예정). 주변 장치 연결부(Peripheral Port)를 통해 전원과 제어 신호를 공급받습니다.</p>
        <ul>
          <li><strong>양방향 제어</strong> — 정방향(Forward) 또는 역방향(Reverse) 전환</li>
          <li><strong>속도 제어</strong> — 코딩 또는 앱을 통해 회전 속도 조절</li>
          <li><strong>자동 동작 연동</strong> — 라쿤봇의 동작에 맞춰 컨베이어가 자동으로 작동</li>
          <li><strong>Teaching &amp; Playback 지원</strong> — 언플러그드 모드에서 회전 방향/속도가 자동 저장 및 재생</li>
        </ul>

        <h4>컨베이어 버튼 입력</h4>
        <table>
          <tr><th>입력 방식</th><th>기능 설명</th><th>비고</th></tr>
          <tr><td>한 번 누름</td><td>시작 / 정지</td><td>기본 동작</td></tr>
          <tr><td>길게 누르기</td><td>진행 방향 반전</td><td>동작 중</td></tr>
          <tr><td>길게 누르기</td><td>진행 방향 반전 후 동작 시작</td><td>멈춤 상태</td></tr>
        </table>

        <blockquote class="note">
          <strong>참고:</strong> 언플러그드 모드에서는 속도 제어 기능이 적용되지 않으며, 컨베이어의 회전 방향 정보만 저장됩니다.
        </blockquote>
        <blockquote class="warn">
          <strong>주의:</strong> 과도한 하중은 제품 손상의 원인이 될 수 있습니다.
        </blockquote>
      `
    },
    unplugged: {
      title: "언플러그드 코딩",
      html: `
        <h3>언플러그드(Unplugged) 모드</h3>
        <p>복잡한 코딩 없이 Teaching &amp; Playback 기능을 통해 다양한 미션을 수행하며, 로봇팔의 정교한 동작 원리를 손쉽게 학습하고 체험할 수 있습니다. 컨베이어 등 주변 장치와의 연동을 통해 실제 공장 자동화 시스템을 구현할 수 있습니다.</p>

        <h4>언플러그드 모드 시작하기</h4>
        <ol>
          <li><strong>처음부터 새로운 동작을 저장하는 경우:</strong> 대기 상태에서 TEACH 버튼을 눌러 새로운 조인트 각도를 저장합니다. 저장이 완료되면 자동으로 언플러그드 모드로 진입합니다.</li>
          <li><strong>내부 메모리에 저장된 기존 동작에 이어서 저장하는 경우:</strong> 대기 상태에서 PLAY 버튼을 눌러 저장된 동작을 재생합니다. 재생이 완료되면 자동으로 언플러그드 모드로 전환됩니다.</li>
        </ol>
        <p>언플러그드 모드로 정상 진입하면 모드 LED 및 조인트 LED가 초록색으로 점등됩니다.</p>

        <h3>Teaching &amp; Playback</h3>
        <p>사용자가 라쿤봇의 동작을 직접 가르치고(Teaching), 저장된 동작을 그대로 재생(Playback)할 수 있는 기능입니다. TEACH 버튼으로 조인트 위치를 단계별로 저장하고, PLAY 버튼으로 순서대로 재생합니다.</p>

        <h4>Teaching</h4>
        <p>TEACH 버튼을 누르면 그 순간의 로봇 자세와 상태가 저장됩니다. 최대 250개의 동작을 저장할 수 있으며, 한도를 초과하면 알림음이 발생합니다.</p>
        <table>
          <tr><th>입력 방식</th><th>설명</th><th>비고</th></tr>
          <tr><td>클릭</td><td>현재 조인트 각도 저장</td><td></td></tr>
          <tr><td>더블 클릭</td><td>조인트 각도 저장 + 그리퍼 On/Off 토글</td><td>그리퍼 열림(Off)에서 시작</td></tr>
          <tr><td>길게 누르기</td><td>조인트 각도 저장 + 대기 시간 설정</td><td>1초 간격으로 LED/부저 점멸</td></tr>
        </table>

        <h4>Playback</h4>
        <p>PLAY 버튼으로 학습된 동작을 재생합니다. 재생은 항상 HOME 위치에서 시작하며, 완료되면 Home 위치로 돌아옵니다.</p>
        <table>
          <tr><th>입력 방식</th><th>설명</th><th>비고</th></tr>
          <tr><td>클릭</td><td>학습된 동작 재생 / 재생 중 다시 누르면 즉시 중지</td><td></td></tr>
          <tr><td>더블 클릭</td><td>학습된 동작 무한 반복</td><td></td></tr>
          <tr><td>길게 누르기</td><td>현재 학습된 동작을 내부 메모리에 저장</td><td>저장 중 상태 LED 주황색 점멸</td></tr>
        </table>
        <blockquote class="note"><strong>참고:</strong> 내부 메모리에는 마지막으로 저장된 동작만 유지되며, 새 동작을 저장하면 기존 데이터는 삭제됩니다.</blockquote>

        <h4>안전 정지 기능 (Smart Stop)</h4>
        <p>언플러그드 모드에서 동작 중 장애물이나 외부 간섭으로 정상 동작이 불가능하면 자동으로 동작을 멈춥니다. 이 기능은 언플러그드 모드에서만 동작하며, 플러그드 모드에서는 비활성화되므로 기구적 충돌이나 과부하에 주의해야 합니다. 활성화 시 조인트 LED가 빨간색으로 빠르게 점멸하고 경고음이 발생합니다.</p>

        <h4>동작 지우기</h4>
        <table>
          <tr><th>입력 방식</th><th>설명</th></tr>
          <tr><td>클릭</td><td>최근 동작 1개 삭제</td></tr>
          <tr><td>길게 누르기</td><td>모든 동작 삭제 (상태 LED 무지개색 점멸)</td></tr>
        </table>

        <h3>내부 메모리에 저장된 동작 불러오기</h3>
        <ol>
          <li>라쿤봇의 전원을 켭니다. 대기 상태 진입 시 모드 LED와 조인트 LED가 흰색으로 점등됩니다.</li>
          <li>TEACH 버튼을 누르지 않은 대기 상태에서 PLAY 버튼을 누르면 마지막 학습 동작이 재생됩니다. 더블 클릭 시 무한 반복 재생됩니다.</li>
          <li>재생이 완료되면 언플러그드 모드로 전환되며 Home 위치로 복귀합니다. 이후 TEACH 버튼으로 새로운 동작을 이어서 저장할 수 있습니다.</li>
        </ol>

        <h3>자동 수평/수직 유지 기능 (Auto Leveling Function)</h3>
        <p>언플러그드 모드에서 조인트 4(Joint 4)를 자동으로 조절하여 물체를 더욱 안정적으로 다룰 수 있도록 돕습니다. 전원이 꺼진 상태에서 켤 때만 설정할 수 있습니다.</p>
        <ul>
          <li><strong>자동 수직 유지 기능:</strong> PLAY 버튼을 누른 상태에서 POWER 버튼을 눌러 전원을 켭니다.</li>
          <li><strong>자동 수평 유지 기능:</strong> DELETE 버튼을 누른 상태에서 POWER 버튼을 눌러 전원을 켭니다.</li>
        </ul>
        <p>활성화되면 상태 LED와 조인트 LED가 노란색으로 점등되며, 이후 TEACH 버튼 또는 동작 불러오기를 통해 언플러그드 모드에 진입하면 자세 제어 기능이 동작합니다.</p>
        <blockquote class="note"><strong>참고:</strong> 자동 수평/수직 유지 기능은 보조 기능으로 응답 속도가 느린 편이므로 정밀 작업에서는 주의하여 사용하십시오.</blockquote>
      `
    },
    plugged: {
      title: "플러그드 코딩",
      html: `
        <h3>RobomationLAB</h3>
        <p><a href="https://robomationlab.com/" target="_blank">RobomationLAB</a>은 크롬 웹 브라우저 기반의 통합 저작 환경입니다. 로봇 하드웨어를 추상화한 '로보이드(Roboid) 모델'을 활용하여 코드 해석 및 실행을 통해 로봇을 실시간으로 제어할 수 있습니다.</p>

        <h4>Block Composer (블록 컴포저)</h4>
        <p>블록 코딩을 통해 로봇을 쉽고 빠르게 제어하며 기초를 학습할 수 있는 도구입니다.</p>
        <ul>
          <li>피지컬 컴퓨팅에 최적화된 저작 환경</li>
          <li>블록 Drag &amp; Drop 방식으로 초보자도 쉽게 코딩 가능</li>
          <li>JavaScript, Python 스크립트 코드로 자동 변환</li>
          <li>로봇 별 미리 정해진 블록 모음과 다양한 체험 예제</li>
          <li>코드 실행을 통한 실시간 결과 확인</li>
          <li>AI 기반 스크립트 코드 분석을 통한 최적화된 피드백</li>
        </ul>

        <h4>Script Composer (스크립트 컴포저, 공개 예정)</h4>
        <p>스크립트 코딩으로 로봇을 제어하며 코딩의 기초를 학습할 수 있는 도구입니다. JavaScript / Python 에디터를 동시에 제공하며 코드 자동 완성 기능을 지원합니다.</p>

        <h4>프로그램 주요 특징</h4>
        <ul>
          <li>크롬 웹 브라우저 기반으로 OS 제약 없이 이용 가능</li>
          <li>웹 시리얼 통신 기반으로 Mini Dongle+를 통해 로봇을 직접 제어</li>
          <li>로봇의 종류나 수에 제한 없이 여러 대를 동시에 연결하여 제어 가능</li>
        </ul>

        <h3>BLE 연결</h3>
        <h4>Step 1. 동글 연결</h4>
        <p>PC에 Mini Dongle+를 연결한 뒤 라쿤봇을 가까이 두면 상태 LED가 파란색으로 바뀌며 자동으로 페어링됩니다. Block Composer에서 사용하려면 크롬 브라우저에서 Mini Dongle+에 대한 웹 시리얼 포트 권한을 허용해야 합니다.</p>
        <ol>
          <li>상단 메뉴의 <strong>동글 찾기</strong> 버튼을 클릭</li>
          <li>목록에서 연결할 Mini Dongle+를 선택하고 <strong>연결</strong> 버튼 클릭</li>
          <li>화면이 새로고침되며 라쿤봇과 Mini Dongle+ 연결 완료</li>
        </ol>

        <h4>Step 2. 동글 연결 확인하기</h4>
        <p>동글이 연결되면 브라우저 상단 탭에 직렬 포트 아이콘이 나타나고, 좌측 하단 아이콘에 초록색 불빛이 점등됩니다. 한 번 연결된 이후에는 자동으로 재연결됩니다. 동글이 다른 프로그램에 이미 연결되어 있으면 연결이 실패하므로, 해당 프로그램에서 연결을 해제한 뒤 다시 시도하세요.</p>

        <h4>Step 3. 라쿤봇 연결</h4>
        <ol>
          <li>상단 메뉴의 <strong>로봇 선택</strong> 버튼 클릭</li>
          <li>목록에서 <strong>라쿤봇</strong>을 선택하고 <strong>추가하기</strong> 버튼 클릭</li>
          <li>화면 좌측에 라쿤봇 블록 모음이 추가되고, 우측에서 연결된 로봇 정보 확인 가능</li>
        </ol>

        <h3>Block Composer 사용하기</h3>
        <h4>블록 코딩</h4>
        <p>블록 모음에서 원하는 블록을 드래그하여 코딩 영역에 내려놓습니다. 다른 블록과 올바르게 연결되어야 코드에 반영되며, 자바스크립트 또는 파이썬 코드로 실시간 변환된 결과를 확인할 수 있습니다.</p>
        <blockquote class="tip"><strong>TIP:</strong> 여러 블록을 동시에 선택하려면 Shift 키를 누른 상태에서 클릭하세요.</blockquote>
        <blockquote class="note"><strong>참고:</strong> 블록은 반드시 '시작하기' 또는 '무한 반복하기' 블록과 결합되어야 코드에 반영됩니다.</blockquote>

        <h4>코드 실행</h4>
        <p>상단 메뉴의 <strong>실행</strong> 버튼을 클릭하면 실시간으로 로봇 동작을 확인할 수 있습니다. 다시 클릭하거나 코딩 영역을 클릭하면 실행이 중지됩니다.</p>

        <h4>파일</h4>
        <ul>
          <li><strong>새로 만들기</strong> — 코드 초기화 (로봇 연결 및 설정은 유지)</li>
          <li><strong>저장하기 / 다른 이름으로 저장하기</strong> — 로컬 저장소에 저장</li>
          <li><strong>불러오기</strong> — 로컬 저장소에서 파일 불러오기</li>
          <li><strong>초기화</strong> — 모든 작업 내용과 프로그램 데이터 초기화</li>
        </ul>

        <h4>편집</h4>
        <ul>
          <li><strong>되돌리기</strong> (Ctrl+Z)</li>
          <li><strong>다시하기</strong> (Ctrl+Y)</li>
        </ul>

        <h4>설정</h4>
        <ul>
          <li><strong>언어</strong> — English / 한국어 선택 가능</li>
          <li><strong>동글</strong> — 연결된 동글을 강제로 끊거나 재연결</li>
        </ul>

        <h3>Block Composer 라쿤봇 예제</h3>
        <ol>
          <li>라쿤봇 블록을 추가한 뒤 상단 메뉴의 <strong>예제</strong> 버튼 클릭</li>
          <li>예제 목록에서 학습하고 싶은 예제 선택</li>
          <li>코딩 영역에서 예제 블록 확인, 여러 줄 주석 블록에서 설명 확인, 실행 버튼으로 동작 확인</li>
        </ol>

        <h3>라쿤봇 조이스틱 APP</h3>
        <p>스마트폰으로 라쿤봇의 각 관절을 자유롭게 움직이고, 주변 장치와 연동하여 로봇 제어를 체험할 수 있는 전용 앱입니다. iOS와 Android를 모두 지원합니다.</p>

        <h3>라쿤봇 업데이트</h3>
        <p>전용 모바일 앱(DFU App)을 통해 최신 펌웨어 및 기능을 손쉽게 업데이트할 수 있습니다. iOS와 Android를 모두 지원합니다.
        <a href="https://robomation.net/?page_id=17403" target="_blank">DFU 앱 안내 바로가기</a></p>
      `
    },
    specs: {
      title: "로봇 사양",
      html: `
        <h3>작업 영역 (Workspace)</h3>
        <p>작업 영역은 기본 집게 그리퍼가 닫힌 상태에서 측정되었습니다. 그리퍼의 장착 여부 및 종류에 따라 작업 영역이 일부 달라질 수 있습니다. (거리 단위: mm)</p>

        <h3>베이스 좌표계 (Base Coordinate System)</h3>
        <p>라쿤봇은 베이스 좌표계를 기준으로 동작합니다. 로봇 베이스 좌표계의 원점은 사용자의 작업 테이블 평면에 위치합니다.</p>

        <h3>치수 (Dimensions)</h3>
        <p>기구학(Kinematics/Inverse Kinematics) 계산 시 사이즈 파라미터로 사용됩니다. 그리퍼 종류에 따라 말단 장치 중심 위치가 일부 달라질 수 있으며, RobomationLAB에서는 이를 자동으로 보정합니다. (거리 단위: mm)</p>

        <h3>사양 (Specifications)</h3>
        <h4>1. Robotic Arm</h4>
        <table>
          <tr><th>항목</th><th>내용</th><th>세부 사항</th></tr>
          <tr><td>크기</td><td>93mm × 118mm × 180mm</td><td>W × D × H</td></tr>
          <tr><td>무게</td><td>825g</td><td>그리퍼 제외</td></tr>
          <tr><td>작업 영역</td><td>반경: 240°, 거리: 295mm</td><td>집게 그리퍼 포함</td></tr>
          <tr><td>축 (axes)</td><td>4-axis</td><td></td></tr>
          <tr><td>자유도</td><td>4 DOF</td><td>Degrees of Freedom</td></tr>
          <tr><td>조인트 정밀도</td><td>0.0440°</td><td></td></tr>
          <tr><td>엔코더 정밀도</td><td>0.0879°</td><td></td></tr>
          <tr><td>통신</td><td>BLE 5.0</td><td>iOS / Android 기기 지원</td></tr>
          <tr><td>배터리</td><td>리튬 이온</td><td></td></tr>
          <tr><td>충전 전압</td><td>5V</td><td>USB-C 충전 단자</td></tr>
          <tr><td>관절 구동</td><td>마이크로스텝 구동 스텝퍼 모터</td><td>감속기 내장</td></tr>
          <tr><td>소리</td><td>88건반 피아노 사운드, 멜로디</td><td></td></tr>
          <tr><td>언플러그드 코딩</td><td>Teaching &amp; Playback</td><td></td></tr>
          <tr><td>플러그드 코딩</td><td>RobomationLAB, Scratch, Python</td><td></td></tr>
          <tr><td>말단 장치</td><td>집게 그리퍼 등</td><td></td></tr>
          <tr><td>주변 장치</td><td>컨베이어 등</td><td></td></tr>
        </table>

        <h4>2. 축 사양 (Axis Parameters)</h4>
        <table>
          <tr><th>축</th><th>가동 범위</th></tr>
          <tr><td>Joint 1</td><td>-120° ~ +120°</td></tr>
          <tr><td>Joint 2</td><td>-90° ~ +30°</td></tr>
          <tr><td>Joint 3</td><td>-150° ~ 0°</td></tr>
          <tr><td>Joint 4</td><td>-105° ~ +105°</td></tr>
        </table>

        <blockquote class="warn"><strong>주의:</strong> 본 문서에 기재된 사양 및 기능은 제품의 성능 향상이나 품질 개선을 위해 사전 예고 없이 변경될 수 있습니다.</blockquote>

        <h3>문제 해결</h3>
        <p>고객 센터: ☎️ +82-1551-1651 (업무시간 오전 10:00 ~ 오후 5:00, 점심시간 오후 12:00 ~ 오후 1:00)</p>

        <h4>1. 전원이 꺼지지 않거나 로봇이 이상 동작할 때</h4>
        <p>리셋 스위치를 클립 등의 도구로 눌러 강제로 전원을 종료할 수 있습니다. 이후 전원이 다시 켜지며 초기 상태로 재시작됩니다.</p>

        <h4>2. 언플러그드 모드 동작 중 정지 및 Home 위치로 복귀</h4>
        <p>언플러그드 모드로 동작 중 POWER 버튼을 누르면 모든 동작을 중지하고 HOME 위치로 이동합니다.</p>

        <h4>3. 상태/모드 LED가 빨간색으로 점멸하는 경우</h4>
        <table>
          <tr><th>상태 LED</th><th>모드 LED</th><th>설명</th><th>조치사항</th></tr>
          <tr><td>꺼짐</td><td>빨간색 점멸</td><td>비정상 충전 전압</td><td>충전기 출력 전압이 5V인지 확인</td></tr>
          <tr><td>빨간색 점멸</td><td>꺼짐</td><td>내부 통신 오류</td><td>리셋 후 재발 시 고객센터 문의</td></tr>
          <tr><td>빨간색 점멸</td><td>빨간색 점멸</td><td>데이터 오류</td><td>리셋 후 재발 시 고객센터 문의</td></tr>
        </table>
      `
    },
    control: {
      title: "로봇 제어",
      html: `
        <p>웹캠으로 손 동작을 인식하여 라쿤봇을 실시간으로 조종하는 <code>camera_control.py</code> 프로그램을 실행합니다.
        실행하면 별도의 OpenCV 창(HUD)이 열리며, 그 창에서 카메라 제어 및 로봇 조종을 진행합니다.</p>

        <h4>조종 방법</h4>
        <ul>
          <li><strong>좌우 이동 (Y축):</strong> 손을 화면의 왼쪽/오른쪽으로 움직이면 라쿤봇도 좌우로 이동</li>
          <li><strong>상하 이동 (Z축):</strong> 손을 위/아래로 움직이면 라쿤봇도 상하로 이동</li>
          <li><strong>전후 이동 (X축):</strong> 손을 카메라에 가까이 하면 전진, 멀리 하면 후진</li>
          <li><strong>그리퍼 제어:</strong> 주먹 쥐기 → 그리퍼 닫힘 / 손가락 펴기 → 그리퍼 열림</li>
          <li><strong>종료:</strong> 웹캠 창에서 <kbd>ESC</kbd> 또는 <kbd>q</kbd> 키</li>
        </ul>

        <blockquote class="note"><strong>참고:</strong> 라쿤봇이 연결되어 있지 않으면 시뮬레이션 모드(오프라인)로 실행되어, 로봇 없이도 좌표 매핑과 UI 동작을 테스트할 수 있습니다.</blockquote>

        <div class="control-panel">
          <button id="btn-start-camera" class="btn btn-primary">카메라 제어 시작</button>
          <button id="btn-stop-camera" class="btn btn-danger" disabled>중지</button>
          <span id="camera-status" class="status-badge status-idle">대기중</span>
        </div>
        <pre id="camera-log" class="log-box"></pre>
      `
    }
  }
};
