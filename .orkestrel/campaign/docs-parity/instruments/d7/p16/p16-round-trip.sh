#!/usr/bin/env bash
# P16: in the scratch clone, rename every `Behavior` header to `Summary`, run the seed's --to guide,
# restore alignment with oxfmt 0.66.0, and check every non-Summary cell survived the re-render.
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7
cd "$SCR/guide-scratch" || exit 9
cp guides/guide.md "$SCR/p16/guide-before.md"
sed -i -E '60s/\| Behavior( +)\|/| Summary \1|/; 79s/\| Behavior( +)\|/| Summary \1|/; 154s/\| Behavior( +)\|/| Summary \1|/; 178s/\| Behavior( +)\|/| Summary \1|/; 192s/\| Behavior( +)\|/| Summary \1|/; 250s/\| Behavior( +)\|/| Summary \1|/; 263s/\| Behavior( +)\|/| Summary \1|/; 295s/\| Behavior( +)\|/| Summary \1|/' guides/guide.md
echo "== headers after rename"; grep -n '^| Name\|^| Method' guides/guide.md
echo "== npm run docs (report, after the rename)"; npm run docs 2>&1 | tail -6; echo "EXIT ${PIPESTATUS[0]}"
echo "== npm run docs -- --to guide"; npm run docs -- --to guide 2>&1 | tail -4; echo "EXIT ${PIPESTATUS[0]}"
cp guides/guide.md "$SCR/p16/guide-written-unformatted.md"
echo "== oxfmt --write guides/guide.md"; npx oxfmt --write guides/guide.md 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"
cp guides/guide.md "$SCR/p16/guide-after.md"
echo "== git diff --stat"; git diff --stat -- guides/guide.md
echo "== cell fidelity (before vs after)"; node "$SCR/p16/p16-cells.mjs" "$SCR/p16/guide-before.md" "$SCR/p16/guide-after.md"
echo "== npm run docs (report, after the write)"; npm run docs 2>&1 | tail -12; echo "EXIT ${PIPESTATUS[0]}"
echo "== oxfmt --check guides/guide.md"; npx oxfmt --check guides/guide.md 2>&1 | tail -2; echo "EXIT ${PIPESTATUS[0]}"
