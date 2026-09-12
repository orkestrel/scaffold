# Stage Probe's published runtime graph

The `install-probe-runtime-head.sh` script limits the installation target to Probe and adds the declared runtime roots to the no-save installation.

The script records and checks installed runtime-root versions without changing manifest or lockfile preservation guards.

Validation: `bash -n tmp/pass/install-probe-runtime-head.sh` exited 0.
