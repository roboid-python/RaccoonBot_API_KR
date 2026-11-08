import { jointsCategory } from './blocks/joints.js';
import { kinematicsCategory } from './blocks/kinematics.js';
import { endEffectorCategory } from './blocks/endeffector.js';
import { soundCategory } from './blocks/sound.js';
import { sensorsCategory } from './blocks/sensors.js';
import { buttonsCategory } from './blocks/buttons.js';
import { globalCategory } from './blocks/global.js';

const logicCategory = {
  kind: 'category',
  name: '논리',
  colour: 210,
  contents: [
    { kind: 'block', type: 'controls_if' },
    { kind: 'block', type: 'logic_compare' },
    { kind: 'block', type: 'logic_operation' },
    { kind: 'block', type: 'logic_negate' },
    { kind: 'block', type: 'logic_boolean' },
    { kind: 'block', type: 'logic_null' },
    { kind: 'block', type: 'logic_ternary' },
  ],
};

const loopsCategory = {
  kind: 'category',
  name: '반복',
  colour: 120,
  contents: [
    {
      kind: 'block',
      type: 'controls_repeat_ext',
      inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } } },
    },
    { kind: 'block', type: 'controls_whileUntil' },
    {
      kind: 'block',
      type: 'controls_for',
      inputs: {
        FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
        TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
        BY: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
      },
    },
    { kind: 'block', type: 'controls_flow_statements' },
  ],
};

const mathCategory = {
  kind: 'category',
  name: '수학',
  colour: 230,
  contents: [
    { kind: 'block', type: 'math_number' },
    { kind: 'block', type: 'math_arithmetic' },
    { kind: 'block', type: 'math_single' },
    { kind: 'block', type: 'math_round' },
    {
      kind: 'block',
      type: 'math_random_int',
      inputs: {
        FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
        TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
      },
    },
    { kind: 'block', type: 'math_modulo' },
  ],
};

const textCategory = {
  kind: 'category',
  name: '텍스트',
  colour: 160,
  contents: [
    { kind: 'block', type: 'text' },
    { kind: 'block', type: 'text_print' },
    { kind: 'block', type: 'text_join' },
  ],
};

const variablesCategory = {
  kind: 'category',
  name: '변수',
  colour: 330,
  custom: 'VARIABLE',
};

const functionsCategory = {
  kind: 'category',
  name: '함수',
  colour: 290,
  custom: 'PROCEDURE',
};

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    jointsCategory,
    kinematicsCategory,
    endEffectorCategory,
    soundCategory,
    sensorsCategory,
    buttonsCategory,
    globalCategory,
    { kind: 'sep' },
    logicCategory,
    loopsCategory,
    mathCategory,
    textCategory,
    variablesCategory,
    functionsCategory,
  ],
};
