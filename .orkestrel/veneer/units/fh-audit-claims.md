# FRAME-HELPERS audit, round 1 — claims

Subject: the unit in `/home/user/veneer-fh` (branch `unit/fh`, uncommitted over `5afa37b`), briefed by
`b-frame-helpers-brief.md` and reported in `b-frame-helpers-report.md`. The diff is `fh.diff`, the status
`fh-status.txt`, the shared patch `fh-shared.patch`, and the logs and instruments `fh-instruments/`, all beside this file.
The final frames are under `/home/user/veneer-fh/tmp/units/fh-final/<variant>/` and the baseline frames under
`/home/user/veneer-fh/tmp/units/fh-baseline/`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists exactly the six owned files, the `guides/veneer.md` change sits in § Tests
   alone, and the shared patch deletes only the § Showcase paragraph on the role-ring registry. The gates the report
   names ran as logged under `fh-instruments/`, and the three `CAPTURE=1` variant journeys each passed 62 of 62.
2. **One helper, one name per concept.** Every lifted driven case and every focus case in
   `tests/app/browser/integration.test.ts` goes through the `FrameManager` `lift` and `focus` methods; no case keeps a
   private lift, wrapper, crop, reach, or pixel-check block. The wrapper, the specimen, and the frame carry one name each
   across cases. The `readElement` function replaces every unchecked `querySelector<HTMLElement>` read in the journey,
   and the region type and the pure readers (`scanFocusReading`, `readImageRegion`, `measureDifference`) live in
   `tests/setup.ts` with tests.
3. **Every focus drive is Tab.** Each focus scenario the report lists reaches focus by the Tab key from its wrapper,
   never by a scripted `focus()` call. The dropdown menu's focus frame is shot on the padded wrapper and shows its
   outline. The carousel focus rule writes `outline: 0` as the release's rule does, so the two carousel cases assert a
   reach of 0 and no outline.
4. **The pointer watcher.** The `focus` method parks the pointer and records any part of the specimen the pointer enters
   while the frame is shot, and a case whose specimen was entered fails with the entered element named.
5. **The outline check measures the ring.** The painted-against-suppressed comparison of the strip above each element
   reads a share near 1 where an outline paints and near 0 where it does not, and each of the report's mutations (the
   crop reading dropped, the pixel check dropped, the drive reverted to a scripted focus, the pointer park dropped)
   reddens the proof it names, with assertions that distinguish it from the passing case.
6. **The lift restores.** The `lift` method returns the specimen to its place, or detaches the copy it attached, on
   every path, the action's rejection included. `padded` defaults to true, `reachable` caps the wrapper at the runner
   window's width, and the region clip defect (a region starting left of the image kept its full width) ran red before
   its fix.
7. **The frames.** Every frame in `fh-final` is the baseline frame except the geometry the report names: the `p-2` to
   `p-3` wrappers grow 16 CSS pixels, a padded specimen lays out narrower by the padding, and a `padded: false` lift is
   byte-identical to its baseline. The dropdown menu's dark focus frame shows its outline.
8. **Prose.** Every changed sentence in `guides/veneer.md` § Tests, every changed TSDoc and comment, and the shared
   patch state what ships. The plaintext comment says focus moves the content box. None states a count, uses a row the
   substitution table in `/home/user/scaffold/.claude/rules/writing.md` bans, or uses a code token without its noun.
