#!/bin/bash
# Successor of rehearsal.sh on the same scratch copy: override the compiler folder unplugin-dts hands api-extractor, rebuild, then re-run the gates that failed for want of dist/ or of a git repository.
set -u
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts7
R=$S/rehearsal; cd "$R" || exit 2
echo "== option path in unplugin-dts 1.0.3"; grep -n "invokeOptions" node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs | cut -c1-140 | head -8; grep -rn "invokeOptions" node_modules/unplugin-dts/dist/*.d.* node_modules/unplugin-dts/dist/shared/*.d.* 2>/dev/null | cut -c1-160 | head -6; sed -n 612,636p node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs | cut -c1-140
echo "== patch the two vite configs: bundleTypes.invokeOptions.typescriptCompilerFolder = undefined"
python3 - <<'PY'
import re
for p in ['configs/src/vite.core.config.ts','configs/src/vite.server.config.ts']:
    t=open(p).read()
    if 'bundleTypes: true' in t:
        t=t.replace('bundleTypes: true','bundleTypes: { invokeOptions: { typescriptCompilerFolder: undefined } }')
    else:
        t=t.replace('bundleTypes: {\n\t\t\t\t\textractorConfig: {','bundleTypes: {\n\t\t\t\t\tinvokeOptions: { typescriptCompilerFolder: undefined },\n\t\t\t\t\textractorConfig: {')
    open(p,'w').write(t); print(p, 'invokeOptions' in t)
PY
grep -n "invokeOptions\|bundleTypes" configs/src/vite.core.config.ts configs/src/vite.server.config.ts
echo "== git init so listExecutablePaths (git ls-files) has a repository"; git init -q && git add -A >/dev/null 2>&1 && git -c user.name=r -c user.email=r@r commit -q -m rehearsal && echo "committed"
for step in "build" "test:src:core" "test:src:server" "test:src:bin" "test:config" "test:setup" "test:policy" "test:guides"; do
  T0=$(date +%s); npm run $step > "log2-$(echo $step | tr ':' '-').txt" 2>&1; E=$?; echo "== npm run $step → exit $E in $(( $(date +%s) - T0 ))s"; [ $E -ne 0 ] && grep -E "FAIL |Error:|error TS|Unable to follow|Tests " "log2-$(echo $step | tr ':' '-').txt" | cut -c1-170 | head -16
done
echo "== rollup comparison against the repository's 6.0.3 build of core"; ls -l dist/src/core/index.d.ts /home/user/scaffold/dist/src/core/index.d.ts 2>&1 | awk '{print $5, $9}'; cmp -s dist/src/core/index.d.ts /home/user/scaffold/dist/src/core/index.d.ts && echo "core rollup byte-identical to the 6.0.3 build" || { echo "core rollup differs:"; diff <(sed 's/[[:space:]]*$//' /home/user/scaffold/dist/src/core/index.d.ts) <(sed 's/[[:space:]]*$//' dist/src/core/index.d.ts) | head -30; }
echo "== host.json after build:inventory"; git -C /home/user/scaffold show HEAD:host.json | md5sum; md5sum host.json; git diff --stat -- host.json | tail -n 1
echo "== distribution proof, release mode, npm 11"; T0=$(date +%s); PATH=/opt/npm11/bin:$PATH npm run test:distribution -- --mode release > log2-test-distribution.txt 2>&1; echo "exit=$? in $(( $(date +%s) - T0 ))s"; grep -E "FAIL |Error|Tests " log2-test-distribution.txt | cut -c1-170 | head -12
