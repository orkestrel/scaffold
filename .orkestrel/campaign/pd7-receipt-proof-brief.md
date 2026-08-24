# Unit PD7 — the receipt proof, the no-follow boot writes, and the audit's prose fixes

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. The LAST probe writer; baseline 70f20fb, clean tree (verify). The findings come from
the PD6 report (`/home/user/scaffold/.orkestrel/campaign/pd6-report.md` § Deviations) and the
PD6 audit verdict (`/home/user/scaffold/tmp/codex/pd6-audit-last.md`) — read both first.

## Objectives

1. **The unrelated-control receipt proof** (PD6's deviation, exact patch). In
   `tests/src/server/Probe.test.ts`, add a case to the existing receipt pin whose CONTROL
   names a different candidate path and a different test path from the case's — genuinely
   unrelated broken code — asserting the returned verdict carries a defined `receipt`. Name
   the test for what it proves. Red-first: invert the receipt assertion (or de-issue the
   control) once, record the red, restore, record the green.
2. **No-follow boot mutations** (audit claim 1). `src/server/Probe.ts` near lines 312 and 341
   writes boot-dependency mutations with `writeFileSync(path, text, 'utf8')` after a separate
   containment walk — the default flag follows a final-component symlink swapped in between.
   Close it the way the creates are closed: write through a descriptor opened with
   `O_WRONLY | O_TRUNC | O_NOFOLLOW` (a centralized exported helper in `src/server/helpers.ts`
   per the architecture rules, directly tested). Pin it: a symlink planted at the mutation
   path makes the write refuse (record red against the current `writeFileSync` — the swap is
   silently followed — then green). Then make the guide's containment passage
   (`guides/probe.md` ~664-674) TRUE as written — if any residual opening remains after your
   change, name it exactly.
3. **The audit's prose prescriptions** (claim 4) in `guides/probe.md`: "Read the physical
   guarantee as covering" → "Read physical containment as covering"; reword the tallies at
   ~774 ("between two calls"), ~780 ("between two … candidate checks"), and ~626 ("The one
   control `prove` refuses") to name the relationship without a tally. Keep every sentence's
   meaning.
4. **The remark narrowing** (PD6's report-only finding). `src/server/stages/RuntimeStage.ts`
   ~90-92: replace the broad physical-containment sentence pair with the narrowed claim,
   consistent with what item 2 lands (state exactly what is closed and what stays open).
5. **The record correction** (claim 3): your report notes, for the record, that the PD6
   search inventory also matched `tests/setupPolicy.ts:184` — an irrelevant permitted match
   the report omitted.

## Scope

- Owned: `tests/src/server/Probe.test.ts`, `src/server/Probe.ts`, `src/server/helpers.ts`,
  `tests/src/server/helpers.test.ts`, `src/server/stages/RuntimeStage.ts` (the comment only),
  `guides/probe.md` (the named passages only).
- Off-limits: everything else. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxfmt/oxlint clean; `npm run check:src:server` green.
2. Every red-first pin recorded red then green; the receipt pin's existing cases green.
3. `npm run test:guides` green; the containment passage true against the landed code.
4. `npx vitest run --project src:server tests/src/server/Probe.test.ts tests/src/server/helpers.test.ts` green.

## Output

Final message = report: per-item landings with file:line, red/green records, the containment
passage's final claim, gate tails, `git diff --stat`, `git status --porcelain`, deviations or
none.
