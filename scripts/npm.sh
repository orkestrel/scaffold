#!/bin/bash
# ============================================================================
# scripts/npm.sh — SessionStart hook: the npm the checkout's floor requires
# ----------------------------------------------------------------------------
# Runs only in Claude Code's remote environment. The container's npm can sit
# below the floor a generated workspace declares in devEngines, and npm then
# refuses every install there with EBADDEVENGINES. This hook reads the floor the
# checkout declares: its manifest's devEngines npm range, or, in the scaffold
# checkout, which declares none, the MINIMUM_NPM_VERSION src/core/constants.ts
# exports. When the session's npm is older, it installs npm at that floor's major
# globally. It runs first in the SessionStart command, before scripts/deps.sh
# runs npm ci.
# ============================================================================

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0

if [ ! -f package.json ]; then
  exit 0
fi

NPM_LOG="$(mktemp -t orkestrel-npm.XXXXXX)" || {
  echo "npm.sh: could not create a private install log — skipped."
  exit 0
}
chmod 600 "$NPM_LOG"

cleanup_npm_log() {
  rm -f -- "$NPM_LOG"
}

trap cleanup_npm_log EXIT

if ! FLOOR="$(node --input-type=module -e '
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
const manifest = JSON.parse(readFileSync("package.json", "utf8"))
const declared = manifest?.devEngines?.packageManager
const entries = Array.isArray(declared) ? declared : declared === undefined ? [] : [declared]
const entry = entries.find((candidate) => candidate !== null && typeof candidate === "object" && candidate.name === "npm")
let range = typeof entry?.version === "string" ? entry.version : undefined
if (range === undefined && existsSync("src/core/constants.ts")) {
  const constants = await import(pathToFileURL(resolve("src/core/constants.ts")).href)
  if (typeof constants.MINIMUM_NPM_VERSION === "string") range = constants.MINIMUM_NPM_VERSION
}
const floor = range === undefined ? null : range.match(/\d+\.\d+\.\d+/u)
process.stdout.write(floor === null ? "" : floor[0])
' 2>"$NPM_LOG")"; then
  echo "npm.sh: could not read the npm floor — skipped."
  exit 0
fi

if [ -z "$FLOOR" ]; then
  echo "npm.sh: the checkout declares no npm floor — skipped."
  exit 0
fi

CURRENT="$(npm --version 2>"$NPM_LOG")"
if [ -z "$CURRENT" ]; then
  echo "npm.sh: npm is not installed — skipped."
  exit 0
fi

if [ "$(printf '%s\n%s\n' "$FLOOR" "$CURRENT" | sort -V | head -n 1)" = "$FLOOR" ]; then
  echo "npm.sh: npm $CURRENT meets the floor $FLOOR — skipped."
  exit 0
fi

if npm install -g "npm@^$FLOOR" >"$NPM_LOG" 2>&1; then
  INSTALLED="$(npm --version 2>"$NPM_LOG")"
  if [ "$(printf '%s\n%s\n' "$FLOOR" "$INSTALLED" | sort -V | head -n 1)" = "$FLOOR" ]; then
    echo "npm.sh: installed npm $INSTALLED over $CURRENT to meet the floor $FLOOR."
  else
    echo "npm.sh: npm install ran, and npm still reads ${INSTALLED:-nothing}; installs below the floor $FLOOR refuse."
  fi
else
  echo "npm.sh: npm install failed; npm $CURRENT stays below the floor $FLOOR, and installs that declare it refuse."
fi

exit 0
