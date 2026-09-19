# Prepare the reviewed release tarball

Act as builder on Terra. Read AGENTS.md, .agents/orchestration.md, portability/writing/quality rules, orkestrel-publish and its references, and the previous preparation and fixture-alignment briefs. Spawn nothing. You are not alone; preserve every other file.

Own only `tmp/release/pack-scaffold-0.0.75.ps1`. Author but do not run it. The Orchestrator will run it after the independent prepublishOnly chain passes.

Target exactly `C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75`. Verify manifest name @orkestrel/scaffold, version0.0.75, and test range^0.0.18. Require dist/src, dist/bin and dist/host to exist. Create only `C:/Users/mikes/WebstormProjects/scaffold/tmp/release/packages` if absent. Refuse if orkestrel-scaffold-0.0.75.tgz already exists there, preserving earlier artifacts.

Run `npm.cmd pack --ignore-scripts --json --pack-destination <absolute packages directory>` from the target. Capture stdout as JSON, refuse a nonzero exit before parsing, and retain the pack result in `tmp/release/scaffold-0.0.75-pack.json` at canonical Scaffold. Verify result name/version and filename, enumerate all result files and refuse an archive that lists .npmrc, .env, auth.json, .codex, .claude, .orkestrel or tmp as root paths. Allow the declared dist/host template paths inside that packaged tree. Print the tarball absolute path, npm integrity value, SHA256 and package size.

Do not install, run gates, build, commit, push, publish, mutate source, or delete anything. Validate your script with the PowerShell parser and return its path plus guards. Report missing prerequisites instead of widening scope.
