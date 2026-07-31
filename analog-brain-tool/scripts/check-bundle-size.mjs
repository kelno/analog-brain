import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(resolve(projectRoot, 'package.json'), 'utf8'));
const maxChunkSizeBytes = packageJson.bundleBudget.maxJavaScriptChunkKb * 1_000;
const assetsDirectory = resolve(projectRoot, 'dist/assets');

const javaScriptAssets = (await readdir(assetsDirectory)).filter((fileName) =>
  fileName.endsWith('.js'),
);
const measuredChunks = await Promise.all(
  javaScriptAssets.map(async (fileName) => ({
    fileName,
    sizeBytes: (await stat(resolve(assetsDirectory, fileName))).size,
  })),
);
const oversizedChunks = measuredChunks.filter(({ sizeBytes }) => sizeBytes > maxChunkSizeBytes);

for (const { fileName, sizeBytes } of measuredChunks.sort((a, b) => b.sizeBytes - a.sizeBytes)) {
  console.log(`${fileName}: ${(sizeBytes / 1_000).toFixed(2)} kB`);
}

if (oversizedChunks.length > 0) {
  const chunkNames = oversizedChunks.map(({ fileName }) => fileName).join(', ');
  throw new Error(
    `JavaScript chunks exceed the ${packageJson.bundleBudget.maxJavaScriptChunkKb} kB budget: ${chunkNames}`,
  );
}
