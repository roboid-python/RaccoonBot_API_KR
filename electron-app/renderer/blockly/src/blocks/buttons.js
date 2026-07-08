import * as Blockly from 'blockly/core';
import { BUTTON_OPTIONS } from '../common.js';
import { pythonGenerator } from 'blockly/python';
import { Order } from 'blockly/python';

const COLOUR = 330;

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'raccoon_button_pressed',
    message0: '%1 버튼이 눌려있는가?',
    args0: [{ type: 'field_dropdown', name: 'BUTTON', options: BUTTON_OPTIONS }],
    output: 'Boolean',
    colour: COLOUR,
    tooltip: '버튼이 현재 눌려있는 상태인지 확인합니다.',
  },
  {
    type: 'raccoon_button_clicked',
    message0: '%1 버튼이 클릭되었는가?',
    args0: [{ type: 'field_dropdown', name: 'BUTTON', options: BUTTON_OPTIONS }],
    output: 'Boolean',
    colour: COLOUR,
    tooltip: '버튼이 눌렸다가 떼어지는 클릭 동작이 발생했는지 확인합니다 (한 번만 감지).',
  },
  {
    type: 'raccoon_button_long_pressed',
    message0: '%1 버튼이 길게 눌렸는가?',
    args0: [{ type: 'field_dropdown', name: 'BUTTON', options: BUTTON_OPTIONS }],
    output: 'Boolean',
    colour: COLOUR,
    tooltip: '버튼이 길게 눌리는 동작이 발생했는지 확인합니다.',
  },
]);

pythonGenerator.forBlock['raccoon_button_pressed'] = function (block) {
  return [`(raccoon.${block.getFieldValue('BUTTON')}_button() == 1)`, Order.RELATIONAL];
};

pythonGenerator.forBlock['raccoon_button_clicked'] = function (block) {
  return [`raccoon.${block.getFieldValue('BUTTON')}_clicked()`, Order.FUNCTION_CALL];
};

pythonGenerator.forBlock['raccoon_button_long_pressed'] = function (block) {
  return [`raccoon.${block.getFieldValue('BUTTON')}_long_pressed()`, Order.FUNCTION_CALL];
};

export const buttonsCategory = {
  kind: 'category',
  name: '버튼',
  colour: COLOUR,
  contents: [
    { kind: 'block', type: 'raccoon_button_pressed' },
    { kind: 'block', type: 'raccoon_button_clicked' },
    { kind: 'block', type: 'raccoon_button_long_pressed' },
  ],
};
