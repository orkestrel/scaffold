# Brief — `d7n-console-close-2` (console: the closing checker's findings)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `/home/user/fleet/console` from the committed tip `36ae1b6` (clean; the final guide tarball `0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-console-close-2/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 15, § Ruling 18, § Ruling 19, § Ruling 20, § Ruling 21, § Ruling 22, § Ruling 24, § Ruling 25, § Ruling 26, § Ruling 27, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-console-closure-checker-console.md` (the checker's findings this unit closes); the pilot `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/abort/guides/abort.md`; `/home/user/fleet/abort/guides/guide.md` (function rows carrying their signature) and `/home/user/fleet/abort/guides/probe.md` (class rows carrying the interface implemented).

## Items

1. **Ruling 26.** Every function row with an empty `Shape` cell in `guides/console.md` (the `### Factories`, `### Sinks`, `### Rendering`, `### Capture`, `### Errors`, `### Browser`, and `### Server` tables, about lines 67-72, 86-87, 119-134, 154, 166, 264-267, 301-306) holds its signature as a type literal read from its declaration; a guard row (`isConsoleError`, `isStreamTarget`, `isBufferEncoding`) holds the type it narrows to. Each such table's convention text gains "A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to."
2. **Ruling 28.** Every class row with an empty `Shape` cell (`ANSIRenderer`, `Logger`, `LoggerManager`, `Reporter`, `Retention`, `Capture`, `ConsoleError`, `Spinner`, `Progress`, `ProcessCapture`) holds the interface it implements as a code token, or its constructor signature where it implements none (read `implements` in each class declaration). Each such table's convention text gains "A class row's `Shape` cell holds the interface it implements, or its constructor signature where it implements none."
3. **Ruling 19.** The event map type-alias rows whose cells spell tuple payload types (`LoggerEventMap` about line 90 and the other four the checker names in `d7n-console-closure-checker-console.md` claim 3) take bare member names: `{ entry, … }` with no payload type.

Then `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` reads `rows read: 1, disagreements found: 0` and both write directions read `written: 0`. Move no `Summary` cell by hand.

## Scope

Owned: `guides/console.md`, `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/console.md` prints nothing (no empty `Shape` cell in a table that carries the column); the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/console.md` prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing.
3. `npx oxfmt --config .oxfmtrc.json --check guides/console.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
4. `npm run docs` at zero; both directions `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` exits 0 (record the summary).

## Output

`/home/user/scaffold/tmp/units/d7n-console-close-2-report.md`: per item the hunk as a diff, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if a `Shape` cell cannot be expressed under Rulings 25, 26, and 28 (name the row and what you read), if `npm run docs` reports a disagreement `--to guide` does not clear, or if a gate outside the owned files goes red. Decide the wording of a heading or a lead-in sentence yourself and record it.
