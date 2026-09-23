#!/bin/bash
# ca landing, second run on the merge result (2071f8f, the fold 71f9f5c, and the merge of origin/main cc8e1c1, the J-TYPES landing, over 4977d09): format check, the fast gates, then the projects the unit touches. Log: ca-fast-gates-2.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/ca-fast-gates-2.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) base 4977d09 ($(date -u +%H:%M:%S))" >> $LOG
npx oxfmt --write $(git diff --name-only --diff-filter=AM 4977d09 HEAD) >> $LOG 2>&1; echo "=== oxfmt exit=$? changed: $(git status --short | wc -l)" >> $LOG; git status --short >> $LOG
for g in format:check lint:check check test:policy test:guides test:setup; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts >> $LOG 2>&1; echo "=== scoped styles (carousel, close) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run build:src:styles >> $LOG 2>&1; npm run test:service >> $LOG 2>&1; echo "=== test:service exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:conformance >> $LOG 2>&1; echo "=== test:conformance exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/sections/AlertSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts >> $LOG 2>&1; echo "=== section proofs (Carousel, Alert, Showcase, entry) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
npm run test:src:browser >> $LOG 2>&1; echo "=== test:src:browser (the merged J-TYPES contracts) exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== ca fast gates done ($(date -u +%H:%M:%S))" >> $LOG
