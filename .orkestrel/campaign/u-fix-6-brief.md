# Implementation brief — U-fix-6

## Role and engine

`builder`, native Claude subagent on Sonnet, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. Fully specified: every replacement
is prescribed; your judgment load is the wrap and the gates.

## Objective

Close the token rule across every `**scaffold**` row under `ROADMAP.md` § The next conformance
matrix's rows, from the mechanical table the U-fix-5 Grok check produced
(`.orkestrel/campaign/lanes/u-fix-5-check-grok.md` § (4)): every backticked token is followed by
a noun, a version in running prose is a plain numeral, and a quoted word is quoted rather than
backticked. `ROADMAP.md` is unpublished; this unit ships nothing.

## Items — each an exact replacement inside the named row

1. Node-floor row: "node floor `22.18.0`, where" → "node floor 22.18.0, where".
2. `&&` row: "(`scaffold/package.json`, `toolbox/package.json`, `ollama/package.json`)" → "(the
   `scaffold/package.json` file, the `toolbox/package.json` file, and the `ollama/package.json`
   file)".
3. `@types/node` row: "pin `target: 'node22'` for" → "pin the `target: 'node22'` setting for";
   "(`src/core/templates.ts:169`, `:200`, and `:284`)" → "(the `src/core/templates.ts` file at lines
   169, 200, and 284)".
4. Transitive-dependencies row: "through the `@orkestrel/queue` and `@orkestrel/database`
   packages" → "through the `@orkestrel/queue` package and the `@orkestrel/database` package";
   "declares `^22.18.0 || >=24.4.0`, so Node `24.0.0` through `24.3.x` installs" → "declares the
   `^22.18.0 || >=24.4.0` range, so Node 24.0.0 through 24.3.x installs"; "names `24.4.0`, and" →
   "names 24.4.0, and".
5. `supportsMappedLoopback` row: "the `supportsBytes`, `supportsCase`, `supportsDirectoryLinks`,
   `supportsFileLinks`, and `supportsMode` siblings" → "the `supportsBytes` predicate, the
   `supportsCase` predicate, the `supportsDirectoryLinks` predicate, the `supportsFileLinks`
   predicate, and the `supportsMode` predicate".
6. `matchesEngines` row: replace the whole row with exactly:

   ```
   - **scaffold**: the direction vocabulary for a version is "earlier" and "later", and the
     shipped guide departs from it in the `matchesEngines` summary cell in the `guides/scaffold.md`
     file ("at or above the supported minimum") and in that file's prose at lines 1166 ("the older
     release"), 1200 ("A newer major"), 1234 ("a floor below the newest release"), and 1235 ("a
     newer major"). The parity contract ties the cell to the export's description paragraph in the
     `src/core/` tree, so the cell's repair moves the source and re-emits the `dist/src` tree; the
     prose repairs move the vendored guide alone. Ruled on 2026-09-13.
   ```
7. 0.0.65 successor row: "names the endpoint parameter `host` and uses the same word for the
   machine" → "names its endpoint parameter with the `host` name and uses the same word for the
   machine"; "reads `host npm` where the rest of that block reads `ambient`" → "reads \"host npm\"
   where the rest of that block reads \"ambient\""; "whether the `provisionNpm` or `resolveNpm`
   name carries" → "whether the `provisionNpm` name or the `resolveNpm` name carries"; "in
   `package.json` to the `MINIMUM_NODE_VERSION` constant in `src/core/constants.ts`. Ruled" → "in
   the `package.json` file to the `MINIMUM_NODE_VERSION` constant in the `src/core/constants.ts`
   file. Ruled".

Match each target across its wrap. Re-wrap to the row's width; keep each code span on one line.
Change nothing else.

## Owned files

`ROADMAP.md`.

## Off-limits

Every other file, in particular `guides/scaffold.md`, `README.md`, `src/core/constants.ts`,
`host.json`, `.orkestrel/**`, `tmp/**`.

## Execution and deviation contract

Perform this assignment directly and spawn no agent. Write only the owned file. Run no `git`
command that discards a working-tree change; run no tree-wide `format` or `lint --fix`. Stop and
report if a target is not found verbatim across its wrap.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits 0.
2. `npm run test:policy` exits 0.
3. `grep -c 'node floor 22.18.0, where' ROADMAP.md` reads 1; `grep -c 'the `supportsMode`
   predicate' ROADMAP.md` reads 1; `grep -c '"earlier" and "later"' ROADMAP.md` reads 1;
   `grep -c 'the `provisionNpm` name or the `resolveNpm` name' ROADMAP.md` reads 1.
4. `grep -n '`[0-9][0-9.x]*`' ROADMAP.md` prints no line between the line of the row beginning
   "npm 10.9.7 and every npm" and the line of the row beginning "**abort**".
5. `git diff --stat` names only `ROADMAP.md`.

## Output

Each criterion with its exact reading; each item's landed text verbatim; the deviation state.
