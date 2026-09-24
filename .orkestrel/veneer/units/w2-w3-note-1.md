# Mid-campaign note 1 to the in-flight wave-2 and wave-3 units (2026-09-24, 01:20 UTC)

Sent to MODAL, OFFCANVAS, TIP, UTIL-EFFECT, UTIL-FONT, UTIL-FLOW, and UTIL-PAINT while they write. The
TOAST audit (`to-audit-*-verdict.md`) broke these classes; each is a rule your brief already binds, so
apply it before you hand back rather than in a fix round. Your brief's scope and criteria are unchanged.

1. Follow every code token in guide prose, TSDoc, and comments with a noun: "reads the `--vn-space-4`
   token", "the `show.bs.toast` event", "the `delay` option", "the `showing` class". A bare
   `1090` or `--bs-x` at the end of a clause is the defect.
2. Keep a case population out of a test file. A list of specimen names a section proof iterates is a
   case matrix: derive it from `<KEY>_SPECIMENS` (for example, the specimens whose markup carries a
   `.viewport` frame), or hold it in a frozen, exported table in a setup file.
3. Retain every mutation run's output: the mutated site, the command, the build and test exits, the
   summary line, and the failing case names, in a log under `tmp/units/`. A mutation table in the
   report with no log behind it is unevidenced.
4. State only what a rule applies. A class that declares a slot and applies no property from it (for
   example a stacking variable a component declares but only its container reads) does not "move"
   when the token is retuned; say which rule applies the value.
5. Bind a case table's values by derivation, never by restating the literal list in the binding case.
