#!/usr/bin/env bash
# Negative controls for the exact `variables` equality in the stylesheet profiles proof (round 2).
# Each control edits tests/setup.css from a backup, runs the service suite, and copies it back.
# Control C: the theme import emits every theme variable (`theme(static)`), so `--font-sans` leaks.
# Control D: one planted static theme variable other than `--font-sans` leaks.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-us
out=tmp/probe
cp tests/setup.css $out/setup.css.bak
sed -i "s|@import 'tailwindcss/theme.css' layer(theme);|@import 'tailwindcss/theme.css' layer(theme) theme(static);|" tests/setup.css
grep -c 'theme(static)' tests/setup.css
npm run test:service > $out/control-c.log.txt 2>&1; echo "control C exit=$?"
cp $out/setup.css.bak tests/setup.css
printf '@theme static {\n\t--radius-planted: 3px;\n}\n' >> tests/setup.css
grep -c 'radius-planted' tests/setup.css
npm run test:service > $out/control-d.log.txt 2>&1; echo "control D exit=$?"
cp $out/setup.css.bak tests/setup.css
cmp tests/setup.css "$out/setup.css.bak" && echo "setup.css restored"
git status --short tests/setup.css
