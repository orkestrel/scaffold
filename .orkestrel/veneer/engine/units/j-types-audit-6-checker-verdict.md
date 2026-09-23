# J-TYPES audit round 6 — the checker's verdict (returned 2026-09-23 by `checker` on Sonnet, native subagent, 21 tool uses, 143 s; retained from the subagent's return text)

**Role and lane:** `checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only.

## Verdicts on numbered claims

**Claim 4 (E22/F3 and E26 B3 — key renames and probe).** CONFIRMED. `TooltipOptions.descendants?: string` carries the exact sentence "Delegates the tooltip to descendants of the host matching this selector, mirroring Bootstrap's `selector` option." (`j-types-7.diff:787`); `TooltipAttributeMap.descendants` defaults `data-bs-selector` (`j-types-7.diff:779-780`); `CarouselAttributeMap.step` defaults `data-bs-slide` (`j-types-7.diff:881-884`) while `CarouselClassMap.slide` is untouched by the diff (stays). The Orchestrator's own independent run `j-types-gates-6.log.txt:56-72`, using probe `j-types-probe-6.ts`, shows the refusal set (`link` on `ScrollSpyOptions`, `selector` on `TooltipOptions`, `classes` on `ScrollLockOptions`, `attributes:{slide}` on `CarouselOptions`) each producing exactly one diagnostic (`probe exit=2`, four `error TS...` lines, one per refusal), and the acceptance set (`parent`, `descendants`, `OffcanvasOptions.classes.fade`, `attributes.step`) producing no diagnostic beyond those four. This is independent evidence, not the report's self-quote.

**Claim 8 (scope, parity, gates, E6).** CONFIRMED. Status (`j-types-7-status.txt`) lists exactly `guides/veneer.md` and `src/browser/types.ts`. The guide's § Surface table holds 149 rows; 130 correspond 1:1 to every `export interface|type|class|const|function` line of `src/browser/types.ts` (verified name-for-name against the grep list), and 19 more are core/browser-implementation exports outside `types.ts` (`TOKEN_NAMES`, `Button`, etc.) — no extra or missing row for a `types.ts` export, and no row for `ScrollLockClassMap` (`grep -n "ScrollLockClassMap" guides/veneer.md` → no matches). The named grep of forbidden fixed-token/old-name patterns against `src/browser/types.ts` returns no hit. Gates in the Orchestrator's own `j-types-gates-6.log.txt`: `build:src:browser exit=0`, `check:src:browser exit=0`, `oxlint exit=0`, `oxfmt exit=0`, `test:guides` 19/19, `test:policy` 109 passed/1 skipped — all independently run, not report-quoted. Added property lines (`j-types-7.diff:676,742,780,789,884`) are all `readonly`; no added line carries `any`, a code `as` cast (the only " as " hits are English prose inside TSDoc/Markdown, not the TypeScript operator), `!`, `@ts-`, `eslint-disable`, `null`, `public`/`protected`/`private`, or `import`. No new or moved file (status shows only two `M` lines). `selector?:` on `TooltipOptions`, `link` on `ScrollSpySelectorMap`, `slide` on `CarouselAttributeMap`, and `ScrollLockClassMap` are all absent from `types.ts` — confirmed by the same grep.

## Mechanical checklist

| Item | Status | Evidence |
|---|---|---|
| Diff touches only owned files | Met | `j-types-7-status.txt:1-2` — `guides/veneer.md`, `src/browser/types.ts` only |
| No `any`/`as `/`!`/`@ts-`/`eslint-disable`/`null`/access modifiers/`import` in added lines | Met | Targeted greps above; only false-positive prose "as" in Markdown/TSDoc |
| Every added property `readonly` | Met | `j-types-7.diff:676,742,780,789,884` |
| Forbidden-term grep (`ScrollLockClassMap`, `the \`show\` class`, etc.) on `types.ts` | Met | Grep returned no matches |
| Guide § Surface row parity, no `ScrollLockClassMap` row | Met | 149 rows = 130 `types.ts` exports + 19 non-`types.ts` exports; name-for-name match; no `ScrollLockClassMap` row |
| Changed Summary cells equal description paragraphs | Met | Spot-checked every changed pair in the diff (`BackdropClassMap`, `PlacementSide`, event maps, `ScrollSpySelectorMap.parent`, `TooltipOptions.descendants`, `CarouselAttributeMap.step`, etc.) — identical text |
| Every map-key TSDoc carries "Default:", `OffcanvasClassMap.fade` included | Met | `j-types-7.diff:741-742` — "Default: `fade`." |
| Every added summary opens with third-person `-s` verb, no self-naming | Met | "Names", "Maps", "Configures", "Selects", "Marks", "Reads", "Measures", "Removes" — none names its own symbol |
| No banned `writing.md` substitution term in added prose | Met | Targeted grep for the banned-term set returned no hit |
| No new or moved file | Met | Status shows two `M` lines only |
| Each report ruling names a bounding rule | Met | `j-types-report-6.md` § Rulings table, right column names the rule for each row |
| Round-7 `popper` ruling recorded in `j-types-report-7.md` | Met | `j-types-report-7.md:138-140`, "The Orchestrator's ruling on the deviation" |

## Referrals

None. Every item resolved on file or grep evidence; no judgment call was required.

FAILED CLAIMS: NONE
