#!/usr/bin/env node
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { generateTriin } from './triin.js';

async function main() {
  const args = process.argv.slice(2);
  let intention;
  const index = args.findIndex((arg) => arg === '-i' || arg === '--intention');
  if (index >= 0) {
    intention = args[index + 1];
    if (intention === undefined) throw new Error(`${args[index]} requires a value`);
  } else {
    const prompt = createInterface({ input: stdin, output: stdout });
    try { intention = await prompt.question('Intention: '); } finally { prompt.close(); }
  }

  const result = await generateTriin(intention);
  console.log(`True Random Influenced Intention Number: ${result.value}`);
}

main().catch((error) => {
  console.error(`Failed to generate TRIIN: ${error.message}`);
  process.exitCode = 1;
});
