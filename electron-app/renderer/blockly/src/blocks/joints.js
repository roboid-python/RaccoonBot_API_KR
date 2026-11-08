import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { JOINT_OPTIONS, JOINT_OPTIONS_NO_ALL, JOINT_LIMITS_TEXT, INIT_POSE } from '../common.js';

const COLOUR = 210;

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'raccoon_velocity_single',
    message0: '관절 %1 속도를 %2 (%) 로 설정',
    args0: [
      { type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS },
      { type: 'input_value', name: 'VEL', check: 'Number' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '지정한 관절(들)을 속도 모드로 전환하고 회전 속도를 -100~100(%)로 설정합니다. 범위를 벗어난 값은 -100/100으로 잘립니다. (127은 모터 끄기와 같지만 "모터 끄기" 블록 사용을 권장합니다.) 관절 각도 제한은 속도 모드에서도 로봇이 스스로 지킵니다.',
  },
  {
    type: 'raccoon_velocity_all',
    message0: '관절 속도 1:%1 2:%2 3:%3 4:%4 (%) 로 설정',
    args0: [
      { type: 'input_value', name: 'V1', check: 'Number' },
      { type: 'input_value', name: 'V2', check: 'Number' },
      { type: 'input_value', name: 'V3', check: 'Number' },
      { type: 'input_value', name: 'V4', check: 'Number' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '4개 관절의 속도를 한 번에 -100~100(%)로 설정합니다. 범위를 벗어난 값은 잘립니다.',
  },
  {
    type: 'raccoon_turn_off',
    message0: '관절 %1 모터 끄기 (자유 회전)',
    args0: [{ type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '지정한 관절의 모터 힘을 빼서 손으로 움직일 수 있게 합니다.',
  },
  {
    type: 'raccoon_stop',
    message0: '관절 %1 정지',
    args0: [{ type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '지정한 관절의 속도를 0으로 만들어 정지합니다.',
  },
  {
    type: 'raccoon_degree_to_single',
    message0: '관절 %1 각도를 %2 ° 로, 속도 %3 (대기 %4)',
    args0: [
      { type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS },
      { type: 'input_value', name: 'DEG', check: 'Number' },
      { type: 'input_value', name: 'SPEED', check: 'Number' },
      { type: 'field_checkbox', name: 'WAIT', checked: true },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    inputsInline: true,
    tooltip:
      `관절을 절대 각도로 이동합니다. 허용 범위 — ${JOINT_LIMITS_TEXT}. 범위를 벗어나면 움직이지 않고 오류음이 납니다. 속도는 0~100. 대기 체크 시 도착할 때까지 다음 블록으로 넘어가지 않습니다.`,
  },
  {
    type: 'raccoon_degree_to_all',
    message0: '관절 각도 1:%1 2:%2 3:%3 4:%4 (°), 속도 %5 (대기 %6)',
    args0: [
      { type: 'input_value', name: 'D1', check: 'Number' },
      { type: 'input_value', name: 'D2', check: 'Number' },
      { type: 'input_value', name: 'D3', check: 'Number' },
      { type: 'input_value', name: 'D4', check: 'Number' },
      { type: 'input_value', name: 'SPEED', check: 'Number' },
      { type: 'field_checkbox', name: 'WAIT', checked: true },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: `4개 관절을 동시에 각각의 절대 각도로 이동합니다. 하나라도 범위를 벗어나면 전체가 움직이지 않고 오류음이 납니다. 허용 범위 — ${JOINT_LIMITS_TEXT}. 기본 자세는 ${INIT_POSE.join(', ')}° 입니다.`,
  },
  {
    type: 'raccoon_degree_by_single',
    message0: '관절 %1 각도를 %2 ° 만큼 변경, 속도 %3 (대기 %4)',
    args0: [
      { type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS },
      { type: 'input_value', name: 'DEG', check: 'Number' },
      { type: 'input_value', name: 'SPEED', check: 'Number' },
      { type: 'field_checkbox', name: 'WAIT', checked: true },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    inputsInline: true,
    tooltip: '관절을 현재 엔코더 각도에서 상대적으로(더하기/빼기) 이동합니다. "전체 관절"을 고르면 4개 관절 모두에 같은 변화량을 더합니다. 결과 각도가 범위를 벗어나면 오류음이 납니다.',
  },
  {
    type: 'raccoon_degree_by_all',
    message0: '관절 각도 변화량 1:%1 2:%2 3:%3 4:%4 (°), 속도 %5 (대기 %6)',
    args0: [
      { type: 'input_value', name: 'D1', check: 'Number' },
      { type: 'input_value', name: 'D2', check: 'Number' },
      { type: 'input_value', name: 'D3', check: 'Number' },
      { type: 'input_value', name: 'D4', check: 'Number' },
      { type: 'input_value', name: 'SPEED', check: 'Number' },
      { type: 'field_checkbox', name: 'WAIT', checked: true },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '4개 관절을 현재 각도에서 각각의 변화량만큼 동시에 이동합니다.',
  },
  {
    type: 'raccoon_can_degree_to',
    message0: '관절 %1 각도를 %2 ° 로 이동 가능한가?',
    args0: [
      { type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS_NO_ALL },
      { type: 'input_value', name: 'DEG', check: 'Number' },
    ],
    output: 'Boolean',
    colour: COLOUR,
    inputsInline: true,
    tooltip: `해당 각도가 관절 허용 범위 안에 있는지 확인합니다. (${JOINT_LIMITS_TEXT})`,
  },
  {
    type: 'raccoon_can_degree_to_all',
    message0: '관절 각도 1:%1 2:%2 3:%3 4:%4 (°) 로 이동 가능한가?',
    args0: [
      { type: 'input_value', name: 'D1', check: 'Number' },
      { type: 'input_value', name: 'D2', check: 'Number' },
      { type: 'input_value', name: 'D3', check: 'Number' },
      { type: 'input_value', name: 'D4', check: 'Number' },
    ],
    output: 'Boolean',
    colour: COLOUR,
    tooltip: '4개 관절 각도가 모두 허용 범위 안에 있는지 확인합니다.',
  },
  {
    type: 'raccoon_can_degree_by',
    message0: '관절 %1 각도를 %2 ° 만큼 변경 가능한가?',
    args0: [
      { type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS },
      { type: 'input_value', name: 'DEG', check: 'Number' },
    ],
    output: 'Boolean',
    colour: COLOUR,
    inputsInline: true,
    tooltip: '현재 각도에 변화량을 더한 결과가 허용 범위 안에 있는지 확인합니다.',
  },
  {
    type: 'raccoon_init_pose',
    message0: '기본 자세로 이동 (그리퍼 열기, 대기 %1)',
    args0: [{ type: 'field_checkbox', name: 'WAIT', checked: true }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: `말단 고정을 해제하고 그리퍼를 연 뒤, 관절을 기본 자세(${INIT_POSE.join(', ')}°)로 이동합니다.`,
  },
  {
    type: 'raccoon_precision_mode',
    message0: '정밀 이동 모드 %1',
    args0: [{ type: 'field_dropdown', name: 'ON', options: [['켜기', 'True'], ['끄기', 'False']] }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '켜면 각도/좌표 이동(대기 체크 시) 후 목표 위치로 한 번 더 보정 이동하여 더 정확하게 도착합니다. 대신 시간이 조금 더 걸립니다.',
  },
]);

function wait(gen, block) {
  return block.getFieldValue('WAIT') === 'TRUE' ? 'True' : 'False';
}

pythonGenerator.forBlock['raccoon_velocity_single'] = function (block, gen) {
  const joint = block.getFieldValue('JOINT');
  const vel = gen.valueToCode(block, 'VEL', Order.NONE) || '0';
  return `raccoon.velocity(${joint}, ${vel})\n`;
};

pythonGenerator.forBlock['raccoon_velocity_all'] = function (block, gen) {
  const v1 = gen.valueToCode(block, 'V1', Order.NONE) || '0';
  const v2 = gen.valueToCode(block, 'V2', Order.NONE) || '0';
  const v3 = gen.valueToCode(block, 'V3', Order.NONE) || '0';
  const v4 = gen.valueToCode(block, 'V4', Order.NONE) || '0';
  return `raccoon.velocity(${v1}, ${v2}, ${v3}, ${v4})\n`;
};

pythonGenerator.forBlock['raccoon_turn_off'] = function (block) {
  return `raccoon.turn_off(${block.getFieldValue('JOINT')})\n`;
};

pythonGenerator.forBlock['raccoon_stop'] = function (block) {
  return `raccoon.stop(${block.getFieldValue('JOINT')})\n`;
};

pythonGenerator.forBlock['raccoon_degree_to_single'] = function (block, gen) {
  const joint = block.getFieldValue('JOINT');
  const deg = gen.valueToCode(block, 'DEG', Order.NONE) || '0';
  const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '100';
  return `raccoon.degree_to(${joint}, ${deg}, ${speed}, wait=${wait(gen, block)})\n`;
};

pythonGenerator.forBlock['raccoon_degree_to_all'] = function (block, gen) {
  const d1 = gen.valueToCode(block, 'D1', Order.NONE) || '0';
  const d2 = gen.valueToCode(block, 'D2', Order.NONE) || '0';
  const d3 = gen.valueToCode(block, 'D3', Order.NONE) || '0';
  const d4 = gen.valueToCode(block, 'D4', Order.NONE) || '0';
  const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '100';
  return `raccoon.degree_to(${d1}, ${d2}, ${d3}, ${d4}, ${speed}, wait=${wait(gen, block)})\n`;
};

pythonGenerator.forBlock['raccoon_degree_by_single'] = function (block, gen) {
  const joint = block.getFieldValue('JOINT');
  const deg = gen.valueToCode(block, 'DEG', Order.NONE) || '0';
  const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '100';
  return `raccoon.degree_by(${joint}, ${deg}, ${speed}, wait=${wait(gen, block)})\n`;
};

pythonGenerator.forBlock['raccoon_degree_by_all'] = function (block, gen) {
  const d1 = gen.valueToCode(block, 'D1', Order.NONE) || '0';
  const d2 = gen.valueToCode(block, 'D2', Order.NONE) || '0';
  const d3 = gen.valueToCode(block, 'D3', Order.NONE) || '0';
  const d4 = gen.valueToCode(block, 'D4', Order.NONE) || '0';
  const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '100';
  return `raccoon.degree_by(${d1}, ${d2}, ${d3}, ${d4}, ${speed}, wait=${wait(gen, block)})\n`;
};

pythonGenerator.forBlock['raccoon_can_degree_to'] = function (block, gen) {
  const joint = block.getFieldValue('JOINT');
  const deg = gen.valueToCode(block, 'DEG', Order.NONE) || '0';
  return [`raccoon.can_degree_to(${joint}, ${deg})`, Order.FUNCTION_CALL];
};

pythonGenerator.forBlock['raccoon_can_degree_to_all'] = function (block, gen) {
  const d = ['D1', 'D2', 'D3', 'D4'].map((n) => gen.valueToCode(block, n, Order.NONE) || '0');
  return [`raccoon.can_degree_to(${d.join(', ')})`, Order.FUNCTION_CALL];
};

pythonGenerator.forBlock['raccoon_can_degree_by'] = function (block, gen) {
  const joint = block.getFieldValue('JOINT');
  const deg = gen.valueToCode(block, 'DEG', Order.NONE) || '0';
  return [`raccoon.can_degree_by(${joint}, ${deg})`, Order.FUNCTION_CALL];
};

pythonGenerator.forBlock['raccoon_init_pose'] = function (block) {
  return `raccoon.init_pose(wait=${wait(null, block)})
`;
};

pythonGenerator.forBlock['raccoon_precision_mode'] = function (block) {
  return `raccoon.precision_mode(${block.getFieldValue('ON')})
`;
};

export const jointsCategory = {
  kind: 'category',
  name: '관절 제어',
  colour: COLOUR,
  contents: [
    { kind: 'block', type: 'raccoon_init_pose' },
    { kind: 'block', type: 'raccoon_precision_mode' },
    {
      kind: 'block',
      type: 'raccoon_velocity_single',
      inputs: { VEL: { shadow: { type: 'math_number', fields: { NUM: 50 } } } },
    },
    {
      kind: 'block',
      type: 'raccoon_velocity_all',
      inputs: {
        V1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        V2: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        V3: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        V4: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
      },
    },
    { kind: 'block', type: 'raccoon_turn_off' },
    { kind: 'block', type: 'raccoon_stop' },
    {
      kind: 'block',
      type: 'raccoon_degree_to_single',
      inputs: {
        DEG: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        SPEED: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_degree_to_all',
      inputs: {
        D1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        D2: { shadow: { type: 'math_number', fields: { NUM: -10 } } },
        D3: { shadow: { type: 'math_number', fields: { NUM: -140 } } },
        D4: { shadow: { type: 'math_number', fields: { NUM: 60 } } },
        SPEED: { shadow: { type: 'math_number', fields: { NUM: 60 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_degree_by_single',
      inputs: {
        DEG: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
        SPEED: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_degree_by_all',
      inputs: {
        D1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        D2: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        D3: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        D4: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        SPEED: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_can_degree_to',
      inputs: { DEG: { shadow: { type: 'math_number', fields: { NUM: 0 } } } },
    },
    {
      kind: 'block',
      type: 'raccoon_can_degree_to_all',
      inputs: {
        D1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        D2: { shadow: { type: 'math_number', fields: { NUM: -10 } } },
        D3: { shadow: { type: 'math_number', fields: { NUM: -140 } } },
        D4: { shadow: { type: 'math_number', fields: { NUM: 60 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_can_degree_by',
      inputs: { DEG: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
    },
  ],
};
