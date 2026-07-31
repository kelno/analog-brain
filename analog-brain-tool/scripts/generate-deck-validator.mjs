import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import standaloneCode from 'ajv/dist/standalone/index.js';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const schemaPath = resolve(projectRoot, 'public/decks/schema.json');
const outputDirectory = resolve(projectRoot, 'src/dataValidation/generated');
const outputPath = resolve(outputDirectory, 'deckValidator.js');
const declarationPath = resolve(outputDirectory, 'deckValidator.d.ts');

const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
const ajv = new Ajv({ code: { source: true, esm: true } });
const validateDeckSchema = ajv.compile(schema);

const generatedHeader = `// Generated from public/decks/schema.json by scripts/generate-deck-validator.mjs.\n`;
const validatorModule = `${generatedHeader}${standaloneCode(ajv, validateDeckSchema)}\n`;
const declarationModule = `${generatedHeader}import type { DeckSchemaValidator } from '../DeckSchemaValidator';

declare const validateDeckSchema: DeckSchemaValidator;
export default validateDeckSchema;
`;

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(outputPath, validatorModule, 'utf8'),
  writeFile(declarationPath, declarationModule, 'utf8'),
]);

console.log(`Generated ${outputPath}`);
