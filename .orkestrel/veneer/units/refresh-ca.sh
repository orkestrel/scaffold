#!/bin/bash
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/refresh-ca.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; cd /home/user/veneer || exit 1
npm run build:src >> $LOG 2>&1; echo "=== build:src exit=$?" >> $LOG
npm run test:conformance >> $LOG 2>&1; echo "=== test:conformance exit=$?" >> $LOG
npm run test:setup >> $LOG 2>&1; echo "=== test:setup exit=$?" >> $LOG
npm run test:app >> $LOG 2>&1; echo "=== test:app exit=$?" >> $LOG
