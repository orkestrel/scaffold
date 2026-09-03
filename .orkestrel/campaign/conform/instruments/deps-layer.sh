#!/usr/bin/env bash
# Run the dependency pass serially over the named packages. Usage: deps-layer.sh <pkg>...
for p in "$@"; do /home/user/scaffold/tmp/work/deps-pass.sh "$p"; done
echo "DEPS-LAYER DONE $* $(date -u +%FT%TZ)" >> /home/user/work/logs/deps-pass.log
