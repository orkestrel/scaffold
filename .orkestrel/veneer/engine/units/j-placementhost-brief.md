# Unit J-PLACEMENT-HOST — the Placement no-fallback proof holds on every gate host

## Role and engine

`builder` on Sonnet, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/placementhost` (branch `unit/placementhost`, cut from Veneer `main` `e2f861f`, `npm ci` already run). The unit is fully specified and taste-free. Perform the assignment directly and spawn nothing.

## Objective

The case "flips to the opposite side when the preferred side overflows, and tries the listed fallbacks instead when given" in `tests/src/browser/Placement.test.ts` asserts, in its no-fallback segment, only what the engine promises: no fallback and no flip. It no longer asserts Chromium 153's shift of the overflowing element into the viewport. Chromium 141 leaves the element overflowing, so that assertion is red on the styles session's host (`decisions.md` § E21, "The other Chromium 141 reds"; `units/j-sanitizer-design-planner-proposal.md` § 4).

## Context

Read `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` first. On `main` the segment reads, around line 218:

```ts
		// With no fallback the platform shifts the overflowing element into the viewport rather than
		// flipping it, so it overlaps its reference instead of sitting above it.
		placement = new Placement({ reference, element }, { position: 'bottom-start', fallbacks: [] })
		box = element.getBoundingClientRect()
		expect([box.bottom, box.top < anchor.bottom, box.bottom > anchor.top]).toEqual([
			innerHeight,
			true,
			true,
		])
		expect(getComputedStyle(element).getPropertyValue('position-try-fallbacks')).toBe('none')
```

`src/browser/Placement.ts` writes `position-try-fallbacks: none` for an empty `fallbacks` list, and `flip-block` for a vertical position with no `fallbacks` option (around line 162).

Host: Windows 11, Git Bash (`npm` and `npx` resolve to the `.cmd` shims), Chromium 153.0.8010.12. Run one case with `npm run test:src:browser -- tests/src/browser/Placement.test.ts -t '<title>'`. On this host, write each multi-step program to a file and run the file.

## Obligation

1. Replace that segment's first assertion with the property that holds on both hosts: the element is not flipped above its reference, `box.bottom > anchor.top`. Keep the `position-try-fallbacks` assertion. Drop the `innerHeight` and overlap literals. Rewrite the comment to say that, with no fallback, the element stays on its preferred side: Chromium 153 shifts it into the viewport, and Chromium 141 leaves it overflowing. Change no other line of the case, and nothing else in the file.
2. Prove the assertion can fail. Plant `'flip-block'` in place of `'none'` for the empty-list branch in `src/browser/Placement.ts`, run the one case, confirm it fails on the new assertion, and restore the file. Record `sha256sum src/browser/Placement.ts` before the plant and after the restore; the two must match. `Placement.ts` is not yours to change otherwise.

## Scope

Owned: `tests/src/browser/Placement.test.ts`, that segment only; `tmp/j-placementhost/**` for logs. The plant in `src/browser/Placement.ts` is temporary and restored. Off-limits: everything else. No install, commit, push, or discarding git command.

## Output

The segment's diff; the planted run's failure line and the restored run's pass line, verbatim; the two digests; the verbatim output of `npm run test:src:browser -- tests/src/browser/Placement.test.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/browser/Placement.test.ts`, and `npx oxfmt --config .oxfmtrc.json --check tests/src/browser/Placement.test.ts`; and `git status --short`, which must list only the test file.

## Deviation contract

Follow `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Deviation protocol. Stop and report if the new assertion does not fail under the plant, or if the case fails on this host after the edit.

## Acceptance criteria

The Placement file passes; the plant reddens the case on the new assertion; the digests match; lint and format pass; the status lists only the test file.
