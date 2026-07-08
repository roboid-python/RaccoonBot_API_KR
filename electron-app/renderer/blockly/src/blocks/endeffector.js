import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';

const COLOUR = 20;

Blockly.common.defineBlocksWithJsonArray([
  { type: 'raccoon_lock_horz', message0: '말단 장치 수평 고정', previousStatement: null, nextStatement: null, colour: COLOUR, tooltip: '그리퍼가 항상 수평을 유지하도록 고정합니다.' },
  { type: 'raccoon_lock_vert', message0: '말단 장치 수직 고정', previousStatement: null, nextStatement: null, colour: COLOUR, tooltip: '그리퍼가 항상 수직을 유지하도록 고정합니다.' },
  { type: 'raccoon_unlock', message0: '말단 장치 고정 해제', previousStatement: null, nextStatement: null, colour: COLOUR, tooltip: '수평/수직 고정을 풀고 일반 관절 모드로 되돌립니다.' },
  { type: 'raccoon_open_gripper', message0: '그리퍼 열기', previousStatement: null, nextStatement: null, colour: COLOUR, tooltip: '그리퍼(집게)를 엽니다.' },
  { type: 'raccoon_close_gripper', message0: '그리퍼 닫기', previousStatement: null, nextStatement: null, colour: COLOUR, tooltip: '그리퍼(집게)를 닫습니다.' },
  { type: 'raccoon_gripper_state', message0: '그리퍼 상태값', output: 'Number', colour: COLOUR, tooltip: '그리퍼의 현재 상태값을 읽습니다.' },
]);

for (const type of ['raccoon_lock_horz', 'raccoon_lock_vert', 'raccoon_unlock', 'raccoon_open_gripper', 'raccoon_close_gripper']) {
  const method = type.replace('raccoon_', '');
  pythonGenerator.forBlock[type] = () => `raccoon.${method}()\n`;
}

pythonGenerator.forBlock['raccoon_gripper_state'] = () => ['raccoon.gripper_state()', Order.FUNCTION_CALL];

export const endEffectorCategory = {
  kind: 'category',
  name: '말단 장치',
  colour: COLOUR,
  contents: [
    { kind: 'block', type: 'raccoon_lock_horz' },
    { kind: 'block', type: 'raccoon_lock_vert' },
    { kind: 'block', type: 'raccoon_unlock' },
    { kind: 'block', type: 'raccoon_open_gripper' },
    { kind: 'block', type: 'raccoon_close_gripper' },
    { kind: 'block', type: 'raccoon_gripper_state' },
  ],
};
