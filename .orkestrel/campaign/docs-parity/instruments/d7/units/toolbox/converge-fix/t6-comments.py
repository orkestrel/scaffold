# Rewrites the `//` section comments T6 names: lowers all-caps emphasis, drops counts,
# and converts a prose `+` and a `below` pointer on a line already being rewritten.
import pathlib

EDITS = {
	'src/core/types.ts': [
		("// the SOURCE OF TRUTH and the implementation conforms to them, never the reverse. The",
		 "// the source of truth and the implementation conforms to them, never the reverse. The"),
		("// WorkflowToolResult, and adapter options are OWNED here and consume the current",
		 "// WorkflowToolResult, and adapter options are owned here and consume the current"),
		("// === Draft family (the workflow tool's LENIENT authoring surface — id/name optional)",
		 "// === Draft family (the workflow tool's lenient authoring surface — id/name optional)"),
		("// A DRAFT mirrors the `WorkflowDefinition` family (`@orkestrel/workflow`) EXACTLY except `id`\n"
		 "// and `name` are OPTIONAL at all three levels, so a small model can omit the six identity\n"
		 "// strings. It is NOT a runtime form — `createWorkflowDraftContract` validates it (a provided\n"
		 "// id/name still has `minLength: 1`, so an explicitly-empty `id: ''` is REJECTED, not \"absent\"),\n"
		 "// and `completeDraft` synthesizes any MISSING id positionally + defaults a missing name to its\n"
		 "// id, yielding a strict `WorkflowDefinition` that is THEN re-validated against the strict",
		 "// A draft mirrors the `WorkflowDefinition` family (`@orkestrel/workflow`) exactly except `id`\n"
		 "// and `name` are optional at the workflow, phase, and task levels, so a small model can omit\n"
		 "// every identity string. It is not a runtime form — `createWorkflowDraftContract` validates it\n"
		 "// (a provided id/name still has `minLength: 1`, so an explicitly-empty `id: ''` is rejected,\n"
		 "// not \"absent\"), and `completeDraft` synthesizes any missing id positionally and defaults a\n"
		 "// missing name to its id, yielding a strict `WorkflowDefinition` that is then re-validated\n"
		 "// against the strict"),
	],
	'src/core/helpers.ts': [
		("// === Draft completion + flat-steps expansion (the tool's LENIENT authoring surfaces)",
		 "// === Draft completion and flat-steps expansion (the tool's lenient authoring surfaces)"),
		("// Pure, deterministic synthesis that turns a WIDENED authoring form into a strict\n"
		 "// `WorkflowDefinition` (`@orkestrel/workflow`). They auto-fill only OMITTED identity (a provided\n"
		 "// id/name is preserved verbatim; an explicitly-empty `id: ''` is rejected UPSTREAM by the draft\n"
		 "// contract, never reached here), so a small model can author a complete tree without emitting\n"
		 "// the six required `id`/`name` strings. The factory re-validates the result against the STRICT\n"
		 "// `createWorkflowContract().is` gate before running (soundness).",
		 "// Pure, deterministic synthesis that turns a widened authoring form into a strict\n"
		 "// `WorkflowDefinition` (`@orkestrel/workflow`). They auto-fill only omitted identity (a provided\n"
		 "// id/name is preserved verbatim; an explicitly-empty `id: ''` is rejected upstream by the draft\n"
		 "// contract, never reached here), so a small model can author a complete tree without emitting an\n"
		 "// `id` or a `name` anywhere in it. The factory re-validates the result against the strict\n"
		 "// `createWorkflowContract().is` gate before running (soundness)."),
	],
	'src/core/shapers.ts': [
		("// Toolbox shapes — the shape VALUE each `create*Tool` factory (factories.ts) compiles into\n"
		 "// the lockstep guard + parser + JSON Schema outputs. `agentToolShape` MUST agree\n"
		 "// with the hand-written `AgentToolArguments` (types.ts), which is the source of truth.",
		 "// Toolbox shapes — the shape value each `create*Tool` factory (factories.ts) compiles into\n"
		 "// the lockstep guard, parser, and JSON Schema outputs. `agentToolShape` must agree\n"
		 "// with the hand-written `AgentToolArguments` (types.ts), which is the source of truth."),
	],
	'src/core/errors.ts': [
		("// malformed-call and resolution guards, so this package mints ONE typed error, `ToolboxError`,\n"
		 "// mirroring `WorkflowError`'s exact shape (`code` + optional `context`) for the same reason: a",
		 "// malformed-call and resolution guards, so this package mints one typed error, `ToolboxError`,\n"
		 "// mirroring `WorkflowError`'s exact shape (`code` and an optional `context`) for the same\n"
		 "// reason: a"),
		("// TOOL-CALL error — not scoped to agent delegation alone — so every package-owned `TOOL` misuse",
		 "// tool-call error — not scoped to agent delegation alone — so every package-owned `TOOL` misuse"),
	],
	'src/core/factories.ts': [
		("\t\t\t// Branch on the owned args snapshot's SHAPE (no ambient context — a tool handler gets only\n"
		 "\t\t\t// `args`): empty ⇒ the wrapped definition; a `steps` array ⇒ the FLAT form, parsed +\n"
		 "\t\t\t// expanded; otherwise the nested DRAFT form, parsed + completed. A parse failure leaves\n"
		 "\t\t\t// `target` undefined ⇒ the strict gate below throws `TOOL`.",
		 "\t\t\t// Branch on the owned args snapshot's shape (no ambient context — a tool handler gets only\n"
		 "\t\t\t// `args`): empty ⇒ the wrapped definition; a `steps` array ⇒ the flat form, parsed and\n"
		 "\t\t\t// expanded; otherwise the nested draft form, parsed and completed. A parse failure leaves\n"
		 "\t\t\t// `target` undefined ⇒ the strict gate that follows throws `TOOL`."),
		("\t\t\t// The SOUNDNESS gate: whatever authoring form produced `target`, it must satisfy the\n"
		 "\t\t\t// STRICT canonical contract before it runs — the leniency never reaches the runner.",
		 "\t\t\t// The soundness gate: whatever authoring form produced `target`, it must satisfy the\n"
		 "\t\t\t// strict canonical contract before it runs — the leniency never reaches the runner."),
		("\t\t\t// Registry ops act on the MANAGER, not a workspace — handle them first.",
		 "\t\t\t// Registry ops act on the manager, not a workspace — handle them first."),
		("\t\t\t// Edit / read ops target the ACTIVE workspace. A WRITING op auto-creates and activates a\n"
		 "\t\t\t// default workspace when none is active (the no-active ergonomic seam) — while a pure-READ\n"
		 "\t\t\t// op returns the empty result against no active workspace rather than creating one.",
		 "\t\t\t// Edit and read ops target the active workspace. A writing op auto-creates and activates a\n"
		 "\t\t\t// default workspace when none is active (the no-active ergonomic seam) — while a pure-read\n"
		 "\t\t\t// op returns the empty result against no active workspace rather than creating one."),
		("\t// The definition is stored as ONE OPAQUE JSON column (`rawShape`), so the row infers FLAT —\n"
		 "\t// `{ id: string; definition: unknown }` = DatabaseDefinitionRow.",
		 "\t// The definition is stored as one opaque JSON column (`rawShape`), so the row infers flat —\n"
		 "\t// `{ id: string; definition: unknown }` = DatabaseDefinitionRow."),
	],
}

for path, edits in EDITS.items():
	p = pathlib.Path(path)
	text = p.read_text(encoding='utf-8')
	for old, new in edits:
		assert text.count(old) == 1, (path, text.count(old), old.split('\n')[0])
		text = text.replace(old, new)
	p.write_text(text, encoding='utf-8')
	print('rewrote', path)
