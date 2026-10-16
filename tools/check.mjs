import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
let failures = 0;
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = match[1];
  if (/^(https?:|data:|#)/.test(ref)) continue;
  if (!existsSync(path.join(root, ref))) { console.error('MISSING', ref); failures++; }
}
const appScripts = [];
for (const match of html.matchAll(/<script src="([^"]+)"/g)) {
  if (match[1].startsWith('js/')) appScripts.push(readFileSync(path.join(root, match[1]), 'utf8'));
}
for (const name of readdirSync(path.join(root, 'js'))) {
  try { new vm.Script(readFileSync(path.join(root, 'js', name), 'utf8'), { filename: name }); console.log('PASS syntax', name); }
  catch (error) { console.error(error.message); failures++; }
}
try { new vm.Script(appScripts.join('\n')); console.log('PASS combined script declarations'); }
catch (error) { console.error(error.message); failures++; }
if (/<style>|<script>/.test(html)) { console.error('Unexpected inline application code'); failures++; }
console.log(failures ? `${failures} check(s) failed` : 'All syntax and reference checks passed. Browser testing is still required.');
process.exitCode = failures ? 1 : 0;
