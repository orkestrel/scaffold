<!-- CL2 scope read, checker on native Sonnet (clean context, read-only), brief units/cl2-scope-read-brief.md over units/cl2-brief.md and the Veneer tree at 00a5bdc, 2026-09-21. Verdict: amend (the breakpoint mixins do not exist); carried by units/cl2-brief-2.md. -->

## Item 1 — path/symbol resolution and line accuracy

| Path/symbol | Resolves | Line accuracy |
|---|---|---|
| `--vn-size-1..-8` in `_tokens.scss` | yes | Exact: lines 208-215 |
| `--vn-space-1..-8` in `_tokens.scss` | yes | Exact: lines 222-229 |
| `--vn-breakpoint-xs..-xxl` in `_tokens.scss` | yes | Exact: lines 275-280 |
| `--bs-breakpoint-*` aliases in `_tokens.scss` | yes | Exact: lines 367-372 |
| `reset` layer declaration | yes | Exact: `_tokens.scss:3` |
| State mixer/hover/active in `_mixins.scss` | yes | Exact: lines 83-85, inside `theme-tokens` |
| `breakpoint-up` and `breakpoint-down` mixins in `_mixins.scss` | **no** | Neither exists anywhere in `src/styles/_mixins.scss` (`_mixins.scss` grep, whole-file read: 1-162 lines, no `breakpoint` token). The brief's Context (line 39) instructs "find `breakpoint-up` and `breakpoint-down`" as though both exist for lookup; only `breakpoint-down` is named, and only as a not-yet-declared row in the guide's `### Deferred names` table (`guides/veneer.md:660`), not as code. |
| `TOKEN_NAMES` registry, grouped leaves, in `src/core/types.ts`/`constants.ts` | yes | `types.ts:13` (`TokenMap`), `constants.ts:16-270` (grouped `Object.freeze` tree) |
| `tests/src/core/index.test.ts` export set/freeze/path-law assertions | yes | Export set: lines 19, 29; freeze: lines 31-36; path law: lines 37-45 |
| `tests/src/styles/tokens.test.ts` bidirectional equality | yes | Line 41 (and 49-51 for the RTL cascade) |
| `tests/src/styles/mixins.test.ts` + fixture `mixins.scss` | yes, both resolve | Whole files read, present as named |
| `tests/setupStyles.ts` readers, `BREAKPOINT_CASES` | yes | `BREAKPOINT_CASES` at lines 6-13 |
| `guides/veneer.md` § Tokens `### Reference map` | yes | Exact: line 318 |
| `guides/veneer.md` `### Deferred names` table | yes | Line 652 (not "about" — exact), `breakpoint-down` row at line 660 |

## Item 2 — Context factual claims against the live tree

| Claim | Holds | Evidence |
|---|---|---|
| Ramps' values and index law | yes | `_tokens.scss:208-229` |
| `reset` layer declared | yes | `_tokens.scss:3` |
| Mixin names (state mixer, percentages) | yes | `_mixins.scss:83-85` |
| Registry's grouped shape | yes | `constants.ts:16-270` |
| Bidirectional equality assertion | yes | `tokens.test.ts:41-54` |
| Guide's row shape with value and source | yes, incomplete | The reference-map table actually carries `Token \| Value \| Source \| Alias` (`guides/veneer.md:344-349`), a superset of "value and source." Not a contradiction. |
| "the breakpoint mixins in `_mixins.scss`" (implying both are present to find) | **contradicted** | Neither `breakpoint-up` nor `breakpoint-down` exists in `_mixins.scss`; both are new work this unit must author, not locate. |

## Item 3 — scope by falsified assertions

| Execution item | Assertion it would falsify | File | Granted by Scope |
|---|---|---|---|
| 1 (new tokens) | `tokens.test.ts` bidirectional equality (`tokens.test.ts:41`) | `tests/src/styles/tokens.test.ts` | yes (Owned) |
| 1 (registry growth) | `index.test.ts` export-set/path-law assertions (`index.test.ts:19,29,37-45`) | `tests/src/core/index.test.ts` | yes (Owned, "only its enumerating assertion") |
| new export from a media-condition reader | `setupStyles.test.ts` export inventory (`setupStyles.test.ts:55-106`) | `tests/setupStyles.test.ts` | yes (Owned, "only for a media-condition reader and its export inventory") |
| 3 (new guide rows) | `test:guides` parity (`tests/guides.test.ts`) and the prose sweep (`tests/setupPolicy.ts`) | `guides/veneer.md` (guide side only; both proof files are off-limits/vendored) | Guide row itself yes; the two proof files are not owned and need none, since they read the guide generically |
| 3 (deleted `breakpoint-down` deferred-name row) | none found — no reader of the `### Deferred names` table (under § Tokens) exists anywhere in `tests/**` (swept `readDeferrals` in `tests/setupConformance.ts:527`, which reads the unrelated "Styles / Deferred selectors" subsection, `setupConformance.ts:522,538,570`, not `### Deferred names`) | none | n/a |
| breakpoint mixin proof | `mixins.test.ts` (Owned) and `mixins.scss` fixture (Owned) | both | yes |

Swept `tests/**`, `tests/fixtures/**` (no such directory; fixtures sit under `tests/src/styles/fixtures/**`, checked), `guides/veneer.md`, `src/core/**`, `package.json`, `configs/**`. `package.json` and `configs/**`: none found — no script or config the brief's items would falsify. `src/core/**` beyond `types.ts`/`constants.ts`/the index test: none found.

No ungranted file found; every file an execution item would falsify sits in Scope's Owned list, or no reader exists at all.

## Item 4 — vendored/off-limits owned files

None found. The brief's Owned list contains no vendored file. `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` all exist in the live tree (confirmed present) and are absent from Owned, correctly left to the brief's own Off-limits/"everything else" catch-all.

Verdict: amend — item 1 and item 2 both find the brief's Context and readings claiming `breakpoint-up` and `breakpoint-down` are locatable mixins in `src/styles/_mixins.scss` when neither exists; the writer needs the brief corrected to state that both mixins are new work this unit authors (the guide's own `### Deferred names` row already shows only `breakpoint-down` was ever tracked as pending, and even that names no code site), not a lookup against existing code.
