# R-B final objective audit

Held by independent native GPT-5.6Sol in task /root/r_b_final_objective. No fresh tests ran. Paths refer to tmp/recovery/roughnotes unless marked canonical.

- Variant contract — CONFIRMED. Installed CaptureVariant.apply is optional and synchronous at node_modules/@orkestrel/test/dist/src/browser/index.d.ts:297; index.js:2600 invokes it without awaiting. tests/app/browser/integration.test.ts:125 and:156 pass JourneyVariant data directly. Theme actions remain awaited at:494 and:505. tests/setupBrowser.test.ts:137 directly awaits themes and asserts paint/control names.
- Real rejection recorder — CONFIRMED. integration.test.ts:488,:520,:524 subscribe, assert unmodified calls, and remove the same handler in finally. Installed core index.js:761 only records arguments. async-capture-rejection-11-red.log.txt:290 reaches the covered control through the old callback and:319 fails at the recorder assertion with a trusted PromiseRejectionEvent. The identical command passes in the green log:8,:293.
- Navigation placement — CONFIRMED. integration.test.ts:508 opens navigation, traverses Shop, places navigation, and closes it. setupBrowser.ts:504 proves announced expansion, settled animation, destinations, and reachable dismissal. Registry:92 and final proofs:1204,:1221 include navigation. Inspected compact frames show an open menu and focused Shop; wide frames show focused Shop in the masthead. Canonical inventory.json:484 identifies the retained frames.
- Published animation waiter — CONFIRMED. styles/theme.test.ts:47,:64 attaches the button before waiting. Paint equality, contrast, outline, and ring assertions remain at:71,:77. Canonical tmp/audit/r-b-final-actual.diff:1473 shows direct replacement without a wrapper. Installed browser index.js:1069,:1086 refuses disconnected subjects and awaits finite running animations.
- Guide and evidence limits — CONFIRMED. guides/README.md:460 accurately separates awaited theme actions from capture observation and describes the recorder boundary. Normal/reduced setup logs:304 pass; r-b-gates-evidence/test.log.txt:1798 records exit0; r-b-final-capture.log.txt:1126 records completion. These readings prove the installed local candidate, not registry adoption or release completion.

No substantiated finding falls outside the claims. The recorder observes through its final assertion; it does not drain arbitrary future asynchronous work. Full-page dimensions do not establish viewport height. These limits do not falsify the bounded claims.

VERDICT: PASS
