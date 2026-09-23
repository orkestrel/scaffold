# B-FORMS-CONTROL, round 1 — `checker` on Sonnet

Subject: claims 6, 9, and 10 of `bfo-audit-claims.md`, read on the tree of `/home/user/veneer-bfo` on 2026-09-23. Read-only; the verdict text is the lane's handback verbatim.

## Checklist — mechanical conformance, claims 6, 9, 10 (B-FORMS-CONTROL, round 1)

### Claim 6 — The ledger and the guide's tables

Verdict: **UNRESOLVED**

Structural evidence CONFIRMS:
- `#### form-control` table present with every recorded selector, each `tokenized` except the two `.form-control` `-webkit-appearance`/`-moz-appearance` rows marked `dropped` — `/home/user/scaffold/.orkestrel/veneer/units/bfo.diff:471-514`.
- The two re-attributed rows (`.form-control.is-valid:focus` and `.form-control.is-invalid:focus` `box-shadow`) are struck from the `is-valid`/`is-invalid` validation tables (`bfo.diff:455,463`, removed with `-`) and appear only inside the new `form-control` table (`bfo.diff:513-514`).
- The four new `Excluded` rows sit beside the existing `::-webkit-file-upload-button` bare-pseudo row — `bfo.diff:426-430`.
- § Files row present: `guides/veneer.md` diff line, `bfo.diff:243`. § Tests link present: `bfo.diff:821` (`[the form control classes](../tests/src/styles/components/form-control.test.ts)`). § Compatibility row present at `/home/user/veneer-bfo/guides/veneer.md:3069`.
- `.form-control-color.is-*` rows are confirmed to remain under the validation keys — the diff shows no `-`/`+` pair moving those rows (only the two named box-shadow rows moved), matching the report's own account (`b-forms-control-report.md:170-173`).

Not independently checkable: the claim also requires "the ledger, deferral, and tag cases are green," which the report itself flags as "the writer's reading; run the Node readers" (`b-forms-control-report.md:108` region / claims file line 108). This checker is read-only and ran no command, so that portion of the claim rests solely on the writer's report. Per the Falsification law, a claim whose only evidence is the writer's own report is ruled UNRESOLVED rather than CONFIRMED, so the compound claim as a whole is UNRESOLVED pending an independent `verifier` run of `npm run test:setup` / `test:conformance` / `test:guides` (or the specific ledger/deferral/tag cases).

### Claim 9 — The guide prose

Verdict: **CONFIRMED**

- No banned substitution-table term found in the added prose (guide section, ROADMAP rows, TSDoc): swept `should|simply|easy|just|utilize|leverage|via|in order to|e.g.|i.e.|etc.|performant|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|master|slave` case-insensitively over `/home/user/scaffold/.orkestrel/veneer/units/bfo.diff` — no matches.
- No prose line exceeds 100 columns: swept `^\+.{101,}` over the diff; every match is a Markdown table row or a code/string/fixture literal (for example `bfo.diff:219-297` table rows, `bfo.diff:33,50,55,60,78,83,88` JS string literals), each exempt as data under `.claude/rules/writing.md` § Substitutions ("A literal code identifier is data, and so is a sample string inside a code fence or a test fixture"). The authored prose paragraphs under `### Form control classes` (`bfo.diff:305-377`) contain none of the matched lines.
- No count-of-a-growable-set violation found in the added prose (no numeral naming a set size such as rows, selectors, or cases).
- Code-token-then-noun pattern: several tokens in the ROADMAP rows and guide prose are followed by a verb rather than an immediate noun (for example "`.form-control-color` reads `--vn-space-24`" at `bfo.diff` ROADMAP block, and "`_validation.scss` and its proof"). This matches an already-landed, unchallenged convention in the same guide — `.container-sm reads --vn-container-sm` at `/home/user/veneer-bfo/guides/veneer.md:1384-1385` — so it is not a fresh violation this unit introduced; ruled consistent with established usage rather than BROKEN.
- The ROADMAP carrier rows each name one carrier: "B-FORMS-CLOSE rules on the binding..." and "B-FORMS-CONTROL at integration, after GROUP lands..." (`b-forms-control-report.md:281-282`).

### Claim 10 — The law holds and scope is honest

Verdict: **UNRESOLVED**

Structural evidence CONFIRMS:
- No `any`, no type-assertion `as X` (only `as const` at `bfo.diff:2148`, permitted), no `!` non-null assertion (swept `^\+.*[a-zA-Z0-9_\]\)]!(\.|\)|,|;|$)`, no match), no `@ts-ignore`/`@ts-nocheck`/`@ts-expect-error`/`eslint-disable` (swept, no match).
- No nested function declaration in the reviewed new source file `/home/user/veneer-bfo/app/browser/sections/FormControlSection.ts` (one class, one constructor, no nested declarations).
- `/home/user/scaffold/.orkestrel/veneer/units/bfo-status.txt` lists exactly the 17-file owned/anchor set named in `/home/user/veneer-bfo/tmp/units/b-forms-control-brief.md:197-205` (`src/styles/components/_form-control.scss`, `app/browser/sections/FormControlSection.ts`, `tests/app/browser/sections/FormControlSection.test.ts`, `tests/src/styles/components/form-control.test.ts` new; the rest modified-at-anchor) — nothing more, nothing less.
- `tmp/probe/` does not appear in the status output (absent, matching the report's claim that the probe was deleted after its reading, `b-forms-control-report.md:188`).
- `tests/src/styles/components/validation.test.ts` does not appear in the status output — untouched in the tree, consistent with its patch being returned report-only (`b-forms-control-report.md:229-275`) rather than applied.
- No off-limits file (`tests/setupServer.test.ts`, `tests/setupServer.ts`, `src/styles/components/_validation.scss`, `src/styles/elements/**`, `configs/**`, `package.json`) appears in the status output.

Not independently checkable: the claim's own closing sentence directs "Run `npm run check` and report its exit code as evidence here." This checker is read-only and ran no command; the only exit-code evidence on record is the writer's self-reported `0` (`b-forms-control-report.md:316`). Per the rule that a claim resting only on the writer's self-report is never ruled CONFIRMED, this claim is UNRESOLVED pending an independent `verifier` run of `npm run check` (and, for full "law holds across the whole diff" coverage, a scoped read of the remaining new/changed TypeScript files beyond the one sampled here).

### Findings outside claims 6, 9, 10

None found to the BROKEN standard.

VERDICT: FAIL 6, 10; outside the claims: none
