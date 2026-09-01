# Audit verdict — unit breaking-guide

Bench: Sol dark; both reviewer lanes on the writer's engine (Opus 5) in clean contexts, told so;
`checker` on Sonnet; `verifier` on Sonnet for the gates. Round 1 subject: commit `8eca8dc`
(`units/guide.diff`, `units/guide-report.md`).

## Round 1

| Claim | Objective lane | Subjective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows applied/refused/stopped | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name survives; contracts in `types.ts` | BROKEN: the retirement literal at `tests/src/core/helpers.test.ts:1797-1819` spells every old name; parity's SB direction already fails on a reintroduced export, so the literal is redundant coverage | — | CONFIRMED on the report's own carve-out | — | objective upheld: delete the literal; criterion 1 stands as written |
| 3 ruled forms landed | CONFIRMED (every ledger spelling verbatim; `extends` chain proved from a real pair) | SUBJECTIVE-PENDING | — | — | — |
| 4 no alias or shim | CONFIRMED (`export *` barrel; no `@deprecated`, no re-export) | SUBJECTIVE-PENDING | — | — | — |
| 5 guide rows, fences, examples; parity list; executed assertions | — | SUBJECTIVE-PENDING | CONFIRMED (no `INTERNAL` list; executed `@example` values quoted) | — | — |
| 6 only owned files | CONFIRMED, with `README.md` outside both lists; the edit was required (`missingSymbols` named at `:33,:133`) | — | CONFIRMED | — | `README.md` granted retroactively; every later brief owns the package README |
| 7 gates as reported | — | — | CONFIRMED on quoted codes | GREEN: every gate exit 0 (359 src, 111 policy, 46 config, 12 setup, 27 guides) | stands |
| 8 report hides no criterion failure | CONFIRMED (criterion 1's miss is disclosed with its reason) | — | — | — | stands |

Findings outside the claims (objective lane), with rulings:

- **F1** `Source.#members` unions every in-scope file that declares the name while
  `guides/guide.md:325` and `src/core/types.ts:216` describe one located declaration. Ruling:
  bound `#members` to the first declaring file (a head with a body or with bases), matching the
  prose and the prior semantic, and add the two-file case to `Source.test.ts` proving the bound.
- **F2** `matchesDeclaration` interpolates `name` into a `RegExp` unescaped and documents a total
  boolean contract it does not hold. Ruling: escape the name (reuse a declared `@orkestrel/*`
  escape helper if one exists; otherwise the one-line escape beside the regex) and add the
  metacharacter case to its `describe`.
- **F3** a bases-only empty head now counts as declared, narrowing the fallback to a same-named
  class. Recorded as a bound of the member-resolution capability for the next change, beside
  `Source.examples()` not following the chain.

Terminal lines so far: objective `FAIL 2`; checker `PASS`; verifier GREEN; subjective pending.
