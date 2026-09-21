# CL4 scout — the `reboot` inventory by family, minus CL3's text tags

## Role and engine

`grok` (Cursor Grok 4.6 through the Cursor CLI, read-only). The Claude-side driver carries this
brief across unaltered and returns the journal path and the distillate untouched; the engine
behind the CLI reads it and answers directly, spawning nothing.

## Objective

A distilled map, with `file:line` pointers, of every selector the pinned Bootstrap inventory
records under its `reboot` key, grouped by tag family, marked as CL3's (a text tag CL3 lands),
CL4's (a form, table, media, or interactive tag), or a candidate exclusion (a tag combination
the elements-layer guard refuses and no mandated pair admits), so CL4's brief can name its
partial set and its excluded rows without re-reading the fixture.

## Context

Checkout: `C:/Users/mikes/WebstormProjects/veneer` at `9f5ffda`. Read only these:

- `tests/fixtures/oracle/inventory.json`: the `reboot` entries (search the file for `"reboot"`;
  each entry carries selectors and the official property set per selector).
- `tests/setupConformance.ts:741-773` (`readOracleInventory`, how the fixture is projected) and
  `tests/setupStyles.ts:437-456` (`MANDATED_TAG_PAIRS`: `details/summary`, `dl/dt`, `dl/dd`,
  `fieldset/legend`, `figure/figcaption`, `ol/li`, `optgroup/option`, `ruby/rp`, `ruby/rt`,
  `select/option`, `table/caption`, `table/colgroup`, `table/tbody`, `table/tfoot`,
  `table/thead`, `tr/td`, `tr/th`, `ul/li`) and `:1633-1652` (`matchesLooseTagPair`, the
  elements-layer guard's predicate: one bare tag per selector, or a mandated pair).
- `node_modules/bootstrap/scss/_reboot.scss`: the source of each selector, for the line pointer.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-brief-2.md` § Scope: the
  text tags CL3 lands (`_heading.scss` for `h1` to `h6`, `_p`, `_hr`, `_a`, `_ul`, `_ol`, `_dl`
  with `dt` and `dd`, `_blockquote`, `_address`, `_abbr`, `_strong`, `_small`, `_mark`, `_sub`,
  `_sup`, `_code`, `_pre`, `_kbd`, `_samp`, `_var`, plus `_html` and `_body`).
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/content-layout-design-planner-report.md`
  line 101 (the combinations already ruled excluded: `ol ol`, `ul ul`, `ol ul`, `ul ol`,
  `pre code`, `a > code`, `kbd kbd`, `legend + *`).

## Output

Exactly this, and nothing else:

1. One table `Selector | Family | Owner (CL3 / CL4 / exclusion candidate) | Guard verdict (bare tag / mandated pair / refused) | Official properties | _reboot.scss line`, one row per `reboot` inventory selector, in the fixture's order.
2. One list of the CL4 families with the partial file each implies under `src/styles/elements/` (one bare tag per file, the mandated pairs folded into the parent tag's file), and the selectors in each.
3. One list of every exclusion candidate with the reason (the guard refuses it and no mandated pair admits it, or the design already excluded it), and any selector whose ownership is unclear, with what makes it unclear.
4. The journal path and session id of the run.

No process diary. No recommendation beyond the ownership marks.
