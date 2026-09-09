# Guide tooling staging carrier report

The unexecuted staging carrier is [stage-guide-tooling.sh](../pass/stage-guide-tooling.sh).

It refuses a branch, commit, staged state, porcelain population, or diff hash that differs from the accepted generated tooling delta. It stages only `package.json` and `scripts/docs.ts`, then compares the staged result with the retained final capture.

The carrier has not run. Root owns staging and acceptance.
