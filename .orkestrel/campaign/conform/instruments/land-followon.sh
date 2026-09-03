#!/bin/bash
cd /home/user/scaffold || exit 2
export RETAIN_DIR=/home/user/scaffold/.orkestrel/campaign/conform/units/followon
node tmp/work/land-conform.mjs "$1:/home/user/scaffold/tmp/work/msgs/land-$2.txt"
