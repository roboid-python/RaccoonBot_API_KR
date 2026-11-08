// Shared dropdown option lists and small helpers used by several block/generator files.
// Values mirror the real roboid.Raccoon Python API, cross-checked against both the
// installed package source and the roboid/raccoon.py shipped by py.hamster.school
// (Hamster School Python), not the README's paraphrased method list.

// Joint angle limits enforced by Raccoon.can_degree_to()/degree_to() (degrees).
// A target outside these ranges is rejected and the robot plays an error sound.
export const JOINT_LIMITS = {
  1: [-120, 120],
  2: [-90, 30],
  3: [-150, 0],
  4: [-105, 105],
};

// Pose applied by Raccoon.init_pose() / reset() (and on construction).
export const INIT_POSE = [0, -10, -140, 60];

export const JOINT_LIMITS_TEXT = Object.entries(JOINT_LIMITS)
  .map(([j, [lo, hi]]) => `관절${j}: ${lo}~${hi}°`)
  .join(', ');

export const JOINT_OPTIONS = [
  ['1번 관절', '1'],
  ['2번 관절', '2'],
  ['3번 관절', '3'],
  ['4번 관절', '4'],
  ['전체 관절', '-1'],
];

export const JOINT_OPTIONS_NO_ALL = [
  ['1번 관절', '1'],
  ['2번 관절', '2'],
  ['3번 관절', '3'],
  ['4번 관절', '4'],
];

export const BUTTON_OPTIONS = [
  ['티치(TEACH)', 'teach'],
  ['플레이(PLAY)', 'play'],
  ['삭제(DELETE)', 'delete'],
];

export const SOUND_OPTIONS = [
  ['끄기', 'off'],
  ['삐(beep)', 'beep'],
  ['무작위 삐(random_beep)', 'random_beep'],
  ['사이렌(siren)', 'siren'],
  ['엔진(engine)', 'engine'],
  ['로봇(robot)', 'robot'],
  ['디비디비딥(dibidibidip)', 'dibidibidip'],
  ['잘했어요(good_job)', 'good_job'],
  ['잡음(noise)', 'noise'],
  ['촙(chop)', 'chop'],
  ['무작위 멜로디(random_melody)', 'random_melody'],
  ['기상(wake_up)', 'wake_up'],
  ['시작(start)', 'start'],
  ['안녕(bye)', 'bye'],
];

// Note-name dropdown: pitch classes across octaves 2-6, plus "off".
// Raccoon.note() parses "<name><octave>" case-insensitively; valid octaves are 1-7
// (piano keys A0..C8), octave 4 is the default when omitted.
const NOTE_NAMES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
export const NOTE_OPTIONS = [['끄기(off)', 'off']];
for (const octave of [2, 3, 4, 5, 6]) {
  for (const name of NOTE_NAMES) {
    const value = `${name}${octave}`;
    NOTE_OPTIONS.push([value.toUpperCase(), value]);
  }
}

export const END_EFFECTOR_OPTIONS = [
  ['그리퍼 끝', 'gripper'],
  ['손목', 'wrist'],
];

export const UNIT_OPTIONS = [
  ['cm', 'cm'],
  ['inch', 'inch'],
];

export const BATTERY_STATE_OPTIONS = [
  ['부족(EMPTY)', '0'],
  ['낮음(LOW)', '1'],
  ['정상(NORMAL)', '2'],
];

// Generates a short, unique Python identifier suffix per block instance so
// generated helper functions (used by wait_until/when_do/parallel blocks)
// never collide with each other in the same program.
let uniqueCounter = 0;
export function nextUniqueId() {
  uniqueCounter += 1;
  return uniqueCounter;
}

export function resetUniqueCounter() {
  uniqueCounter = 0;
}
