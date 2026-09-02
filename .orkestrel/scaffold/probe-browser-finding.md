# Finding — `prove` cannot serve a browser Vitest project (2026-09-02)

Subject: `@orkestrel/probe` 0.0.11, installed with `npm install --no-save` into `terrain` (Vitest
4.1.11, Playwright Chromium `app:browser` project), driven by the Orchestrator's instrument
`scratchpad/probe-browser.mjs` from the session scratchpad. The claim: candidate
`app/browser/probeCandidate.ts` exporting a class string; test at
`tests/app/browser/probeCandidate.test.ts` rendering a `btn btn-primary` button and reading its
computed background; control: the same candidate typed `number`, `stage: 'type'`.

## Run 1 — unpatched

```text
ProbeError: The runtime stage found no configured Vitest project named app:browser
  origin: 'claimant', code: 'missing', context: { stage: 'runtime', path: 'tests/app/browser/probeCandidate.test.ts' }
```

`scratchpad/list-projects.mjs` (`createVitest('test', { root: terrain })`) lists the instantiated
projects as `app:core`, `policy`, `config`, `probe`, and `app:browser (chromium)`. Vitest 4 names
each browser instance `<label> (<browser>)`; `RuntimeStage.#project` matches
`candidate.name === name` against the inferred `app:browser`.

## Run 2 — throwaway copy patched to accept `name + ' ('`

```text
case type: 0 issues (1066 ms)
case lint: 0 issues (1090 ms)
case runtime: 1 issue (1157 ms)
  [claimant] tests/setupBrowser.ts:16 document is not defined
control type: 2 issues (313 ms)
  [claimant] tests/app/browser/probeCandidate.test.ts:5 Type 'number' is not assignable to type 'string'.
  [claimant] app/browser/probeCandidate.ts:1 Type 'string' is not assignable to type 'number'.
control lint: 0 issues (220 ms)
control runtime: 1 issue (382 ms)
  [claimant] tests/setupBrowser.ts:16 document is not defined
no receipt
```

The type and lint stages served the browser project's own `tsconfig` and its test path. The
runtime stage ran the browser project's setup file in a Node worker: `RuntimeStage` creates the
specification with the `threads` pool (`probe/src/server/stages/RuntimeStage.ts:196` per the
objective design lane's reading), so Browser Mode never launched. The control broke at `type` as
declared; the case failed at `runtime` for a reason that is the instrument's, not the claim's.

## Ruling

Two defects in `@orkestrel/probe`, both reproduced, both outside this campaign's scope:

1. Project lookup does not match a browser project's instance-expanded name.
2. The runtime stage pins the `threads` pool, so a browser project's specification runs under Node.

Carrier: a successor brief against `@orkestrel/probe` (design tension "does `probe` gain a browser
lane"). Until it lands, a rendered question routes to a browser run's written artifact, never to
`prove`.

Containment: `git status --porcelain` in terrain read `D  package-lock.json` / `?? package-lock.json`
before and after every run (a pre-existing state of the user's); no generated specification or boot
file remained under `tests/app/browser/` or `tmp/probe/` after the runs. The `--no-save` install is
pruned back out of `terrain/node_modules` at the end of the experiment.
