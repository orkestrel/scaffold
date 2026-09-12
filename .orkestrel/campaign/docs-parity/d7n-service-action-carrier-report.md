# Service action carrier report

## Owned paths

- `tmp/pass/scaffold-service-action.sh` script
- `tmp/units/d7n-service-action-carrier-report.md` report

## Predecessor delta

```diff
diff --git a/tmp/pass/scaffold-upper-action.sh b/tmp/pass/scaffold-service-action.sh
index 7886b5a2..eca93875 100644
--- a/tmp/pass/scaffold-upper-action.sh
+++ b/tmp/pass/scaffold-service-action.sh
@@ -1,4 +1,5 @@
 #!/usr/bin/env bash
+# Successor: scaffold-service-action.sh; evidence directory: $SCR/$label; added selectors: regression, core, server, bin, build.
 set -euo pipefail
 source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
 package=${1-}
@@ -30,6 +31,11 @@ case "$action" in
 	check) command=(npm run check);;
 	guides) command=(npm run test:guides);;
 	pins) command=(node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/compilers.test.ts);;
+	regression) command=(npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "preserves the existing provisioner through target-reading audit and overwrite");;
+	core) command=(npm run test:src:core -- tests/src/core/factories.test.ts tests/src/core/validators.test.ts tests/src/core/parsers.test.ts tests/src/core/compilers.test.ts);;
+	server) command=(npm run test:src:server -- tests/src/server/Materializer.test.ts);;
+	bin) command=(npm run test:src:bin -- tests/src/bin/CLI.test.ts);;
+	build) command=(npm run build);;
 	*) fail 'action is not supported';;
 esac
 [[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'; [[ "$cap" =~ ^[1-9][0-9]*s$ ]] || fail 'cap must be a positive whole-second timeout'
```

## Syntax

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/scaffold-service-action.sh` exited `0`.

No action was executed.

## Deviation

No deviation.
