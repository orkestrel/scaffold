set -u
cd /home/user/fleet/probe
echo "### C1a git status --short"
git status --short
echo "### C1b git diff -U0 -- src | non-comment filter"
git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
echo "(end C1b)"
echo "### C2a npx oxfmt --config .oxfmtrc.json --check guides/probe.md README.md tests/guides.test.ts src"
npx oxfmt --config .oxfmtrc.json --check guides/probe.md README.md tests/guides.test.ts src 2>&1 | tail -2
echo "exit=${PIPESTATUS[0]}"
echo "### C2b npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src"
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src 2>&1 | tail -3
echo "exit=${PIPESTATUS[0]}"
echo "### C2c PATH=/opt/npm11/bin:\$PATH npm run check"
PATH=/opt/npm11/bin:$PATH npm run check 2>&1 | tail -2
echo "exit=${PIPESTATUS[0]}"
echo "### C3a npm run docs"
PATH=/opt/npm11/bin:$PATH npm run docs 2>&1 | tail -1
echo "exit=${PIPESTATUS[0]}"
echo "### C3b npm run docs -- --to guide"
PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide 2>&1 | tail -1
echo "### C3c npm run docs -- --to source"
PATH=/opt/npm11/bin:$PATH npm run docs -- --to source 2>&1 | tail -1
echo "### C4a grep -c 'GREETING' src/core/types.ts src/server/types.ts"
grep -c 'GREETING' src/core/types.ts src/server/types.ts
echo "### C4b grep -c 'on both eras' guides/probe.md"
grep -c "on both eras" guides/probe.md || true
echo "### C4c grep -c 'LintStageInterface' tests/guides.test.ts"
grep -c "LintStageInterface" tests/guides.test.ts
echo "### C4d grep -c 'README.md' tests/guides.test.ts"
grep -c "README.md" tests/guides.test.ts
echo "### C4e awk 'length > 100' guides/probe.md | grep -vc '^|'"
awk 'length > 100' guides/probe.md | grep -vc '^|' || true
echo "### C4e' characters>100, non-table"
python3 -c "
import pathlib
print([(i,len(l)) for i,l in enumerate(pathlib.Path('guides/probe.md').read_text().split('\n'),1) if len(l)>100 and not l.startswith('|')])"
echo "### C4f diff pilot header"
diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts) && echo "(no difference)"
echo "### C4g fence sweep"
awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/probe.md
echo "(end C4g)"
echo "### C4h grep -nE '^\| \`[^\`]+\` +\| (function|const) +\| +\| ' guides/probe.md"
grep -nE '^\| `[^`]+` +\| (function|const) +\| +\| ' guides/probe.md || true
echo "(end C4h)"
