"""cg integration edit: apply the exact fixes the CLOSE-GUIDE audit round returned (objective claim 8, subjective F1 and F2,
referrals a, b, and f). Each edit names one anchor; the script refuses the whole edit when an anchor is not unique."""
import pathlib, sys
edits = {
 '/home/user/veneer-cg/guides/veneer.md': [
  # objective claim 8b: bare tag names in § Files
  ("such as `li` under `ol` and `ul`. The browser's",
   "such as the `li` element under the `ol` and `ul` elements. The browser's"),
  # objective claim 8a: token with no noun in § Button group classes
  ("and\n`_tokens.scss` already declares each of those over `--vn-radius-base` and `--vn-border-width`, so a\nconsumer retuning either name moves the group.",
   "and\nthe `_tokens.scss` partial already declares each of those over `--vn-radius-base` and\n`--vn-border-width`, so a consumer retuning either name moves the group."),
  # subjective F1: the range thumb reading is a declared paint resolved on a stand-in
  ("the recipe leaves in place: the active page and the active list item, the range thumb, the focused\nand checked check, the focused select and text control, and the progress bar.",
   "the recipe leaves in place: the active page and the active list item, the range thumb's declared\npaint resolved on a stand-in element because Chromium withholds the part's computed style, the\nfocused and checked check, the focused select and text control, and the progress bar."),
  # subjective F2: the departure kind is a row, not a value
  ("differ: the `tokenized` value routes the release value through a Veneer token, the `aliased` value\nreads another compatibility variable in its place, the `fallback` value keeps the release value\nbehind a `var()` fallback, the `dropped` value writes no declaration at all, and the `declared`\nvalue writes the value in a form or at a value the other members do not name.",
   "differ: a `tokenized` row routes the release value through a Veneer token, an `aliased` row reads\nanother compatibility variable in its place, a `fallback` row keeps the release value behind a\n`var()` fallback, a `dropped` row writes no declaration at all, and a `declared` row writes the\nvalue in a form or at a value the other members do not name."),
  # referral (a): drop the ambiguous "one per section"
  ("After the Showcase region, the regions render in the order the `Showcase` class constructs them, one\nper section; see [showcase mounting and destruction](../tests/app/browser/Showcase.test.ts), which\npins that order. The Content region carries",
   "After the Showcase region, the regions render in the order the `Showcase` class constructs them;\nsee [showcase mounting and destruction](../tests/app/browser/Showcase.test.ts), which pins that\norder. The Content region carries"),
  # referral (b): the Form label specimen paragraph moves to § Form label classes, the Close pattern
  ("\nThe Form label region carries a label above its control with the help text the control names as its\ndescription, and a horizontal label level with the control beside it at each size and as the legend\nof a group.\n",
   ""),
  ("The form label proof reads the resolved treatment in the browser; see [the form label\nclasses](../tests/src/styles/components/form-label.test.ts).",
   "The showcase's Form label region carries a label above its control with the help text the control\nnames as its description, and a horizontal label level with the control beside it at each size and\nas the legend of a group.\n\nThe form label proof reads the resolved treatment in the browser; see [the form label\nclasses](../tests/src/styles/components/form-label.test.ts)."),
 ],
 '/home/user/veneer-cg/tests/src/styles/integration.test.ts': [
  # referral (f): the case is named for the population it reads
  ("it('holds every paint on the release blue through the brand retune and moves it with the palette entry',",
   "it('holds the palette paints it reads through the brand retune and moves each with the palette entry',"),
 ],
}
for path, pairs in edits.items():
    p = pathlib.Path(path); s = p.read_text()
    for old, new in pairs:
        n = s.count(old)
        if n != 1: sys.exit(f'integration refused: anchor count {n} in {path}: {old[:60]!r}')
        s = s.replace(old, new)
    p.write_text(s); print('edited', path)
