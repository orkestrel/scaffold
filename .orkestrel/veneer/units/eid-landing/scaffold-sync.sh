#!/bin/bash
# Syncs the scaffold checkout with origin/main and pushes main and the session branch. A merge, when one is needed,
# carries the session trailers; --no-edit never runs here, because its default message has none.
cd /home/user/scaffold || exit 1
git fetch -q origin main || exit 2
if ! git merge-base --is-ancestor origin/main HEAD; then
  git merge -q --no-ff origin/main -m "Merge origin/main into the styles session branch" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK" || exit 3
fi
git push -q origin HEAD:main || exit 4
git push -q origin HEAD:claude/inspiring-allen-t4qzv1 || exit 5
git log --oneline -1
