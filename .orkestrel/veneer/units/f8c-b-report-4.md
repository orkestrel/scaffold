# Unit F8c-B MOVE, round 4 report

Applied the eight replacements from `tmp/units/f8c-b-brief-4.md` § Obligations to
`tests/setupService.ts` (four sentences) and `guides/veneer.md` (four sentences), and rewrapped the
paragraphs whose changed line exceeded 100 columns: `tests/setupService.ts:182-189` (the
`resolveBrowser` remark), and `guides/veneer.md:349-362`, `:364-366`, `:374-378`.

## Acceptance criterion 1 — grep results

Source phrases: none found (multi-line grep confirms criterion 6, whose replacement spans a wrap
line break).

```
=1 source=                (no output)
=1 replacement=
48: * The `root` option is the workspace root the cascade is read under and the candidate list written

=2 source=                (no output)
=2 replacement=
49: * under. Default: `WORKSPACE_ROOT`. The `compiler` option loads the PostCSS plugin the compiler

=3 source=                (no output)
=3 replacement=
187: * itself, and the `resolveBrowser` function verifies a discovered one before naming it; it

=4a source=               (no output)
=4a replacement=
315: * of acquisition, through one teardown list: the `open` method registers the scratch directory and

=4b source=               (no output)
=4b replacement=
316: * then the browser as it acquires each one, and the `destroy` method closes the browser and then

=5 source=                (no output)
=5 replacement=
349:The workspace compiles the `tailwind` recipe as written. The `tests/fixtures/tailwind/consumer.css`

=6 source (single-line)=  (no output)
=6 replacement (multi-line, spans the wrap at line 361-362)=
The
`tests/fixtures/tailwind/unexcluded.css` fixture is the negative

=7 source=                (no output)
=7 replacement=
366:The order line never changes between profiles. It is the line the `src/styles/_tokens.scss`

=8 source=                (no output)
=8 replacement=
376:The `tests/setup.css` file is where the workspace writes that line. The
```

## Gate exits

- `npx oxfmt --check guides/veneer.md tests/setupService.ts` — exit 0 ("All matched files use the
  correct format.")
- `npm run check` — exit 0 (all `tsc`/`vue-tsc` projects clean)
- `npm run test:guides` — exit 0 (1 test file, 18 tests passed)

## Diff

The full `git diff -- guides/veneer.md tests/setupService.ts` is large because rounds 1 to 3 of
unit F8c-B are still uncommitted in this worktree; this round's hunks are the ones containing the
text listed under § Obligations above. The round-4 `tests/setupService.ts` hunks are at old-file
line ranges `29,18` (the `root`/`compiler` remark) and `277,8` (the `open`/`destroy` remark and its
rewrap). The round-4 `guides/veneer.md` hunks are at old-file line ranges `339,22`, `362,13`, and
`377,27`.
