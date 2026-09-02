#!/bin/bash
# Land slice 5 fix-ups as their builders return: wait for the 5a chain, then land each package once its
# fix-up marker file exists (the Orchestrator touches /home/user/work/ready/<pkg> when a builder reports).
until grep -q 'LAND-SLICE5A-DONE' /home/user/work/logs/land-slice5a.out; do sleep 20; done
for p in toolbox terminal database console; do
	until [ -f /home/user/work/ready/$p ]; do sleep 20; done
	/home/user/work/land-voice.sh $p
done
echo LAND-SLICE5B-DONE
