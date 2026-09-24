# Generates the W2 component briefs (Tab, Alert, Dropdown, Carousel, ScrollSpy, Toast, Modal) from one
# shared template plus a per-unit spec, following .agents/templates/brief.md's section and row
# headings verbatim and the J-COLLAPSE brief's shape. Usage:
#   python generate-w2-briefs.py <spec.json> <units dir> <base commit> <terrain record path>
# The spec is a JSON object keyed by unit id (tab, alert, dropdown, carousel, scrollspy, toast, modal),
# each value carrying: entity, constant (the {ENTITY} prefix), bootstrap (the Bootstrap source file),
# obligations (the ordered list of behaviours the unit implements, each a sentence naming the proof
# that pins it), cascade (a sentence on the key's presence and what the proof mounts), rulings (the
# R and E clauses that bind it), prior (the terrain record's pointers), unknowns (a list), owned_extra
# (extra owned files beyond the pattern), and departures (the departures the guide lists).
import io, json, pathlib, sys

spec_path, units_dir, base, terrain = sys.argv[1], pathlib.Path(sys.argv[2]), sys.argv[3], sys.argv[4]
spec = json.loads(pathlib.Path(spec_path).read_text(encoding='utf-8'))
U = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units'
E = 'C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine'

TEMPLATE = """# Unit J-{UNIT_UPPER} — the {Entity} engine, its delegate route, and its proofs

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/{unit}` (branch `unit/{unit}`, cut from Veneer `main` at `{BASE}`; E14).

## Objective

`{Entity}` (`src/browser/{Entity}.ts`) conforms to `{Entity}Interface` over the landed binder, with its delegate route, its default tables, its guard, its proofs on Chromium 153, and its guide subsection, so the `{Entity}` `plugin` row reads `shipped`.

## Context

**Evidence.** The W2 terrain record `{TERRAIN}` § {Entity} (one home for every measurement; where this brief and the record disagree, the record wins and the unit stops rather than resolving it): Bootstrap 5.3.8's behaviour with `file:line` in `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/{bootstrap}` (read for the behaviour, never for the names), the landed contract in `src/browser/types.ts` (`{Entity}Interface`, `{Entity}Options`, `{Entity}EventMap`, the `{Entity}ClassMap`, `{Entity}AttributeMap`, and `{Entity}SelectorMap`; locate by symbol), the rulings that bind it, the prior art, and the cascade. The landed engine pattern to follow: `src/browser/Collapse.ts` (the per-phase write doors through `#holds` and `#apply`, the `#change` identity, `HostSnapshot` saving before the first write, `settleAnimations` for completion, the sibling ownership, `readTag` in the constructor's error, `resolveVocabulary` and `resolveOptions` for the groups and options, `emitEvent` with `null` detail, `bindEventMap` for hooks, the `signal` option), `src/browser/Button.ts`, `src/browser/Delegate.ts` (`#activate`, `#conflicts`, `#routeButton`, `#routeCollapse`, `#mark`, `#acquire`, the observer release), `src/browser/helpers.ts`, `src/browser/validators.ts`, `src/browser/constants.ts` (`COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES`, `COLLAPSE_SELECTORS`, `COLLAPSE_EVENTS` as the table pattern), `tests/src/browser/Collapse.test.ts` and `Delegate.test.ts` (the proof shapes: custom-element reactions at the doors, the recorder, `scene`, the cascade mounted from `src/styles/components/_collapse.scss?inline`, the mutation each case distinguishes), and `guides/veneer.md` `#### Collapse` (the subsection shape).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md` (one class per file, flat at `src/browser/`), `patterns.md` (the Browser/DOM event variant), `tests.md` (real browser, trusted input through `userEvent` where the platform distinguishes it, `@orkestrel/test` recorders and waits, the mutation each assertion distinguishes), `documentation.md` (parity; the § Compatibility row rules), `writing.md`; skill: none; spec: `{E}/j-engine-design-verdict.md` {rulings}, § Amendments winning; E6 to E14 in `{E}/decisions.md` (E11 `.vn.` wire names; E12 as amended, the delegate's same-host refusal; E13; E14).

**Installed primitives.** `@orkestrel/contract` 0.0.18 (`isInstance`, `instanceOf`, `literalOf`, `Guard`, the `parse*` readers; `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`); `@orkestrel/test` 0.0.22 (`createRecorder`, `waitForCondition`, `waitForEvent`; `node_modules/@orkestrel/test/dist/src/core/index.d.ts`) and `@orkestrel/test/browser` (`build`, `mount`, `stageMedia`, `clickAccessible`, `waitForAnimations`); the landed `Registry`, `HostSnapshot`, `emitEvent`, `bindEventMap`, `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `readTag`, `resolveOptions`, `resolveVocabulary`, `parseElement`, and the validators in `src/browser/`. A helper, guard, wait, recorder, or deferred whose job an installed or landed export does is a defect; the audit's checker runs the export-name probe over the diff.

**Host.** Windows 11; Git Bash (`npm.cmd` and `npx.cmd` resolve as `npm` and `npx`); the worktree root; the browser project launches Chromium 153.0.8010.12 and every receipt names it; the platform floor is the Chromium family (E11); `npm run test:src:browser -- <file>` runs one file; no network needed. The `prove` MCP server is not reachable to a subagent; record that you made no call.

**Measurements.** The terrain record's § {Entity} rows and the J-ENGINE terrain record `{U}/j-engine-terrain-record.md` keys (`transition.*`); restate none, cite the key.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The element guard is `isInstance(x, HTMLElement)` from `@orkestrel/contract` 0.0.18 for every immediately invoked check you write, and `instanceOf(HTMLElement)` only as a predicate passed to `filter` or `find`; `Collapse.ts` and `Button.ts` at the base commit still use the invoked `instanceOf(HTMLElement)(x)` form, which J-ISINSTANCE swaps on `main` beside you, so do not copy that form and do not edit theirs. The event guards' class half reads `isInstance(value, CustomEvent)` where the typecheck admits it (report the reading). E6: no alias, re-export, `@deprecated` tag, fallback path, or wrapper survives a change. {cascade} `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits; a new export name is checked against `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` before it is declared. No `data-bs-config` is read (R11 as amended). No `.bs.` name is dispatched or listened for (E11). `npm run test:src:browser` prints one reported `SyntaxError` diagnostic from the landed `HostSnapshot` case that throws by design; the run passes. The delegate's routes in `Delegate.ts`, `src/browser/index.ts`, and `tests/src/browser/index.test.ts` are shared across the W2 units writing in parallel: edit them in this worktree (the unit's own route, export, and export-list entry) and expect the Orchestrator to resolve the mechanical merge at landing; edit no other unit's route.

**The obligations (each an edit and a proof, red first where the behaviour is new).**

{obligations}

**Departures the guide lists.** {departures}

**Prior art (read, copied nowhere).** {prior}

## Unknowns

{unknowns}

## Scope

**Owned.** `src/browser/{Entity}.ts` (new), `tests/src/browser/{Entity}.test.ts` (new); in `src/browser/constants.ts` the `{CONSTANT}_EVENTS`, `{CONSTANT}_CLASSES`, `{CONSTANT}_ATTRIBUTES`, `{CONSTANT}_SELECTORS`, and, where the entity has a default option value, `{CONSTANT}_DEFAULTS` rows; in `src/browser/validators.ts` `is{Entity}Event` and its test rows in `tests/src/browser/validators.test.ts`; in `src/browser/parsers.ts` a parser only where no `@orkestrel/contract` reader coerces the attribute, with its test rows; in `src/browser/Delegate.ts` the `{unit}` route reading `DelegateOptions.{unit}` and its cases in `tests/src/browser/Delegate.test.ts`; `src/browser/index.ts` and `tests/src/browser/index.test.ts` (the export list); in `guides/veneer.md`: the {Entity} rows under § Surface, the `#### \\`{Entity}Interface\\`` § Methods table where a summary changes, the {Entity} fence under § Examples, the `#### {Entity}` subsection under `## Engine` › `### Components` (host, the default tables beside the attribute table with option paths, events, the takeover reading, the delegate route, departures), and the {Entity} `plugin` row's Status, Proof, and Obligation cells.{owned_extra}

**Shared (report-only).** `src/browser/types.ts` (a summary or `@returns` sentence the implementation makes false: return an exact patch with the guide row parity compares); `ROADMAP.md`.

**Off-limits.** `src/browser/HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `ColorMode.ts`, `helpers.ts`, `Registry.ts`; every other unit's route in `Delegate.ts`; `tests/setupBrowser.ts` (report a needed helper as a patch); `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/src/styles/**`, `tests/service/**`, `src/styles/**`, `app/**`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`.

**What asserts the state this change ends.** `tests/src/browser/index.test.ts` (the export list grows; owned); `tests/src/browser/Delegate.test.ts` (a route case; owned); `tests/guides.test.ts` (every export documented; `report.drift`; `report.methods`) read-only, closed through the guide rows; `tests/conformance.test.ts` (reads the `plugin` row) read-only; `tests/policy.test.ts` read-only. Search bound: `grep -rn "{unit}\\|{Entity}\\|{CONSTANT}" src tests/src/browser guides/veneer.md` at dispatch.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build` (`npm run build:src:core`, `build:src:styles`, and `build:src:browser` are permitted for the conformance gate and reported). Scoped validation: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` (`--write` on your own TypeScript files where it fails; never on the guide); `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run test:conformance`. Write your instruments under `tmp/j-{unit}/` in the worktree; a mutation instrument runs each mutation over the whole test file (no `-t`), records every failing case, and restores the bytes with a digest receipt, as `tmp/j-collapse/mutations-3.py` did (read it from the retained copy `{U}/j-collapse-mutations-3.py`).

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: the files touched; per obligation, what was built and the case that pins it with its red reading (where the behaviour is new) and its green reading, verbatim; the Unknowns' answers; the mutation table copied verbatim from the instrument's log; the verbatim output of every acceptance command; `git status --short` and `git diff --stat`; every shared-file patch as an exact diff block; the deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — on a contract in `types.ts` the behaviour cannot satisfy, a platform reading that contradicts the terrain record, a shared file outside the report-only row you would have to edit, or a gate red you cannot close inside the owned files. Decide, record, and carry on from the order of cases in the test file, the wording of comments and guide sentences, and the placement of a guide paragraph inside the subsection.

## Acceptance criteria

1. `npm run check:src:browser` exit 0; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` exit 0; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` exit 0.
2. `npm run test:src:browser` green on Chromium 153.0.8010.12, with every obligation's case present and the new behaviours' red readings recorded before their fixes.
3. `npm run test:guides` green (every new export documented; the {Entity} fence imports through `@orkestrel/veneer/browser`); `npm run test:policy` green.
4. `npm run build:src:core`, `build:src:styles`, and `build:src:browser` exit 0, then `npm run test:conformance` and `npm run test:setup` green with the {Entity} `plugin` row reading `shipped`, Proof `tests/src/browser/{Entity}.test.ts` (the form the guide's Compatibility section requires of a shipped engine row), and the catalog's Obligation wording.
5. The mutation instrument's log carries one row per mutation over the whole file, every named case reddening, and the receipt `restored byte for byte`.
6. The status lists only owned files; every shared-file change is returned as a patch.

**Observations, not criteria.** The tree-wide `npm run check` and the whole-suite run, which the Orchestrator repeats on the merged tree.

## Review evidence

The actual diff (`git diff HEAD` with the new files intent-to-add) and `git status --short` of the worktree, captured by the Orchestrator as `j-{unit}.diff` and `j-{unit}-status.txt`, and the report; the audit runs `analyst` on Astra (objective: the sequences, the doors, the timing, the route, the proofs' binding) and `checker` on Sonnet (mechanical), with `reviewer` on Opus only where the API shape departs from the landed pattern.
"""

for unit, s in spec.items():
    obligations = '\n'.join(f"- **{unit.upper()}{i + 1}.** {o}" for i, o in enumerate(s['obligations']))
    unknowns = '\n'.join(f"{i + 1}. {u}" for i, u in enumerate(s['unknowns'])) or 'none'
    text = TEMPLATE
    for key, value in {
        '{UNIT_UPPER}': unit.upper(), '{unit}': unit, '{Entity}': s['entity'], '{CONSTANT}': s['constant'],
        '{BASE}': base, '{TERRAIN}': terrain, '{U}': U, '{E}': E, '{bootstrap}': s['bootstrap'],
        '{rulings}': s['rulings'], '{cascade}': s['cascade'], '{obligations}': obligations,
        '{departures}': s['departures'], '{prior}': s['prior'], '{unknowns}': unknowns,
        '{owned_extra}': (' ' + s['owned_extra']) if s.get('owned_extra') else '',
    }.items():
        text = text.replace(key, value)
    out = units_dir / f'j-{unit}-brief.md'
    io.open(out, 'w', encoding='utf-8', newline='\n').write(text)
    print('wrote', out)
