# frames-briefs.py: writes the PASSIVE-FRAMES, OVERLAY-FRAMES, and UTIL-FRAMES briefs from one template, each
# carrying its rows of b-portfolio-verify-verdict.md, derived from b-forms-frames-brief.md with every subject field
# rewritten. Usage: python3 frames-briefs.py <base commit> fp fo fu
import pathlib, sys
U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
base = sys.argv[1]
host = (U / 'b-forms-frames-brief.md').read_text().split('**Host.**', 1)[1].split('## Unknowns', 1)[0]
UNITS = {
  'fp': dict(name='PASSIVE-FRAMES', title='the passive family\'s unframed states', rows='P14', lens='pv-passive-lenses.json',
    objective='Every developer-written passive state the partials write has a frame that shows it.',
    work='''1. **P14, the frames.** Give each developer-written state a specimen row or a driven scenario with its frames:
   the grow spinner and the small grow spinner (their specimens exist in `SPINNER_SPECIMENS`); a disabled button in
   each form the partial writes (the `disabled` attribute, the `.disabled` class, a disabled fieldset, and an
   anchor with `aria-disabled="true"`); the hover and active faces of every filled and outline role beyond primary;
   the `btn-link` hover, focus, and active states; the list-group role items' action hover and active states and
   their active state; and the `placeholder-lg` step beside the default step in one frame a reader can compare.
   Engine-written transition states stay unframed under V7 of `b-collapse-verify-verdict.md`.''',
    owned='The passive specimen tables in `app/browser/constants.ts` (`BUTTON_SPECIMENS`, `BUTTON_GROUP_SPECIMENS`, `SPINNER_SPECIMENS`, `PLACEHOLDER_SPECIMENS`, and `LIST_GROUP_SPECIMENS`, with their TSDoc); the passive registry rows in `tests/setup.ts` and their TSDoc; the passive driven cases this unit adds to `tests/app/browser/integration.test.ts`; the passive section proofs under `tests/app/browser/sections/`; `tests/setup.test.ts` and `tests/app/browser/Showcase.test.ts` where a registry or specimen change makes a case false.',
    shared='the passive class sections a specimen changes and § Tests', offl='every partial under `src/styles/**`',
    crit='3. `npm run test:setup` exits 0 with the added registry rows, and the passive section proofs and `tests/app/browser/Showcase.test.ts` exit 0 under the `app:browser` project.'),
  'fo': dict(name='OVERLAY-FRAMES', title='the carousel picture, the carousel proof, and the overlay family\'s unframed states', rows='P11, P12, and P16', lens='pv-overlays-lenses.json',
    objective='The carousel specimens fill their carousel at every width, the carousel proof holds when a specimen is added, and every developer-written overlay state has a frame that shows it.',
    work='''1. **P11, the carousel picture.** At 1280 the carousel pictures are 800 pixels wide inside a 1280-pixel
   carousel, so the controls, the caption, and the indicators sit over the page surface. The release's markup gives
   each picture `d-block w-100`; give the specimens' pictures the width the release's markup gives them, and prove
   in the carousel section proof that each picture spans its item. Read the resting frames' previous chevron in
   the recapture: BCF's released pointer and padded lift cover the resting frames, so report whether the hover
   residue remains, with the reading.
2. **P12, the advancing case.** The carousel section proof's advancing case fails whenever any specimen is added:
   the incoming picture reads `undefined` after `scrollIntoView` (CLOSE-OUT's observation in
   `b-close-out-report.md`). Find the cause with a probe and fix the case, and retain the red run of an added
   specimen before and after.
3. **P16, the frames.** The next carousel control's hover and focus (the driven case selects only the previous
   control); a roleless `.alert`; and the popover header strip at a size a reader can see (an element frame over
   the header). The engine-written transition states stay unframed under V7 of `b-collapse-verify-verdict.md`.''',
    owned='The overlay specimen tables in `app/browser/constants.ts` (`CAROUSEL_SPECIMENS`, `ALERT_SPECIMENS`, `POPOVER_SPECIMENS`, with their TSDoc); the overlay registry rows in `tests/setup.ts` and their TSDoc; the overlay driven cases in `tests/app/browser/integration.test.ts`; `tests/app/browser/sections/CarouselSection.test.ts`, `AlertSection.test.ts`, and `PopoverSection.test.ts`; `tests/setup.test.ts` and `tests/app/browser/Showcase.test.ts` where a registry or specimen change makes a case false.',
    shared='§ Carousel classes, § Alert classes, § Popover classes, and § Tests', offl='every partial under `src/styles/**`',
    crit='3. `npm run test:setup` exits 0 with the added registry rows, and the overlay section proofs and `tests/app/browser/Showcase.test.ts` exit 0 under the `app:browser` project, with the advancing case green under an added specimen.'),
  'fu': dict(name='UTIL-FRAMES', title='the text-bg label polarity, the utility family\'s unframed states, and § Showcase', rows='P9, P17, and P18', lens='pv-utilities-lenses.json',
    objective='The `text-bg-*` label follows the fill Veneer ships, every developer-written utility state has a frame that shows it, and § Showcase reads whole.',
    work='''1. **P9, the label polarity.** `text-bg-info` and `text-bg-warning` keep the release's black label on
   Veneer's darker `info` and `warning` fills (about 3.6 and 4.2 to 1), while the buttons on the same fills carry
   white. The release picks each label with its `color-contrast` function against its own fill
   (`node_modules/bootstrap/scss/helpers/_color-bg.scss`); make `src/styles/utilities/_color-bg.scss` pick each
   role's label by the contrast of the fill Veneer ships, the way `src/styles/components/_button.scss` picks the
   button label, and prove the label and its contrast for every role in both modes in the color-bg style proof,
   with a mutation that restores the black label. Record the change in the ledger (shared patch).
2. **P17, the frames.** Role-link hover and focus; `link-body-emphasis` hover; the link opacity, underline offset,
   underline color, and underline opacity specimens, which exist and have no scenario; the icon links at rest,
   hover, and focus; every `focus-ring-<role>` under focus; the default focus ring at rest; and
   `.visually-hidden-focusable` revealed by `:focus-within`. Record the `xxl` step, print media, and scrollbars as
   outside the journey's variants.
3. **P18, § Showcase.** The guide's § Showcase paragraph carries garbled fragments from mechanical merges (a
   repeated "Flex beside the flex utilities" clause, a repeated list clause, and a dangling Offcanvas run).
   Rewrite the paragraph so every region appears once, in the order the showcase mounts them (shared patch).''',
    owned='The utility specimen tables in `app/browser/constants.ts` (`LINK_SPECIMENS`, `FOCUS_RING_SPECIMENS`, `VISIBILITY_SPECIMENS`, `COLOR_SPECIMENS`, and `TEXT_SPECIMENS`, with their TSDoc); the utility registry rows in `tests/setup.ts` and their TSDoc; the utility driven cases in `tests/app/browser/integration.test.ts`; the utility section proofs under `tests/app/browser/sections/`; `src/styles/utilities/_color-bg.scss` and its style proof; `tests/setup.test.ts` and `tests/app/browser/Showcase.test.ts` where a registry or specimen change makes a case false.',
    shared='the `text-bg` ledger row, § Showcase, the utility sections a specimen changes, and § Tests', offl='every other partial under `src/styles/**`',
    crit='3. `npm run build:src` exits 0, the color-bg proof reads every role\'s label and reddens on its mutation, `npm run test:setup` exits 0 with the added registry rows, and the utility section proofs and `tests/app/browser/Showcase.test.ts` exit 0.'),
}
for key in sys.argv[2:]:
    u = UNITS[key]
    text = f"""# Unit {u['name']} (`{key}`) — {u['title']}

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-{key}` (branch `unit/{key}` from the
session head `{base}`). The executor that opens this brief is that subagent.

## Objective

{u['objective']} The design is `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md`, rows
{u['rows']}, with the lens returns `/home/user/scaffold/.orkestrel/veneer/units/{u['lens']}` (the critic's
`unframed` list names each state's selector and site).

## Context

**The work, implementation first.**
{u['work']}

Each focus or pointer state is an element frame of its lifted specimen inside a padded wrapper, the pattern the
`nav-underline-focus` case uses, never a page frame; each pointer-held placement carries the structural guard
`expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)`; each resting state is a
`CASCADE_KEYS` row over a specimen.

**Standing conditions.**
- Other frames units run beside this one in their own worktrees and add rows and cases to the same shared files.
  Keep each edit local to the site it changes and inside this family's run of each file; every overlap merges
  three-way at landing.
- THEME owns `src/styles/_tokens.scss` and `src/styles/_theme.scss`.
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main`; it is
  outside this unit.
- The container is loaded. A timing failure is an observation you report with its command.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none.
Every added case runs red first against the tree without its fix, and each named mutation's red run is retained.
A test is named for what it proves, never for a row identifier. Section proofs derive their populations from the
specimen tables.

**Host.**{host.replace('`fr` prefix', f'`{key}` prefix')}## Unknowns

- Whether each state can be reached in Chromium from the showcase: drive the ones the installed functions reach,
  and record any that they do not, with the reading.

## Scope

**Owned.** {u['owned']}

**Shared (report-only).** `guides/veneer.md` ({u['shared']}). Return one `{key}-shared.patch` against `{base}` and
edit nothing there.

**Off-limits.** {u['offl']}; every other specimen table; `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`;
`tests/fixtures/oracle/**`; `src/browser/**`; `src/core/**`; `tests/src/browser/**`; `tests/src/core/**` (D43);
`configs/**`; the manifests; the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`;
`ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only;
a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-{key}/tmp/units/{key}-report.md` and the same text as the final message: each row's
change, its specimen or scenario, its frames by path, and its proof with its red run; each state recorded as
unreachable with its reading; each gate's command exactly as it ran with every argument, its exit, and its result
line; the mutation log `tmp/units/{key}-mutations.log.txt`; `{key}-shared.patch`, `{key}.diff`, and `{key}-status.txt`
under `tmp/units/`. The report states no tally of a growable set and no temporal word, and follows every code
token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a row needs an
off-limits file or a cascade change the brief does not name. Decide, record, and carry on for specimen labels,
scenario stems, case titles, the order of added rows, and where each case sits.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. Each added proof reddens on its mutation.
{u['crit']}
4. A `CAPTURE=1` run at `light-1280` and at `dark-390` writes every added frame and passes the journey.
5. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `{key}-shared.patch` applied.

**Observations, not criteria.** The other capture variants, the whole suite, and `npm run test:service` are the
Orchestrator's at landing.

## Review evidence

`{key}.diff`, `{key}-status.txt`, `{key}-shared.patch`, `{key}-report.md`, `{key}-mutations.log.txt`, and the frames
the report names.
"""
    names = {'fp': 'b-passive-frames-brief.md', 'fo': 'b-overlay-frames-brief.md', 'fu': 'b-util-frames-brief.md'}
    (U / names[key]).write_text(text)
    print(key, 'written')
