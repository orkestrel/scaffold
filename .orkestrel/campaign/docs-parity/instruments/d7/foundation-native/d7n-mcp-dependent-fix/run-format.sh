#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/windows/pass-env.sh
cd /c/Users/mikes/WebstormProjects/mcp

npx --no-install oxfmt --config .oxfmtrc.json \
	README.md \
	guides/mcp.md \
	src/browser/types.ts \
	src/core/factories.ts \
	src/core/helpers.ts \
	src/core/types.ts \
	src/core/validators.ts \
	tests/guides.test.ts
