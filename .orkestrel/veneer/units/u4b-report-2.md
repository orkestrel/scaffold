<!-- codex exec, gpt-6-astra, workspace-write -C veneer; journal u4b-2.jsonl (ephemeral); thread 01a0c0c5-e9f4-7b13-b0eb-c2d6669c5b0c; exit 0; the unit stopped at its deviation boundary; retained 2026-09-20 -->

U4b successor brief 2 is incomplete. The post-implementation `npm.cmd run test:setup` run exited 1 with 2 failed and 94 passed. Work stopped under the brief's condition: "a gate red after your own fix inside owned files." No green run is claimed.

The effective assignment is `u4b-brief-2.md`, superseding the named portions of `u4b-brief.md`. This report records the successor changes against report 1's working tree at HEAD `ef1a563`. The assigned role is `sol` on Astra. No agent was spawned, no dependency was installed, and nothing was committed. No prohibited git, repair, build, tree-wide format, or lint-fix command ran.

The successor diff per file is as follows.

| File | Successor change and state |
| --- | --- |
| `tests/setupConformance.ts` | Adds the exported readonly `OracleBinding` contract and `ORACLE_BINDINGS` table. Replaces the obligation conditional chain with table selection and accepted-step checking. Adds `matchesOracleToggle`, with explicit boolean pressed attributes, and requires the same attribute in the accessibility predicate. Extracts the ordinary comparison into `scanOracleFixture`, then adds exclusion validation and skipped-reading comparison while retaining step membership and metadata checks. Reads the recorder CSS from the manifest-relative pinned path. Records native `click` beside `toggle.bs.button` and `toggled.bs.button`. |
| `tests/setupConformance.test.ts` | Retains the existing cases and changes the event expectation to `['click']`. Adds action-binding, absent-step, missing/invalid pressed attribute, native-event, binding-table membership, written exclusion, and malformed-exclusion cases. The post-implementation exclusion controls remain red as described later. |
| `tests/conformance.test.ts` | Routes the ordinary fixture comparison through `scanOracleFixture`; preserves the guide-row scanner and the remaining conformance proofs. |
| `guides/veneer.md` | Deletes only the Space and Enter obligation rows from Compatibility. |
| `tests/fixtures/oracle/button.json` | Unchanged. Refresh was not reached; this fixture still carries the prior empty event arrays. |
| `u4b-report-2.md` | Records the partial implementation, run evidence, and stop condition. |

Byte comparisons against the starting snapshots confirmed that `package.json`, `package-lock.json`, `tests/fixtures/oracle/inventory.json`, and `tests/fixtures/oracle/button.json` are unchanged. The Orchestrator's dependency declaration remains intact. Report 1 remains intact.

The binding contract and table are declared as follows.

```ts
export interface OracleBinding {
	readonly component: string
	readonly category: string
	readonly obligation: string | undefined
	readonly steps: readonly RegExp[]
	readonly predicate: (step: OracleStep, row: CompatibilityRow) => boolean
}

/** Binds accepted obligations to the recorded actions that can prove them. */
export const ORACLE_BINDINGS: readonly OracleBinding[] = Object.freeze([
	{
		component: 'btn',
		category: 'identity',
		obligation:
			'Button identifies itself as button, bs.button, and .bs.button; defaults and type defaults are inherited empty.',
		steps: [/^button\./u],
		predicate: ({ after }) =>
			after.identity.NAME === 'button' &&
			after.identity.DATA_KEY === 'bs.button' &&
			after.identity.EVENT_KEY === '.bs.button' &&
			after.identity.Default === '{}' &&
			after.identity.DefaultType === '{}',
	},
	{
		component: 'btn',
		category: 'attribute',
		obligation:
			'The data-bs-toggle="button" click prevents its default action and creates or reuses the instance to toggle active and aria-pressed.',
		steps: [
			/^button\.(?:reduced\.)?(?:click\.(?:toggle|release)|pressed\.click|keyboard\.(?:space|enter))$/u,
		],
		predicate: (step) =>
			step.after.clicks.length > 0 && step.after.clicks.every(Boolean) && matchesOracleToggle(step),
	},
	{
		component: 'btn',
		category: 'method',
		obligation:
			'toggle() flips active and aria-pressed on every activation, without a no-op guard.',
		steps: [
			/^button\.(?:reduced\.)?(?:click\.(?:toggle|release)|pressed\.click|keyboard\.(?:space|enter)|pointer\.release)$/u,
		],
		predicate: (step) =>
			matchesOracleToggle(step) &&
			step.after.mutations.includes('class') &&
			step.after.mutations.includes('aria-pressed'),
	},
	{
		component: 'btn',
		category: 'accessibility',
		obligation:
			'A toggle announces the button role and its pressed state, rather than a checkbox role.',
		steps: [
			/^button\.(?:reduced\.)?(?:initial|click\.(?:toggle|release)|keyboard\.(?:space|enter)|pressed\.(?:initial|click))$/u,
		],
		predicate: ({ after }) =>
			(after.attributes['aria-pressed'] === 'true' ||
				after.attributes['aria-pressed'] === 'false') &&
			after.accessibility.startsWith('- button ') &&
			after.accessibility.includes('[pressed]') === (after.attributes['aria-pressed'] === 'true'),
	},
	{
		component: 'btn',
		category: 'accessibility',
		obligation:
			'A disabled anchor carries disabled, aria-disabled="true", tabindex="-1", and role="button"; pointer activation is refused.',
		steps: [/^button\.(?:reduced\.)?disabled\.click$/u],
		predicate: ({ after }) =>
			after.classes.includes('disabled') &&
			after.attributes['aria-disabled'] === 'true' &&
			after.attributes.tabindex === '-1' &&
			after.attributes.role === 'button' &&
			after.refusal === 'element is not enabled' &&
			after.clicks.length === 0 &&
			after.mutations.length === 0,
	},
	{
		component: 'btn',
		category: 'event',
		obligation: undefined,
		steps: [/^button\./u],
		predicate: ({ after }, row) => {
			const events = row.obligation.match(/\b(?:click|[\w-]+\.bs\.button)\b/gu) ?? []
			return events.length > 0 && events.every((event) => after.events.includes(event))
		},
	},
])
```

`matchesOracleToggle` requires the pressed attribute to be exactly `'true'` or `'false'`, requires the active class to flip, and compares the attribute with the resulting active state. Table selection matches component and category, then the exact obligation when declared. The event entry applies to the event category. Missing steps and steps outside a binding's accepted patterns return distinct findings. The table has no keyboard obligation; data-api and toggle bindings retain keyboard actions as required by the successor brief.

The red run used `npm.cmd run test:setup` before the scanner, listener, and exclusion fixes. Before that run, the existing comparison was extracted without exclusion handling into `scanOracleFixture`, so the written-fixture test exercised the same comparison used by conformance. Its final summary was:

```text
 Test Files  1 failed | 2 passed (3)
      Tests  6 failed | 87 passed (93)
   Start at  17:45:37
   Duration  6.23s (transform 192ms, setup 76ms, import 1.37s, tests 5.62s, environment 0ms)
Exit code: 1
```

The red findings were:

| Case | Observed failure |
| --- | --- |
| Live control event reading | Expected `['click']`; received `[]`. |
| Data-api obligation handed `button.hover` | Expected `proof step does not prove this obligation`; received `recording contradicts obligation`. |
| Disabled obligation handed `button.click.toggle` | Expected `proof step does not prove this obligation`; received `recording contradicts obligation`. |
| Released accessible toggle with `aria-pressed` deleted | Expected a contradiction; scanner returned `undefined`. |
| Native click event obligation | Expected `undefined`; scanner returned a contradiction. |
| Written fixture with a differing excluded hover reading | Expected `undefined`; comparator returned `Oracle differs at step button.hover`. |

The post-implementation run used the same `npm.cmd run test:setup` command. Its final summary was:

```text
 Test Files  1 failed | 2 passed (3)
      Tests  2 failed | 94 passed (96)
   Start at  17:47:56
   Duration  6.18s (transform 203ms, setup 81ms, import 1.36s, tests 5.55s, environment 0ms)
Exit code: 1
```

This run is not green. Its log is named `green-setup.log` because it was the intended green run, not because it passed. The remaining failures are:

```text
tests/setupConformance.test.ts:260
Case: skips differing readings in a written excluded step and still compares other steps
Expected: "Oracle differs at step button.hover"
Received: "Oracle differs at step button.initial"

tests/setupConformance.test.ts:293
Case: rejects exclusions outside the recording and malformed fixture metadata
Expected: "Oracle fixture metadata or step membership differs"
Received: "Oracle differs at step button.initial"
```

The written-fixture skip assertion at line 259 passed before the control at line 260 failed. The failing controls pass in-memory objects with explicit `undefined` members into a helper documented to consume parsed saved JSON. The comparator serializes the live side, which omits those members, and compares it with the unnormalized supplied side. This produces the earlier initial-step mismatch. The remaining later assertions inside the failed cases were not all reached.

The action-binding cases, missing pressed attribute case, invalid pressed values case, native click event case, and binding-table membership case passed in this run. The existing live-control case also passed its loop over every remaining guide row. The required ordinary conformance run has not verified those rows.

The required gate readings are as follows.

| Command | Result and final lines |
| --- | --- |
| `npm.cmd run format:check` | Not run after the stop condition. |
| `npm.cmd run lint:check` | Not run after the stop condition. |
| `npm.cmd run check` | Not run after the stop condition. |
| `npm.cmd run test:setup` | Exit 1; `Test Files 1 failed \| 2 passed (3)`; `Tests 2 failed \| 94 passed (96)`. Full final summary is transcribed earlier. |
| `npm.cmd run test:conformance` | Not run after the stop condition. |
| `npm.cmd run test:guides` | Not run after the stop condition. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:conformance` | Not run after the stop condition. |

The scoped formatter command ran before the post-implementation setup run:

```text
.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --write tests/setupConformance.ts tests/setupConformance.test.ts tests/conformance.test.ts
Finished in 3ms on 3 files using 16 threads.
Exit code: 0
```

`ORACLE_REFRESH=1` was not run. The required ordinary Chromium comparisons and Edge comparison were not run. Fixture refresh, the green setup run, and the remaining gates are unfinished. `git diff --check` exited 0.

The actual final tracked status from `git status --porcelain --untracked-files=no` is:

```text
 M guides/veneer.md
 M package-lock.json
 M package.json
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
```

The fixtures remain untracked from brief 1 and are omitted from this tracked-only listing. The report and evidence files are under ignored `tmp/`. Git emitted the known global-ignore permission warning and exited 0.

The retained review evidence is:

- `tmp/u4b/successor-2/final.diff`: actual `git diff` against HEAD, including the pre-existing U4b and package declaration changes.
- `tmp/u4b/successor-2/successor.diff`: the successor diff against snapshots taken before these edits.
- `tmp/u4b/successor-2/final-status.txt`: tracked porcelain status.
- `tmp/u4b/successor-2/red-setup.log`: pre-fix setup run.
- `tmp/u4b/successor-2/green-setup.log`: failing post-implementation setup run.

The deviations and decisions are recorded in the required shape.

| Subject | Expected | Found and exact evidence | Done or not done |
| --- | --- | --- | --- |
| Setup gate after implementation | The same setup command passes after the red cases are fixed. | Exit 1; 2 failed and 94 passed; the exclusion controls at `tests/setupConformance.test.ts:260` and `:293` receive `Oracle differs at step button.initial`. | Stopped under the brief's explicit condition. No additional repair attempted. Fixture refresh and remaining gates not done. |
| Table shape | Decide and record an exported readonly binding table within the owned module. | `OracleBinding` and `ORACLE_BINDINGS` hold component, category, obligation, accepted regular expressions, and predicate. | Done. Keyboard obligation entries are absent; activation bindings retain keyboard patterns. |
| Comparison helper | Prove exclusion handling through the ordinary comparison path. | `scanOracleFixture` is shared by the ordinary conformance case and setup cases; the written excluded-fixture assertion passed, but in-memory negative controls failed before their intended difference. | Implementation present; green proof not done. |
| Proof instrument | Use the execution boundary stated in the brief. | The brief marks `prove` blocked. | No `prove` invocation or receipt claimed. |

The unit is not ready for acceptance. The immediate continuation is to repair the exclusion controls' saved-JSON inputs, obtain a green setup run, refresh the Button fixture, and perform the required gates and browser comparisons under a successor instruction.
