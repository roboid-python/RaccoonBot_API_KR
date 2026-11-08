import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { END_EFFECTOR_OPTIONS } from '../common.js';

const COLOUR = 20;

const statement = { previousStatement: null, nextStatement: null, colour: COLOUR };
const waitArg = { type: 'field_checkbox', name: 'WAIT', checked: true };

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'raccoon_lock_horz',
    message0: '말단 장치 수평 고정 (대기 %1)',
    args0: [waitArg],
    ...statement,
    tooltip: '이후 관절이 움직여도 말단 장치(4번 관절)가 항상 수평을 유지하도록 고정합니다. 대기 체크 시 자세 보정이 끝날 때까지 기다립니다.',
  },
  {
    type: 'raccoon_lock_vert',
    message0: '말단 장치 수직 고정 (대기 %1)',
    args0: [waitArg],
    ...statement,
    tooltip: '이후 관절이 움직여도 말단 장치(4번 관절)가 항상 수직(아래 방향)을 유지하도록 고정합니다.',
  },
  { type: 'raccoon_unlock', message0: '말단 장치 고정 해제', ...statement, tooltip: '수평/수직 고정을 풀고 일반 관절 모드로 되돌립니다.' },
  {
    type: 'raccoon_open_gripper',
    message0: '그리퍼 열기 (대기 %1)',
    args0: [waitArg],
    ...statement,
    tooltip: '그리퍼(집게)를 엽니다(place). 대기 체크 시 0.5초 기다립니다.',
  },
  {
    type: 'raccoon_close_gripper',
    message0: '그리퍼 닫기 (대기 %1)',
    args0: [waitArg],
    ...statement,
    tooltip: '그리퍼(집게)를 닫습니다(pick). 대기 체크 시 0.5초 기다립니다.',
  },
  {
    type: 'raccoon_gripper_state',
    message0: '그리퍼 상태값',
    output: 'Number',
    colour: COLOUR,
    tooltip: '장착된 그리퍼가 보고하는 상태값(0~255)을 읽습니다. 그리퍼가 없으면 0입니다.',
  },
  {
    type: 'raccoon_end_effector',
    message0: '좌표 기준점을 %1 (으)로 설정',
    args0: [{ type: 'field_dropdown', name: 'WHERE', options: END_EFFECTOR_OPTIONS }],
    ...statement,
    tooltip:
      '좌표 이동/현재 좌표 계산에 사용할 기준점을 정합니다. "그리퍼 끝"은 장착된 그리퍼 종류에 맞춰 자동으로 끝점(약 7.5~8cm 앞)을 사용하고, "손목"은 4번 관절 축을 기준으로 합니다. (기본: 그리퍼 끝)',
  },
  {
    type: 'raccoon_end_effector_to',
    message0: '좌표 기준점을 손목에서 앞쪽 %1 위쪽 %2 (cm) 로 설정',
    args0: [
      { type: 'input_value', name: 'Y', check: 'Number' },
      { type: 'input_value', name: 'Z', check: 'Number' },
    ],
    ...statement,
    inputsInline: true,
    tooltip: '직접 만든 도구를 달았을 때, 손목(4번 관절) 기준으로 도구 끝의 위치를 지정합니다. 값은 현재 단위(cm/inch)를 따릅니다.',
  },
  {
    type: 'raccoon_end_effector_by',
    message0: '좌표 기준점을 앞쪽 %1 위쪽 %2 (cm) 만큼 이동',
    args0: [
      { type: 'input_value', name: 'DY', check: 'Number' },
      { type: 'input_value', name: 'DZ', check: 'Number' },
    ],
    ...statement,
    inputsInline: true,
    tooltip: '현재 좌표 기준점에 오프셋을 더합니다. (그리퍼 끝/손목 기준에도 적용됩니다)',
  },
]);

const wait = (block) => (block.getFieldValue('WAIT') === 'TRUE' ? 'True' : 'False');

for (const type of ['raccoon_lock_horz', 'raccoon_lock_vert', 'raccoon_open_gripper', 'raccoon_close_gripper']) {
  const method = type.replace('raccoon_', '');
  pythonGenerator.forBlock[type] = (block) =>
    wait(block) === 'True' ? `raccoon.${method}()\n` : `raccoon.${method}(wait=False)\n`;
}

pythonGenerator.forBlock['raccoon_unlock'] = () => `raccoon.unlock()\n`;

pythonGenerator.forBlock['raccoon_gripper_state'] = () => ['raccoon.gripper_state()', Order.FUNCTION_CALL];

pythonGenerator.forBlock['raccoon_end_effector'] = (block) => `raccoon.end_effector('${block.getFieldValue('WHERE')}')\n`;

pythonGenerator.forBlock['raccoon_end_effector_to'] = function (block, gen) {
  const y = gen.valueToCode(block, 'Y', Order.NONE) || '0';
  const z = gen.valueToCode(block, 'Z', Order.NONE) || '0';
  return `raccoon.end_effector_to(${y}, ${z})\n`;
};

pythonGenerator.forBlock['raccoon_end_effector_by'] = function (block, gen) {
  const dy = gen.valueToCode(block, 'DY', Order.NONE) || '0';
  const dz = gen.valueToCode(block, 'DZ', Order.NONE) || '0';
  return `raccoon.end_effector_by(${dy}, ${dz})\n`;
};

const num = (n) => ({ shadow: { type: 'math_number', fields: { NUM: n } } });

export const endEffectorCategory = {
  kind: 'category',
  name: '말단 장치',
  colour: COLOUR,
  contents: [
    { kind: 'block', type: 'raccoon_open_gripper' },
    { kind: 'block', type: 'raccoon_close_gripper' },
    { kind: 'block', type: 'raccoon_gripper_state' },
    { kind: 'block', type: 'raccoon_lock_horz' },
    { kind: 'block', type: 'raccoon_lock_vert' },
    { kind: 'block', type: 'raccoon_unlock' },
    { kind: 'block', type: 'raccoon_end_effector' },
    { kind: 'block', type: 'raccoon_end_effector_to', inputs: { Y: num(8), Z: num(0) } },
    { kind: 'block', type: 'raccoon_end_effector_by', inputs: { DY: num(0), DZ: num(0) } },
  ],
};
