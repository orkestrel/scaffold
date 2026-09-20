#!/usr/bin/env bash
# U2 (Orchestrator): install Elements at 3b41900 and build its showcase from current source.
# Log: scratchpad/u2-elements-build.log. Nothing is committed in Elements.
set -e
cd "C:/Users/mikes/WebstormProjects/elements"
git rev-parse --short HEAD
git status --short --branch
npm ci --no-audit --no-fund 2>&1 | tail -5
npm run build:showcase 2>&1 | tail -15
ls -la dist/showcase/index.html
sha256sum dist/showcase/index.html
git status --short --branch
echo "elements-build-done"
