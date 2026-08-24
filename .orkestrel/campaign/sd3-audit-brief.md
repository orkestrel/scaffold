# Audit SD3 — vendored prepack assertion + sentinel-env pin (scaffold)

Role: checker. Read-only mechanical conformance review. Attempt REFUTATION of each claim;
CONFIRMED needs evidence, BROKEN needs the failing reading and the smallest fix. Terminal line:
`PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/scaffold` (baseline 85f8df3, writer
GPT-5.6 Sol). Diff at `tmp/units/sd3.diff`; report at `tmp/codex/sd3-last.md`; the ruling is
`.orkestrel/campaign/d2d-reconciliation.md` ruling 3 plus the SD4 carry recorded in
`tmp/units/sd3-prepack-assertion-brief.md` item 4. Supplied host evidence: `test:config`
complete and green (the new tests included), `test:guides` complete and green.

## Claims

1. The packing test in `tests/config.test.ts` asserts
   `expect(prepack).toBe(publishes ? 'npm run build' : undefined)` with `publishes` derived
   from `private !== true` the same way the file's sibling tests derive it (no second
   derivation), and its inline throwing control follows the file's existing control idiom.
2. The sentinel-env test invokes EVERY project-row factory through `Reflect.apply` with a
   sentinel environment record and asserts no sentinel field enters the returned
   configuration; its named control factory proves the loop can throw. The iteration covers
   the full project set the root configuration registers (name how it enumerates them, and
   check nothing is skipped).
3. The self-referential compilers pin was already the literal at baseline, so leaving
   `tests/src/core/compilers.test.ts` unedited is conformant, not a miss.
4. The guide edit changed only the one prepack passage, its sentence is true against the
   emitted value, and `host.json` regeneration covers exactly the vendored paths the diff
   moved (`guides/scaffold.md`, `tests/config.test.ts`).
5. The diff obeys the repository laws in its reach; only `tests/config.test.ts`,
   `guides/scaffold.md`, and `host.json` moved.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
