# Unit L1 LEDGER-HOME — brief

## Role and engine

`opus` on Opus (the `opus` alias; the CLI serves Opus 5), sole writer in the git worktree
`/home/user/veneer-ledger`, detached at `ed4a8ec` (the Veneer session branch head), with its own
`node_modules`. Perform the assignment directly and spawn nothing.

## Objective

The `guides/` directory holds guides alone: the package's own `veneer.md`, the map `README.md`, and
the catalog mirrors. The cascade ledger the F5b unit moved into `guides/ledger/departures.md` and
`guides/ledger/additions.md` returns to `guides/veneer.md`, byte for byte in its rows, and every
reader, proof, map entry, and cross-reference reads it there. The `guides/ledger/` directory no
longer exists.

## Context

- **The ruling.** The user's ruling of 2026-09-22, recorded as D14 in
  `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`: only guides live in `guides/`,
  and Veneer's guide is `veneer.md`. The vendored policy sweep (`inspectPolicyProse` in
  `tests/setupPolicy.ts`) states the same law by refusing a top-level guide that is neither the
  package's own, the map, nor a catalog row; the nested path was a workaround of that law and is
  refused. `ROADMAP.md` § Records (report-only) reads the machine-read record from `guides/veneer.md`
  alone.
- **Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{documentation,writing,tests,typescript,names}.md`.
- **Sites, located by heading and symbol.** In `guides/veneer.md` under `## Tokens`: `### The ledger`
  (the pointer section this unit replaces) sits before `### Outside the ledger`; two cross-references
  under `### Bootstrap variables Veneer retains` link `ledger/departures.md` (around lines 880 and
  890), and `### Outside the ledger` reads "neither ledger file". `guides/ledger/departures.md`
  opens with an H1, a tagline, `## Cascade`, then `### Departures` (the introduction, the legend, the
  refresh command, and one `#### \`<key>\`` table per shipped component); `guides/ledger/additions.md`
  the same with `### Additions`. `guides/README.md` § By concept carries a paragraph naming the
  `ledger` directory. `readDepartures` and `readAdditions` in `tests/setupServer.ts` default to the
  two files and walk the `Cascade` section (`selectSubsectionTables(…, 'Cascade', 'Departures', …)`);
  `LEDGER_GUIDE` in the same file opens with `## Cascade`; the plants in `tests/setupServer.test.ts`
  write `## Cascade` and call `selectSubsectionTables(source, 'Cascade', 'Additions', 'Addition')`;
  `tests/guides.test.ts` inventories `guides/**/*.md`. `tests/conformance.test.ts` calls both readers
  with no argument and needs no edit.
- **Host.** npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
  Other worktrees' gate chains run beside you.

## Obligations

1. **The move back.** Replace `### The ledger` in `guides/veneer.md` with `### Departures` carrying
   the departures file's introduction, legend, refresh command, and every per-component table, then
   `### Additions` carrying the additions file's introduction and table, both under `## Tokens` and
   before `### Outside the ledger`, with every table row byte for byte as the files carry it. Delete
   `guides/ledger/`. Restore the two cross-references to in-guide references (`§ Departures`) and
   `### Outside the ledger`'s wording to "neither table here". Remove the README paragraph. Keep the
   `### The ledger` prose's one true fact — the readers, the gates, and the refresh command — inside
   the § Departures introduction where the file already states it, without repeating it.
2. **The readers.** `readDepartures` and `readAdditions` default to the package guide and walk the
   `Tokens` section (`selectSubsectionTables(…, 'Tokens', 'Departures', …)` and `'Additions'`);
   `LEDGER_GUIDE` opens with `## Tokens`; the plants write and select `Tokens`; the `@param path`
   lines name the guide. `tests/guides.test.ts` inventories `guides/*.md`.
3. **The gates.** `npm run build:src && npm run test:conformance` exits 0 over the moved rows;
   `npm run test:setup`, `npm run test:guides`, and `npm run test:policy` exit 0.

## Scope

- Owned: `guides/veneer.md`, `guides/ledger/departures.md` and `guides/ledger/additions.md` (deleted),
  `guides/README.md`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts`.
- Shared, report-only: `ROADMAP.md` (return the § Records patch naming `guides/veneer.md` alone).
- Off-limits: every other file. No git command that discards a working-tree change; no `npm install`.

## Execution

Perform the assignment directly and spawn nothing. Validate with `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run build:src && npm run
test:conformance`, `npm run test:guides`, and `npm run test:policy`.

## Output

Write `tmp/units/l1-ledger-home-report.md` and return the same text: the row counts before and after
by `grep -c '^| \`'` over the two files and the guide's two sections (they must match), the touched
files, the restored cross-references, `git status --porcelain`, `git diff --stat`, the gate exits,
deviations per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`, the
`ROADMAP.md` patch, and the claims you flag unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: the exact wording that
folds the pointer section's one fact into the § Departures introduction, and the order of the two
sections (Departures before Additions). Stop and report when the policy sweep refuses the guide
with the tables inside it.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `ls guides/` prints `README.md`, `guide.md`, `scaffold.md`, `veneer.md` and nothing else.
3. `npm run test:setup` exits 0; `npm run build:src && npm run test:conformance` exits 0.
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. `grep -rn 'guides/ledger\|ledger/departures\|ledger/additions\|## Cascade' guides tests` prints
   nothing.
6. `git status --porcelain` lists owned files only.
