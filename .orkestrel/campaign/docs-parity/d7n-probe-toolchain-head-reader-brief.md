# Correct the toolchain carrier's manifest read

Continue d7n-probe-toolchain-head-brief.md with its authority, ownership and
invariants unchanged. Replace only its instruction to read declared ranges
through read-package-field.mjs. That reader accepts only name and version.

Read each external declared range through the existing final-visit mechanism:
npm --prefix "$target" pkg get "devDependencies.$dependency". Capture stdout
and stderr per dependency and require successful exit. Require the result to
match the final visit's caret-range validation before passing it to the
supported registry helper. Do not amend or replace any reader.

Root ran npm --prefix C:/Users/mikes/WebstormProjects/probe pkg get
devDependencies.oxlint. It exited 0 and returned ^1.81.0 without JSON quotes.
The final preparation carrier already uses this mechanism. Keep the installed
version checks on read-package-field.mjs, whose version input is supported.

No role runs the resulting carrier. Root owns its registry reads and install.
Return the named report and syntax result; stop after this bounded unit.
