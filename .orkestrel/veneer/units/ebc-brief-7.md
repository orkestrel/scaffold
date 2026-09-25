# Unit E-ID-BUTTON-CASCADE round 5, continued again — a control the minifier cannot fold

Successor to `ebc-brief-6.md`. What changed: its plant added `transition-delay: 1s;` after `transition: revert;`, and
the build's minifier folds the pair into `transition:revert 0s 1s`, which is invalid because `revert` must be a
declaration's whole value, so the browser dropped it and the plant left no trace. The unit reported that and stopped,
correctly; the fault is the brief's. The Orchestrator read the shipped build and found every `:where()` reset rule
keeps each `revert` alone (for example `:where(button.nav-link){padding:revert;…;transition:revert}`), so the fold
hazard touches only a plant or a future edit. This round replaces the plant with one declaration and runs the rest.

## Role and engine

`builder` on Sonnet, the same writer in `/home/user/veneer-ebc`, continuing from its current state. Start every shell
command with `cd /home/user/veneer-ebc &&` and give every file tool an absolute path under it.

## Item 5, replaced again

Copy `src/styles/_mixins.scss` aside and record its SHA-256. Inside the `button-reboot` mixin, replace the declaration
`transition: revert;` with `transition: all 0s ease 1s;` and add nothing else. Run `npm run build:src:styles`, confirm
with `grep -o ':where(button.nav-link){[^}]*}' dist/src/styles/index.css` that the compiled rule carries the replaced
value, run `revert-5.mjs` to `tmp/units/logs/ebc-5-probe-revert-control.log.txt` (overwrite the earlier one), restore
the file from the copy, confirm its SHA-256 equals the recorded value, and run `npm run build:src:styles` again. The
control log must report a `transition-delay` difference, `1s` against the release's `0s`, on at least one class form
that writes no `transition` of its own; name each form it reports it on.

## Then

Run item 6 of `ebc-brief-5.md`, then its Execution step (format the three test files, the four gates, the diff, and the
status), then write `tmp/units/ebc-report-5.md` covering items 1 to 6 and the gates as `ebc-brief-5.md`'s Output names,
recording the two earlier plants that could not surface and why. Its deviation contract holds with this item 5.
