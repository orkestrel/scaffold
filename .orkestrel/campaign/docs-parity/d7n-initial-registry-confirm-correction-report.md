# Initial registry confirmation correction report

The carrier now reads each exact retained `registry-<package>.stdout.txt` file and requires its matching exit receipt to be `0`. It preserves the empty prior evidence directory and writes only to `d7n-initial-registry-confirm-final`.

It also validates the exact registry tarball path and sets a 60-second download bound. The carrier remains unexecuted.
