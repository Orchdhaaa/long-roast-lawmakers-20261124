// The Long Roast — make.fun bounty u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7
// Writes one satirical sentence (1-320 chars) to /output/entry.txt.
// The grader runs this bare: `node main.ts` with no args and no env, so the
// default output directory is /output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Congress will hold hearings on artificial intelligence, crypto and the open internet, then ask an intern to turn the 400-page bill into a PDF because the button that does it has been there the whole time and nobody in the room knows which one it is.";

// Gate: the entry must be one sentence of UTF-8 text, 1-320 characters, not
// only whitespace, with no em dash and no line break.
function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

if ([...ENTRY].length < 1 || [...ENTRY].length > 320) {
  fail(`length ${[...ENTRY].length} is outside 1-320 characters`);
}
if (ENTRY.trim().length === 0) fail("entry is only whitespace");
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
if (ENTRY.includes("—")) fail("entry must not contain an em dash");
if (ENTRY !== ENTRY.trim()) fail("entry must not start or end with whitespace");
if (!ENTRY.endsWith(".")) fail("entry must end with a period");
if (ENTRY.split(/[.!?]/).filter((part) => part.trim().length > 0).length !== 1) {
  fail("entry must be exactly one sentence");
}
// The brief's core image must be present: the file format they cannot make,
// and the lawmakers doing the regulating.
if (!ENTRY.includes("PDF")) fail("entry must name the PDF it cannot convert");
if (!/congress|lawmaker|senator|representative/i.test(ENTRY)) {
  fail("entry must name the lawmakers it roasts");
}
if (ENTRY.includes("  ")) fail("entry must not contain double spaces");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");

// Read back and verify byte-for-byte what the grader will read.
const written = readFileSync(outFile, "utf8");
if (written !== ENTRY) fail("read-back mismatch: entry.txt differs from ENTRY");
console.log(`wrote ${[...ENTRY].length} characters to ${outFile}`);
