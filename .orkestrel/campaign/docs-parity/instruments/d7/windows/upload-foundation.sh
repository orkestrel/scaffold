#!/usr/bin/env bash

set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

if [[ ! -t 0 || ! -t 1 ]]; then
  printf '%s\n' 'Run this script from a real interactive terminal.' >&2
  exit 1
fi

printf '%s  %s\n' \
  '88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a' \
  "$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz" \
  | sha256sum --check --status
printf '%s  %s\n' \
  '105b7c15c7eb8a1d9fa707d35feaf7923dd521536749be62fd22dd3c16f447f7' \
  "$SCR/packed/d7n-foundation-codec.eyQ8Pi/orkestrel-codec-0.0.3.tgz" \
  | sha256sum --check --status
printf '%s  %s\n' \
  '257d9c2db2279371147c7363819cb6fd12833113d3d12d48aa390ac2fa15ac41' \
  "$SCR/packed/d7n-foundation-msg.N3AAAA/orkestrel-msg-0.0.10.tgz" \
  | sha256sum --check --status
printf '%s  %s\n' \
  '358c3105939cd7ab87ad1e0e3ea864d8955f6efa2a15046d471f717f9d7ece8c' \
  "$SCR/packed/d7n-foundation-sse.zb8CDG/orkestrel-sse-0.0.7.tgz" \
  | sha256sum --check --status
printf '%s  %s\n' \
  'd6ae5e57126d370b3316b528a8bd6dafaf2b64d9bdf52e73fead78065f7c5002' \
  "$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz" \
  | sha256sum --check --status

printf '%s\n' 'Login approval is distinct from upload authorization. Follow the current URL in this terminal without pressing Enter.'
npm login --browser=false
npm whoami

npm publish "$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-foundation-codec.eyQ8Pi/orkestrel-codec-0.0.3.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-foundation-msg.N3AAAA/orkestrel-msg-0.0.10.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-foundation-sse.zb8CDG/orkestrel-sse-0.0.7.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz" --access public --ignore-scripts --browser=false

printf '%s\n' 'Tell the Orchestrator the result so it can confirm registry availability before dependents move to registry pins.'
