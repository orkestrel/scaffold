<!-- analyst on Astra (gpt-6-astra), bench lane, read-only, clean context. The OBJECTIVE STATE
TRUTH lane of the CL13 portfolio verdict, one of three blind lanes on one portfolio. Journal
tmp/codex/cl13-verdict-analyst.jsonl, exit=0. Brief: cl13-verdict-brief.md. It ran SHA-256 over
the Veneer frames itself, settling a candidate the mechanical lane had no tool to check.
Terminal: ANOTHER ROUND(2, 6, 7), converted to carriers by the verdict. -->

The matched frames show recorded departures, with evidence gaps for breakpoint equality, the role palette, and accessibility equivalence. No fixes were made.

Frame names below resolve under [Veneer’s element portfolio](/C:/Users/mikes/WebstormProjects/veneer/tmp/capture/states) and [Bootstrap’s portfolio](/C:/Users/mikes/WebstormProjects/veneer/tmp/cl13/portfolio). Bootstrap comparisons use `.element.png` files.

1. **CONFIRMED — RENDERED-PROVEN(container-capped-rest / capped-container).** PNG headers show matching widths: 1140px at viewport 1280 and 390px at viewport 390, in light and dark. The visible container agrees with its declared subject. This confirms the captured widths; other container boundaries remain **UNPROVEN**.

2. **REFUTED as a portfolio-proven breakpoint claim — NOT-EVIDENCED(the transition boundary).** `row-numbered-rest` and `numbered-columns` show side-by-side columns at 1280 and stacked columns at 390. Their heights change from 21→42px and 24→48px respectively. Those endpoints cannot establish an identical breakpoint. The pinned record names 768px, but no frame brackets that boundary. **Cost:** a maintainer could accept an incorrectly placed breakpoint that still produces these endpoint images.

3. **REFUTED — RENDERED-PROVEN(table-base-rest / base-table).** The stated heights are correct, but “font-size departure and nothing else” is false. Veneer’s table visibly places a smaller, inset caption above the grid; Bootstrap places its caption below, aligned with the frame’s left edge. Header weight and border paint also differ. These treatments have recorded causes in the [departures table](/C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:816). The 14px body font and 1.5 line height explain the 21px container/row height; the additional `.875em` caption treatment contributes to the table’s 149px versus 163px height. This is not uniform image scaling. The table frame also visibly exposes the border paint its key names: sampled light borders are RGB `202,213,226` versus `222,226,230`; dark borders are `64,72,84` versus `73,80,87`, consistent with the recorded tokens.

4. **CONFIRMED — RENDERED-PROVEN(the named cascade-state PNGs).** SHA-256 grouping independently verifies 32 Veneer files carrying 14 distinct images. Every same-state, same-width project pair is byte-identical. The [state registration record](/C:/Users/mikes/WebstormProjects/veneer/tests/setup.ts:126) explains why: the state supplies the photographed mode; the suffix identifies the project. This is structural duplication, not evidence of a broken theme. Every dark/light state pair differs on Veneer and Bootstrap, and visual inspection confirms changed paint with unchanged dimensions.

5. **CONFIRMED — RENDERED-PROVEN(link-role-rest / role-links).** Within each theme, the 390 and 1280 link images are byte-identical on each side. The frames show the same unwrapped “Primary link,” at 73×19px for Veneer and 83×21px for Bootstrap. The recorded typography departure accounts for the size difference. Bootstrap retains primary blue across themes while its background changes; Veneer changes its primary link to cyan, as recorded.

6. **CONFIRMED — NOT-EVIDENCED(the complete rendered role palette).** `link-role-rest` and `role-links` element frames contain only “Primary link.” The [key selector](/C:/Users/mikes/WebstormProjects/veneer/tests/setup.ts:111) is `.link-primary`; the snapshots enumerate the remaining role-link names, but names do not prove their paint. Bootstrap’s page context supplies no matched Veneer element comparison for that palette. Full palette correctness remains **UNPROVEN**; this does not establish a shipped-cascade defect. **Cost:** a maintainer cannot adjudicate the remaining role colors from this portfolio.

7. **CONFIRMED evidence gap — NOT-EVIDENCED(equivalent accessibility names).** Bootstrap’s `base-table--light--390.accessibility.yaml` reports `table "Material shipments"` and its caption; its other theme/width snapshots agree. Veneer’s `light-1280.txt`, `dark-1280.txt`, `light-390.txt`, and `dark-390.txt` omit that table name and caption, although the element frames visibly contain the caption. The recorded column-header, row-header, cell, and role-link names agree where comparable. The differently shaped snapshots cannot establish whether the omitted table name reflects the recorder or the browser’s accessibility tree. Accessibility equivalence remains **UNPROVEN**, rather than a confirmed product failure. **Cost:** a maintainer cannot verify the table’s caption-derived accessible name.

Unpictured widths and hover/focus behavior remain **UNPROVEN** by these resting captures.

ANOTHER ROUND(2, 6, 7)