# Brief — `d7n-codec-converge-fix` (slice 1's audit findings on codec)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/codec` from its branch tip (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` § Writing and `.claude/rules/writing.md` first, then `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice1-audit-verdict.md` and the subjective lane's F7 and F9 in `d7n-slice1-audit-subjective.md`.

## Items

1. **Counts in the guide's prose (F7).** `guides/codec.md:24` "both faces keep the same two laws" → "both faces keep the same laws"; `:126` "Each face keeps two laws" → "Each face keeps the round-trip and canonical-form laws" (read the section to confirm those are the two named there and word it against what the section names). Sweep the guide and the README for any other count in prose and correct it the same way; record each.
2. **The README skeleton (F9).** Bring `README.md` to the pilot's skeleton at `/home/user/fleet/abort/README.md:1-24`: the H1 `# @orkestrel/codec`, the blockquote unchanged, the onboarding paragraph unchanged, then `## Install` and `## Requirements` sections in the pilot's wording adapted to codec (zero runtime dependencies; the Node range from `package.json` `engines` if present, else the fleet's stated minimum in the pilot). Every later section stays.
3. `npm run test:guides` after the README edit (the README case reads the blockquote, not the H1); `npm run docs` must still read `disagreements found: 0`.

## Scope

Owned: `guides/codec.md`, `README.md`. Off-limits: everything else.

## Acceptance criteria

1. `npx oxfmt --check guides/codec.md README.md` and `npx oxlint --config .oxlintrc.json --deny-warnings guides/codec.md README.md` exit 0; `npm run test:policy` exit 0 (the prose sweep reads both files).
2. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; `npm run test:guides` exit 0.
3. `git status --short` lists the owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-codec-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines. No count in prose. No process diary.

## Deviation contract

Stop if a correction needs a file outside the owned pair.
