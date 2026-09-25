# Unit E-ID-MOTION-FADE, round 2 — the fade on Elements' ease-out, and the shared motion reader

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-mfade` (branch `unit/mfade` cut from
Veneer at `2376710`, `node_modules` hardlinked from `/home/user/veneer`). The unit's proofs launch Chromium, which a
bench sandbox's child cannot, so it runs on the native writing lane. The harness environment block may name another
directory as the primary working directory; start every shell command with `cd /home/user/veneer-mfade &&` and give
every file tool an absolute path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`;
the design verdict `/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md`, which binds (its `.fade` row
and § Proof); the terrain `/home/user/scaffold/.orkestrel/veneer/units/e-id-motion-terrain-result.md` § 3 and § 5. No
skill applies.

**What changed from `e-id-motion-fade-brief.md`, and why.** Round 1 stopped before editing
(`units/e-id-motion-fade-report.md`): the `setup` project runs `tests/setupStyles.test.ts` in Node, so no transition
runs there. D50 (`units/decisions-round-2.md`) moves the reader to `tests/setupBrowser.ts`, proved in
`tests/setupBrowser.test.ts` on Chromium. Round 1's readings stand and are restated in § Unknowns: the easing reads
`ease-out` through `effect.getTiming().easing`, and at a motion factor of `0` Chromium starts no transition.

## Objective

The `.fade` rule's opacity transition reads `--vn-motion-feedback` on `--vn-ease-out` in place of `linear`, recorded as a
departure, and a shared reader of an element's running transition — `sampleTransition` — lands in `tests/setupBrowser.ts`
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
  report; it is exported and typed in `tests/setupBrowser.ts`, and proved in `tests/setupBrowser.test.ts` (the
  `setup:browser` project, Chromium) with a control whose transition is removed. `tests/setupBrowser.ts` is shared with
  the engine session: add the export and its types, and change nothing else in the file.
- **The proof.** In `fade.test.ts`, drive the real change (remove and add `.show` on a `.fade` element), read
  `sampleTransition`, and assert the property, a duration equal to the resolved `--vn-motion-feedback`, the easing
  `ease-out`, and a midpoint opacity strictly between the endpoints; at a motion factor of `2` the duration doubles, and
  at a motion factor of `0` no transition runs, because Chromium starts none at a zero duration; under the reduced-motion preference no transition runs.
- **The record.** The fade's row in `guides/veneer.md` § Tokens › § Departures changes its Veneer cell, and the
  § Styles › § Fade classes prose states the easing.
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH` and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The styles project reads the built cascade, so run
  `npm run build:src:styles` before a styles test. Format only with
  `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Other worktrees run suites at the same time; a timing
  failure under load is an observation with its reading.

## Unknowns

None. Round 1 measured the easing reading on Chromium 141: one `CSSTransition` on `opacity`, `duration` `150`, and
`easing` `linear` at the base, `ease-out` under an inline override, and no transition at a motion factor of `0`.
Round 1 also located the ledger case (`names no departure the compiled cascade no longer carries` in
`tests/conformance.test.ts`), the `.fade` row in the `transition` table of § Departures, the two § Fade classes
sentences that state the easing, and the three `fade.test.ts` cases that pin `linear`.

## Scope

**Owned.** `src/styles/components/_fade.scss`, `tests/src/styles/components/fade.test.ts`, `tests/setupBrowser.ts` (the
`sampleTransition` declaration and its types only), `tests/setupBrowser.test.ts` (its proof only), and `guides/veneer.md`
(the fade's departure row and the § Fade classes prose). **Off-limits.** `src/browser/**`, `tests/src/browser/**`,
`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`),
`vite.config.ts`, `package.json`, and every other path. No git command that writes, no install, no `npm run format`;
`npm run build` is allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Measure the Unknown, then write `sampleTransition` with its proof and the fade proof, and run the fade proof red at
   the base, recording the command and its failing count.
2. Change the rule, the departure row, and the prose; run the proofs green.
3. Mutation: write `linear` back in `_fade.scss`; the fade proof must fail with an `AssertionError`, and the ledger's
   stale-departure case must redden; restore byte-identically.
4. Run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:styles`, `npm run test:setup`, `npm run test:setup:browser`,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy`, each logged to
   `tmp/units/mfade-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/mfade-report.md` and return the same text: the Unknown's reading; the changes; the failing-first and
green readings with commands and counts; the mutation table; the gate table; `tmp/units/mfade.diff`
(`git diff 2376710`) and `tmp/units/mfade-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the reader's name and
signature, the case titles, and the prose wording. Stop and report if an engine proof reads the fade's easing, if a
change needs a file outside the owned set, or if a gate reads red outside the change's reach.

## Acceptance criteria

The fade proof reads red at the base and green after; the easing mutation reddens it with an assertion and the ledger
with a stale departure; `sampleTransition` is proved with its control; every gate in Execution step 4 exits 0.
