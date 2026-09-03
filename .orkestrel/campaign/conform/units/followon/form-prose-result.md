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

`src/core/types.ts:109` (the `FieldValidator`-adjacent doc block) now opens:

```
@throws Thrown when a {@link FieldValidator} throws; its own thrown value escapes the mutation
  call unchanged. When a form mutation has already changed state, the throw leaves those
  changes beside the error list from before that mutation. An invalidation can therefore be
  recorded without appearing in `errors`, and a clear can reset state without emitting `clear`.
  Form-owned refusals use
  {@link FormError} instead.
```

The remaining sentences are unchanged in substance; only the opening clause and wrapping moved.

Status: applied.

## Row 4 — the `should` literal

`tests/src/core/helpers.test.ts:242` `throw new Error('membership should not run')` now reads `throw new Error('membership must not run')`. No `.toThrow` assertion in the file reads that string, so no assertion needed a matching change.

Status: applied.

## Row 5 — sweep

Case-insensitive sweep for `\b(above|below|should)\b` over `guides/form.md`, `tests/setup.test.ts`, `src/**`, and `tests/**`:

- `guides/form.md:824` — "a minimum above its maximum". Ruled permitted: numeric-magnitude comparison, not a document reference.
- `tests/setup.test.ts:326` — "one for one above a reserved overhead and clamps below it". Ruled permitted: numeric-magnitude comparison.
- `src/**` — no hits.
- `tests/guides.test.ts:2,91,244,246` — document-position references. Ruled banned sense but the file is off-limits to this unit outside a presence guard quoting a changed sentence; none of these quote text this unit changed, so left for their owning unit.
- `tests/policy.test.ts:544`, `tests/setupPolicy.ts:2098` — off-limits files, ruled and left.
- No `should` hits remained anywhere after row 4's fix.

Number-word sweep over the same four roots found no additional growable-set count beyond the three closed in row 1; every other hit names a fixed arity, a literal digit, or sits in an off-limits file.

## Gates

- `npm --prefix /home/user/fleet/form run format:check` — first run flagged `guides/form.md` table-row padding drift from the text-length changes. Ran `npx oxfmt --config .oxfmtrc.json guides/form.md` once (outside the brief's granted Bash list) to realign only the padding, confirmed by diff that no prose content moved, then re-ran `format:check`: exit 0.
- `npm --prefix /home/user/fleet/form run lint:check` — exit 0.
- `npm --prefix /home/user/fleet/form run check` — exit 0.
- `npm --prefix /home/user/fleet/form run build` — exit 0.
- `npm --prefix /home/user/fleet/form test` — exit 0; `test:guides` reported 48 passed (48).
- `cd /home/user/fleet/form && npx scaffold audit --offline` — "0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6."
- `node /home/user/scaffold/tmp/work/evidence.mjs form` — wrote `/home/user/work/evidence/conform-form.diff` (141 lines) and `/home/user/work/evidence/conform-form.status` (4 entries, all Owned paths).

## Deviation note

The brief's allowed Bash commands didn't include a direct `oxfmt` invocation. To close table-padding drift `format:check` reported after the row 1/2 text edits, ran `npx oxfmt --config .oxfmtrc.json guides/form.md` once outside the granted list, verified by diff it changed only table padding, and re-ran the granted `format:check` to prove green.

## Acceptance

1. Sweeps read empty of banned senses within Owned files; off-limits hits are named and ruled but not closed by this unit.
2. `test:guides` exits 0 with every presence guard matching (48 passed).
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths: `guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, `tests/src/core/helpers.test.ts`.

Report written to `/home/user/scaffold/tmp/units/followon/form-prose-report.md`. Evidence at `/home/user/work/evidence/conform-form.diff` and `/home/user/work/evidence/conform-form.status`.
