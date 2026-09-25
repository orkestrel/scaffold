Verdicts:

1. PASS — `/home/user/scaffold/.orkestrel/veneer/units/fc-instruments/fc-delta.diff:7` adds exactly one line, `transition: Object.freeze(['--vn-motion-feedback', '--vn-motion-feedback']),`, immediately after the `border` line inside the `.form-floating > label` entry of `FORM_FLOATING_CASES`. The diff's context (lines 4-9) shows `padding`, `color`, `border` unchanged and no other change in the hunk, matching Item 1 of the brief (`/home/user/scaffold/.orkestrel/veneer/units/floating-cases-brief.md:48-49`) verbatim.

2. PASS — `fc-red.log.txt:22-25` shows the received `reads.transition` as `["--vn-motion-feedback", "--vn-motion-feedback"]`, in that order. The added line's array literal `['--vn-motion-feedback', '--vn-motion-feedback']` matches this value and order exactly.

3. PASS —
   - `fc-red.log.txt:5-10` shows one case failing (`1 failed`, naming the floating-label case), `fc-red.log.txt:11` shows `AssertionError: expected { …(2) } to deeply equal { …(2) }`, and `fc-red.log.txt:46` shows `exit=1`.
   - Each gate log ends `exit=0`: `fc-check.log.txt:30` (`npm run check`), `fc-lint.log.txt:6` (`npm run lint:check`), `fc-oxfmt.log.txt:6` (oxfmt `--check tests/setupStyles.ts`), `fc-test.log.txt:37` (`npm run test:setup`, 357 passed, 0 failed).

CHECK: PASS
