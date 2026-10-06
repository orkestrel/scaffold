# Unit stage-b-B4 — the gated Collapse `intrinsic` leaf (engine half)

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-b4` (a detached veneer worktree at `9fb2be1`; `node_modules` copied from the main checkout; `dist` built). Owned files: `src/browser/Collapse.ts`, `src/browser/types.ts` (the `CollapseOptions.intrinsic` leaf and the `CollapsePluginOptions` record only), `src/browser/plugins.ts` (`createCollapsePlugin(options?)` only), `src/browser/index.ts` (the export of the added type only, where the file re-exports types by name), `tests/src/browser/Collapse.test.ts`, `tests/src/browser/plugins.test.ts` (the collapse plugin cases only), `tests/src/browser/helpers.test.ts` (one markup-refusal case), and the `collapse-intrinsic` rows of the departure table in `guides/veneer.md` § Engine departures (rows only; no prose). Nothing else under `src/`, nothing under `app/`, nothing under `/home/user/veneer`. You may create one scratch probe file `tests/src/browser/intrinsic.probe.test.ts` and must delete it before reporting. Commit nothing.

## Objective

`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/browser-stage-b-verdict.md` § "Added behind a gate: Collapse `intrinsic` (unit B4)" (near line 637; read it whole, with § "The opt-in rule" near line 62 and the W5 row `B4 native-intrinsic` near line 1122): a typed leaf `intrinsic` on `CollapseOptions`, default `false`, under which a vertical panel expands from `0px` to `auto` under an engine-held inline `interpolate-size: allow-keywords`, so its height follows content that changes during the transition. Markup never sets it. The slice lands only when the gate reading passes on the implemented branch; a failing gate returns "drop" with the tree restored to `9fb2be1` (`git -C WT status --porcelain` empty).

## Contract (verbatim from the verdict)

- `CollapseOptions.intrinsic?: boolean`, with the TSDoc the verdict gives: if `true`, a vertical panel expands to its intrinsic height under an engine-held `interpolate-size: allow-keywords`, so its height follows content that changes during the transition; if `false`, it expands to its measured `scrollHeight`; a horizontal panel always uses measured pixels; markup never sets this leaf; default `false`.
- `export interface CollapsePluginOptions { readonly intrinsic?: boolean }` with the verdict's TSDoc and example.
- `createCollapsePlugin(options?: CollapsePluginOptions)` copies the leaf when the factory runs and creates every collapse with `{ toggle: false, intrinsic }`; the plugin options record carries only this leaf.
- `resolveCollapseOptions` keeps reading only Bootstrap's keys from the markup record and spreads the typed options over them, so `data-bs-intrinsic` on the panel sets nothing (the held `helpers.test.ts` case: `data-bs-intrinsic="true"` resolves to no `intrinsic` key, while the typed option resolves to `true`).

## Mechanics (vertical panel under the leaf)

1. **Show.** A `Hold` dedicated to the transition acquires the panel's inline `interpolate-size` slot and the engine writes `allow-keywords`; the panel takes `0px` (today's `:124`); the trigger writes keep their place (`:125`); `reflow` replaces the `scrollHeight` flush (`:126-127`); the panel takes `auto`. `#completeShow` is unchanged in what it clears, and the dedicated `Hold` releases at show completion (where the inline dimension clears, `:205`) and in `destroy` (`:164-170`). The lifetime `Hold` for the trigger writes is unchanged.
2. **Hide** is unchanged (`:132-155`): it measures `getBoundingClientRect` and writes pixels.
3. **Refusal during a transition.** `show` and `hide` keep their refusal while `.collapsing` is present. Read it; do not add a reversal.
4. **Phase.** `get phase` holds, because `auto` is a non-empty inline value.
5. **Accordion siblings** created at `:114` inherit the leaf.
6. **Horizontal** (`collapse-horizontal`) ignores the leaf and keeps measured pixels.
7. Reduced motion: `awaitTransition` resolves as today when no transition runs; the leaf changes nothing there except the `auto` write and its clearing.

## The gate (first, before any test lands)

Build the probe from the verdict's reading (`chk:50`): a panel whose content grows from 120 px to 240 px mid-transition (append content in a `transitionrun` listener or after one rendering frame). Under the engine with `intrinsic: true`, sample the panel's `getBoundingClientRect().height` late in the transition and at completion: the sampled height follows the grown content (the verdict read 234.72 px toward `auto` against 117.36 px toward `120px` on the pixel path). Under `intrinsic: false` and under Bootstrap, the sampled endpoint is the measured 120 px. Unchanged-content control: with content that does not change, the engine's `intrinsic: true` completion height equals the `intrinsic: false` completion height and Bootstrap's. Record the four readings (engine on, engine off, Bootstrap, unchanged control) with Chromium's version. The gate passes when the growth reading is positive and the control reads equality. A failing gate: revert every change, report "drop" with the readings, and stop.

## Tests (after the gate passes)

In `tests/src/browser/Collapse.test.ts`, beside the oracle cases and in their style (engine against Bootstrap on identical markup through the oracle harness; read the file's first two cases and `tests/setupBrowser.ts`'s oracle section for the transcript conventions), add cases that read: the `0px` to `auto` start through `reflow` (the transcript's `panel::writes[n].height.after` reads `auto` for the engine and `120px` for Bootstrap); `panel::interpolate-size` reads `allow-keywords` for the engine and `<absent>` for Bootstrap; the refusal of `show` and `hide` calls while `.collapsing`; the dedicated `Hold` released at show completion (no inline `interpolate-size` after `shown`) and on `destroy` mid-transition (restored to the original inline value, with a planted prior inline value as the control); reduced motion; a padded and bordered panel landing at its laid-out height; accordion propagation (a sibling the instance creates inherits the leaf); the horizontal and leaf-off regression controls (no `interpolate-size` write, measured pixels). The two departure rows take the prefix `collapse-intrinsic`, and `consumes every selected departure` passes with them consumed. In `plugins.test.ts`, the factory with `{ intrinsic: true }` creates components carrying the leaf and the bare factory creates none. Keep every case independent of Chromium version where the reading does not depend on it.

Departure rows, added to `guides/veneer.md` § Engine departures in the table's existing column order (scenario, path, Bootstrap, engine, and the rest as the header reads): `collapse-intrinsic` with path `panel::writes[n].height.after`, Bootstrap `120px`, engine `auto`; and `collapse-intrinsic` with path `panel::interpolate-size`, Bootstrap `<absent>`, engine `allow-keywords`. Match the exact path and value syntax of neighbouring rows (read how `tests/setup.ts` `readDepartures` parses the section near line 1501 to 1570, and the `<unset>` token convention).

## Gates

`WT` is `/home/user/.wave/veneer-b4`. Direct: `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --check` and `WT/node_modules/.bin/oxlint --config WT/.oxlintrc.json --deny-warnings` on every owned file; `git -C WT diff --check`; `git -C WT status --porcelain` lists only owned files at the end. Through the host queue, a fresh folder each (`flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-NAME --kind command --cwd WT -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`):

1. the probe file alone (`WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --project src:browser WT/tests/src/browser/intrinsic.probe.test.ts`);
2. typecheck `WT/node_modules/.bin/tsc --noEmit -p WT/configs/src/tsconfig.browser.json` and `WT/node_modules/.bin/tsc --noEmit --project WT/tsconfig.json`;
3. `Collapse.test.ts`, `plugins.test.ts`, and `helpers.test.ts` each alone (same form); every case green;
4. the whole `src:browser` project (same form without a file); every case green except the six host-bound titles `tmp/units/journey-cost/host-bound.md` lists (five in `Placement.test.ts`, one in `Tip.test.ts`), which may fail;
5. the guide parity `node --experimental-strip-types WT/tests/guides.test.ts` run with `cwd` WT (direct), and `WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --project policy` through the queue.

Never `cd`; never run vitest outside the queue; a reused folder exits 65; one re-run for a Vite optimizer import failure before any test body.

## Output

Final message: the gate readings table (engine on, engine off, Bootstrap, unchanged control; Chromium version) and the gate verdict (pass or drop); the diff; `git status --porcelain`; each gate's command, folder, exit, and bare result; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
