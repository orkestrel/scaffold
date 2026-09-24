# Generates one W2 unit's audit lane briefs (the objective lane on Astra and the checker on Sonnet; the
# subjective lane's brief only when asked with --reviewer) for a round, pointing every lane at the
# same claims file. Usage: python generate-w2-audit-briefs.py <unit> <Entity> <round> [--reviewer]
import io, pathlib, sys

unit, entity, rnd = sys.argv[1], sys.argv[2], sys.argv[3]
reviewer = '--reviewer' in sys.argv
U = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units'
E = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine'
sfx = '' if rnd == '1' else f'-{rnd}'
claims = f'{U}/j-{unit}-audit-claims{sfx}.md'
tree = f'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/{unit}'
common_subject = (f"The J-{unit.upper()} unit's round {rnd} in the worktree `{tree}` (branch `unit/{unit}`, cut from Veneer `main` at `e24e2c3`, the unit's edits uncommitted), briefed by `{U}/j-{unit}-brief{sfx}.md`. Review evidence, all under `{U}/`: the diff `j-{unit}{sfx}.diff` (`git diff HEAD` with the new files intent-to-add) and the status `j-{unit}{sfx}-status.txt`, the report `j-{unit}-report{sfx}.md`, the Orchestrator's run `j-{unit}-gates{sfx}.log.txt`, the unit's mutation instrument and log as the report names them (retained beside it as `j-{unit}-mutations{sfx}.py` and `j-{unit}-mutations{sfx}.log.txt`), the W2 terrain record `j-w2-terrain-record.md` § {entity}; the worktree's files (`src/browser/{entity}.ts`, `Delegate.ts`, `constants.ts`, `validators.ts`, `parsers.ts`, `helpers.ts`, `types.ts`, `index.ts`, `tests/src/browser/*.ts`, `guides/veneer.md`); Bootstrap 5.3.8's sources under `{tree}/node_modules/bootstrap/js/src/`; the design verdict `{E}/j-engine-design-verdict.md` and its § Amendments; E6 to E14 in `{E}/decisions.md`.")
established = (f"Verified by the Orchestrator directly in the worktree (`j-{unit}-gates{sfx}.log.txt`): the gates it lists with their exits; do not re-run them and do not report them as findings. The Orchestrator's replay of the unit's mutation instrument runs after the reading lanes return, so `j-{unit}-mutations{sfx}-orchestrator.log.txt` is absent while you read; record that clause `UNRESOLVED` and rule the rest of the claim.")

analyst = f"""# J-{unit.upper()} audit round {rnd} — the objective lane's brief

## Role and lane

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file; you hold the **objective** lane: the {entity} engine's sequences against Bootstrap's source and the platform's reaction ordering, its write doors and takeover reads, its timing, the delegate route and its marks under E12, the guard and the parsers, the proofs' binding (the mutation each case distinguishes), and the contract's truth in `types.ts`. The executor that opens this brief is the Astra engine inside its CLI. State your lane in your first line. The other lanes run blind, in parallel; do not read their verdicts and do not hedge toward an imagined consensus. Opus 5.5 wrote this unit; your engine did not.

## Subject

{common_subject}

## What the round decides

Whether the {entity} engine lands on Veneer `main` with its returned patches integrated, or which findings a fix round carries.

## Already established — do not re-run

{established}

## Claims

Rule on every numbered claim in `{claims}`, attempting refutation of each; the mechanism, proof-binding, and contract claims are the ones your lane decides, and on the guide and scope claims you rule from the source and refer an objective defect. Trace every show, hide, or change sequence door by door against `{entity}.ts` with a reaction at each write (a destruction, a re-entry, a token added or removed) and name any door that admits a state the call then writes over; trace the delegate route under nested roots, a destroyed delegate, and E12's same-host refusal; for every proof the report calls red-first, name the mutation that would make it fail and whether its assertions distinguish that mutation from the passing code, and where the report's only red reading is a whole-file mutation row, rule whether that row binds the proof. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. You may run `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` from the worktree and `npx.cmd tsc --noEmit` over a scratch file under the system temporary directory; you run no browser test, no build, and no mutation. Read the source with `Get-Content` or the exec's own file reads; `npm.cmd` is the npm entry in this shell and script execution is disabled for `.ps1` files. The `prove` MCP server is not reachable from this exec; record each refused call.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification; `architecture.md`, `patterns.md`, `tests.md`, `typescript.md`, `names.md`, `browser.md` in that folder; E6, E8, E9, E11, E12 as amended, E13; skill: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape. Report no prose finding unless the sentence states a fact the code or the platform contradicts.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write no file outside the system temporary directory.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence (`file:line`), findings fitting no claim, "Attacked and held", referrals, bounds, and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
"""

checker = f"""# J-{unit.upper()} audit round {rnd} — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

{common_subject}

## Claims

Rule on the mechanical clauses of every numbered claim in `{claims}` (the files present, the tables frozen, the export list exact, the case titles present, the rows and cells present, the greps as fixed) and on these items, one piece of evidence each (`file:line` or the grep): the status lists only the brief's owned files (name each) and no off-limits file; every case title the report names appears verbatim in the worktree's test files; every mutation row the report names appears in the instrument's log with the same failed count and named case, and the log ends with its digest receipt; no `.bs.` wire name is dispatched or listened for outside `constants.ts`' default attribute names and the guide's Bootstrap-side prose; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `{entity}.ts` holds one class plus imports; every immediately invoked element guard the unit added reads `isInstance(x, HTMLElement)`; the barrel exports exactly the names `tests/src/browser/index.test.ts` asserts; the guide's § Surface has one row per barrel export; every added Summary cell equals its description paragraph; every added summary opens with a third-person `-s` verb and does not name its symbol; the fence under § Examples imports from `@orkestrel/veneer/browser`; the `plugin` row reads `shipped` with Proof `tests/src/browser/{entity}.test.ts`; no term `writing.md` § Substitutions bans unconditionally appears in the added prose (name the pattern and the paths swept); every shared-file patch the report returns names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md`; the report records that no `prove` call was made. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `{E}/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on the claims' mechanical clauses (numbered as in the claims file), the checklist of items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
"""

reviewer_text = f"""# J-{unit.upper()} audit round {rnd} — the subjective lane's brief

## Role and lane

`reviewer` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; you hold the **subjective** lane: the `{entity}` class's shape against the landed pattern (`Collapse.ts`, `Button.ts`) and the design verdict, its private method set and terms, the option and vocabulary surface, the guide's `#### {entity}` subsection as a contract a consumer reads, the delegate route as an API, the shared patches' shape, and the case titles. State your lane in your first line and the model the alias served. The other lanes run blind, in parallel; do not hedge toward an imagined consensus. Your own engine (Opus 5.5) wrote this unit: attack it harder for that reason.

## Subject

{common_subject}

## Already established — do not re-run

{established}

## Claims

Rule on every numbered claim in `{claims}`, attempting refutation of each through your lane's lenses; the shape, naming, and guide claims are the ones your lane decides, and on the mechanism and proof claims you rule from the source and refer an objective defect. Read every added summary, remark, and guide sentence against `names.md`, `typescript.md`, `documentation.md`, and `writing.md`, and every departure against E9. `CONFIRMED` requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED` with what would settle it. You run no command. Report no prose finding: a wording you would change is a bound, unless the sentence states a fact the code contradicts or a fixed token or name the maps make replaceable.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/quality.md` § Falsification; `names.md`, `typescript.md`, `patterns.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`, `browser.md`; E6, E9, E11, E12 as amended, E13; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: numbered verdicts in the claims file's order with evidence; findings fitting no claim; "Attacked and held"; referrals; bounds; and exactly one terminal line, `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`, writing `none` in an empty slot.
"""

for name, text in [(f'j-{unit}-audit{sfx}-analyst-brief.md', analyst), (f'j-{unit}-audit{sfx}-checker-brief.md', checker)] + ([(f'j-{unit}-audit{sfx}-reviewer-brief.md', reviewer_text)] if reviewer else []):
    out = pathlib.Path(U) / name
    io.open(out, 'w', encoding='utf-8', newline='\n').write(text)
    print('wrote', out)
