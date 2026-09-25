#!/bin/bash
# Probe: does the engine's Carousel.test.ts stay green when the slide transition reads a token
# the test's cascade never declares? Runs the unmodified file, then with the slide transition on
# var(--vn-motion-slide), then restores the partial byte-identically.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
cd /home/user/veneer-probe || exit 1
export PATH=$S/npm11/node_modules/.bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
F=src/styles/components/_carousel.scss
cp $F $S/carousel-probe/_carousel.scss.bak
before=$(sha256sum $F | cut -d' ' -f1)
echo "== control (unmodified)"; npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Carousel.test.ts 2>&1 | tail -15; echo "control exit=${PIPESTATUS[0]}"
sed -i 's#@include transition(transform 0.6s ease-in-out);#@include transition(transform var(--vn-motion-slide) var(--vn-ease-panel));#' $F
grep -n 'vn-motion-slide' $F
echo "== planted (token read, token undeclared in the test cascade)"; npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Carousel.test.ts 2>&1 | grep -E 'AssertionError|✓|×|FAIL|Tests ' | head -60; echo "planted exit=${PIPESTATUS[0]}"
cp $S/carousel-probe/_carousel.scss.bak $F
after=$(sha256sum $F | cut -d' ' -f1)
echo "restore before=$before after=$after"; [ "$before" = "$after" ] && echo restored-identical
cat /proc/loadavg
