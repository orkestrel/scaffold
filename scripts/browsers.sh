#!/bin/bash
# ============================================================================
# scripts/browsers.sh — SessionStart hook: Playwright browsers for the pinned playwright-core
# ----------------------------------------------------------------------------
# Runs only in Claude Code's remote environment. The container pre-installs one
# Chromium build under PLAYWRIGHT_BROWSERS_PATH; when the lockfile pins a
# playwright-core whose browsers.json names another build, every browser project
# fails at launch. This hook installs the pinned Chromium builds once per
# container and skips when the store already holds them.
# ============================================================================

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0

MANIFEST="node_modules/playwright-core/browsers.json"
CLI="node_modules/playwright/cli.js"
if [ ! -f "$MANIFEST" ] || [ ! -f "$CLI" ]; then
  echo "browsers.sh: playwright is not installed — skipped."
  exit 0
fi

STORE="${PLAYWRIGHT_BROWSERS_PATH:-$HOME/.cache/ms-playwright}"
BROWSERS_LOG="$(mktemp /tmp/orkestrel-browsers.XXXXXX)" || {
  echo "browsers.sh: could not create a private install log — skipped."
  exit 0
}
chmod 600 "$BROWSERS_LOG"

cleanup_browsers_log() {
  rm -f -- "$BROWSERS_LOG"
}

trap cleanup_browsers_log EXIT

MISSING="$(BROWSERS_STORE="$STORE" node -e '
const { existsSync } = require("node:fs")
const { join, resolve } = require("node:path")
const manifest = require(resolve("node_modules/playwright-core/browsers.json"))
const wanted = new Set(["chromium", "chromium-headless-shell"])
const missing = manifest.browsers
  .filter((browser) => wanted.has(browser.name))
  .filter((browser) => !existsSync(join(process.env.BROWSERS_STORE, `${browser.name.replace(/-/g, "_")}-${browser.revision}`, "INSTALLATION_COMPLETE")))
  .map((browser) => `${browser.name}-${browser.revision}`)
process.stdout.write(missing.join(" "))
' 2>"$BROWSERS_LOG")"

if [ -z "$MISSING" ]; then
  echo "browsers.sh: Playwright browsers match playwright-core — skipped."
  exit 0
fi

if env -u PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD node "$CLI" install chromium >"$BROWSERS_LOG" 2>&1; then
  echo "browsers.sh: installed Playwright $MISSING into $STORE."
else
  echo "browsers.sh: playwright install failed; browser projects remain unlaunchable in this session."
fi

exit 0
