# Unit LABEL (`lc`), brief 2 — round 2 on the session head: the audit's findings and the downstream proof

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 1, resumed in a different worktree: `/home/user/veneer-lc2`
(branch `unit/lc2` from the session head `7224215`, which carries OVERLAY-FRAMES and UTIL-FRAMES). `b-label-lc-brief.md`
stands for everything this brief does not change: the design (L1 to L9), the law, the host, and the tools and limits.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/lc-audit-verdict.md`, with the three lane verdicts beside
it) confirmed scope, the labels and directions, the byte comparisons, and the other sites, upheld the root
`color-scheme: light` declaration, and ruled claims 2 and 7 broken and claim 6 unresolved. The Orchestrator staged
round 1 on the session head with `lc-stage.sh` (a clean three-way merge) and committed two checkpoints on `unit/lc2`:
`fe36b11` (round 1's owned files and `lc-shared.patch`) and `7852481` (your `lc-theme-owned.patch` and
`lc-journey-link.patch`). The worktree is clean at `7852481`; `node_modules` is a hard-linked copy. Leave
`/home/user/veneer-lc` as it stands; it is round 1's record.

## The work, implementation first

1. **The downstream set (claim 6).** Make the `UNDER_BAR` list in `tests/setup.ts` true against the measured
   composed contrast, and run the journey's composed-contrast case and the link case (the patch you returned) filtered
   with `-t`, at `journey:light-1280*` and `journey:dark-390*`. Search `tests/fixtures/oracle/**`, `tests/app/**`, and
   the app specimen tables for any other pin of a paint this change moves (a label, a hover or active fill, a
   `text-bg` color, a link hover color), and run each case you find. Run the `app:browser` project once as the
   acceptance reading. Name every file the change makes false, with its edit and its run.
2. **The root attribute (F1).** Add to the island proof a case that sets `data-bs-theme="dark"` on
   `document.documentElement` after motion is staged off and asserts that a root-level `.btn-primary` reads the black
   label. Settle what the white readings in `lc-probe-2.log.txt` and `lc-probe-3.log.txt` were, by a run, and record
   the cause.
3. **The consumer's scheme (claim 7).** Determine by a run which cascade the styles project reads (the built,
   lowered stylesheet or the source compiled without the minifier). Rewrite the guide sentence so it holds for both a
   native `light-dark()` and a consumer build that lowers its own `color-scheme` declaration: a `color-scheme` set
   apart from `data-bs-theme` can move the label and never moves the fill, so set the attribute. Add a proof case that
   reads the label under a stylesheet-declared scheme in the cascade the project loads, and assert what the sentence
   states.
4. **The link amount (claim 5).** Make the link proof distinguish the 20% shift from a smaller one: run the mutation
   that moves `$shift` to 10% and retain its red run.
5. **One term (F3).** Name the sRGB triplet one way everywhere, the light and dark pair one mode-named way, and the
   value `mixer` returns and the `$endpoints` map by one term; update every caller in the partials and the fixture.
   The emitted cascade stays byte-identical to round 1's build (retain the comparison).
6. **The parity comment (claim 2).** Say that the functions compute the release's rule at full precision where the
   release reads a rounded luminance table, so a fill within that rounding of the 4.5 bar can pick differently, and
   that every shipped fill picks as the release does (the fixture).
7. **The retune obligation (F2).** Name in the guide every site that compiles a label or a direction from the
   triplet (the button variables, the `text-bg` pairs, the tooltips, and the link hover direction) and say how a retune
   reaches each one, or that it cannot.
8. **The tables (claim 7).** Move the island expectations and the transition case descriptors out of
   `tests/src/styles/components/button.test.ts` into `tests/setupStyles.ts` beside `BUTTON_LABEL_CASES`, with their
   proofs in `tests/setupStyles.test.ts`. Name in the guide the outline states the floor proof reads (hover, active,
   and checked) instead of "every filled and outline state".

## Testing

Run scoped tests only: the styles files you touch, `tests/setupStyles.test.ts` and `tests/setup.test.ts` scoped to
their files, the journey filtered with `-t` to the cases item 1 names, and `tests/src/styles/theme.test.ts` and
`tokens.test.ts`. Run the `app:browser` project and the whole styles project each at most once, as the acceptance
readings. The unfiltered capture variants, the whole suite, and `npm run test:service` are the Orchestrator's at
landing. A timing failure in a file you did not touch is an observation you report with its command.

## Scope

**Owned.** Every file round 1 owned; `guides/veneer.md`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`
(written directly in this worktree: no shared patch this round); `tests/src/styles/theme.test.ts` and
`tests/src/styles/tokens.test.ts`; the `UNDER_BAR` list and its TSDoc in `tests/setup.ts`; the composed-contrast case
and the link case in `tests/app/browser/integration.test.ts`; any other file item 1 finds the change makes false,
edited only at the pinned site.

**Off-limits.** `src/styles/elements/_button.scss`; every partial round 1 did not own; `app/**`;
`tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`; `tests/fixtures/oracle/**` (report a pin there with its edit);
`src/browser/**`, `src/core/**`, `tests/src/browser/**`, and `tests/src/core/**` (D43); `configs/**`; the manifests; the
vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md`.

**Standing conditions.** FOCUS-FRAME, FORMS-FRAMES, and PASSIVE-FRAMES write `tests/setup.ts`,
`tests/app/browser/integration.test.ts`, `tests/setupStyles.ts`, and `app/browser/constants.ts` in their own worktrees;
keep each edit local to its site so the landings merge three-way. The engine session's Placement proof in
`tests/src/browser/Placement.test.ts` fails on Veneer `main`; it is outside this unit.

## Execution

A native subagent: perform the assignment directly and spawn nothing. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

## Report

A successor report, `/home/user/veneer-lc2/tmp/units/lc-report-2.md`, and the same text as the final message, in
brief 1's output shape over round 2: each finding with the change that closes it and its proof or reading; the files
the change makes false outside round 1's set, each with its edit and its run; each gate's command exactly as it ran
with every argument, its exit, and its result line, every log opening with its command; `lc-mutations-2.log.txt`;
`lc-2.diff` (round 2 against `7852481`) and `lc-2-status.txt`. It names every case each mutation reddens, states no
tally of a growable set and no temporal word, and follows every code token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a fix needs an
off-limits file, when the root-attribute case reads a white label after the transition is ruled out, or when item 1
finds a pinned paint whose correct value needs a design ruling. Decide, record, and carry on for names within F3's
constraint, case names, where each case sits, and guide wording.

## Acceptance criteria

1. The formatter check over the changed files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run build:src` exits 0, and the emitted cascade is byte-identical to round 1's build except where a finding
   changes a value (name each).
3. The root-attribute case, the stylesheet-scheme case, and the link-amount mutation each have a retained red run,
   and the styles project exits 0.
4. The filtered journey runs and the `app:browser` reading exit 0.
5. `npm run test:guides`, `npm run test:setup`, and `npm run test:conformance` exit 0.
