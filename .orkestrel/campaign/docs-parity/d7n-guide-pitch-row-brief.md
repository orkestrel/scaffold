# Brief — G1 `d7n-guide-pitch-row` (the check catalog names the README pitch check)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/guide` from the committed baseline `c25c689` (clean; the registry `@orkestrel/scaffold@0.0.63` installed). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

The guide's § The check catalog names the README pitch check with its own identifier, so no consumer reads `findDrift` coverage as covering the pitch: the seed compares the README pitch against the guide's tagline after the row loop (`/home/user/scaffold/scripts/docs.ts:414-426`) and `findDrift` never sees the pair; the drop-in's README case is the gate.

## Items

1. **The catalog row.** In `guides/guide.md` § The check catalog, after the EQ row (`:568-575`, the bullet opening `- **EQ — Example equality.**`), add one bullet in the same shape: `- **RQ — README pitch equality.** The blockquote under the README's H1 equals the guide's tagline, both read through \`createGuide(text).tagline()\`. The pair is outside \`findDrift\`, which compares a guide against its source: the drop-in's README case is the gate, and \`npm run docs\` reports the pair beside the drift rows and never writes it. Guard: both sides read a defined tagline before the comparison, so a README without a blockquote reddens rather than passing on \`undefined\`.` Re-wrap by hand under the print width in the catalog's own style.
2. **§ Tests.** Where `guides/guide.md` § Tests (`:797-803`) names the checks the suite wires (`RN, SB, MB, LI, TE, NV, FL, EX, FI, SQ, MQ, and EQ`), add `RQ` after `EQ`.
3. **The README's `## Checks` list** (`README.md`): where the equality row names the summary and example checks, add the pitch check in one clause if it is not already named.

## Acceptance criteria, cheapest first

1. `git diff --stat` lists `guides/guide.md` and `README.md` (the README only if item 3 changed it) and no other file.
2. `npx oxfmt --config .oxfmtrc.json --check guides/guide.md README.md` exit 0 (run `npm run format` first).
3. `npm run build && npm run docs` exits 0 at `rows read: 1, disagreements found: 0` (the guide checkout's seed reads `dist/`, so the build precedes it).
4. `npm run test:guides` and `npm run test:policy` exit 0.

## Output

`/home/user/scaffold/tmp/units/d7n-guide-pitch-row-report.md`: per item the hunk, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop and report if the EQ bullet is not found at the named lines or a gate reads red.
