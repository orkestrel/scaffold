# Unit E-ID-CODE — code inside a block, a link, or a key follows Bootstrap's contextual rules

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eic` (branch `unit/eic`, cut from Veneer `main`
`ca83afb`). Read `/home/user/scaffold/.orkestrel/veneer/units/e-id-common.md` first; it binds.

## Objective

`pre code`, `a > code`, and `kbd kbd` behave as Bootstrap 5.3.8's reboot writes them while bare `code`, `pre`, `kbd`,
and `samp` keep Veneer's look, per the verdict's code row.

## Unknowns

Whether `code-text` and `code-surface` in `src/styles/_mixins.scss` need a change to cancel the chip; if they do, the
change is a shared hunk, because AP-TYPE also edits that file.

## Scope

**Owned.** `src/styles/elements/_code.scss`, `_pre.scss`, `_kbd.scss`, `_samp.scss`;
`tests/src/styles/elements/code.test.ts`, `pre.test.ts`, `kbd.test.ts`, `samp.test.ts`; new files under `tmp/units/`.
**Shared** per the common terms, plus `src/styles/_mixins.scss`, and the Code block, Linked code, and Key combination
specimens in `app/browser/constants.ts`.

## Execution

Perform the assignment directly and spawn nothing.

1. Ship `pre code` (the block's size and color inherited, normal word breaking, and the chip cancelled: no padding, a
   transparent background, no radius), `a > code` (the link's color inherited), and `kbd kbd` (Bootstrap's nested
   size and padding, the keycap cancelled: no border, a transparent background). Proofs read the child against its
   parent: the code's font size equals the `pre`'s, the linked code's color equals the anchor's at rest and on
   hover, and the inner key's font size equals the outer key's; each red when its rule is removed.
2. Replace the `var(--vn-border-width)` reads in `_kbd.scss` and `_pre.scss` with `var(--bs-border-width)`, the
   hook every other border reads (the verdict's border-width row).
3. Give `samp` the chip radius the rest of the family carries, pinned by `samp.test.ts`.
4. Record each contextual rule and each chip-cancelling declaration as additions, and delete the `pre code`,
   `a > code`, and `kbd kbd` Excluded rows in `guides/veneer.md` § Deferred selectors.
5. Re-run the code, linked-code, and key fixtures of
   `/home/user/scaffold/.orkestrel/veneer/units/e-identity-instruments/breakage-probe.mjs` against the rebuilt cascade
   (copy it to `tmp/units/`) and report each reading beside Bootstrap's.

## Deviation contract

Common terms. You settle the specimens' wording and whether a declaration belongs in the element partial or the mixin.

## Acceptance criteria

The common criteria, and: the contextual readings match Bootstrap's relationships; the bare elements' pins hold.

## Review evidence

The Orchestrator supplies the diff, the status, the report, the probe logs, and the mutation logs to the audit.
