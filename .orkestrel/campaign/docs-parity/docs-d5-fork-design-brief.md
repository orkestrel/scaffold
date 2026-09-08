# Design brief — where the documentation-parity seed lives (the D5 fork)

## Lanes

Two adversarial lanes, blind to each other, clean contexts, one brief: the subjective lane (`planner`, Opus 5 — the shape, the names, the ergonomics of running it in every workspace) and the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench — what the code, the rules, and the package graph permit and forbid, the costs, numbered falsifiable claims). The dispatch names which lane you hold. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing. Rule on every option from your lane.

## The question

Unit D5 built the documentation-parity seed as `scripts/docs.ts`, a `HOST_PATHS` row vendored byte-identical into every scaffold target, importing `@orkestrel/guide`. `.claude/rules/workspace.md:77-79` forbids that pairing — a vendored byte-identical file imports no `@orkestrel/*` package, because every such package is itself a target and cannot depend on itself — and `tests/src/server/helpers.test.ts:173-199` is that rule's gate. The guide package (`/home/user/fleet/guide`) is a target: it carries the vendored `scripts/*.sh` set, its manifest declares no `@orkestrel/guide` dependency, and its own `tests/guides.test.ts:4` substitutes `@src/core` for the package name. Where does the seed live so that every target, the guide package included, runs it, without weakening the rule or its gate?

## The evidence

- The rule and its gate: `/home/user/scaffold/.claude/rules/workspace.md:70-79`; `/home/user/scaffold/tests/src/server/helpers.test.ts:173-199`.
- The seed as landed and its report: `/home/user/scaffold/scripts/docs.ts` (the header states its self-containment); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-scaffold-seed-report.md` (§ The deviation, § The seed's command shape and output, § Decisions the deviation contract left me); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-scaffold-seed.diff.txt`.
- The verb law and the CLI: `/home/user/scaffold/guides/scaffold.md:470-500` ("Authority is the verb's: every verb except `audit` writes when it is typed, and no option grants a write"; exit codes `0` clean, `1` drift or failure, `2` usage; `--target`; `--json`); `/home/user/scaffold/src/bin/main.ts`, `src/bin/CLI.ts`, `src/bin/types.ts`, `src/bin/constants.ts`; `/home/user/scaffold/README.md` § `repair` ("A file the workspace owns — its source, its own proofs, its README — is written once at creation and is never rewritten here").
- Origins and ownership: `/home/user/scaffold/guides/scaffold.md:955-990` (`content`, `presence`, `birth`, and the presence mechanisms); `/home/user/scaffold/src/core/types.ts` (`Ownership`, `Origin`, `Artifact`); `/home/user/scaffold/src/core/compilers.ts:895-1115` (the template artifacts: `tests/distribution.test.ts` presence-owned at `:907` region, `tests/guides.test.ts` birth-owned at `:1100-1111`); `/home/user/scaffold/src/core/templates.ts` (per-workspace template text); `/home/user/scaffold/tests/src/core/Compiler.test.ts:62-75` (the artifact tally the `HOST_PATHS` row moved).
- The package graph: `/home/user/scaffold/package.json` (runtime `dependencies`: `@orkestrel/console`, `@orkestrel/contract`, `@orkestrel/emitter`, `@orkestrel/markdown`, `@orkestrel/process`, `@orkestrel/template`; `@orkestrel/guide` is a devDependency); `/home/user/fleet/guide/package.json` (runtime `dependencies`: `@orkestrel/contract`, `@orkestrel/markdown`; `exports` carries `.` and `./package.json`; `@orkestrel/scaffold` is a devDependency); `/home/user/fleet/guide/guides/guide.md:1-8` (the tagline: a pure, I/O-free toolkit); `/home/user/scaffold/.agents/orchestration.md` § Publishing the fleet (scaffold sits outside the runtime order and propagates as files; what a runtime bump obliges).
- The direction and the exit criterion: `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` (Ruling 6: the `Summary` cell adopts the doc block's verb-first sentence; the pitch equals the tagline and is authored by hand); `/home/user/scaffold/.orkestrel/campaign/docs-parity/plan.md` (decision 4: the guide fence wins on an example; § Exit criterion: "`npm run docs` propagating in each direction with the gate calling no writer"); `/home/user/scaffold/.claude/rules/documentation.md:35-39` (the vendored bullet that names `npm run docs`); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-audit-subjective.md` § F4 (the gate's assertion output is not a readable worklist; the seed's report mode is).
- The laws: `/home/user/scaffold/AGENTS.md` § Non-negotiable rules (no npm package without the user's request; no compatibility shims; mechanism, not product policy; minimal public API) and § Design laws.

## The options, each to be ruled on

1. **A presence-owned template artifact.** `scripts/docs.ts` becomes a `template` artifact the compiler writes per workspace (the shape `tests/distribution.test.ts` takes), importing `@orkestrel/guide`; the guide package edits its own copy to import its own built entry, the way it edits `tests/guides.test.ts`; a later seed change reaches a target by delete-and-repair, never by `repair` alone. The `HOST_PATHS` row and the gate collision go away; the tally case moves back.
2. **A seed that names its readers' module at run time.** The seed imports no `@orkestrel/*` package; the manifest script passes the module — `docs: node --experimental-strip-types scripts/docs.ts @orkestrel/guide` in a target, the built entry in the guide package — and the seed `import()`s it and narrows the result with a structural guard. Rule on where the guide package's different argument comes from (the compiler, or a hand edit `repair` then refuses to rewrite) and on what the seed's typing costs at that seam.
3. **A `scaffold` verb.** The seed's logic moves into `src/server` as a class with a `src/bin` verb; `@orkestrel/guide` moves from `devDependencies` to `dependencies` (its runtime closure — `@orkestrel/contract`, `@orkestrel/markdown` — is already scaffold's); the manifest script becomes `docs: scaffold docs` or the script goes away; every target receives a seed change with the scaffold release; the guide package runs the readers scaffold installs from the registry, one release behind its own tip. Under the verb law no `--to` option can exist, so rule what the verb writes: the direction fixed per kind by Ruling 6 and decision 4 (summaries from the source to the guide, examples from the guide to the source, the pitch reported), and whether the report mode is `audit` (whose findings are artifact paths, not cells) or another shape. A runtime dependency change in the published scaffold is the owner's to confirm; state what they must confirm.
4. **A bin in `@orkestrel/guide`.** The guide package gains a server layer and a `bin`; every target's `docs` script calls it. Rule it against the guide's I/O-free tagline and its `exports`.
5. Any shape the lane finds that the preceding four miss.

## Constraints every option must meet

- `.claude/rules/workspace.md:77-79` and its gate stay as they are.
- No npm package the tree does not already carry.
- The seed's behaviour as D5 measured it (the report lines, the exit codes, the miss reasons, the fixture cases) is the substance to keep; its home is what changes.
- The campaign's exit criterion keeps a `docs` manifest script in every workspace with guides, whatever it invokes.
- The guide package can run the seed over its own guide in its own checkout.

## Output

- **Subjective lane:** the recommended shape with one paragraph of rationale; every other option ruled with its cost; the names (single-word, per `.claude/rules/names.md`) the shape needs; what the D5-fix unit owns and what it deletes from D5's landing; the acceptance criteria; what the owner must decide, if anything.
- **Objective lane:** per option, what the code and the rules permit and forbid with `file:line`; the costs, cited; the measurements missing before the shape can be briefed, each with the command that takes it; numbered falsifiable claims the chosen shape must survive; the risks the subjective lane is likely to understate.

No process diary. Perform the assignment directly and spawn nothing.
