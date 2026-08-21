#!/usr/bin/env bash
set -u
cd /home/user
mkdir -p /home/user/scaffold/tmp/fleet/briefs

emit_lane () {
  local lane="$1"; shift
  local kind="$1"; shift
  local files="$*"
  local brief="/home/user/scaffold/tmp/fleet/briefs/${lane}-brief.md"
  {
    echo "# Absorb lane ${lane} — helper inventory from ${kind}"
    echo ""
    echo "You are a READ-ONLY evidence lane. Make no repository changes. Do not design, decide, or recommend an API."
    echo ""
    echo "## Files to read (read every one, in full)"
    echo ""
    for f in $files; do echo "- /home/user/$f"; done
    echo ""
    cat /home/user/scaffold/tmp/fleet/destination-surface.md
    echo ""
    cat /home/user/scaffold/tmp/fleet/lane-task.md
  } > "$brief"
  echo "$brief"
}

# --- setup.ts split into 4 balanced lanes by descending size ---
mapfile -t SETUPS < <(wc -l */tests/setup.ts 2>/dev/null | grep -v ' total$' | sort -rn | awk '{print $2}')
declare -a L1 L2 L3 L4
i=0
for f in "${SETUPS[@]}"; do
  case $((i % 4)) in
    0) L1+=("$f");; 1) L2+=("$f");; 2) L3+=("$f");; 3) L4+=("$f");;
  esac
  i=$((i+1))
done
emit_lane A1 "tests/setup.ts (host-independent helpers)" "${L1[@]}"
emit_lane A2 "tests/setup.ts (host-independent helpers)" "${L2[@]}"
emit_lane A3 "tests/setup.ts (host-independent helpers)" "${L3[@]}"
emit_lane A4 "tests/setup.ts (host-independent helpers)" "${L4[@]}"

# --- setupServer.ts split into 2 lanes ---
mapfile -t SRV < <(wc -l */tests/setupServer.ts 2>/dev/null | grep -v ' total$' | sort -rn | awk '{print $2}')
declare -a B1 B2
i=0
for f in "${SRV[@]}"; do
  if [ $((i % 2)) -eq 0 ]; then B1+=("$f"); else B2+=("$f"); fi
  i=$((i+1))
done
emit_lane B1 "tests/setupServer.ts (Node-only helpers)" "${B1[@]}"
emit_lane B2 "tests/setupServer.ts (Node-only helpers)" "${B2[@]}"

# --- setupBrowser.ts split into 2 lanes ---
mapfile -t BRW < <(wc -l */tests/setupBrowser.ts 2>/dev/null | grep -v ' total$' | sort -rn | awk '{print $2}')
declare -a C1 C2
i=0
for f in "${BRW[@]}"; do
  if [ $((i % 2)) -eq 0 ]; then C1+=("$f"); else C2+=("$f"); fi
  i=$((i+1))
done
emit_lane C1 "tests/setupBrowser.ts (DOM/Vue helpers)" "${C1[@]}"
emit_lane C2 "tests/setupBrowser.ts (DOM/Vue helpers)" "${C2[@]}"

# --- styles + specialty setup files, one lane ---
SPEC=$(ls */tests/setupStyles.ts */tests/setupService.ts */tests/setupGlobal.ts */tests/setupConformance.ts */tests/setupClient.ts */tests/setupScripts.ts */tests/setupGuides.ts */tests/setupOllama.ts */tests/setupApplicationServer.ts */tests/setupBrowserServer.ts 2>/dev/null | tr '\n' ' ')
emit_lane D1 "tests/setupStyles.ts and the specialty setup modules" $SPEC
