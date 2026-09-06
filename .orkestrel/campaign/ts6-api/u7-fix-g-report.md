# Report — U7-fix-g: the stale boot and warm-prove rows in the guide's § Cost (probe)

## Edits

1. **Introductory paragraph.**
   - Before: `The following measurements decide whether a harness's timeout is right. The type-stage readings were\ntaken on 2026-09-06 and the rest on 2026-08-20, over this repository as the target workspace, on`
   - After: `The following measurements decide whether a harness's timeout is right. They were taken on\n2026-09-06, over this repository as the target workspace, on`

2. **Boot row (`tools/call`).**
   - Before: `| Boot: spawning \`dist/bin/main.js\` to the first answered \`tools/call\`     | 4.1 s to 4.4 s over 4 runs   |`
   - After: `| Boot: spawning \`dist/bin/main.js\` to the first answered \`tools/call\`     | 16.2 s to 16.8 s over 3 runs |`

3. **New row (`initialize`), inserted before the boot row.**
   - Before: (absent)
   - After: `| Boot: spawning \`dist/bin/main.js\` to the answered \`initialize\`           | 497 ms to 561 ms over 3 runs |`

4. **Warm-prove row.**
   - Before: `| One warm \`prove\` over the flagship claim, client round trip              | 437 ms to 495 ms over 4 runs |`
   - After: `| One warm \`prove\` over the flagship claim, client round trip              | 4.2 s to 5.7 s over 3 runs   |`

5. **"Boot is dominated by arming" paragraph.**
   - Before: `Boot is dominated by arming, which runs its real controls through every stage before the service\nanswers. A client whose timeout is tighter than boot reports a hang that is a wait.\nHandshake requests answer immediately; only \`tools/call\` waits on arming.`
   - After: `Boot is dominated by arming, which runs its real controls through every stage before the service\nanswers. The first answered \`tools/call\` also carries one \`prove\`, so it lands about one warm call\nafter the \`arm\` event. A client whose timeout is tighter than boot reports a hang that is a wait.\nHandshake requests answer immediately; only \`tools/call\` waits on arming.`

## Acceptance criteria

1. **`git diff --stat` names `guides/probe.md` and no other file.**
   FAIL by literal reading of "no other file" — `git diff --stat` lists 20 other files (`src/core/constants.ts`, `src/server/TypeStage.ts`, and others under `tests/`) that were already dirty from prior units U7 and fixes a to f in this same uncommitted campaign tree, per the brief's Context: "The tree is dirty with U7 and fixes a to f, uncommitted; commit nothing." I did not touch any of these files. `git diff --stat -- guides/probe.md` confirms `guides/probe.md | 388 ++++----` is the only entry when scoped to this unit's owned file.

2. `sed -n '/^## Cost/,/^## Tests/p' guides/probe.md | grep -c '2026-08-20'` prints `0`. PASS. Command run, output `0`. The three rows under Edits 2 to 4 carry the stated values, confirmed by direct inspection of lines 1043–1067.

3. `npx oxfmt --check guides/probe.md` exits 0. PASS. Output: "All matched files use the correct format." Exit code 0.

4. `npm run test:guides` exits 0. PASS. Output: "Test Files 1 passed (1)", "Tests 13 passed (13)", `guides.test.ts` completed in 21.77 s with no failures.

## Deviations

None against the brief's Edits or Scope. Criterion 1's wording ("no other file") is contradicted by the brief's own stated precondition that the tree carries prior uncommitted units' changes across many files; I read this as expected pre-existing dirt rather than a defect in my edit, and confirmed no file outside `guides/probe.md` changed as a result of this unit's work.
