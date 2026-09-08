import pathlib
p = pathlib.Path('guides/toolbox.md')
t = p.read_text()

renames = [
	('### Lifecycle entities\n', '### Lifecycle classes\n'),
	('### Composing lifecycle entities directly\n', '### Composing `DatabaseResolver` directly\n'),
	('### Authoring + running a workflow through the tool, by using a real `ToolManager`\n',
	 '### Authoring and running a workflow through the tool with a real `ToolManager`\n'),
	('### Lean advertisement + on-demand expansion through `createDescribeTool`\n',
	 '### Lean advertisement and on-demand expansion through `createDescribeTool`\n'),
	('### Asking + answering through the terminal seam\n',
	 '### Asking and answering through the terminal seam\n'),
	('### The database / relation helpers, standalone\n',
	 '### The database and relation helpers, standalone\n'),
]
for a, b in renames:
	assert t.count(a) == 1, a
	t = t.replace(a, b)

leads = {
	'### Composing `DatabaseResolver` directly':
		'Construct the resolver over a caller-owned handle map, a driver registry, and a definition store, then drive its cache calls and resolve a database by id:',
	'### Authoring and running a workflow through the tool with a real `ToolManager`':
		'Register the workflow tool on a real manager, then let a small model author the flat step list the tool advertises:',
	'### Plugging a `WorkflowStoreInterface` and retrieving the persisted snapshot':
		'Hand the tool a native workflow store, run the wrapped definition, and rebuild the finished run from the snapshot the runner checkpointed:',
	'### Driving the workspace tool with a plugged store':
		'Build the workspace tool over a store, then write a file and read it back through the manager the tool constructed:',
	'### Delegating to a sub-agent through the agent tool':
		'Register the agent tool over a seeded registry and delegate one task to a sub-agent:',
	"### Persisting a delegation's conversation through the agent tool's own `store` slot":
		"Supply a conversation store, and each delegation's conversation is persisted under its own id:",
	'### Lean advertisement and on-demand expansion through `createDescribeTool`':
		'Register several tools on one manager, then expand a lean `summary` into its full teaching description on demand:',
	'### Composing opaque leaves and raw agents into a workflow registry':
		'Split a workflow target registry into opaque host leaves and raw agents, and hand the same split to the authoring tool:',
	'### The lenient-authoring helpers, standalone':
		'Call the lineage, draft-completion, and step-expansion helpers directly, outside any tool:',
	'### Recovering a typed `ToolboxError`':
		"Catch a thrown failure and narrow it with the package's own guard to read its `code`:",
	'### Asking and answering through the terminal seam':
		'Wire the ask and answer halves over one live terminal manager, and settle a form across them:',
	'### The terminal error-classification helper, standalone':
		'Map a caught terminal failure to the code the terminal tools throw with:',
	'### Bridging a `TerminalManagerInterface` onto the wire':
		'Build the route records that carry a terminal manager over the wire, and mount them on any router that accepts a structural handler:',
	'### Driving the database tool: create with metadata, add a row, query with a serialized condition':
		'Create a database from the column DSL, add a row, and query it with a serialized condition:',
	'### Persisting database definitions through `DefinitionStoreInterface`':
		"Swap the in-memory definition store for the table-backed twin without changing the tool's calls:",
	'### Wiring the relation tool over a live `RelationManagerInterface` and loading nested includes':
		'Register a live relation manager and load a row with a nested dot-path `include` list:',
	'### The database and relation helpers, standalone':
		'Call the column compilers, the error classifiers, the query normalizer, and the relation resolvers directly:',
	'### Inferring a JSON Schema from example values, through a real `ToolManager`':
		'Infer a schema from example values and check candidate values against that schema in the same call:',
	'### Bridging an existing API endpoint into an LLM-callable tool':
		'Wrap one concrete endpoint whose advertised `parameters` are inferred from its samples and enforced at call time:',
}

lines = t.split('\n')
out = []
i = 0
while i < len(lines):
	out.append(lines[i])
	head = lines[i]
	if head in leads and i + 2 < len(lines) and lines[i + 1] == '' and lines[i + 2].startswith('```'):
		out.append('')
		out.append(leads[head])
		del leads[head]
	i += 1
assert not leads, leads
p.write_text('\n'.join(out))
