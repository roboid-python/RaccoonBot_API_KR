// Copies Blockly's media assets (sprites, sounds, cursors) next to the bundle
// so the editor works offline and inside the packaged app.
// Uses a manual per-file copy: fs.cpSync crashes node (STATUS_STACK_BUFFER_OVERRUN)
// on this machine's non-ASCII user path, so it must not be used here.
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'node_modules', 'blockly', 'media');
const dest = path.join(__dirname, '..', 'renderer', 'blockly', 'media');

fs.mkdirSync(dest, { recursive: true });
let count = 0;
for (const name of fs.readdirSync(src)) {
  const from = path.join(src, name);
  if (fs.statSync(from).isFile()) {
    fs.copyFileSync(from, path.join(dest, name));
    count += 1;
  }
}
console.log(`blockly media: ${count} files copied to ${dest}`);
