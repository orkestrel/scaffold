#!/usr/bin/env bash
# Baseline every propagation target's own gates BEFORE the unpublished scaffold touches
# it. A red here is the target's, not the propagation's. Reports per target as it goes.
set -uo pipefail
for T in "$@"; do
  N="$(basename "$T")"
  cd "$T" || { echo "$N | ENTER FAIL"; continue; }
  R=""
  for G in format:check lint:check check build test; do
    if npm run "$G" >/dev/null 2>&1; then R="$R $G=0"; else R="$R $G=RED"; fi
  done
  echo "$N |$R"
done
echo "BASELINE COMPLETE"
