# O9-U2 audit round 1 — reconciled

Two lanes, both Opus, blind and clean-contexted, on one claim list. Both returned `VERDICT: FAIL`.
Sol wrote the unit, so both lanes ran on Opus; that substitution is recorded in `routing-ledger.md`.

**Seam round count: 1 of 3.** Recorded here, at the seam's opening, per the three-round budget.

## Where both lanes agree

These carry two independent confirmations and go straight into the fix.

| # | Finding | Lanes |
| - | ------- | ----- |
| R1 | A workspace declaring `test.projects` as strings gets no overlay plugin at all, and the run certifies against disk silently | design F4, correctness F1 + claims 1 and 2 REFUTED |
| R2 | `#load` strips every query and fragment, so `?raw`, `?url`, `?inline`, and `?worker` receive candidate TypeScript as module code | design F5, correctness F2 + claim 7 REFUTED |
| R5 | `#load` rescans and reallocates `Overlay.paths` for every module in the graph, and normalization is written twice | design F8, correctness F7 |
| R6 | `#invalidate` declares `readonly string[]` while both call sites pass a one-element literal | design F1, correctness referral |
| R10 | The three new tests cover one of three project shapes; the function arm this repository itself ships is untested | design F9, correctness F4 |

R1 is the serious one. The correctness lane supplied the mechanism from the installed bundle: Vitest's
`resolveTestProjectConfigs` routes a string to `configFiles`/`nonConfigDirectories`
(`node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:11338-11364`), those are initialized at
`:11202-11215` with no `plugins` key, and `initializeProject` at `:11115-11127` forwards only
`options.plugins`, so the root `viteOverrides` plugin never reaches that project's server.

The Orchestrator ruled reachability separately in `o9-u2-orchestrator-evidence.md`: the arm is declared
in the installed types, `RuntimeStage` runs against the **probed** workspace's config rather than this
one, and `#project` resolves by name so a string-declared project still yields a live `TestProject` and
a clean certified run. Reachable through shipped code, so it is repaired now rather than documented.

## Where the lanes disagree, and the ruling

### Claim 9 — is the overlay bound to the stage or to the run?

The design lane REFUTED it from the published contract. The correctness lane CONFIRMED it from the
shipped call path: `Probe` admits the runtime stage through one `concurrency: 1` queue
(`src/server/Probe.ts:98-102`), and a deadline expiry **replaces the whole stage instance** before the
next entry is admitted (`:270-287`, `:289-309`), so an abandoned inspection keeps its own instance and
its own `#overlay`.

The correctness lane is right about the shipped path, and the design lane is right that the surface
admits the break. `RuntimeStage` is a barrelled public export, so a consumer calling `inspect` twice
concurrently reaches it through ordinary use of a documented class, not through a hypothetical foreign
implementation.

What settles it is that `src/server/types.ts:88-94` does not state an obligation on the caller. It
states a **guarantee**: the stage never holds a later inspection behind an earlier one, so a caller
that abandons an inspection at its own deadline can still use the stage. That guarantee is delivered by
`Probe` replacing the instance, not by the stage tolerating two live inspections. The interface
therefore promises something the class does not do.

**Ruling (R4): make the contract true by enforcing it.** `inspect` refuses a second concurrent
inspection on one stage instance, and the interface text says so. This is the package's own precedent —
S3fix2 gave `LintStage` exactly this refusal for a concurrent second inspection of one open path. The
alternative the design lane proposed, a `specification → overlay` map, is coordination machinery
against a case the shipped code never produces, and `.claude/rules/quality.md` refuses that.

The invariant is: one live inspection per stage instance. The constraint bounding it is that the
refusal must not reach the queued path `Probe` already serializes. The interface is where the consumer
meets it.

### Claim 10 — does `destroy()` release the overlay?

The design lane said PLAUSIBLE. The correctness lane REFUTED it with the ordering:
`#overlay.clear()` is the **last** statement of `#destroy`, after an unguarded `unlinkSync` at `:164`
and `await vitest.close()` at `:172`, either of which can throw. `src/server/Probe.ts:293-302` states in
the package's own words that teardown of a hung stage can reject.

The correctness lane wins on evidence. **R3: clear `#overlay` and `#modules` in a `finally`, and guard
the per-file unlink so one failure does not abandon the rest.**

## Dropped on evidence

**The non-idempotent re-warm (design F7).** The design lane could not tell whether `createVitest`
re-evaluates the workspace config on each warm, and flagged a possible double plugin append. The
correctness lane answered it: `loadConfigFromBundledFile` writes a uniquely hashed temp file per load
and imports that (`node_modules/vite/dist/node/chunks/node.js:37059-37069`), so no config object
survives into another `createVitest`.

Dropped on the record rather than silently, because a lane raised it and nothing else would say why it
went away.

## Claim wording that overreached

**Claim 6** said no revision suffix reaches "any path a test can observe". Both lanes found that false
for the generated specification itself, which still executes from `<stem>.probe-<uuid>.test.ts`. Neither
lane found a candidate module carrying a suffix.

The claim was too broad; the code is correct for candidates. No repair. Recorded so the next round does
not re-litigate it.

## Routed to a successor, not this fix

Pre-existing, outside O9-U2's diff, and each recorded against the capability that owns it.

- The generated specification's own `import.meta.url` carries the revision suffix.
- Stack remapping compares paths by exact string, and `resolve` does not resolve symlinks, so a
  workspace given as a non-realpath can leak `probe-<uuid>` into a finding's `path`
  (`RuntimeStage.ts:488-489`).
- `experimental.fsModuleCache` keys on disk content and could serve a disk-derived transform for a
  covered path. Opt-in, bounded by `ignoreFsModuleCache` for inline projects, and **unproven either
  way**. Named as an open question rather than a finding.
- A shared `normalizePath` in `src/server/helpers.ts` consumed by both `Overlay.covers` and the stage.
  R5 closes the duplication inside `Overlay`; promoting the helper is a separate change.

## The fix unit

**Unit O9-U2fix, routed to Sol.** The bulk is substrate precision — Vitest project resolution, Vite
plugin ordering and hook contracts, teardown ordering — which is the objective work class. The design
lane already made the naming decisions, so they enter the brief as prescriptions rather than taste
calls.

Its audit belongs to Opus, because Sol will have written it.

**B1 goes first.** `npm test` chains with `&&` and stops at the bin test, so `test:policy` and
`test:config` never run. A fix unit whose gates cannot reach two projects cannot prove itself.

## Carry check

Every retained finding names its carrier. R1, R2, R3, R4, R5, R6, R10, and the naming and TSDoc
repairs are all carried by O9-U2fix. Four findings are routed to a successor and named there. One is
dropped with its refutation kept. One claim is recorded as overreaching wording. Nothing is unassigned.
