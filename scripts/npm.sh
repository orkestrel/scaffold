#!/bin/bash
# ============================================================================
# scripts/npm.sh — SessionStart hook: npm at the checkout's declared floor
# ----------------------------------------------------------------------------
# Runs only in Claude Code's remote environment. A generated workspace declares
# its npm floor as devEngines.packageManager ">=x.y.z" with onFail error, and an
# older npm refuses every install there with EBADDEVENGINES. This hook reads that
# floor from the manifest; the @orkestrel/scaffold checkout declares no
# devEngines, so there it reads the MINIMUM_NPM_VERSION src/core/constants.ts
# exports. When the session's npm is older than the floor or a prerelease, it
# installs the newest npm in the floor's major globally. It runs first in the
# SessionStart command, before scripts/deps.sh runs npm ci.
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

meets_floor() {
  [[ "$1" =~ ^[0-9]+\.[0-9]+\.[0-9]+(\+[0-9A-Za-z.-]+)?$ ]] &&
    [ "$(printf '%s\n%s\n' "$FLOOR" "${1%%+*}" | sort -V | head -n 1)" = "$FLOOR" ]
}

if ! FLOOR="$(node --input-type=module -e '
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
const manifest = JSON.parse(readFileSync("package.json", "utf8"))
const declared = manifest?.devEngines?.packageManager
const entries = Array.isArray(declared) ? declared : declared === undefined ? [] : [declared]
const entry = entries.find((candidate) => typeof candidate === "object" && candidate !== null && candidate.name === "npm")
let floor = ""
if (entry !== undefined) {
  const match = typeof entry.version === "string" ? /^>=(\d+\.\d+\.\d+)$/u.exec(entry.version) : null
  if (match === null) throw new Error("devEngines.packageManager.version is not a >=major.minor.patch floor")
  floor = match[1]
} else if (manifest?.name === "@orkestrel/scaffold") {
  const constants = await import(pathToFileURL(resolve("src/core/constants.ts")).href)
  const version = constants.MINIMUM_NPM_VERSION
  if (typeof version !== "string" || !/^\d+\.\d+\.\d+$/u.test(version)) throw new Error("MINIMUM_NPM_VERSION is not a major.minor.patch version")
  floor = version
}
process.stdout.write(floor)
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

if meets_floor "$CURRENT"; then
  echo "npm.sh: npm $CURRENT meets the floor $FLOOR — skipped."
  exit 0
fi

if npm install -g "npm@^$FLOOR" >"$NPM_LOG" 2>&1; then
  INSTALLED="$(npm --version 2>"$NPM_LOG")"
  if meets_floor "$INSTALLED"; then
    echo "npm.sh: installed npm $INSTALLED over $CURRENT to meet the floor $FLOOR."
  else
    echo "npm.sh: npm install ran, and npm reads ${INSTALLED:-nothing}, which does not meet the floor $FLOOR; installs that declare it refuse."
  fi
else
  INSTALLED="$(npm --version 2>"$NPM_LOG")"
  echo "npm.sh: npm install failed; npm reads ${INSTALLED:-nothing}, and the floor is $FLOOR."
fi

exit 0
