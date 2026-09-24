#!/bin/bash
# Runs the capture and offset groups three times on the final tree to check the pointer proofs hold
# across runs, logging each run under tmp/units/.
cd /home/user/test-tf
export PATH=/opt/node22/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
for run in 1 2 3; do
	npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame|computeOffset" > tmp/units/t5-4-repeat-$run.log.txt 2>&1
	echo "exit $?" >> tmp/units/t5-4-repeat-$run.log.txt
	echo "run $run: $(grep 'Tests  ' tmp/units/t5-4-repeat-$run.log.txt) $(tail -n 1 tmp/units/t5-4-repeat-$run.log.txt)"
done
