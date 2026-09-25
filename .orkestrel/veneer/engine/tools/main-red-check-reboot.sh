#!/usr/bin/env bash
# Runs the four button-reboot styles files alone on Veneer main (the main checkout at 0a0a252), through the styles
# config after the styles build, to learn whether their red in the ENGINES-B landing is a host reading of main itself.
cd /c/Users/mikes/WebstormProjects/veneer || exit 1
OUT=/c/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/main-reboot.log.txt
{
	git log --oneline -1
	npm run build:src:styles > /dev/null 2>&1; echo "build:src:styles exit=$?"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/carousel.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/nav.test.ts
	echo "exit=$?"
} > "$OUT" 2>&1
sed 's/\x1b\[[0-9;]*m//g' "$OUT" | grep -E "exit=|Tests  |FAIL |AssertionError|^\s+[-+] |^[0-9a-f]{7} " | head -40
