#!/usr/bin/env bash
# FRAME-HELPERS acceptance reading and mutation runs, in sequence.
cd /home/user/veneer-fh
tmp/units/fh-round.sh dark-390:dark-390-1
tmp/units/fh-mutation-runs.sh
