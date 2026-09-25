# J-ENGINE re-baseline of 2026-09-25

This is the Orchestrator's re-baseline after the reconciliation the user asked for. The evidence came from Grok lanes on Grok 4.7 (`grok-4.7-high`), bench probe session `9c3c551d-bdef-4583-b793-a9808407d0d2`. Each lane's brief and final answer are retained as `units/rebaseline-0925-<lane>-brief.md` and `units/rebaseline-0925-<lane>.md`, and the run scripts as `tools/run-recon.sh`, `tools/run-queue-2.sh`, `tools/evidence.sh`, and `tools/last.cjs`:

| Lane | Session |
| --- | --- |
| RECON-RECORDS | `6ddfef6f-ee64-4b66-8ea7-b124dd6713b4` |
| RECON-ROADMAP | `9998e516-4ac5-4bda-a51a-ed46a741b86b` |
| RECON-STYLES | `15f524b1-166b-4868-a6f3-c55dcee78763` |
| RECON-SRC | `65d58d2f-7b61-434f-87ca-2a4c30634123` |
| RECON-TESTS | `0918a7d7-a5f8-487c-8d20-8f991f8a3e75` |

The lanes ran one at a time from `tmp/cursor/run-recon.sh`. Their containment check reported a status change, and the Orchestrator read the diff: every changed path was a record the Orchestrator wrote during the run. Veneer was unchanged, and no Grok lane wrote a file.

## Carried rows struck, with the evidence that closes each

| Row (the finding) | Closed by | Evidence |
| --- | --- | --- |
| The `#### Tab` and `#### Carousel` sentences name a shared per-target record | J-SNAPSHOT-SHARED (`6dd5034`) | E25's one record per target shipped, which is the close the row names (`units/j-snapshot-shared-audit-3-verdict.md`) |
| A takeover in the change's own direction stops the change (Offcanvas hide, Modal show) | J-SAMEWAY with J-INTEGRATION (`4cd56a8`) | E24's agreement shipped for Modal and Offcanvas (`units/j-sameway-audit-3-verdict.md`) |
| The Modal and Offcanvas comments and the `#### Modal` sentence state the retired take-and-publish model | J-SAMEWAY's integration patch | `src/browser/Modal.ts` around line 448 and `src/browser/Offcanvas.ts` around line 431 read "joins the records this one has still to write back", and the guide reads "share one record of it" (`git grep` at `origin/main`, 2026-09-25) |
| A construction that saves or claims before a throwing read leaves a holder | J-SAMEWAY (B5) and J-SNAPSHOT-SHARED (R2, C1), under E30 | `units/j-sameway-audit-verdict.md`, `units/j-snapshot-shared-audit-3-verdict.md`, and E30 |
| Modal's `#holdOpen` and `#releaseOpen`, Isolation's claims, and ScrollLock's holder set hand-roll the holder rule | J-HOLDERS (`0865c67`) | H1 routed, H2's write-back routed with its order kept, and H3 stays for the stated reason (`units/j-holders-audit-2-verdict.md`) |
| `HostSnapshot` writes its private held-target shape inline | J-HOLDERS (H4) | The four named shapes in `src/browser/types.ts` (`units/j-holders-audit-verdict.md`) |
| No `ScrollLock` signal case, and the ColorMode persist case distinguishes neither a present value nor the error's identity | J-HOLDERS (H5) | `units/j-holders-audit-verdict.md`, claim 5 |
| A stopped show captures the change identity after `isolation.destroy()` ran consumer code, and `backdrop.show()` adds `show` after a reaction started `hide()` | J-SAMEWAY | E24's reentry amendment shipped (`units/j-sameway-audit-3-verdict.md`) |
| The fixture lookups `readButton`, `readSpecimen`, `readSubject`, and `readOracleButton` repeat one shape | J-FIXTURES (the styles session, `e07b3a6`) | Veneer ROADMAP § Carriers marks it closed, with the one-match step routed through `requireMatch` |
| The fade proofs wait on a test-local `.fade`, the Popover animated path, the motion-token proofs, and the trusted touch drag: J-CASCADE's part | J-CASCADE (`8bc940d`) | `units/j-cascade-audit-2-verdict.md`. The row is rewritten to its remaining J-OVERLAYS part |
| The `ConfigSanitizer` walk on Chromium 141 (struck earlier) | the styles session's 141 re-read | 70 passed and 2 skipped at `6d27028` |

## Carriers renamed

- The E24 row for `Collapse`, `Toast`, `Dropdown`, and `Tooltip` names J-SAMEWAY-ENGINES-A and J-SAMEWAY-ENGINES-B.
- The external-close row names J-SAMEWAY-ENGINES-B.
- The J-ORACLE row names J-ORACLE-RECORD, the census, J-ORACLE-FIX, and J-ORACLE-GATE.

## Rows added

- **Test-rule debt (RECON-TESTS).**
  - Case matrices are declared inline in the browser test files, against `tests.md`'s "Data tables and case matrices belong in a setup file at any size".
  - Eight named helpers sit in `Modal.test.ts` and `Offcanvas.test.ts`, some repeated across the two.
  - Five sites replace a platform method without calling through, on a browser that has the method: `setHTML` in `Tooltip.test.ts`, `setupBrowser.ts`, `ConfigSanitizer.test.ts`, and `validators.test.ts`, and `globalThis.addEventListener` in `tests/src/core/index.test.ts`. That is against "Do not replace DOM events … unless the browser genuinely lacks one".
  - A 500 ms Tooltip delay exceeds the default of 10 to 50 ms.
  - Carrier: J-TESTRULES.
- **The inline `resolveOptions` types.** `Modal` and `Offcanvas` pass anonymous object types to `resolveOptions`, where every other engine derives its type from its declared contracts (`Pick<…Options, …>` or `typeof …_DEFAULTS`). Carrier: J-OVERLAYS, which owns both files.
- **The Tailwind tenet.** Veneer ROADMAP § Tenets, "Work with Tailwind and without it", has no engine evidence: no engine journey runs under Tailwind's preflight. Carrier: J-TAILWIND-PROBE, a probe first, whose result decides whether a unit follows.
- **The styles session's asks the plan had not taken up (RECON-STYLES).**
  - Its `Placement.test.ts` failure at `7e96cf8` is closed by its own Chromium 141 run at `6d27028` (891 passed and 2 skipped), and the styles session was told.
  - ER-WIN is ruled yes by the user (E31), and it waits for ER-MECH and the release-mode fix.
  - The classed-button re-read follows E-ID-BUTTON-CASCADE's landing through the landing gates.
  - ER-PROSE's exact engine sentences arrive through the styles session's plan.

## The source conventions (RECON-SRC)

`src/browser/**` and `src/core/**` at `0865c67` show no type assertion other than `as const`, no non-null assertion, and no `any` or suppression directive. They have no access modifier or default export, and no nested function outside a direct callback. Every kind sits in its centralized file with one class per implementation file. There is no absence sentinel in a type, no `kind` or `type` discriminant, and no compound member name outside the names an external format fixes. The lane read with ripgrep and file reads, not a TypeScript parser, and says so.

## The roadmap (RECON-ROADMAP)

The Veneer ROADMAP J-ENGINE cell is stale:
- it names `/home/user/scaffold` paths;
- it names `checker` on Sonnet;
- it names J-GUARDS and J-SAMEWAY as the open carriers;
- it omits every later unit;
- it calls the guide's `plugin` rows the only record of landings.

§ Protocol's engine lines carry the same host paths. The cell is rewritten to point at the engine plan in this re-baseline's Veneer landing.
