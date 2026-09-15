# P27 — the formatter residue, measured by the Orchestrator with its own control

Orchestrator probe, 2026-09-15 ~19:20Z, read-only. Instrument `p27-reflow.mjs.txt`; it reads a
unified diff and reports every hunk whose removed and added lines are the same text differently
wrapped, by joining each side, stripping every whitespace run, and dropping a comma immediately
before a closing bracket, which is what a formatter adds when it expands a literal.

The question is one `format:check` cannot answer: `oxfmt` preserves an author's line break inside
an object literal, so an unforced expansion passes the gate. The A5b reviewer found four such
sites and read them as surviving `prettier --write` residue, which falsified U5d's claim to have
recovered cleanly.

## The readings

| Delta | Reflow-only hunks |
| --- | --- |
| U5c + U5d, before the fix (the control) | `page.goto`, the module surface check, and the CommonJS surface check |
| U5c + U5d + U5e, after the fix | none |

The control is what makes the clean reading mean something: the same instrument over the same file
before U5e reports the sites the reviewer named, so a clean reading after it is the residue being
gone rather than the instrument being blind. The control under-reports by one — the `runNode` call
the reviewer also named is not among the three, because that hunk's neighbouring context defeats
this instrument's pairing — so the instrument is a floor on what is present, never a ceiling, and
U5e's own sweep with its own method is the wider reading.

This closes acceptance criterion 3 of `U5e-mcp-receipt-residue-brief.md` on the Orchestrator's own
evidence rather than on the unit's report.
