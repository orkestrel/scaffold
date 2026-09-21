# CL2 scope read — the brief against the live tree before dispatch

Role: `checker` on native Sonnet, read-only, clean context. Perform the assignment directly and
spawn nothing.

Subject: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-brief.md`, the brief a native
Opus writer will open next, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer` (HEAD is the CL1 landing named in the brief's Role
section; tracked tree clean).

Rule on these, with `file:line` evidence for every row:

1. Every path and symbol the brief names resolves from the writer's root, and every line
   number it gives is within a few lines of the symbol (list each that does not, with the true
   location): the token ramps and breakpoint tokens in `src/styles/_tokens.scss`, the state
   mixer and percentages and the breakpoint mixins in `src/styles/_mixins.scss`, the registry in
   `src/core/types.ts` and `src/core/constants.ts`, `tests/src/core/index.test.ts`,
   `tests/src/styles/tokens.test.ts`, `tests/src/styles/mixins.test.ts` and its fixture,
   `tests/setupStyles.ts` and its proof (the readers and `BREAKPOINT_CASES` CL1 landed), the
   guide's § Tokens reference map and its `### Deferred names` table.
2. Every statement of fact in the brief's Context section holds on the live tree (the ramps'
   values and index law, the `reset` layer declared, the mixin names, the registry's grouped
   shape and the bidirectional equality assertion, the guide's row shape with value and source);
   list each the tree contradicts, with what the tree says.
3. Scope by falsified assertions: for each of the brief's execution items 1 to 3, name every
   existing test, fixture, export-inventory assertion, parity list, or policy sweep in the live
   tree that the item's result would make false (a new `--vn-*` name against the registry and
   `tokens.test.ts`; a new export from `tests/setupStyles.ts` against its inventory; a new guide
   row against `test:guides` and the policy sweep; the deleted deferred-name row against
   `readDeferrals` or any reader of `### Deferred names`), and say whether the brief's Scope
   section grants that file. Sweep `tests/**`, `tests/fixtures/**`, `guides/veneer.md`,
   `src/core/**`, `package.json`, and `configs/**` at least, and name the scope you covered. List
   each ungranted file with the assertion and the item that breaks it.
4. Every owned file that is a vendored file (`vite.config.ts`, `tests/config.test.ts`,
   `tests/policy.test.ts`, `tests/setupPolicy.ts`) or otherwise off-limits by the brief's own
   Off-limits list.

Output, and nothing else: one table per item (the words `none found` when a sweep finds
nothing), then one line `Verdict: dispatch` or `Verdict: amend` with the rows that force it. No
process diary; report no wording or prose finding.
