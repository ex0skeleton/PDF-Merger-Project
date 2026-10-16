// Optional setup: node tools/download-vendor.mjs (Node.js 18+).
import { mkdir, writeFile, readFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const vendor = path.join(root, 'vendor');
const downloads = [
  ['pdf.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'],
  ['pdf.worker.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'],
  ['pdf-lib.min.js', 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js'],
  ['Sortable.min.js', 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js'],
  ['PDFJS-LICENSE.txt', 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/LICENSE'],
  ['PDFLIB-LICENSE.txt', 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/LICENSE.md'],
  ['SORTABLE-LICENSE.txt', 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/LICENSE'],
];

try {
  await mkdir(vendor, { recursive: true });
  // Download everything before changing application references.
  const results = await Promise.all(downloads.map(async ([name, url]) => {
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const data = new Uint8Array(await response.arrayBuffer());
    if (data.length < 100) throw new Error(`${name}: unexpected empty response`);
    if (/\.js$/.test(name) && /^\s*</.test(new TextDecoder().decode(data.subarray(0, 100)))) {
      throw new Error(`${name}: received HTML instead of JavaScript`);
    }
    return { name, data };
  }));
  for (const { name, data } of results) {
    const temp = path.join(vendor, name + '.tmp');
    await writeFile(temp, data);
    await rename(temp, path.join(vendor, name));
    console.log('Downloaded', name);
  }
  const htmlFile = path.join(root, 'index.html');
  let html = await readFile(htmlFile, 'utf8');
  for (const [name, url] of downloads.filter(([name]) => name.endsWith('.js') && !name.includes('worker'))) {
    html = html.replaceAll(url, `vendor/${name}`);
  }
  const stateFile = path.join(root, 'js/state.js');
  let state = await readFile(stateFile, 'utf8');
  state = state.replaceAll(downloads[1][1], 'vendor/pdf.worker.min.js');
  await writeFile(stateFile, state);
  await writeFile(htmlFile, html);
  console.log('Done. Local libraries enabled. Run node tools/check.mjs, then test in Live Server.');
} catch (error) {
  console.error('Setup failed:', error.message);
  console.error('Check your network and rerun. No paths are switched until downloads finish.');
  process.exitCode = 1;
}
