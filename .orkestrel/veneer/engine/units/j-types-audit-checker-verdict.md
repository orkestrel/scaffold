# J-TYPES audit round 1 — the checker's verdict (returned 2026-09-23 by checker on Sonnet, native subagent, 11 tool uses, 95 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

Checker (Sonnet, native Claude subagent with `Read`/`Grep`/`Glob`) — mechanical conformance only.

## Verdicts on claims (from `j-types-audit-claims.md`)

**Claim 8 (immutability and forbidden syntax): CONFIRMED.** Grep of `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts` for `any|as |!(space)|@ts-|eslint-disable|null|public|protected|private|^import` returns only prose occurrences of the English word "as" inside doc comments ("as Bootstrap's `relatedTarget` field does", etc.), never a TypeScript `as` cast, `!` assertion, `@ts-` directive, `eslint-disable`, `null`, or a visibility modifier, and no `import` line. Grep for a bare property declaration (`^\t\w+[?]?: ...`) returns no match, so every property line carries `readonly` (175 matches for `^\treadonly \w+[?:]`). Array/tuple-typed properties sampled — `readonly fallbacks?: readonly PlacementPosition[]`, `readonly offset?: readonly [number, number]`, `SanitizeAllowlist = Readonly<Record<string, ReadonlyArray<string | RegExp>>>` — all take the required readonly forms.

**Claim 11 (TSDoc completeness and guide parity): UNRESOLVED.** The doc-structure sub-claims are directly checkable in the diff and confirmed: doc blocks open with a third-person `-s` verb naming no symbol (`j-types.diff:552` "Maps each event...", `:582` "Configures the ownership record...", `:588` "Records which engine owns..."), every interface method sampled carries `@param` per parameter, `@returns` where a value returns, and an `@example` fence (`j-types.diff:593-628` `RegistryInterface`; `j-types.diff:681-668` `SnapshotInterface`), and the guide `#### RegistryInterface` etc. Summary cells match the description paragraphs verbatim. The claim's `npm run test:guides` "19 passed of 19 in the Orchestrator's own run" is evidenced only by the quoted command/output inside `j-types-report.md:131-137`, the unit's own report — no independent Orchestrator-run log was supplied to this audit. Per the brief's own rule, "a claim whose only evidence is the report's quoted command is UNRESOLVED," so this sub-claim, and therefore claim 11 as a whole, is UNRESOLVED pending that independent log.

**Claim 12 (scope): CONFIRMED.** `j-types-status.txt:1-2` lists exactly ` M guides/veneer.md` and ` M src/browser/types.ts` — no added, moved, or deleted file. `j-types.diff:537-545` shows the seed region's only change is the `ColorModeInterface.toggle` doc comment (line 20 of the source); every other seed declaration (`ButtonDetail` through `DelegateInterface`) is absent from the diff hunk, so byte-identical. The guide diff's only removed content beyond whitespace re-padding is the two separator rows and the `toggle` Summary cell (`j-types.diff:355-364`), and the added content is exactly § Surface rows and § Methods tables for added exports.

**Claim 13 (naming law): CONFIRMED.** Sampled added members are single words (`category`, `element`, `name`, `host`, `side`, `reference`, `threshold`, `handler`, `hint`, `class`, `parent`, `animated`, `document`, `code`, `trigger`) or Bootstrap-admitted multi-word names the mirrored-name sentence lists (`relatedTarget`, `clickEvent` at `j-types.diff:789-792`; `hidePrevented` at `j-types.diff:1031`). Type names follow the prescribed forms (`{Entity}Options`, `{Entity}Interface`, `{Entity}EventMap`, `{Entity}Hooks`, `{Entity}Detail`, `{Entity}Input`, and `{Noun}{Axis}` unions `PlacementPosition`, `PlacementSide`, `SwipeDirection`, `SnapshotCategory`, `CarouselRide`). `SnapshotTarget`'s discriminant is named `category` (`j-types.diff:635`), never `kind` or `type`.

## Mechanical checklist

| Item | Met/Not met | Evidence |
|---|---|---|
| Diff touches only owned files | Met | `j-types-status.txt`: only `guides/veneer.md` and `src/browser/types.ts`, matching brief's § Scope "Owned" list (`j-types-brief.md:34`). |
| No forbidden syntax in added lines | Met | See claim 8. |
| Doc-block first sentence third-person `-s` verb, never names symbol | Met | Sampled across `j-types.diff:552,563,582,588,630,634,644,671,678` — all open "Maps/Configures/Records/Names/Describes/Makes/Shows/Holds/Anchors/Reports"; none repeats its own type name. |
| Every added interface method carries `@example` | Met | Sampled `RegistryInterface`, `SnapshotInterface`, `IsolationInterface`, `BackdropInterface`, `PlacementInterface`, `SwipeInterface`, `CollapseInterface` — each method block in `j-types.diff` ends with a fenced `@example`. |
| Every property line carries `readonly` | Met | Grep for a bare (non-readonly) property declaration in the worktree file returned no match; 175 matches for `readonly` property lines. |
| § Surface: one row per added export | Met | `grep -n "^export "` on the worktree file lists 76 exports from `EventHooks` through `CarouselInterface`; the guide diff (`j-types.diff:270-347`) adds exactly 76 rows over the same names in the same order. |
| § Methods: one table per added behavioural interface, rows = call-signature members | Met | 19 added `####` tables (`RegistryInterface` through `CarouselInterface`) correspond to the 19 added interfaces carrying at least one call signature; sampled row sets match the interfaces' declared methods exactly (for example `CollapseInterface`: `show, hide, toggle, destroy` in both the type and the table, `j-types.diff:741-785` vs `:426-434`). |
| No banned `writing.md` term in added prose | Met (per report, unverifiable independently) | `j-types-report.md:129` reports the prose sweep over `git diff -U0` returning only `once` (five times, "at once", permitted) and `new` (once, inside `new Sanitizer()` code sample, exempt as a code token). This reading is the unit's own report, not an independently reproduced sweep; treated here as a checklist item rather than a falsifiable claim, so it is reported but not elevated to CONFIRMED. |
| No new or moved file | Met | `j-types-status.txt` shows only `M` entries, no `A`/`R`/`D`. |
| Report's "Rulings taken" names a bounding rule per ruling | Met | `j-types-report.md:56-86`, rulings 1-31 each end "Bound: <rule/spec citation>" (for example ruling 6 "Bound: R4.", ruling 24 "Bound: R12 and `documentation.md` § Parity."). |

## Referrals

- Whether the doc-structure evidence already confirmed for claim 11 is sufficient to close the claim despite the unresolved `test:guides` sub-claim, or whether the whole claim must wait on an Orchestrator-run log — a scope-of-claim judgment belongs to the Orchestrator or the objective/subjective lane reconciling this round, not to this mechanical check.
- The prose-sweep checklist item rests entirely on the unit's own reported command; whether an independent re-run is required before the round accepts it is a process judgment for the Orchestrator.

VERDICT: FAIL

---

Orchestrator's note at retention: the terminal line names no claim; the lane's body places only claim 11 outside `CONFIRMED`, as `UNRESOLVED` for want of the Orchestrator's own guide-parity run. That run is `j-types-gates.log.txt` beside this file (`npm run test:guides`, 19 passed of 19, exit 0, taken by the Orchestrator in the worktree before the round launched), and the Orchestrator's own substitution sweep over the added lines (`git diff -U0 | grep "^+" | grep -inowE <the table's pattern>`) returned `once` five times, each in "at once", and `new` once, inside the `new Sanitizer()` code sample, which matches the unit's reading. Both readings close the lane's two referrals at reconciliation.
