#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
exec timeout --foreground 1800s bash /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path/tmp/d7n-scaffold-path-verify-2/chain.sh
