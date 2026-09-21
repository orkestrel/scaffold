# U7b audit round 2 claims (the fix round)

Subject: the fix round of unit U7b in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `sol` on Astra under `units/u7b-brief-3.md` (retained under
`.orkestrel/veneer/units/`; carrying briefs 2 and 1), report `units/u7b-report-3.md`, over the
round-1 tree (reports 1 and 2) on the tidy landing `91e5906`. Evidence rendered by the
Orchestrator: `units/u7b-diff-2.patch.txt` (`git diff 91e5906` plus `--no-index` renderings of
the untracked files) beside round 1's `units/u7b-diff.patch.txt` over the same base, and
`tmp/audit/u7b-status-2.txt`. Rule on the diff and the live files, never on the reports' word
alone. Scope: implementation only, by the user's ruling — no wording, comment, doc-block, or
guide-prose findings; the guide is judged by parity passing. Claims marked `[mechanical]` are
the checker's; every other lane rules on every claim. An extra finding is an implementation
defect the fix round introduced, with a site and a one-line failure scenario, numbered from 8.

1. Round-1 claim 2 closed: `tests/src/browser/Button.test.ts` observes the write order on an
   anchor host (`<a role="button">`) through `MutationObserver.takeRecords()` at event delivery —
   class before `aria-pressed` for pressing and for releasing, the event's detail, no pending
   mutations after delivery; the case reddened on a planted reversal of the anchor path's
   writes (`aria-pressed` before `class`) and is green on the shipped order; `src/browser/Button.ts`
   was restored byte-for-byte (the report's digest) and its shipped order is class, attribute,
   event.
2. Round-1 finding 14 closed: `src/browser/Delegate.ts`'s listener catches only an `AppError`
   whose `code` is `BUTTON_HOST_OWNED` (through `isAppError`) and returns without acquiring or
   toggling the host; no other error is swallowed; a consumer-owned `data-bs-toggle` host under
   a `Delegate` and two delegates over nested roots each produce no browser error event, the
   owner's engine toggles, and destroying the delegate leaves the other owner's engine intact;
   both cases reddened before the fix (recorded `BUTTON_HOST_OWNED` errors from the listener)
   and are green after.
3. Round-1 finding 15 closed: on every delegated click, before target matching, the delegate
   destroys and drops every held engine whose host's `isConnected` is `false` (restoring that
   detached host's class and attribute exactly), keeps connected hosts, and lets a
   consumer-held replacement acquire a pruned host; a reinserted pruned host gets a working
   replacement engine on its next click; `destroy()` still destroys every engine the delegate
   holds; the cases reddened before the fix and are green after.
4. The guide's parity minimum: `guides/veneer.md` carries one Surface row for each of
   `AppError`, `isAppError`, `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_TOGGLE`, `Button`,
   `ButtonDetail`, `ButtonEventMap`, `ButtonHooks`, `ButtonInterface`, `ButtonOptions`,
   `Delegate`, `DelegateInterface`, `DelegateOptions`, `bindEventMap`, `emitEvent`,
   `isButtonEvent`, `isButtonHost`, each Summary equal to the doc-block description paragraph as
   `findDrift` compares them, and `## Methods` tables keyed `ButtonInterface` (`toggle`,
   `destroy`) and `DelegateInterface` (`destroy`); `npm run test:guides` exit 0 with no parity
   assertion weakened; no other guide prose changed.
5. `[mechanical]` Scope and law: `git status --porcelain --untracked-files=all` shows only the
   brief-2 owned set plus `guides/veneer.md`; `src/styles/**`, `app/**`, `tests/app/**`,
   `tests/setup*.ts`, `tests/conformance*.ts`, `tests/distribution.test.ts`, `package.json`,
   `configs/**` absent from the diff; no `any`, no assertion outside `as const`, no non-null
   assertion, no suppression, no skip, no `public`/`private`/`protected`, no parameter property;
   every module-scope function added is exported and tested; no nested function outside the
   permitted callback forms; no case named for a control; no `PLANT` residue; the export-set
   cases unchanged from round 1 (no new export); the round-1 confirmations (claims 1, 3 to 12)
   are not disturbed by the fix round's edits.
6. `[mechanical]` No new surface: `package.json` `exports` and `sideEffects` unchanged;
   `src/browser/index.ts` unchanged from round 1; no `auto` entry, adapter, or Bootstrap method
   spelling under `src/`.
7. The gates the report records exit 0 (`format:check`, `lint:check`, `check`,
   `build:src:browser`, `test:src:core`, `test:src:browser` 41 passed on Chromium and Edge,
   `test:setup:browser` 15 passed on both, `test:guides` 18 passed); the verifier lane re-runs
   the whole chain on the host, `npm test` included, and its reading rules this claim.
