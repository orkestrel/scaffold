# Unit S1 audit — the claims under test

The subject is the uncommitted change in the `scaffold` checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, written by a single implementation unit against the
brief at `.orkestrel/scaffold/s1-brief.md`. The unit's own report is at
`.orkestrel/scaffold/s1-report-2.md`. The report is the unit's claim, not evidence.

Evidence supplied with this brief:

- `tmp/audit/s1-diff.patch` — the complete diff of the change.
- `tmp/audit/s1-status.txt` — `git status --short` at dispatch.
- The working tree itself, which carries the change.

Read the diff and the tree. Do not trust the report's numbers; re-derive any you rule on.

## The claims

Rule on every claim. Each verdict is `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence
that decides it — a path and line, a command and its output, or the exact text that falsifies it.

1. Every generated config factory accepts `override?: UserConfig` and returns its declared base
   merged with that override through `mergeOverride`.
2. `applicationBrowser` exists nowhere in the generator, in any generated output, or in this
   repository's own configuration, except in an assertion that it is absent.
3. `appShowcase` composes on `appBrowser` and restates nothing `appBrowser` already declares,
   beyond the output boundary, the showcase plugins, and the build options a showcase changes.
4. `mergeOverride` refuses a value carrying `command`, so the Vitest project invocation record
   `{ command, mode, isPreview, isSsrBuild }` cannot reach a returned project configuration.
5. `mergeOverride` selects one plugin per name after merging, keeping each name's first position
   and last value, so an override carrying a plugin the base declares does not duplicate it, and a
   showcase's output boundary replaces the browser's in place rather than sitting beside it.
6. No generated `configs/` wrapper calls `mergeConfig`; each passes its configuration through the
   factory's parameter, and no wrapper's effective configuration changed.
7. The emitted plugin order for a showcase selection equals the order the deleted
   `applicationBrowser(true)` produced.
8. `appShowcase` restating `assetsInlineLimit: 4096` leaves what a generated showcase builds
   unchanged, because 4096 is the installed Vite version's default for that option.
9. Each of the two inverted cases — `gives every application browser factory the caller override`
   in `tests/src/core/compilers.test.ts`, and `declares every emitted project factory with the
   override parameter` in `tests/src/core/templates.test.ts` — keeps a planted control that fails
   when the property under test is absent, and carries the reason the parameter is now safe.
10. This repository's own `vite.config.ts` and `configs/src/*.config.ts` are byte-identical to what
    the generator emits for this repository's blueprint.
11. No vendored file changed, and `dist/host` did not move.
12. The added code contains no `any`, no `as`, no non-null assertion, and no suppression comment.
13. The renamed test imports (`config as configProject`, `distribution as distributionProject`, and
    the same form for `guides`, `policy`, `setup`, `probe`) change nothing about what those cases
    assert.
14. Nothing in the change alters what any generated workspace builds. Only how its configuration is
    composed changed.

## Where to look hardest

These are unprompted hazards, not claims. Rule on each as a finding if it is real.

- `mergeOverride` flattens `plugins` at depth 1. A Vite plugin array can nest deeper than one
  level. State what a deeper nest does to the selection, and whether it can duplicate or drop a
  plugin.
- The plugin key falls back to the plugin value itself when the entry has no `name`. State what
  happens to the falsy entries Vite permits in a plugin array (`false`, `null`, `undefined`), and
  to two distinct anonymous plugin objects.
- `mergeOverride` refuses silently: a caller passing a value carrying `command` gets the base back
  with no signal. State whether any legitimate caller can hit that path, and what it costs.
- `appShowcase` calls `mergeOverride` and then `appBrowser` calls it again on the result. State
  whether double merging can drop or reorder anything a single merge would keep.
- `src/core/compilers.ts` re-indents several template fills by one tab. State whether any emitted
  file's bytes changed in a way the formatter fixed-point proof would not catch.
- The change deletes the `{{viteTypes}}` fill and fixes the emitted import head. State whether any
  selection now emits an import it does not use, or fails to import something it does.

## Out of scope

Do not rule on the release. No version bump and no publish is part of this change; both are the
repository owner's decision.
