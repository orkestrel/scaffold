# Unit S1 — config factories take their overrides

## Role and engine

`implementer` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer from the clean committed baseline the
Orchestrator names at launch.

This is the canon repository. A change here reaches every workspace scaffold generates.

## Objective

Make every config factory accept an override, so a package's own configuration reaches the factory
through its parameter instead of wrapping it from outside, and replace the boolean-toggled
`applicationBrowser` helper with composable `appBrowser` and `appShowcase`.

## Authority — read before acting, in this order

1. `AGENTS.md` and `.agents/orchestration.md` in this checkout.
2. `.claude/rules/workspace.md` — the test project matrix, the config wrapper contract, and script
   intent. Then `.claude/rules/typescript.md`, `rules/architecture.md`, `rules/names.md`,
   `rules/tests.md`, `rules/quality.md`, `rules/documentation.md`, `rules/writing.md`.
3. `.orkestrel/scaffold/config-override-plan.md` — the plan addendum this unit implements.
4. The reference implementation, already shipped in a target:
   `C:\Users\mikes\WebstormProjects\roughnotes\vite.config.ts` at commit `cc1c3d6`, and its report
   `C:\Users\mikes\WebstormProjects\roughnotes\.orkestrel\roughnotes\u13-report.md`. Its § 3 records
   what `mergeConfig` does field by field; § 4 records the failing proof. Read both before writing.

## The instruction

From the repository owner: every config factory accepts an override, because `configs/` is where a
package's own configuration changes belong; and the `appBrowser` / `appShowcase` composition
propagates here wherever it applies.

## What the tree shows

`src/core/templates.ts` generates the `vite.config.ts` every scaffolded workspace receives. Its
`factories` block declares each factory closed:

```
core: `export const srcCore = (): UserConfig => ({ … })`
browser: `function applicationBrowser(showcase: boolean): UserConfig { … }

export function appBrowser(): UserConfig {
	return applicationBrowser(false)
}
{{showcaseFactory}}`
```

Its `configs/` wrappers merge from outside, because the factory cannot take an override:

```
mergeConfig(srcBrowser(), { plugins: [declarationRollup({ … })] })
```

This repository's own `configs/src/vite.core.config.ts`, `vite.browser.config.ts` and
`vite.server.config.ts` have the same shape against its own `vite.config.ts`.

## The change

1. **Every generated factory takes `override?: UserConfig`** and returns its base merged with it.
2. **`applicationBrowser` is deleted.** `appBrowser(override?)` carries the browser configuration and
   `appShowcase(override?)` builds on it, declaring only the output boundary and `outDir` a showcase
   changes. The `{{showcaseFactory}}`, `{{showcasePlugins}}` and `{{showcaseBuild}}` substitutions
   must still produce a correct file in both the showcase and the non-showcase case — check what
   fills them before you restructure.
3. **The generated `configs/` wrappers pass their configuration as the override**, so no wrapper
   calls `mergeConfig` itself.
4. **This repository's own `vite.config.ts` and `configs/src/*.config.ts` take the same shape.**
   Scaffold is a workspace under its own model and gets no exemption.

## The invariant this change deliberately inverts

The first attempt found that these factories are **sealed against a parameter on purpose**.

- `tests/src/core/compilers.test.ts:1128`, `seals every application browser factory against a caller
  argument`, asserts `export function appBrowser(): UserConfig {` and `return applicationBrowser(false)`.
  Its own comment records the reason: "Vitest calls a project row with its own environment record, so
  a factory that declared a parameter merged those fields into the configuration it returned."
- `tests/src/core/templates.test.ts:929`, `declares every emitted project factory without a parameter
  list`, sweeps every emitted configuration across every selection and requires no value-exported
  `UserConfig`-returning declaration to carry a parameter, with a planted control.

That is defence by absence against the second hazard below. This change replaces it with an explicit
refusal plus a test, which is the stronger defence — a proved guard beats a signature that cannot
express the mistake. The owner has ruled that it proceeds.

**Invert both guards deliberately and visibly.** Each becomes its inverse: every emitted project
factory declares exactly `override?: UserConfig`, and the browser factory is `appBrowser(override?)`.
Carry the reason into the replacement's comment, so the next reader learns why the parameter is safe
rather than finding the seal gone with no account of it. Keep each case's planted control.

## Two hazards that must travel with the change

Both were measured in the target by running the change. A naive implementation reproduces both in
every workspace scaffold generates.

- **`mergeConfig` concatenates arrays.** A factory merging an override that carries `plugins`
  duplicates every plugin the base declares. Select one plugin per name after merging, keeping each
  name's first position and last value. That is also what lets a showcase's output boundary replace
  the browser's in place rather than sit beside it.
  Today no generated wrapper adds a plugin its base already declares, so nothing duplicates yet —
  which makes this a latent trap rather than a live defect, and moving the merge into the factory is
  what closes it.
- **Vitest hands every registered project factory its invocation record.** A factory registered in
  `projects` is called with `{ command, mode, isPreview, isSsrBuild }`, which lands in the override
  position the moment the signature accepts one. Refuse a value carrying `command`. The vendored
  `tests/config.test.ts` already proves this — "keeps Vitest invocation fields out of project
  configurations" — and that proof becomes load-bearing rather than defensive.

## What the first attempt already settled — do not re-derive

Read `tmp/units/s1-report.md` in full before starting. It stopped on scope without writing, and its
sections carry:

- **§ 3** the `mergeOverride` shape, typechecked, with the reason it must not name `PluginOption`
  and the reason `flat()` runs at depth 1;
- **§ 4** both hazards proved red then green, with the instrument retained at
  `tmp/probe/override.test.ts`;
- **§ 5** the ruling that the vendored `tests/config.test.ts` does **not** change, with the evidence —
  so `dist/host` does not move and no re-propagation is owed;
- **§ 6** the before-and-after table for every generated wrapper, each with no semantic difference;
- **§ 7** that this checkout has no `app` axis, so its own adoption covers the `src` and workspace
  factories and the core, server and bin wrappers only.

Take those as given and spend your effort on the change itself. Re-run its instrument to confirm it
still reds and greens, and say so.

## Unknowns

- **Whether anything you touch moves `dist/host`.** The first attempt ruled the vendored
  `tests/config.test.ts` does not change; confirm that still holds at the end, and stop and report if
  your work makes any vendored file false rather than editing one.
- **`assetsInlineLimit` under composition.** The showcase branch sets none today, so Vite's default
  applies, while the browser branch sets `0`. Composed on `appBrowser`, a showcase inherits `0`
  unless it restates the default. `vite-plugin-singlefile` with `useRecommendedBuildConfig` may write
  its own value, which would make the inherited one unread — but that is a claim about a third
  party's hook. **Settle it with a real showcase build, not by reading the plugin**, and do not change
  what a generated workspace builds.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- This checkout's gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- `tests/src/core/templates.test.ts` is the mirrored proof for the generator. It is large; read the
  parts that cover the factories and the wrappers before editing either.
- The generated `vite.config.ts` is produced at scaffold time and is **not** restored by `repair`, so
  existing workspaces keep their current factories until regenerated.

## Scope

**Owned files:**

- `src/core/templates.ts`
- `src/core/compilers.ts` — **granted after the first attempt stopped on it.** The template's
  `{{showcasePlugins}}`, `{{plugins}}`, `{{showcaseBuild}}`, `{{showcaseFactory}}` and
  `{{viteTypes}}` fills are literals here, and every one depends on the `showcase` boolean the change
  deletes.
- `tests/src/core/templates.test.ts`
- `tests/src/core/compilers.test.ts` — **granted for the same reason.** Two of its cases pin the
  shape this change inverts; see the invariant note below.
- `vite.config.ts` — this repository's own
- `configs/src/vite.core.config.ts`, `vite.browser.config.ts`, `vite.server.config.ts`,
  `vite.bin.config.ts`
- `tests/config.test.ts` — **read-only for you.** Named here so you know where it is; see Unknowns.

**Off-limits — do not edit, for any reason:**

- `configs/helpers.ts` and `configs/policy.ts` — vendored in `dist/host/configs/`
- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- Everything under `dist/`
- `package.json`, `host.json`, `ROADMAP.md`, `guides/`, `.orkestrel/`
- Every `src/` file other than `templates.ts` and `compilers.ts`
- `configs/src/vite.browser.config.ts` — it does not exist in this checkout, which has no `app` axis

**Do not bump a version, and do not publish.** The release is the owner's decision and runs from its
own skill.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npm run format:check` and `npm run lint:check` are clean.
2. `npm run check` passes. No `any`, `as`, `!`, or suppression comment in what you add.
3. `applicationBrowser` appears nowhere in the generator or in a generated file.
4. Every generated factory accepts `override?: UserConfig`, and every generated `configs/` wrapper
   passes its configuration through that parameter rather than calling `mergeConfig`.
5. Generated output is proven: a test asserts the generated `vite.config.ts` and each generated
   wrapper for a workspace with a browser app and a showcase, and for one without a showcase.
   **Record it failing first** — name the command and both counts.
6. The plugin-selection and invocation-record hazards are each closed in the generated file and each
   carries a control that must fail. Show both reds.
7. This repository's own `vite.config.ts` and `configs/src/*` take the new shape, and
   `npm run build` still writes the same `dist/` outputs it wrote before — compare, do not assume.
8. `npm test` exits 0, with every vendored file unedited.
9. No vendored file changed, and `dist/host` did not move. Confirm both and report the check.
10. The two sealed-against-a-parameter cases are inverted deliberately, each keeping its planted
    control, and each carrying the reason the parameter is now safe.

**Observations, not criteria:** the wall-clock durations; whether `dist/host` moved.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file. Do not bump or publish. Do not change what
any generated workspace builds — only how its configuration is composed.

Where a detail is ancillary — a parameter name among equals, where a generated comment sits — decide
it, record it, and carry on.

## Output

Write your report to `tmp/units/s1-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The generated shape** — each factory's new signature, and how `appShowcase` composes.
3. **The wrappers** — before and after, per wrapper, with any semantic difference named.
4. **The hazards** — what closes each, and the red that proves each control fails.
5. **The vendored ruling** — whether `tests/config.test.ts` must change, and the evidence.
6. **This repository's own adoption** — and the `dist/` comparison.
7. **Observations.**
8. **What you did not close**, and why.

No process diary.
