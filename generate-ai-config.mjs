import fs from 'fs';
import path from 'path';
import os from 'os';

const home = os.homedir();
const aiDir = path.join(home, '.ai');
const commonPath = path.join(home, '.ai', 'common.md');
const codexFragmentPath = path.join(aiDir, 'codex.md');
const geminiFragmentPath = path.join(aiDir, 'gemini.md');
const codexOutputPath = path.join(home, '.codex', 'AGENTS.md');
const geminiOutputPath = path.join(home, '.gemini', 'GEMINI.md');

const outputs = [
  {
    name: 'Codex',
    outputPath: codexOutputPath,
    fragmentPaths: [commonPath, codexFragmentPath],
  },
  {
    name: 'Gemini',
    outputPath: geminiOutputPath,
    fragmentPaths: [commonPath, geminiFragmentPath],
  },
];

function readFragment(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: ${filePath} not found.`);
    process.exit(1);
  }

  return fs.readFileSync(filePath, 'utf8').trim();
}

function generate() {
  for (const { name, outputPath, fragmentPaths } of outputs) {
    const content = fragmentPaths.map(readFragment).join('\n\n') + '\n';
    fs.writeFileSync(outputPath, content);
    console.log(`Generated ${name}: ${outputPath}`);
  }
}

generate();
