# U7c scope read — the brief against the live tree before dispatch

Role: `checker` on native Sonnet, read-only, clean context. Perform the assignment directly and
spawn nothing.

Subject: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u7c-brief.md`, the brief a native
Opus writer will open next, against the live Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer` (HEAD `0cbb563`, the U7b landing; tracked tree clean).
The dispatch message that accompanies the brief is
`C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/8082b48a-b39d-4cfd-ae0c-2f5c853292c4/scratchpad/u7c-dispatch-prompt.txt`;
read it too, because it states the readings the brief marks "RE-TAKEN AT LAUNCH".

Rule on these, with `file:line` evidence for every row:

1. Every path the brief or the message names (source, test, fixture, config, guide, script,
   law file under `C:/Users/mikes/WebstormProjects/scaffold`) resolves from the writer's root.
   List each one that does not.
2. Every statement of fact in the message's re-taken readings and in the brief's Context
   section holds on the live tree (barrel exports, refusal codes, the `Delegate` prune rule,
   the guide's `### Deferred selectors` table and § Compatibility rows, the `app/browser/`
   listing, `tests/app/browser/integration.test.ts`'s `STATES`, the installed
   `@orkestrel/test` build). List each one the tree contradicts, with what the tree says.
3. Scope by falsified assertions: for each acceptance criterion, name every existing test,
   fixture, golden, parity list, or export-set assertion in the live tree that the criterion's
   result would make false, and say whether the brief's Scope section grants that file. Read the
   Scope section's owned, shared, and off-limits lists line by line. List each ungranted file
   with the assertion and the criterion that breaks it. Sweep `tests/**`, `app/**`, `guides/**`,
   `configs/**`, `package.json`, and `tests/fixtures/**` at least; name the search scope you
   covered.
4. Every file the brief owns that the `scaffold repair` command restores (a vendored file:
   run `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` from the Veneer
   root, read-only, and treat every path it reports as compared bytes as vendored). List any
   the brief grants.

Output, and nothing else: one table per item (empty table with the words `none found` when a
sweep finds nothing), then one line `Verdict: dispatch` or `Verdict: amend`, the latter with the
rows that force it. No process diary. Report no wording, comment, or prose finding: the user has
ruled that scope reads cover implementation facts only.
