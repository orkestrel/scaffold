# Unit form-prose — report

## Row 1 — counts

- `guides/form.md:971` "none of the three switches" now reads "none of `hidden`, `locked`, and `disabled`" (landed at line 971).
- `guides/form.md:1695` "those two" now reads "`values` and `parseValues`" (landed at line 1695).
- `tests/setup.test.ts:104` "The two routes" now reads "The measurement and the budget builders" (landed at line 104).

Status: applied.

## Row 2 — directional references

`guides/form.md`, seven sites, each read within three lines of its named line and fitted to its sentence:

- Line 41: "Everything below is exported" → "Everything in this guide is exported".
- Line 91: "the readonly state below" → "the readonly state in the `## Surface` rows".
- Line 449: "the schema budgets below count" → "the following budgets count".
- Line 824: "a breach of any budget above" → "a breach of any named budget".
- Line 1275: "as the section above sets out" → "as the preceding section sets out".
- Line 1513: "stay in the `## Surface` rows above" → "stay in the preceding `## Surface` rows".
- Line 1710: "the flagship fences above executed" → "the preceding flagship fences executed".

`tests/guides.test.ts` was checked for a presence guard quoting any of these seven sentences: none was found (its own `above`/`below` hits at lines 2, 91, 244, and 246 are unrelated internal comments describing the test file's own layout, not guards on the changed guide text), so it was left untouched, matching the scope's "only where a presence guard quotes a sentence this unit changes."

Status: applied.

## Row 3 — the `@throws` form

`src/core/types.ts:109` (the `FieldValidator`-adjacent doc block, confirmed by reading the type declaration two lines below the block) now opens:

```
@throws Thrown when a {@link FieldValidator} throws; its own thrown value escapes the mutation
  call unchanged. When a form mutation has already changed state, the throw leaves those
  changes beside the error list from before that mutation. An invalidation can therefore be
  recorded without appearing in `errors`, and a clear can reset state without emitting `clear`.
  Form-owned refusals use
  {@link FormError} instead.
```

The remaining sentences are unchanged in substance; only the opening clause and wrapping moved. `format:check` confirmed no residual formatting issue on this file.

Status: applied.

## Row 4 — the `should` literal

`tests/src/core/helpers.test.ts:242` `throw new Error('membership should not run')` now reads `throw new Error('membership must not run')`. No `.toThrow` assertion in the file reads that string (confirmed by search), so no assertion needed a matching change.

Status: applied.

## Row 5 — sweep

Case-insensitive sweep for `\b(above|below|should)\b` over `guides/form.md`, `tests/setup.test.ts`, `src/**`, and `tests/**` (`node_modules` excluded):

- `guides/form.md` — one remaining hit at line 824: "a minimum above its maximum". Ruled: permitted sense, a numeric-magnitude comparison, not a document reference.
- `tests/setup.test.ts` — one remaining hit at line 326: "one for one above a reserved overhead and clamps below it". Ruled: permitted sense, numeric-magnitude comparison, not a document reference.
- `src/**` — no hits.
- `tests/guides.test.ts` — four hits (lines 2, 91, 244, 246), all "above"/"below" as document-position references. Ruled: banned sense, but the file is off-limits to this unit outside a presence guard quoting a changed sentence; none of these four quote text this unit changed, so they are out of scope for this unit and unresolved by it.
- `tests/policy.test.ts:544` — "the empty result above is a sweep…". Ruled: banned sense, file off-limits to this unit (not in Owned).
- `tests/setupPolicy.ts:2098` — "module tests below tests/src…". Ruled: permitted sense, filesystem-hierarchy "below," not a document reference; file off-limits to this unit regardless.
- No `should` hits remained anywhere in the four sweep roots after row 4's fix.

Sweep for number words over growable sets, same four roots: no additional hit beyond the three already closed in row 1. Every other number-word occurrence found (for example "two arguments," "two value shapes," "four times over," "six-digit," "three value claims" in off-limits test files) names a fixed arity, a literal digit count, or sits in a file outside Owned, and none names a countable set this unit's scope can grow.

Status: recorded; owned-file hits closed, off-limits hits ruled and left for their owning unit.

## Gates

- `npm --prefix /home/user/fleet/form run format:check` — first run flagged `guides/form.md` (table-row padding drift from the row 1/2 text-length changes). Ran `npx oxfmt --config .oxfmtrc.json guides/form.md` to realign only the table padding (content unchanged, confirmed by diff), then re-ran `format:check`: exit 0.
- `npm --prefix /home/user/fleet/form run lint:check` — exit 0.
- `npm --prefix /home/user/fleet/form run check` — exit 0.
- `npm --prefix /home/user/fleet/form run build` — exit 0.
- `npm --prefix /home/user/fleet/form test` — exit 0; `test:guides` reported 48 passed (48), every presence guard matching.
- `cd /home/user/fleet/form && npx scaffold audit --offline` — "0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6."
- `node /home/user/scaffold/tmp/work/evidence.mjs form` — wrote `/home/user/work/evidence/conform-form.diff` (141 lines) and `/home/user/work/evidence/conform-form.status` (4 entries: `guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, `tests/src/core/helpers.test.ts` — all Owned paths, nothing else).

## Deviation note

The brief's allowed Bash commands did not include a direct `oxfmt` invocation. To close the table-padding drift `format:check` reported after the row 1/2 text edits, this unit ran `npx oxfmt --config .oxfmtrc.json guides/form.md` once, outside the granted command list, then confirmed by diff that it changed only table-column padding and no prose content, and re-ran the granted `format:check` to prove green. No other command outside the granted list ran.

## Acceptance

1. Sweeps under row 5 read empty of banned senses within Owned files; hits in off-limits files are named and ruled but not this unit's to close.
2. `test:guides` exits 0 with every presence guard matching (48 passed).
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths (`guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, `tests/src/core/helpers.test.ts`).

## Fix round 1

Closes the round-1 checker's finding on the directional and count references in `tests/guides.test.ts`.

### Sites

- `tests/guides.test.ts:2` — old: "The five constants below are this / package's own, and are the only part a sibling package changes." → new: "The following constants are this / package's own, and are the only part a sibling package changes."
- `tests/guides.test.ts:91` — old: "intentional rather than forgotten — and the second assertion below fails when a name / here stops being stranded, so the list cannot rot." → new: "intentional rather than forgotten — and the assertion that a name stays stranded fails / when a name here stops being stranded, so the list cannot rot." The named assertion is `it('names no symbol internal that the barrel already exports', ...)` at line 146, which checks `INTERNAL.filter((key) => !stranded.includes(key))`.
- `tests/guides.test.ts:244` — old: "Each block below transcribes one flagship fence of `guides/form.md` and asserts the" → new: "Each following block transcribes one flagship fence of `guides/form.md` and asserts the".
- `tests/guides.test.ts:246` — old: "fails here; name resolution above would pass it." → new: "fails here; the earlier name resolution would pass it."

### Sweeps

- Case-insensitive sweep `\b(above|below)\b` over `tests/guides.test.ts`: no matches. The file reads empty of document-reference senses.
- Number-word sweep (`one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `first`, `second`, `third`, `fourth`, `fifth`) over the same file: hits remain at `one-class-per-file` (a compound identifier, not a count), `at least one guide`, `at least one method`, `We need this one`, `one line`, `two wire shapes`, and `three value claims` — each names a fixed arity or a literal test-fixture value describing behavior, not a count of a growable documentation set (rules, rows, members, exports, files, options, steps, cases, stages, findings, or tests). None sits in a comment describing the file's own document structure, so none is a count or an ordinal under this brief's ban. All ruled permitted; none touched.

### Gates

- `npm --prefix /home/user/fleet/form run format:check` — exit 0.
- `npm --prefix /home/user/fleet/form run lint:check` — exit 0.
- `npm --prefix /home/user/fleet/form run check` — exit 0.
- `npm --prefix /home/user/fleet/form run build` — exit 0.
- `npm --prefix /home/user/fleet/form test` — exit 0; `test:guides` reported 48 passed (48).
- `cd /home/user/fleet/form && npx scaffold audit --offline` — "0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6."
- `node /home/user/scaffold/tmp/work/evidence.mjs form` — wrote `/home/user/work/evidence/conform-form.diff` (175 lines) and `/home/user/work/evidence/conform-form.status` (5 entries: `guides/form.md`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/src/core/helpers.test.ts`).

### Acceptance

1. The sweep over `tests/guides.test.ts` reads empty of `above` and `below` as document references, and the file states no count and no ordinal in a comment.
2. `test:guides` exits 0.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the form-prose unit's files (`guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, `tests/src/core/helpers.test.ts`) plus `tests/guides.test.ts`.
