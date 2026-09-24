#!/bin/bash
# Successor to veneer-repin-0.0.24.sh after its journey step failed on light-1280: the portfolio case read the stale
# fading-carousel focus and hover frames a 15:50 capture left under 0.0.23, against regions 0.0.24 records. This run
# refreshes the portfolio under 0.0.24 (CAPTURE=1, every variant), then runs every journey with CAPTURE unset (the
# landing criterion), then commits RP, which stays staged from the first run. Log: veneer-repin-journey-2.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/veneer-repin-journey-2.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer || exit 1
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
echo "=== HEAD $(git rev-parse --short HEAD) staged: $(git diff --cached --name-only | tr '\n' ' ') unstaged: [$(git diff --name-only | tr '\n' ' ')]" >> $LOG
step "capture run, every variant" env CAPTURE=1 npm run test:journey
echo "=== light-1280 carousel frames now: $(ls -la --time-style=+%H:%M tmp/capture/states/fading-carousel-{focus,hover}--light-1280.png | awk '{print $6}' | tr '\n' ' ')" >> $LOG
step "journey, every variant, CAPTURE unset" npm run test:journey
git commit -q -m "State the pointer park at each padding site, and prove no parked pointer enters an origin-touching copy" -m "The release in 0.0.24 parks the pointer outside the page. The padding comments and the guide now state the padding's gutter role and the park in separate sentences, and a journey case lifts an unpadded copy whose box touches the document's origin, stages the pane after the release, and asserts no mouseover event reaches it. The case fails on 0.0.23 (rp-control-4)." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK"
echo "=== RP commit $(git rev-parse --short HEAD) status: [$(git status --porcelain | tr '\n' ' ')] ($(date -u +%H:%M:%S))" >> $LOG
echo "=== journey-2 done" >> $LOG
