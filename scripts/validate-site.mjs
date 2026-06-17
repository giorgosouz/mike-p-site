import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'src/App.jsx',
  'src/App.css',
  'src/data.js',
  'vite.config.js',
  'public/assets/producer.jpg',
  'public/assets/studio-control-room.jpg',
  'public/assets/studio-live-room.jpg',
  'public/assets/mixing-made-easy-logo.jpg',
];

const checks = [];

for (const file of requiredFiles) {
  checks.push({
    name: `exists:${file}`,
    ok: existsSync(join(root, file)),
  });
}

const app = readFileSync(join(root, 'src/App.jsx'), 'utf8');
const config = readFileSync(join(root, 'vite.config.js'), 'utf8');
const docsIndexPath = join(root, 'docs/index.html');
const docsIndex = existsSync(docsIndexPath) ? readFileSync(docsIndexPath, 'utf8') : '';
const docsCnamePath = join(root, 'docs/CNAME');
const docsCname = existsSync(docsCnamePath) ? readFileSync(docsCnamePath, 'utf8').trim() : '';

for (const text of [
  'Michael Papaleontiou',
  'Record. Mix. Release heavier.',
  'Hear the mixes',
  'MixingMadeEasy',
  'Start your track',
  'mailto:',
]) {
  checks.push({ name: `content:${text}`, ok: app.includes(text) });
}

checks.push({ name: 'vite-base-custom-domain', ok: config.includes("base: '/'") });
checks.push({ name: 'vite-builds-to-docs', ok: config.includes("outDir: 'docs'") });
checks.push({ name: 'pages-docs-build', ok: existsSync(join(root, 'docs/index.html')) || existsSync(join(root, 'dist/index.html')) });
checks.push({ name: 'pages-cname', ok: docsCname === 'mikepofficial.com' });
checks.push({ name: 'docs-assets-rooted-for-custom-domain', ok: docsIndex !== '' && !docsIndex.includes('/mike-p-site/') });

const failures = checks.filter((check) => !check.ok);

if (failures.length) {
  console.error('Site validation failed:');
  for (const failure of failures) console.error(`- ${failure.name}`);
  process.exit(1);
}

console.log(`Site validation passed (${checks.length} checks).`);
