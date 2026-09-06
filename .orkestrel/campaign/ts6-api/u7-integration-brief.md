# Brief — U7 integration (probe), the Orchestrator's serial application of U7's returned patches

Role and engine: Orchestrator (Fable), applying the two `src/server/stages/RuntimeStage.ts` patches U7 returned verbatim (`u7-probe-typestage-report.md` § Shared-file patches), plus the import bookkeeping they imply (`matchesLiveProcess` and `TYPE_MIRROR` added; `readFaultCode` removed because `#alive` was its only reader); audited by the U7 round's lanes (claim 12) and the probe verifier. Owned: `src/server/stages/RuntimeStage.ts`. Off-limits: every other file.

Acceptance: `npx oxfmt --check` and `npx oxlint --deny-warnings` over the file exit 0; `npm run check` exits 0; the runtime stage's own suite (`tests/src/server/stages/RuntimeStage.test.ts`) passes alone.
