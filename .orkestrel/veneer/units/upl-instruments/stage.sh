#!/usr/bin/env bash
# Builds the pristine base and the validation copy of e4e6a40 under tmp/probe.
set -euo pipefail
cd /home/user/veneer-upl
rm -rf tmp/probe/base tmp/probe/land
mkdir -p tmp/probe/base tmp/probe/land
git archive e4e6a40 | tar -x -C tmp/probe/base
git archive e4e6a40 | tar -x -C tmp/probe/land
cp -al node_modules tmp/probe/land/node_modules
echo staged
