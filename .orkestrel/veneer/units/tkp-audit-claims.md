# TOKEN-PROOFS audit — claims

Subject: TOKEN-PROOFS in `/home/user/veneer-tkp` (branch `unit/tkp`, uncommitted over Veneer `2376710`), briefed by
`token-proofs-brief.md` to carry the tenet audit's claim 6 and F-STACK-ROW (`tenets-styles/tenets-styles-audit-verdict.md`,
`tenets-styles/tenets-styles-tokens-verdict.md`). Written by `opus` on Opus 5.5 and reported in `token-proofs-report.md`.
Evidence: `tkp.diff` (`git diff 2376710`), `tkp-status.txt`, and `tkp-instruments/` (the plant driver `tkp-plant.py`
and the logs). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is not a claim
subject. A mutation counts as a kill only when the failing case's message names an assertion failure. Rule every claim.

1. **Coverage.** `describe('ancestor token overrides')` in `tests/src/styles/tokens.test.ts` holds a case for each of
   `--vn-link-base`, `--vn-link-hover-base`, `--vn-link-decoration`, `--vn-form-valid`, `--vn-form-invalid`,
   `--vn-state-hover`, `--vn-state-active`, `--vn-state-mixer`, `--vn-button-opacity`, `--vn-weight-heading`, and
   `--vn-ease-standard`. Each case sets the token on an ancestor of a shipped class or tag consumer, reads the
   consumer's resolved property, and reads a twin consumer outside the override.
2. **Each proof reads the consumer, not the token.** Each case's inside assertion reads a property of a shipped rule's
   element (a colour, a decoration, a weight, an opacity, a timing function), and none of them passes when the shipped
   rule stops reading the token: each plant in `tkp-instruments/logs/tkp-plant-*.log.txt` writes that consumer's
   declaration as a literal equal to its resolved rest value, and the case fails with an assertion at the inside
   reading while the twin's reading holds. Each plant is restored byte-identically.
3. **The form cases' mode-scope ancestor is correct and stated.** The `--vn-form-valid` and `--vn-form-invalid` cases
   set the token on a `data-bs-theme` ancestor rather than a plain one, because the `--bs-form-*` aliases the
   validation rules read are declared at `:root` and each mode scope and resolve there; the case comment says so, and
   the claim that a plain ancestor moves nothing holds (the report's reading under Unknowns).
4. **Real input.** The hover, press, and disabled cases drive the state with the harness's trusted pointer
   (`hoverAccessible`, `holdAccessible`) or the real `disabled` attribute, with motion reduced through `stageMedia`,
   and the block releases the pointer and the media after each case.
5. **The stacking rows.** § Tokens holds one row for `--vn-stack-popover`, `-hint`, and `-toast`, whose Alias cell
   names `--bs-popover-zindex`, `--bs-tooltip-zindex`, and `--bs-toast-zindex`, and the reference-map value case and
   `test:guides` pass over it.
6. **Gates.** `npm run check`, `npm run lint:check`, the tokens file, `npm run test:guides`, and `npm run test:policy`
   exit 0 in `tkp-instruments/logs/`, the first policy run's red being a 5000 ms timeout at a load near 20 on 4 CPUs;
   the whole styles project reads `Tests 1516 passed (1516)`.
7. **Scope and law.** The diff changes only `tests/src/styles/tokens.test.ts` and `guides/veneer.md`; it adds no
   `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, hidden helper, mock, or
   fake; every literal it asserts is a reading, not a recalled value; each case title states what the case proves.
