import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { JOINT_OPTIONS_NO_ALL } from '../common.js';

const COLOUR = 160;
const AXIS_OPTIONS = [
  ['X (앞/뒤)', '0'],
  ['Y (좌/우)', '1'],
  ['Z (위/아래)', '2'],
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
    tooltip: '그리퍼(말단 장치)를 절대 XYZ 좌표(cm)로 이동합니다.',
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
    tooltip: '현재 위치에서 상대적으로(dX, dY, dZ) 이동합니다.',
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
    tooltip: '해당 좌표가 로봇이 도달 가능한 안전 범위 안에 있는지 확인합니다.',
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
    tooltip: '현재 말단 장치의 X, Y, 또는 Z 좌표 값(cm)을 읽습니다.',
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
    tooltip: '역기구학: XYZ 좌표에 대응하는 특정 관절의 각도를 계산합니다. 도달 불가능하면 빈 값이 됩니다.',
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
    tooltip: '순기구학: 4개 관절 각도에 대응하는 X, Y, 또는 Z 좌표를 계산합니다.',
  },
]);

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
        D4: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
      },
    },
  ],
};
