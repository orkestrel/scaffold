**Question**

In Chromium 153.0.8010.12 with default flags, which of these are enabled at runtime?
- the full popover=hint model (the new behavior)
- `interactivity: inert`
- focusgroup
- `interestfor`, `InterestEvent` and `::interest-button`
- `position-visibility: anchors-visible` and `no-overflow`, plus the computed initial value
- `TransitionEvent.animation`
- `document.activeViewTransition`
- `ViewTransition.waitUntil()`
- `:target-before` and `:target-after`
- the dialog focusing steps from HTML PR 8199

**How Chromium decides**

All Chromium source evidence comes from tag 153.0.8010.12, read through Sourcegraph with `rev:153.0.8010.12`. Line numbers differ from main, which confirms the right revision was searched. The rules used:
- A flag with `status: "stable"` in `third_party/blink/renderer/platform/runtime_enabled_features.json5` is on by default.
- A flag with `"experimental"` is off unless the experimental web platform features switch is set.
- A flag that is missing from the file has been removed, so the feature is always on.
- None of these flag names appear in `testing/variations/fieldtrial_testing_config.json` at 153. A check that `enable_features` matches in that file confirmed the search works, so field-trial testing config does not override any of them.

**Facts**

| # | Claim | Source | Date | Quote |
|---|---|---|---|---|
| 1 | The popover=hint new-behavior flag is stable at 153. Its comment records the M150 ship, Finch disable, M151 re-enable and an M153 tweak. | runtime_enabled_features.json5@153:4721-4727 | tag 153.0.8010.12 | "shipped in M150, was disabled via Finch, and was re-enabled in M151. The behavior was tweaked slightly in M153"; `status: "stable"` |
| 2 | `PopoverHintNestedShowException` is stable at 153: `showPopover()` throws when called during another popover show or hide. | json5@153:4714-4718 | same | "Makes showPopover() throw an exception instead of just logging a console message" |
| 3 | The chromestatus entry for the popover=hint behavior changes still reads "Proposed" (desktop 150, Finch name `PopoverHintNewBehavior`). The base popover=hint entry is "Enabled by default", 133, `HTMLPopoverHint`. | https://chromestatus.com/feature/6282804208992256 ; https://chromestatus.com/feature/5073251081912320 | fetched 2026-10-03 | "Proposed" / "Enabled by default" |
| 4 | The Chrome 150 release notes list the popover=hint behavior changes. | https://developer.chrome.com/release-notes/150 | 2026-06-30 | "Opening a hint popover does not inadvertently close unrelated auto popovers" |
| 5 | The `interactivity` CSS property has no `runtime_flag`. Its keywords are `auto` and `inert`, and the default is `auto`. | third_party/blink/renderer/core/css/css_properties.json5@153:4100-4110 | same | `keywords: ["auto", "inert"]`, `default_value: "auto"` |
| 6 | No flag containing `CSSInert` or `Interactivity` exists in the json5 at 153 (regex search: zero matches), so the flag has been removed. | json5@153 (search) | same | (no entry) |
| 7 | Chromestatus lists CSS Inertness as "Enabled by default" (desktop 135, Finch `CSSInert`). The Chrome 135 release notes list it too. | https://chromestatus.com/feature/5107436833472512 ; https://developer.chrome.com/release-notes/135 | 2025-04-01 | "CSS Inertness—the `interactivity` property" |
| 8 | The `Focusgroup` flag is stable at 153. `FocusgroupV2` is experimental and depends on Focusgroup. | json5@153:3175-3182 | same | `name: "Focusgroup", status: "stable"` |
| 9 | Chromestatus Focusgroup still reads "In developer trial (Behind a flag)" (desktop 150, Finch `Focusgroup`). The Chrome 150 release notes list Focusgroup. FocusgroupV2 (grid and feed) reads "Proposed" and has not shipped. | https://chromestatus.com/feature/5637601087193088 ; https://chromestatus.com/feature/5168133036965888 ; release-notes/150 | 2026-06-30 | "declaratively give composite widgets arrow key navigation" |
| 10 | `interestForElement` has no `RuntimeEnabled` attribute (it reflects `interestfor`). | third_party/blink/renderer/core/dom/interest_invoker_element.idl@153:5 | same | `[CEReactions,Reflect=interestfor] attribute Element? interestForElement;` |
| 11 | The `InterestEvent` interface has no `RuntimeEnabled` attribute. It has a `source` attribute and a constructor. | third_party/blink/renderer/core/events/interest_event.idl@153 | same | `[Exposed=Window] interface InterestEvent : Event` |
| 12 | The only `InterestFor` flag left in the json5 at 153 is the interest-button pseudo, and it is experimental. `HTMLInterestForAttribute` has been removed. `InterestEventsNonComposed` is stable. | json5@153:3535-3536, 3725-3726 | same | `name: "HTMLInterestForInterestButtonPseudo", status: "experimental"` |
| 13 | Chromestatus Interest Invokers reads "Origin trial" (desktop 142, Finch `HTMLInterestForAttribute`). The Chrome 142 release notes list it as shipped. | https://chromestatus.com/feature/4530756656562176 ; https://developer.chrome.com/release-notes/142 | 2025-10-28 | "Interest Invokers (the `interestfor` attribute)" |
| 14 | `position-visibility` has no `runtime_flag`. Its keywords are `always`, `anchors-visible` and `no-overflow`, and the default is `kAnchorsVisible`. `anchors-valid` is not supported yet. | css_properties.json5@153:5359-5372 | same | `default_value: "PositionVisibility::kAnchorsVisible"`; "TODO(crbug.com/332933527): Support anchors-valid." |
| 15 | The current spec grammar uses singular keywords, and its initial value is `anchor-visible`. | https://github.com/w3c/csswg-drafts css-anchor-position-1/Overview.bs:2221-2223 (propdef for #position-visibility) | ED, main | `Value: always \| [ anchor-valid \|\| anchor-visible \|\| no-overflow ]`; `Initial: anchor-visible` |
| 16 | The singular keywords and `anchor-valid` are planned for desktop 157 on chromestatus (both "Proposed"). | https://chromestatus.com/feature/5136123851571200 ; https://chromestatus.com/feature/5136856479039488 | fetched 2026-10-03 | "deprecate the plural versions" |
| 17 | `TransitionEvent.animation` is gated by `AnimationEventAnimation`, which is stable at 153. | transition_event.idl@153; json5@153:611-613 | same | `[RuntimeEnabled=AnimationEventAnimation] readonly attribute Animation? animation;` |
| 18 | Chromestatus for the animation accessor reads "Proposed" (151). The Chrome 151 release notes list it. | https://chromestatus.com/feature/6046278267043840 ; https://developer.chrome.com/release-notes/151 | 2026-07-28 | "Adds a read-only `animation` attribute to the `AnimationEvent`" |
| 19 | `document.activeViewTransition` is gated by `DocumentActiveViewTransition`, which is stable at 153. | core/view_transition/view_transition_supplement.idl@153:11; json5@153:2405-2406 | same | `RuntimeEnabled=DocumentActiveViewTransition] readonly attribute ViewTransition? activeViewTransition;` |
| 20 | Chromestatus for activeViewTransition reads "Proposed" (142). The Chrome 142 release notes list it. | https://chromestatus.com/feature/5067126381215744 ; release-notes/142 | 2025-10-28 | "`activeViewTransition` property on document" |
| 21 | `ViewTransition.waitUntil()` is gated by `ViewTransitionWaitUntil`, which is stable at 153. | core/view_transition/view_transition.idl@153:48; json5@153:6711-6712 | same | `[RuntimeEnabled=ViewTransitionWaitUntil, CallWith=ScriptState] void waitUntil(Promise<any> promise);` |
| 22 | Chromestatus for waitUntil reads "Proposed" (144). The Chrome 144 release notes list it. | https://chromestatus.com/feature/4812903832223744 ; https://developer.chrome.com/release-notes/144 | 2026-01-13 | "delays destruction of the pseudo-tree until it settles" |
| 23 | `:target-before` and `:target-after` (pseudo-classes for scroll markers) are behind `CSSScrollMarkerTargetBeforeAfter`, which is stable at 153. | json5@153:1937-1938 (comment cites css-overflow-5 #active-before-after-scroll-markers) | same | ":target-before and :target-after pseudo classes for scroll markers." |
| 24 | Chromestatus for these pseudo-classes reads "Proposed" (142). The Chrome 142 release notes list them. | https://chromestatus.com/feature/5120827674722304 ; release-notes/142 | 2025-10-28 | "match scroll markers before or after the active marker" |
| 25 | `DialogNewFocusBehavior` is experimental at 153. | json5@153:2264-2265 | same | `name: "DialogNewFocusBehavior", status: "experimental"` |
| 26 | Both `show()` and `showModal()` branch on that flag. With the flag off they call `SetFocusForDialogLegacy`, which scans the flat tree for any focusable element and falls back to the dialog. `SetFocusForDialog` cites the spec focusing steps and uses `GetFocusDelegate`, with dialog `autofocus` taking priority. | core/html/html_dialog_element.cc@153 ~480-484, ~610 | same | `if (RuntimeEnabledFeatures::DialogNewFocusBehaviorEnabled()) { SetFocusForDialog(); } else { SetFocusForDialogLegacy(this); }` |
| 27 | HTML PR 8199 was merged on 2023-01-26. It changed the focusing steps to use sequentially focusable elements, focus the dialog if it has `autofocus`, and fall back to the dialog. | https://github.com/whatwg/html/pull/8199 | 2023-01-26 | "Implement dialog initial focus proposal" |
| 28 | Chromestatus for the dialog focus update reads "Enabled by default", flag `--enable-features=DialogNewFocusBehavior`. The blink-dev Intent to Ship says M111, with a Finch kill switch. | https://chromestatus.com/feature/4675914745511936 ; https://groups.google.com/a/chromium.org/g/blink-dev/c/CEL3wWHrTAQ | 2023-01 | "just in case we're wrong about all this" |
| 29 | None of the flags above appear in the field-trial testing config at 153. | testing/variations/fieldtrial_testing_config.json@153 (search: 0 matches) | same | (no entry) |

**Matrix** (runtime state in Chromium 153.0.8010.12 with default flags)

| Item | Evidence for enabled | Evidence against / contradiction |
|---|---|---|
| popover=hint new model | F1 (stable, with an M153 tweak), F2, F4 | F3: chromestatus still "Proposed"; Finch history (disabled after M150) |
| `interactivity: inert` | F5 (property not gated), F6 (flag removed), F7 | None in source. The disclosure report's "unclear" status comes from not checking the source. |
| focusgroup (v1) | F8 (stable), F9 release notes 150 | F9: chromestatus still "In developer trial (Behind a flag)" |
| FocusgroupV2 (grid/feed) | none | F8 (experimental), F9 (Proposed, not shipped) |
| `interestfor` and `InterestEvent` | F10 and F11 (IDL not gated), F12 (`HTMLInterestForAttribute` removed), F13 release notes 142 | F13: chromestatus still "Origin trial" |
| `::interest-button` | none | F12 (experimental) |
| `position-visibility` `anchors-visible` and `no-overflow` | F14 (not gated, both keywords parse) | none |
| `position-visibility` computed initial value | F14: Chromium's internal default is `kAnchorsVisible` (plural) | F15: the current spec initial is the singular `anchor-visible`. F16: singular keywords not before 157. `anchors-valid` not supported (F14). |
| `TransitionEvent.animation` | F17 (stable), F18 release notes 151 | F18: chromestatus "Proposed" |
| `document.activeViewTransition` | F19 (stable), F20 release notes 142 | F20: chromestatus "Proposed" |
| `ViewTransition.waitUntil` | F21 (stable), F22 release notes 144 | F22: chromestatus "Proposed" |
| `:target-before` and `:target-after` | F23 (stable), F24 release notes 142 | F24: chromestatus "Proposed". These match scroll markers only. |
| Dialog focusing steps (PR 8199) | F28: chromestatus "Enabled by default", Intent to Ship M111 | F25 (experimental at 153), F26 (legacy path runs with default flags) |

**Unknowns**

- Why `DialogNewFocusBehavior` is experimental at 153 when chromestatus says "Enabled by default". I found no revert or disable record from a primary source, so the history is unverified.
- Branded Chrome Finch configs, which differ from the Chromium testing config, could flip any of these flags. Only the testing config was checked.
- What `getComputedStyle` returns for `position-visibility` at 153: whether it serializes `anchors-visible`, and whether combinations like `anchors-visible no-overflow` parse. The 3-bit field hints at combinations but is not proof.
- The chromestatus milestone in which `position-visibility` first shipped was not found.
- The absence of the `HTMLPopoverHint` and `HTMLInterestForAttribute` entries at 153 rests on the Sourcegraph name-match output. I did not read the full file line by line.
- What changed in the M153 popover=hint tweak (crbug.com/499019927) was not read.
- Whether `focusgroup` is exposed as an IDL attribute or as an HTML attribute only at 153 was not checked.
- The `elements` repo (`C:\Users\mikes\WebstormProjects\elements\guides\w3c\`) was found but not used, because it is not a primary source.