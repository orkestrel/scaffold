# Guide final instrument successor report

Updated [validate-guide-heading.sh](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/validate-guide-heading.sh) so its EXIT handler detects final capture failures, compares successful captures before creating the success marker, and preserves a failed command exit.

Updated [pack-guide-heading.sh](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/pack-guide-heading.sh) so its EXIT handler detects final capture failures. It now retains and prints package metadata from its fresh log directory, and retains final clean status after the clean-state and HEAD checks.

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/validate-guide-heading.sh` exited 0.

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/pack-guide-heading.sh` exited 0.

No script body, package gate, build, or pack command ran.
