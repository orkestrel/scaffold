# Foundation action carrier report

The unexecuted action recorder is [foundation-action.sh](../pass/foundation-action.sh).

It validates canonical target and manifest identity, safe unused evidence output, an exact supported action, and a bounded whole-second cap. It captures Git and package state around the selected command, retains separated command output and the original exit, and returns that exit without treating a nonzero result as green.

It integrates the retained `read-package-field.mjs` manifest reader. It does not edit the predecessor installer.
