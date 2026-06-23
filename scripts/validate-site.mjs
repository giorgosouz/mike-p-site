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
  'public/assets/social-preview.png',
  'LAUNCH_VISIBILITY_PACK.md',
  'CONVERSION_TRUST_PACK.md',
];

const checks = [];

for (const file of requiredFiles) {
  checks.push({
    name: `exists:${file}`,
    ok: existsSync(join(root, file)),
  });
}

const app = readFileSync(join(root, 'src/App.jsx'), 'utf8');
const data = readFileSync(join(root, 'src/data.js'), 'utf8');
const appContent = `${app}\n${data}`;
const sourceIndex = readFileSync(join(root, 'index.html'), 'utf8');
const launchPackPath = join(root, 'LAUNCH_VISIBILITY_PACK.md');
const launchPack = existsSync(launchPackPath) ? readFileSync(launchPackPath, 'utf8') : '';
const conversionPackPath = join(root, 'CONVERSION_TRUST_PACK.md');
const conversionPack = existsSync(conversionPackPath) ? readFileSync(conversionPackPath, 'utf8') : '';
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
  'Athens studio',
  'Remote mixes worldwide',
  'Metal and rock focus',
  'Production / mix sample',
  'Timeline / goals',
  'Service Packages',
  'Full production package',
  'Remote mixing package',
  'From idea to finished track',
  'Send rough demo',
  'Frequently asked questions',
  'Can you mix my song remotely?',
  'Studio Proof',
  'Treated live room',
  'mailto:',
]) {
  checks.push({ name: `content:${text}`, ok: appContent.includes(text) });
}

for (const text of [
  'Mike P Studio | Metal Production, Recording &amp; Mixing',
  '<link rel="canonical" href="https://mikepofficial.com/" />',
  '<meta property="og:url" content="https://mikepofficial.com/" />',
  '<meta property="og:image" content="https://mikepofficial.com/assets/social-preview.png" />',
  '<meta name="twitter:card" content="summary_large_image" />',
  '<meta name="twitter:image" content="https://mikepofficial.com/assets/social-preview.png" />',
  '<script type="application/ld+json">',
  '"@type": "LocalBusiness"',
  '"addressLocality": "Athens"',
  '"areaServed": ["Greece", "Worldwide"]',
]) {
  checks.push({ name: `metadata:${text}`, ok: sourceIndex.includes(text) });
}

for (const text of [
  'Launch & Visibility Pack',
  '200 EUR',
  'Search/social foundation',
  'Social preview asset',
  'Structured business data',
  'Launch QA',
]) {
  checks.push({ name: `launch-pack:${text}`, ok: launchPack.includes(text) });
}

for (const text of [
  'Conversion & Trust Pack',
  '500 EUR',
  'Services & Packages section',
  'Client process section',
  'FAQ section',
  'Studio proof section',
  'Portfolio sample copy',
]) {
  checks.push({ name: `conversion-pack:${text}`, ok: conversionPack.includes(text) });
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
