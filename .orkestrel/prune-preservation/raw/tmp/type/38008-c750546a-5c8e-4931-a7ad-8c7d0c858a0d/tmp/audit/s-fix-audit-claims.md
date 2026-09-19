# Scaffold fix round S4 and S5 — audit claims

## Subject

The fix round of the S audit (`.orkestrel/campaign/s-audit-verdict.md`), in the scaffold checkout
`C:/Users/mikes/WebstormProjects/scaffold`, branch `main`:

| Round | Writer                  | Baseline   | Checkpoint  | What it claimed to close                                                                                                                       |
| ----- | ----------------------- | ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| S4    | `sol` (`gpt-6-astra`)   | `0d03ec79` | `bfc4ef5f`  | Claims 1, 7, 10, 23 and F1, F4: the `new` default, the `--config` reader and the two question arms, the `appJourney` pins, two TSDoc blocks, the guide |
| S5    | `opus`                  | `bfc4ef5f` | `24285b95` | Claims 5, 12, 16, 17, 18, 19, 20, 22, 23 and F2, F3: the skill, `ROADMAP.md` row 36, the engine paragraph of the guide, the cp1252 rule       |

S4 ran as two dispatches: round 1 stopped on ownership (`s4-report.md`); round 2 landed
(`s4-brief-2.md`, `s4-report-2.md`). The tip under audit is `24285b95`. The diff of the fix
round against `0d03ec79` is at `tmp/audit/s-fix-audit-diff.patch`.

## What the round decides

Whether the S audit's findings are closed and `@orkestrel/scaffold` 0.0.74 ships with this tree.
Where a fix adopted a lane's prescription verbatim, the Orchestrator's mutation probe closes it and
the claim here asks only whether the adoption is faithful; where a fix departed, the claim attacks
the ruling itself.

## Already established — verified by the Orchestrator directly, not taken from a writer

- The S audit's reproductions (`.orkestrel/campaign/s-audit-reproduction/`): the fresh-workspace
  probe, the wrapper deletion probe, the two `appJourney` mutations, the cp1252 write-path
  experiment.
- The Orchestrator's gate reading over S4's tree after the build (`tmp/verify/s4-gates-summary.txt`):
  every stage exit 0; `bin` reads `262 passed (262)`, `config` `173 passed | 1 skipped (174)`,
  `setup` `162 passed | 3 skipped (165)`, `core` `425 passed (425)`, `guides` `23 passed (23)`,
  `policy` `110 passed (110)`.
- S4's own control readings (`s4-report-2.md`): the `new` case red before ruling 1 and green after;
  each question arm red (`questions: []`) before ruling 2 and green after; the `templates.test.ts`
  pin red under each of the two mutations and green restored; the unknown answered — the existing
  `differing` question did not report the missing invocation before the edit.
- The Orchestrator's own re-run of the two `appJourney` mutations against the landed pin:
  `tmp/audit/s-fix-c7-mutations-summary.txt` (A_core_EXIT=1 A_bin_EXIT=0 A_config_EXIT=0 B_core_EXIT=1 B_bin_EXIT=0 B_config_EXIT=0 base_core_EXIT=0 base_bin_EXIT=0 base_config_EXIT=0 ).

## Review evidence

- The diff against `0d03ec79`: `tmp/audit/s-fix-audit-diff.patch`; `git status --short` at the
  tip: `tmp/audit/s-fix-audit-status.txt`.
- The writers' reports: `.orkestrel/campaign/s4-report-2.md`, `.orkestrel/campaign/s5-report.md`;
  their briefs `s4-brief.md`, `s4-brief-2.md`, `s5-brief.md`.
- The verdict this round closes: `.orkestrel/campaign/s-audit-verdict.md`; the lane reports it
  rests on: `s-audit-objective-report.md`, `s-audit-subjective-report.md`.
- The tree at `C:/Users/mikes/WebstormProjects/scaffold`.

## Numbered claims — attempt to refute each

### S4 — the generator

1. **The birth default is D17's rule and nothing wider.** `new --app browser` selects `journey`
   (`src/bin/CLI.ts` `#create`); `new --app core`, `new --src browser`, and `new --bin` do not;
   the library `createBlueprint` default stays `false`; every fixture manifest and snapshot that
   carries a browser application moved with it, and none that carries no browser application
   moved. Attack: a `new` that names `--app browser,server` or `--app core,browser`; a blueprint
   built through `buildBlueprint` in a test that assumed the old default.
2. **The `--config` reading is literal and complete.** `scriptToInvocations` reads `--config X`
   and `--config=X`, keeps command order across mixed `--project` and `--config` tokens, refuses
   an unresolved value in either spelling, and answers `undefined` for a dangling `--config`.
   Attack: `--config` followed by a quoted path with spaces; `--config=` with an empty value; a
   `--config` inside a `&&`-joined second command; `--configuration` and `--config-file` (must not
   match); a `-c` short form (not read — is that stated?).
3. **The question arms fire exactly when the manifest and the wrapper disagree.** The absent
   configuration arm fires for a `test:*` script naming a `--config` path the plan does not emit and
   the target does not hold, and not for a path the plan emits or the target holds; the missing
   invocation arm fires when the plan emits `test:journey` and the `test` chain does not invoke it,
   and not otherwise; both are non-blocking, in the `configs` group, and neither `audit` nor `repair`
   rewrites the manifest. Attack: the wrapper present and `test:journey` deleted from the manifest
   (which arm fires, if any?); a `test` chain invoking `test:journey` through a quoted or
   `&&`-split form; a scoped run with `--groups tests` (the question must not appear); a target
   holding the wrapper under wrong case.
4. **The arms are one question, not two.** Both land in the `projects` field the existing manifest
   question owns, so a consumer reading `audit.questions` by field sees one entry per fact and no
   duplicate when the absent-project condition also holds. Attack: a manifest with both an absent
   project and an absent configuration — is one reported and the other lost?
5. **The pins bind.** `tests/src/core/templates.test.ts` matches the `appJourney` factory body
   alone (`/export function appJourney\([^]*?\n\}/u`) and asserts its `include` and
   `enabled: true` inside it. Attack: a mutation that moves `enabled: true` into the `appBrowser`
   factory and deletes it from `appJourney` — does the regex still capture only `appJourney`? A
   second function declared between the factory's signature and its closing brace.
6. **The TSDoc blocks state the implemented rule.** `tests/setupServer.ts:1530-1532` names each
   form outside the reading with no count, and `tests/setupServer.test.ts` proves the
   member-expression `require` omitted; `tests/setupPolicy.ts:1289-1290` states the substring gate.
   Attack: another form outside `readSpecifiers`' reading the sentence still omits (a `require`
   aliased through destructuring, `import.meta.resolve`); a case the substring sentence claims
   that `:1307` does not implement.
7. **The guide is true.** Every sentence S4 added to `guides/scaffold.md` (the `new --app browser`
   paragraph, the invocation-reader table, the question paragraph, the `journey` flag paragraph)
   names behaviour the CLI has, and each Summary cell equals its doc block. Attack: "Reading verbs
   infer it from the wrapper's presence" against `#derive`; "remain report-only during `repair`"
   against the `repair` path; the sentence "A configuration emitted by the plan or present in the
   target does not raise the absent configuration advisory" against a wrong-case path.
8. **Would you ship the generator?** A workspace born today, repaired tomorrow after its owner
   deletes the wrapper, and audited the day after — name the first message that misleads its owner.

### S5 — the skill, the plan of record, the rule

9. **The engine condition has one home and the pointers are true.** The condition lives in the
   emitted `configs/browsers.ts` doc block (`src/core/templates.ts:1141-1143`, unchanged) alone;
   `SKILL.md`'s Accept paragraph, `guides/scaffold.md`'s journey paragraph, and `ROADMAP.md` row 36
   point at it without restating it, and row 36 states a closing condition a reader can check.
   Attack: another spelling of the condition anywhere in the tree outside `.orkestrel/` and
   `tmp/` (the `grep "declared size"` reading catches one spelling); a pointer that names the
   wrong home.
10. **Every voice has one home and reads as shipped.** `references/layer.md` → The failure voices
    names where the statechart and capture voices live, and its storage rows read
    `Access is denied for <operation> "<key>"` for a keyed operation and
    `Access is denied for <operation>` for an unkeyed one, matching `buildDenial` in
    `node_modules/@orkestrel/test/dist/src/browser/index.js`. Attack: a voice stated in two
    references; a storage operation the split misnames (`clear`, `key`, `length`).
11. **The ban rows name replacements that perform the act.** A router navigation → the visible
    link or control through `clickAccessible` or `clickAccessibleWithin`; a store or route state
    read standing in for a rendered assertion → the readers; the corroboration bullet admits a
    read and never a router call. Attack: a navigation with no visible control on the surface
    (arrival at a deep route) — does the skill route it through the entry mount rather than a
    router call, consistently across `SKILL.md` → Derive journeys from intents and `layer.md`?
12. **The Accept bullet and the title sentence are as prescribed.** The matrix bullet requires each
    style reading's published control and the contrast control straddling its bar; the title
    sentence compares `document.title` against the product guide and reports a guide with no
    title as a product finding. Attack: an Accept bullet that still names a proof no section
    instructs, or a sentence that still fixes a product decision.
13. **The fresh-workspace teaching is true of the generator S4 landed.** `SKILL.md` states that a
    browser application born by `scaffold new` carries the wrapper, `appJourney`, `test:journey`,
    and the chain invocation; that a workspace born earlier writes the wrapper and runs
    `scaffold repair`; that writing `tests/setupBrowser.test.ts` and running `scaffold repair`
    registers `setup:browser` and emits `test:setup:browser`, while the `test` chain stays the
    adopter's to extend and `scaffold audit` reports the unreached project; and the `scaffold audit`
    table quotes the two journey questions as `src/bin/CLI.ts` composes them. Attack: each quoted
    message against the template literal in `CLI.ts` (`:1071`, `:1133`); the `setup:browser`
    sentence against `#projectQuestion` — does `audit` report `setup:browser` as unreached when
    `test:setup:browser` exists and `test` does not invoke it, or does the `ungated` filter
    silence it?
14. **The cp1252 rule is a directive and states no more than was measured.** The paragraph at
    `.agents/transports/codex.md` § Sol route names the trigger (a line carrying a code point
    above `0x7F`), the action (the patch tool, never `Get-Content`, `Set-Content`, `Out-File`, or a
    `>` redirection), the report the unit owes, and the review criterion (the set of code points
    above `0x7F` on each touched line, before and after). Attack: the opening clause "a
    text-encoding shell write replaces a code point above `0x7F`" as a universal the experiment did
    not measure (`c20-write-paths-summary.txt` measured the patch tool and a byte-level write
    preserving the code points, and no text-encoding write at all) — is it stated as the hazard or
    as a fact?
15. **The skill is an instruction file.** No sentence restates a law from `AGENTS.md` or a rule
    file (the instrument law, the red-first law, the design laws are pointers now); no count; no
    reassurance clause; the worked table opens with a directive; every reference is named from
    `SKILL.md` and exists; the bridge and `agents/openai.yaml` hold parity. Attack: a sentence the
    S5 sweep left that explains, persuades, or restates.
16. **F2 and F3 landed.** The capture instruction sets `CAPTURE` to `1` in the reader's own shell
    with no shell syntax, in `SKILL.md` and `captures.md`; `styles.md` names `refused` and
    `accepted`. Attack: a remaining POSIX-only line anywhere in the skill.
17. **The skill and the generator are coherent. Would you ship this?** A reader following
    `SKILL.md` in a workspace born by `scaffold new --app browser` today, and another following it
    in a workspace born before this release, each reach a green `npm test` by the steps the skill
    names, and each `scaffold audit` question they meet is one the skill described. Name the first
    sentence that misleads either reader.

## Unknowns

- No unit has run the emitted browser root or the journey wrapper under a real browser; the
  roughnotes adoption unit takes that run. A claim needing it is UNRESOLVED with the command.
- The audit lanes hold no write tool and a read-only sandbox. Name a vector you could not run as
  UNRESOLVED with the exact command and fixture; the Orchestrator runs it and returns the output
  before ruling.

## The threshold

A finding is worth more than a clean pass: this is the tree 0.0.74 ships, and a fix round's own
rulings are the freshest and least-examined surface in it. CONFIRMED requires naming the attack you
tried that failed. A claim you cannot decide is UNRESOLVED, not CONFIRMED — say what would settle
it. Assume this chain has one more. Do not hedge toward an imagined consensus.
