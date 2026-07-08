// Shared dropdown option lists and small helpers used by several block/generator files.
// Values mirror the real roboid.Raccoon Python API (verified against the installed
// package source), not the README's paraphrased method list.

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

// Note-name dropdown: pitch classes across octaves 3-5, plus "off".
const NOTE_NAMES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
export const NOTE_OPTIONS = [['끄기(off)', 'off']];
for (const octave of [3, 4, 5]) {
  for (const name of NOTE_NAMES) {
    const value = `${name}${octave}`;
    NOTE_OPTIONS.push([value.toUpperCase(), value]);
  }
}

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
