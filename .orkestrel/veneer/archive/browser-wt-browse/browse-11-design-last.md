Lower visible content in the inert capture before projection. The existing HTML and Markdown floor can preserve the resulting text without modification. However, **the literal claim that `read` carries exactly what a person sees is not established by this design**: native control captions, localized date rendering, and mathematical layout need additional capture capabilities. Replacing those readings with accessible names or serialized values would silently change the goal.

The floor-lowering rules below resolve the stopped option defect and define the supported cases. The unresolved cases remain acceptance blockers, not omissions to disguise as successful lowering. No reading required a change to `@orkestrel/html` or `@orkestrel/markdown`, so the dependency-change deviation condition did not fire.

The probe ran on Windows on 2026-10-03 with these versions.

| Component | Measured version |
|---|---|
| System Edge | `154.0.4258.53` |
| Edge V8 | `15.4.11.7` |
| CDP | `1.3` |
| Bundled Playwright Chromium | `153.0.8010.12` |
| Vitest | `4.1.11` |

`npm run test:probe -- tmp/probes/browse-11-floor.test.ts` exited 0: 1 test passed. The final run started at 08:14:39 and took 2.99 s. Edge performed the element measurements; bundled Chromium was launched to record its version, not to repeat the matrix. Main-world and isolated-world element readings and per-element accessibility readings compared equal. Accessibility is a document-level CDP reading, not a separate accessibility tree belonging to each JavaScript world.

Evidence is in `tmp/codex/browse-11-floor-readings.json`, `browse-11-floor.png`, `browse-11-modal.png`, `browse-11-scrolled.png`, and `browse-11-defaults.png`. The screenshots were inspected. The executable probe source is archived as `tmp/codex/browse-11-floor-probe.test.ts`. Visible and hidden paragraphs outside the floor population controlled the visibility instrument. Original `select` markup lost its label in both Markdown modes while a paragraph control survived; lowered markup retained that label in both modes. These controls establish the downstream loss rather than merely checking that a string was present in the fixture.

The following table records the normal page before opening the modal. `AX` means accessibility role / name / value; `—` means no value, and `∅` means an empty string. Every measured element computed `visibility: visible`. Display abbreviations are `B` = `block`, `IB` = `inline-block`, `I` = `inline`, and `N` = `none`. The SVG and MathML elements have no `innerText` property. Their surrounding document can still have rendered text.

| Element | Person-sees reading | Element `innerText` | AX role / name / value | Display |
|---|---|---|---|---|
| Form | `Form prose`, `Name`, `Typed form name` | `Form prose\n\nName ` | form / Contact / —; field textbox / Name / Typed form name | B |
| Open non-modal dialog | `Open dialog prose` | Same | dialog / Notice / —; modal false | B |
| Closed non-modal dialog | Nothing | `Closed dialog prose` | ignored / — / — | N |
| Modal before opening | Nothing | `Modal prose` | ignored / — / — | N |
| Modal after `showModal()` | `Modal prose`; dimmed background remains painted | `Modal prose` | dialog / Modal / —; modal true | B |
| Text button | `Save changes` | Same | button / Save changes / — | IB |
| Icon button | Magnifying-glass drawing; no printed label | ∅ | button / Search records / — | IB |
| Disabled button | `Unavailable action` | Same | button / Unavailable action / —; disabled true | IB |
| Single select | `Shown single` | `Default single\nSource single\nOther single` | combobox / Choice / Shown single | IB |
| Multiple select | First multi, Second multi, Third multi; first and third highlighted | All those labels | listbox / Choices / — | IB |
| Select with size 3 | First row, Second row, Third row | Also includes Fourth offscreen | listbox / Rows / — | IB |
| Select with optgroups | Group caption, Group first, Group second, Other caption, Group third | Only option text; group captions absent | listbox / Grouped / — | IB |
| Text input | `Typed text` | ∅ | textbox / text field / Typed text | IB |
| Email input | `typed@example.test` | ∅ | textbox / email field / typed@example.test | IB |
| Number input | `37` | ∅ | spinbutton / number field / 37 | IB |
| Search input | `Typed search` | ∅ | searchbox / search field / Typed search | IB |
| Password input | Masking dots | ∅ | textbox / password field / masking dots | IB |
| Checkbox | Checked square, no printed value | ∅ | checkbox / checkbox field / —; checked true | IB |
| Radio | Selected circle, no printed value | ∅ | radio / radio field / —; checked true | IB |
| Range input | Slider position, no printed number | ∅ | slider / range field / 73 | IB |
| Date input | `10/03/2026` | ∅ | Date / date field / 2026-10-03 | IB |
| Color input | Pale-blue swatch, no printed hex | ∅ | ColorWell / color field / #abcdef | IB |
| File input | `Choose File`, `visible-report.txt` | ∅ | button / file field / visible-report.txt | IB |
| Hidden input | Nothing | ∅ | ignored / — / — | N |
| Submit input | `submit default` | ∅ | button / submit field / — | IB |
| Reset input | `reset default` | ∅ | button / reset field / — | IB |
| Button input | `button default` | ∅ | button / button field / — | IB |
| Image input | Black disk, no printed label | ∅ | button / image field / — | IB |
| Textarea | `Typed notes`, then `Second line` | ∅ | textbox / Notes / Typed notes\nSecond line | IB |
| SVG with title | Star drawing, no printed title | unavailable | image / Star title / — | I |
| SVG with aria-label | Blue circle, no printed label | unavailable | image / Blue circle / — | I |
| Decorative SVG | Red circle, no printed title | unavailable | ignored / — / — | I |
| MathML | Fraction x over 2, plus y squared | unavailable | MathMLMath / Accessible equation / — | math |

The measured current/default pairs were: form `Typed form name` / `Form default`; text `Typed text` / `text default`; email `typed@example.test` / `default@example.test`; number `37` / `12`; search `Typed search` / `search default`; range `73` / `12`; date `2026-10-03` / `2026-01-02`; color `#abcdef` / `#123456`; textarea `Typed notes\nSecond line` / `Default notes`. Password values were redacted from the DOM readings. The file input’s DOM value was `C:\fakepath\visible-report.txt`, which was not the painted filename. The single select’s DOM value was `Source single`, which was not its painted `label`.

The supplementary native-default fixture painted `Submit`, `Reset`, `Choose File`, `No file chosen`, and the placeholder `Visible hint`. Each input had empty `value`, empty default, and empty `innerText`. Without the overriding ARIA labels, AX reported those native captions. Consequently neither `.value` nor an accessible-name helper can universally stand in for printed control text.

The listbox scroll probe measured a client height of 51 px and option heights of 17 px. At scrollTop 0, the fourth option lay outside the client area. At scrollTop 17, the first option lay outside and the fourth appeared. `innerText` remained unchanged. Test client-area intersection, not intersection with the outer border box. Keep page scrolling separate: an offscreen page paragraph remains document content under item 11’s existing rule.

Opening the modal left the background painted but removed its content from the exposed accessibility tree. Closing restored the modal’s `display: none`. AX membership therefore cannot determine visual inclusion. The MathML document `innerText` exposed mathematical italic x and y plus the digits and operator, but lost the fraction and exponent relationships. Its DOM `textContent` was `x2+y2`.

Apply these per-element lowering rulings only after live layout pruning. Use text nodes created in the inert document; never interpolate page strings into HTML source.

| Element | Lowering and source | Reason or acceptance blocker |
|---|---|---|
| `form` | Replace with an attribute-free neutral container; recursively preserve pruned prose, labels, links, and lowered controls. | Preserve structure and field values without retaining submission behavior or duplicating associated labels. |
| Open `dialog`, modal or non-modal | Neutral container with pruned descendants. | Its rendered content survives; modal state does not erase the painted background. |
| Closed `dialog` | Nothing when live display is none. | Never use the hidden element’s own `innerText` fallback. If CSS actually displays a closed dialog, apply rendered-content rules rather than treating the absent `open` attribute as proof of invisibility. |
| Text/disabled `button` | Neutral inline or block carrier containing pruned descendants. | Printed content wins over `aria-label`; disabled is not hidden. |
| Icon-only `button` | One explicit graphic name, from a nonempty `aria-label`, otherwise its retained named graphic. | The brief requests icon names. This is a declared textual alternative, not printed text. Do not emit both parent name and child graphic name. No unnamed-icon guess. |
| Single `select` | Text of the live selected option’s `.label`; no other options or group headings. | `.value`, `.textContent`, and `innerText` all disagreed with the screenshot. Use live selection, not the selected attribute. |
| Multiple or size-above-1 `select` | Ordered displayed option labels and displayed optgroup labels, separated by surviving breaks. | Include unselected rows that are shown. Exclude rows outside the control’s client area and rows hidden by their own or group styles. Selection is state, not additional prose. |
| `option` / `optgroup` | Consumed by the containing select’s lowering; no second traversal output. Direct option reads obey their containing control’s presentation. | Avoid duplicate labels and labels from a collapsed popup. Group headings come from `.label`, not children. |
| Text, email, search input | Live `.value`; when empty, painted placeholder text. | Preserve the edited text, not the default or an accessibility label. Placeholder visibility, including focus and placeholder styling, needs a case. |
| Number input | Live `.value` for the measured valid committed value. | Invalid editing text, localized display, and intermediate tokens are not proved by this reading; do not claim exact coverage for them. |
| Password input | Nothing; remove the entire copied control before serialization. | Never emit value, default, placeholder, or mask length. An independently painted external label can remain. |
| Hidden input | Nothing, regardless of CSS or attributes. | Explicit privacy requirement outranks generic visibility. |
| Checkbox/radio | No value text; retain separately painted labels once. | `Payload only` is submission data. Check marks are state graphics; inserting that payload or an invented word would add text. |
| Range/color | No value text; retain separately painted labels. | The number and hex value are not printed. Converting them to prose would be a semantic-value feature, not this visual-text rule. |
| Date | No exact lowering approved from the measured DOM/AX values. | `2026-10-03` differs from painted `10/03/2026`. Native formatting/segment text needs a proven reader shared by both placements; no locale guess or hardcoded US format. |
| File | Filename text can come from `files[].name`; full control text remains blocked. | Never use the fake path. Native choose-button text, empty-state text, and multiple-file summary are not all available through that collection. |
| Submit/reset/button input with explicit value | Live `.value` in a neutral carrier. | The painted label differs from the overriding accessible name. |
| Submit/reset without explicit value | No exact generic default-label lowering approved. | The empty DOM value still paints a localized caption. Hardcoding Submit/Reset only reproduces this fixture’s locale. |
| Image input | One explicit graphic alternative: `aria-label`, otherwise `alt`, when not decorative. | Consistent with the icon-name requirement; do not copy `src` or submission value. Broken-image fallback requires its own case. |
| `textarea` | Live `.value`, split into text nodes and `br` nodes for line breaks. | The default child text is stale and `innerText` is empty. Scroll/clipping and significant spaces remain visual-fidelity limits. |
| Named inline `svg` | One graphic alternative: nonempty `aria-label`, otherwise direct child `title`; visible SVG text needs separate descendant preservation. | Never serialize arbitrary SVG children as HTML, and never turn `desc`, paths, or scripts into text. The title/label is an explicit graphic alternative. |
| Decorative inline `svg` | Nothing for the measured shape-only `aria-hidden` icon. | Do not leak its title. An SVG containing actual painted text cannot be dropped solely because of ARIA; that case remains distinct. |
| `math` | No exact general lowering approved. | `x2+y2` destroys mathematical meaning; `Accessible equation` substitutes unrelated prose. A faithful MathML-to-text representation needs an independently specified mapping and rendered proof, not an `innerText` or AX-name shortcut. |

Keep `script`, `style`, `template`, `frame`, `frameset`, `iframe`, `object`, `embed`, `applet`, `noscript`, `meta`, `link`, and `base` dropped, including their descendants. Keep the document title in the capture’s separate `title` field. This supersedes the stopped draft’s promise to retain the `head` whole. No active attributes, form values, event handlers, or loading URLs are copied onto replacement carriers.

Preserve the corrected design’s inert-document import, paired live/copy traversal, document-boundary ancestor walk, and pruning before lowering. Pair nodes before replacement; use a postorder work stack so lowering a parent does not invalidate child indexes. Containers reuse their already-pruned copied descendants. Atomic controls consume their subtree and replace it once. Track the replacement root explicitly: reading a button, input, select, or SVG directly must serialize the replacement rather than a detached original. Measure the complete serialized `{ url, title, html }` after pruning and lowering.

Choose carrier boundaries from the live layout. An inline replacement uses a neutral span; a block replacement uses a neutral container with surviving `br` separators at text-run boundaries. Preserve existing paragraphs, headings, lists, and tables. Do not put a paragraph around an existing paragraph. The probe established that `div`/`span` alone can collapse `words`, `Shown single`, and `Search records` into `wordsShown singleSearch records`. Explicit `br` nodes survived both Markdown modes and plain text. Newlines inside an ordinary text node are insufficient because distillation collapses whitespace. Significant textarea spaces cannot be promised without an additional representation rule.

Floor survival does not mean default-distillation survival everywhere. `HTML.distill` drops `aside`, `footer`, `header`, `menu`, and `nav`, prunes `hidden`/`aria-hidden`, and can select a single `main` or `article` (`node_modules/@orkestrel/html/dist/src/core/index.js:5158`). A lowered form under a navigation region can still disappear. To preserve all captured visible prose while leaving `BrowserReading` unchanged, the capture design must additionally neutralize those region/boilerplate wrappers and remove obsolete hiding attributes after layout decisions. Retain their content structure and separators. This is a required expansion beyond lowering floor elements, not a dependency change. Do not globally discard visually painted text because it is `aria-hidden`. Do not remove attributes before measuring the live document.

Disconnected roots and documents without a window cannot provide a person-sees reading. Retain a separately documented data-only fallback, but redact password and hidden inputs there too. The stopped draft’s unconditional “copied whole” rule conflicts with “password values and hidden inputs never appear” on the public `reading.html` handle.

Implement the same declared lowering rules in `compileReadFunction` and `readBrowserCapture`. Keep core free of browser imports. The generated CDP function accepts an optional root; the DOM function receives its existing root. Compare both outputs on the same live document and state. Do not use CDP accessibility only on one path. Existing `computeBrowserName` is not a visual-text primitive: its ARIA-first ordering and hardcoded native fallbacks disagree with the measured printed labels. Reusing it wholesale would introduce that mismatch. Shared rule data may live in core constants; DOM operations remain in the placements. Add no public helper solely to rename an existing primitive.

Replace the old substring oracle with an independently authored, ordered fixture expectation: rendered prose, printed control text, and explicitly declared graphic alternatives. Assert present text, absent defaults/payloads, order, multiplicity, and boundaries in both Markdown modes, plain text, and the parsed capture. Compare normalized projection text rather than Markdown punctuation when the fixture tests text. Inspect screenshots to establish painted expectations; use live properties to verify fixture state, not to recompute the implementation’s expected answer. AX corroborates names/values but cannot adjudicate visual presence.

The named `innerText` divergences are: form fields; icon buttons; collapsed selects; option label attributes; clipped listbox rows; optgroup captions; every text-bearing native input; textarea values; graphic alternatives; MathML structure; closed-element fallback; and modal background AX exclusion. Password masks and checkbox/radio/range/color graphics are deliberate non-text cases. Dates and native captions stay failing exactness claims until a matching reader exists. Preserve the earlier documented shadow, generated-content, text-transform, opacity, clipping, and offscreen-content limits; do not rewrite them into an “exactly sees” promise.

The implementation edit map uses the supplied dirty working tree’s line numbers. These are proposed edits, not changes made by this design lane.

| Path:line | Required edit |
|---|---|
| `src/core/types.ts:2287` | Make `BrowserReadingInput` the contract home for pruning, lowering, privacy, graphic alternatives, fallback, and fidelity limits. Keep its property shape unchanged. |
| `src/core/types.ts:2330` | Clarify `BrowserReadingInterface.html` as the captured/normalized handle; keep caller-supplied HTML behavior and projection options unchanged. |
| `src/core/types.ts:2552`, `:2647`, `:3066` | Align `BrowserElementInterface.read`, `BrowserViewInterface.read`, and `BrowserFrameInterface.read` summaries with the capture contract. |
| `src/core/compilers.ts:409`, `:419` | Update `compileReadFunction` TSDoc and implement root-aware capture, pruning, and lowering in its generated function. |
| `src/browser/helpers.ts:32`, `:46` | Update `readBrowserCapture` summary, root parameter description, and remarks; implement equivalent capture and final size guard. |
| `src/core/elements/BrowserPageElement.ts:103` | Pass `this` to the compiled capture; remove the later `this.outerHTML` overwrite. |
| `src/core/BrowserFrame.ts:94` | Retain the existing frame/epoch/guard orchestration; verify the default-root call. |
| `src/browser/BrowserDOMView.ts:99`, `src/browser/elements/BrowserDOMElement.ts:138` | Verify existing consumers receive lowered document/element captures. |
| `tests/setup.ts:1`, `:2183` | Replace the phrase-only fixture/oracle with declared expected text/state cases; update scripted protocol fixture matching for root-aware capture. Never emulate the lowering in the protocol fixture. |
| `tests/src/browser/helpers.test.ts:418` | Replace `innerText` equivalence; supersede head-whole, textarea-default, and copy-whole assertions. |
| `tests/src/browser/BrowserDOMView.test.ts:29` | Prove public DOM reads, live values, and direct element roots. |
| `tests/src/core/compilers.test.ts:154` | Retain missing/default-root coverage and validate generated-function calling shape. Real rendering belongs in browser proofs. |
| `tests/src/core/BrowserReading.test.ts:12` | Add carrier survival/order assertions; retain unchanged caller-HTML floor behavior. |
| `tests/service/document.test.ts:1` | Add real Edge CDP/DOM parity through public reads and the read tool, including direct element and child-frame captures. |

Public contract/TSDoc inventory: `BrowserReadingInput`; `BrowserReadingInterface` and its `html` remarks; `BrowserElementInterface.read`; `BrowserViewInterface.read`; `BrowserFrameInterface.read`; `compileReadFunction`; and `readBrowserCapture`. `BrowserReadOptions`, `BrowserReadResult`, `BrowserReading`, `createBrowserReading`, tool arguments, receipts, and `wait` signatures do not change. The `BrowserReadingInterface.markdown` and `.text` slicing summaries stay unchanged. Any implementation that expands this inventory must update its guide parity in the same unit.

The required proofs must fail when the corresponding lowering is removed.

| Proof | Failure-producing mutation |
|---|---|
| Form prose and nested live field; open dialog; text and disabled buttons | Leave the original floor tag in the copy. |
| Selected label differs from option text/value; change selection after load | Remove select replacement or read the selected attribute/default. |
| Multiple/size/optgroup labels, including unselected rows and scroll transition | Keep only selected options, omit group labels, or ignore the client viewport. |
| Edited fields and textarea; stale defaults forbidden | Read attributes/default children instead of live values. |
| Password/hidden absent from capture HTML and every projection, including detached roots | Disable early redaction. |
| Checkbox payload, range number, color hex, and file fake path absent | Substitute generic input `.value` for type-specific rules. |
| Icon name appears once; printed button label wins; decoration title absent | Remove graphic lowering, duplicate child names, or use generic AX-name-first replacement. |
| Adjacent controls remain separate and textarea lines remain ordered | Remove the surviving separators. |
| Visible content survives outside main and under nav; painted ARIA-hidden prose remains | Retain distillation-triggering wrappers/attributes. |
| Direct floor-element root and frame-local read exclude outside text | Restore the element `outerHTML` overwrite or use the document root. |
| Hidden branches remain absent; visibility override remains present | Bypass live pruning before replacement. |
| No live DOM mutation, constructor invocation, or capture-induced network request in either world | Use live clone/append rather than the inert import; retain the earlier P2 positive control. |
| Final result limit counts lowered and JSON-escaped text | Measure original HTML or pre-lowering size. |

Native captions, localized dates, invalid number editing, partial clipping, and meaningful MathML require additional failing rendered fixtures before acceptance. No green implementation run or feature-removal mutation is claimed here. The passing probe proves browser readings and carrier transport only. Promote its evidence into the named tests when implementation is authorized; retain the archived source rather than leaving a collected throwaway probe.

Update `guides/browser.md:379` and `:1447` to exactly match the compiler/helper summaries; update the `BrowserReadingInput` and reading remarks around `:1089`; and align the read method rows at `:1642`, `:1677`, `:1712`, `:1777`, `:1812`, and `:2825` with their interfaces. Explain live values, selected/displayed option labels, graphic alternatives, password/hidden redaction, and the normalized HTML handle. Keep the tool’s quoted description at `:2870` in parity with its source, and add the capture behavior beside that row. Do not claim `read` and `wait` return identical text: `wait` still uses `innerText`. Do not edit the vendored HTML/Markdown guides.

Rewrite `ROADMAP.md:7` item 11 around rendered capture plus pre-projection lowering, replacing “so read and wait agree” with the independently specified oracle. Keep the item open while the exactness blockers remain. Record the broader boilerplate/region normalization and privacy fallback changes in that same item. Re-resolve item 8’s source citations after implementation shifts its file. Run guide parity after the eventual implementation; no guide rewrite or gate was run in this design lane.

The material risks are false exactness claims, native UI localization, popup/listbox clipping, loss of mathematical relationships, stale default leakage, password disclosure through the HTML handle, duplicated graphic labels, collapsed carrier boundaries, distillation outside the lowered element, and drift between the placements. AX cannot close these risks alone. The screenshots and measurements support the bounded rules; they do not prove arbitrary pages, locales, CSS, shadow content, or native controls.

No tracked file was changed, no commit was made, and no agent was spawned. The pre-existing modifications in `src/core/types.ts`, `tests/setup.ts`, `tests/src/browser/BrowserDOMView.test.ts`, and `tests/src/browser/helpers.test.ts` remain in place.