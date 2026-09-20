# U1 fix-round audit report, mechanical checker (native Sonnet, 2026-09-20, 48 s), Veneer at `690bbb4`

1. Claim 6 — CONFIRMED. `app/browser/main.ts:1-2` reads `import '../../src/styles/index.scss'` then `import './styles/index.scss'`; no dynamic import remains; the file declares nothing and stays synchronous.
2. Claim 8 — CONFIRMED. `app/browser/showcases/Showcase.ts:36` creates `main` with no `setAttribute`; lines 37-38 set `aria-label` on the `section` to `SHOWCASE_COPY.region` (`'Showcase'`).
3. Claim 9 — CONFIRMED. `guides/README.md:8-10` carries the `Showcase` header and the `Veneer` row cell `[app/browser](../app/browser)`, which resolves.
4. Claim 10 — CONFIRMED. `tests/src/browser/index.test.ts:1-29` imports `recordListeners` from `../../setupBrowser.js`; both cases call it; no `Object.defineProperty(EventTarget.prototype, …)` remains; `tests/setupBrowser.ts:41-71` exports `async function recordListeners`.
5. Claim 11 — CONFIRMED. `tests/distribution.test.ts:603` carries `vite-ignore` on the link; line 647 writes `join(page, 'public', 'styles.css')`.
6. Claim 12 — CONFIRMED. Every changed path is owned by a fix brief; `package.json`, the lockfile, `.claude/**`, `configs/**`, `scripts/**`, `src/styles/**`, `src/core/**` are absent; the banned-syntax grep over the diff returns only false positives. The status artifact is empty because the tree is clean (empty porcelain output).

Not checked (not mechanical): claims 1, 2, 3, 4, 5, 7, 13.

Checker: findings — none beyond the empty status artifact, which is the clean reading itself.
