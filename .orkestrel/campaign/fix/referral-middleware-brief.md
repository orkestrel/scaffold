# Referral probe unit: middleware

## Role and engine

You are the objective analysis lane for the middleware package's open referrals, running on
Claude Opus 5 because the Sol bench is dark (recorded substitution). You perform the assignment
directly and spawn nothing.

## Objective

Answer each referral question below by RUNNING it against the real middleware code in
`/home/user/fleet/middleware` (campaign branch checked out, `node_modules` installed, fix unit
landed), and return a ruling per question with the exact command and output that settles it.

## Rules

- Read the repository's `AGENTS.md` and `.claude/rules/tests.md` § Probes before writing a probe.
- Build probes as throwaway instruments under `/home/user/fleet/middleware/tmp/referrals/`
  (create it; the tree ignores `tmp/`). Never edit `src/`, `tests/`, `guides/`, `package.json`,
  or any vendored instruction file. Do not commit, stage, or run a `git` command that discards.
- A probe drives the real implementation through the package's own exports (`@src/server` or the
  built `dist/`), with real temporary directories and real requests where the question is about
  HTTP behavior. No mocks, spies, or fake clocks.
- Each ruling is one of: **DEFECT** (the question exposes a real defect; state the repair and
  whether it moves the published surface), **SOUND** (the code behaves as documented; cite the
  run), or **UNMEASURABLE HERE** (name the exact limit and the command that would settle it on a
  host that lacks the limit).
- Delete nothing outside `tmp/referrals/`. Leave the instruments in place for retention.

## Referral questions

## s11 — `## Referrals` block
- **To the objective lane** — `src/server/errors.ts:31` and `src/core/middlewares.ts:132`, middleware. `MultipartError extends Error` and brands itself with `Symbol.for('@orkestrel/middleware.MultipartError')`; `isHTTPError` accepts only an `instanceof HTTPError` or a value carrying the server package's own interned brand (`node_modules/@orkestrel/server/dist/src/server/index.d.ts:701-708`). `createBoundary` narrows with `isHTTPError` before rendering. On that reading a thrown `MultipartError` falls to the `500 internal server error` arm, and the 413/400/415 statuses `MULTIPART_REASON_STATUS` exists to produce never reach the client — while `errors.ts:20-21` documents the opposite ("Rendered by `createBoundary` like any other `HTTPError`-shaped throw"). I did not run it; the correctness ruling and the test that would pin it are yours. The documentation half is finding 5 in my lane.
- **To the objective lane** — `src/core/types.ts:358-362`, middleware. `SessionStoreInterface.set(id, session, now)` passes a separate id alongside the stored value, which `.claude/rules/architecture.md` § Stores forbids ("The stored value carries its own id; do not pass a separate id to `set`/`save`"). The payload type `S` is the consumer's and cannot be required to carry an id without constraining it, so whether the rule can be satisfied here without breaking the seam is a constraint question rather than a taste one. Flagged, not adjudicated.


## s11b — `## Referrals` block
Specifically evidenced questions outside the subjective lane, addressed to the Orchestrator. No verdict from me.

- `src/server/middlewares.ts:92-94, 141-146` — `createAssets` caches identity bytes, Brotli bytes, and ETag promises per key with no capacity bound and no eviction, and a rejected `computeBodyETag` promise stored at line 144 is retained and re-awaited on every later request for that key. Whether either is reachable enough to matter is a correctness and resource-exhaustion question.
- `src/server/MultipartParser.ts:151, 168` — whether `this.#staged.indexOf(path)` can return `-1` on any reachable path. If it can, `splice(-1, 1)` removes a different staged entry and leaks the intended temp file. Finding 13 repairs the shape regardless; the reachability is objective.
- `src/server/middlewares.ts:320-329` — the SPA fallback response carries no `ETag`, no `Content-Length`, and no `Cache-Control`, and reaches `open()` without the `dotfiles` screen the primary path applies at lines 225-228. Whether that asymmetry is intended is a correctness question the guide (`guides/middleware.md:427-428`) does not settle.


## h12 — questions verification left open
- Asset-cache growth in middleware static serving.
- `#staged` reachability in the multipart consumer.
- SPA fallback header asymmetry.
(Source: `h12-audit-verdict.md`, closing paragraph.)


## Output

Return: per question — the question restated in one line, the ruling, the probe path, the
command run, the decisive output excerpt, and the proposed repair for a DEFECT. No process
diary.
