#!/usr/bin/env bash
# Probe: can a Vitest browser project launch Chromium inside the codex exec sandbox on this host?
# Read-only for the tree; the exec runs one existing project and reports the runner's output.
cd "C:/Users/mikes/WebstormProjects/veneer" || exit 9
timeout 300 codex exec --json -C "C:/Users/mikes/WebstormProjects/veneer" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="low"' --output-last-message "units/probe-browser-last.md" "Run exactly this command from the working directory and nothing else: npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser . Then run: npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core . Your final message must quote the last 40 lines of each command's output verbatim and state each exit code. Do not edit any file." < /dev/null > "units/probe-browser.jsonl" 2> "units/probe-browser.err"
echo "exit=$?" >> "units/probe-browser.err"
