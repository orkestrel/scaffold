Slice 4 is the loose ends. I'll read the brief and the lanes log as they stand, then the showcase status and the scaffold-propagation section.# Loose ends at `dc4654b`

## Requests to the engine session

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| Confirm the 0.0.88 pack differs only by the four script modes | done | Ask: `scaffold:.orkestrel/veneer/lanes.md:91`. Answer: `scaffold:.orkestrel/veneer/lanes.md:63`. | |
| Name the files and the cause of the host pack difference | done | Ask: `scaffold:.orkestrel/veneer/lanes.md:99`. Same answer: `scaffold:.orkestrel/veneer/lanes.md:63`. | |
| Start the veneer 0.0.88 visit | moot | Ask: `scaffold:.orkestrel/veneer/lanes.md:85`. The user ruled the engine lane does no scaffold work this stretch: `scaffold:.orkestrel/veneer/lanes.md:67`. | |
| In the next scaffold release, make `window.ts --publish` refuse a `DIR` whose `.git` is a file, or name the primary clone | partial | Ask: `scaffold:.orkestrel/veneer/lanes.md:83`. Noted for the next release: `scaffold:.orkestrel/veneer/lanes.md:65`. This stretch does no scaffold work: `scaffold:.orkestrel/veneer/lanes.md:67`. | The refusal is not in a release. |
| Carry `@orkestrel/browser` `^0.0.21` and the catalog row in the next scaffold release | done | Ask: `scaffold:.orkestrel/veneer/lanes.md:155`. The release commit does that: `scaffold:.orkestrel/veneer/lanes.md:113`. 0.0.88 is published: `scaffold:.orkestrel/veneer/lanes.md:76`. | |
| Say whether engine proofs need J8 in every variant or a journey at default motion | done | Ask: `scaffold:.orkestrel/veneer/lanes.md:212`. Answer: they do not: `scaffold:.orkestrel/veneer/lanes.md:197`. | |
| Rule on host-bound failures and on landing order | done | Ask: `scaffold:.orkestrel/veneer/lanes.md:248`. Accepted into § Rules: `scaffold:.orkestrel/veneer/lanes.md:216` and `:44`. | |
| Log each engine behavior change by table and row | done | Ask: `scaffold:.orkestrel/veneer/lanes.md:249`. The landing-order rule requires the prediction: `scaffold:.orkestrel/veneer/lanes.md:45`. Later entries do it, including `scaffold:.orkestrel/veneer/lanes.md:125`. | |

The 2026-10-02 block at `scaffold:.orkestrel/veneer/lanes.md:240` is labeled no ask. The engine entry still answered it: `createOracle` keeps its shape (`:219`), nested-menu Escape is read in `browser-engine` (`:225`), and a sliding carousel specimen is not needed (`:226`).

## Showcase units that wait on the engine lane

`showcase/status.md` has no § Remaining units. Planned items 1–4 run on `ccr-d15a48b1-yyyll6` and do not wait (`scaffold:.orkestrel/veneer/showcase/status.md:24`).

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| Docs, held off `main` until the 0.0.88 visit lands | moot | `scaffold:.orkestrel/veneer/showcase/status.md:20`. The visit does not start and no hold applies: `scaffold:.orkestrel/veneer/lanes.md:67`. | |
| Planned item 5, land nothing between visit-started and visit-landed | moot | `scaffold:.orkestrel/veneer/showcase/status.md:24` and `:34`. Same ruling: `scaffold:.orkestrel/veneer/lanes.md:67`. | |
| Showcase call sites for `createVeneer` and tip-boot opt-in | open | Not a status.md unit. The engine entry says those contracts change and the engine lane migrates the call sites in the same change: `scaffold:.orkestrel/veneer/lanes.md:69`. The tip still exports `createEngine` (`src/browser/factories.ts:170`) and still boots both tips (`src/browser/plugins.ts:284`, `:364`, `:374`). | Migrate `app/browser` when that change lands, and predict any moved statechart row before the landing. |

## Scaffold propagation

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| 1 CSS faces | done | Adopted 2026-10-01: `ROADMAP.md:153`. | |
| 2 Vue browser extension | done | Adopted 2026-10-01: `ROADMAP.md:154`. | |
| 3 Showcase and journey modes | done | Adopted 2026-10-01: `ROADMAP.md:155`. | |
| 4 Core externals and browser specifiers | done | Adopted 2026-10-01: `ROADMAP.md:156`. | |
| 5 Framework import refusals | done | Adopted 2026-10-01: `ROADMAP.md:157`. The Vue chunk still declares the optional peer; that is chunk 5, not this item. | |
| 6 Browser dependency optimization | done | Adopted 2026-10-01: `ROADMAP.md:158`. | |
| 7 `*.min.*` formatter ignore | done | Adopted 2026-10-02: `ROADMAP.md:159`. | |
| 8 `browse` server | done | Adopted 2026-10-02: `ROADMAP.md:160`. | |
| 9 `plugins.ts` kind and `create…Plugin` | partial | `ROADMAP.md:161` says the scaffold commit is unreleased and veneer carries `configs/policy.ts` and the `.oxlintrc.json` line by hand. Those lines are still present (`configs/policy.ts:1453`, `.oxlintrc.json:112`). Veneer still depends on scaffold `^0.0.87` (`package.json:139`). The log says 0.0.88 carries the name-form repair (`scaffold:.orkestrel/veneer/lanes.md:161`) and that this stretch does not adopt it (`scaffold:.orkestrel/veneer/lanes.md:67`). The tarball’s copy of the rule was not opened. | No step beyond adopting 0.0.88. The hand copy stays until that visit. |
| Publication | open | `ROADMAP.md:165` leaves publication as a separate decision. | Who publishes the next scaffold release. |

## Guide sentences the tip contradicts

Checked against the tip: Core’s class census (`guides/veneer.md:556`, `tests/setup.test.ts:462`), Browser boot and phases (`guides/veneer.md:578`, `src/browser/Engine.ts:70`, `:74`, `src/browser/factories.ts:170`), Browser’s stage A close (`guides/veneer.md:939`), Tailwind’s 2025-name exclusion (`guides/veneer.md:1218`), and the Styles empty pack (`guides/veneer.md:1308`, `guides/veneer.md:1353`, `src/styles/themes/_default.scss`). Those sentences match the tip. An exhaustive pass over every sentence of the five sections was not done.

| item | status | evidence | decision |
| --- | --- | --- | --- |
| Stage B is a later chunk; tip boot stays in the default plugins; the boot scope keeps the name `Engine` | done | `guides/veneer.md:939`. The tip still has `createEngine` (`src/browser/factories.ts:170`), `class Engine` (`src/browser/Engine.ts:20`), and both tip boots (`src/browser/plugins.ts:284`, `:364`). | The tip does not contradict this sentence. The unlanded ruling does: `scaffold:.orkestrel/veneer/lanes.md:69`. |

Counts. Requests: done 6, partial 1, open 0, moot 1. Showcase waits: done 0, partial 0, open 1, moot 2. Propagation: done 8, partial 1, open 1, moot 0. Guide: done 1, partial 0, open 0, moot 0.