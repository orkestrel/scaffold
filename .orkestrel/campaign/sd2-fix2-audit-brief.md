# Audit SD2-FIX-2 — per-script scripts-region writes (scaffold)

Role: checker. Read-only mechanical conformance review. Attempt REFUTATION of each claim;
CONFIRMED needs evidence, BROKEN needs the failing reading and the smallest fix. Terminal line:
`PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/scaffold` (baseline 452f439; writer
GPT-5.6 Sol, plus the Orchestrator's two host reconciliations in `tests/src/bin/CLI.test.ts`
described in claim 6). Diff at `tmp/units/sd2-fix2.diff`; the writer's report at
`tmp/codex/sd2-fix2-last.md`; the binding ruling is in `tmp/units/sd2-fix2-brief.md` § The
Orchestrator's ruling. Supplied host evidence: the CLI suite complete and green, `test:config`
complete and green, `test:src:core` complete and green, bare `npx tsc --noEmit` exit 0.

## Claims

1. `replaceManifestScripts` is per-script: an absent planned writable script appends; a value
   equal to planned stands; a value in `accepted` upgrades to planned; a DIFFERING string
   value stays byte-identical; unplanned scripts stay byte-identical; the whole write returns
   `undefined` only for a structural refusal (non-record `scripts`, a non-string value at a
   planned key). No transactional precheck remains that lets one differing value block a
   sibling append.
2. The scripts question reports absent and differing scripts separately, and a differing entry
   names the script with both its declared and planned commands.
3. The real-html vector is pinned through the real verb: an html-shaped fixture with a
   `test:guides` value lacking `--no-cache` and absent `test:probe`/`test:bench`/`prepack` —
   all three append, `test:guides` stays byte-identical, and the question names it differing.
   The writer's red record (nothing appended before the change) binds to the removed
   transactional precheck.
4. The `#projectQuestion` projection ("the manifest a write would leave") is untouched, and
   the preflight boundary still blocks a write whose projected manifest declares a registered
   project no gate chain invokes — that behavior is ruled correct, not a regression.
5. The guide passage states the per-script boundary truthfully against the landed code, and
   `host.json` regeneration covers exactly the vendored paths the diff moved.
6. The Orchestrator's two reconciliations are sound: (a) the region-refusal test's fixture now
   customizes `prepublishOnly` by appending `&& npm run verify` AFTER the retained release
   proof, so the projected manifest keeps the distribution gate and the verb proceeds — the
   test then proves the appended `test:distribution`, the retained differing `prepublishOnly`,
   and a clean follow-up audit carrying the advisory; (b) the conformance/live-service test's
   before-phase expectation gains the differing-`prepublishOnly` scripts question that the new
   reporting legitimately emits before the structural files exist, computed from the same
   derivations the fixture uses. Confirm neither reconciliation weakened what its test proves.
7. The diff obeys the repository laws in its reach; owned files only
   (`src/core/compilers.ts`, `src/core/types.ts`, `src/bin/CLI.ts`,
   `tests/src/bin/CLI.test.ts`, `tests/src/core/compilers.test.ts`, `guides/scaffold.md`,
   `host.json`); `tests/config.test.ts` untouched.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
