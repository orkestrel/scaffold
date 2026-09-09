# Initial layer operator upload carrier

Act as builder on Terra. Read scaffold/AGENTS.md, orchestration, portability,
writing and quality rules; orkestrel-publish with wave.md and window.md; Ruling30.
Own only tmp/pass/upload-initial-layer.sh and a separate tmp/units report.
You are not alone; preserve all other work. Use apply_patch and forward-slash
paths. No package edits, installs, auth, uploads, secrets or delegation. Validate
bash syntax only. Root will not execute the upload operation in this task.

Write an operator-only Git Bash script sourcing pass-env.sh. Refuse unless the
argument is --publish and stdin/stdout are real terminals. Explain before login
that login approval and upload approval are separate, that the operator must open
the currently printed URL promptly, and that browser upload approval starts the
5-minute upload window. Never prompt for a token or read auth files. Never write
stdin or pipe npm's interactive output. Normal terminal stdin stays open.

The prepared initial-layer members are contract0.0.17, codec0.0.3, msg0.0.10,
sse0.0.7 and test0.0.14. This is an ephemeral upload membership list, not a
replacement fleet order. Before any auth, validate all members: expected name
and version via read-package-field.mjs; clean canonical main checkout; fetch
origin and require HEAD equals origin/main; final prepublish action.exit.txt0;
final pack pack.exit.txt0; archive SHA through its archive.sha256 receipt;
packed manifest byte-equal to canonical package.json; packed dist byte-equal to
canonical dist. Abort on an absent receipt or any mismatch. Do not install,
build, format, re-pin, bump, commit, switch branches or repair anything.

Use these final archive directories beneath SCR/packed:
d7n-contract-publish-final, d7n-codec-publish-final, d7n-msg-publish-final,
d7n-sse-publish-final and d7n-test-publish-final. The filename is
orkestrel-<package>-<version>.tgz. Final prepublish receipts are under
SCR/d7n-<package>-final-prepublish. Every Git call uses git -C. Validate every
artifact before starting login, so no gate consumes the approval window.

Then run npm login --browser=false with inherited terminal IO. Confirm login
with npm whoami immediately before upload. Upload each validated tarball
serially with npm publish <archive> --access public --ignore-scripts
--browser=false. Stop on a failure; never blindly retry an active or rejected
authorization. No registry query, gate, install or unrelated pause between
successful uploads. The owner will give root the result for registry confirmation
and preparation of dependent layers.

Print completion only if every publish command succeeds, and label it command
completion pending root registry confirmation. Do not claim anything published
in your authoring report. The current task authorizes preparation only; root must
not run this script or mint approval merely because the file exists.
