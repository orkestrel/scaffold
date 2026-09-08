#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
git -C "$FLEET/mcp" -c user.name=Claude -c user.email=noreply@anthropic.com merge --no-commit origin/main
