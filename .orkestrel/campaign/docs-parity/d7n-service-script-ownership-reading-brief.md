# Reconcile service-script ownership before overwrite

Act as the reused objective analyst, read-only. Perform directly, spawn nothing.
Read Scaffold AGENTS.md, orchestration, portability/workspace/quality rules and
guides/scaffold.md's target reading and ownership contract. Read
orkestrel-align-packages with fleet/integration references. Work in canonical
C:/Users/mikes/WebstormProjects, never copies or worktrees.

Answer this bounded question: why does installed Scaffold0.0.64 classify
Ollama's scripts/service.sh as foreign despite the guide's explicit preservation
promise, and can the supported overwrite run safely without deleting that script?
Root has not run overwrite. Do not run deletion or any mutation yourself.

Evidence: scaffold/tmp/pass/d7n-ollama-native-repair/action.stdout.txt records
scripts/docs.ts and scripts/service.sh as foreign. Guide target reading says
vendors is not reconstructed and a present service script stays protected.
Ollama's tracked scripts/service.sh provisions its daemon/model and
.github/workflows/ci.yml invokes it. Read that CI call and guide contract rather
than assuming the script is retired. The native source prepublish is running in
the canonical Ollama checkout; do not compete with it.

Locate the exact plan/ownership/removal chain and applicable coverage. Known
pointers: src/core/compilers.ts blueprintToOrchestrationArtifacts,
src/server/Materializer.ts #derive/remove, tests/src/server/Materializer.test.ts
the remove case that compiles vendors explicitly. Inspect exact declared and
installed source surfaces where needed. Do not turn this into a broad audit.

Return observed facts, the smallest public-API read-only reproduction root can
run, what the current test actually covers, and the bounded decision needed.
Distinguish confirmed deletion risk from unexecuted prediction. Do not design
or implement a broad replacement, change scripts, weaken mandatory retired-docs
removal, invent a vendor parser or request new dependencies. No install/build/
gate/ref/auth/upload action. Write only
scaffold/tmp/units/d7n-service-script-ownership-reading-report.md. No prose counts
or model names. Root will decide whether a fix unit is necessary.
