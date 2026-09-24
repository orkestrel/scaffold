# J-SNAPSHOT audit round 1 — the checker lane's verdict (Sonnet, agent a73edb6b8934d3a4a, retained verbatim 2026-09-24)

**checker (Sonnet), mechanical conformance lane, J-SNAPSHOT round 1 audit.**

## Numbered verdicts

1. **CONFIRMED** (mechanical clauses only — record shape, not interleaving correctness, which is the objective lane's). Every case title claim 1 names appears verbatim in the diff: `j-snapshot.diff:526,540,552,575,613` (`HostSnapshot.test.ts`) and `:779` (`Modal.test.ts`, `removes the class attribute the body lacked when two modals holding different open tokens release in the order they took them`). The four named rows appear in `j-snapshot-mutations.log.txt:3-6` with matching `EXACT`/`JOINED` values and named cases (`the presence record withdrawn early`, `the removal judged per snapshot again`, `the presence read at restore time rather than save time` — all `JOINED` — and `the record a save during its own restoration takes back is dropped` — `EXACT`, case `keeps its share of the class record…`).
2. **CONFIRMED** (mechanical clauses only). Case titles at `j-snapshot.diff:640,683,722` match claim 2 verbatim. `j-snapshot-mutations.log.txt:7-9` carries `the re-entry hand-off dropped` (`JOINED`), `…read on the Dropdown reproduction` (`JOINED`), and `the lifetime read dropped` (`EXACT`, "44 writes where 1 is expected" — matches `44 to be 1` at line 9).
3. **CONFIRMED** (mechanical clauses only). `types.ts` and `HostSnapshot.ts` remarks and `guides/veneer.md` § Ownership and restoration, `#### Dropdown`, and the Modal presence paragraph are edited per `j-snapshot.diff:1-72` and `:79-137,449-499`; the `#### Tab`/`#### Carousel` J-SNAPSHOT-SHARED sentences are absent from the diff, so unchanged, matching the report's "needs a carrier" note (`j-snapshot-report.md:203-207`). `test:guides` reads 19 passed at exit 0 (`j-snapshot-gates.log.txt:87-92`). The Modal case is retitled and asserts `body.hasAttribute('class')` false (`j-snapshot.diff:779,789`).
4. **CONFIRMED** on its own enumerated clauses. `LANDED` reads 6 failed of 30 (`j-snapshot-mutations.log.txt:2`); `GREEN?` rows read 0 failed of 30 and 0 failed of 35 (lines 10-11); digests agree before/after and the receipt reads `restored byte for byte` (lines 1,12,13). `j-snapshot-gates.log.txt` shows `check:src:browser`(10), `check`(25), `oxlint`(28), `oxfmt`(35), `test:src:browser` 648 passed in 22 files (75), `test:guides` 19 (88), `test:policy` 109 passed/1 skipped (101), all exit 0. `j-snapshot-status.txt` lists exactly `guides/veneer.md`, `HostSnapshot.ts`, `types.ts`, `HostSnapshot.test.ts`, `Modal.test.ts` — matching the brief's owned set plus the one returned shared-file patch. No `any`, `as`, `!`, `@ts-`, `eslint-disable`, access modifier, default export, or nested function declaration outside an anonymous callback appears in the added diff lines (`j-snapshot.diff` reviewed whole). `HostSnapshot.ts` holds one exported class plus one type import (`j-snapshot.diff:79`). The report states no `prove` call was made (`j-snapshot-report.md:5`).
5. **UNRESOLVED for this lane** — the claim itself reserves the ruling to the subjective lane. Referred to `reviewer`.

## Findings fitting no claim

**F1 — banned temporal `once` in added prose, substituted for `after` per `.claude/rules/writing.md` § Substitutions.**
- `guides/veneer.md`, added paragraph in § Ownership and restoration (`j-snapshot.diff:20`, sourced near the paragraph beginning "a value recorded as absent is removed…", worktree file around line 825): "judges that removal, **once** its token or property writes are done, so no order of restorations…" — temporal sense ("after"), the row `.claude/rules/writing.md` fixes as banned.
- `src/browser/types.ts`, the same sentence in `HostSnapshotInterface.restore`'s remarks (`j-snapshot.diff:474`, worktree around line 353): "judges that removal, **once** its token or property writes are done…" — same banned sense.
- Pattern swept: `\bonce\b` across `j-snapshot.diff` (covering `guides/veneer.md`, `src/browser/HostSnapshot.ts`, `src/browser/types.ts`, `tests/src/browser/HostSnapshot.test.ts`, `tests/src/browser/Modal.test.ts`). Two other hits are permitted senses and are not findings: `HostSnapshot.ts:343` "once per element" (quantifier, not temporal conjunction) and `HostSnapshot.ts:189` "since its last restoration began" (temporal `since`, not the banned causal sense). Two hits inside `it(...)` test-title string literals (`j-snapshot.diff:552,683`) are exempt as quoted code/fixture identifiers per `AGENTS.md` § Writing and `.claude/rules/writing.md`.

## Checklist

| item | status | evidence |
|---|---|---|
| status lists only owned files, no off-limits file | met | `j-snapshot-status.txt:1-5` vs. brief's Owned/Shared scope (`j-snapshot-brief.md:41,43`) |
| every case title the report names appears verbatim in the worktree's test files | met | `j-snapshot.diff:526,540,552,575,613,640,683,722,779` |
| every mutation row the report names appears in the instrument's log, matching, log ends with digest receipt | met | `j-snapshot-mutations.log.txt:2-13` |
| no `.bs.` wire name dispatched/listened outside `constants.ts` and guide prose | met | `j-snapshot-gates.log.txt:107-118` (guide prose only) and `:207-243` (constants.ts only); none in `HostSnapshot.ts`'s diff |
| added lines carry no `any`/`as`/`!`/`@ts-`/`eslint-disable`/access modifier/parameter property/default export/nested function declaration outside an anonymous callback | met | full read of `j-snapshot.diff` |
| every added interface property and public return collection is `readonly` | met | no new interface properties added (`j-snapshot.diff:452-499` is remarks-only); new class fields already typed `readonly`/`ReadonlyArray`/`ReadonlySet` (`j-snapshot.diff:169-196`) |
| `HostSnapshot.ts` holds one class plus imports | met | `j-snapshot.diff:79` (single `import type` line, single exported class) |
| every immediately invoked element guard added reads `isInstance(x, HTMLElement)` | met (vacuous) | no such guard was added in this diff |
| barrel exports exactly the names `index.test.ts` asserts | met | `index.ts` not present in `j-snapshot.diff`, so unchanged |
| guide's § Surface has one row per barrel export | met | unchanged, same reasoning |
| every added Summary cell equals its description paragraph | met (vacuous) | no Summary cells added |
| every added summary opens third-person `-s` verb, no symbol name | met (vacuous) | no summaries added |
| no § Examples fence added, no `plugin` row changed | met | absent from `j-snapshot.diff` |
| barrel and § Surface rows unchanged | met | `index.ts` and the surface table absent from `j-snapshot.diff` |
| no `writing.md` § Substitutions term in added prose | **not met** | see F1 |
| shared-file patch names `Modal.test.ts`; Orchestrator applied it before the gate run; status lists it | met | `j-snapshot-report.md:172-213` (integration note) and `j-snapshot-status.txt:5` and `j-snapshot-gates.log.txt:7` |
| report records no `prove` call | met | `j-snapshot-report.md:5` |

## Referrals

- Claim 5's shape ruling (single-word names, real-domain-state `{present, holders}` shape, guide voice, retitled Modal case) — sent to `reviewer` (subjective lane).
- Whether the guide/`types.ts` sentences genuinely state the closed behaviour rather than a residual bound, and whether the presence-record/re-entry semantics are correct under every interleaving — objective lane's (`analyst`), not this lane's.

## Terminal line

```text
VERDICT: FAIL none; outside the claims: F1
```
