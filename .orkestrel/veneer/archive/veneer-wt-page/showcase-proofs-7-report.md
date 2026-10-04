Repaired `tests/setupBrowser.test.ts` so the transient class and ARIA controls observe `[root]` while mutating descendant `panel`. Added a connection control that removes and re-appends `panel` beneath a descendant parent at half the observation window, then verifies its connection, parent, and markup are restored. Every control expects `Refusal changed state: delayed class, ARIA, or connection mutation`.

The mutation runs used this exact command:

```text
npx vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts -t "rejects a transient delayed"
```

| Observer configuration | Exit | Result |
| --- | --- | --- |
| `subtree: true` removed | 1 | 3 failed: class, ARIA, and connection; 87 skipped by filter |
| `subtree: true` restored; `childList: true` removed | 1 | Connection failed; class and ARIA passed; 87 skipped by filter |
| Both options restored | 0 | 3 passed; 87 skipped by filter |

Each red control failed because the promise resolved instead of rejecting. The observer implementation is unchanged in the commit.

All required gates ran after the final source edit, in the specified order, with unfiltered output and exit codes read:

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:setup` | 0 | 149 passed |
| `npm run test:setup:browser` | 0 | 115 passed |
| `npm run test:app:browser` | 0 | 226 passed |
| `npm run test:journey` | 0 | 88 passed |
| `git diff --check` | 0 | Passed |

Commit: `492985605d7192947a148de5efbe4b99ffe4774b` (`test: prove showcase stability observes descendants`).

Final `git status --porcelain`: empty.

Deviations: none. One commit; no push, publication, installation, or sub-agent dispatch.
