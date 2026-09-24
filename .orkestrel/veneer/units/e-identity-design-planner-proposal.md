Lane: subjective (`planner` on Opus 5.5). Paths are relative to `/home/user/veneer-read` unless named otherwise.

I applied one rule to every site: an element with no class gets Veneer's look, and markup built with Bootstrap classes lays out as Bootstrap lays it out. Veneer already follows this for buttons (`src/styles/elements/_button.scss:17-21`, `button:not([class], [data-bs-target])`). Where a value differs from Bootstrap's but breaks no pattern, it keeps Elements' look. Where Veneer contradicts its own code, it reverts.

## Per site

**Table stripe: keep.** Veneer already ships Bootstrap's 5%, through a token (`src/styles/components/_table.scss:15`, `:117-121`; `src/styles/_tokens.scss:26`, `:90`). Do not adopt Elements' 12% (`/home/user/elements/src/styles/elements/_table.scss:50-54`).
- **Why:** the stripe must stay under the hover overlay (0.075, `_table.scss:19`) and the active overlay (0.1, `_table.scss:17`). Otherwise hovering a striped row doesn't darken it.
- **Protects:** `.table-striped.table-hover`.
- **Change:** in the token row at `guides/veneer.md:7058`, the Source cell states this ruling. It no longer defers to "the Elements identity phase". No cascade change.

**`dl`, `dt`, `dd`: scope the grid.**
- **Evidence:** the `dl` rule's `gap` applies to the `.row` flex container, so each `dd` wraps under its `dt` (probe log lines 1-2; `src/styles/elements/_dl.scss:2-7`).
- **Grid:** apply the grid only to `dl:not([class])`.
- **`dd` margin:** revert to Bootstrap's `margin-bottom` 0.5rem and `margin-left: 0` (`bootstrap.css:311-313`). Bootstrap's row spacing comes from that margin.
- **`dt` weight:** keep 600. It matches the user's ruling that keeps the 600 heading weight (`ROADMAP.md:185`).
- **`dd` muted colour:** keep. It is appearance only and moves no box.
- **`dl` margin:** keep 0. It belongs to the family of elements whose flow margins Veneer already dropped (`guides/veneer.md:9248-9260`).
- **Protects:** the horizontal description list, its nested form, and `dt.text-truncate`.

**`blockquote` and `.blockquote`: scope.**
- **Change:** limit the bar, the inset, and the italics (`src/styles/elements/_blockquote.scss:4-6`) to `blockquote:not([class])`. The element margin stays at Bootstrap's value. `.blockquote` keeps Bootstrap's rules (`src/styles/components/_quote.scss:2-19`).
- **Why:** today the showcase draws a left bar under Bootstrap's class form (`app/browser/constants.ts:630`, `:635`).
- **Protects:** `.blockquote` inside `figure.text-center` or `figure.text-end`, and `.blockquote.mb-0` in a card body.

**`code`, `pre`, `kbd`, `samp`: keep the look, restore Bootstrap's nested rules.**
- **Keep:** the chip, the code-block surface, the keycap border, and Elements' sizes (`src/styles/_mixins.scss:92-109`; `src/styles/elements/_code.scss:4-7`, `_pre.scss:4-12`, `_kbd.scss:4-7`).
- **Restore:** ship Bootstrap's `pre code`, `a > code`, and `kbd kbd` rules (`node_modules/bootstrap/scss/_reboot.scss:291-295`, `:304-306`, `:316-320`). Delete their Excluded rows (`guides/veneer.md:6623-6625`).
- **Record as additions:** the declarations that cancel the chip, which are:
  - `pre code`: `padding: 0`, a transparent `background-color`, and `border-radius: 0`;
  - `kbd kbd`: `border: 0` and a transparent `background-color`.
- **Why:** without these rules, `<pre><code>` paints a chip inside the block and shrinks the text twice (90% of 87.5%). Code inside a link takes body colour instead of link colour. A nested key draws a keycap inside a keycap.
- **`samp`:** add `border-radius: var(--vn-radius-small)`. Every other chip in the family is rounded, and so is Elements' `samp` (`/home/user/elements/src/styles/elements/_samp.scss:16-23`). This is a judgment call.
- **Protects:** the Reboot page's code block, code inside a link, and the key-combination example.

**`hr`: keep.** Keep margin 0 (the dropped-margin family) and opacity 0.2 (Elements, `/home/user/elements/src/styles/elements/_hr.scss:19-23`), per `src/styles/elements/_hr.scss:4-9`. No Bootstrap class pattern depends on the bare values: `.dropdown-divider` and the `opacity-*` and `border-*` utilities sit in later layers. Probe P10 confirms this.

**`.btn-check`: revert** to `position: absolute`, `clip: rect(0, 0, 0, 0)`, and `pointer-events: none` (`bootstrap.css:2490-2493`).
- **Why:** Veneer's `.visually-hidden` hides with the same `clip` rectangle (`src/styles/utilities/_visually-hidden.scss:15`). That contradicts the stated reason for the departure, "rather than the release's deprecated `clip` rectangle" (`guides/veneer.md:9998-10002`). Hiding content is one concept and needs one technique.
- **Protects:** the checkbox and radio toggle groups, which render the same either way.

## Horizontal description list design

```scss
@layer elements {
	dl {
		margin: 0;
	}
	dl:not([class]) {
		display: grid;
		grid-template-columns: 1fr 2fr;
		column-gap: var(--vn-space-8);
	}
	dt {
		font-weight: var(--vn-weight-heading);
		grid-column: 1;
	}
	dd {
		margin-bottom: var(--vn-space-4);
		margin-left: 0;
		color: var(--vn-text-muted);
		grid-column: 2;
	}
}
```

- **Row spacing:** the `dd` margin supplies it in both forms. The bare grid drops `row-gap`.
- **Pairing:** `grid-column` keeps a term in the term column and a description in the description column. This holds when one term has several descriptions or several terms share one description (probe P7). A flex `.row` ignores `grid-column`.

**Proof.** Add a case to `tests/src/styles/elements/dl.test.ts`. It mounts Bootstrap's markup, `<div class="container"><dl class="row"><dt class="col-sm-3">…</dt><dd class="col-sm-9">…</dd>` with a second pair, at a viewport of at least 576px (1280px in the Orchestrator's probe). It reads:
- each `dd` top equals its `dt` top;
- each `dd` left equals its `dt` right, within 1px;
- the next term's top minus the previous term's top equals the previous `dd` height plus 8px.

It must fail under these mutations:
- restoring the unscoped `dl` grid and gap. The `dd` wraps (`dd x=70 y=29`), so the top-equality check fails.
- scoping the grid but leaving the `dd` margin at 0. The term step drops by 8px, so the spacing check fails.

The bare-list case keeps columns of `168px 336px` at 520px width. Its readings change to `column-gap` 16px and `dd` margin `0px 0px 8px`. The Orchestrator reruns `dl-row-probe.mjs`: Veneer's boxes must equal Bootstrap's recorded boxes (`dd x=355 y=0`, `dt y=32`).

## Suspected breakages, as probes

Run each probe in both cascades at 1280px unless it names another width.

- **P1 attributed quotation:** `<figure><blockquote class="blockquote"><p>Q</p></blockquote><figcaption class="blockquote-footer">S</figcaption></figure>`. Read `figcaption.top − blockquote.bottom`. Bootstrap reads 0. I expect Veneer to read 8px, from the figure's flex gap (`src/styles/elements/_figure.scss:5-7`).
- **P2 aligned quotation:** `<figure class="text-end"><blockquote class="blockquote"><p>Q</p></blockquote></figure>`. Read the blockquote's `border-left-width`, `padding-left`, and `font-style`.
- **P3 code block:** `<pre><code>&lt;p&gt;Sample&lt;/p&gt;</code></pre>`. Read the code's `font-size` against the pre's, and the code's `background-color` and `padding-left`.
- **P4 linked code:** `<a href="#"><code>x</code></a>`. The code's `color` must equal the anchor's.
- **P5 key combination:** `<kbd><kbd>Ctrl</kbd> + <kbd>,</kbd></kbd>`. Read the inner key's `font-size` against the outer key's, and its `padding-left`, `font-weight`, and `border-top-width`.
- **P6 nested horizontal list:** Bootstrap's docs markup with a `dl.row` inside `dd.col-sm-9`. Read the nested `dd` x and y against its `dt` at 1280px, and the stacked boxes at 390px.
- **P7 multi-term list (Veneer only):** `<dl><dt>A</dt><dt>B</dt><dd>Shared</dd><dt>C</dt><dd>One</dd><dd>Two</dd></dl>`. Read each child's x. I expect `B` in the description column today.
- **P8 radio toggle group:** the pattern at `app/browser/constants.ts:1310`. Read each label's x and width, and each input's rect.
- **P9 striped hover:** `<table class="table table-striped table-hover"><tbody><tr><td>A</td></tr><tr><td>B</td></tr></tbody></table>`. Hover the row with cell A and read the cell's box-shadow alpha. Expect 0.075, above the resting stripe's 0.05.
- **P10 dividers:** `<ul class="dropdown-menu show"><li><hr class="dropdown-divider"></li></ul>` and `<hr class="border border-danger border-2 opacity-50">`. Read `margin-top`, `opacity`, and `border-top-width`.
- **P11 truncated term:** `<dl class="row"><dt class="col-sm-3 text-truncate">A long term that overflows its column</dt><dd class="col-sm-9">D</dd></dl>`. Read `dt.scrollWidth > dt.clientWidth` and whether the `dd` top equals the `dt` top.

## Units

The units run one at a time in the Veneer checkout, in this order: E-ID-SCOPE, then E-ID-CODE, then E-ID-RECORD. They share `guides/veneer.md`, `tests/setupStyles.ts`, and `app/browser/constants.ts`. Each audit runs `analyst` on Astra, `reviewer` on Opus 5.5, and `checker` on Sonnet.

**E-ID-SCOPE** (`opus` on Opus 5.5)
- **Owns:**
  - `src/styles/elements/_dl.scss` and `_blockquote.scss`;
  - `tests/src/styles/elements/dl.test.ts` and `blockquote.test.ts`, and `tests/src/styles/components/quote.test.ts`;
  - `TEXT_DL_CASES` in `tests/setupStyles.ts`;
  - a Horizontal description list specimen in `app/browser/constants.ts`;
  - the `dl`, `dt`, `dd`, and `blockquote` rows at `guides/veneer.md:9259-9264` and `9896-9904`.
- **Accepts when:**
  - the proof fails under each named mutation, with its command and failing count recorded, and then passes;
  - `quote.test.ts` asserts that `.blockquote` reads `border-left-width` 0px and `font-style` normal;
  - the existing bare-`blockquote` pins stay unchanged;
  - the ledger gate passes with `dl:not([class])` and `blockquote:not([class])` recorded as selector additions and the `dd` margin rows gone;
  - probes P6, P7, and P11 read as designed.
- **Unknown:** the test viewport's width. The unit reads `innerWidth` before anything else and reports it. The capture paths for the Quotation frames are also unknown, and the unit reports them.

**E-ID-CODE** (`opus` on Opus 5.5)
- **Owns:**
  - `src/styles/elements/_code.scss`, `_pre.scss`, `_kbd.scss`, and `_samp.scss`;
  - their tests and their `TEXT_*_CASES` entries;
  - Code block, Linked code, and Key combination specimens;
  - `guides/veneer.md:6623-6625`, `9274-9292`, and `9907-9921`, plus the rows for the contextual selectors.
- **Accepts when:**
  - probes P3 to P5 read Bootstrap's relationships;
  - each proof fails when its contextual rule is removed;
  - `samp` reads a 4px radius if the Orchestrator accepts that change.

**E-ID-RECORD** (`builder` on Sonnet; the unit is fully specified)
- **Owns:**
  - the `.btn-check` rule in `src/styles/components/_button.scss`;
  - `tests/src/styles/components/button.test.ts:363`, which reads `clip` as `rect(0px, 0px, 0px, 0px)`;
  - `guides/veneer.md:7280`, `9998-10002` (deleted), and `7058`.
- **Accepts when:** P8 matches Bootstrap and the ledger gate passes.

The Orchestrator closes the ROADMAP carrier rows for Audit claim 11 and Audit claim 13 at acceptance.

## Judgment calls for the other lane to challenge

- **`:not([class])` versus `:not(.row)` or `:not(.blockquote)`:** with my choice, a utility class alone (`<dl class="mb-0">`) opts the element out of Veneer's look. I chose it to match the bare-button rule.
- **The dropped-margin family:** `dl`, `hr`, `pre`, `p`, and the lists all drop the flow margins Bootstrap's documented pages space with. It needs its own ruling.
- **P1:** if the gap reads 8px, the Orchestrator either records it or removes the figure's `gap`.
- **Narrow widths:** the 1fr/2fr grid keeps two columns at every width, while Elements collapses to one column below 640px. Probe it with a long term at 390px.
