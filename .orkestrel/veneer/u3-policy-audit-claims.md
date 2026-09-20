# U3-policy audit — numbered claims (round 6, both lanes)

Subject: the cumulative U3-policy diff in the scaffold checkout `C:/Users/mikes/WebstormProjects/scaffold`
over `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `guides/scaffold.md`
(`tmp/audit/u3-policy-diff-6.patch`), made by `builder` (native Sonnet) across six briefs
(`.orkestrel/veneer/units/u3-policy-brief.md` through `-6.md`) with reports `u3-policy-report.md`
through `-6.md` and five objective reviews `u3-policy-review-report.md` through `-5.md` beside
them. `host.json` is restaged by the Orchestrator's `npm run build` and is not part of the diff.
Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence
(`file:line` or exact text). Read the diff and the live files, never the reports alone. These
files are vendored byte-identical into every fleet target by `host.json` and restored there by
`scaffold repair`, so judge every assertion by whether it holds in an arbitrary target. Law:
`AGENTS.md`, `.claude/rules/typescript.md`, `names.md`, `tests.md`, `writing.md`,
`documentation.md` under `C:/Users/mikes/WebstormProjects/scaffold`.

Readings the Orchestrator took on the host: the pattern's groups are `angled` and `bare`
(distinct); each of `](tokens.md)`, `](./tokens.md)`, `](tokens.md "T")`, `](<tokens.md>)`,
`](tokens.md#f)`, `](<tokens.md#f>)` captures `tokens`, `](<my guide.md>)` captures `my guide`,
and `](my guide.md)`, `](nested/t.md)`, `](https://x/y.md)`, `](../README.md)`, `](<t.md)`,
`](t.md>)` do not match; `test:policy` `117 passed`; `test:config` `173 passed | 1 skipped` after
the rebuild; with the round-5 files copied in, Roughnotes' policy project read `115 passed`.

1. **Mechanism.** `isPolicyStray` reports a top-level `guides/<name>.md` only when the name is
   neither the package's own, the index (`POLICY_GUIDE_MAP`), a name the index links, nor a
   catalog row; `isPolicyMirror`'s body is unchanged and decides by catalog membership alone; the
   violation message, the control-row membership strings, and the `guides/scaffold.md` sweep
   paragraph state the same four accountings and the ruling that an index link is the workspace's
   own claim to author the guide.
2. **Index reader.** `readPolicyIndex` strips fenced blocks and code spans through
   `stripPolicyCode` before matching, builds its global matcher locally from a non-global
   `POLICY_INDEX_LINK`, returns distinct names in first-link order, returns an empty list for an
   absent index, and reads the capture through `groups?.angled ?? groups?.bare`; its remarks name
   the fence limits and the span-pairing limit; `POLICY_INDEX_FILE` derives from
   `POLICY_GUIDE_MAP`.
3. **Pattern.** `POLICY_INDEX_LINK` names no capture group twice, uses no construct newer than
   ES2018, admits the bare, `./`, three title forms, angle-bracketed, fragment, and angled
   fragment forms with a space admitted only inside the angle brackets, rejects the nested,
   absolute, parent, unbalanced-angle, and spaced-bare forms, and cannot backtrack
   catastrophically; its description and remarks state exactly that accepted set.
4. **Controls.** The `rejects`, `accepts`, `sweeps`, fence, and code-span `PolicyControl` rows each
   discriminate (name for each the change that would redden it), and their membership strings name
   exactly the region each fixture writes.
5. **Portability.** No assertion in `tests/policy.test.ts` depends on a guide name, a package name,
   a directory tally, or an index shape particular to any checkout; the crafted-root case proves
   order and dedupe in a scratch root that leaks nothing.
6. **Law.** No `any`, type assertion, non-null assertion, `@ts-*`, `eslint-disable`, nested
   function declaration, or unexported module-scope helper; every new export has a one-sentence
   description in the file's voice; no banned term or count phrase in new prose (fixture strings
   quoting a banned term are data; a count that names its closed members is permitted).
7. **Shape and fit (subjective lane's weight).** The names `readPolicyIndex`, `POLICY_INDEX_FILE`,
   `POLICY_INDEX_LINK`, `angled`, `bare`, and the control labels read in the file's vocabulary; the
   remarks and the guide sentence are ones a maintainer can act on; the four-accounting rule is the
   right design for a fleet whose packages publish several faces, and the ruling on index-linked
   mirrors is coherent with `.claude/rules/documentation.md` on mirrors.
8. **Gates.** `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:config`,
   `test:guides` are green on the tree (the Orchestrator's readings above; the lanes are read-only).
