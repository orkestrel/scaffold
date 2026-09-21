# Scout — Elements' button specimens and capture harness (for the U7 portfolio verdict)

Role: `grok` (Cursor Grok 4.6, read-only), a bounded scouting question. Return distilled
evidence with `file:line` pointers, never raw dumps. Design nothing, decide nothing.

Subject: the Elements checkout at `C:/Users/mikes/WebstormProjects/elements` (HEAD `3b41900`).
Veneer (`C:/Users/mikes/WebstormProjects/veneer`, HEAD `92aad70`) has shipped its Button with a
48-frame capture portfolio under `tmp/capture/states/` (`<state>--<variant>.png`, states `home`,
`home-dark`, `button-primary-{rest,pressed,focus,hover,active}` and their `-dark` twins, variants
`light-1280`, `light-390`, `dark-1280`, `dark-390`). The campaign's exit criterion needs Veneer's
accepted appearance and motion captured beside Elements' specimens. Answer, with pointers:

1. Where Elements renders button specimens: the demo or app page, the component or section file,
   the specimen list (variants, sizes, states, disabled, anchor hosts), and the theme control.
2. Whether Elements has a capture harness or portfolio: a journey suite with a capture family, a
   `CAPTURE` injection, a `tmp/capture` convention, a Playwright or Vitest browser config, and
   the scripts that run them (`package.json` scripts by name).
3. Which of Elements' button states are reachable by real input on its page (hover, active,
   focus-visible, pressed or checked, disabled) and how the page announces them (class,
   attribute, ARIA).
4. Elements' button tokens and their values for the primary role in light and dark (the focus
   ring, the fill, the text colour, the hover and active mixes), with the file that declares
   each, so a verdict can compare the two packages' calibrations by number.
5. Any existing Elements-versus-Veneer comparison artifact in either checkout (a fixture, a
   reference frame set, a comparison test), or a statement that none exists.

Output: five numbered sections mirroring the questions, each a table or a short list of
`file:line` pointers with a one-line reading, then one line naming what could not be found.
