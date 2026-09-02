# Unit FX2 report — fix round on `@orkestrel/test`

Role: `implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer.
Sole writer in `C:\Users\mikes\WebstormProjects\test`. Baseline `c98f3ba`, clean at dispatch.

## Outcome

F6, F1, and F5 are closed. The flagship-fence finding is falsified: that fence is already
transcribed and fully asserted in its routed carrier, so nothing was edited for it. Scoped gates are
green. No commit, no version change, no off-limits file touched.

## Findings

### F6 — an unprefixed build rejection

`executeScenarios` awaited `build(scenario)` outside any try, so a refusing builder propagated
verbatim: no row name, no `cause` wrapper, and for a non-`Error` throw no `Error` at all.

`src/core/helpers.ts` now builds inside a try and rethrows named for the row:

```ts
	for (const scenario of scenarios) {
		let context: TContext
		try {
			context = await build(scenario)
		} catch (cause) {
			throw new Error(`${scenario.transition.name}: build refused`, { cause })
		}
		await executeScenario(scenario, context)
	}
```

The `@throws` clause now states the `<name>: build refused` message, names the builder's refusal as
the `cause`, and keeps the `executeScenario` arm. A `@remarks` paragraph records that the refusal
arrives as the `cause` by identity.

**Message shape — recorded decision.** The brief offered `${transition.name}: build refused: ${message}`
or "the shape the existing phase voices use". I shipped `${transition.name}: build refused` with the
refusal as the `cause`, and no rendered message inlined. Inlining the message needs the
`cause instanceof Error ? cause.message : 'threw a non-error ' + typeof cause + ' value'` rendering
that `executeScenario` already owns, and a second copy of it is the near-duplicate helper
`.claude/rules/architecture.md` § Kind purity calls a defect. The two lawful ways out of that
duplication both cost more than the finding: fold it (impossible at two call sites) or extract,
export, and document a new public helper, which `src/core/index.ts` star-exports into the published
surface and which the brief did not authorize. The shipped shape satisfies acceptance criterion 1 —
the row name is in the message, the original is the `cause` — keeps one rendering site, and adds
nothing to the published API. Rule on this if you want the message inlined; it is a one-line change
plus a new export and a guide surface row.

`guides/test.md` § "Drive a statechart table" now states the builder case in prose, demonstrates it
in the existing fence, and states the `cause` claim beside the phase claim.

### F1 — stale skill name

`guides/test.md` line 1205 now names `orkestrel-prove-journey`. Verified against
`scaffold/.agents/skills/`, which carries `orkestrel-prove-journey` and no `orkestrel-human-journey`.

Sweep of the checkout, excluding `node_modules`, `.git`, and `dist`:

```
$ grep -rn "orkestrel-human-journey" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist
./tmp/units/fix-test-brief.md:28:- **F1.** `guides/test.md` 1205 names `orkestrel-human-journey`; the skill is
```

The only remaining hit is the brief quoting the defect. No tracked file carries the stale name.

### Flagship fence — falsified, no edit

The `readClasses` / `extractStyles` fence is under `### Read the classes and styles the markup
carries`. That heading is routed, not transcribed here: `tests/setup.ts` maps it to
`tests/src/browser/helpers.test.ts` in `ROUTED_FENCES`, because the `guides` project runs in Node
with the browser disabled and both readings need a real DOM.

The routed carrier at `tests/src/browser/helpers.test.ts:2283` asserts every value the fence prints:
`authored.has('card')` true, `authored.has('lead')` true, `undeclared` exactly `['lead']`, and
`extractStyles(section)` exactly the two markup strings. The heading-totality case in
`tests/guides.test.ts` proves the marker line is present in that carrier.

Transcribing it a second time in `tests/guides.test.ts` is impossible (no DOM in that project) and
would duplicate a proof that exists. No edit made.

### F5 — why the reading is not `extractEscapes`

Added to `guides/test.md`, closing the `### Read the classes and styles the markup carries` section:

> The `extractStyles` reading is named for what it returns rather than `extractEscapes`, because the
> `escape` term already carries the encoding sense in the `@orkestrel/html` and `@orkestrel/console`
> packages.

Verified against the installed packages before writing it:
`node_modules/@orkestrel/html/dist/src/core/index.d.ts:1002` uses `escaped` for character-entity
encoding, and `node_modules/@orkestrel/console/dist/src/core/index.d.ts:39` uses `escape` for ANSI
escape sequences.

## Failing proof

Command, both runs: `npm run test:src:core`

| Run                  | Result                              |
| -------------------- | ----------------------------------- |
| Baseline (pre-test)  | `Tests 98 passed (98)`              |
| Tests added, no fix  | `Tests 2 failed | 98 passed (100)`  |
| After the fix        | `Tests 100 passed (100)`            |

Failing-first test names, both in `tests/src/core/helpers.test.ts` under `describe('executeScenarios')`:

- `names the row whose builder refused and hands the refusal back as the cause` — red with
  `Error: Value is required` from `requireValue`, because the raw non-`Error` refusal came back
  instead of a named `Error`.
- `names the row whose promised builder rejected and never builds the rows after it` — red with
  `expected 'no fixture' to be 'closed opens on show: build refused'`.

The first drives a synchronous non-`Error` throw on the second row and proves the earlier row
completed all three phases while the refused row ran none. The second drives a rejected promise on
the first row and proves no later row is built.

`tests/guides.test.ts` gained assertions inside the existing
`walks the table and opens a failing row message with that row name` case, transcribing the fence
lines added to the guide. No test was added there, so the guides count is unchanged.

## Gates

Every command run from the repository root on Windows 11, Git Bash.

| Gate                             | Result                                     |
| -------------------------------- | ------------------------------------------ |
| `npm run format:check`           | exit 0 — all matched files correct         |
| `npm run lint:check`             | exit 0                                     |
| `npm run check`                  | exit 0                                     |
| `npm run test:src:core`          | `Tests 100 passed (100)`                   |
| `npm run test:guides`            | `Tests 38 passed | 1 skipped (39)`         |
| `npm run test:policy`            | `Tests 111 passed (111)`                   |

The guides skip is pre-existing and unrelated: `it.skipIf(!supportsFileLinks())` at
`tests/guides.test.ts:933`, which cites the host mechanism it rests on.

Not run, and left to the independent `verifier`: `npm run build`, `npm test`, `test:src:browser`,
`test:src:server`, `test:config`, `test:setup`, `test:distribution`.

## Tree

```
$ git diff --stat
 guides/test.md                 | 18 +++++++++++++++---
 src/core/helpers.ts            | 18 +++++++++++++++---
 tests/guides.test.ts           |  8 ++++++++
 tests/src/core/helpers.test.ts | 36 ++++++++++++++++++++++++++++++++++++
 4 files changed, 74 insertions(+), 6 deletions(-)

$ git status --porcelain
 M guides/test.md
 M src/core/helpers.ts
 M tests/guides.test.ts
 M tests/src/core/helpers.test.ts
```

Touched files:

- `src/core/helpers.ts` — `executeScenarios` names a refusing builder for its row and keeps the
  refusal as the `cause`; `@throws` and `@remarks` corrected.
- `tests/src/core/helpers.test.ts` — the failing proof for a synchronous refusal and a rejected
  promise.
- `guides/test.md` — the builder case in the statechart prose and fence, the
  `orkestrel-prove-journey` rename, and the `extractStyles` naming sentence.
- `tests/guides.test.ts` — transcribes the fence lines added to the statechart fence.

`README.md` was checked and needed nothing: its `executeScenarios` mention (line 82) and its
`extractStyles` mention (line 164) make no claim this change falsifies.

## Shared-file patches

None. Every edit landed in an owned file.

## Claims not closed

- The flagship-fence finding is reported as falsified rather than closed by an edit. Rule on the
  evidence in this report.
- The message shape decision under F6 is mine to reverse if you want the refusal's own message
  inlined; the cost is one new published export plus its guide surface row.
- The tree-wide gates (`build`, `test`) are unrun here by design.

## Deviation state

No deviation stop. Two recorded executor decisions: the F6 message shape and the no-edit ruling on
the flagship fence, both argued in full earlier in this report.
