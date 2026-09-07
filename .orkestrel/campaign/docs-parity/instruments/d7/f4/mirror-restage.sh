#!/usr/bin/env bash
# F4 (early half): refresh scaffold's mirror of the guide's guide from the guide's pushed branch at c86f7fd,
# rebuild dist/host and host.json, and read the gates that touch the mirror. Orchestrator-owned.
set -u
S=/home/user/scaffold
G=/home/user/fleet/guide
cd "$S" || exit 9
echo "== source tip"; git -C "$G" rev-parse --short HEAD; git -C "$G" status --short | wc -l
echo "== before"; sha256sum guides/guide.md | cut -c1-16; grep -c '' guides/guide.md
git -C "$G" show c86f7fd:guides/guide.md > guides/guide.md
echo "== after copy"; sha256sum guides/guide.md | cut -c1-16; grep -c '' guides/guide.md; diff <(git -C "$G" show c86f7fd:guides/guide.md) guides/guide.md && echo "byte-equal to the guide's tip"
echo "== npm run build"; npm run build 2>&1 | grep -i 'build-host\|build-inventory\|error' | tail -3; echo "EXIT ${PIPESTATUS[0]}"
echo "== git status"; git status --short; echo "(status end)"
echo "== format:check"; npm run format:check 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"
echo "== test:guides"; npm run test:guides 2>&1 | grep 'Tests \|FAIL' | head -3; echo "EXIT ${PIPESTATUS[0]}"
echo "== test:policy"; npm run test:policy 2>&1 | grep 'Tests \|FAIL' | head -3; echo "EXIT ${PIPESTATUS[0]}"
echo "== test:src:server (stageHost)"; npm run test:src:server 2>&1 | grep 'Tests \|FAIL' | head -3; echo "EXIT ${PIPESTATUS[0]}"
