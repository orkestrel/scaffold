#!/usr/bin/env bash
# Drive the unpublished scaffold across every remaining target, highest-signal first, and
# run the generated proof in each. Slices report as they finish so a failure surfaces
# where it happened rather than behind every target that follows.
SP=/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad
for T in "$@"; do
  echo "=================== $(basename "$T") ==================="
  bash "$SP/propagate/visit.sh" "$T" "$SP/propagate/runner" --with-distribution
done
echo "FLEET COMPLETE"
