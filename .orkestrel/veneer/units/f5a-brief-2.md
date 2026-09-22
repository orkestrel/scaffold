# Unit F5a ACCOUNTING-SPLIT — brief 2, the Orchestrator's close-out

Supersedes nothing in `f5a-brief.md`; that brief ran to completion on `opus` and its report is
`f5a-report.md`. This successor carries the audit round's findings the Orchestrator lands itself
on a small precise surface, per the user's routing ruling of 2026-09-22 (`decisions-round-2.md`).
The auditor of this part is the engine that did not write it: the objective lane's readings are
already on record, and the landing gates re-run in full.

## Role and engine

The Orchestrator on Opus 5, in the Veneer checkout, after the reviewer lane returns and before the
landing commit. The instrument is `f5a-fix.py` (retained beside this brief), run from
`/home/user/veneer`, then `oxfmt --write` over the touched files, the scoped gates, and the full
chain as `f5a-gates-2.sh`.

## Findings carried, with provenance

- **Analyst claim 8 (code).** `SPECIFIER_READINGS` was an exported mutable module-scope array, so
  `Object.freeze(SPECIFIER_READINGS)` broke `extractSpecifiers`. Fix: `SpecifierReader`, a class
  holding `#readings` and a `#visitor` whose handlers are arrow callbacks passed directly to
  `new Visitor(...)`; `read(text)` returns a fresh list and leaves the field empty;
  `extractSpecifiers(text)` reads on a reader of its own. The proof replaces the drain case with one
  that pins each reading as its own and `Object.keys(reader)` as empty; the inventory case lists
  `SpecifierReader` in place of the two module-scope names.
- **Analyst claim 11 (code).** `tailwind` was a signature no installed distribution measured. Fix:
  removed from `FORBIDDEN_SIGNATURES`; the doc names the measured members and points Tailwind's
  guard at the specifier pass over `tailwindcss` and `@tailwindcss/`.
- **Analyst claim 15(a) (proof).** The refusal branch of `scanPositional` was unproven. The
  Orchestrator's host probe (`f5a-namespace-probe.mjs`, `f5a-namespace-probe.log.txt`) shows a
  namespaced rule's `selectorText` makes `Element.matches` throw on Chromium 141. Fix: the case
  "refuses a rule whose selector the engine cannot read, rather than passing its tag" in
  `tests/src/styles/index.test.ts` plants `@namespace audit url("urn:audit"); @layer elements { audit|p { margin: 0 } }`
  and expects the refusal; the doc paragraph that recorded the gap now names the proof.
- **Analyst claim 12 (prose).** The guide and the `MANDATED_TAG_PAIRS` doc said a mandated
  descendant "has no other legal parent" while the table lists `li` under `ol` and `ul`. Fix: both
  say the descendant is legal only under the parents the table lists for it.
- **Analyst claim 16 (prose).** "across the three" in the guide and the reader's doc. Fix: "across
  those placements". The unit's report keeps its tallies as the verbatim record of what it
  returned.
- **Reviewer claim 8 (code).** The reviewer preferred reverting to the call-local array; the class
  shape satisfies its objections too (no module state, `extractSpecifiers` stays a pure leaf, one
  drain) and the analyst's, so the class lands. The reviewer's point that a pre-visit drain is
  unbindable holds: the per-call reader has none.
- **Reviewer claim 15(a) (proof, doc).** The guard's recorded justification over-claimed: without
  it `matches` throws the engine's message anyway. The doc now claims what the guard does (a named
  refusal before any tag is mounted) and the namespaced-rule case proves it; the `CSSStyleRule`
  signature stays, because the probe shows the branch is drivable from a real rule.
- **Reviewer claim 17 (code).** `scanPositional` → `scanPositionalPairs` at every site.
- **Reviewer F1 (proof).** The mandated exclusion had no proof: a `details summary` plant runs with
  the table and without it in `tests/setupBrowser.test.ts`.
- **Reviewer F2 (code).** The `outer === inner` skip hid same-tag rules such as `li + li`: removed,
  with a plant that reads `li + li`; the doc and the guide say each tag is mounted inside and after
  each tag, itself included.
- **Reviewer F3 and the analyst's referral (code).** The signature pass was a raw substring test:
  `matchesSignature` matches a whole word, with its own case; the doc calls the members text
  markers matched anywhere in the entry.
- **Reviewer F4 (doc; carried).** The tag column of `ELEMENT_TAGS` is bound to nothing: the doc says
  so; binding it to the compiled cascade's tag population is carried to F5b's ledger readers.
- **Reviewer claim 12 nits (prose).** The engine "answers the question" rather than "rules on
  this"; the causal "so" is cut.
- **Reviewer claim 16 nit (prose).** The conformance case title names no tally.
- **Reviewer referrals recorded, no change:** `tests/conformance.test.ts` assumes `dist/` was built,
  as the presence cases already do; the reader's mount cost stays an observation (F5b measures the
  compile, not this); `ROADMAP.md` row on `matchesLooseTagPair` closes in the D11 fold.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the `SpecifierReader` case and inventory row present.
3. `npm run test:src:styles` exits 0 with the refusal case present.
4. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
5. The full chain (`f5a-gates-2.log.txt`) exits 0 in every project.
6. `grep -rn 'SPECIFIER_READINGS\|SPECIFIER_VISITOR\|scanPositional\b' tests src guides` prints nothing.
