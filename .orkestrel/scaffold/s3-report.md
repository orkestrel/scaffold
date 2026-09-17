# Unit S3 — report

Every criterion is done. No criterion was reopened, no vendored file changed, and the unit stopped
on no deviation. One input the brief named was absent; it is recorded under § What I did not close.

## Touched files

| File | Change |
| ---- | ------ |
| `C:\Users\mikes\WebstormProjects\scaffold\src\core\templates.ts` | The emitted merge's comment, its selection code, the extracted `isNamedPlugin` predicate, and both `assetsInlineLimit` comments |
| `C:\Users\mikes\WebstormProjects\scaffold\vite.config.ts` | Regenerated from the generator; no hand edit |
| `C:\Users\mikes\WebstormProjects\scaffold\tests\src\core\compilers.test.ts` | Hazard-suite comment, the repeated-name case, three added controls, two identity assertions, and the pinned emitted literals |
| `C:\Users\mikes\WebstormProjects\scaffold\tests\src\core\templates.test.ts` | The comment restating the refusal's discriminant |
| `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-adopt.mjs` | Regenerates this repository's own configuration artifacts from the generator |
| `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-red-1-selection.mjs` | Re-produces the item 2 red |
| `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-red-2-pinning.mjs` | Re-produces the item 7 red |
| `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-red-3-identity.mjs` | Re-produces the item 6 rival reading |
| `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-relocation-control.mjs` | The item 9 relocation control |
| `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-effective.mjs` | Settles the brief's second unknown for this checkout |
| `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-bases.mjs` | Bounds that unknown across the emitted selection matrix |

Diffstat of the whole uncommitted change, which carries S1 and S2 as well as this unit:

```text
 configs/src/vite.bin.config.ts    |   4 +-
 configs/src/vite.core.config.ts   |   4 +-
 configs/src/vite.server.config.ts |   4 +-
 src/core/compilers.ts             | 129 ++------
 src/core/templates.ts             | 680 +++++++++++++++++++++++---------------
 tests/src/core/compilers.test.ts  | 519 ++++++++++++++++++++++++++---
 tests/src/core/templates.test.ts  | 151 +++++----
 vite.config.ts                    | 421 +++++++++++++----------
 8 files changed, 1277 insertions(+), 635 deletions(-)
```

This unit's own delta against the tree it inherited is +116 insertions and +2 deletions; the
inherited diffstat read 1161 insertions and 633 deletions. No file outside the owned list is
modified, and `configs/src/vite.*.config.ts` carry only the bytes S2 left there — the regeneration
reported `vite.config.ts` alone.

## 1. Done or not done, per criterion

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `format:check` and `lint:check` clean | Done | `oxfmt --check .`: "All matched files use the correct format", 224 files. `npm run lint:check`: exit 0, no diagnostic |
| 2 | `check` passes; no `any`, `as`, `!`, or suppression added | Done | `npm run check` exit 0 across the root project and the three scoped projects. The added text carries none of the four; `lint:check` and `check` both enforce it |
| 3 | The emitted comment states the true discriminant, in all three places | Done | § 2 rows 1 and 2 |
| 4 | One override entry installed at most once, with a recorded red for a base repeating a name | Done | § 3 red R1, § 4 |
| 5 | The merge comment states how every other key merges | Done | § 2 row 4 |
| 6 | The emitted `assetsInlineLimit` comment carries the whole reason; the template-level causal clause is gone | Done | § 2 rows 5 and 6 |
| 7 | The hazard suite's comment matches the controls its cases carry | Done | § 2 row 7; three cases gained a control, three are named as carrying none |
| 8 | The factory-driven half asserts identity at the base's position | Done | `expect(server.plugins?.[0]).toBe(replacement)`; § 3 red R3 |
| 9 | The whole-output pinning case has a control that must fail, or a recorded red | Done | Both: a selection-derived control in the case, and § 3 red R2 for the pin the control cannot reach |
| 10 | Every recorded red has a retained script that re-produces it | Done | § 3 names a script per red; each restores the tree in a `finally` block and re-runs green |
| 11 | The relocation control perturbs a character inside the showcase literal | Done | § 3 red R4 |
| 12 | `replacements` renamed, predicate extracted, showcase comment declarative with tokens backticked | Done | § 4; § 2 row 6. No `replacements` binding remains in the merge — the surviving hits are unrelated maps in `compilers.ts` and prose in `tests/setup*.ts` |
| 13 | The opaque-entry case asserts identity | Done | Six `toBe` assertions behind a length assertion |
| 14 | `test:src:core` and `test:config` pass, with counts | Done | `src:core` 9 files, **420 passed (420)**. `config` 1 file, **172 passed, 1 skipped (173)** |
| 15 | No vendored file changed; `host.json` unchanged after a build | Done | `git diff --stat` over `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `host.json` reports nothing. `host.json` digest `e395e384197192950a60c9233c2612be1bfcf685aab494717278a4cc0f35d519` before and after `npm run build` |

## 2. The emitted prose

### Row 1 — the refusal's discriminant, in `src/core/templates.ts` and `vite.config.ts`

Before:

```text
// override receives that record in the same position. A `UserConfig` declares neither
// `command` nor `mode`, so a value carrying both is treated as Vitest's invocation
// record rather than an override. The merge returns the base unchanged and reports
// nothing. The `tests/config.test.ts` file drives every registered factory through it.
```

After:

```text
// override receives that record in the same position. A `UserConfig` declares `mode`
// but not `command`, and the invocation record always carries both, so a value
// carrying the pair is that record rather than an override. The merge returns the
// base unchanged and reports nothing. The `tests/config.test.ts` file drives every
// registered factory through it.
```

The correction is verified against the installed declaration, not against the brief:
`node_modules/vite/dist/node/index.d.ts:3477` opens `interface UserConfig`, `mode?: string` sits at
line 3517, and a scan of lines 3477 to 3658 for a top-level `command` or `mode` member returns
`mode` alone. `interface ConfigEnv` at line 3321 declares `command: "build" | "serve"` and
`mode: string`, both required.

### Row 2 — the same correction in `tests/src/core/templates.test.ts`

Before:

```text
// emitted `mergeOverride` is what makes the parameter safe: a `UserConfig`
// declares neither `command` nor `mode`, so a value carrying both returns the
// base unchanged.
```

After:

```text
// emitted `mergeOverride` is what makes the parameter safe: a `UserConfig` declares
// `mode` but not `command`, and the record always carries both, so a value carrying
// the pair returns the base unchanged.
```

### Row 3 — the selection's vocabulary

Before:

```text
// objects replace a base plugin of the same name, in the base's position. Remaining
// caller entries append in their written order;
```

After:

```text
// objects replace a base plugin of the same name, in the base's position, and one
// override entry is taken at most once. An entry no base position took appends in its
// written order;
```

The comment and the code now use one word for the axis: the code names the set `taken`, and the
comment says "took". The earlier pair was "Remaining" against `used`.

### Row 4 — what happens to every other key

Added after the plugin rule:

```text
// cannot remove a base plugin. Every key other than `plugins` merges as `mergeConfig`
// merges it, so an override's arrays elsewhere concatenate with the base's rather than
// replacing them.
```

### Row 5 — the template-level showcase comment

Before:

```text
// boundary rather than adding a second one. `assetsInlineLimit` is restated at
// Vite's own default because the browser configuration this composes on writes
// every asset as its own file, and a showcase inlines instead.
```

After — the false causal clause is gone and the comment keeps only the composition and the boundary
replacement it alone owns:

```text
// boundary rather than adding a second one.
```

### Row 6 — the emitted `assetsInlineLimit` comment

Before:

```text
// Restate Vite's default because appBrowser sets 0; the single-file plugin
// overwrites this while useRecommendedBuildConfig stays true.
```

After — declarative rather than imperative, every code token backticked and followed by its noun,
and carrying the whole reason including the consequence the reader can act on:

```text
// The `appBrowser` factory sets `assetsInlineLimit` to 0, so every asset becomes
// its own file, and 4096 is Vite's own default put back. The `viteSingleFile`
// plugin overwrites the value while the `useRecommendedBuildConfig` option stays
// true, so this line takes effect only in a workspace that turns that option off.
```

### Row 7 — the hazard suite's comment

Before:

```text
// the emitted text. Each hazard is driven through that real function, against the real
// vendored boundary plugins, and each carries the bare merge as its control.
```

I chose the brief's second option where a control was possible and its first where it was not, and
the comment now states both halves plus which cases meet the vendored plugins. `preserves the
caller plugin entries in their written order` gained a control, because its last assertion does
diverge from the bare merge: the base entry a caller entry replaces survives under `mergeConfig`.
The nested, opaque-entry, and `command`-alone cases carry none, because each asserts exactly the
value the bare merge produces — there is no damage to contrast. That reading is stated in the
comment rather than left implicit.

## 3. The reds

Each red is a mutation of the subject, never a weakened instrument. Each script restores the tree in
a `finally` block and then re-runs the same command green, so a failed run leaves the tree clean.
The command inside every test-driving script is the published `test:src:core` script's own
arguments, spawned through `process.execPath` and `node_modules/vitest/vitest.mjs`. The `npm` shim
does not resolve from a child on this host — the first attempt returned exit `null` with no output —
and `.claude/rules/portability.md` bars reaching it with `shell: true`.

### R1 — item 2, the repeated-name selection

Script: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-red-1-selection.mjs`

Mutation: `!taken.has(position)` becomes `position >= 0` in the emitted selection, in both
`src/core/templates.ts` and `vite.config.ts`. That restores the exact behaviour the auditors named —
`findIndex` running fresh over every override entry — and changes nothing else.

Command: `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot
--project src:core -t "installs one override entry at one base position"`

```text
mutated:  exit 1 — 1 failed | 419 skipped (420)
restored: exit 0 — 1 passed | 419 skipped (420)
```

### R2 — item 7, the whole-output pinning case

Script: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-red-2-pinning.mjs`

Mutation: `taken` is renamed to `consumed` throughout the root vite template, so the emitted merge
text moves while staying valid code.

Command: the same, with `-t "emits every browser workspace configuration for a showcase selection
and for none"`.

```text
mutated:  exit 1 — 1 failed | 419 skipped (420)
restored: exit 0 — 1 passed | 419 skipped (420)
```

This red covers the pin the in-case control cannot reach. The control I added is drawn from outside
the population the case covers — a selection carrying no browser environment — and it discriminates
the wrapper maps and the browser factory. It says nothing about the merge pin, because every
selection emits the merge identically. The comment in the case states that split.

### R3 — item 6, the rival reading the mapped names admitted

Script: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-red-3-identity.mjs`

Mutation: `selected.push(replacement)` becomes `selected.push(plugin)`, which is the rival reading
the objective lane named — keep the base entry, discard the override entry. The script then reads
both assertion forms against the real mutated `srcServer` factory through Vite's own loader.

```text
rival reading:  mapped names pass = true; identity at the base position passes = false
real selection: mapped names pass = true; identity at the base position passes = true
```

The mapped-name form admits the rival reading; the identity form refuses it. That is the finding and
its close in one reading.

### R4 — item 9, the relocation control

Script: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-relocation-control.mjs`

The S2 control appended a byte to the captured file, which a capture emitting nothing would pass
identically. This one perturbs one character inside the relocated showcase literal itself —
`orkestrel-showcase-html` becomes `orkestrel-showcase-htmm` in `src/core/templates.ts` — re-captures
through the generator, asserts the comparison fails, then restores and re-runs the real comparison.

Coverage, stated with the result: every configuration artifact of every src selection crossed with
every app selection, each with and without a showcase, plus this repository's own artifacts. The
perturbed character sits in a plugin name only a showcased selection emits, so the control also
shows the capture reaches the showcased half of the matrix rather than only the plain half.

```text
Baseline captured: 3872317 bytes
Control captured: 3872317 bytes; the comparison against it fails.
The restored tree captures the baseline bytes; the real comparison passes.
```

The equal byte lengths are the point: one character was swapped, not added, so a comparison reading
length rather than content would report agreement.

## 4. The selection

The code change is the conjunct the brief named plus the extraction and the renames.

```ts
export function mergeOverride(base: UserConfig, override?: UserConfig): UserConfig {
	if (override === undefined || ('command' in override && 'mode' in override)) return base
	const merged: UserConfig = mergeConfig(base, override)
	if (merged.plugins === undefined) return merged
	const candidates = override.plugins ?? []
	const taken = new Set<number>()
	const selected: PluginOption[] = []
	for (const plugin of base.plugins ?? []) {
		if (!isNamedPlugin(plugin)) {
			selected.push(plugin)
			continue
		}
		const index = candidates.findIndex(
			(candidate, position) =>
				!taken.has(position) && isNamedPlugin(candidate) && candidate.name === plugin.name,
		)
		const replacement = candidates[index]
		if (replacement === undefined) {
			selected.push(plugin)
		} else {
			selected.push(replacement)
			taken.add(index)
		}
	}
	for (const [index, plugin] of candidates.entries()) {
		if (!taken.has(index)) selected.push(plugin)
	}
	return { ...merged, plugins: selected }
}

function isNamedPlugin(plugin: PluginOption): plugin is { name: string } {
	return (
		typeof plugin === 'object' &&
		plugin !== null &&
		!Array.isArray(plugin) &&
		!(plugin instanceof Promise) &&
		'name' in plugin
	)
}
```

What it does to a base repeating a name. Take a base of
`[outputBoundary('dist/src/server'), environmentBoundary('src/server'), outputBoundary('dist/app/server')]`
and an override of `[outputBoundary('dist/showcase')]`. The base's first and third entries both
carry `orkestrel-output-boundary`.

- Before: position 0 takes the override entry, and position 2 takes the same object again, because
  `findIndex` matched it a second time. The third base entry is discarded, so the workspace audits
  one output twice and the other not at all.
- After: position 0 takes the override entry and `taken` records index 0. Position 2 searches again,
  finds the only candidate already taken, and keeps its own entry. The result is three entries, and
  the second base boundary survives where the base put it.

`installs one override entry at one base position` asserts that by identity at all three positions,
against the real vendored boundary plugins, and carries the bare merge as its control: `mergeConfig`
appends instead of selecting, so both base entries survive beside the override and the build audits
three outputs.

Three renames and one extraction close item 10:

- `replacements` becomes `candidates`, because the binding holds every override entry and most of
  them append rather than replace. `candidates` also matches the `candidate` parameter the search
  already used.
- `used` becomes `taken`, so the code and the comment name one axis.
- The doubled inline shape test becomes `isNamedPlugin`. The base entry's shape is now tested once
  per base entry rather than once per candidate, and an unnamed base entry short-circuits to the
  push before any search runs.

Two ancillary decisions, recorded rather than escalated:

- `isNamedPlugin` is a type predicate returning `plugin is { name: string }` rather than
  `plugin is Plugin`. The narrower target keeps the emitted config's type import at
  `PluginOption, UserConfig`, and `Plugin` resolves to `Plugin<any>` through its own default type
  argument.
- It is not exported, and it sits immediately after `mergeOverride`, its only caller. The generated
  root configuration already declares module state nothing exports (`resolve`,
  `peerDependencies`), the placement rules in `.oxlintrc.json` reach `src/**` and `app/**` rather
  than a root config, and exporting it would widen every generated workspace's surface with a symbol
  no consumer holds.

## 5. Observations

These are readings, not criteria.

- **The whole-suite result is not mine to take.** I ran `src:core` and `config` only, as the brief
  directs. The authoritative sweep belongs to the Orchestrator after I exit.
- **Wall clock.** `test:src:core` 20.7s; `test:config` 6.2s; `format:check` 3.8s over 224 files;
  `npm run check` and `npm run build` each well inside a minute. Each figure is one run on a host
  that was otherwise idle apart from this unit.
- **No emitted wrapper's bytes moved.** The regeneration reported `vite.config.ts` alone.
  `configs/src/vite.{core,server,bin}.config.ts` carry only what S2 left in them.
- **The brief's second unknown is confirmed, not assumed.**
  `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-effective.mjs` resolves all four
  configuration artifacts this checkout materializes through Vite's own `loadConfigFromFile`, under
  the guarded selection and under the unguarded one it replaced, and compares the resolved plugin
  names:

  ```text
  vite.config.ts:  — unmoved by the fix = true
  configs/src/vite.core.config.ts: orkestrel-output-boundary, orkestrel-environment-boundary, orkestrel-declaration-rollup — unmoved by the fix = true
  configs/src/vite.server.config.ts: orkestrel-output-boundary, orkestrel-environment-boundary, orkestrel-declaration-rollup — unmoved by the fix = true
  configs/src/vite.bin.config.ts: orkestrel-output-boundary — unmoved by the fix = true
  ```

  `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\s3-bases.mjs` bounds that beyond this
  checkout. It emits 128 root configurations — every src selection crossed with every app selection,
  each with and without a showcase — and prints the distinct set of declared `plugins:` arrays
  across all of them. Seven distinct arrays come back, and no array carries one plugin name twice:
  `[environmentBoundary('app/core')]`; `[outputBoundary(output), environmentBoundary('app/browser'),
  vue()]`; the showcase array of `outputBoundary`, `viteSingleFile`, and one inline
  `orkestrel-showcase-html` object; `[outputBoundary('dist/app/server'),
  environmentBoundary('app/server')]`; `[outputBoundary('dist/bin')]`;
  `[outputBoundary('dist/src/browser'), environmentBoundary('src/browser')]`; and
  `[outputBoundary('dist/src/server'), environmentBoundary('src/server')]`.

  That instrument's coverage is the `plugins:` arrays a root configuration declares. A wrapper's own
  override array is outside it, which is what `s3-effective.mjs` reads for this checkout. I
  confirmed the pattern misses nothing in a real emitted file: `vite.config.ts` holds two declared
  arrays and both appear in the distinct set, while the merge's `return { ...merged, plugins:
  selected }` is correctly outside it.

  So the anomaly item 2 closes is unreachable through any emitted base and reachable only through
  the exported `mergeOverride` with a base a workspace developer writes, which is the reachability
  the brief already stated.
- **`src:core` gained one case**, from 419 to 420. `config` is unchanged at 172 passed, 1 skipped.
- **The predicate extraction moved emitted bytes**, as the brief's first unknown expected. Every
  pinned expectation that carries the merge was updated from the generator's own output rather than
  by hand: `vite.config.ts` was regenerated and `oxfmt --check` confirms the generator's text is
  already formatter-stable, so no expectation needed weakening.

## 6. What I did not close

- **The two s2 audit reports the brief's authority list names are not on disk.**
  `.orkestrel/scaffold/s2-audit-subjective-report.md` and
  `.orkestrel/scaffold/s2-audit-objective-report.md` do not exist. The directory holds
  `s2-audit-subjective-brief.md`, `s2-audit-objective-brief.md`, and `s2-audit-claims.md`, and
  neither report is under `tmp/audit/` or `tmp/codex/` either. I did not stop, because the brief
  restates every finding in full with the property to change named for each, so the objective was
  reachable without them. What I lost is the auditors' own wording behind each finding; where the
  brief's restatement and the code disagreed I went to the code, which is how item 1's `UserConfig`
  reading and item 5's control census were settled. This is an Orchestrator retention gap against
  `.agents/orchestration.md` § Dispatch anatomy, not a defect in the subject.
- **Nothing under § What is settled was reopened.** The factories' override parameter, the deleted
  `applicationBrowser`, the two inverted sealed cases, the `command`-and-`mode` refusal key, the
  inverted browser case's planted control, the exported `mergeOverride`, the relocation, and the
  vendored `tests/config.test.ts` gate placement all stand untouched.
- **No deviation stopped the unit.** Two ancillary decisions are recorded in § 4 rather than
  escalated, and one instrument-level correction is worth naming: the pinning case's comment first
  named `tmp/units/s3-red-2-pinning.mjs` as the source of its red. Acceptance sweeps `tmp/`, so a
  committed test would have carried a dangling path. The comment now describes the mutation instead
  of naming the file.
