#!/usr/bin/env bash
# Declare and install the one dev dependency scaffold's SHOWCASE_DEV_DEPENDENCIES
# names for a showcase build, then refresh the lockfile digest marker in the same step.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
mkdir -p tmp/showcase

node tmp/declare-showcase-dep.mjs
echo "declare_exit=$?"

npm install > tmp/showcase/install.log.txt 2>&1
echo "install_exit=$?"
tail -4 tmp/showcase/install.log.txt

node tmp/refresh-lock-marker.mjs

echo "===== installed? ====="
ls -d node_modules/vite-plugin-singlefile 2>&1 | head -1
node -e "console.log('declared: '+require('./package.json').devDependencies['vite-plugin-singlefile'])"
