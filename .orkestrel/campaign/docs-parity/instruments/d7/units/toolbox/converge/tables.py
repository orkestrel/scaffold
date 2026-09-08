#!/usr/bin/env python3
"""Rewrites the guide's Surface and Methods table headers and inserts the Shape column.

Splits a row on a pipe not preceded by a backslash, so an escaped union arm inside a
Shape or Signature cell stays whole. Emits unaligned rows; oxfmt restores the alignment.
"""
import re
import sys

PATH = 'guides/toolbox.md'
SPLIT = re.compile(r'(?<!\\)\|')

SHAPES_VALIDATORS = {
	'`isWorkflowLineage`': '`WorkflowLineage`',
	'`isAgentFunction`': '`AgentFunction`',
	'`isColumnPrimitive`': '`ColumnPrimitive`',
	'`isColumnSpec`': '`ColumnSpec`',
	'`isDatabaseDefinition`': '`DatabaseDefinition`',
}

SHAPES_CONSTANTS = {
	'`AGENT_TOOL_NAME`': "`'agent'`",
	'`AGENT_TOOL_DEPTH`': '`8`',
	'`AGENT_TOOL_DESCRIPTION`': '`string`',
	'`AGENT_TOOL_SUMMARY`': '`string`',
	'`MAX_WORKFLOW_CHAIN`': '`8`',
	'`WORKFLOW_TOOL_NAME`': "`'workflow'`",
	'`WORKFLOW_TOOL_FLAT_EXAMPLE`': '`WorkflowSteps`',
	'`WORKFLOW_TOOL_NESTED_EXAMPLE`': '`WorkflowDefinition`',
	'`WORKFLOW_TOOL_DESCRIPTION`': '`string`',
	'`WORKFLOW_TOOL_SUMMARY`': '`string`',
	'`WORKSPACE_TOOL_NAME`': "`'workspace'`",
	'`WORKSPACE_TOOL_EXAMPLE`': '`WorkspaceOperation`',
	'`WORKSPACE_TOOL_DESCRIPTION`': '`string`',
	'`WORKSPACE_TOOL_SUMMARY`': '`string`',
	'`DESCRIBE_TOOL_NAME`': "`'describe'`",
	'`DESCRIBE_TOOL_SUMMARY`': '`string`',
	'`DESCRIBE_TOOL_DESCRIPTION`': '`string`',
	'`PROMPT_TOOL_NAME`': "`'ask'`",
	'`PROMPT_TOOL_SUMMARY`': '`string`',
	'`PROMPT_TOOL_DESCRIPTION`': '`string`',
	'`ANSWER_TOOL_NAME`': "`'answer'`",
	'`ANSWER_TOOL_SUMMARY`': '`string`',
	'`ANSWER_TOOL_DESCRIPTION`': '`string`',
	'`DATABASE_TOOL_NAME`': "`'database'`",
	'`DATABASE_TOOL_SUMMARY`': '`string`',
	'`DATABASE_TOOL_DESCRIPTION`': '`string`',
	'`DATABASE_TOOL_LIMIT`': '`1000`',
	'`DATABASE_TOOL_MUTATIONS`': '`readonly string[]`',
	'`RELATION_TOOL_NAME`': "`'relation'`",
	'`RELATION_TOOL_SUMMARY`': '`string`',
	'`RELATION_TOOL_DESCRIPTION`': '`string`',
	'`RELATION_TOOL_LIMIT`': '`1000`',
	'`RELATION_TOOL_DEPTH`': '`3`',
	'`INFER_TOOL_NAME`': "`'infer'`",
	'`INFER_TOOL_SUMMARY`': '`string`',
	'`INFER_TOOL_DESCRIPTION`': '`string`',
}

SHAPES_TYPES = {
	'`TaskDraft`': '`{ id?, name?, description?, behavior?, retries?, timeout? }`',
	'`PhaseDraft`': '`{ id?, name?, description?, tasks, concurrency?, bail? }`',
	'`WorkflowDraft`': '`{ id?, name?, description?, phases, bail? }`',
	'`WorkflowStep`': '`{ name }`',
	'`WorkflowSteps`': '`{ name?, steps }`',
	'`WorkflowToolResult`': '`{ status, count, durable?, fault? }`',
	'`WorkflowLineage`': '`readonly string[]`',
	'`WorkflowAgents`': '`Readonly<Record<string, AgentInterface>>`',
	'`AgentFunction`': '`WorkflowFunction & { category, lineage }`',
	'`AgentFunctionOptions`': '`{ runner?, lineage?, functions?, agents?, store? }`',
	'`WorkflowToolOptions`': '`{ lineage?, functions?, agents?, store? }`',
	'`WorkspaceToolOptions`': '`{ name?, description?, manager?, store? }`',
	'`WorkspaceOperation`': (
		"`{ operation: 'read', path } \\| { operation: 'list' } \\| { operation: 'has', path } \\| "
		"{ operation: 'search', query, regex?, sensitive?, limit? } \\| "
		"{ operation: 'replace', query, replacement, regex?, sensitive?, limit? } \\| "
		"{ operation: 'write', path, content } \\| "
		"{ operation: 'splice', path, content, fromLine, fromColumn, toLine, toColumn } \\| "
		"{ operation: 'prepend', path, content } \\| { operation: 'append', path, content } \\| "
		"{ operation: 'move', from, to } \\| { operation: 'remove', path } \\| "
		"{ operation: 'workspaces' } \\| { operation: 'switch', id }`"
	),
	'`AgentToolOptions`': (
		'`{ name?, description?, provider?, tools?, system?, depth?, ancestry?, store? }`'
	),
	'`AgentToolArguments`': '`{ task, provider?, tools?, system? }`',
	'`ToolboxErrorCode`': (
		"`'TOOL' \\| 'DEPTH' \\| 'DEADLOCK' \\| 'EXPIRE' \\| 'ANSWER' \\| 'DATABASE' \\| 'RELATION'`"
	),
	'`DescribeToolArguments`': '`{ name }`',
	'`PromptToolOptions`': '`{ manager, from, name?, description? }`',
	'`AnswerToolOptions`': '`{ manager, to, name?, description? }`',
	'`ColumnPrimitive`': "`'string' \\| 'integer' \\| 'number' \\| 'boolean'`",
	'`ColumnSpec`': '`ColumnPrimitive \\| { primitive, optional? }`',
	'`TableSpec`': '`Readonly<Record<string, { columns }>>`',
	'`DatabaseDefinition`': '`{ id, driver, tables, primary?, indexes?, version? }`',
	'`DatabaseDefinitionRow`': '`{ id, definition }`',
	'`DefinitionStoreInterface`': '`{} plus get, set, delete`',
	'`DatabaseQueryInput`': '`{ conditions?, order?, limit?, offset? }`',
	'`ClampedQuery`': '`{ query, limit }`',
	'`DatabaseToolOptions`': (
		'`{ name?, description?, databases?, store?, drivers?, generator?, limit?, timeout?, '
		'readonly? }`'
	),
	'`RelationToolOptions`': '`{ name?, description?, managers, limit?, depth? }`',
	'`InferToolOptions`': '`{ name?, description? }`',
	'`EndpointHandler`': (
		'`(args: Readonly<Record<string, unknown>>) => Promise<unknown> \\| unknown`'
	),
	'`EndpointDefinition`': '`{ name, description, samples, execute }`',
	'`EndpointToolOptions`': '`{ format?, enum?, validate? }`',
}

SHAPES_ROUTES = {
	'`createTerminalRoutes`': '',
	'`TerminalRouteMethod`': (
		"`'GET' \\| 'POST' \\| 'PUT' \\| 'PATCH' \\| 'DELETE' \\| 'HEAD' \\| 'OPTIONS'`"
	),
	'`TerminalRouteContext`': '`{ params }`',
	'`TerminalRoute`': '`{ method, path, handler }`',
	'`TerminalRoutesOptions`': '`{ path?, token?, keepalive?, timer?, limit? }`',
	'`TerminalToken`': '`string \\| ((value: string \\| undefined) => boolean)`',
	'`TERMINAL_ROUTES_PATH`': "`'/terminals/:name'`",
	'`TERMINAL_KEEPALIVE_MS`': '`15_000`',
}

# Keyed by the table's first-column header plus its first data row's key cell.
PLAN = {
	'isWorkflowLineage': ('rename', SHAPES_VALIDATORS),
	'tagWorkflow': ('rename', None),
	'expandTables': ('rename', None),
	'AGENT_TOOL_NAME': ('constants', SHAPES_CONSTANTS),
	'TaskDraft': ('append', SHAPES_TYPES),
	'createTerminalRoutes': ('insert', SHAPES_ROUTES),
	'get': ('rename', None),
	'has': ('rename', None),
}


def cells(line: str) -> list[str]:
	parts = SPLIT.split(line)
	return [part.strip() for part in parts[1:-1]]


def render(values: list[str]) -> str:
	return '| ' + ' | '.join(values) + ' |'


def main() -> int:
	lines = open(PATH, encoding='utf8').read().split('\n')
	out: list[str] = []
	index = 0
	changed: list[str] = []
	while index < len(lines):
		line = lines[index]
		if not (
			line.startswith('|')
			and index + 1 < len(lines)
			and re.match(r'^\|[ :-]+\|', lines[index + 1])
		):
			out.append(line)
			index += 1
			continue
		header = cells(line)
		body: list[list[str]] = []
		cursor = index + 2
		while cursor < len(lines) and lines[cursor].startswith('|'):
			body.append(cells(lines[cursor]))
			cursor += 1
		key = body[0][0].strip('`')
		action, shapes = PLAN.get(key, (None, None))
		if action is None:
			out.extend(lines[index:cursor])
			index = cursor
			continue
		if action == 'rename':
			header[-1] = 'Summary'
		elif action == 'constants':
			header[-1] = 'Shape'
			header.append('Summary')
			for row in body:
				summary = row[-1]
				row[-1] = shapes[row[0]]
				row.append(summary)
		elif action == 'append':
			header.append('Summary')
			for row in body:
				row[-1] = shapes[row[0]]
				row.append('')
		elif action == 'insert':
			header.insert(-1, 'Shape')
			for row in body:
				row.insert(-1, shapes[row[0]])
		if shapes is not None and action == 'rename':
			header.insert(-1, 'Shape')
			for row in body:
				row.insert(-1, shapes[row[0]])
		out.append(render(header))
		out.append(render(['---'] * len(header)))
		for row in body:
			out.append(render(row))
		changed.append(f'{key}: {action} -> {" | ".join(header)}')
		index = cursor
	open(PATH, 'w', encoding='utf8').write('\n'.join(out))
	for entry in changed:
		print(entry)
	return 0


if __name__ == '__main__':
	sys.exit(main())
