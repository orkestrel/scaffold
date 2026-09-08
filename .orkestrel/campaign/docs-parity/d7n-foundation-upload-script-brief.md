# Unit d7n-foundation-upload-script — operator-run prepared wave

Act as native builder on Terra. Perform this fully specified authoring assignment
directly and spawn nothing. You are not alone. Own only
C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/upload-foundation.sh and
C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-foundation-upload-script-report.md.
Do not execute a login, publish, registry command or package script. Syntax-check only.

Read scaffold AGENTS.md, .agents/orchestration.md, portability, quality and writing
rules; orkestrel-publish SKILL.md and its wave.md and window.md references. Read
Ruling 30 and d7n-foundation-receipts-verify-report.md under
C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/.
Use the accepted tarballs named here; do not build, pack, bump or rewrite any dependency.

Author a Git Bash script for the owner to run in a real interactive terminal. Source
/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh and set -euo pipefail.
Refuse unless stdin and stdout are terminals, before any login or upload. Keep stdin
open and write nothing to it. Never start an automated TTY, background process,
login watcher, retry loop, credential replacement, auth-file read or log containing
credentials. No npm install, npmrc access, tokens, passwords or OTP storage.

Check every accepted tarball digest before authentication using sha256sum --check
--status and quoted paths. Stop on any missing or changed artifact. These paths are
relative to SCR/packed:

| Package | Artifact | SHA256 |
| --- | --- | --- |
| contract | d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz | 88ef71a590f33edd9dc28bbdf65dc30ce9e2251fd9805807bb94bef0adcbca5a |
| codec | d7n-foundation-codec.eyQ8Pi/orkestrel-codec-0.0.3.tgz | 105b7c15c7eb8a1d9fa707d35feaf7923dd521536749be62fd22dd3c16f447f7 |
| msg | d7n-foundation-msg.N3AAAA/orkestrel-msg-0.0.10.tgz | 257d9c2db2279371147c7363819cb6fd12833113d3d12d48aa390ac2fa15ac41 |
| sse | d7n-foundation-sse.zb8CDG/orkestrel-sse-0.0.7.tgz | 358c3105939cd7ab87ad1e0e3ea864d8955f6efa2a15046d471f717f9d7ece8c |
| test | d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz | d6ae5e57126d370b3316b528a8bd6dafaf2b64d9bdf52e73fead78065f7c5002 |

Print a concise instruction that login approval is distinct from upload authorization
and that the owner should follow the terminal's current URL without pressing Enter.
Run npm login --browser=false, then npm whoami. Stop on a nonzero exit. Do not treat
login exit alone as proof. Keep npm's URLs visible in the operator's terminal.

Publish the named Contract, Codec, Msg, SSE and Test tarballs serially in that order,
each with npm publish <absolute-tarball> --access public --ignore-scripts --browser=false.
These packages share the measured bottom runtime layer; this is their within-layer
operator sequence. No gates or registry waits between uploads. Stop on a failed upload
without retrying. End by asking the owner to tell the Orchestrator the result so it
can confirm registry availability before dependents move to registry pins.

The script is prepared but unrun. The owner has not answered the incremental-publication
question. Root will not execute it. No automatic rerun is safe after a partial upload;
the remaining scope must be read from the registry before another operator command.

Return the path and bash -n exit, with execution explicitly unrun. Report a required
scope deviation instead of inventing a transport or changing permissions. Never state
prose counts or fixed model identifiers.
