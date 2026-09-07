import re, sys

SHAPES = {
	'ProcessCommand': '{ file, arguments, environment?, input?, isolated? }',
	'ProcessExit': '{ code, signal, drained }',
	'SpawnInput': '{ file, arguments, verbatim }',
	'ExecutableOptions': '{ workspace?, environment? }',
	'ProcessEventMap': '{ stderr, error, exit }',
	'ProcessOptions': '{ on?, error?, command, workspace, grace?, drain?, evidence?, backlog?, delivery?, writable?, signal? }',
	'ProcessInterface': '{ pid, code, signal, emitter, lines, evidence, truncated, settled, stopping, exit } plus send, stop, destroy',
	'SessionEventMap': '{ stdout, stderr, error, exit }',
	'SessionOptions': '{ on?, error?, command, workspace, grace?, drain?, evidence?, delivery?, signal? }',
	'SessionInterface': '{ pid, code, signal, emitter, evidence, settled, stopping, ending, exit } plus write, end, stop, destroy',
	'ExecuteResult': '{ command, stdout, stderr, code, signal, failed, expired, aborted, truncated }',
	'ExecuteInput': '{ command, stdout, stderr, code, signal, expired, aborted, truncated, limit, cause? }',
	'ExecuteOptions': '{ workspace?, environment?, input?, timeout?, grace?, signal?, strict?, limit? }',
	'ExecuteSyncOptions': '{ workspace?, environment?, input?, timeout?, strict?, limit? }',
	'DetachOptions': '{ workspace? }',
	'ProcessManagerEventMap': '{ launch, exit }',
	'ProcessManagerOptions': '{ on?, error? }',
	'ProcessManagerInterface': '{ emitter, count } plus process, processes, launch, stop, destroy',
	'ProcessErrorCode': '(typeof PROCESS_ERROR_CODES)[number]',
	'ProcessErrorContext': '{ id?, command?, code?, signal?, value? }',
	'ProcessErrorOptions': '{ code, context?, cause?, result? }',
	'ProcessChildInterface': '{ pid?, exitCode, signalCode } plus kill, once, off',
	'SupervisorFace': '{ chunk, fault, relieve?, close, terminal, teardown }',
}

SPLIT = re.compile(r'(?<!\\)\|')

def split_row(line):
	parts = SPLIT.split(line.rstrip('\n'))
	return [p.strip() for p in parts[1:-1]]

path = 'guides/process.md'
lines = open(path, encoding='utf8').read().split('\n')
out = []
touched = 0
i = 0
while i < len(lines):
	line = lines[i]
	if line.startswith('| API') and i + 1 < len(lines) and lines[i + 1].startswith('| ---'):
		# collect the table
		j = i
		rows = []
		while j < len(lines) and lines[j].startswith('|'):
			rows.append(lines[j])
			j += 1
		names = [split_row(r)[0].strip('`') for r in rows[2:]]
		if names and all(n in SHAPES for n in names):
			header = split_row(rows[0])
			out.append('| ' + ' | '.join([header[0], header[1], 'Shape', header[2]]) + ' |')
			out.append('| --- | --- | --- | --- |')
			for r in rows[2:]:
				cells = split_row(r)
				name = cells[0].strip('`')
				out.append('| ' + ' | '.join([cells[0], cells[1], '`' + SHAPES[name] + '`', cells[2]]) + ' |')
			touched += 1
			i = j
			continue
	out.append(line)
	i += 1

open(path, 'w', encoding='utf8').write('\n'.join(out))
print('tables rewritten:', touched)
