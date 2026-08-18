# Objective lane report

## K1 — CONFIRMED, with a narrow claim

Refutation attempt: I looked for existing frontmatter enforcement and tested the vendor regex against the current family.

`inspectSkill` reads `SKILL.md` only to extract `references/*.md`; it never parses frontmatter (`tests/setupPolicy.ts:997-1048`). Its valid fixture is merely `# Skill\n`, which proves frontmatter is currently outside the instrument (`tests/setupPolicy.ts:54-58`, `1350-1418`). This misses the explicit contract in `.claude/rules/documentation.md:64-67`.

Adopt:

- Require frontmatter.
- Require exactly `name` and `description`.
- Require a non-empty description.
- Require a positive lexical trigger clause.

Concrete lexical floor:

```text
Positive: \buse (?:this )?(?:for|when|before|after|during)\b
Negated-only forms do not satisfy it.
```

Call this “contains a positive trigger clause,” not proof that the description is semantically trigger-focused. Controls produced:

- `Build polished interfaces with Bootstrap.` — FAIL
- `Do not use when changing APIs.` — FAIL
- `Use for anything.` — PASS

The last control establishes the limit: the check is non-vacuous, but it cannot judge trigger quality. Drop any stronger claim.

The upstream regex omits `Use for` (`scripts/lib/skill-lint.js:34-40`), so it would wrongly reject three current skills. Do not copy it verbatim.

Current descriptions under the proposed check:

- `enterprise-bootstrap` — PASS — “Design and build distinctive, production-grade user interfaces with Bootstrap 5.3 and intentional frontend craft. Use for ANY UI work — creating, restyling, reviewing, or extending pages, screens, components, layouts, app shells, dashboards, admin panels, SaaS tools, data tables, filter bars, forms, wizards, navigation, modals, empty/loading/error states, dark mode, marketing surfaces — whenever the task touches HTML/CSS/visual design, mentions Bootstrap or its components, or must look professional and avoid templated defaults. Covers aesthetics, typography, color modes, design tokens, accessibility (WCAG 2.2 AA), responsive layout, and enterprise app patterns.”
- `orkestrel-align-packages` — PASS — “Audit and improve how two or more Orkestrel packages, or their core, server, browser, and app environments, fit together. Use for coordinated package-stack refactors, cross-package extraction, developer-ergonomics reviews, end-to-end or live integration testing, dependency and guide alignment, and fleet/package-manager campaigns. Preserve host-independent core boundaries, update dependents topologically, and use the package-hardening workflow for each implementation unit.”
- `orkestrel-build-application` — PASS — “Design, scaffold, extend, or harden Orkestrel `app/core`, `app/browser`, and `app/server` environments. Use for app-only or mixed src/app workspaces, app environment isolation, Vue browser entries, Node server entries, app aliases/configs/scripts/tests, cross-environment contracts, and application guide parity.”
- `orkestrel-debrief` — PASS — “Look back at a long campaign to learn from its mistakes and successes and improve the agents, rules, skills, and processes that ran it. Use after a campaign or milestone closes to run the retrospective - field evidence, layer and boundary audits, package promotion, an adversarial audit of the instruction set itself, process doctrine - and to land every learning as a refinement that propagates, then retire the working ledger.”
- `orkestrel-falsify` — PASS — “Run an adversarial audit round against work that already looks finished — write the subject as numbered falsifiable claims, dispatch independent auditors instructed to break them rather than confirm them, reconcile their evidence, and rule. Use before accepting a fix round, before a version bump or publication, when green gates are the only evidence a change works, when a defect has recurred across rounds, or whenever a review would otherwise read a diff and agree with it.”
- `orkestrel-harden-package` — PASS — “Research, audit, refactor, implement, centralize, test, document, and locally verify an individual Orkestrel TypeScript package to enterprise-grade production readiness under the repository's current AGENTS.md. Use when asked to fill missing or deferred capabilities, compare upstream or legacy implementations, salvage prior art, centralize source or test declarations, eliminate nested functions or superfluous wrappers, maximize declared @orkestrel dependencies—especially @orkestrel/contract—or add rigorous real-implementation and live-service tests. Select only the phases required by a narrow request; run the full workflow for production readiness or comprehensive hardening.”
- `orkestrel-human-journey` — PASS — “Prove a browser application the way a person uses it — real keystrokes, clicks, and Tab/Enter against only what is visible and reachable — and generate the capture portfolio from those same journeys. Use when accepting a UI build, proving an application end to end, deciding whether a surface is reachable by keyboard alone, proving what a screen refuses as well as what it does, auditing whether the interface speaks the user's vocabulary rather than the engine's, producing the screenshots a design review judges, or whenever the only evidence a screen works is a test that drove it through JavaScript instead of through the interface.”
- `orkestrel-polish-surface` — PASS — “Drive a rendered or externally driven surface to shipped quality through capture-evidence verdict rounds. Use when asked to polish an interface, bring a rendered surface to enterprise grade, judge what actually renders rather than what the source claims, reconcile design, state-truth, and inventory findings into fix units, or converge repeated review rounds on captured proof. Run one round for a narrow request; run the full campaign for a polish or production-readiness request.”

Lengths range from 312 to 683 characters. A 1,024-character limit would pass all eight, but no repository rule specifies that number. Reject the cap as imported policy.

## K2 — BROKEN

Refutation attempt: I inspected all enforcement scripts in both subjects and compared their checks with the current policy instrument.

Two additional structures clear the constraint:

1. Frontmatter identity. The upstream linter requires `name` and checks it against the directory (`scripts/lib/skill-lint.js:138-170`). Our canon requires a `name` field and names the directory token in `default_prompt` (`.claude/rules/documentation.md:66,71`), while `inspectSkill` checks neither. Adopt name presence, exact key-set enforcement, and `name === directory`.

2. Canonical-to-provider bridge parity. The command validator demonstrates set-parity checking across harness representations (`scripts/validate-commands.js:99-177`). Our canon already requires each provider bridge to load one canonical workflow and add no competing instructions (`.claude/rules/documentation.md:72`; `CLAUDE.md:38-39`). The policy suite explicitly excludes `.claude/skills` instead of checking that contract (`tests/setupPolicy.ts:1431-1437`). A read-only set comparison found all eight current bridge names aligned; adding `negative-control-bridge` was detected. Each current bridge contains exactly one pointer to its matching canonical `SKILL.md`.

Adopt a tailored bridge-family check: equal directory sets, one matching canonical pointer, and no auxiliary bridge files. Do not import the vendor command directories or validator unchanged.

No further qualifying mechanism was found beyond K1, frontmatter identity, and bridge parity.

## K3 — CONFIRMED

Refutation attempt: I searched our canon for a required skill section set and tested the vendor headings against every current canonical skill.

No such section contract exists. `.claude/rules/documentation.md:62-72` specifies process/content separation, concision, references, frontmatter, metadata, and bridges without prescribing headings. Every current skill lacks all five vendor headings.

The upstream itself calls the layout recommended (`docs/skill-anatomy.md:37-39`) while its linter makes the headings mandatory (`scripts/lib/skill-lint.js:42-60,189-206`). Reject the section set as foreign policy.

## K4 — CONFIRMED

Refutation attempt: I searched the canon for routing accuracy, rank, collision, cosine, TF-IDF, or eval-case obligations. None govern skills.

The upstream calls its deterministic routing layer its own addition and a lexical approximation (`evals/README.md:12-22`). Its runner implements weighted lexical ranking and cosine thresholds (`scripts/run-evals.js:57-149`) and CI gates it (`.github/workflows/test-plugin-install.yml:31-35`).

Reject. This is a new capability, not enforcement of an existing convention.

## K5 — CONFIRMED

Refutation attempt: I checked whether the invocation fields could fit the existing metadata schema without changing canon.

They cannot. Matt Pocock’s convention adds `disable-model-invocation` and `policy.allow_implicit_invocation` (`.agents/invocation.md:3-10`). Our contract requires exactly three `interface` keys (`.claude/rules/documentation.md:69-71`), and `parseSkillPrompt` rejects any shape other than those exact four lines (`tests/setupPolicy.ts:942-953`).

Reject until canon explicitly adds an invocation axis.

## K6 — BROKEN as an aggregate

Refutation attempt: I checked each listed mechanism for either an existing subject or an already-owned mechanism.

Reject unchanged:

- `.out-of-scope/` and ADR directories: repository decisions belong in rules, guides, roadmap rows, or commit messages (`AGENTS.md:167`; `.agents/orchestration.md:389-403`).
- Human-doc mirrors: no current convention requires a second documentation surface for skills.
- Manifest version parity: the subject repositories’ copied plugin versions have no equivalent current skill-family subject.
- Literal command parity: `commands/`, `.claude/commands/`, and `.gemini/commands/` are absent.
- Session-start skill injection: no canon requires eager workflow injection.
- Symlink installers: propagation already belongs to `HOST_PATHS` and `Materializer.repair` (`src/core/constants.ts:109-156`; `src/server/Materializer.ts:240-275`). The vendor script also deletes non-symlink occupants before linking (`scripts/link-skills.sh:44-54`).

The aggregate rejection is nevertheless BROKEN because the command-parity structure has a valid adapted subject: canonical skill ↔ provider bridge parity, as ruled under K2. Reject the vendor validator as-is; adopt only that tailored structural lesson.

## K7 — CONFIRMED

Refutation attempt: I looked for a workflow gap that would require importing their TDD, review, or specification bodies.

None was established. The governing rule expressly says skills prescribe reusable process and do not copy naming, placement, syntax, lifecycle, or test laws (`.claude/rules/documentation.md:64`). Their workflow bodies restate or replace laws already owned by `AGENTS.md` and `.claude/rules/*`.

Reject skill-content imports.

## K8 — CONFIRMED

Refutation attempt: I checked whether any adopted candidate requires secret handling, destructive installation, network hooks, or eager injection.

None does. The hostile surfaces are real:

- The wizard reads hidden input, writes environment entries, and sends repository secrets through `gh` (`skills/engineering/wizard/template.sh:113-153,189-201`).
- The symlink script removes an existing non-symlink target recursively (`scripts/link-skills.sh:44-54`).
- Optional cache hooks call remote URLs and write cache state (`hooks/sdd-cache-pre.sh:67-84`; `hooks/sdd-cache-post.sh:75-90`).
- The session hook injects a full skill at startup (`hooks/session-start.sh:18-25`).

Reject all four. Nothing analogous appears in the recommended frontmatter or bridge checks.