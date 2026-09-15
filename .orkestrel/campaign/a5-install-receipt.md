# A5-install receipt — router and server declared as agent development dependencies

date: 2026-09-15T00:39:20Z
agent HEAD: d84b1a2
agent status before: []
router installed before: 	"version": "0.0.14",
server installed before: 	"version": "0.0.19",
guide installed before: 	"version": "0.0.18",
installed guide grammar admits abstract before: 2
guide tarball present: -rw-r--r-- 1 mikes 197609 465122 Sep 14 19:06 /c/Users/mikes/WebstormProjects/scaffold/tmp/tarballs/orkestrel-guide-0.0.18.tgz
npm install exit: 0
router installed after: 	"version": "0.0.14",
server installed after: 	"version": "0.0.19",
guide installed after: 	"version": "0.0.18",
installed guide grammar admits abstract after install: 0
the reify reverted the G1 head start; reinstalling the guide tarball --no-save
guide tarball reinstall exit: 0
installed guide grammar admits abstract after reinstall: 2
agent status after: [ M package-lock.json  M package.json ]

```diff
diff --git a/package.json b/package.json
index ee1b62a..07fa8c7 100644
--- a/package.json
+++ b/package.json
@@ -85,7 +85,9 @@
 		"@microsoft/api-extractor": "^7.59.1",
 		"@orkestrel/guide": "^0.0.18",
 		"@orkestrel/probe": "^0.0.14",
+		"@orkestrel/router": "^0.0.14",
 		"@orkestrel/scaffold": "^0.0.67",
+		"@orkestrel/server": "^0.0.19",
 		"@orkestrel/test": "^0.0.14",
 		"@types/node": "^26.5.1",
 		"oxfmt": "^0.68.0",
```

lockfile diff stat:  1 file changed, 2 insertions(+), 2 deletions(-)
lockfile root devDependencies now name router/server: 5
