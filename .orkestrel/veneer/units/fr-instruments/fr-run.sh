#!/usr/bin/env bash
# Runs one command in the unit's host environment: npm 11 on PATH and the pinned browsers.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fr || exit 99
exec "$@"
