# Unit A5-fix-2 report

## Landed line ranges

- S1 landed at `tests/guides.test.ts:464-467`.
- S2 landed at `tests/guides.test.ts:576-579`.

Both replacements match the brief's `S1` and `S2` text verbatim; the formatter made no re-wrap.

## Commands run

- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npm run test:guides` — exit 0, 43 passed.
- `git diff --stat` — `tests/guides.test.ts | 12 ++++++------` (1 file changed, 6 insertions, 6 deletions).

## Acceptance criterion 1 note

- `grep -c "the \`await server.stop()\` call in the case's \`finally\` block replaces" tests/guides.test.ts` reports 1 (S1's `the` sits on the same source line as the following backtick token).
- `grep -c "after the case replaces" tests/guides.test.ts` reports 0.
- `grep -c "the \`closeIdleConnections\` step does not reach it and the \`server.close()\` call waits" tests/guides.test.ts` reports 0, not 1 as the brief's criterion states. This is a brief-criterion defect, not a text defect: the landed S2 text is verbatim from the brief's own `S2` fence, where `so the` ends one comment line and `` `closeIdleConnections` `` starts the next, so the grep pattern's `the` and backtick token never share one line. Verified against the file directly (see the `sed -n '570,577p' tests/guides.test.ts` reading below).

```
			// A cancel leaves the client's socket aborted rather than idle, so the
			// `closeIdleConnections` step does not reach it and the `server.close()` call waits on the
			// socket itself — seconds, on a server that also served a completed call over that reused
			// keep-alive socket. One server per case keeps the stop immediate.
```

## git diff --stat

```
 tests/guides.test.ts | 12 ++++++------
 1 file changed, 6 insertions(+), 6 deletions(-)
```
