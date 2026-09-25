# Unit E-ID-MOTION-FADE — the fade on Elements' ease-out, and the shared motion reader

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-mfade` (branch `unit/mfade` cut from
Veneer at `LANDING_HEAD`, `node_modules` hardlinked from `/home/user/veneer`). The unit's proofs launch Chromium, which a
bench sandbox's child cannot, so it runs on the native writing lane. The harness environment block may name another
directory as the primary working directory; start every shell command with `cd /home/user/veneer-mfade &&` and give
every file tool an absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`;
the design verdict `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md`, which binds (its `.fade` row
and § Proof); the terrain `/home/user/scaffold/.orkestrel/veneer/units/e-id-motion-terrain-result.md` § 3 and § 5. No
skill applies.

## Objective

The `.fade` rule's opacity transition reads `--vn-motion-feedback` on `--vn-ease-out` in place of `linear`, recorded as a
departure, and a shared reader of an element's running transition — `sampleTransition` — lands in `tests/setupStyles.ts`
with this unit as its first consumer, so every later motion unit reads rendered motion the same way.

## Context

- **The rule.** `src/styles/components/_fade.scss` writes `opacity var(--vn-motion-feedback) linear` through the
  `transition` mixin, with its reduced-motion twin. Bootstrap 5.3.8's `$transition-fade` is `opacity .15s linear`.
  Elements fades opacity on `ease-out` (`/home/user/elements/src/styles/_tokens.scss`, the motion-contract comment).
- **The pins.** `tests/src/styles/components/fade.test.ts` pins `linear` in its declaration and resolved readings
  (search `linear`). No other style test pins the fade's easing (a search of `tests/src/styles`, `tests/app`, and
  `tests/service` for `linear` finds the fade proof and the spinner, progress, placeholder, and background proofs, whose
  `linear` is their own). The engine session's browser proofs pin the fade's duration, which this unit leaves at
  `150ms`; none pins its easing, so no engine proof changes. Confirm both searches before editing and report them.
- **The reader.** `sampleTransition` takes an element and the property it transitions, and returns what the browser
  runs: the `CSSTransition` for that property from `element.getAnimations()`, its duration and easing from
  `effect.getTiming()`, and the computed value at `currentTime` `0` and at the midpoint, with the transition paused so
  the reading holds. The unit settles its signature and name under `.claude/rules/names.md` and states them in the
  report; it is exported, typed in `tests/setupStyles.ts`, and proved in `tests/setupStyles.test.ts` with a control
  whose transition is removed.
- **The proof.** In `fade.test.ts`, drive the real change (remove and add `.show` on a `.fade` element), read
  `sampleTransition`, and assert the property, a duration equal to the resolved `--vn-motion-feedback`, the easing
  `ease-out`, and a midpoint opacity strictly between the endpoints; at a motion factor of `0` and of `2` the duration
  scales; under the reduced-motion preference no transition runs.
- **The record.** The fade's row in `guides/veneer.md` § Tokens › § Departures changes its Veneer cell, and the
  § Styles › § Fade classes prose states the easing.
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH` and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The styles project reads the built cascade, so run
  `npm run build:src:styles` before a styles test. Format only with
  `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Other worktrees run suites at the same time; a timing
  failure under load is an observation with its reading.

## Unknowns

- Whether Chromium 141 reports a CSS transition's easing through `effect.getTiming().easing` as `ease-out`; measure it
  first and report the reading.

## Scope

**Owned.** `src/styles/components/_fade.scss`, `tests/src/styles/components/fade.test.ts`, `tests/setupStyles.ts` (the
`sampleTransition` declaration and its types only), `tests/setupStyles.test.ts` (its proof only), and `guides/veneer.md`
(the fade's departure row and the § Fade classes prose). **Off-limits.** `src/browser/**`, `tests/src/browser/**`,
`tests/setupBrowser.ts`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
`vite.config.ts`, `package.json`, and every other path. No git command that writes, no install, no `npm run format`;
`npm run build` is allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Measure the Unknown, then write `sampleTransition` with its proof and the fade proof, and run the fade proof red at
   the base, recording the command and its failing count.
2. Change the rule, the departure row, and the prose; run the proofs green.
3. Mutation: write `linear` back in `_fade.scss`; the fade proof must fail with an `AssertionError`, and the ledger's
   stale-departure case must redden; restore byte-identically.
4. Run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:styles`, `npm run test:setup`,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy`, each logged to
   `tmp/units/mfade-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/mfade-report.md` and return the same text: the Unknown's reading; the changes; the failing-first and
green readings with commands and counts; the mutation table; the gate table; `tmp/units/mfade.diff`
(`git diff LANDING_HEAD`) and `tmp/units/mfade-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the reader's name and
signature, the case titles, and the prose wording. Stop and report if an engine proof reads the fade's easing, if a
change needs a file outside the owned set, or if a gate reads red outside the change's reach.

## Acceptance criteria

The fade proof reads red at the base and green after; the easing mutation reddens it with an assertion and the ledger
with a stale departure; `sampleTransition` is proved with its control; every gate in Execution step 4 exits 0.
