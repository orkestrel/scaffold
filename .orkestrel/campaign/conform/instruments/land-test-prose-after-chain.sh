#!/usr/bin/env bash
# Land the test-prose follow-on after the brief/probe landing chain reports done, so the suites never overlap.
OUT=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/tasks/bjnys5mi3.output
until grep -q '== done' "$OUT" 2>/dev/null; do sleep 10; done
echo "== test-prose $(date -u +%H:%M:%S)"
cd /home/user/scaffold || exit 2
bash tmp/work/land-followon.sh test followon-test-prose > tmp/work/land-followon-test-prose.log 2>&1
tail -n 8 tmp/work/land-followon-test-prose.log
echo "== done $(date -u +%H:%M:%S)"
