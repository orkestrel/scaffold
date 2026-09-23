Verdict — checker, claims 4 and 5 (T4 TEST-CLIP)

**Claim 4 (the guide).** CONFIRMED.

- Row order: the `clipsOverflow` Surface row sits directly before `measureContent`'s row — `t4.diff:9-10`, landing at `/home/user/test/guides/test.md` in the `### Browser` Surface table.
- TSDoc-guide summary parity: TSDoc first sentence `t4.diff:47` ("Reports whether an element clips its descendants' overflow at its own padding box.") equals the guide row's Summary cell `t4.diff:9`, verbatim.
- Capture-paragraph sentence on the clipping cap: present at `/home/user/test/guides/test.md:620-624` ("An ancestor that clips its overflow (`clipsOverflow`: …) caps a descendant's edge at that ancestor's padding edge …"), matching `t4.diff:18-22`.
- Pattern's closing sentence: present at `/home/user/test/guides/test.md:3424-3426` ("… except inside a frame that clips its overflow, where a viewport-bound child ends at the frame's edge (`clipsOverflow` names the frames that count)."), matching `t4.diff:31-33`.
- Guides project reads green: `t4-gates-2.log.txt:11-16` (`Test Files 1 passed (1)`, `Tests 51 passed (51)`, `test:guides exit=0`), which resolved the red recorded at `t4-gates.log.txt:60-92` over a summary mismatch the current diff no longer carries.

Referral (not ruled): whether every code-token occurrence in the two added guide sentences satisfies `.claude/rules/writing.md` § Code tokens' "follow it with a noun" — for example `` `clipsOverflow` names the frames `` (`/home/user/test/guides/test.md:3425`, a verb, not a noun) and `` (`clipsOverflow`: a computed `overflow-y` other than `visible` `` (`/home/user/test/guides/test.md:621`). The guide's own established convention elsewhere in this file (for example `/home/user/test/guides/test.md:568`, `` assert on `readStyle` where the rendered result is the subject ``) uses the same non-noun-trailing pattern on second reference, so this is a voice judgment on convention versus rule text, not a mechanical fact. Send to the subjective lane or the Orchestrator; a checker does not rule it.

**Claim 5 (law and scope).** CONFIRMED.

- File set: `t4-status.txt:1-3` lists exactly `guides/test.md`, `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts` modified, nothing else.
- No `any`, assertion (`as`), suppression, mock, or nested function beyond the stated exceptions: `t4.diff:45-70` (new `clipsOverflow`) and `t4.diff:90-110` (modified `measureContent`, a `for` loop body, no nested function declarations) and `t4.diff:127-186` (test additions, real DOM fixtures, no mocks/spies). None found.
- New export is a self-describing `{verb}{Noun}` helper with a first consumer: `clipsOverflow` (verb `clips` + noun `Overflow`), consumed at `t4.diff:101` inside `measureContent` and exercised at `t4.diff:127-147`.
- No banned term (`.claude/rules/writing.md` substitution table) and no count of a growable set in the TSDoc (`t4.diff:45-70`) or the guide prose (`t4.diff:13-33`): none present on inspection.
- Gates: `npm run format:check` exit 0 (`t4-gates.log.txt:12`), `npm run lint:check` exit 0 (`t4-gates.log.txt:17`), `npm run check` exit 0 (`t4-gates.log.txt:38`), scoped browser run exit 0 (`t4-gates.log.txt:50`, `Tests 5 passed | 336 skipped (341)`). Note: the claim's parenthetical labels this "the second run," but all four readings live in the single `t4-gates.log.txt`; `t4-gates-2.log.txt` reruns only `test:guides` and `format:check` after the guide-summary fix (`t4-gates-2.log.txt:16,25`), consistent with only `guides/test.md` changing between the two logs. This labeling mismatch is immaterial to the claim's truth and is noted, not ruled BROKEN.

Findings outside the claims: none found within the read evidence.

VERDICT: PASS
