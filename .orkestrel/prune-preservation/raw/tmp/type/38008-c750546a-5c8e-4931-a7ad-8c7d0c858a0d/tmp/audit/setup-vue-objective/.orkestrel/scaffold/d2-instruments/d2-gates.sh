#!/usr/bin/env bash
# Runs the acceptance gates in the order the brief fixes, from the tree's final bytes, and echoes
# each exit code rather than raising it, so a later gate's result is recorded even after an earlier
# one fails. The build already ran after the last vendored edit; it is re-run to prove the staged
# `dist/host` bytes still match the source this chain reads.
set +e
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1

echo "===== format:check ====="
npm.cmd run format:check
echo "EXIT_FORMAT=$?"

echo "===== lint:check ====="
npm.cmd run lint:check
echo "EXIT_LINT=$?"

echo "===== check ====="
npm.cmd run check
echo "EXIT_CHECK=$?"

echo "===== build ====="
npm.cmd run build
echo "EXIT_BUILD=$?"

echo "===== vendored parity ====="
sha256sum tests/config.test.ts dist/host/tests/config.test.ts

echo "===== test:distribution ====="
npm.cmd run test:distribution
echo "EXIT_DISTRIBUTION=$?"

echo "===== test ====="
npm.cmd test
echo "EXIT_TEST=$?"

echo "===== git status ====="
git status --short
echo "===== DONE ====="
