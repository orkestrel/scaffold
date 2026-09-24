# J-BINDER-PRECEDENCE audit round 1 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 11 tool uses, 130 s; retained verbatim from the subagent's return text)

# Checker verdict — J-BINDER-PRECEDENCE audit round 1

`checker` on Sonnet, native Claude subagent (Read/Grep/Glob only), mechanical conformance only.

## Claims

**Claim 4 (P4, `readTag`) — CONFIRMED.**
- `helpers.ts` diff exports `readTag(value: unknown): string | undefined`, TSDoc summary "Reads the tag name of a value that is an element." (`j-binder-precedence.diff:377-396`).
- `Button.ts` diff removes the inline `try/catch` reading `tagName` and calls `readTag(host)` (`j-binder-precedence.diff:106-121`).
- `tests/src/browser/helpers.test.ts` adds the `describe('readTag', …)` block covering an HTML element, an SVG element, `null`, a look-alike, and a throwing-prototype proxy (`j-binder-precedence.diff:756-775`).
- `tests/src/browser/index.test.ts` adds `'readTag'` to the export-list assertion (`j-binder-precedence.diff:833`).
- `guides/veneer.md` § Surface row: `| readTag | function | Reads the tag name of a value that is an element. |` (`j-binder-precedence.diff:17`), Summary equals the TSDoc summary verbatim.

**Claim 5 (P5, `CollapseVocabulary`) — CONFIRMED.**
- `types.ts` declares `CollapseVocabulary` beside the `ButtonVocabulary` shape, `classes`/`attributes`/`selectors` groups, each `readonly`, each with its own TSDoc line, and an interface-level TSDoc summary (`j-binder-precedence.diff:405-413`).
- Guide § Surface row added with the matching Summary (`j-binder-precedence.diff:9`).
- Type-level proof: `expectTypeOf<CollapseVocabulary>().toEqualTypeOf<{...}>()` in `tests/src/browser/index.test.ts` (`j-binder-precedence.diff:817-822`).

**Claim 7 (Scope, gates, E6) — UNRESOLVED** (one conjunct unverifiable; the remainder CONFIRMED).
- Scope: `j-binder-precedence-status.txt` lists exactly the eight owned files (`guides/veneer.md`, `Button.ts`, `HostSnapshot.ts`, `helpers.ts`, `types.ts`, `HostSnapshot.test.ts`, `helpers.test.ts`, `index.test.ts`); no shared file (`tests/setupBrowser.ts`, `ROADMAP.md`) or off-limits file (`tsconfig.json`, `vite.config.ts`, `configs/`) appears. Met.
- Gates: `j-binder-precedence-gates.log.txt` shows `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:src:browser` 144/144, `test:guides` 19/19, `test:policy` 109 passed | 1 skipped, `build:src:browser exit=0` (`gates.log.txt:13-75`). Met.
- Criterion-5 greps: `started-first-grep exit=1` and `undefined-detail-grep exit=1` in the Orchestrator's own run (`gates.log.txt:76-78`), independent of the report. Met.
- No `any`, `as` cast, non-null `!`, `@ts-`, `eslint-disable`, `public`/`protected`/`private`, or parameter property in added lines: swept the diff for these tokens; every hit is prose ("recorded as absent", "reads as undefined") or `new Map()`/`new HostSnapshot()` construction, never a cast or modifier. Met.
- No alias, re-export, `@deprecated`, fallback, or wrapper added (E6): diff shows only new declarations and edited bodies, no dead code retained. Met.
- Report names thread id and journal path and the refused `prove` call: `j-binder-precedence-report.md:3` ("Thread `01a0d0b8-b642-7e21-9d2d-a1b492634966`; journal `tmp/codex/j-binder-precedence.jsonl`") and `:179` ("`MCP tool call requires approval, but approval policy is never`"). Met.
- **Unresolved conjunct**: the claim asserts "the Orchestrator's own mutation instrument reproduces the report's reddening … restoring every source byte for byte," attributed to `j-binder-precedence-mutations-orchestrator.log.txt`. That file does not exist in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/` (glob returned no match), and `j-binder-precedence-gates.log.txt` contains no mutation section — only the report's own mutation table (`report.md:52-67`) documents this. Per the brief's rule, a claim whose only evidence is the report is `UNRESOLVED`. This conjunct is UNRESOLVED, so claim 7 as a whole is UNRESOLVED rather than CONFIRMED.

**Claims 1, 2, 3, 6 — mechanical clauses only:**

- **Claim 1**: case titles present verbatim — "restores a target two snapshots saved to the value the snapshot that saved it first recorded, whichever restoration started first" (`diff:632`), "removes a shared class attribute using the presence the earlier token save recorded" (`diff:577`), "preserves the save order of a value taken from a pending restoration" (`diff:674`). The precedence sentence appears identically in the class remark, the `#publish` comment, and `HostSnapshotInterface.restore`'s remark in `HostSnapshot.ts` (`diff:146-152`, `diff:311-315`) and in `types.ts` (`diff:430-436`) and the guide (`diff:85-89`). `"started first writes"` is absent from all three files (gates log grep, `gates.log.txt:77`). Mechanical clauses: met.
- **Claim 2**: the style-attribute sentence appears in the class remark, `HostSnapshotInterface.restore`'s remark, and the guide, each stating the first-save presence record and empty-list removal (`diff:69-76`, `diff:136-140`, `diff:419-429`). Mechanical clauses: met.
- **Claim 3**: TSDoc changed at `resolveOptions`'s `@throws` and `@remarks` (`diff:351-360`), test title "leaves an invalid overridden attribute unparsed and rejects it when the constructor leaves the key undefined" present (`diff:778`). Mechanical clauses: met.
- **Claim 6**: `CustomEvent<undefined>` absent from `types.ts` (gates log grep, `gates.log.txt:78`); TSDoc changed for all five event maps in the same diff hunks as their guide-cell edits (`diff:444-459`, `466-483`, `491-508`, `516-524`, `532-546`). Mechanical clauses: met.

## Mechanical checklist

| Item | Status | Evidence |
|---|---|---|
| Diff touches only the eight owned files, no shared/off-limits file | Met | `j-binder-precedence-status.txt:1-8` |
| No `any`/`as`/`!`/`@ts-`/`eslint-disable`/`public`/`protected`/`private`/parameter property in added lines | Met | Grep swept `j-binder-precedence.diff`; all hits are prose or `new` expressions, no violation |
| Every added interface property readonly (`CollapseVocabulary`, `stamp` fields) | Met | `diff:406-412` (`CollapseVocabulary`), `diff:176-178, 184-185` (`stamp` fields) |
| `readTag` and `CollapseVocabulary` § Surface rows equal their TSDoc summary | Met | `diff:9,17` vs. `diff:377-378,405` |
| Five event-map summaries say null detail in guide and TSDoc alike | Met | `diff:25-59` (guide), `diff:444-546` (types.ts) |
| `index.test.ts` asserts `readTag`, barrel exports it | Met | `diff:833` |
| `Button.ts` no longer carries the try/catch reading `tagName` | Met | `diff:106-121` |
| No unconditionally banned `writing.md` term in added prose | Met | Grep swept added lines; all hits are code (`new Map()`, `new HostSnapshot()`) or unrelated context lines |
| Report names thread id, journal path, refused `prove` call | Met | `report.md:3,179` |

## Referrals

None. No judgment question arose that the checker deferred; claim 7's incompleteness is an evidentiary gap (missing artifact), recorded as UNRESOLVED rather than referred.

VERDICT: FAIL none; outside the claims: none
