#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/windows/pass-env.sh
cd /c/Users/mikes/WebstormProjects/mcp

node --experimental-strip-types tests/guides.test.ts "$@"
