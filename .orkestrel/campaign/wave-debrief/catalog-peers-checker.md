**Role and lane.** `checker` on Claude Sonnet — the mechanical claims 6, 7, and 8 with grep evidence, plus claim 5's sentence-truth check against live files.

## Claim 5 — CONFIRMED

Read live files after the change:

- `.claude/agents/orkestrel.md:123-124`: "derived from the runtime and peer edges in the same row" (`/home/user/scaffold/.claude/agents/orkestrel.md:123-124`).
- `guides/scaffold.md:1089-1093`: "`dependencies` and `peerDependencies` are read. `devDependencies` reaches no consumer... A peer edge orders a dependent the same way a runtime edge does, because a caret peer range at `0.0.x` pins one exact release."
- `src/core/helpers.ts` (`catalogToLayers` remarks, diff lines 44-50): "Only RUNTIME and PEER edges between catalogued packages count... A peer edge counts like a runtime edge..."
- `src/server/Upstream.ts:609-615`: "The runtime and peer edges the published version declares... Development edges are deliberately not read: they reach no consumer..."
- `src/core/types.ts` `CatalogEntry` remarks (diff lines 68-81): adds the peer-ordering sentence beside the `dependencies` sentence.

No sentence still says only `dependencies` is read, and none says development edges are the only unread edges (each says runtime+peer are read, dev is not, matching the code).

## Claim 6 — UNRESOLVED (partially confirmed)

`git status --short` (`/home/user/scaffold/tmp/units/catalog-peers.status`) lists exactly: `.claude/agents/orkestrel.md`, `guides/scaffold.md`, `host.json`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/validators.ts`, `src/server/Materializer.ts`, `src/server/Upstream.ts`, `tests/setup.ts`, `tests/setupServer.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/server/Materializer.test.ts`, `tests/src/server/Upstream.test.ts`, plus four untracked `.orkestrel/campaign/wave-debrief/**` files. Every tracked path is either in the brief's Owned row or named in the report as a further reddened test file (`tests/setup.ts`, report lines 42-46); every untracked path matches the Standing-conditions named list `.orkestrel/campaign/wave-debrief/**`. `package.json`, `README.md`, `.agents/**`, `src/bin/**` are absent from status — confirmed untouched.

The parenthetical asserting "its diff carries the digests of `.claude/agents/orkestrel.md` and `guides/scaffold.md` only" for `host.json` cannot be checked: `git diff --git a/host.json` has no entry at all in `/home/user/scaffold/tmp/units/catalog-peers.diff` (grep for `host.json` in that file returns no matches). The brief itself states only the status file was re-rendered after `npm run build`; the diff was not, so it predates the build and cannot evidence what `host.json`'s post-build diff contains. What would settle it: a diff of `host.json` rendered after the build, showing only the two named digests changed.

## Claim 7 — CONFIRMED

Swept the diff's added lines (`^\+[^+]`) case-insensitively for `should|simply|just|easy|via|e.g.|i.e.|etc.|currently|now|new|latest`. The only hit is line 597, `const upstream = new Upstream({ registry: { base: server.base } })` — `new` here is the TypeScript operator in a constructor call, code rather than prose, exempt per `.claude/rules/writing.md` § Substitutions ("a literal code identifier is data"). No hit in any changed guide, TSDoc, or comment prose. Separately swept for count-shaped number words (`one|two|three|four|five|third|fifth|column`); every hit ("one exact release," "one request per package," "places a dependent one layer") names a value (a specific pinned version, a per-package cost) rather than a count of a growable set, so none violates `AGENTS.md` § Writing's count ban.

## Claim 8 — BROKEN

TypeScript-syntax portion confirmed clean: no `any`, no `as` assertion (the sole `as` hit, `guides/scaffold.md:22` "as name and range," is prose, not a type assertion), no non-null assertion, no nested function/const-arrow declaration added. `readonly peers: readonly Dependency[]` and `readonly peers?: never` (`src/core/types.ts`, diff lines 89, 97) are both `readonly`. New test titles name what they prove (`tests/src/core/helpers.test.ts:388`, `tests/src/core/validators.test.ts:452`, `tests/src/server/Upstream.test.ts:583`).

The gate-exit-code portion is false. `tmp/units/catalog-peers-report.md:73-77` names exit `0` for `format:check`, `lint:check`, `check`, `test:src:core`, and `test:guides`, but for `test:src:server` and `test:src:bin` it names only "1 failure" and "5 failures" (line 76) — no exit code appears anywhere in the report for either command; the only "exit 0" text tied to them is the *expected* value in the Deviation section (lines 108-109), not the actual reading. **Smallest fix:** the writer's report states the actual exit code `npm run test:src:server` and `npm run test:src:bin` returned (for example, "exit 1") beside the existing failure counts.

## Findings outside the claims

None. The four untracked `.orkestrel/campaign/wave-debrief/**` files are accounted for under claim 6 via the Standing-conditions named list, not a separate finding.

## Referrals

None — every question here was mechanically decidable from the supplied evidence.

VERDICT: FAIL 6, 8; outside the claims: none
