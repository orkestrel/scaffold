#!/usr/bin/env bash
# Successor to cl10-shift-probe.sh, which used a --project filter on the root config. The styles
# project has its own config at configs/src/vite.styles.config.ts and no such project name, so that
# run reported "No projects matched" for both readings and proved nothing. This file invokes the
# styles config directly. Same subject: CL10 audit claim 16's operative half — would the icon-shift
# proof fail if the shift distance changed?
V="C:/Users/mikes/WebstormProjects/veneer"
P="$V/src/styles/components/_icon-link.scss"
C="configs/src/vite.styles.config.ts"
T="tests/src/styles/components/icon-link.test.ts"
cd "$V" || exit 9
echo "== baseline source digest"
sha256sum "$P"
echo "== mutate the fallback 0.25em -> 0.5em"
sed -i 's/translate3d(0.25em, 0, 0)/translate3d(0.5em, 0, 0)/' "$P"
grep -n "translate3d" "$P"
npm run build:src:styles > /dev/null 2>&1
echo "build exit=$?"
npx vitest run --config "$C" --no-cache --reporter=dot "$T" 2>&1 | tail -22
echo "== restore the exact byte"
sed -i 's/translate3d(0.5em, 0, 0)/translate3d(0.25em, 0, 0)/' "$P"
grep -n "translate3d" "$P"
sha256sum "$P"
npm run build:src:styles > /dev/null 2>&1
echo "build exit=$?"
npx vitest run --config "$C" --no-cache --reporter=dot "$T" 2>&1 | tail -8
echo "== cascade digest after restore"
sha256sum dist/src/styles/index.css
