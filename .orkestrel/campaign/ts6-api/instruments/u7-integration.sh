#!/usr/bin/env bash
set -u
cd /home/user/fleet/probe
python3 - <<'PY'
import pathlib
p = pathlib.Path('src/server/stages/RuntimeStage.ts'); s = p.read_text()
def sub(old, new):
    global s
    assert s.count(old) == 1, old[:70]
    s = s.replace(old, new)
sub("\tRUNTIME_PLUGIN,\n\tcreateDestroyedError,", "\tRUNTIME_PLUGIN,\n\tTYPE_MIRROR,\n\tcreateDestroyedError,")
sub("\tloadWorkspaceModule,\n\tmatchesWorkspaceModule,\n\tnormalizePath,\n\treadFaultCode,\n", "\tloadWorkspaceModule,\n\tmatchesLiveProcess,\n\tmatchesWorkspaceModule,\n\tnormalizePath,\n")
sub("\t\t\tif (this.#alive(Number.parseInt(owner, 10))) continue\n", "\t\t\tif (matchesLiveProcess(Number.parseInt(owner, 10))) continue\n")
sub("""	// Whether the host that wrote one specification is still running. Signal 0 delivers nothing and
	// reports reachability alone. A host this process may not signal reports `EPERM` and is read as
	// alive, and a non-positive identity names a process group rather than a process, so both leave
	// the file where it is: the safe direction is to keep a file this stage cannot account for.
	#alive(id: number): boolean {
		if (!Number.isSafeInteger(id) || id <= 0) return true
		try {
			process.kill(id, 0)
			return true
		} catch (error) {
			return readFaultCode(error) === 'EPERM'
		}
	}

""", "")
sub("\t*#walk(): Generator<string> {\n\t\tconst directories = [resolve(this.#workspace)]\n", "\t*#walk(): Generator<string> {\n\t\tconst excluded = normalizePath(resolveWorkspaceFile(this.#workspace, TYPE_MIRROR))\n\t\tconst directories = [resolve(this.#workspace)]\n")
sub("\t\t\t\tif (entry.isDirectory()) {\n\t\t\t\t\tdirectories.push(path)\n\t\t\t\t\tcontinue\n\t\t\t\t}\n\t\t\t\tif (entry.isFile()) yield path\n", "\t\t\t\tif (entry.isDirectory()) {\n\t\t\t\t\tif (normalizePath(path) !== excluded) directories.push(path)\n\t\t\t\t\tcontinue\n\t\t\t\t}\n\t\t\t\tif (entry.isFile()) yield path\n")
p.write_text(s); print('patched RuntimeStage.ts')
PY
grep -c 'readFaultCode' src/server/stages/RuntimeStage.ts
echo "== oxfmt"; npx oxfmt --config .oxfmtrc.json --check src/server/stages/RuntimeStage.ts; echo "exit=$?"
echo "== oxlint"; npx oxlint --config .oxlintrc.json --deny-warnings src/server/stages/RuntimeStage.ts; echo "exit=$?"
echo "== check"; npm run check 2>&1 | tail -2; echo "exit=${PIPESTATUS[0]}"
echo "== RuntimeStage suite alone"; npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/RuntimeStage.test.ts 2>&1 | grep -E 'Test Files|Tests |Duration|FAIL' ; echo "exit=${PIPESTATUS[0]}"
