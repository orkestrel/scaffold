# Brief — `d7n-websocket-frame` (the W4 successor: the `frame` helper's rename and description)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/websocket` from the committed tip `3f9e229` (clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-websocket-frame/` inside this checkout.

## Objective

The fix round's item W4 stopped because the rename reached `tests/setupServer.test.ts`, which its brief did not grant (`d7n-websocket-converge-fix-report.md` § W4). This unit owns that file and completes the item: `tests/setupServer.ts`'s exported `frame` becomes `encodeTestFrame` at its declaration and at every call site under `tests/**` (`tests/setupServer.test.ts` and the `tests/src/**` files `grep -rn '\bframe(' tests` lists), and its description paragraph reads "Encodes one RFC 6455 frame for tests, optionally clearing FIN for fragmentation cases."

## Items

1. Rename the declaration `export function frame(` → `export function encodeTestFrame(` in `tests/setupServer.ts`; write the description sentence above; keep every other line of the block.
2. Update every import and call site under `tests/**` (`grep -rn '\bframe\b' tests --include=*.ts` after item 1 must print no bare `frame` identifier that refers to the helper; a local variable or a property named `frame` in a test body stays).
3. `npx oxfmt --write tests/setupServer.ts tests/setupServer.test.ts <the call-site files>`.

## Scope

Owned: `tests/setupServer.ts` (that declaration and its doc block), `tests/setupServer.test.ts`, and the call-site files under `tests/src/**` for the identifier alone. Off-limits: everything else, including `src/**`, `guides/**`, `README.md`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `grep -rn '\bframe(' tests --include=*.ts` prints nothing; `grep -c 'encodeTestFrame' tests/setupServer.ts` reads at least 1.
3. `npx oxfmt --check <owned paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings tests` exit 0; `npm run check` exit 0.
4. `PATH=/opt/npm11/bin:$PATH npm run test:setup` and `npm run test:src:server` exit 0 (record the summaries; the host is under load — report a timing red with its reading).

## Output

`/home/user/scaffold/tmp/units/d7n-websocket-frame-report.md`: per item the hunk, per criterion the command and its last lines. No process diary. No count in prose: name the members or recast the sentence.

## Deviation contract

Stop if the rename reaches a file outside the owned set or a gate outside them goes red.
