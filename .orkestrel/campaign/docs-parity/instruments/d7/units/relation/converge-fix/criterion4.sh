#!/usr/bin/env bash
# Criterion 4's checks, each printed with its own label. Not fail-fast: every check runs.
set -u
cd /home/user/fleet/relation
echo "== tagline diff (guide 3-6 vs README 3-6); empty is pass"
diff <(sed -n 3,6p guides/relation.md) <(sed -n 3,6p README.md)
echo "== tagline carries 'then \`load\` / \`find\`'; empty is pass"
grep -n 'then `load` / `find`' guides/relation.md README.md
echo "== grep -c 'OperationOptions plus' guides/relation.md (want 1)"
grep -c 'OperationOptions plus' guides/relation.md
echo "== grep -c \"An extended interface's name comes before\" guides/relation.md (want 1)"
grep -c "An extended interface's name comes before" guides/relation.md
echo "== grep -n 'FK location\\|// FK' guides/relation.md README.md; empty is pass"
grep -n 'FK location\|// FK' guides/relation.md README.md
echo "== grep -nE '\\b(THIS|RELATED|NAME|COUNT|AFTER)\\b' src/core/{types,helpers,Model}.ts; empty is pass"
grep -nE '\b(THIS|RELATED|NAME|COUNT|AFTER)\b' src/core/types.ts src/core/helpers.ts src/core/Model.ts
echo "== drop-in header diff (pilot 1-3 vs this 1-3); empty is pass"
diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
echo "== grep -c '(or array)' guides/relation.md (want 0)"
grep -c '(or array)' guides/relation.md
echo "== fences directly under a heading; empty is pass"
awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/relation.md README.md
echo "== done"
