# J-TOOLTIP round 7 (the two hide-takeover sentences): report

Retained 2026-09-24 from the writer's returned report (`opus` on Opus 5.5, agent ac01697e5b3344cdc, under `j-tooltip-brief-7.md`, worktree `tmp/worktrees/tooltip`).

I've made the two sentence corrections for round 7. The format check and `npm run test:guides` both exit 0, and the three files are staged with nothing unstaged or unmerged. Nothing is committed.

**The class TSDoc had no copy of the guide sentence to correct.** The only copy in `Tooltip.ts` is the comment on the `#change` field, so I corrected that and left the class doc block as it was. If you want the sentence in the class TSDoc itself, that's a small follow-up.

## N1: `TooltipInterface.show` `@remarks` (`src/browser/types.ts`)
> A listener, a content function, the sanitizer, or a custom element's reaction that runs during the call can destroy the tooltip or move the tip, and a hide can take the call over while the tip is shown, a settled tip's rebuild included; the call then resolves false, writes and dispatches nothing more apart from returning the elements it moved into an unfinished tip, and leaves the tip where that code put it. A hide asked before a fresh tip's `shown` token write is refused, and the show completes.

The promotion-bound sentence after it is unchanged.

## N2: the guide's door text (`guides/veneer.md`, `#### Tooltip`)
> A hide takes a show over while the tip is shown: after a fresh tip's `shown` token write, or during a settled tip's rebuild from its `show.vn.tooltip` dispatch until the old tip's removal. A hide asked before a fresh tip's token write is refused and resolves `false`, and a hide a `shown.vn.tooltip` listener starts is a separate change after the release that undoes nothing the completed show announced.

I ended the rebuild window at "until the old tip's removal" rather than leaving it open, as the brief lets me settle the wording. Once the old tip is removed, the rebuild's new tip is fresh and has no `shown` token yet, so a hide asked at that point is refused like any other.

The `Tooltip.ts` comment now reads:
> A hide takes a show over while the tip is shown, after a fresh tip's `shown` token write or during a settled tip's rebuild from its show dispatch until the old tip's removal, and the show then reads that it no longer holds its change; a hide asked before a fresh tip's token write is refused.

## N3: exits
- `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts src/browser/Tooltip.ts guides/veneer.md`: exit 0, "All matched files use the correct format."
- `npm run test:guides`: exit 0, `Tests 20 passed (20)`.
- The round's diff before staging was `guides/veneer.md` +5/−2, `src/browser/Tooltip.ts` +4/−2, and `src/browser/types.ts` +5/−3. The edit script is `tmp/j-tooltip/round7_sentences.py`, and the two logs are `round7-format.log.txt` and `round7-guides.log.txt`.

I changed nothing else and made no `prove` call.

## The Orchestrator's note

The class TSDoc carries no copy of the hide-takeover sentence, so the `#change` comment is the right second site; no follow-up is opened.
