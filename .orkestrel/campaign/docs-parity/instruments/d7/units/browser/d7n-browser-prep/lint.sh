#!/usr/bin/env bash
# d7n-browser-prep item 3: read the vendored voice rule's diagnostics after `repair`.
set -uo pipefail
export PATH=/opt/npm11/bin:$PATH
cd /home/user/fleet/browser
npx oxlint --config .oxlintrc.json --deny-warnings .
echo "EXIT $?"
