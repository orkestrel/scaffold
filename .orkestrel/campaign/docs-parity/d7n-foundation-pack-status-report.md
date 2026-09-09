# Foundation packing status correction report

The correction changes `compare()` in [pack-foundation-final.sh](../pass/pack-foundation-final.sh) to capture a nonzero status in the command's `else` branch. It persists statuses `0` and `1` as comparison readings with stderr. A status above `1` returns to the strict carrier and stops it. The final output now includes the map-excluding comparison status.

The carrier remains unexecuted. No package files changed.
