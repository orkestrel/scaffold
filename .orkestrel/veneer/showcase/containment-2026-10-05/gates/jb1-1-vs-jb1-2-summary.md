# Journey comparison

Different: gates refused.

Candidate: /home/user/veneer/tmp/units/journey-cost/runs/jb1-2

Baseline: /home/user/veneer/tmp/units/journey-cost/runs/jb1-1

Lines: agree with tmp/units/journey-cost/runs/jb1-1

## Differences, counted by kind

The full report runs to 5.7 MB and stays in veneer `tmp/units/journey-cost`; this summary counts its difference entries by side, direction, and row kind.

- 1 × Journal added drive live components

## Host-bound rows

- New against baseline union: {"title":"showcase statecharts > drives the 'accordion' table through its controls with motion=false","row":"Returns and exchanges through Returns and exchanges {Enter}{Enter}","cause":"Returns and exchanges through Returns and ex …
- New against baseline union: {"title":"showcase statecharts > drives the 'accordion' table through its controls with motion=false","row":"Warranty coverage through Warranty coverage {Enter}{Enter}","cause":"Warranty coverage through Warranty coverage {Enter}{ …

## Normalizations applied

- Rows: strip light/dark-WIDTH and width-only prefixes; width-only prefixes mean light-WIDTH. Check untouched order per artifact, with --moves prefixes excluded only from order.
- Lines and Journal: sort object keys and remove seconds, milliseconds, and host fields recursively.
- Lines and Journal: replace census-authored-(mark|token)-digits with census-authored-$1-<random>.
- Lines and Journal: replace sessionId UUIDs with <session> and recorded HTTP(S) URL ports with <port>.
- Lines and Journal: replace iframeId URL-encoded absolute paths with iframeId=<file>.
- Reading variant: theme from variant and width from payload; width-only payloads mean light-WIDTH.
- Theme Header statechart: key by family; omit variant. Other Header statechart variants remain gated.
- Component control: width from stdout header title; historical both-widths headers use width evidence scoped to that exact title.
- Journal: compare without artifact/host key; remove error: Showcase statechart failed entries and every payload carrying seconds or milliseconds. Baseline timing entries are listed verbatim.
- Dumps: read only column-zero Showcase statechart failed; ignore every Vite client console forwarding copy.
- Failures: gate candidate titles against the host-bound set; report row/cause tuples as information against the baseline union and mark titles that failed in no baseline. Matched tables omit the assertion message; normalize elapsed waited …ms and stack frames …

Registration requires the supplied TOTAL/SKIPPED counts in the candidate. Every candidate failure title must be host-bound; baseline occurrence and row/cause tuples are informational. Rows must agree with every baseline; lines and Journal must each agree with  …
This report covers one candidate run. Acceptance-run frequency and price/memory eligibility remain lane M decisions.
