# Engine session decisions

The engine session's rulings, numbered `E<n>` per D44. A ruling that moves the baseline session's scope or the campaign's exit criterion is a question for the user, never a row here.

## E1 — The engine session's branch is `claude/j-engine` in both repositories (2026-09-23)

This harness is Claude Code on the user's Windows machine, which designates no branch, so the session designates `claude/j-engine` in Veneer and in scaffold, each created from `origin/main` (Veneer `746d3e9`, scaffold `e5d9ab69`). The session pushes that branch after every commit, fast-forwards Veneer `main` after a gated landing and scaffold `main` after a records commit, and never pushes the baseline session's branch `claude/inspiring-allen-t4qzv1`.

## E2 — The engine session writes Veneer through a worktree beside the user's checkout (2026-09-23)

The user's own Veneer checkout at `C:/Users/mikes/WebstormProjects/veneer` stays on `main` as they left it, its uncommitted `prompt.txt` edit included. The session's integration checkout is the worktree `C:/Users/mikes/WebstormProjects/veneer-engine` on `claude/j-engine`. Each writing unit takes its own worktree `C:/Users/mikes/WebstormProjects/veneer-<unit>` on `unit/<unit>`, branched from the committed `claude/j-engine` tip it names as its base, and its landing cherry-picks onto `claude/j-engine`. One writer per checkout.

## E3 — Every receipt names the Playwright-managed Chromium this host launches (2026-09-23)

The vendored `configs/browsers.ts` resolver takes the pinned managed revision before any system channel, and this host carries Playwright `1.63.0`'s pinned `chromium-1243` (Chromium `153.0.8010.12`, `HeadlessChrome/153.0.0.0`) under `%LOCALAPPDATA%/ms-playwright`. Every browser project and every probe runs there, and every receipt names that build. Microsoft Edge `153.0.4234.48` is the verified system channel the resolver would fall back to and is not the receipt host. The kickoff brief's Chromium 141 readings belong to the cloud container the baseline session runs in; the platform readings this session rules on come from the probe suite run here.
