# Retain extraction evidence and prepare joint review capture

Act as builder on the native Terra route. Perform this fully specified unit directly.
Read AGENTS.md, .agents/orchestration.md, applicable portability and writing rules,
orkestrel-align-packages with fleet/integration references, and the extraction plan.
Do not delegate, install, execute gates, build, pack, commit, switch branches, or read
credentials. You are not alone in the workspace. Preserve all other edits.

Own only these instruments under C:/Users/mikes/WebstormProjects/scaffold/tmp/pass:

- retain-guides-extraction-checkpoint.ps1
- capture-guides-extraction-review.sh (new)
- compare-parity-guide-build.sh (new)
- run-guides-extraction-review.sh (new transport carrier)

Write with apply_patch. Keep authored paths forward-slash. Bash scripts source the
existing pass-env.sh. Use only native shell/filesystem tools, no dependency additions.

Extend the existing retention script without changing historical evidence to retain
the current Guide core and source-site briefs/reports, their scoped red/green logs,
the final Guide root-gate directory, provisional pack metadata/hash/preservation
receipts, and scaffold install receipts. Inspect exact filenames first. Exclude
tarballs, extracted package trees, node_modules, credentials, and raw CLI journals.
Retain safe text/JSON evidence only. Retain invoke-guide-parity-pack.sh and these new
instruments. Do not retain scaffold adoption as complete until its report exists;
copy an existing report conditionally without inventing it. Preserve exact bytes.

The review capture accepts an unused label matching [a-zA-Z0-9._-]+ under SCR.
It must fail if its output directory exists. For canonical Guide and scaffold save
git diff HEAD (scaffold excludes .orkestrel/campaign/docs-parity), git status --short,
git rev-parse HEAD, git diff --check, and git ls-files --others --exclude-standard.
Use git -C always. Do not stage. Capture hashes for Guide's canonical built JS and
declaration, their actual installed scaffold counterparts, and the provisional
archive SCR/packed/d7n-guide-parity-core/orkestrel-guide-0.0.18.tgz. Compare canonical
and installed JS/declarations with cmp, recording failures accurately. This capture
does not assert the untracked files are included in git diff; the untracked list
must remain visible to reviewers. Do not run this capture while a writer is active.

The build comparison script is read-only and compares Guide dist/src/core/index.js
and index.d.ts against their scaffold node_modules/@orkestrel/guide counterparts.
Print SHA-256 readings and propagate cmp failures. It does not build or install.

Return tmp/units/d7n-guides-extraction-evidence-report.md with touched instruments,
syntax-check commands and exits, and any deviation. Do not state prose counts.

## Transport carrier amendment

Use the existing run-guides-test-file-close-review.sh mechanics for the new reviewer
launcher. Require tmp/claude/d7n-guide-parity-core-review-brief.md and the Guide/scaffold
diff files under tmp/pass/d7n-guides-extraction-review. Refuse an existing journal.
Set CLAUDE_CODE_GIT_BASH_PATH to the installed Git Bash executable with forward-slash
paths. Source pass-env and use the canonical scaffold working directory. Root sets
the command cap to timeout 1800. Use claude --agent reviewer with a brief-pointer
prompt forbidding commands, edits, delegation, and credential reads; --model opus,
--effort high, --permission-mode plan, --output-format stream-json, and --verbose.
Redirect stdout to tmp/claude/d7n-guide-parity-core-review.jsonl and stderr to the
matching .err path. Retain the launcher and syntax-check it only. Do not launch.
