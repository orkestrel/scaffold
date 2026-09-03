#!/bin/bash
# Re-stage the closures the bench lanes replaced (table 15:30, template 15:35, form 15:40 UTC).
for p in table template form; do echo "== $p $(date -u +%T)"; bash /home/user/work/stage-closure.sh "$p" || echo "RESTAGE FAILED $p"; done; echo "done $(date -u +%T)"
