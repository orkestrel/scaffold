# Unit S1 audit — subjective lane report

Lane: `reviewer`, Opus 5, native subagent, clean context, 2026-09-16. Brief:
`tmp/audit/s1-audit-subjective-brief.md`. Transcribed by the Orchestrator from the lane's returned
message, because the `reviewer` allowlist carries no write tool — the brief named a report path the
allowlist could not reach, which is the Orchestrator's dispatch error and is recorded in
§ Deviations.

The lane cannot execute. Every verdict rests on the diff, the tree, and the installed declarations.

## Per-claim verdicts

1. **Every factory accepts `override?: UserConfig` and merges through `mergeOverride` — CONFIRMED.**
   `src/core/templates.ts` declares the parameter at lines 133, 154, 191, 225, 267, 283, 316, 347,
   361, 379, 393, 410, 427, 444, 465, 482, each body ending `return mergeOverride(project, override)`.
   This repository's own file matches at `vite.config.ts` lines 62, 83, 133, 173, 187, 205, 219, 234,
   255. `appShowcase` takes the override and merges it before composing
   (`src/core/compilers.ts:800,834`).
2. **`applicationBrowser` exists only as the absence assertion — CONFIRMED.** One hit outside
   `.orkestrel/`: `tests/src/core/compilers.test.ts:1153`.
3. **`appShowcase` restates nothing beyond what a showcase changes — CONFIRMED.**
   `src/core/compilers.ts:802-833` declares the boundary, the showcase plugins, and the build options
   `appBrowser` does not declare, plus `outDir` and `assetsInlineLimit`, whose base values it changes.
4. **`mergeOverride` refuses a value carrying `command` — CONFIRMED from source.**
   `vite.config.ts:50` / `src/core/templates.ts:111`. The vendored `tests/config.test.ts:367-402`
   drives every registered row through it with a control that must fail. Not executed by this lane.
5. **One plugin per name, first position and last value — CONFIRMED.** `vite.config.ts:53-59`;
   `Map.set` keeps first insertion order and overwrites the value. `outputBoundary` returns a fixed
   `name` whatever output it receives (`configs/helpers.ts:404-409`), so the showcase boundary lands
   in the browser boundary's slot. See Finding 1 for what the mechanism does beyond the claim.
6. **No wrapper calls `mergeConfig`, and no wrapper's effective configuration changed — CONFIRMED.**
   Every wrapper's override names plugins disjoint from its base's:
   `orkestrel-declaration-rollup` against `orkestrel-output-boundary` and
   `orkestrel-environment-boundary`. `rewriteCoreSpecifier` is a string transform rather than a
   plugin. The selection is inert for every emitted wrapper.
7. **Showcase plugin order equals what `applicationBrowser(true)` produced — UNSETTLED.** It holds
   for every shape of `viteSingleFile()` except two returned entries sharing a `name`: `flat()` lifts
   a returned array to the top level and the selection collapses same-named siblings the old
   concatenation kept. `vite-plugin-singlefile` is not installed in this checkout.
8. **`assetsInlineLimit: 4096` changes nothing — CONFIRMED.**
   `node_modules/vite/dist/node/index.d.ts:2841-2842` declares `@default 4096`.
9. **Both inverted cases keep a planted control — REFUTED.** `templates.test.ts` satisfies both
   halves. `tests/src/core/compilers.test.ts:1149-1157` carries the reason but plants nothing. See
   Finding 4.
10. **This repository is byte-identical to what it generates — UNSETTLED by this lane.** The proof
    exists with a discriminating control (`tests/src/core/compilers.test.ts:1234-1273`) and names
    exactly the four files. Settled by running it. Referred to the verifier.
11. **No vendored file changed and `dist/host` did not move — CONFIRMED from source.** No modified
    file carries a `host.json` row.
12. **No `any`, `as`, non-null assertion, or suppression — CONFIRMED.** `vite.config.ts:51` narrows
    `mergeConfig`'s `Record<string, any>` return by annotating the binding rather than asserting.
    One objective referral: `tests/src/core/compilers.test.ts:3069-3072` leaves `bare` unannotated,
    so `bare.plugins[0]` is an `any`-typed member access with no `any` token.
13. **The renamed imports change nothing — CONFIRMED, and vacuous as written.**
    `tests/src/core/compilers.test.ts:35-46` is an entirely new import statement, so no existing case
    could have changed.
14. **Nothing alters what a generated workspace builds — UNSETTLED.** Holds for every non-showcase
    selection. For a showcase it depends on claim 7.

## Findings

### Finding 1 — the plugin selection collapses duplicates inside the caller's own override. High.

`vite.config.ts:53-59` runs the selection over the merged array, so it deduplicates the caller's own
entries as well as base-against-override collisions. A developer writing
`srcBrowser({ plugins: [copyAssets(), copyFonts()] })`, where both come from one plugin package that
names them alike, gets one of them, in the other's position, with no diagnostic. `flat()` at line 54
reaches further: a plugin package returning an array of same-named halves is lifted to the top level
and collapsed, where the previous `mergeConfig` wrapper kept the nesting and Vite flattened it at
resolve time with both halves intact.

`plugins` in a generated `vite.config.ts` no longer means what `plugins` means in Vite, and the
difference is invisible at the call site.

The change: scope the selection to base-against-override collisions only. Replace each base entry in
place with the override's entry of the same name, then append the override's remaining entries in
order, leaving the caller's array untouched. That preserves the showcase mechanism and the ordering
claim 7 turns on, and restores Vite's semantics for everything the caller wrote. Extend the comment
to state what a caller cannot do: nothing can be removed, and only a base plugin is replaceable.

### Finding 2 — the new hazard test states a population it does not have. High.

`tests/src/core/compilers.test.ts:3016-3017` states the population as "every factory this checkout
registers as a project row". The list at lines 3018-3027 omits `distribution`, which
`vite.config.ts:275` registers, because the case reuses it as the control at line 3040. The stated
coverage is wider than the instrument's reach, which `.claude/rules/quality.md` § Instruments names
a defect in the instrument.

`expect(registered).toHaveLength(8)` at line 3028 asserts a hand-written array literal against a
number transcribed from that same literal, which `.claude/rules/tests.md` bars. It cannot detect a
project row the list omits, which is the miss already present.

The change: derive the population from the registered rows the way the vendored
`tests/config.test.ts:346,370` does — read `test.projects` off the default export and filter to
callables — and drop the length assertion. Draw the control from outside that population.

### Finding 3 — the showcase factory template lives in `compilers.ts`. Medium.

`src/core/compilers.ts:798-836` holds the whole emitted `appShowcase` body as an inline template
literal. `.claude/rules/architecture.md` puts template definitions in `*/templates.ts`, and
`CONFIG_TEMPLATES.factories.app` has the sibling slot. Before this change the inline text was a
three-line delegate; now every byte of a shipped showcase configuration is authored in the compiler.
The tests gate the consequence rather than removing it: `tests/src/core/compilers.test.ts:1146-1148`
exists because one spelling can drift from the other.

The change: move the literal to `CONFIG_TEMPLATES.factories.app.showcase` and reduce
`src/core/compilers.ts:798` to the ternary that selects it. The text carries no backtick and no
`${`, so the move is mechanical.

### Finding 4 — the inverted compilers case plants no control. Low.

`tests/src/core/compilers.test.ts:1149-1157` asserts emitted literals and nothing more. Its sibling
plants the seal and pins what the plant produces. The change: plant the sealed shape — replace
`export function appBrowser(override?: UserConfig): UserConfig {` with
`export function appBrowser(): UserConfig {` in a copy — and assert the copy fails the same
`toContain` the case relies on.

### Finding 5 — the emitted comment claims identity where the code tests a proxy. Low.

`src/core/templates.ts:101`, emitted to every generated workspace, reads: "A `UserConfig` declares no
`command`, so a value carrying one is that record and merges nothing." Any value carrying a `command`
key is refused, and the caller gets the base back with no signal. The change: "A `UserConfig`
declares no `command`, so a value carrying one is Vitest's record rather than an override. The merge
returns the base unchanged and reports nothing."

### Finding 6 — `findRefused` names a judgment rather than what it returns. Low.

`tests/src/core/templates.test.ts:487`. The function returns `name(parameters)` strings for
declarations that violate the rule. `.claude/rules/names.md` requires `{verb}{Noun}`;
`findRefusals` satisfies it and reads the same at the call sites.

### Finding 7 — `publicDir: false` is restated in the core wrapper. Low, observation.

`configs/src/vite.core.config.ts:7` passes what `srcCore` already declares at `vite.config.ts:64`.
It predates this change and is harmless, and it is the one wrapper the change edited that does not
follow the principle the change's own comment states for `appShowcase`.

## What this lane owns beyond the claims

- **`mergeOverride` in every generated workspace.** It earns its place: it carries two invariants
  every wrapper would otherwise repeat, so it is not a rename-only wrapper. The name is right and
  reads as what it does at the call site. Its `export` is unread in a generated workspace, which is
  the correct consequence of the byte-identity law, because this checkout's own test imports it.
  Predictability is where it falls short — Finding 1.
- **The comment that replaced the seal.** A reader arriving cold learns why, in all three places.
  `src/core/templates.ts:94-109` names Vitest's call, the position the record lands in, the property
  that refuses it, and the file that drives the refusal. The gaps are Finding 1 and Finding 5.
- **Vocabulary.** No drift. `override` is one term for the caller's value; `base` and `project` are
  two role names for one value at two frames; `merged` and `selected` name the selection's stages.
- **The wrapper's new voice.** The change's best result. `defineConfig(srcCore({ … }))` says "the
  core configuration, with these changes" directly, where the merge form made the reader unwrap a
  call first.
- **The test renames.** Right resolution, uneven result: the exported names are fixed by the Vitest
  project labels they carry, so the alias is the local lossless fix. `import * as projects from
  '../../../vite.config.js'` would remove every alias. Recommended, not required.
- **Guide parity (unknown resolved).** No guide prose describes the factory signatures or the wrapper
  merge shape. `guides/scaffold.md:1580-1589` describes `vite.config.ts` as an artifact and its alias
  derivation; the guide's surface is `src/`. Nothing went stale. One product-coherence point stands
  in its place: the emitted comment points a workspace's developer at `tests/config.test.ts` for the
  record refusal, which that vendored file does prove, but the plugin-selection rule is proven only
  in this repository's own tests, which no generated workspace receives. Moving that proof into the
  vendored file closes it at the cost of a bump and a re-propagation — the Orchestrator's call,
  raised as a successor question rather than a required change.

## Deviations

The brief named a report path the `reviewer` allowlist cannot write. Orchestrator dispatch error
against `.agents/orchestration.md` § Check the brief before you send it. Report transcribed.

VERDICT: REJECT
