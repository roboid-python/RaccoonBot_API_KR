import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { JOINT_OPTIONS, JOINT_OPTIONS_NO_ALL } from '../common.js';

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
    tooltip: '지정한 관절(들)의 회전 속도를 -100~100(%)로 설정합니다. 127은 모터를 자유 회전(끄기) 상태로 만듭니다.',
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
    tooltip: '4개 관절의 속도를 한 번에 설정합니다.',
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
      '관절을 절대 각도로 이동합니다. 관절1: -120~120, 관절2: -90~30, 관절3: -150~0, 관절4: -105~105 (도) 범위를 벗어나면 무시되고 오류음이 납니다. 대기 체크 시 도착할 때까지 다음 블록으로 넘어가지 않습니다.',
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
    tooltip: '4개 관절을 동시에 각각의 절대 각도로 이동합니다.',
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
    tooltip: '관절을 현재 각도에서 상대적으로(더하기/빼기) 이동합니다.',
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
    tooltip: '4개 관절을 현재 각도에서 상대적으로 동시에 이동합니다.',
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
    tooltip: '해당 각도로 이동이 가능한지(안전 범위 내인지) 미리 확인합니다.',
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

export const jointsCategory = {
  kind: 'category',
  name: '관절 제어',
  colour: COLOUR,
  contents: [
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
        D4: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
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
  ],
};
