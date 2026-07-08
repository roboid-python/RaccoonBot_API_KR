import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { NOTE_OPTIONS, SOUND_OPTIONS } from '../common.js';

const COLOUR = 290;

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'raccoon_tempo',
    message0: '빠르기(BPM)를 %1 로 설정',
    args0: [{ type: 'input_value', name: 'BPM', check: 'Number' }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '음(note) 재생 시 사용할 빠르기(분당 박자 수)를 설정합니다.',
  },
  {
    type: 'raccoon_note',
    message0: '음 %1 연주하기 (박자 %2)',
    args0: [
      { type: 'field_dropdown', name: 'PITCH', options: NOTE_OPTIONS },
      { type: 'input_value', name: 'BEATS', check: 'Number' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    inputsInline: true,
    tooltip: '지정한 음을 지정한 박자 수만큼 연주합니다. 박자를 비우면 소리가 켜진 채로 다음 블록으로 넘어갑니다.',
  },
  {
    type: 'raccoon_note_on',
    message0: '음 %1 켜기 (계속 연주)',
    args0: [{ type: 'field_dropdown', name: 'PITCH', options: NOTE_OPTIONS }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '박자 없이 음을 켭니다. 끄려면 "음 끄기(off)"를 사용하세요.',
  },
  {
    type: 'raccoon_sound',
    message0: '효과음 %1 재생하기, 반복 %2 회 (대기하지 않음)',
    args0: [
      { type: 'field_dropdown', name: 'SOUND', options: SOUND_OPTIONS },
      { type: 'input_value', name: 'REPEAT', check: 'Number' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    inputsInline: true,
    tooltip: '효과음을 재생합니다. 재생이 끝날 때까지 기다리지 않고 다음 블록으로 넘어갑니다.',
  },
  {
    type: 'raccoon_sound_until_done',
    message0: '효과음 %1 재생하고 끝날 때까지 대기, 반복 %2 회',
    args0: [
      { type: 'field_dropdown', name: 'SOUND', options: SOUND_OPTIONS },
      { type: 'input_value', name: 'REPEAT', check: 'Number' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    inputsInline: true,
    tooltip: '효과음 재생이 끝날 때까지 기다린 후 다음 블록으로 넘어갑니다.',
  },
  {
    type: 'raccoon_beep',
    message0: '삐 소리 내고 대기',
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '짧은 삐 소리를 내고 끝날 때까지 기다립니다.',
  },
]);

pythonGenerator.forBlock['raccoon_tempo'] = function (block, gen) {
  const bpm = gen.valueToCode(block, 'BPM', Order.NONE) || '120';
  return `raccoon.tempo(${bpm})\n`;
};

pythonGenerator.forBlock['raccoon_note'] = function (block, gen) {
  const pitch = block.getFieldValue('PITCH');
  const beats = gen.valueToCode(block, 'BEATS', Order.NONE);
  if (beats) return `raccoon.note('${pitch}', ${beats})\n`;
  return `raccoon.note('${pitch}')\n`;
};

pythonGenerator.forBlock['raccoon_note_on'] = function (block) {
  const pitch = block.getFieldValue('PITCH');
  return `raccoon.note('${pitch}')\n`;
};

pythonGenerator.forBlock['raccoon_sound'] = function (block, gen) {
  const sound = block.getFieldValue('SOUND');
  const repeat = gen.valueToCode(block, 'REPEAT', Order.NONE) || '1';
  return `raccoon.sound('${sound}', ${repeat})\n`;
};

pythonGenerator.forBlock['raccoon_sound_until_done'] = function (block, gen) {
  const sound = block.getFieldValue('SOUND');
  const repeat = gen.valueToCode(block, 'REPEAT', Order.NONE) || '1';
  return `raccoon.sound_until_done('${sound}', ${repeat})\n`;
};

pythonGenerator.forBlock['raccoon_beep'] = () => `raccoon.beep()\n`;

export const soundCategory = {
  kind: 'category',
  name: '소리',
  colour: COLOUR,
  contents: [
    {
      kind: 'block',
      type: 'raccoon_tempo',
      inputs: { BPM: { shadow: { type: 'math_number', fields: { NUM: 120 } } } },
    },
    {
      kind: 'block',
      type: 'raccoon_note',
      inputs: { BEATS: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } } },
    },
    { kind: 'block', type: 'raccoon_note_on' },
    {
      kind: 'block',
      type: 'raccoon_sound',
      inputs: { REPEAT: { shadow: { type: 'math_number', fields: { NUM: 1 } } } },
    },
    {
      kind: 'block',
      type: 'raccoon_sound_until_done',
      inputs: { REPEAT: { shadow: { type: 'math_number', fields: { NUM: 1 } } } },
    },
    { kind: 'block', type: 'raccoon_beep' },
  ],
};
