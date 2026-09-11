# Resolve the stopped visit's actual receipt layout

Resume the toolchain carrier brief. The missing parent status-after.txt and
package-after.json are not required files in that brief or this carrier. The
parent captures after-state only after all stages finish, and it never writes
package-after.json. Its stopped state therefore has neither. Do not require
invented parent receipt names.

Read these existing paths exactly:

- tmp/pass/d7n-brief-final-registry-visit/prepared-head.stdout.txt
- tmp/pass/d7n-brief-final-registry-visit/overwrite.exit.txt
- tmp/pass/d7n-brief-final-registry-visit/audit.exit.txt
- tmp/pass/d7n-brief-final-registry-visit/lock.exit.txt
- tmp/pass/d7n-brief-final-registry-visit/install.exit.txt
- tmp/pass/d7n-brief-final-registry-visit-install/action.exit.txt
- tmp/pass/d7n-brief-final-registry-visit-install/status-after.txt
- tmp/pass/d7n-brief-final-registry-visit-install/diff-after.txt
- tmp/pass/d7n-brief-final-registry-visit-install/index-after.txt
- tmp/pass/d7n-brief-final-registry-visit-install/manifests-after.sha256
- tmp/pass/d7n-brief-final-registry-visit/authored-before.sha256
- tmp/pass/d7n-brief-final-registry-visit/authored-after-overwrite.sha256

The final installed Guide/Scaffold version and full-dist receipts are in the
parent visit directory with final-guide/final-scaffold prefixes. Read current
Brief package.json directly; validate it and the lock against the install
manifest hashes rather than requiring a nonexistent copied JSON file.

Use the completed install's diff and index receipts for resume binding. Preserve
the stopped external-before and external-after receipts. New final external
validation may use external-final labels, consistently in fresh and resume
modes and in the closure successor. Capture resume-specific status separately;
write the parent's previously absent final capture only when the whole resumed
visit completes. Do not overwrite any existing receipt or replay completed
stages. All other toolchain brief scope and prohibitions remain unchanged.
