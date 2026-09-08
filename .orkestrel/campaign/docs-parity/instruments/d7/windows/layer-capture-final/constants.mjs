export const PACKAGES = Object.freeze([
	'abort', 'agent', 'brief', 'browser', 'budget', 'codec', 'console', 'contract', 'csv',
	'database', 'emitter', 'form', 'guide', 'html', 'indexeddb', 'interpret', 'lsp', 'markdown',
	'mcp', 'middleware', 'msg', 'ndjson', 'ollama', 'pool', 'probe', 'process', 'program',
	'qualifier', 'queue', 'rater', 'reason', 'relation', 'router', 'scaffold', 'sea', 'server',
	'sqlite', 'sse', 'table', 'template', 'terminal', 'test', 'timeout', 'tool', 'toolbox',
	'websocket', 'worker', 'workflow', 'workspace'
])

export const LIMIT = 16_777_216
export const REGISTRY = 'https://registry.npmjs.org/'
export const TIMEOUT = 60_000
export const GIT = Object.freeze([
	Object.freeze({ arguments: Object.freeze(['status', '--porcelain']), source: 'git-status' }),
	Object.freeze({ arguments: Object.freeze(['branch', '--show-current']), source: 'git-branch' }),
	Object.freeze({ arguments: Object.freeze(['rev-parse', 'HEAD']), source: 'git-head' }),
	Object.freeze({ arguments: Object.freeze(['rev-parse', 'origin/main']), source: 'git-origin' }),
	Object.freeze({ arguments: Object.freeze(['merge-base', '--is-ancestor', 'origin/main', 'HEAD']), source: 'git-ancestry' })
])
