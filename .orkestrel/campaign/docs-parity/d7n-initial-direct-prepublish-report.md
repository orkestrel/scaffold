# Direct checkout publication preparation

The owner requested directory-based publication on 2026-09-10. Use canonical
repositories under C:/Users/mikes/WebstormProjects, not archives or copied
packages under tmp. The owner reports completing npm login and explicitly chose
PowerShell for the upload handoff. Root did not authenticate or publish.

Root refreshed the registry and origin refs with the retained
read-foundation-release.sh instrument. The pending versions remain absent from
the registry. Initial-layer local main and origin/main tips match the accepted
release commits. Their worktrees are clean.

Root reran each package's actual prepublishOnly, serially, through the previously
reviewed foundation-action.sh instrument. Every action exited 0 and left main,
HEAD, metadata and the clean source state unchanged. No install, version edit,
product change, new audit round or additional verifier ran. This uses the owner's
accepted root-gate route and does not reopen prior source verdicts.

| Package | Version | Accepted main | Fresh gate evidence |
| --- | --- | --- | --- |
| contract | 0.0.17 | e6d2de5bfbbeb6981945b33ede438de8c38f1dbf | evidence/d7n-contract-direct-prepublish |
| codec | 0.0.3 | f53355d92452a8fa2c59da084eb9b757c65b7b84 | evidence/d7n-codec-direct-prepublish |
| msg | 0.0.10 | 2a66c5b6b1251649a3f92574facf323c20edb581 | evidence/d7n-msg-direct-prepublish |
| sse | 0.0.7 | 2a0d3ecb5c13fe7b893c45396840ad20da45492e | evidence/d7n-sse-direct-prepublish |
| test | 0.0.14 | 7d4980f97dbf6ee56fcf4a28f5a0e2d163490ed7 | evidence/d7n-test-direct-prepublish |

Each action ran npm run prepublishOnly after changing into its canonical package
directory. The runner's SCR path is the log destination, not the build or publish
directory. The resulting output is <canonical package>/dist.

Root compared each rebuilt dist against its accepted final archive extraction
with Git Bash's diff.exe -r. Every comparison exited 0 with empty output. The
preceding Git no-index comparisons also exited 0, but their line-ending warnings
do not establish byte identity; the raw diff readings do. Exact raw comparison
targets were tmp/pass/packed/d7n-<package>-publish-final/extract/package/dist and
C:/Users/mikes/WebstormProjects/<package>/dist for each package in the table.

The PowerShell command lives at
instruments/d7/foundation-native/publish-initial-direct.ps1. It explicitly changes
into each canonical repository and invokes npm publish --ignore-scripts
--browser=false. It checks the existing login and stops on a failed upload. It
does not install, build, publish an archive, request a token, or alter auth files.
The PowerShell parser accepted the command under the measured host 5.1 runtime.
Only parsing ran; root did not execute the upload command.

The owner also reiterated canonical placement. Root found retired dirty worktrees
at scaffold/tmp/pass/scaffold-guides-entry and scaffold/tmp/pass/scaffold-path.
Their source and host edits remain uncommitted, and the guides-entry worktree also
contains the rejected scripts/guides.ts launcher. These are not active build or
publish targets. Root did not merge, discard, remove or modify them. Cleanup needs
an explicit preservation/removal decision; the initial-layer upload is independent
of that cleanup. Read evidence/d7n-retired-worktrees-status.txt.

Scaffold's canonical local main was behind origin/main without divergent commits.
After this record is committed and pushed to the campaign, main and designated
refs, switch the clean canonical Scaffold checkout to main and fast-forward it
to origin/main. Subsequent campaign recording must push HEAD explicitly to the
campaign ref from main; the historical push-record.sh requires the campaign
checkout and must not run unchanged from main.

VERDICT: PASS — initial-layer directories prepared; publication awaits the operator.
