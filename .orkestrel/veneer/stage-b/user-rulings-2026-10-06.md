# Stage B rulings of 2026-10-06

The user's answers to the seven questions the stage B verdict leaves to the user (`browser-stage-b-verdict.md` § What the user must rule), put to the user after B4's engine half landed at veneer `6b99552`. Each item carries the user's words and the resolution the session owes.

| # | Question | The user's ruling | Resolution owed |
| --- | --- | --- | --- |
| 1 | Gutter shape | "Proceed as recommended": the typed `stable` leaf that acts only where the root declares a stable `scrollbar-gutter` (option b). | B0 and B2 carry it; D-5 follows. |
| 2 | Classic-scrollbar instrument | "Do not create superfluous configs, find another way, see what makes sense with the configs we already have." | Research the existing configuration (`configs/browsers.ts`, the Vitest projects, the scaffold-owned files) for a way to run the lock and gutter proofs with a classic scrollbar without an added configuration file; put the options to the user with one recommendation. |
| 3 | Native modal limits | "I don't understand what the issue and the limits are, make sure you thoroughly research how we did this in the elements repo. It wasn't perfect but it answered a lot of questions and issues." | A research round over the elements clone and the existing distillates, then an explanation of each limit and of what elements did; no acceptance is recorded until the user rules on the explanation. |
| 4 | Non-cancelable forced-close events | "Sounds fine, what are the issues I should be worried about?" | Accepted; the session states the consequences for a page author. |
| 5 | Scope refusals and deferrals | "Provide me your assessment of why so I can make informed choices." | The assessment per item, with the evidence; no refusal or deferral is final until the user rules. |
| 6 | P0 repair timing | "Understood" (moot: P0 found no repair; P0b landed the departure as documentation). | Closed. |
| 7 | Chromium floor D-10 | "Sounds good" (153), "make sure we are using the latest version of browser and probe, and any orkestrel package, as a matter of fact." | D-10 is 153. A fleet version check over every `@orkestrel/*` dependency (and the tooling pins) against the registry, then re-pins where behind. |
