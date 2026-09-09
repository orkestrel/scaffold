# Guide tooling application carrier report

The saved carriers are [stage-guide-native.sh](../pass/stage-guide-native.sh), [install-guide-scaffold.sh](../pass/install-guide-scaffold.sh), [apply-guide-native-tooling.mjs](../pass/apply-guide-native-tooling.mjs), and [run-guide-native-tooling.sh](../pass/run-guide-native-tooling.sh).

The staging carrier was authored for root's separate execution. Root reports that it added the branch guard, staged the accepted entry, committed it, and pushed it. This unit did not run that carrier.

The installation carrier records archive, Git, manifest, lock, index, npm, and installed distribution evidence. The preview/apply carrier imports only Guide's installed Scaffold release. It scopes the compiled orchestration plan to `scripts`, audits the foreign `scripts/docs.ts` path, and retains the materializer records.

The carriers are unexecuted. Root owns package mutations and acceptance.

Root commands are `bash tmp/pass/install-guide-scaffold.sh <label>` and `bash tmp/pass/run-guide-native-tooling.sh preview <label>` followed, after review, by `bash tmp/pass/run-guide-native-tooling.sh apply <label>`.
