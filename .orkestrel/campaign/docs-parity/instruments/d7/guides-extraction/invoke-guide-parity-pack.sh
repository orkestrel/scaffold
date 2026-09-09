#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
export GUIDE_PACK_TRANSACTION=root
source "$SCR/pack-parity-guide.sh" "$1"
