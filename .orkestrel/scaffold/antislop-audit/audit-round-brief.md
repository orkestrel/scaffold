# Audit round: falsify the policy-instruments change

One identical brief, two blind lanes. Follow `.agents/skills/orkestrel-falsify/SKILL.md` (verdict
shape, four verdict values, one terminal line) and the Falsification section of
`.claude/rules/quality.md` (auditor conduct). Both files exist in this tree; read them before
ruling. Attempt refutation, not confirmation. CONFIRMED requires naming the attack you tried that
failed. A claim you cannot decide is UNRESOLVED, not CONFIRMED — say what would settle it. Do not
hedge toward an imagined consensus.

## Subject — the chain

Branch `claude/oxlint-conventions-audit-m66uiq`, tip b91dc63. Four writing rounds:

- U1 (a7cd671, written by Claude Opus 5): amendments to `.claude/rules/workspace.md`,
  `.claude/rules/typescript.md`, `.claude/rules/architecture.md` — the third `configs/` leaf, the
  two-instrument split and its assignment rule, the accessibility and `as const` rulings, the
  sweep's suppression proof row.
- U2 (24a6eb7, written by GPT-5.6 Sol): `configs/policy.ts` (plugin `policy`, rules
  `policy/no-mocking`, `policy/no-keyword-privacy`), `.oxlintrc.json` wiring plus built-ins
  `typescript/parameter-properties` and `typescript/explicit-member-accessibility` (`no-public`),
  the `HOST_PATHS` row, and the `.prettierignore` `.orkestrel/` exemption (Orchestrator
  integration edit, briefed and owned).
- U34 (written by GPT-5.6 Sol): the sweep's `'suppression'` rule with controls in
  `tests/setupPolicy.ts`/`tests/policy.test.ts`, and RuleTester plus real-binary wiring proofs in
  `tests/config.test.ts`.
- U34-fix (b91dc63, written by GPT-5.6 Sol): composed suppression tokens without literal
  concatenation, format convergence, structural type widening in `configs/policy.ts` for
  RuleTester assignability.

**Lane-specific instruction.** The subjective lane runs on Claude Opus 5, the engine that wrote
U1: attack the U1 half harder — a clean pass on your own engine's work is the least valuable
result you can return. The objective lane runs on GPT-5.6 Sol, the engine that wrote U2, U34, and
U34-fix: attack those halves harder, and treat the fix round's own rulings (the type widening, the
composed tokens) as the freshest, least-examined surface.

## What the round decides

Whether this change is accepted and pushed as the campaign's implementation, becoming part of
scaffold's published `dist/host` vendored surface that every fleet target receives on the next
release. A finding now is worth more than a clean pass: the alternative is every fleet target
inheriting the defect through `repair`.

## Already established — do not re-run

Verified by the Orchestrator directly, not taken from any writer's report:

- All five gates green at b91dc63 in the unconstrained environment: `format:check`, `lint:check`,
  `check` exit 0; `test:policy` 59/59; `test:config` 25/25 including the real-binary wiring proof.
- Mutation probes, each restored to green afterward: a broken `jsPlugins` specifier reddens the
  `config` project; a deleted `policy/no-mocking` rule row reddens it; a `private` member inserted
  in `src/core/Compiler.ts` reddens `lint:check` naming `policy(no-keyword-privacy)`; an appended
  disable directive reddens `test:policy` on the `suppression` rule.
- The `spawnSync EPERM` failure of the wiring test inside the Codex exec sandbox is environmental
  (nested spawn denied there); the same test passes in the real environment.
- `jsPlugins` mechanics, Vue SFC reach, the 1.77.0 floor, and the zero baseline violations:
  `.orkestrel/scaffold/antislop-audit/design-lanes-evidence.md` (E1–E10).

## Review evidence

- `tmp/audit-evidence.md` — status, gate truth, mutation-probe log, and the full diff
  `83ff059..HEAD` over code and rule paths. This is the actual diff and actual status output.
- Unit reports: `.orkestrel/scaffold/antislop-audit/unit-plugin-report.md`,
  `unit-proofs-report.md`, `unit-proofs-fix-report.md`; briefs beside them.
- The canon the subject must satisfy: `AGENTS.md`, `.claude/rules/*.md` at tip (U1's amendments
  included), and the adoption ruling `.orkestrel/scaffold/antislop-audit/adoption-report.md` with
  the recorded mid-campaign correction: the privacy rule covers `protected` as well as `private`,
  under the user's authorization to rule by the spirit of the conventions.

## Numbered falsifiable claims

1. `policy/no-mocking` reports every construct it claims: each of `mock`, `doMock`,
   `unstable_mockModule`, `fn`, `spyOn`, `useFakeTimers`, `setSystemTime`, `stubGlobal`,
   `stubEnv` on `vi` and on `jest`, through identifier access and computed string access, mapped
   to the right messageId. The stated name-based limit (a renamed import alias escapes) is
   documented in the rule's description and is not a break of this claim; anything else that
   escapes within the stated scope is.
2. Neither plugin rule reports a sanctioned construct. Name a legitimate caller pattern the new
   enforcement breaks — `createRecorder` use, `#` fields, non-`vi`/`jest` receivers with banned
   member names, unlisted `vi` members, `as const`, the plugin's own source, the tests' own case
   strings — or any refusal widened into a regression.
3. The wiring instrument binds: name a change to `.oxlintrc.json` or `configs/policy.ts` that
   silently disables enforcement of a configured rule and that the `config` project would NOT
   catch. The mutation probes established the specifier and rule-row cases; attack the instrument's
   rule, not its output.
4. The `'suppression'` rule's population (`POLICY_SUPPRESSION_GLOB`) omits no code file where a
   directive could defeat a configured oxlint rule. Name a file class oxlint lints in this
   workspace that the scan does not reach.
5. No instrument is vacuous or self-triggering: every new control fires, each is drawn from its
   stated membership, the out-of-population control stays silent, and no instrument reports its
   own definition. Name an input on which one of these fails.
6. Every U1 sentence is true of the code as landed and consistent with `AGENTS.md`: the
   three-leaf sentence, the instrument-assignment rule, the visitor-adapter sanction, the
   accessibility ruling (including that `public` is enforced by the built-in and
   `private`/`protected` by the plugin), the `as const` ruling against the installed gate's actual
   behavior, and the sweep-proof row. Name a sentence the code contradicts, or that restates a rule
   homed elsewhere.
7. Zero dependencies: `package.json` and `package-lock.json` are byte-identical to the campaign
   baseline, and `configs/policy.ts` has no import of any kind.
8. The change obeys the laws it enforces: the plugin file's own shape is lawful under the amended
   rules, the tree passes the sweep it extends, and the new types are strict-clean with no
   assertion, `any`, or suppression anywhere in the diff.
9. The vendored surface is coherent: `configs/policy.ts` is in `HOST_PATHS`; every other changed
   vendored file was already a member; the new tests assert on rule ids and messageIds, never
   message text. Name a vendored-surface incoherence beyond the already-recorded unmeasured fleet
   violation counts.
10. The change is coherent as a whole — would you ship this to the fleet? (Subjective lane
    primary; the objective lane still answers it.)

## Unknowns

- Fleet-wide violation counts outside this repository remain unmeasured (recorded as a rollout
  prerequisite in the adoption report). Do not attempt to settle them; a claim that depends on
  them is UNRESOLVED with that named.

## Execution and probes

Auditors edit no source and spawn nothing. The subjective lane cannot execute; rule on the
supplied executed evidence and on what you read. The objective lane may run read-only commands in
the checkout; it must not write files (its sandbox refuses anyway) — where an attack needs a new
executed probe, state the exact probe as what would settle it and mark the claim UNRESOLVED rather
than guessing. Do not run whole-tree mutating commands; do not run `npm test`.

## Output

Exactly the verdict shape of `orkestrel-falsify`: numbered verdicts 1–10 in order, findings
outside the claims (substantiated to the BROKEN standard only), and the single terminal line.
No process diary.
