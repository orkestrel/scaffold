# Brief — `d7n-server-converge-fix` (server's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/server` from the committed tip `89f98d1` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-server-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 9, § Ruling 13 and its amendments, § Ruling 14, § Ruling 17, § Ruling 20, § Ruling 21, § Ruling 23; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-server-audit-verdict.md` (items SV1 to SV10); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-server-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-server-close-brief.md` (the closing generator's lists: the region diff, the header diff, the fences); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole (its `carries the fence lines the transcriptions copy` case at `:305-322`).

## Items

1. **The Constants sentence (SV1, Ruling 20).** `guides/server.md:69` reads "A `Shape` cell holds the constant's declared type." alone; the `### Types` sentence at `:144` stays.
2. **The titled pair on the entry (SV2, Rulings 9, 14, 17, 23).** `createServer`'s `@example` (`src/server/factories.ts:74`) is titled `Quickstart: dispatcher, middleware, lifecycle` and equals the fence under `guides/server.md:425` (extend either side per Ruling 14 where they differ; the executed case that transcribes the Quickstart stays true); `createNegotiator`'s block (`:19-60`) loses its title and returns to a negotiation-only example of its own; then `npm run docs` reads the pair at zero and the title pin's population is the new pair.
3. **All-caps (SV3).** Lower the emphasis at `src/server/constants.ts:96` (`NOT`), `src/server/types.ts:563-565` (`AND`, `FORCED`), `:570` (`INNER`), `:589-611` (`FIRST`, `CLAIMS`, `THROWS`, `NONE`, `CLAIMED`, `TRACKED`), `:717` (`EPHEMERAL`), and `tests/setupServer.ts:181` (`KEEPS`), keeping each sentence's contrast; then `--to guide`. Close with `grep -rnE '\b[A-Z]{3,}\b' src tests/setupServer.ts guides/server.md` ruled hit by hit (HTTP header names, status names, acronyms, error codes, and other data stay); state the pattern, the paths, and the permitted hits.
4. **Pointers (SV4).** `src/server/types.ts:561` and `src/server/Server.ts:215`, `:228`, `:283-284`: `below` and `above` become `preceding`, `following`, or the fact pointed at.
5. **The pair's phases (SV5).** `guides/server.md:297-299`: "in an inner phase and an outer phase", "The inner phase covers only `buildRequest`".
6. **The executed fences' presence guard (SV6).** `tests/guides.test.ts`'s executed section gains one case, named for what it proves, asserting each transcribed line — the `negotiate`/`encoding`/`language` calls, `verifyToken('bad.token', 'secret')`, the `decompressRequestBody` line, the Quickstart's `server.start()` and `server.stop()` lines — appears in `files[GUIDE_SPEC]`, the pilot's `carries the fence lines the transcriptions copy` shape.
7. **The content-coding description (SV7).** `src/server/types.ts:202-204` reads "Represents a content-coding the substrate compresses or decompresses with. Its members are the `Content-Encoding` and `Accept-Encoding` token vocabulary the substrate understands." (the first sentence free of the symbol's name); then `--to guide`.
8. **The dead binding (SV8).** The flagship fence at `guides/server.md:630-634` and its twin in `src/server/factories.ts` either drop `const value = ` or keep it with the trailing comment the neighbouring lines use, on both sides in one edit, the pair at zero.
9. **The closing items (SV9, Rulings 13, 20, 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's; the region from `const root = ` through the manifest loop's closing brace equals the pilot's (the closing brief's diff shows the current state); one complete sentence between each heading and its fence at `guides/server.md:425`, `:507`, `:589`, `:604`, and at any other fence directly under a heading.
10. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/server.md`, the doc blocks under `src/**` (no code token moves) and the `//` comments item 4 names in `src/server/Server.ts`, `tests/guides.test.ts`, the doc block at `tests/setupServer.ts:181` for the one word. Off-limits: everything else, including `README.md`, `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, and every other line of `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/server.md tests/guides.test.ts src/server/types.ts src/server/constants.ts src/server/factories.ts src/server/Server.ts tests/setupServer.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests src`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `sed -n 69p guides/server.md` reads the constants sentence alone; `grep -n '@example Quickstart' src/server/factories.ts` prints the `createServer` block's line and `grep -c '@example ' src/server/factories.ts` reads 1; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `grep -nE '\b(NOT|AND|FORCED|INNER|FIRST|CLAIMS|THROWS|NONE|CLAIMED|TRACKED|EPHEMERAL|KEEPS)\b' src/server/constants.ts src/server/types.ts tests/setupServer.ts` prints nothing; `grep -nw 'below\|above' src/server/types.ts src/server/Server.ts guides/server.md` prints nothing; `grep -n 'innermost' guides/server.md` prints nothing; `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/server.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries, the new case included); `npm run test:src:server` as an observation (the host is under load; report a timing red with its reading, do not diagnose it).

## Output

`/home/user/scaffold/tmp/units/d7n-server-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a pair the block cannot hold. Decide ancillary matters (the lead-in sentences, the negotiator's own example) and record them.
