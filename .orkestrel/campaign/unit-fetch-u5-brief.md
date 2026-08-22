# Unit fetch-U5: the guide narrative and the release note

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`,
rooted at `C:/Users/mikes/WebstormProjects/scaffold`. Documentation voice, routed to
Sol under `routing-amendment-cost.md`. You perform the assignment directly inside your
sandbox and spawn nothing beyond the scoped commands named here. The writing rules are
the standard and criterion 3's sweep is how voice is checked mechanically, so read
them before writing a word and hold every added line to them. Read before editing:
`AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/documentation.md`,
and `guides/scaffold.md` in full — you are writing into its established voice, and a
section that reads like a different author is a defect. Ruling record:
`.orkestrel/campaign/design-fetch-reconciliation.md`.

## Objective

Document the online-first strategy the campaign implemented, so a developer can state
it in one sentence and predict every verb's behaviour from it, and record what the
release note must say about the new network behaviour.

## What the campaign landed, by unit report

Read these before writing; they carry the measured facts you must not restate wrongly:
`unit-fetch-u1-report.md` (digest chain, committed `host.json`, staleness gate),
`unit-fetch-u2-report.md` (`Copy`, `vendor`, the `repository` rename, the
one-request aligned path), `unit-fetch-u3-report.md` (`Host`, `copiesToHost`, the
value host and its fill lifecycle), `unit-fetch-u4-report.md` (the verbs,
`provenance`, `--offline`, the per-verb table as implemented — read what U4 actually
landed, not what its brief proposed).

## The narrative to write

- **A Baselines section** stating the strategy once: every remote surface reads its
  live source first and falls back, whole, to the copy the installed package
  distributes; each operation reports one baseline word per surface. State the
  corollary — a surface falls back only where the package distributes a copy, so the
  registry's organization membership, which ships nowhere, refuses instead — and the
  invariant that authoritative absence never falls back, because writing a version the
  registry says is absent produces an uninstallable manifest.
- **The verb table**, rewritten from what U4 landed: what each verb reads live, what
  it does on a forced floor including its exit code, and what `--offline` does. State
  the exit rule that generates it: a floor the network forced is drift, a floor the
  operator asked for is not.
- **The vendored data root section**, extended: the committed inventory at the
  repository root, the digest chain, the one-request steady state for an aligned
  target and one further request per changed path, and the membership rule — the
  installed release fixes which paths a target owns, so a path added upstream is
  invisible until the next release and a live inventory can neither introduce nor
  delete a path. Name the operational consequence: remove a vendored path in the same
  change that ships the release.
- **The integrity posture**, in the reconciliation's terms: TLS and the byte budgets;
  every fetched file verified against the inventory's digest and the inventory against
  its own membership digest; this is integrity, not authenticity — an attacker who can
  serve the files can serve a matching inventory; the residual named plainly, that
  fetched bytes govern agent behaviour in targets with no release gate, with `audit`
  previewing, `--offline` pinning, and `.claude/settings.local.json` untouched.
- **The limits**, each stated where a reader meets it: the `#fill` temporary root a
  killed process leaves behind (U3's recorded limit); raw-host propagation lag after a
  commit as a property of the content host rather than a scaffold behaviour; the guide
  surface's per-row softening as the one asymmetry, with a foreign guide's floor being
  the target's own existing mirror.
- **The release note**, in the guide's release-note home or `ROADMAP.md` per this
  repository's convention (locate it; do not invent a new home): every published
  surface that moved — the verbs' new network behaviour, `provenance` on every
  machine-readable result, the softened refusals with their exit codes, `--offline`,
  the `guides` to `repository` rename, `ORKESTREL_SCAFFOLD_REPOSITORY`,
  `ManifestEntry.digest` breaking a host root staged by an earlier release, and the
  endpoints a run contacts.

## The vocabulary pass (U2's carry)

`guides/scaffold.md:1102` reads `Read the registry and the guide host:`, and prose in
`src/bin/types.ts:163-169`, `src/server/constants.ts:43,88`, and
`src/server/validators.ts:182` still says "guide host", "guide endpoint", or "guide
branch". One raw content host now serves guides and vendored files, so the vocabulary
is `repository host`. Change the prose in all four files together — a split vocabulary
is the defect this pass exists to prevent. These are prose strings and comments, not
endpoint-sense identifiers; verify each by reading it before touching it, and report
any that turns out to be user-visible output whose change would move a test
expectation.

## Scope

- Owned: `guides/scaffold.md`, `ROADMAP.md`, `src/bin/types.ts`,
  `src/server/constants.ts`, `src/server/validators.ts` (the named prose only in the
  last three), `tests/guides.test.ts` only if a transcribed fence or assertion must
  follow, and `host.json` through regeneration — `guides/scaffold.md` is vendored, so
  the `config` staleness gate reds until you run `npm.cmd run build:inventory`.
- Off-limits: every behavioural source change, every other test, and every file not
  named. If the narrative cannot be written truthfully without a source change, STOP
  and report — that is a design finding.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd`/`npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus owned
   files; report before and after.
2. Scoped `oxfmt --check` and `oxlint --deny-warnings` over the owned files exit 0.
3. A case-insensitive sweep of your added and changed lines finds no
   `.claude/rules/writing.md` § Substitutions hit in a banned sense, and no count of a
   growable set (`AGENTS.md` § Writing's no-count law) — report the patterns, the
   population they covered, and the result, with a control proving the sweep can fire.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — unscoped.
5. `npm.cmd run test:guides` exits 0 and the `config` project exits 0; totals
   reported. Every fence you add or change executes, or state why a fence is
   untranscribable here.

## Output

The complete U5 diff, per-criterion exit codes and totals, the vocabulary pass's
site-by-site result, the release-note home you found and why, and any deviation
(expected, found, exact evidence, done or not done, at most one short hypothesis). No
process diary.

## Deviation contract

Stop on: the narrative requiring a source change to be true; a vocabulary site that is
user-visible output pinned by a test; a criterion unreachable; an off-limits file
needing an edit. Section placement, heading wording, and example choice within the
writing rules are yours: decide, record, carry on.
