# Unit J-CONCERNS-A, round 2 — the Button motion case pins no cascade value

Successor of `j-concerns-a-brief.md`, whose sections stand except where this brief replaces them.
- Round 1 is committed as `e92fb7e` on `unit/concerns-a`.
- The Orchestrator merged Veneer `main` `094a71e` into it as `bd5c882`. That merge carries the styles session's E-ID-BUTTON-CASCADE (`13853b1`).
- The worktree is clean at `bd5c882`, and both owned files read `78 passed` there.

## Why

`decisions.md` § E32, recorded after round 1 was dispatched, rules that an engine's motion proof pins no duration, easing, or transitioned property list. Those values belong to the styles session, whose style proofs pin them. Read E32 whole.

The Orchestrator's replay confirmed round 1: the control is green, all ten mutations are killed by an assertion, and every source is restored (`units/j-concerns-a-mutations-orchestrator.log.txt`). Reading the diff found one conflict with E32. It is in the case `completes a toggle and dispatches its event while the shipped cascade still transitions the host`:
- `expect(getComputedStyle(host).backgroundColor).toBe('rgba(0, 0, 0, 0)')` pins the button cascade's resting background. The read is there to compute the host's style before the token write, and a read that asserts nothing does the same job.
- `expect.arrayContaining(['background-color'])` pins a transitioned property the cascade owns.

## The obligation

- **C1.** Rewrite the case so that it pins no cascade value. It still proves the E32 reading: at the toggle event, the host has at least one running animation the shipped cascade started, and the toggle has completed (`pressed` and `aria-pressed` read the new state).
- **C2.** Keep the case red under the `button-motion` mutation. Re-run `bash tmp/j-concerns-a/mutations.sh button-motion button-focus button-blur` and record the reading.
- **C3.** Read your round-1 cases against E32 once more, and name any other assertion that pins a cascade value, with its fix.

## Scope

Owned: `tests/src/browser/Button.test.ts`, and `tests/src/browser/ScrollSpy.test.ts` only for a C3 fix. Everything else is as round 1.

## Output

Your final message holds:
- the rewritten case;
- the C2 mutation readings, verbatim;
- the C3 reading;
- the acceptance output verbatim (`npm run check`, `npm run lint:check`, `npm run format:check`, and both owned files in a scoped run);
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
