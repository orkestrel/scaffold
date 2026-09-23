# B-FORMS-ASSETS (D26) — audit claims

## Subject

The B-FORMS-ASSETS unit's uncommitted writes in `/home/user/veneer-bfa` (detached at `d401d4b`, the
session branch at the SELECT landing), written by `builder` from
`/home/user/veneer-bfa/tmp/units/b-forms-assets-brief.md`. One round so far: this one. **Review
evidence.** `/home/user/scaffold/.orkestrel/veneer/units/bfa.diff` (the whole diff against
`d401d4b`), `bfa-status.txt`, and the report
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-assets-report.md` (the plant record: re-adding
the `select-indicator` entry reddened the theme case's `COMPONENT_DARK_ASSETS` assertion; the
Unknown's rulings). The writer ran `git stash` to compare the duplication-floor case against the
base, which the permission floor forbids; the Orchestrator read the stash stack (empty) and the
status (the seven owned files) afterwards and found the tree intact.

## What the round decides

Whether B-FORMS-ASSETS lands on the session branch, closing the "Theme-scope select caret and switch
knob" carrier row (D26), and whether the writer's rulings stand: the `until the component` and
`theme scope` hits it left unchanged (the carousel variables' sentence; the `--bs-btn-close-filter`
and state-token sentences) are true after the change.

## Already established — do not re-run

The gates in the report (`npm run check` 0, `test:conformance` 18, `test:guides` 18, the scoped
browser run 73 passed, `test:setup` red only on the duplication floor that B-FORMS-MIXIN has since
closed on the session branch) are the writer's reading; the landing chain settles them. This lane
is read-only.

## Unknowns

- none.

## The threshold

`CONFIRMED` requires naming the attack that failed. Rule every claim CONFIRMED, BROKEN, UNRESOLVED,
or NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The map.** `src/styles/_tokens.scss`'s `$assets` carries `toggler-icon`, `accordion-icon`, and
   `accordion-active-icon` and no `select-indicator` or `switch-knob` entry; its doc comment states
   what the map holds and that the check and select partials declare the knob and the caret on
   their own dark rules; the `$dark` map still carries `select-indicator` and `switch-knob` (the
   partials read them).
2. **The list and its rows.** `COMPONENT_DARK_ASSETS` in `tests/setupStyles.ts` directly after
   `THEME_DARK_ADDITIONS`, frozen, with the brief's TSDoc, naming `--bs-form-select-bg-img` and
   `--bs-form-switch-bg`; `tests/setupStyles.test.ts` carries its export-name row (sorted where
   sorted) and a freeze case asserting each name sits in `BOOTSTRAP_DARK_VARIABLES`.
3. **The tokens case.** "re-declares every theme-dependent name inside each mode scope" filters
   `COMPONENT_DARK_ASSETS` out of the expected dark list with a comment stating why.
4. **The theme case.** Retitled as the brief fixed it; reads `--bs-navbar-toggler-icon-bg` empty in
   light and a data URI under dark; asserts each `COMPONENT_DARK_ASSETS` name reads `''` on the bare
   element under dark; the writer's plant (re-adding the entry) reddened that assertion.
5. **The select proof and the guide.** The form-select case is titled "paints the dark caret on the
   element inside a dark scope" with the comment the brief fixed; in `guides/veneer.md`, the § Form
   select classes sentence reads "Both declarations sit on the element, and the dark theme scope
   declares nothing for that variable, so the component rules decide the caret in both modes.", the
   § Form check classes sentence reads "the theme scopes declare nothing for that variable, so the
   control's own rules decide the knob in both modes", and § Bootstrap variables Veneer retains
   names only the toggler and accordion variables as dark-scope declarations and states the select
   and switch variables are declared on their own dark rules; every changed sentence follows
   `writing.md` (a noun after each code token, no banned term, no count of a growable set, prose at
   or under 100 columns).
6. **Scope is honest.** `bfa-status.txt` lists the seven owned files and nothing else; the diff
   carries no `any`, `as` (other than `as const`), `!`, or suppression, and no nested function
   beyond a callback.
