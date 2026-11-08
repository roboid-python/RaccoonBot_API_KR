// Preset example programs for the block editor, as Blockly workspace
// serialization states. Loaded via the 예제 dropdown in the blocks page.

function num(n) {
  return { shadow: { type: 'math_number', fields: { NUM: n } } };
}

const helloWave = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: 'raccoon_sound_until_done',
        x: 30,
        y: 30,
        fields: { SOUND: 'start' },
        inputs: { REPEAT: num(1) },
        next: {
          block: {
            type: 'controls_repeat_ext',
            inputs: {
              TIMES: num(2),
              DO: {
                block: {
                  type: 'raccoon_degree_to_single',
                  fields: { JOINT: '4', WAIT: 'TRUE' },
                  inputs: { DEG: num(45), SPEED: num(100) },
                  next: {
                    block: {
                      type: 'raccoon_degree_to_single',
                      fields: { JOINT: '4', WAIT: 'TRUE' },
                      inputs: { DEG: num(-45), SPEED: num(100) },
                    },
                  },
                },
              },
            },
            next: {
              block: {
                type: 'raccoon_degree_to_single',
                fields: { JOINT: '4', WAIT: 'TRUE' },
                inputs: { DEG: num(0), SPEED: num(100) },
                next: {
                  block: {
                    type: 'raccoon_sound_until_done',
                    fields: { SOUND: 'good_job' },
                    inputs: { REPEAT: num(1) },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
};

const gripper = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: 'raccoon_open_gripper',
        x: 30,
        y: 30,
        next: {
          block: {
            type: 'raccoon_wait',
            inputs: { MS: num(1000) },
            next: {
              block: {
                type: 'raccoon_close_gripper',
                next: {
                  block: {
                    type: 'raccoon_wait',
                    inputs: { MS: num(1000) },
                    next: {
                      block: {
                        type: 'raccoon_open_gripper',
                        next: {
                          block: {
                            type: 'raccoon_sound_until_done',
                            fields: { SOUND: 'good_job' },
                            inputs: { REPEAT: num(1) },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
};

const homePose = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: 'raccoon_beep',
        x: 30,
        y: 30,
        next: {
          block: {
            type: 'raccoon_degree_to_all',
            fields: { WAIT: 'TRUE' },
            inputs: {
              D1: num(0),
              D2: num(-10),
              D3: num(-140),
              D4: num(60),
              SPEED: num(60),
            },
            next: {
              block: {
                type: 'raccoon_sound_until_done',
                fields: { SOUND: 'good_job' },
                inputs: { REPEAT: num(1) },
              },
            },
          },
        },
      },
    ],
  },
};

const printEncoder = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: 'controls_repeat_ext',
        x: 30,
        y: 30,
        inputs: {
          TIMES: num(5),
          DO: {
            block: {
              type: 'text_print',
              inputs: {
                TEXT: { block: { type: 'raccoon_encoder', fields: { JOINT: '1' } } },
              },
              next: {
                block: { type: 'raccoon_wait', inputs: { MS: num(500) } },
              },
            },
          },
        },
      },
    ],
  },
};

export const EXAMPLES = [
  {
    id: 'hello-wave',
    name: { ko: '인사하기 (관절 4 흔들기)', ja: 'あいさつ (関節4を振る)' },
    state: helloWave,
  },
  {
    id: 'gripper',
    name: { ko: '그리퍼 열고 닫기', ja: 'グリッパーの開閉' },
    state: gripper,
  },
  {
    id: 'home-pose',
    name: { ko: '홈 자세로 이동', ja: 'ホーム姿勢へ移動' },
    state: homePose,
  },
  {
    id: 'print-encoder',
    name: { ko: '관절 1 각도 출력 (5회)', ja: '関節1の角度を出力 (5回)' },
    state: printEncoder,
  },
];
