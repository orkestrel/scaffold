# Showcase status: the parallel cloud session

Read `../lanes.md` first: it holds the lane contract between this session and the engine session, and their message log.

Informational. The cloud session on the branch `ccr-d15a48b1-yyyll6` owns the veneer showcase, the journeys, `browse`, and their run cost, is active on 2026-10-03, and has not handed this work off. Do not start, resume, or reassign a unit in this file. Take the work over only after the user says the handoff has happened; the cloud session hands off when it reaches its weekly usage limit, and it rewrites § Status first. When the handoff happens without that rewrite, § In flight and § Planned are the state to resume from.

## Status

| Row | Value |
| --- | --- |
| Handoff | not handed off; the cloud session is active (2026-10-03) |
| Veneer main | `dc4654b` (the engine session's closing records) over `959ed49` (`browser-repair`) over `43ca8a0`, the showcase landing: the page, 18 component statecharts, and the tuned journeys (60 tests, 218 to 227 s on the cloud host against 353 s) |
| Integration branch | veneer `ccr-d15a48b1-yyyll6` at `43ca8a0`, behind `main`; merge `main` into it before the next unit |
| Page | `showcase/browser.html` on veneer main, built by `npm run build:showcase`; download from GitHub at `showcase/browser.html` on `main` |
| Browse | `browse.md` beside this file: browser 0.0.21 is released (the outline parent index), ollama is re-pinned, and roadmap items 6 to 12 are open |

## In flight

**Publishing scaffold 0.0.88**, which the user handed to this session on 2026-10-03 (`../lanes.md`, 2026-10-03, "publish scaffold 0.0.88; `browser-repair` predicted"). State:

- The test fix is on scaffold `main` as `a8dcfb8` (patch kept beside this file as `scaffold-0.0.88-listing.patch`): `tests/src/core/templates.test.ts` (the case `lists and runs browser, sheet, guides, and integration projects unscoped`) parsed `vitest list --json` from the first `[` on stdout, and on Linux Vite's dependency optimizer prints `[vite] (client) [optimizer] bundling dependencies...` there on every run; the listing goes to a file with `--json=FILE`. With it, `prepublishOnly` exits 0 on the cloud host in 509 s. The package holds no test file.
- The pack differs by host: the cloud host packs 2,741,275 bytes, `sha512-xVC+B08yYQOWX32vMbRSeY5LrpuyQ2V94JFXqqupfaqng+vU/QS//Su53J7KiVEOOPU2cH2gtmpjBrFGnx72Zw==` (the same on two builds), against the engine session's 2,741,267 bytes, `sha512-gR40Nc+w/4BeQoNm8g2BqNH2Bdy9CMZEeDR53IZmAGI0P0DGdJt4DgndB3aG0QaadkYXE8x4bkD8s38JDBVYJQ==`, 230 entries each. This host's per-file listing is `scaffold-0.0.88-pack-linux.txt`, written by `pack-list.cjs` (`path mode size sha256`), both beside this file. The likely cause is the tar mode: this pack stores `dist/host/scripts/codex.sh`, `cursor.sh`, `deps.sh`, and `ollama.sh` as `755`, as git tracks them (`100755`), and a Windows pack cannot record an executable bit; scaffold writes `0o755` itself when it vendors an executable file (`src/server/helpers.ts:1460`, `:1711`; `src/server/WriteTransaction.ts:295`), so a workspace gets the same files from either pack. `../lanes.md` (2026-10-03, "the pack differs by host" and "the mode column") asks the engine session to confirm with the mode column.
- Next, in order: the engine session confirms the differing entries; the user rules which pack ships (the cloud session recommends the cloud pack, which matches git's modes); when the user rules the engine session's pack, the engine session uploads it from its host and logs the integrity; when the user rules the cloud pack, the showcase session uploads a pack whose integrity equals `sha512-xVC+B08…` with the user's code (`npm publish --ignore-scripts --otp=CODE` from the packed tree, or `window.ts --publish`); confirm `npm view @orkestrel/scaffold@0.0.88 dist.integrity` equals the shipped pack and `dist.tarball` answers 200; log both in `../lanes.md`, which starts the engine session's 0.0.88 visit and its hold on veneer `main`.

## Planned, in order

Items 2 to 5 run on `ccr-d15a48b1-yyyll6` while item 1 waits on the engine session or the user; only item 6's landing waits on item 1 and the 0.0.88 visit.

1. Finish the scaffold 0.0.88 publish (§ In flight).
2. **Docs:** extend `## Showcase` in `guides/veneer.md` (line 1623 at `dc4654b`; its nine subsections from `### Faces` to `### Serve the page for browse` are the showcase lane's), keeping each existing subsection unless a topic replaces it, and log any edit to `## Tests` in `../lanes.md`. Cover what the page shows and how it is built, the two faces, the journey families and what each proves, the component statecharts and their variant placement, the reduced-motion declaration, how to iterate on one variant, and the capture portfolio. Keep every sentence checkable against a test or the page.
3. **Falsify:** one adversarial round over the showcase claims (an objective lane on the journeys, statecharts, and readings; a subjective lane on the rendered page from a `CAPTURE=1` portfolio), then a completeness critic; fix units for what it rules.
4. **Open readings to rule in that round:**
   - No live disabled control exists for a statechart refusal row. Since `browser-engine` the engine refuses a CSS-disabled alert dismiss, toast dismiss, tab, offcanvas toggle and dismiss, and modal dismiss, and a disabled dropdown toggle; a CSS-disabled button toggle still toggles, and the modal toggle route has no disabled guard (veneer `src/browser/plugins.ts`, `restricted: true`). Live disabled specimens for the refusing families would let the tables prove those refusals (`s1b-report.md`).
   - The toggle-button figure (`app/browser/sections/buttons.html:162`, captioned "Toggle buttons, pressed and not pressed") keeps a light surface in dark mode, as capture `buttons--dark-390.png` of a `CAPTURE=1` run at `0df5a3b` shows (`P1`, `p1-report.md`).
   - The journey gate's sampled peak memory reached 12,288,905,216 bytes of the 14,345,035,776-byte cap with four concurrent projects.
   - The engine session's warning: a test that moves the real mouse can leave it over the page for a later file; the tooltip table hovers through the journey layer.
5. **Browse:** roadmap items 9, 10, 11, and 12, then 6 and 7 (`browse.md`).
6. Merge `main` and land each accepted state on veneer `main` under `../lanes.md` § Rules. Land nothing between the engine session's 0.0.88 visit-started and visit-landed entries in `../lanes.md` § Log; after visit-landed, merge `main` again, rebuild `showcase/browser.html`, and re-read § Host-bound set by title.

## Done

- `J0b` (`5d99d2e`, brief `j0b-brief.md`, report `j0b-report.md`): each variant project reads its own variant; the gate fell from 464.65 s with an out-of-memory kill to 188.79 s.
- `R1` (`8a84e5f`, brief `r1-brief.md`, report `r1-report.md`): the face-invariance population, the derived pseudo list, the unexcluded-compile control over every Tailwind reading, the face and theme pairs, and the caption numbers.
- `P1` (`0df5a3b`, brief `p1-brief.md`, report `p1-report.md`): 16 rendered findings closed in `app/browser/`.
- `S1` and `S1b` (briefs `s1-brief.md`, `s1b-brief.md`, reports `s1-report.md`, `s1b-report.md`): the component statecharts, with the toast dismiss buttons named per toast.
- `B2` (`browse/b2-report.md`): the agent-facing browse recheck.
- `J0c` (scope `j0c-scope.md`, report `j0c-report.md`): the statechart wait budget with failure causes, the header tables and J7, J8, and the frozen refusal placed by variant dependence, reduced motion where no transition is proved, the redundant 1280 rows removed, one rebalance; two consecutive gates of 226.77 s and 217.89 s.
- Landing `43ca8a0` on veneer `main` with browser `^0.0.21`; the engine session adopted scaffold 0.0.87 and guide 0.0.24 (`ea80bb9`, `56c8293`).

## Rulings the showcase works under

- One single-file page built from `app/browser` by `appShowcase('browser')` shows every `CLASS_NAMES.bootstrap` leaf, alone and beside Tailwind, under two faces that differ only in the shipped sheets the document links.
- D1: full utility matrices. D3: `browse` runs are exploratory and never gate. D5: the page carries a committed Tailwind compile pinned to `tailwindcss` 4.3.3.
- The Tailwind preflight mirror uses `revert-layer` (`68c8f04`); the `[hidden]` row is the recipe's one named departure.
- `app/browser` is the showcase plus the live engine; the engine demonstration is the page's Interactions group.
- Every specimen is interactive and none carries `inert`; the page guards `href="#"` links and form submits; a static offcanvas specimen uses `showing`, because the engine opens every `.offcanvas.show` on load.
- `bootstrap-icons` 1.13.1 is a development dependency for the icon specimens.
- The page looks simple, calm, and professional: one concept per matrix, readable captions, no raw dumps.
- The journeys are tuned for substance, not seconds: remove repeated readings, waits a claim does not need, and redundant rows; never chase the last seconds (the user, 2026-10-02).

## Resume after the handoff

- Merge veneer `origin/main` into `ccr-d15a48b1-yyyll6` before the first unit, and log the merge in `../lanes.md`.
- Read `proposal.json` beside this file as the page's design of record.
- Run `npm run build` before the journeys, because the page reads `dist/src/bootstrap/index.css`.
- Iterate on one variant with `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project 'journey:VARIANT*' -t PATTERN`, where `VARIANT` is `light-1280`, `dark-1280`, `light-390`, or `dark-390` and `PATTERN` filters test names.
- Before landing on veneer `main`, read these gates bare: `format:check`, `lint:check`, `check`, `build`, `test:app:browser`, `test:setup:browser`, `test:src:browser`, `test:journey`, `test:integration`, and `test:policy`. Land only when every failure is in `../lanes.md` § Host-bound set, re-read by title after merging `959ed49` and later commits, and `src/`, `tests/src/`, and `tests/integration.test.ts` equal veneer `main` byte for byte.
- On a POSIX host, the `workspace-write` sandbox of `codex exec` denies the journeys' grandchild processes, loopback server, and `.git` writes, so the showcase's `astra` lanes run at `danger-full-access`.
- When the handoff happens mid-unit, the cloud session pushes its branches and any uncommitted lane state first and names them in § In flight.
- Treat the cloud host's `/home/user/.wave/` as lost when its container is reclaimed; this folder holds the durable copies of the briefs, reports, patch, and pack listing it cites.
