# Journey comparison

Different: gates refused.

Candidate: /home/user/veneer/tmp/units/journey-cost/runs/jb1-1

Baseline: /home/user/veneer/tmp/units/journey-cost/runs/jb0-1
Baseline: /home/user/veneer/tmp/units/journey-cost/runs/jb0-2

## Differences, counted by kind

The full report runs to 52.7 MB and stays in veneer `tmp/units/journey-cost`; this summary counts its difference entries by side, direction, and row kind.

- 56 × Journal added info
- 28 × Journal removed info
- 12 × Lines removed Partition population
- 12 × Lines added Partition population
- 8 × Journal removed measure minimum heading margin
- 8 × Journal added measure minimum heading margin
- 4 × Rows removed component preservation
- 4 × Rows removed signature coverage
- 4 × Rows removed partition
- 4 × Rows added component preservation
- 4 × Rows added signature coverage
- 4 × Rows added partition
- 4 × Lines removed Component preservation
- 4 × Lines removed Component repaired causes
- 4 × Lines removed Component reader controls
- 4 × Lines removed Partition
- 4 × Lines removed Partition control
- 4 × Lines added Component preservation
- 4 × Lines added Component repaired causes
- 4 × Lines added Component reader controls
- 4 × Lines added Partition
- 4 × Lines added Partition control
- 1 × Journal removed drive live components

## Host-bound rows

- Matched against baseline union: {"title":"showcase journeys > J8 drives the engine through the component sections and opens nothing on arrival","row":"<assertion>","cause":"Error: Named region \"Uploads\" is not visible"}
- New against baseline union: {"title":"showcase statecharts > drives the 'tooltip' table through its controls with motion=true","row":"Hint to the left through {Escape}","cause":"Hint to the left through {Escape}: shown on {Escape} becomes shown"}
- Matched against baseline union: {"title":"showcase statecharts > drives the 'collapse' table through its controls with motion=false","row":"Expand details hidden through {Enter}{Enter}","cause":"Expand details hidden through {Enter}{Enter}: hidden on {Enter} …
- New against baseline union: {"title":"showcase statecharts > drives the 'accordion' table through its controls with motion=false","row":"Adding seats through Cancelling a plan {Enter}{Enter}","cause":"Adding seats through Cancelling a plan {Enter}{Enter}: Ad …

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
