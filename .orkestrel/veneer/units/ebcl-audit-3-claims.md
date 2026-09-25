# E-ID-BUTTON-CLASSES audit round 3 — claims

Subject: E-ID-BUTTON-CLASSES round 3 in `/home/user/veneer-ebcl` (uncommitted over Veneer `2376710`, rounds 1 to 3),
briefed by `e-id-button-classes-brief-3.md`, whose Items the Orchestrator ruled in `ebcl-audit-2-verdict.md`. Written by
`builder` on Sonnet and reported in `e-id-button-classes-report-3.md`. Evidence: `ebcl-3.diff` (`git diff 2376710`),
`ebcl-3-status.txt`, the round-2 diff `ebcl-2.diff`, and `ebcl-instruments/r3/`. All paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A mutation counts as a kill only when the failing case's message names
an assertion failure. Rule every claim.

1. **The refusal is true.** `readFormDifferences` throws, before it mounts anything, exactly when a state list reads
   `rest` after another state or `disabled` before another state, and for no other list; its `@param states` and
   `@throws` text is true of that code; and no caller in the tree passes a list it refuses.
2. **The refusal's proof.** The case titled `refuses a state list that reads rest after another state or disabled before
   one` asserts the exact message for `['hovered', 'rest']` and `['disabled', 'hovered']`; deleting the refusal fails it
   with an `AssertionError` (`ebcl-3-plant-order.log.txt`); the restore is byte-identical.
3. **The rename.** No site in `tests/` or `guides/` names `FormPair`; the reader's parameter and every binding of a
   `BUTTON_FORM_CASES` or `BUTTON_REBOOT_CASES` row or case fixture is `subject`; every TSDoc "pair" that means a case
   says "case"; and `paired`, its TSDoc, and the `FORM_ENTRIES` keys keep "pair" in the release's sense alone.
4. **The guide sentence.** § Outside the ledger says "A counterpart cannot be `:disabled`, so it takes", and the
   paragraph differs from round 2 only there and in its wrapping.
5. **Scope.** Between `ebcl-2.diff` and `ebcl-3.diff`, only the Items' sites change, and the status names only owned
   files.
6. **Gates.** `npm run check`, `npm run lint:check`, the oxfmt check, the styles build, the owned styles files (268
   passed), the setup-browser file, and `npm run test:guides` exit 0 in `ebcl-instruments/r3/`; `npm run test:policy`
   timed out in its workspace case at load near 19, and the landing chain takes the deciding reading.
