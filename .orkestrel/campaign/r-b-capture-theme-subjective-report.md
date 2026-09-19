# Capture-theme subjective design audit

Native r_b_subjective on Sol held the subjective substitution for unavailable Opus. Effective brief tmp/audit/r-b-capture-theme-subjective-brief.md; shared design tmp/audit/r-b-capture-theme-design.md. No runtime tests ran.

1. CONFIRMED. Attack sought a placement depending on callback preparation. Current capture journeys explicitly await applyTheme first; navigation at integration.test.ts:492 then opens Menu/reaches Shop before placement:509. Installed portfolio uses names/dimensions and optional callback. No current placement needs another theme action.
2. CONFIRMED. The adapter at setupBrowser.ts:1088 attaches async work to a synchronous optional hook; applyTheme:1061 observes a covered control even when mode matches. Remove adapter and directly await applyTheme in the setup proof, retaining dark/light document and control assertions.
3. UNRESOLVED. Report10 log:290 shows rejection;:310 trusted event; run still passes. A real listener/recorder can detect without suppression, but delivery before assertion/cleanup requires actual original-adapter red. Attach before capture; assert no calls before teardown; finally remove same handler. If the guard stays green, measure a browser task boundary; never assume it works.
4. CONFIRMED. Defect is Roughnotes composition. Captured frame shows open Menu/focused Shop; observation needs no covered theme control. Preserve strict reachability, explicit awaited theme actions, placement/filenames/membership. No upstream API/product change needed.

Instruction advisory: canonical skill recipe SKILL.md:98/:146 and references/captures.md:71 teach the same adapter. Correct the documentation to distinguish awaited journey acts from synchronous capture hooks; guide should state that captures observe established theme.

CAPTURE DESIGN SUBJECTIVE: UNRESOLVED
