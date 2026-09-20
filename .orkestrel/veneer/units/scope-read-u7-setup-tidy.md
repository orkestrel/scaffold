<!-- workflow wf_85d7076e-ed8, agent a2effc2142ce69bac, label unknown, retained 2026-09-20 -->

Confirmed. Now I have sufficient evidence for all findings.

**(1) Off-limits / unscoped edits required by an acceptance criterion or execution item**

none found — every owned Scope row covers the file each execution item and acceptance criterion needs, including the ambiguous "rewrite its cases over a fixture table" clause in item 5, which resolves inside the owned `tests/setupConformance.test.ts` (the existing `ORACLE_BINDINGS` table already lives there, `C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:92-172`), not `tests/fixtures/**`.

**(2) Factual claims contradicted by the tree**

1. Brief `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u7-setup-tidy-brief.md:129` and `:161-163` name the working-directory case's "real failure" as `process.chdir is unavailable in a worker thread` — a refusal/throw. The tree's own comment on that same case gives a different mechanism: `C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.test.ts:642-644` reads "The case mutates the working directory, so it needs a process of its own: the `setup` project takes the default `forks` pool, and under a thread pool the files running beside this one would read the scratch directory as their own root" — a cross-file `cwd` contamination hazard between sibling files sharing one thread's memory, not a per-call `process.chdir` throw. `PLANT-POOL` (brief lines 69-70) requires the case to "red with the `process.chdir` refusal the comment names," but the comment currently in the tree names contamination, not a refusal; whichever mechanism actually fires under `pool: 'threads'` is a runtime fact this unit must read for itself, not one the brief or the tree currently states consistently.

**(3) Existing declarations/assertions the brief's items would collide with, unmentioned by the brief**

1. `readCompatibility` builds one `label` constant (`C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:450`, `` `${component}: ${obligation}` ``) and reuses it for two different thrown messages: the "missing required cell" error at `:452` and the "invalid status" error at `:454`. Execution item 4 (brief `:135-137`) only specifies a new position-and-column-named label for "an incomplete row" (the missing-cell case) and gives the example `Compatibility row 3 (Component: btn): missing required cell`. It says nothing about the invalid-status message. `tests/setupConformance.test.ts:401` pins the current shared-label wording for that invalid-status message: `'Compatibility row btn: Toggle active: invalid status pending'`. Rewriting the shared `label` variable to the new position/column form goes this assertion false unless the unit splits the two error paths into separate label constructions — a decision the brief does not mention.

scope read: 2 findings
