# Unit absorb-old-guide — the old guide's engine sections, styles ledger shape, and token reference

Fill every section. Write `none` in an empty one.

## Role and engine

`grok` on Grok 4.7 (`grok-4.7-high`), reached as the Cursor `agent` CLI in print mode. Executor: BENCH_ENGINE. You perform the whole reading yourself and spawn nothing.

## Objective

Produce one Markdown document that extracts, from the old Veneer guide, the engine sections' stated departures and limits per component, the shape and gating of the styles ledger, the token reference map, and the customization contract, so the successor knows what the old package documented as true and what it carried as a ledger.

## Context

- **Evidence.** The old guide is `tmp/mikesaintsg-veneer/guides/veneer.md` (a clone of the earlier `veneer` repository under the `mikesaintsg` GitHub account, at commit `86491c2`), 2.2 MB, mostly tables with long lines. Its sections by line: § Surface 5, § Methods 352, § Examples 560, § Engine 811 (with § Vocabulary 843, § Events 876, § Delegation 892, § Ownership and restoration 945, § Motion 1073, § Components 1087 with one `####` per component to line 3357), § Styles 3358 (§ Files 3434, § Tailwind 3618, § Scripts 4083, § Color modes 4107, then one `### … classes` or `### … utilities` ledger table per Bootstrap area from 4163 to 7184, § Media conditions 7185, § Keyframes 7220, § Deferred selectors 7247, § Departures from the workspace rows 7276), § Tokens 7337 (§ Reference map 7364 with its `####` groups, § Button states and bindings 7695, § Bootstrap variables Veneer retains 7802, § Customization 7822 to the end).
- **Background.** The successor keeps Bootstrap 5.3.8's contracts, recreates Bootstrap's CSS byte-faithfully on its own `bootstrap` face, keeps `--vn-*` tokens on its own `styles` face, and redesigns the engine. It needs to know which departures the old engine documented (so it can decide each anew), how the ledger tables were shaped and gated (so it can design the recreation's proof), and the token reference the old package published.
- **Law.** Read-only. Cite `file:line` for every fact. Quote no more than one sentence per citation. Do not paste tables.
- **Host.** Windows, working directory `C:\Users\mikes\WebstormProjects\scaffold`. Your shell is restricted; read files with your file-reading tool and run no command. The ledger tables between lines 4163 and 7184 are too long to read whole: read § Files (3434 to 3617), § Scripts and § Color modes (4083 to 4162), the first 40 lines of two ledger tables (§ Button group classes from 5000 and § Spacing utilities from 6759), § Media conditions to § Departures from the workspace rows (7185 to 7336), and § Tokens whole (7337 to the end).

## Unknowns

Where the guide states a value you cannot verify, record it as the guide's claim.

## Scope

- **Read, range.** `tmp/mikesaintsg-veneer/guides/veneer.md` lines 811 to 1092 (§ Engine through § Components' opening), then for each component subsection from 1093 to 3357 read only its opening paragraph and every paragraph or bullet list whose text carries `departure`, `differs`, `Bootstrap`, `limit`, or `outside the engine contract` (use your search tool over that range), then lines 3358 to 3617, 4083 to 4162, 5000 to 5040, 6759 to 6799, 7185 to 7336, and 7337 to the end.
- **Off-limits.** Every other file. Write nothing.

## Execution

Read the ranges in scope, then write the document.

## Output

Your final message is the document. Structure it exactly so:

```markdown
# Old guide distillate

## Engine departures and limits

| Component | Departure or limit (one sentence) | Class | Citation |
| --- | --- | --- | --- |
```

`Class` is one of `contract` (a Bootstrap behaviour the old engine chose not to mirror), `platform` (a limit the browser imposes), `design` (a limit of the old engine's own mechanism).

```markdown
## Engine mechanisms as documented

One bullet per mechanism § Events, § Delegation, § Ownership and restoration, and § Motion document (the event shape, the delegate's routes and release, the snapshot's restore rule, the completion reading), with citation.

## Ledger shape

The columns each `### … classes` table carries, the status vocabulary, how § Departures from the workspace rows and § Deferred selectors relate to it, and which gate reads each, with citation.

## Files and scripts

What § Files and § Scripts document about the shipped stylesheet, its entry, and the consumer's imports, with citation.

## Color modes

What § Color modes documents about `data-bs-theme`, `color-scheme`, and islands, with citation.

## Token reference

One bullet per `####` group under § Reference map: the group, the tokens it lists, the Bootstrap aliases it maps, with citation. Then § Button states and bindings, § Bootstrap variables Veneer retains, and § Customization, one bullet each.

## Unknowns
```

No process diary, no preamble, no closing remarks.

## Deviation contract

If the file cannot be read, stop and report the path and the error. Settle every classification yourself and state the reason.

## Acceptance criteria

1. Every component under § Components (Collapse, Alert, Tab, ScrollSpy, Dropdown, Carousel, Modal, Toast, Offcanvas, Tooltip, Popover) has at least one row or the line `none documented`.
2. Every `####` group under § Reference map has one bullet.
3. Every row and bullet cites a `file:line`.

**Observations, not criteria.** none

## Review evidence

The document itself; the Orchestrator runs `node .agents/skills/orkestrel-dispatch/scripts/cite.ts` over it and checks each citation.
