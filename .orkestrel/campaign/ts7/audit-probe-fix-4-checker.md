<!-- workflow wf_51c9d6b8-ef2, agent ac07d4a8e122f3f89, captured from journal.jsonl -->

## Per-claim verdicts

**Claim 1 — REFUTED... actually CONFIRMED.** All eight edits from `/home/user/scaffold/tmp/units/ts7-probe-fix-4-brief.md` read at their cited sites in `/home/user/fleet/probe`:
1. `src/core/types.ts:231` — "Names the version each tool's own installed manifest publishes in the target workspace." — matches.
2. `src/core/types.ts:248,250,252` — each of `typescript`/`oxlint`/`vitest` reads "Names the `<tool>` version that tool's own installed manifest publishes in the target workspace." — matches.
3. `src/core/validators.ts:198` — "Checks whether a value names every tool version the target workspace's installed manifests publish." — matches.
4. `guides/probe.md:110` — `isToolchain` row — "Admits a record carrying every tool version the target workspace's installed manifests publish." — matches.
5. `guides/probe.md:454-458` — bullet reads "probe resolves each of them from the target workspace, never from its own dependencies, and reports the version each tool's own installed manifest publishes on `Verdict.toolchain`." rewrapped, longest line 99 columns — matches, within 100 columns.
6. `guides/probe.md:663-666` — "Each version is the one that tool's own installed manifest publishes in the target workspace," rewrapped, longest line 97 columns — matches.
7. `tests/setupServer.ts:193-194` — "A row passing `bridged` is gated with `it.runIf(DIRECTORY_LINKS)`, because the link is a directory link." — matches.
8. `tests/setupServer.test.ts:49-99` — split into an ungated row (`writes a version-only TypeScript 7 workspace and nothing beside it by default`, own scratch/finally, `bare` assertions through `toStrictEqual({ version: '7.0.2' })`) and a gated row (`it.runIf(DIRECTORY_LINKS)`, `links the bridge and writes the tools beside the compiler a caller selects`, own scratch/finally, `equipped` assertions through the `vitest` manifest check) — matches.

Verdict: **CONFIRMED**.

**Claim 2 — REFUTED.** `src/core/types.ts:453` reads "Names the tool versions resolved from the workspace at construction." on `ProbeInterface.toolchain`. This is a third phrasing of the same `Toolchain` concept, framed around "resolved," inconsistent with the account fixed everywhere else in the same file (`types.ts:231`, `:248`, `:250`, `:252`: "the version each tool's own installed manifest publishes in the target workspace"), in `validators.ts:198`, and in `guides/probe.md:43,110,455-457,663-665`. The sweep instruction ("sweep `src/core/*.ts`... for `resolved` and rule each hit by its sense") catches this hit: its sense restates the retired "resolved version" framing the round targeted, so "one account... holds everywhere it is stated" fails at this untouched site. (Other `resolved` hits in `src/core/types.ts:262,275,278,518`, `validators.ts:216`, `constants.ts:137`, and `guides/probe.md:44,252,485,668,697,711,754,783,792,918` are about `Project`/paths/peers, a different concept, and are not violations.) No `package.json`-as-source sentence remains in `guides/probe.md` (confirmed empty grep).

**Claim 3 — REFUTED.** `tests/setupServer.test.ts:71-72` carries "Every selection at once, in a second workspace inside the same scratch, which is how a proof that branches on the installation carries both cases." Edit 8 split the original single test/scratch (which held both a `bare` and an `equipped` workspace) into two tests with two separate scratches. In the surviving (gated) test, this scratch now holds only the `equipped` workspace — it is no longer "a second workspace inside the same scratch," and "both cases" names no referent inside this test. The comment is stale relative to the split the brief itself directed, and "both" is left ungrounded (not naming its members), which `.claude/rules/writing.md`'s "both" rule and `AGENTS.md` § Writing's count rule require. No other substitution-table hits were found in the diff's added prose (all `new`/`since`/`once`/etc. matches are code constructs or non-banned senses — "once" meaning "a single time," not the temporal-causal sense the table bans); the rewrapped guide bullets (edits 5 and 6) stay at or under 100 columns.

**Claim 4 — CONFIRMED.** `tests/setupServer.test.ts:49-64` (ungated, default-shape assertions, own `scratch`/`finally`) and `:66-99` (`it.runIf(DIRECTORY_LINKS)`, `equipped` assertions, own `scratch`/`finally`) are present exactly as required.

**Claim 5 — CONFIRMED.** `/home/user/scaffold/tmp/units/ts7-probe-fix-4.status.txt` lists exactly fourteen files: the thirteen earlier units' files (`guides/probe.md`, `package-lock.json`, `package.json`, `src/core/types.ts`, `src/server/Probe.ts`, `src/server/helpers.ts`, `src/server/stages/TypeStage.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/stages/TypeStage.test.ts`) plus `src/core/validators.ts`, and nothing else.

## Findings outside the claims

The round-4 report's gate table (`npm run test:guides` red on the named Oxlint `initialize`-deadline row, both full and alone re-runs) is the writer's self-report and is not independently corroborated in the evidence supplied to this audit; it is UNRESOLVED, not CONFIRMED, but no claim in this dispatch turns on it.

VERDICT: FAIL 2, 3; outside the claims: none
