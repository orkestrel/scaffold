#!/usr/bin/env bash
set -u
cd /home/user/scaffold
python3 - <<'PY'
import pathlib
def sub(path, old, new):
    p = pathlib.Path(path); s = p.read_text(); n = s.count(old)
    assert n == 1, (path, old[:60], n)
    p.write_text(s.replace(old, new)); print('edited', path)
sub('tests/config.test.ts', 'the file entered the run the absence assertion below reads.', 'the file entered the run the following absence assertion reads.')
sub('tests/setupPolicy.ts', 'if (overrideRules === undefined || !isPolicyRecord(overrideRules)) {', 'if (!isPolicyRecord(overrideRules)) {')
sub('tests/setupPolicy.ts', "if (typeof manifest !== 'object' || manifest === null || Array.isArray(manifest)) return scripts", 'if (!isPolicyRecord(manifest)) return scripts')
sub('tests/setupPolicy.ts', "if (typeof record !== 'object' || record === null || Array.isArray(record)) return scripts", 'if (!isPolicyRecord(record)) return scripts')
sub('configs/policy.ts', ' * registered folder is workspace-relative. A drive-letter case difference between the two\n * arguments is not folded.\n */', ' * registered folder is workspace-relative. For a workspace at the filesystem root the prefix is\n * the separator alone. A drive-letter case difference between the two arguments is not folded.\n */')
PY
echo "== oxfmt"; npx oxfmt --config .oxfmtrc.json --check tests/config.test.ts tests/setupPolicy.ts configs/policy.ts; echo "exit=$?"
echo "== oxlint"; npx oxlint --config .oxlintrc.json --deny-warnings tests/config.test.ts tests/setupPolicy.ts configs/policy.ts; echo "exit=$?"
echo "== test:policy"; npm run test:policy 2>&1 | tail -4; echo "exit=${PIPESTATUS[0]}"
echo "== test:config"; npm run test:config 2>&1 | grep -E 'FAIL|Tests |Test Files' | head -5; echo "exit=${PIPESTATUS[0]}"
