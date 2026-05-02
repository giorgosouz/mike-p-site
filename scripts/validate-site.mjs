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

checks.push({ name: 'vite-base', ok: config.includes("base: '/mike-p-site/'") });
checks.push({ name: 'pages-docs-build', ok: existsSync(join(root, 'docs/index.html')) || existsSync(join(root, 'dist/index.html')) });

const failures = checks.filter((check) => !check.ok);

if (failures.length) {
  console.error('Site validation failed:');
  for (const failure of failures) console.error(`- ${failure.name}`);
  process.exit(1);
}

console.log(`Site validation passed (${checks.length} checks).`);
