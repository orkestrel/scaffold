# U7b audit round 3 claims (the second fix round)

Subject: the second fix round of unit U7b in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `sol` on Astra under `units/u7b-brief-4.md`, `units/u7b-brief-5.md`, and `units/u7b-brief-6.md` (the `toThrow` alias correction, the formatter on the owned file, and the gates to completion; retained under
`.orkestrel/veneer/units/`; carrying briefs 3 to 1), reports `units/u7b-report-4.md`, `units/u7b-report-5.md`, and `units/u7b-report-6.md`, over the
round-2 tree on the tidy landing `91e5906`. Evidence rendered by the Orchestrator:
`units/u7b-diff-3.patch.txt` (`git diff 91e5906` plus `--no-index` renderings of the untracked
files) beside round 2's `units/u7b-diff-2.patch.txt` over the same base, and
`tmp/audit/u7b-status-3.txt`. Rule on the diff and the live files, never on the reports' word
alone. Scope: implementation only, by the user's ruling. Claims marked `[mechanical]` are the
checker's; every other lane rules on every claim. An extra finding is an implementation defect
the fix round introduced, with a site and a one-line failure scenario, numbered from 5.

1. Round-2 findings 8 and 9 closed: the delegate's prune key is root membership —
   `this.#root.contains(button.host)` keeps an engine and anything else is destroyed and dropped
   from the lookup and the ownership before target matching — so a fragment-rooted or
   detached-rooted delegate keeps its engines across clicks, and a host moved out of the root
   while still connected is pruned on the next click; `destroy()` still destroys every held
   engine.
2. The two cases: a fragment-rooted `data-bs-toggle` host clicked twice reads
   `aria-pressed="false"` after the second click with one engine reused; a host the delegate
   toggled and then moved outside the root (still connected) is pruned on a later click
   elsewhere with its class and attribute restored, and a consumer's `new Button(host)` then
   acquires it; both reddened on the `isConnected` key and are green on the root-membership key;
   every existing `Delegate` case (the mounted-root cases, the fragment root, the SVG target,
   the removed host, the nested roots, the consumer-owned host) stays green.
3. `[mechanical]` Scope and law: the round-3 diff differs from round 2's only in
   `src/browser/Delegate.ts` and `tests/src/browser/Delegate.test.ts`; the status shows only
   brief 3's owned set (plus `guides/veneer.md` from brief 3); no `any`, no assertion outside
   `as const`, no non-null assertion, no suppression, no skip; no case named for a control; no
   `PLANT` residue; the barrel and the export-set cases unchanged; the round-2 confirmations are
   not disturbed.
4. The gates report 6 records exit 0 (`format:check`, `lint:check`, `check`,
   `build:src:browser`, `test:src:browser` on Chromium and Edge); the verifier lane re-runs the
   whole chain on the host, `npm test` and `test:guides` included, and its reading rules this
   claim.
