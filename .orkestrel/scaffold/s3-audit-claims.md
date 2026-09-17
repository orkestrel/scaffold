# Unit S3 audit — the claims under test

The subject is the uncommitted change in the `scaffold` checkout at
`C:\Users\mikes\WebstormProjects\scaffold`. Three units built it: S1 gave every generated config
factory an override, S2 closed the first audit round's findings, and S3 closed the second round's.
You are auditing the tree as it now stands, and the round-three items are where the value is.

Evidence:

- `tmp/audit/s3-diff.patch` — the complete diff against the last commit, all three units.
- `tmp/audit/s3-status.txt` — `git status --short` at dispatch.
- `.orkestrel/scaffold/s3-brief.md` — what S3 was asked to do, item by item.
- `.orkestrel/scaffold/s3-report.md` — S3's own account. A claim, never evidence.
- `.orkestrel/scaffold/s3-instruments/` — the scripts S3 ran, including one per recorded red.
- `.orkestrel/scaffold/s2-audit-objective-report.md` and `s2-audit-subjective-report.md` — the
  findings S3 exists to close.
- `.orkestrel/scaffold/s1-audit-verdict.md` — round one, and what was ruled out of scope.

Re-derive every number you rule on.

## The claims

Rule on each: `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence that decides it.

1. The emitted comment states a true discriminant: `UserConfig` declares `mode` but not `command`,
   and Vitest's invocation record carries both. Check it against the installed Vite declaration
   yourself, not against the report.
2. One override entry is installed at most once. A base repeating a plugin name keeps its second
   entry, and the override entry is not duplicated into both positions.
3. The merge comment states that every key other than `plugins` merges as `mergeConfig` merges it.
4. The emitted `assetsInlineLimit` comment carries the whole reason and nothing false, and the
   template-level comment no longer states a causal clause that contradicts it.
5. The hazard suite's comment matches the controls its cases actually carry. Where it says a case
   carries no control, verify that case genuinely asserts the value a bare merge produces, so there
   is no damage to contrast.
6. The factory-driven half of the replacement case asserts identity at the base's position, and that
   assertion refuses the rival reading that keeps the base entry.
7. The whole-output pinning case carries a control that must fail, and the control is drawn from
   outside the population the case covers.
8. Every red S3 records is re-produced by its retained script, and each mutation changes the subject
   rather than weakening the instrument. Read the scripts.
9. The relocation control perturbs a character inside the relocated showcase literal, and the
   perturbed capture has the same byte length as the baseline, so a length-only comparison would
   miss it.
10. `isNamedPlugin` is extracted, correct for every `PluginOption` shape, and its type predicate
    narrows soundly. `candidates` and `taken` replace the names that stated judgments.
11. The opaque-entry case asserts identity rather than deep equality.
12. No emitted wrapper's effective configuration changed across the whole three-unit change.
13. This repository's own `vite.config.ts` is byte-identical to what the generator emits, and was
    regenerated rather than hand-edited.
14. No vendored file changed, and `host.json` is unchanged after a build.
15. The added code carries no `any`, no `as`, no non-null assertion, and no suppression comment.

## Where to look hardest

Unprompted hazards. Rule on each as a finding if it is real.

- **`isNamedPlugin` narrows to `{ name: string }`.** State whether that predicate is sound for every
  `PluginOption` a caller can supply, including a plugin object whose `name` is not a string, and
  whether the narrowed type can mislead a later reader of the selection.
- **The base loop now short-circuits an unnamed base entry before searching.** State whether that
  changes any result compared with searching and finding nothing.
- **`taken` is consulted inside `findIndex`.** State whether the search's cost or its result depends
  on the order the base declares its entries, and whether a base and override that each repeat a
  name produce a defensible pairing.
- **S3 regenerated `vite.config.ts` from the generator.** State whether anything in that file can
  drift from the template without a test failing.
- **The retained red scripts restore the tree in a `finally` block.** Read them. State whether a
  script that dies between mutation and restore leaves the tree mutated, and whether any of them can
  remove a file it did not create.
- **The pinning case's control is drawn from a selection carrying no browser environment.** State
  what that control can and cannot discriminate, and whether the case's comment says so honestly.

## Out of scope

The release. No version bump and no publish is part of this change. The findings
`.orkestrel/scaffold/s1-audit-verdict.md` records as not carried stay not carried, and everything
under § What is settled in `.orkestrel/scaffold/s3-brief.md` stays settled.
