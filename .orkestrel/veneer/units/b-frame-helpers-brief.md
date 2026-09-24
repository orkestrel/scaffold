# Unit FRAME-HELPERS (`fh`) — one focus-frame helper, and every focus drive through it

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-fh` (branch `unit/fh` from the session head
named in the dispatch message, which carries FOCUS-FRAME, FORMS-FRAMES, PASSIVE-FRAMES, OVERLAY-FRAMES, and UTIL-FRAMES).
The work is test-harness implementation in Chromium, which the bench sandbox cannot launch, so it runs native.

## Objective

Every driven focus and state frame in the journey goes through one shared helper in `tests/setupBrowser.ts`, every
focus case reaches focus the way the release paints its outline, and the frames the helper shoots are unchanged or
better.

## The work, implementation first

1. **One helper (the F1 findings of `ff-audit-verdict.md` and `fr-audit-verdict.md`).** The lift, padded wrapper,
   place, crop reading, ring reach, and pixel-guard blocks repeat in each driven case the frames units wrote. Extract
   them into one exported helper in `tests/setupBrowser.ts` (a class method on `FrameManager` or one exported function,
   whichever keeps one engine), with its pure parts in `tests/setup.ts`, and route every driven focus and state case in
   `tests/app/browser/integration.test.ts` through it. Delete each private copy, including the `nav-underline-focus`
   case's reach reading.
2. **One name (F2).** One concept, one term: the lifted specimen, its padded wrapper, and the shot get one name each
   across every case.
3. **The region type (R3).** Name the structural box type `computeCroppedEdges` and `computeRingBand` read, and move it
   where both the pure helpers and `readRegion` can import it.
4. **The drives (R5 and FOCUS-FRAME's observation).** The `dropdown-menu-focus` and `captioned-carousel-focus`
   scenarios, and UTIL-FRAMES' link focus case (a scripted focus with a key press, which matches `:focus-visible` and
   paints no outline), reach focus by Tab, and their frames show the outline; the pixel guard in the helper holds each.
5. **The reach key (OVERLAY-FRAMES' observation).** The next control's wrapper keys its width to the `lg` boundary
   where the limit is the runner's 800-pixel window; key it to the window the runner opens.
6. **The carried comment (FORMS-FRAMES round 3, claim 3).** The comment above the empty-plaintext reading says focus moves the content box, never text.
7. **The referrals of `ff-audit-2-verdict.md`.** Replace each `querySelector<HTMLElement>` narrowing in the cases you
   route with a checked read (R-b), and give the parked pointer a watcher, or record the entry inert by a run, on the
   validation and floating specimens it enters (R-c).
8. **The mode-token limit.** The `light` and `dark` role hovers and rings stay unframed; the guide states that limit in
   one sentence in § Tests, replacing the two units' sentences.

## Testing

Scoped first: `tests/setup.test.ts` and `tests/setupBrowser.test.ts` for the helper, then the journey filtered with
`-t` to the cases you route, at `journey:dark-1280*` and `journey:light-390*` with `CAPTURE=1`, widening as the
conversion covers more cases. Run the whole `journey:dark-390*` variant once as the acceptance reading. The other
unfiltered capture variants, the whole suite, and `npm run test:service` are the Orchestrator's at landing.

## Scope

**Owned.** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`,
`tests/app/browser/integration.test.ts`, and `guides/veneer.md` § Tests.

**Off-limits.** `src/**`, `app/**`, `tests/fixtures/oracle/**`, `configs/**`, the manifests, the vendored
`tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`, and `ROADMAP.md`. The engine session's
J-TESTPIN edits `holdOraclePointer` in `tests/setupBrowser.ts`; leave that function as it stands.

**Standing conditions.** LABEL writes `tests/setup.ts` (`UNDER_BAR`) and two journey cases (the composed-contrast case
and the link case) in its own worktree; keep each edit local so the landings merge three-way. The container is loaded;
a timing failure in a file you did not touch is an observation you report with its command.

## Execution

A native subagent: perform the assignment directly and spawn nothing. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

## Report

`/home/user/veneer-fh/tmp/units/fh-report.md` and the same text as the final message: the helper's signature and the
cases routed through it; each drive changed with its frame reading; each mutation with its red run
(`fh-mutations.log.txt`: the helper's crop reading dropped, its pixel guard dropped, a drive reverted to a scripted
focus); each gate's command, exit, and result line; `fh.diff` and `fh-status.txt`. Keep it short.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a fix needs an off-limits
file. Decide, record, and carry on for the helper's shape and name, case order, and wording.

## Acceptance criteria

1. The formatter check over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. No driven case keeps a private copy of the lift, wrapper, crop, reach, or guard block.
3. The routed cases pass under the filtered captures, and each named mutation reddens.
4. `npm run test:setup` and `npm run test:guides` exit 0.
