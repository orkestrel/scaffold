#!/usr/bin/env bash
# Mutations for the utilities-order case, run in the probe tree only.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-us/tmp/probe/tree
cp src/styles/index.scss ../index.scss.bak
run() { npx vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance -t "$1" > ../order-$2.log.txt 2>&1; echo "$2 exit=$?"; grep -E '^ FAIL|Tests ' ../order-$2.log.txt; }
run 'loads the helpers and the utilities' baseline
# A: a normal helper out of the release's helper order.
python3 - <<'PY'
p='src/styles/index.scss'; s=open(p).read()
s=s.replace("@use 'components/icon-link';\n@use 'components/ratio';\n@use 'components/vr';\n","@use 'components/vr';\n@use 'components/icon-link';\n@use 'components/ratio';\n")
open(p,'w').write(s)
PY
run 'loads the helpers and the utilities' helper-order
cp ../index.scss.bak src/styles/index.scss
# B: an important helper after a utility partial, and its control ahead of it.
printf '@layer utilities {\n}\n' > src/styles/utilities/_visually-hidden.scss
printf "@use 'utilities/visually-hidden';\n" >> src/styles/index.scss
run 'loads the helpers and the utilities' important-after
cp ../index.scss.bak src/styles/index.scss
sed -i "s#^@use 'utilities/gap';#@use 'utilities/visually-hidden';\n@use 'utilities/gap';#" src/styles/index.scss
run 'loads the helpers and the utilities' important-ahead
cp ../index.scss.bak src/styles/index.scss
rm src/styles/utilities/_visually-hidden.scss
# C: a utility partial the records map to no release name.
printf '@layer utilities {\n}\n' > src/styles/utilities/_spare.scss
printf "@use 'utilities/spare';\n" >> src/styles/index.scss
run 'loads the helpers and the utilities' unmapped
cp ../index.scss.bak src/styles/index.scss
rm src/styles/utilities/_spare.scss
cmp src/styles/index.scss /home/user/veneer-us/src/styles/index.scss && echo index-restored
