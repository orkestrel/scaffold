#!/bin/bash
# Gates the merge of Veneer main (a9cbeec) into the session branch before the main push: the static gates, the
# engine and styles projects the merge touches, and the record gates. Log beside it.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/merge-main2-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) $(date -u +%T)" >> $LOG
for g in format:check lint:check check build test:src:core test:src:browser test:app test:setup test:setup:browser test:conformance test:guides test:distribution; do
  timeout 1200 npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%T))" >> $LOG
done
[ -z "$(git status --porcelain)" ] || echo "=== tree dirty: $(git status --porcelain | tr '\n' ' ')" >> $LOG
echo "=== done" >> $LOG
