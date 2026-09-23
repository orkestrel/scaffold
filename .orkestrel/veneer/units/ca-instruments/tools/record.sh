#!/usr/bin/env bash
# Takes the failing-first reading (barrel line absent), the control, every mutation, and the final green reading.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
T=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/ca
B=/home/user/veneer-ca/tmp/probe/base
CMD="npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/carousel.test.ts"
: > $T/mutations.log.txt
cd $B
cp src/styles/index.scss $T/index.scss.keep
grep -v "^@use 'components/carousel';$" $T/index.scss.keep > src/styles/index.scss
npm run build:src:styles > /dev/null 2>&1
echo "## failing-first: barrel line absent" >> $T/mutations.log.txt
$CMD > $T/failing-first.log.txt 2>&1; echo "exit=$?" >> $T/mutations.log.txt
sed 's/\x1b\[[0-9;]*m//g' $T/failing-first.log.txt | grep -E "Tests " >> $T/mutations.log.txt
cp $T/index.scss.keep src/styles/index.scss
python3 $T/tools/mutate.py none item-display-block next-guard-dropped prev-guard-dropped active-end-dropped active-start-dropped fade-delay-dropped fade-item-opacity-dropped fade-incoming-dropped fade-bare-transition item-bare-transition control-bare-transition indicator-bare-transition control-literal-duration control-literal-filter prev-left-dropped carousel-position-dropped icons-swapped indicator-border-box active-pip-dropped indicator-literal-inset caption-literal-white dark-omits-filter pointer-event-dropped focus-dropped clearfix-dropped extra-rule
npm run build:src:styles > /dev/null 2>&1
echo "## final green" >> $T/mutations.log.txt
$CMD > $T/final-green.log.txt 2>&1; echo "exit=$?" >> $T/mutations.log.txt
sed 's/\x1b\[[0-9;]*m//g' $T/final-green.log.txt | grep -E "Tests " >> $T/mutations.log.txt
echo DONE >> $T/mutations.log.txt
