import re, pathlib
p = pathlib.Path('guides/toolbox.md')
t = p.read_text()

# Constants table: the declared/widened type, never a literal type (Ruling 21).
widen = {
	'AGENT_TOOL_NAME': 'string', 'AGENT_TOOL_DEPTH': 'number',
	'MAX_WORKFLOW_CHAIN': 'number', 'WORKFLOW_TOOL_NAME': 'string',
	'WORKSPACE_TOOL_NAME': 'string', 'DESCRIBE_TOOL_NAME': 'string',
	'PROMPT_TOOL_NAME': 'string', 'ANSWER_TOOL_NAME': 'string',
	'DATABASE_TOOL_NAME': 'string', 'DATABASE_TOOL_LIMIT': 'number',
	'RELATION_TOOL_NAME': 'string', 'RELATION_TOOL_LIMIT': 'number',
	'RELATION_TOOL_DEPTH': 'number', 'INFER_TOOL_NAME': 'string',
	'TERMINAL_ROUTES_PATH': 'string', 'TERMINAL_KEEPALIVE_MS': 'number',
}
out = []
for line in t.split('\n'):
	m = re.match(r'^\| `([A-Z_]+)` \| const \| `[^`]*` \|', line)
	if m and m.group(1) in widen:
		line = re.sub(r'^(\| `[A-Z_]+` \| const \| )`[^`]*`( \|)', r'\g<1>`%s`\g<2>' % widen[m.group(1)], line)
	out.append(line)
t = '\n'.join(out)

t = t.replace('| `AgentFunction` | type | `WorkflowFunction & { category, lineage }` |',
              '| `AgentFunction` | type | `WorkflowFunction plus { category, lineage }` |')
p.write_text(t)
