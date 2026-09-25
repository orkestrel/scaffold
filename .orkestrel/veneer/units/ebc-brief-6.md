# Unit E-ID-BUTTON-CASCADE round 5, continued — the control, the mutations, and the gates

Successor to `ebc-brief-5.md`. What changed: round 5 finished items 1 to 4 and stopped on item 5, correctly. The brief's
control planted `border-right-width: 5px` after `border: revert`, and a border width computes to `0` whenever its
border style is `none`, so that plant can never surface; the fault is the brief's. This round replaces item 5's plant
and runs items 6 and the Execution gates of `ebc-brief-5.md` unchanged.

## Role and engine

`builder` on Sonnet, the same writer in `/home/user/veneer-ebc`, continuing from round 5's state. Start every shell
command with `cd /home/user/veneer-ebc &&` and give every file tool an absolute path under it.

## Item 5, replaced

Copy `src/styles/_mixins.scss` aside and record its SHA-256. Add `transition-delay: 1s;` after `transition: revert;`
inside the `button-reboot` mixin, run `npm run build:src:styles`, run `revert-5.mjs` to
`tmp/units/logs/ebc-5-probe-revert-control.log.txt` (overwrite round 5's), restore the file from the copy, confirm its
SHA-256 equals the recorded value, and run `npm run build:src:styles` again. The control log must report a
`transition-delay` difference, reading `1s` against the release's `0s`, on at least one class form that writes no
`transition` of its own; name each form it reports it on. A class that writes its own `transition` overrides the plant
and reads no difference, which is expected.

## Then

Run item 6 of `ebc-brief-5.md`, then its Execution step (format the three test files, the four gates, the diff, and
the status), then write `tmp/units/ebc-report-5.md` covering items 1 to 6 and the gates, as `ebc-brief-5.md`'s Output
names, noting that item 5 ran on this brief's plant. Its deviation contract holds, with this item 5 in place of the old.
