import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';
import * as Ko from 'blockly/msg/ko';
import * as Ja from 'blockly/msg/ja';
import * as En from 'blockly/msg/en';
import { toolbox } from './toolbox.js';
import { resetUniqueCounter } from './common.js';
import { EXAMPLES } from './examples.js';

const LOCALES = { ko: Ko, ja: Ja, en: En };

function setLocale(lang) {
  Blockly.setLocale(LOCALES[lang] || LOCALES.en);
}

function init(container, options = {}) {
  setLocale(options.lang || 'ko');
  const workspace = Blockly.inject(container, {
    toolbox,
    media: options.media || 'blockly/media/',
    trashcan: true,
    zoom: { controls: true, wheel: true, startScale: 0.9 },
    grid: { spacing: 20, length: 3, colour: '#333', snap: true },
  });
  return workspace;
}

function generatePython(workspace) {
  resetUniqueCounter();
  const body = pythonGenerator.workspaceToCode(workspace);
  return body;
}

function saveWorkspace(workspace) {
  return Blockly.serialization.workspaces.save(workspace);
}

function loadWorkspace(workspace, state) {
  workspace.clear();
  Blockly.serialization.workspaces.load(state, workspace);
}

function resizeWorkspace(workspace) {
  Blockly.svgResize(workspace);
}

window.RaccoonBlockly = {
  init,
  getMainWorkspace: () => Blockly.getMainWorkspace(),
  examples: EXAMPLES,
  setLocale,
  generatePython,
  saveWorkspace,
  loadWorkspace,
  resizeWorkspace,
};
