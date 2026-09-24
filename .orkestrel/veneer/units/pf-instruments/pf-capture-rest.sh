#!/usr/bin/env bash
# Runs the observation capture variants one at a time through pf-capture.sh.
for variant in dark-390 light-1280 dark-1280; do
	timeout 1200 bash /home/user/veneer-pf/tmp/units/pf-capture.sh "$variant"
done
