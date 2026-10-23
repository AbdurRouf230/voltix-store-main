// Post-build fix for static export on Windows.
//
// Next.js names prefetch data files by turning "/" into "." (e.g. `__next.items.__PAGE__.txt`),
// but on Windows the segment paths contain "\" so it writes nested folders instead
// (`__next.items\__PAGE__.txt`). The browser then can't find them. This script flattens
// those folders into the expected file names. On macOS/Linux there is nothing to fix.
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");
let fixed = 0;

function filesIn(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesIn(full) : [full];
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name === "_next") continue;
    if (entry.name.startsWith("__next.")) {
      for (const file of filesIn(full)) {
        const rel = path.relative(full, file).split(path.sep).join(".");
        fs.renameSync(file, path.join(dir, `${entry.name}.${rel}`));
        fixed++;
      }
      fs.rmSync(full, { recursive: true, force: true });
    } else {
      walk(full);
    }
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir);
  console.log(`fix-export-segments: ${fixed ? `flattened ${fixed} prefetch files` : "nothing to fix"}`);
}
