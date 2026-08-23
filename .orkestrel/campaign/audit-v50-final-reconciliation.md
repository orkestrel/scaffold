# Reconciliation — the pre-publication round

Three lanes ran on one brief and its successor, in clean contexts, blind to each other. A subjective
lane and an objective lane on Opus 5, and the objective lane again on GPT-5.6 Sol over the Codex
bridge once the user authorized it — the first Sol reading in this campaign, journalled at
`tmp/codex/audit-sol.jsonl`, thread `01a02e6b-cb79-7ff2-af42-cc1a5dde4dc5`.

Every lane returned `FAIL`. **Publication is blocked.** The Orchestrator reproduced every sharp
finding before ruling on it.

## Where every lane agrees

**Claim 2 is broken.** A published subpath whose entry resolves no `.d.ts` is dropped by a bare
`continue` at `src/core/templates.ts:1368`. It receives no per-entry runtime test and is absent from
the population the resolution-modes case compiles, and the run reports success under `--mode
release`. The intended exclusion of the manifest pointer and an unintended miss share one silent
branch.

Three engines found it by three routes: an untyped `./legacy` subpath, an import-only `./raw` entry,
and a core-only proof driven against a real browser-face package. It is not in dispute.

The objective lane on Opus found a **second vector for the same claim**, measured on a copy of the
real `@orkestrel/indexeddb` carrying the core-only proof variant: `4 passed | 2 skipped` under
`--mode release` with the browser entry never imported, bundled, or loaded. The branch is selected at
**generation** time — `src/core/compilers.ts:1302`, `blueprint.src.includes('browser')` — and the
artifact is presence-owned, so no verb ever revisits it. A workspace that takes 0.0.50 while
core-only and later publishes a browser face gets a green publish gate with no evidence for the face
it publishes, and `audit` reports the file aligned.

## Where the lanes disagree, and the ruling

**Claim 5 — ruled broken, with the Opus objective lane.** Sol confirmed it; the Opus objective lane
falsified it with a concrete input Sol did not test. `ARTIFACT_TEMPLATES.tests.global` is
`export function setup(): void {}`, not the empty string, so a freshly materialized `global: true`
workspace fires the `setup` question immediately. It is live in the fleet: `audit` on `mcp` names
`tests/setupGlobal.ts`. A lane that produces the failing input outranks a lane that did not look for
one.

The false premise is the Orchestrator's. The W5 brief stated the setup seed is the empty string —
true of `tests/setup.ts` alone — and the unit's shipped comment generalized it to every
`tests/setup*.ts` module. The guide repeats it.

**Claim 14 — ruled broken, on the wording only.** Sol confirmed the implementation and both Opus
lanes broke the claim. They answered different questions and both answers are right: the assertion
behaves exactly as Sol describes, and the claim as written — with the shipped in-file comment —
describes a stronger property than the code has. The Opus objective lane measured the gap: narrowing
to a tenth of each declaration's fenced bodies drops 172 of 188 claim lines while `printing` does not
move. The code stays; the claim and the comment are corrected to "silences a shipped declaration".

**Sol's finding against an Opus ruling — ruled with Sol.** The Opus objective lane tested a manifest
whose `scripts` object is empty, saw the write refused, and recorded it as correct. Sol called it a
defect and the type agrees: `src/core/types.ts:140` states "An absent script is always writable and
needs no entry in `accepted`", while `src/core/compilers.ts:1896` and `:1899` refuse every empty
region. That is a contract violation, and the lane that read the contract wins over the lane that
read the behaviour.

**Claim 11 — ruled confirmed on the ruling, broken on the guide's sentence.** Sol and the Opus
objective lane each tested candidate assertions and closed each one. The subjective lane found a
candidate neither tested — every `tests/**/setup*.ts` module is reachable from the root configuration
or a relative import — and measured it green across every checkout, 50 modules with none unreachable.
The design ruling not to generate a setup proof stands. What does not stand is the guide asserting a
whole space from one sample; that sentence narrows to what was measured.

## The finding no claim named, and the worst of the round

**Every `app/browser` workspace goes red on `npm test` the moment it takes 0.0.50's vendored bytes.**

W1 added a vendored assertion requiring every root `test.projects` entry to be a function.
`src/core/compilers.ts:821` pushes `'appBrowser()'` — a called factory returning a plain record —
and the comment above it documents that as deliberate. The lane measured a workspace scaffold had
just created failing its own `test:config`, and reproduced it on `supervisor`, which passes its
current vendored proof and fails 16 of 44 on the candidate's.

The propagation phase could not have caught it: no propagated target carries an `app/` axis, and
`supervisor` — the only checkout that does — is refused by `overwrite` for an unrelated pre-existing
reason. The gate is correct and is not weakened; the generator is corrected.

## Carried, ruled, and dropped

Fix units follow for: the untyped-subpath partition; the core-only proof's missing guard against a
browser entry it cannot drive; the `setupGlobal` filter and the setup question's remedy, which
hard-codes one filename regardless of how many modules it names and goes permanently silent once any
proof exists; the empty-`scripts` insertion path; the W7 comment; and the guide's false sentences —
"the one proof scaffold writes", repeated four times where scaffold writes four kinds of test file;
"every setup module scaffold seeds is empty"; and the categorical setup claim.

Recorded against the capability that owns them, not reopened here: the hard-linked-checkout refusal
on the read path, and `overwrite --offline` exiting 1 after a successful write. Both reproduce under
the published 0.0.49.

Dropped on the record: nothing. No lane raised a finding another lane refuted.
