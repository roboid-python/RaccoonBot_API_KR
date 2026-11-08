import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { JOINT_OPTIONS_NO_ALL, BATTERY_STATE_OPTIONS } from '../common.js';

const COLOUR = 65;

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'raccoon_encoder',
    message0: '관절 %1 각도 센서값',
    args0: [{ type: 'field_dropdown', name: 'JOINT', options: JOINT_OPTIONS_NO_ALL }],
    output: 'Number',
    colour: COLOUR,
    tooltip: '해당 관절의 현재 각도(엔코더 값, 약 0.088° 단위)를 읽습니다.',
  },
  {
    type: 'raccoon_signal_strength',
    message0: '신호 세기',
    output: 'Number',
    colour: COLOUR,
    tooltip: '라쿤봇과의 블루투스 신호 세기(dBm, -128~0)를 읽습니다. 0에 가까울수록 강합니다.',
  },
  {
    type: 'raccoon_battery_state_is',
    message0: '배터리 상태가 %1 인가?',
    args0: [{ type: 'field_dropdown', name: 'STATE', options: BATTERY_STATE_OPTIONS }],
    output: 'Boolean',
    colour: COLOUR,
    tooltip: '배터리 상태가 지정한 상태와 같은지 확인합니다. (정상 ≥ 3.45V, 낮음 ≥ 3.25V, 그 미만은 부족)',
  },
  {
    type: 'raccoon_battery_state',
    message0: '배터리 상태값',
    output: 'Number',
    colour: COLOUR,
    tooltip: '배터리 상태를 숫자로 읽습니다. 2: 정상, 1: 낮음, 0: 부족',
  },
  {
    type: 'raccoon_is_moving',
    message0: '로봇이 움직이는 중인가?',
    output: 'Boolean',
    colour: COLOUR,
    tooltip: '관절 중 하나라도 움직이고 있으면 참입니다.',
  },
  {
    type: 'raccoon_charge_state',
    message0: '충전 중인가?',
    output: 'Boolean',
    colour: COLOUR,
    tooltip: '현재 충전 중인지 확인합니다.',
  },
]);

pythonGenerator.forBlock['raccoon_encoder'] = function (block) {
  return [`raccoon.encoder(${block.getFieldValue('JOINT')})`, Order.FUNCTION_CALL];
};

pythonGenerator.forBlock['raccoon_signal_strength'] = () => ['raccoon.signal_strength()', Order.FUNCTION_CALL];

pythonGenerator.forBlock['raccoon_battery_state_is'] = function (block) {
  return [`(raccoon.battery_state() == ${block.getFieldValue('STATE')})`, Order.RELATIONAL];
};

pythonGenerator.forBlock['raccoon_battery_state'] = () => ['raccoon.battery_state()', Order.FUNCTION_CALL];
pythonGenerator.forBlock['raccoon_is_moving'] = () => ['raccoon.is_moving()', Order.FUNCTION_CALL];

pythonGenerator.forBlock['raccoon_charge_state'] = () => ['(raccoon.charge_state() == 1)', Order.RELATIONAL];

export const sensorsCategory = {
  kind: 'category',
  name: '센서',
  colour: COLOUR,
  contents: [
    { kind: 'block', type: 'raccoon_encoder' },
    { kind: 'block', type: 'raccoon_signal_strength' },
    { kind: 'block', type: 'raccoon_is_moving' },
    { kind: 'block', type: 'raccoon_battery_state_is' },
    { kind: 'block', type: 'raccoon_battery_state' },
    { kind: 'block', type: 'raccoon_charge_state' },
  ],
};
