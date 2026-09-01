# Unit breaking-ledger — distill the deferred breaking rows into an exact symbol ledger

## Role and engine

`grok` driver on Cursor Grok (`cursor-grok-4.6-high`), reached through the Cursor CLI. Read-only.

## Question

For every row of the breaking work order that belongs to the layers this launch names, produce one
JSON record naming the exact published symbols the repair moves, verified against the package
source, so a script can compute each row's consumer blast radius across the fleet.

## Context

**Evidence.** The rows: `/home/user/scaffold/.orkestrel/campaign/fix/work-order.md` (one bullet per
row, `- **<package> <id>** — <writer's deferral note>`, grouped under `## L0` … `## L6` headings).
The finding text and, for a DRIFT-RESHAPE, the corrected repair: section `## <id> — …` in
`/home/user/scaffold/.orkestrel/campaign/fix/<package>.md`. The writer's full note: the `<id>` line in
`/home/user/scaffold/.orkestrel/campaign/fix/reports/<package>.md`. Package source:
`/home/user/fleet/<package>/src/**` (scaffold at `/home/user/scaffold/src/**`). The `referral …`
rows have no dossier section; take their repair from `/home/user/scaffold/.orkestrel/campaign/fix/referrals-middleware-report.md` and the row note itself.

**Law.** Read-only evidence work under `.agents/orchestration.md` § Tedious work goes to Grok.
No decisions, no design, no edits.

**Host.** Linux, bash. Working path `/home/user/scaffold`. No network needed.

**Standing conditions.** The dossier and report line numbers can be stale; verify each symbol by
searching the current source. Some rows deliberately defer a whole finding whose repair has a
non-breaking half already applied; record only the part still to apply.

## Scope

Layers: LAYERS_PLACEHOLDER. Read only the files named above and the package source trees. Write
nothing.

## Output

Return the `grok` shape: `Question`, `Evidence`, `Distillate`, `Unknowns`, `Deviation`. Put the
Distillate as one fenced JSON array, one object per row, exactly this shape:

```json
{
  "package": "contract",
  "id": "s03-01",
  "kind": "rename | remove | signature | option-key | event | union-member | behavior | type | mixed",
  "edits": [
    { "symbol": "exactExportedName", "action": "rename | remove | change", "to": "newName-or-omit", "member": "owningInterfaceOrClass-or-omit", "file": "src/core/helpers.ts:123" }
  ],
  "guide": "guides/<package>.md sections or rows the repair names, or omit",
  "prerequisite": ["ids in the same package that must land first, or empty"],
  "summary": "one sentence: the repair still to apply"
}
```

Rules for the record: every `symbol` is the exact identifier as it appears in the package's
`src/` (verified, with a `file:line` pointer in Evidence); `member` names the interface or class
that owns a renamed or removed member; a removed export lists `action: remove`; a signature or
option-key change lists the symbol with `action: change` and states the new shape in `summary`.
Where the repair text is ambiguous about the target name, put the row in `Unknowns` with the
alternatives, and still emit the record with `"to"` omitted.

No raw file dumps. Evidence carries `file:line` pointers only.
