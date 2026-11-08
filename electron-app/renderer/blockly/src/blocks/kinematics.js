import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { JOINT_OPTIONS_NO_ALL, UNIT_OPTIONS } from '../common.js';

const COLOUR = 160;
// Coordinate frame used by roboid Raccoon.xyz()/move_to(): origin at the base on the
// table, X = forward, Y = left, Z = up (base joint axis is 8.25cm above the table,
// upper arm and forearm are 10cm each).
const AXIS_OPTIONS = [
  ['X (앞+/뒤-)', '0'],
  ['Y (왼쪽+/오른쪽-)', '1'],
  ['Z (위+/아래-)', '2'],
];

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'raccoon_move_to',
    message0: '좌표로 이동 X:%1 Y:%2 Z:%3 (cm), 속도 %4 (대기 %5)',
    args0: [
      { type: 'input_value', name: 'X', check: 'Number' },
      { type: 'input_value', name: 'Y', check: 'Number' },
      { type: 'input_value', name: 'Z', check: 'Number' },
      { type: 'input_value', name: 'SPEED', check: 'Number' },
      { type: 'field_checkbox', name: 'WAIT', checked: true },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '좌표 기준점(기본: 그리퍼 끝)을 절대 XYZ 좌표로 이동합니다. 원점은 로봇 바닥 중심, X는 앞, Y는 왼쪽, Z는 위쪽입니다. 손목 각도는 현재 값을 유지하며, 도달할 수 없거나 관절 범위를 벗어나면 오류음이 납니다.',
  },
  {
    type: 'raccoon_move_by',
    message0: '좌표 이동(상대) dX:%1 dY:%2 dZ:%3 (cm), 속도 %4 (대기 %5)',
    args0: [
      { type: 'input_value', name: 'DX', check: 'Number' },
      { type: 'input_value', name: 'DY', check: 'Number' },
      { type: 'input_value', name: 'DZ', check: 'Number' },
      { type: 'input_value', name: 'SPEED', check: 'Number' },
      { type: 'field_checkbox', name: 'WAIT', checked: true },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '현재 좌표에서 상대적으로(dX, dY, dZ) 이동합니다. 단위는 현재 설정(cm/inch)을 따릅니다.',
  },
  {
    type: 'raccoon_can_move_to',
    message0: '좌표 X:%1 Y:%2 Z:%3 로 이동 가능한가?',
    args0: [
      { type: 'input_value', name: 'X', check: 'Number' },
      { type: 'input_value', name: 'Y', check: 'Number' },
      { type: 'input_value', name: 'Z', check: 'Number' },
    ],
    output: 'Boolean',
    colour: COLOUR,
    inputsInline: true,
    tooltip: '현재 손목 각도를 유지한 채로 해당 좌표에 도달할 수 있고, 계산된 관절 각도가 모두 허용 범위 안인지 확인합니다.',
  },
  {
    type: 'raccoon_can_move_by',
    message0: '상대좌표 dX:%1 dY:%2 dZ:%3 로 이동 가능한가?',
    args0: [
      { type: 'input_value', name: 'DX', check: 'Number' },
      { type: 'input_value', name: 'DY', check: 'Number' },
      { type: 'input_value', name: 'DZ', check: 'Number' },
    ],
    output: 'Boolean',
    colour: COLOUR,
    inputsInline: true,
    tooltip: '현재 위치에서 상대 이동이 가능한지 확인합니다.',
  },
  {
    type: 'raccoon_current_xyz',
    message0: '현재 좌표 %1',
    args0: [{ type: 'field_dropdown', name: 'AXIS', options: AXIS_OPTIONS }],
    output: 'Number',
    colour: COLOUR,
    tooltip: '엔코더 값으로 계산한 현재 좌표 기준점의 X, Y, 또는 Z 좌표를 읽습니다. (단위: 현재 설정)',
  },
  {
    type: 'raccoon_xyz_to_degree',
    message0: '좌표 X:%1 Y:%2 Z:%3 를 관절 %4 각도로 변환',
    args0: [
      { type: 'input_value', name: 'X', check: 'Number' },
      { type: 'input_value', name: 'Y', check: 'Number' },
      { type: 'input_value', name: 'Z', check: 'Number' },
      { type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS_NO_ALL },
    ],
    output: 'Number',
    colour: COLOUR,
    inputsInline: true,
    tooltip: '역기구학: 현재 손목 방향을 유지할 때 XYZ 좌표에 대응하는 관절 각도를 계산합니다. 도달 불가능하면 None(빈 값)이 됩니다.',
  },
  {
    type: 'raccoon_degree_to_xyz',
    message0: '관절 각도 1:%1 2:%2 3:%3 4:%4 를 좌표 %5 로 변환',
    args0: [
      { type: 'input_value', name: 'D1', check: 'Number' },
      { type: 'input_value', name: 'D2', check: 'Number' },
      { type: 'input_value', name: 'D3', check: 'Number' },
      { type: 'input_value', name: 'D4', check: 'Number' },
      { type: 'field_dropdown', name: 'AXIS', options: AXIS_OPTIONS },
    ],
    output: 'Number',
    colour: COLOUR,
    tooltip: '순기구학: 4개 관절 각도에 대응하는 좌표 기준점의 X, Y, 또는 Z 좌표를 계산합니다.',
  },
  {
    type: 'raccoon_unit',
    message0: '좌표 단위를 %1 (으)로 설정',
    args0: [{ type: 'field_dropdown', name: 'UNIT', options: UNIT_OPTIONS }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '좌표 이동/계산 블록에 사용할 길이 단위를 정합니다. (기본: cm)',
  },
]);

pythonGenerator.forBlock['raccoon_unit'] = (block) => `raccoon.unit('${block.getFieldValue('UNIT')}')
`;

function wait(block) {
  return block.getFieldValue('WAIT') === 'TRUE' ? 'True' : 'False';
}

pythonGenerator.forBlock['raccoon_move_to'] = function (block, gen) {
  const x = gen.valueToCode(block, 'X', Order.NONE) || '0';
  const y = gen.valueToCode(block, 'Y', Order.NONE) || '0';
  const z = gen.valueToCode(block, 'Z', Order.NONE) || '0';
  const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '100';
  return `raccoon.move_to(${x}, ${y}, ${z}, ${speed}, wait=${wait(block)})\n`;
};

pythonGenerator.forBlock['raccoon_move_by'] = function (block, gen) {
  const dx = gen.valueToCode(block, 'DX', Order.NONE) || '0';
  const dy = gen.valueToCode(block, 'DY', Order.NONE) || '0';
  const dz = gen.valueToCode(block, 'DZ', Order.NONE) || '0';
  const speed = gen.valueToCode(block, 'SPEED', Order.NONE) || '100';
  return `raccoon.move_by(${dx}, ${dy}, ${dz}, ${speed}, wait=${wait(block)})\n`;
};

pythonGenerator.forBlock['raccoon_can_move_to'] = function (block, gen) {
  const x = gen.valueToCode(block, 'X', Order.NONE) || '0';
  const y = gen.valueToCode(block, 'Y', Order.NONE) || '0';
  const z = gen.valueToCode(block, 'Z', Order.NONE) || '0';
  return [`raccoon.can_move_to(${x}, ${y}, ${z})`, Order.FUNCTION_CALL];
};

pythonGenerator.forBlock['raccoon_can_move_by'] = function (block, gen) {
  const dx = gen.valueToCode(block, 'DX', Order.NONE) || '0';
  const dy = gen.valueToCode(block, 'DY', Order.NONE) || '0';
  const dz = gen.valueToCode(block, 'DZ', Order.NONE) || '0';
  return [`raccoon.can_move_by(${dx}, ${dy}, ${dz})`, Order.FUNCTION_CALL];
};

pythonGenerator.forBlock['raccoon_current_xyz'] = function (block) {
  const axis = block.getFieldValue('AXIS');
  return [`raccoon.xyz()[${axis}]`, Order.MEMBER];
};

pythonGenerator.forBlock['raccoon_xyz_to_degree'] = function (block, gen) {
  const x = gen.valueToCode(block, 'X', Order.NONE) || '0';
  const y = gen.valueToCode(block, 'Y', Order.NONE) || '0';
  const z = gen.valueToCode(block, 'Z', Order.NONE) || '0';
  const joint = Number(block.getFieldValue('JOINT'));
  return [`raccoon.xyz_to_degree(${x}, ${y}, ${z})[${joint - 1}]`, Order.MEMBER];
};

pythonGenerator.forBlock['raccoon_degree_to_xyz'] = function (block, gen) {
  const d1 = gen.valueToCode(block, 'D1', Order.NONE) || '0';
  const d2 = gen.valueToCode(block, 'D2', Order.NONE) || '0';
  const d3 = gen.valueToCode(block, 'D3', Order.NONE) || '0';
  const d4 = gen.valueToCode(block, 'D4', Order.NONE) || '0';
  const axis = block.getFieldValue('AXIS');
  return [`raccoon.degree_to_xyz(${d1}, ${d2}, ${d3}, ${d4})[${axis}]`, Order.MEMBER];
};

export const kinematicsCategory = {
  kind: 'category',
  name: '좌표 및 기구학',
  colour: COLOUR,
  contents: [
    { kind: 'block', type: 'raccoon_unit' },
    {
      kind: 'block',
      type: 'raccoon_move_to',
      inputs: {
        X: { shadow: { type: 'math_number', fields: { NUM: 15 } } },
        Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        Z: { shadow: { type: 'math_number', fields: { NUM: 12 } } },
        SPEED: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_move_by',
      inputs: {
        DX: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        DY: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        DZ: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        SPEED: { shadow: { type: 'math_number', fields: { NUM: 100 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_can_move_to',
      inputs: {
        X: { shadow: { type: 'math_number', fields: { NUM: 15 } } },
        Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        Z: { shadow: { type: 'math_number', fields: { NUM: 12 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_can_move_by',
      inputs: {
        DX: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        DY: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        DZ: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
      },
    },
    { kind: 'block', type: 'raccoon_current_xyz' },
    {
      kind: 'block',
      type: 'raccoon_xyz_to_degree',
      inputs: {
        X: { shadow: { type: 'math_number', fields: { NUM: 15 } } },
        Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        Z: { shadow: { type: 'math_number', fields: { NUM: 12 } } },
      },
    },
    {
      kind: 'block',
      type: 'raccoon_degree_to_xyz',
      inputs: {
        D1: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
        D2: { shadow: { type: 'math_number', fields: { NUM: -10 } } },
        D3: { shadow: { type: 'math_number', fields: { NUM: -140 } } },
        D4: { shadow: { type: 'math_number', fields: { NUM: 60 } } },
      },
    },
  ],
};
