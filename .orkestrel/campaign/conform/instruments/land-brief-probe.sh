#!/usr/bin/env bash
# Land brief, then probe (standing red test accepted), serially so neither suite runs under the other's load.
cd /home/user/scaffold || exit 2
echo "== brief $(date -u +%H:%M:%S)"
node tmp/work/land-conform.mjs brief:/home/user/scaffold/tmp/work/msgs/land-brief.txt > tmp/work/land-brief.log 2>&1
tail -n 8 tmp/work/land-brief.log
echo "== probe $(date -u +%H:%M:%S)"
ALLOW_RED_TEST=probe node tmp/work/land-conform.mjs probe:/home/user/scaffold/tmp/work/msgs/land-probe.txt > tmp/work/land-probe.log 2>&1
tail -n 8 tmp/work/land-probe.log
echo "== done $(date -u +%H:%M:%S)"
