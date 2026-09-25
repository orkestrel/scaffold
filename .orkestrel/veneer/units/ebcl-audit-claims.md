# E-ID-BUTTON-CLASSES audit — claims

Subject: E-ID-BUTTON-CLASSES in `/home/user/veneer-ebcl` (branch `unit/ebcl`, uncommitted over Veneer `2376710`),
briefed by `e-id-button-classes-brief.md` under `e-id-button-design-verdict.md`. Written by `opus` on Opus 5.5 and
reported in `e-id-button-classes-report.md`. Evidence: `ebcl.diff` (`git diff 2376710`), `ebcl-status.txt`, and
`ebcl-instruments/` (the probes `ebcl-probe/pages.mjs` and `forms.mjs` with their JSON output, the mutation drivers
`ebcl-probe/mutate.sh` and `mutations.sh`, the logs under `ebcl-instruments/logs/`, the shared-file patches, and the
Orchestrator's re-run `ebcl-orchestrator-setup-rerun.log.txt`). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is not a claim subject. A mutation counts as a
kill only when the failing case's message names an assertion failure. Rule every claim.

1. **Coverage.** `tests/src/styles/elements/button.test.ts` holds one case per class the design verdict names:
   `btn-close`, `navbar-toggler`, `accordion-button`, `dropdown-item`, `nav-link`, `list-group-item`, `page-link`, the
   two carousel controls, and the carousel indicator. Each case reads the class's button form and its counterpart at
   rest, hovered, pressed, under keyboard focus, and disabled, in the Veneer cascade and in the release's
   `bootstrap.css`.
2. **The oracle compares forms, never a class value against the release's number.** In every state, the case maps each
   longhand where the button form differs from its counterpart to the button's value, and asserts that the Veneer map
   equals the release map. A leaked `elements`-layer surface declaration therefore reads as an extra entry in the
   Veneer map, and a class-written value reads equal on both forms and drops out.
3. **The release cascade is the release's alone.** The release readings come from a shadow root holding only
   `node_modules/bootstrap/dist/css/bootstrap.css`, under the same holder, inside `data-bs-theme="light"`. The unit's
   standalone page readings (`ebcl-probe/pages.json`) equal the shadow-root readings in every case and state
   (`ebcl-probe-shadow-readings.log.txt`), so the shadow root introduces no difference of its own.
4. **Real input, and each drive is checked.** Hover drives through `userEvent.hover`, press through the harness's
   hold, and keyboard focus through `focus()` followed by `{ArrowRight}`. Each drive asserts that the element matches
   `:hover`, `:active`, or `:focus-visible` before the reading, and the case releases the pointer and the media after
   it.
5. **The disabled pairing follows the release's own selectors.** A counterpart takes the `disabled` class and
   `aria-disabled` (`paired: true`) exactly for the classes whose release rule names `:disabled` beside `.disabled`
   (close, dropdown-item, nav-link, and list-group-item), and is read at rest (`paired: false`) for the others; each
   assignment matches `bootstrap.css`.
6. **The holder reaches every surface token.** `BUTTON_RETUNED_HOLDER_STYLE` in `tests/setupStyles.ts` retunes every
   custom property `src/styles/elements/_button.scss` and the mixins it includes read, to a value neither cascade
   produces unretuned. It extends `BUTTON_HOLDER_STYLE` rather than widening it, because
   `tests/service/tailwind/consumer.test.ts` pins padding under the existing holder, and that pin is a real reading.
7. **Each include removal kills its class's case.** Each mutation in `ebcl-instruments/logs/ebcl-mutation-*.log.txt`
   removes one partial's `button-reboot` include, turns that class's case red with an `AssertionError`, and restores
   byte-identically. The case distinguishes the mutation from the passing tree: the Veneer map gains the leaked
   longhands the release map lacks.
8. **The minifier guard.** The case in `tests/src/styles/mixins.test.ts` reads the built `dist/src/styles/index.css`
   and asserts that every reset declaration on each class the release builds on a button names `revert` as its whole
   value; the `transition-delay` plant (`ebcl-mutation-minifier.log.txt`) turns it red with an `AssertionError`.
9. **Reading the release stylesheet as data keeps the conformance gate's purpose.** The proof reads
   `bootstrap.css` through `commands.readFile` rather than importing it. The case `imports no forbidden runtime package
   from source, application, or tests` in `tests/conformance.test.ts` exists to keep Bootstrap out of the runtime
   import graph, and a test reading the file's text as an oracle does not enter that graph, as `recordButtonOracle` in
   `tests/setupServer.ts` already does.
10. **The shared hunks.** The `tests/setupStyles.ts` patch adds `BUTTON_RETUNED_HOLDER_STYLE` and `BUTTON_REBOOT_CASES`
    and nothing else; `tests/setupStyles.test.ts` lists both names in sorted order; the `guides/veneer.md` patch's
    § Outside the ledger paragraph states only what the proofs execute.
11. **Placement.** One `it.each` case in `button.test.ts` rather than one case in each of the eight component test
    files is the placement `.claude/rules/tests.md` requires, because the routine is identical for every class and a
    copy per file is the near-duplicate helper that rule names a defect; the subject is each class's button form, which
    is the `button` element's proof.
12. **Gates.** `npm run check`, the scoped format and lint, `npm run build:src`, the owned files, `npm run
    test:src:styles` (`Tests 1516 passed (1516)`), `npm run test:conformance`, `npm run test:guides`, and `npm run
    test:policy` exit 0. `npm run test:setup`'s single red is a `Test timed out in 10100ms` in a case the unit does not
    touch, and the Orchestrator's re-run of that case alone reads `Tests 1 passed | 112 skipped (113)` and `exit=0`.
13. **Scope and law.** `ebcl-status.txt` names only the owned and shared files; `git diff --stat -- src` is empty. The
    diff adds no `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, hidden
    helper, mock, fake, or fake clock; every literal it asserts is a reading; each case title states what the case
    proves.
