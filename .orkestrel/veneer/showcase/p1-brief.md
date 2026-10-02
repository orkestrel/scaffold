# Unit P1: polish the veneer showcase from its captures

## Role and engine

GPT-6 Astra implementation lane through `codex exec`, sandbox `danger-full-access` on the Linux cloud host. Perform the work yourself and spawn nothing. View the capture images with your image viewer; when you cannot view an image, stop and report that before any edit.

## Objective

Make the showcase page look simple, calm, and professional in all four variants, with every specimen visible, legible, and evenly spaced, through class and markup changes in the page source only.

## Context

- **Checkout.** `/home/user/veneer`, branch `ccr-d15a48b1-yyyll6` at `8a84e5f`, clean. You are its only writer. Before every `npm` or `node` command, run `export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true`. Run vite and vitest through `./node_modules/.bin/`. Run `npm run build` before any journey.
- **A second lane runs beside you** in `/home/user/.wave/veneer-wt-sc` and writes only test files. Wrap every journey run in `flock /home/user/.wave/journey.lock`, for example `flock /home/user/.wave/journey.lock env CAPTURE=1 npm run test:journey`.
- **Captures.** `CAPTURE=1 npm run test:journey` writes the portfolio under `tmp/captures/states/` as `STATE--VARIANT.png`, 76 states in each of `light-1280`, `dark-1280`, `light-390`, and `dark-390`, including `arrival`, `contents-index`, and `group-rhythm`.
- **The page.** `app/browser/factories.ts` builds the frame (banner, contents, groups, sections, figures, matrices); `app/browser/sections/*.html` holds the specimens; `app/browser/constants.ts` registers sections and groups. Bootstrap 5.3.8 classes only, plus `bootstrap-icons`; no inline `style` attribute, no new stylesheet.
- **Round 1.** A design verdict ranked ten findings and a class-only round fixed most of them. Two stay open: in the row-cols matrix of `grid.html`, the Base-column chips for 5 and 6 crowd at 390 px because a column is narrower than one bordered digit; and dropping `h-100` from the figure cards removed empty card bodies but left paired cards' bottoms uneven.
- **Canon.** `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` for every caption you touch, and `/home/user/scaffold/.agents/skills/orkestrel-journey/references/captures.md`.

## Do

1. Run `npm run build`, then `flock /home/user/.wave/journey.lock env CAPTURE=1 npm run test:journey`, and view every capture of `light-1280` and `dark-390` and the `arrival`, `contents-index`, and `group-rhythm` captures of all four variants.
2. Judge each against this checklist and list every finding with its capture paths: no horizontal page overflow; no clipped, overlapping, or crowded specimen; no class token broken across lines inside a word; every specimen visible in both color modes (a fixed light or dark variant sits on a surface that shows it); every control and caption legible in dark mode; one spacing rhythm between groups, sections, and figures; aligned card edges where cards sit side by side; captions short, calm, and free of repeated narration; matrices legible at 390, scrolling inside their own region where wide.
3. Fix each finding in `app/browser/` with Bootstrap classes or markup, keeping every `CLASS_NAMES.bootstrap` leaf on the page (the census in `tests/app/browser/sections/integration.test.ts` and `factories.test.ts` reddens when a leaf disappears). Rule the two open items: give each row-cols chip enough room at 390 or show fewer columns there with a caption that says so; and either pair figures of similar height or restore equal-height cards where the empty body stays small, by what the captures show.
4. Recapture and view every changed state in all four variants; report each finding with its before and after paths.
5. Gates, each read bare with its exit code: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build:showcase`, `npm run test:app:browser`, `npm run test:setup:browser`, `flock /home/user/.wave/journey.lock npm run test:journey`, and `npm run test:policy`. Commit the rebuilt `showcase/browser.html`.
6. Commit as one unit in the repository's message style with the trailers `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV` on their own lines. Never push. No installs, no network, no edits outside `app/browser/`, `showcase/browser.html`, and `tests/app/browser/` other than `tests/app/browser/integration.test.ts`.

## Output

Your final message is the report: every finding with its capture paths before and after and the change that closed it, the two ruled items with the evidence, each gate with its exit code and counts, the commit hash, and any deviation (expected, found, evidence).

## Deviation contract

When a gate fails, find the cause and fix it inside the owned files. Stop and report when a fix needs a stylesheet or a file outside them, when a fix would drop a registry leaf from the page, or when the sandbox refuses an action. Never work around a refusal with another write mechanism.
