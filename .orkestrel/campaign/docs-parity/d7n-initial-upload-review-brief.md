# Initial layer upload carrier review

Act as the separate owner-selected reviewer. Read AGENTS.md, orchestration,
portability, writing, quality, orkestrel-publish and its wave/window references.
Review only tmp/pass/upload-initial-layer.sh against
tmp/units/d7n-initial-upload-carrier-brief.md and the actual final pack receipt
shape in tmp/pass/pack-foundation-final.sh. Do not run the upload script,
authenticate, install, publish, change source or run suites. Syntax checks and
read-only inspection are allowed. Return a report without editing the carrier.

Try to break these claims: the carrier refuses non-operator/non-TTY use; validates
every intended archive and canonical clean main before auth; matches the actual
receipt paths; leaves npm terminal input and output inherited; runs login and
whoami before serial ignore-scripts uploads; performs no release work inside the
approval window; and stops on failure without retry or secret handling.

Codec and Test final artifacts are still being prepared. Their absence now is
expected and must cause runtime refusal, not a source repair or login attempt.
The root will reconcile the returned reading and retains all operation authority.
