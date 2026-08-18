# Unit FX-opus: land the audit round's canon fixes (campaign 2 fix round)

Successor to `tmp/skills-cu-opus-brief.md`. The falsification round's verdicts are at
`.orkestrel/scaffold/skills-audit/audit-objective-verdict.md` and (subjective, in the report the
Orchestrator holds) reconciled as follows; every fix below adopts an auditing lane's prescription
verbatim, and the Orchestrator reproduced the underlying facts directly.

## Role and engine

`implementer`, Claude Opus 5, native subagent. Sole serial writer from clean baseline ba1168f.
Perform directly; spawn nothing; no commits.

## The four fixes

1. **documentation.md § Workflow skills** — after the one-level `references/` bullet, one
   directive: name every Markdown file in a skill's `references/` from its SKILL.md, and delete a
   reference nothing names. (The instrument already enforces this; the sentence was missing.)
2. **Same section** — after the bridge-contract bullet, one directive: give every canonical skill
   exactly one provider bridge directory of the same name, and give every bridge directory a
   canonical twin. (Same gap: enforced, unstated.)
3. **Same section** — one coverage sentence recording the mechanical boundary: the sweep proves
   bridge `name`/`description` parity, the named canonical path, and the absence of bridge-owned
   references; competing instructions elsewhere in a bridge body are review-owned. (The audit
   found `inspectBridge` tests only `body.includes(<canonical path>)`; the limit must be written
   where an operator meets it.)
4. **`.claude/rules/application.md`** — house the two clauses the reference deletion lost
   (verified: the deleted file named them; no current rule does):
   - The app-only manifest bullet names the omitted entry fields explicitly: no `main`, `module`,
     `types`, export map, or publish configuration.
   - The published-src bullet gains: a package's bare export is its core API.

## Scope

- Owned: `.claude/rules/documentation.md`, `.claude/rules/application.md`.
- Off-limits: everything else.

## Output

The exact `git diff`, one line per fix, deviation findings or `none`.

## Acceptance criteria

Each added line is a directive in its section's voice; no rule gains a second home; `git diff`
touches only the two owned files; the instruction-files law binds every line.
