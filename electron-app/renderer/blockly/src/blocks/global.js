import * as Blockly from 'blockly/core';
import { pythonGenerator, Order } from 'blockly/python';
import { nextUniqueId } from '../common.js';

// Hue as a string: the toolbox treats a numeric 0 as "no colour" (falsy),
// which left this category rendered with the default white row.
const COLOUR = '0';

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'raccoon_wait',
    message0: '%1 밀리초 대기',
    args0: [{ type: 'input_value', name: 'MS', check: 'Number' }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '지정한 밀리초(ms) 동안 대기합니다.',
  },
  {
    type: 'raccoon_wait_until',
    message0: '%1 이(가) 참이 될 때까지 대기',
    args0: [{ type: 'input_value', name: 'CONDITION', check: 'Boolean' }],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '조건이 참이 될 때까지 다음 블록으로 넘어가지 않고 대기합니다.',
  },
  {
    type: 'raccoon_when_do',
    message0: '%1 이(가) 참이 되면 실행하기 %2',
    args0: [
      { type: 'input_value', name: 'CONDITION', check: 'Boolean' },
      { type: 'input_statement', name: 'DO' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '조건이 거짓에서 참으로 바뀔 때마다 안의 블록들을 한 번 실행합니다. (프로그램 종료 시까지 계속 감시)',
  },
  {
    type: 'raccoon_while_do',
    message0: '%1 인 동안 계속 실행하기 %2',
    args0: [
      { type: 'input_value', name: 'CONDITION', check: 'Boolean' },
      { type: 'input_statement', name: 'DO' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '조건이 참인 동안 안의 블록들을 반복 실행합니다. (프로그램 종료 시까지 계속 감시)',
  },
  {
    type: 'raccoon_parallel_2',
    message0: '동시에 실행하기 A: %1 B: %2',
    args0: [
      { type: 'input_statement', name: 'BRANCH_A' },
      { type: 'input_statement', name: 'BRANCH_B' },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '두 블록 묶음을 별도의 스레드에서 동시에 실행합니다.',
  },
  {
    type: 'raccoon_reset',
    message0: '라쿤봇 초기화(reset)',
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '라쿤봇의 상태를 초기화하고 기본 자세로 되돌립니다.',
  },
  {
    type: 'raccoon_scan',
    message0: '연결 가능한 로봇 검색(scan)',
    previousStatement: null,
    nextStatement: null,
    colour: COLOUR,
    tooltip: '연결 가능한 로봇 장치를 검색합니다.',
  },
]);

pythonGenerator.forBlock['raccoon_wait'] = function (block, gen) {
  const ms = gen.valueToCode(block, 'MS', Order.NONE) || '0';
  return `wait(${ms})\n`;
};

pythonGenerator.forBlock['raccoon_wait_until'] = function (block, gen) {
  const condition = gen.valueToCode(block, 'CONDITION', Order.NONE) || 'False';
  return `wait_until(lambda: ${condition})\n`;
};

pythonGenerator.forBlock['raccoon_when_do'] = function (block, gen) {
  const condition = gen.valueToCode(block, 'CONDITION', Order.NONE) || 'False';
  const body = gen.statementToCode(block, 'DO') || `${gen.INDENT}pass\n`;
  const fnName = `_when_do_${nextUniqueId()}`;
  return `def ${fnName}():\n${body}when_do(lambda: ${condition}, ${fnName})\n`;
};

pythonGenerator.forBlock['raccoon_while_do'] = function (block, gen) {
  const condition = gen.valueToCode(block, 'CONDITION', Order.NONE) || 'False';
  const body = gen.statementToCode(block, 'DO') || `${gen.INDENT}pass\n`;
  const fnName = `_while_do_${nextUniqueId()}`;
  return `def ${fnName}():\n${body}while_do(lambda: ${condition}, ${fnName})\n`;
};

pythonGenerator.forBlock['raccoon_parallel_2'] = function (block, gen) {
  const id = nextUniqueId();
  const codeA = gen.statementToCode(block, 'BRANCH_A') || `${gen.INDENT}pass\n`;
  const codeB = gen.statementToCode(block, 'BRANCH_B') || `${gen.INDENT}pass\n`;
  const fnA = `_parallel_${id}_a`;
  const fnB = `_parallel_${id}_b`;
  return `def ${fnA}():\n${codeA}def ${fnB}():\n${codeB}parallel(${fnA}, ${fnB})\n`;
};

pythonGenerator.forBlock['raccoon_reset'] = () => `raccoon.reset()\n`;
pythonGenerator.forBlock['raccoon_scan'] = () => `scan()\n`;

export const globalCategory = {
  kind: 'category',
  name: '전역 함수',
  colour: COLOUR,
  contents: [
    {
      kind: 'block',
      type: 'raccoon_wait',
      inputs: { MS: { shadow: { type: 'math_number', fields: { NUM: 1000 } } } },
    },
    { kind: 'block', type: 'raccoon_wait_until' },
    { kind: 'block', type: 'raccoon_when_do' },
    { kind: 'block', type: 'raccoon_while_do' },
    { kind: 'block', type: 'raccoon_parallel_2' },
    { kind: 'block', type: 'raccoon_reset' },
    { kind: 'block', type: 'raccoon_scan' },
  ],
};
