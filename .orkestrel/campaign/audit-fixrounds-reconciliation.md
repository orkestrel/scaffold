# Fix-round audit — reconciliation, 2026-08-21

Lanes: Sol over P-fix (`audit-pfix-verdict.md`, executed mutation probes) — PASS, all six
claims CONFIRMED. Opus over P4-fix and S-fix (report beside this file's task record) — PASS,
claims 7-10 CONFIRMED, claim 11 P4-half CONFIRMED, S-half UNRESOLVED.

## Rulings

- All three fix rounds are ACCEPTED. The probe, process, and scaffold audit rounds are
  closed with their promised cross-engine audits on record.
- Claim 11's S-fix half (no ride-along regression) is accepted with its evidence limit
  recorded: the owned files were dirty before the unit, so no baseline separates standing
  from unit edits. Compensating evidence: the lane's own tracing confirmed every
  prescription landed exactly; the Orchestrator's host runs after the referral report
  `policy` 92 passed, `config` 40 passed, whole-tree `oxlint --deny-warnings .` exit 0
  (2026-08-21). Process correction already landed for the cause: checkpoint commits precede
  writing dispatches; this wave ran uncommitted, and the release commit closes it.
- The lane's referral on vendored fleet blast radius is already recorded in the scaffold
  reconciliation: a green scaffold sweep is no evidence for a target's lint; the release
  wave's per-target visit absorbs it.

## Findings routed

- F1 (`#failInput` boolean discriminator — two named doors), F2 (`#inputFault` latent
  state-drift — derive, clear at `#input === 0`, remove `#inputEvent`), F3 (residual
  signature unpinned — `toMatchObject` beside `execute.test.ts:211`), F7 (input-fault
  rejection coded `spawn` with a host-fault message — name the door) → unit **P5**
  (process, Sol, queued for a free Sol slot; audited after by Opus since Sol writes it).
- F4 (four-space fence limit pinned by nothing) → unit **SF4** (scaffold, builder): a
  control fixture carrying a four-space-indented fenced TODO that must red, with the
  membership string naming the indented-code-block construct the scanner does not
  interpret.
- F5 (the `send`-after-`stop` sentences name 0.0.4 while the tree is 0.0.4) → release prep:
  process bumps to 0.0.5 before publishing; the sentences then state history truthfully.
- F6 (scaffold ROADMAP's process rows describe landed work as open) → the Orchestrator's
  final ROADMAP integration strikes them.
