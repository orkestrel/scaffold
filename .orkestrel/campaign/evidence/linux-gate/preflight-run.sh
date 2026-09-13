#!/bin/bash
# Pre-flight the post-publish obligation on each target BEFORE scaffold 0.0.65 is
# spent: stage the unpublished tarball with --no-save (wave.md), repair offline,
# audit offline, then run the target's own gates with every project invoked singly.
# Works only in scratch copies; the real checkouts are never touched.
set -u
SP=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad
TGZ=$(ls $SP/preflight/packed/*.tgz | head -1)
for t in toolbox ollama; do
  D="$SP/preflight/$t"; rm -rf "$D"
  echo ""; echo "################ $t ################"
  mkdir -p "$D" && ( cd "/home/user/$t" && tar --exclude=./.git -cf - . ) | ( cd "$D" && tar -xf - ) || { echo "COPY FAILED"; continue; }
  cd "$D" || continue
  echo "--- stage local scaffold 0.0.65 (no-save) ---"
  npm install --no-save --ignore-scripts --no-audit --no-fund "$TGZ" >"$SP/logs/preflight-$t-stage.log.txt" 2>&1; echo "stage exit=$?"
  node -p "require('./node_modules/@orkestrel/scaffold/package.json').version"
  echo "--- probe the repair verb's flags (first use) ---"
  node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --help 2>&1 | head -12
  echo "--- repair --offline ---"
  node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --offline >"$SP/logs/preflight-$t-repair.log.txt" 2>&1; echo "repair exit=$?"; tail -6 "$SP/logs/preflight-$t-repair.log.txt"
  echo "--- what repair changed ---"
  git -C "/home/user/$t" --work-tree="$D" status --porcelain 2>/dev/null | grep -v node_modules | head -20
  echo "--- audit --offline ---"
  node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline >"$SP/logs/preflight-$t-audit.log.txt" 2>&1; echo "audit exit=$?"; tail -4 "$SP/logs/preflight-$t-audit.log.txt"
  echo "--- gates, each singly ---"
  S="$SP/logs/preflight-$t.status.txt"; : > "$S"
  # Logs go OUTSIDE the copy being measured, with no ':' in their names: the target's
  # portability sweep reads its whole workspace and refuses Windows-hostile segments.
  LOGDIR="$SP/logs/preflight-$t"; mkdir -p "$LOGDIR"
  g() { local l="$1"; shift; timeout 1200 "$@" >"$LOGDIR/gate-${l//:/-}.log.txt" 2>&1; printf '%s\texit=%s\n' "$l" "$?" >> "$S"; }
  g format:check npm run format:check
  g lint:check   npm run lint:check
  g check        npm run check
  g build        npm run build
  for p in $(node -p "Object.keys(require('./package.json').scripts).filter(k=>/^test:(src|setup|policy|config|guides|conformance)/.test(k)&&!/:(server|core)$/.test(k)).join(' ')"); do g "$p" npm run "$p"; done
  g distribution npm run test:distribution -- --mode release
  cat "$S"
done
echo "PREFLIGHT-DONE"
