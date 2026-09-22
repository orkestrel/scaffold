# Review evidence — F4 HOST-OBSERVATIONS on Veneer at `751c3ed` plus the working tree

Taken by the Orchestrator on 2026-09-22 after the second full gate chain.

## Status

`git -C /home/user/veneer status --porcelain` (66 modified files, no additions, no deletions):

```text
 M README.md
 M guides/veneer.md
 M src/browser/Button.ts
 M tests/fixtures/oracle/button.json
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/styles/components/button.test.ts
 M tests/src/styles/components/container.test.ts
 M tests/src/styles/components/grid.test.ts
 M tests/src/styles/components/icon-link.test.ts
 M tests/src/styles/components/image.test.ts
 M tests/src/styles/components/link.test.ts
 M tests/src/styles/components/list.test.ts
 M tests/src/styles/components/quote.test.ts
 M tests/src/styles/components/ratio.test.ts
 M tests/src/styles/components/table.test.ts
 M tests/src/styles/components/type.test.ts
 M tests/src/styles/components/vr.test.ts
 M tests/src/styles/elements/a.test.ts
 M tests/src/styles/elements/abbr.test.ts
 M tests/src/styles/elements/address.test.ts
 M tests/src/styles/elements/b.test.ts
 M tests/src/styles/elements/blockquote.test.ts
 M tests/src/styles/elements/button.test.ts
 M tests/src/styles/elements/code.test.ts
 M tests/src/styles/elements/details.test.ts
 M tests/src/styles/elements/dl.test.ts
 M tests/src/styles/elements/fieldset.test.ts
 M tests/src/styles/elements/figure.test.ts
 M tests/src/styles/elements/heading.test.ts
 M tests/src/styles/elements/hr.test.ts
 M tests/src/styles/elements/iframe.test.ts
 M tests/src/styles/elements/img.test.ts
 M tests/src/styles/elements/input.test.ts
 M tests/src/styles/elements/kbd.test.ts
 M tests/src/styles/elements/label.test.ts
 M tests/src/styles/elements/mark.test.ts
 M tests/src/styles/elements/ol.test.ts
 M tests/src/styles/elements/optgroup.test.ts
 M tests/src/styles/elements/output.test.ts
 M tests/src/styles/elements/p.test.ts
 M tests/src/styles/elements/pre.test.ts
 M tests/src/styles/elements/progress.test.ts
 M tests/src/styles/elements/samp.test.ts
 M tests/src/styles/elements/select.test.ts
 M tests/src/styles/elements/small.test.ts
 M tests/src/styles/elements/strong.test.ts
 M tests/src/styles/elements/sub.test.ts
 M tests/src/styles/elements/sup.test.ts
 M tests/src/styles/elements/svg.test.ts
 M tests/src/styles/elements/table.test.ts
 M tests/src/styles/elements/textarea.test.ts
 M tests/src/styles/elements/tr.test.ts
 M tests/src/styles/elements/ul.test.ts
 M tests/src/styles/elements/var.test.ts
 M tests/src/styles/integration.test.ts
 M tests/src/styles/mixins.test.ts
 M tests/src/styles/reset.test.ts
 M tests/src/styles/theme.test.ts
 M tests/src/styles/tokens.test.ts
 M tests/src/styles/utilities/gap.test.ts
```

## Diffstat

```text
 66 files changed, 499 insertions(+), 321 deletions(-)
```

## Diffs

- `/home/user/scaffold/tmp/audit/f4-core.diff`: every changed file except the mechanical rename —
  `src/browser/Button.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
  `tests/src/browser/Button.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/setupConformance.ts`,
  `tests/setupConformance.test.ts`, `tests/fixtures/oracle/button.json`, `README.md`,
  `guides/veneer.md`, and `tests/src/styles/tokens.test.ts` (which carries the stripe assertions and
  the rename).
- `/home/user/scaffold/tmp/audit/f4-rename.diff`: the 54 other files under `tests/src/styles/**`
  the rename touched.

## Gate chain

`/home/user/scaffold/tmp/audit/f4-gates.log.txt`, produced by `f4-gates.sh` beside it (npm 11.19.1,
Node v22.22.2, Chromium 141.0.7390.37). Every `=== <gate> exit=` line:

```text
=== format:check exit=0 (15:03:24)
=== lint:check exit=0 (15:03:26)
=== check exit=0 (15:03:37)
=== build exit=0 (15:03:47)
=== test:src:core exit=0 (15:03:48)
=== test:src:browser exit=0 (15:04:00)
=== test:src:styles exit=0 (15:04:55)
=== test:app exit=0 (15:05:12)
=== test:journey exit=0 (15:05:58)
=== test:policy exit=0 (15:06:02)
=== test:config exit=0 (15:06:08)
=== test:setup exit=0 (15:06:18)
=== test:setup:browser exit=0 (15:06:30)
=== test:conformance exit=0 (15:06:37)
=== test:guides exit=0 (15:06:39)
```

The first chain over the same tree, before the formatter pass on four files and the fixture literal
repair in `tests/setupConformance.test.ts` (the synthetic fixture the obligation case builds gained
the required `browser` string), read `format:check` exit 1 and `check` exit 2 with every other
gate exit 0; those two repairs are in the core diff.

## Reports

- Run 3 (Astra): `/home/user/scaffold/.orkestrel/veneer/units/f4-report-3.md`.
- Runs 1 and 2 (Astra, stops): `f4-report.md` and `f4-report-2.md` beside it.
- Run 4 (the Orchestrator): this file and the gate log are its report; its brief is
  `/home/user/scaffold/.orkestrel/veneer/units/f4-brief-4.md`.
