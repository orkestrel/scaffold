#!/bin/bash
# ca landing (the ACCORDION commit on the session branch over 55ca0cd): format check, the fast gates, then the projects the unit touches. Log: ac-fast-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/ac-fast-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) base 55ca0cd ($(date -u +%H:%M:%S))" >> $LOG
npx oxfmt --write $(git diff --name-only --diff-filter=AM 55ca0cd HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG; git status --short >> $LOG
for g in format:check lint:check check test:policy test:guides test:setup; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/accordion.test.ts tests/src/styles/components/collapse.test.ts >> $LOG 2>&1; echo "=== scoped styles (accordion, collapse) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run build:src:styles >> $LOG 2>&1; npm run test:service >> $LOG 2>&1; echo "=== test:service exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:conformance >> $LOG 2>&1; echo "=== test:conformance exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts >> $LOG 2>&1; echo "=== section proofs (Accordion, Carousel, Showcase, entry) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== ac fast gates done ($(date -u +%H:%M:%S))" >> $LOG
