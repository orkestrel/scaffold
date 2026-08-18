# Adoption ruling: skills-repositories audit (campaign 2)

Reconciled by the Orchestrator from two blind lanes over one brief — `planner` (Opus 5,
subjective) and `analyst` (GPT-5.6 Sol, objective, journaled CLI thread
01a014ef-e95f-7d32-943e-3d3593d72760) — over the Grok absorption distillate. Subjects:
addyosmani/agent-skills and mattpocock/skills (both MIT). Standing constraint: adopt only what
enforces stated canon; spirit rulings where genuinely open, under the user's authorization.

## Adopt (all enforce sentences `.claude/rules/documentation.md` § Workflow skills already states)

- A1. Frontmatter checks in `inspectSkill`: frontmatter exists and parses; keys exactly `name` and
  `description`; `description` non-empty and carrying a trigger clause — a sentence beginning
  `Use ` (sentence-initial, case-sensitive, followed by a word). Reconciled from both lanes: the
  upstream regex family omits `Use for` and would wrongly red three healthy skills; sentence-initial
  `Use ` passes all eight and refuses negated forms. The violation message claims only what the
  instrument measures: a reach clause is present, not that it is good.
- A2. `name` equals the skill directory (spirit ruling, both lanes: the directory already fixes
  the family member and the `$token`; a third identity is drift by construction). Lands with its
  canon sentence in the same commit.
- A3. Description scalar shapes: exactly single-line or folded `>-` (the two shapes the family
  uses). The parser must not split lines on colons (the upstream parser's phantom-key defect).
- A4. Reference symmetry, both directions, one level: every `references/*.md` named in SKILL.md
  resolves (already enforced) AND every file under `references/` is named by SKILL.md; no
  subdirectories beneath `references/`. Live defect found and verified:
  `orkestrel-build-application/references/application.md` is orphaned.
- A5. No auxiliary README/CHANGELOG in a skill directory (canon states it verbatim; zero today).
- A6. Bridge contract, mechanized (spirit ruling on "bridges load one canonical workflow and add
  no competing instructions"): bridge set equals canonical set; each bridge carries its canonical
  twin's `name` and `description` verbatim; names its `.agents/skills/<name>/SKILL.md` path;
  carries no references of its own. Rule token `'bridge'`. Live defect found and verified: four of
  eight bridges carry drifted descriptions — the string the harness routes on
  (enterprise-bootstrap, orkestrel-align-packages, orkestrel-build-application,
  orkestrel-harden-package). Lands with its canon sentence in the same commit.

## Reject

- Length caps (platform budget, not our convention; a number in a gate becomes a target).
- Required-section sets (canon fixes no headings; their mandated sections are the prose class our
  instruction-files law deletes).
- Routing evals (new capability, no canon backing).
- `disable-model-invocation` / `policy.allow_implicit_invocation` (our openai.yaml contract is
  exactly three keys; widening needs canon first).
- `.out-of-scope/`, ADRs, human-doc mirrors, version/command parity validators as-is,
  session-start injection, symlink installers (each duplicates an owned mechanism or has no
  subject here; the command-parity idea survives only as A6's tailored bridge check).
- Skill-content imports (skills prescribe process; their bodies restate laws AGENTS.md owns).
- Their hostile surfaces (secret-writing wizard template, rm -rf symlink installer, network hooks,
  eager injection): nothing adopted touches any of them.

## Recorded open, review-owned

- Template-TODO sweep: no honest mechanical form (a healthy reference legitimately writes the word
  TODO). — Model-routing/version-catalog sweep: indistinguishable from cited upstream versions
  without a list that would itself be the forbidden catalog. — Strict directory inventory (would
  red `scripts/` in skills): canon does not state it.

## Rollout prerequisite

The touched surfaces are vendored (`.claude/rules`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`.agents/skills`, `.claude/skills` are all HOST_PATHS members): the change moves `dist/host` and
obliges a scaffold bump plus fleet re-pin/repair, sequenced with a per-target sweep of skill and
bridge members outside the vendored set. Fleet counts are unmeasured from this session.

---

# Implementation addendum (accepted campaign, same branch)

- Landed: the three canon sentences plus, from the audit round, the reverse reference-naming rule,
  the bridge-set symmetry rule, and the sweep's recorded body boundary (parity, path, and
  references are mechanical; the rest of a bridge body is review-owned); the four drifted bridges
  restored to byte-parity; the orphaned references/application.md folded and deleted, with the two
  clauses it alone carried housed in application.md (bare export is core API; app-only manifests
  omit main, module, types, export map, publish configuration) and one duplicate removed from
  orkestrel-align-packages' integration reference; the instrument — frontmatter parsing (two
  scalar shapes, quoted scalars refused as shape, folded paragraphs kept), exact keys, name equals
  directory, non-empty description, sentence-initial Use trigger (any non-whitespace token),
  reference symmetry both directions at one level, no auxiliary README/CHANGELOG, and the full
  bridge sweep under rule 'bridge' including bridge exact keys.
- Audit round: two blind lanes, both FAIL on first pass. Convergent break: the trigger matcher's
  \w boundary refused backticked tokens. Objective-lane breaks: folded blank-line refusal, two
  clauses lost by the deletion. Subjective-lane breaks: two instrument rules bound without canon
  sentences. Split-claim reconciliation recorded: the subjective lane's 129-line walk was right
  about the bulk of the deletion; the objective lane was right about the two lost clauses.
  Claim-8 closed with the 16-row mutation table: every assertion class disabled reddens exactly
  its paired control. Fixes adopted lane prescriptions verbatim and closed with those pins per the
  Falsification law's mutation-probe rule.
- Recorded limits: a vacuous "Use for anything." passes the trigger check (the message claims only
  presence); a bridge body naming its canonical path may still carry rival prose (review-owned,
  stated in documentation.md); no skill can illustrate a references/<name>.md example without
  creating the file (deliberate over-match, safe direction).
- Still open: fleet-wide skill/bridge members outside the vendored set are unmeasured; the release
  wave (scaffold bump, publish, re-pin + repair per target) is the user's decision. The two
  subject repositories' hostile surfaces were adopted nowhere.
