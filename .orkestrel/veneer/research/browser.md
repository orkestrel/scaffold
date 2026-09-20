# Browser research experiment

Read this report for the human summary. [browser.json](browser.json) contains the raw token,
geometry, hit-target, and assertion readings; it is not a project configuration or an animation
receipt. A strict JSON parse returned exit `0` during the refinement pass. Its bytes contain
ordinary UTF-8 text. No syntax corruption was reproduced; the reported viewer problem remains
unidentified.

The Orchestrator ran the Terra-authored instrument through the installed Playwright module against the existing Microsoft Edge executable. Its file version was 153.0.4234.32. The host run returned exit 0 in 1.734 seconds. The retained [instrument](browser.mjs) and [measurements](browser.json) preserve that experiment after pruning its temporary launch folder.

To repeat the instrument from Scaffold, run `node .orkestrel/veneer/research/browser.mjs`. This is a platform research runner, not a package acceptance test.

The fixture used a connected HTML document, a fixed 16px root font, native browser CSS processing, real role/name clicks, and real Escape input. It loaded no Veneer, Bootstrap, Elements, or Mailbox code. It installed nothing and changed no product repository. The isolated headless browser closed in finally.

## Measurements

| Subject                      | Observation                                                                                                                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial token consumer       | The custom property read 1rem; padding read 16px; the sample border-box height was 52px.                                                                                                                                            |
| Valid interactive override   | Clicking Apply spacing changed the local variable to 2rem; padding read 32px; border-box height became 84px. The loaded stylesheet rule text stayed identical.                                                                      |
| Invalid interactive override | Clicking Apply invalid spacing produced a nonempty variable string, not-a-length, while padding resolved to 0px and border-box height became 20px.                                                                                  |
| Covered action               | Display remained inline-block, visibility visible, opacity 1, and geometry unchanged. Hit testing selected the transparent overlay. A normal role/name click refused with the expected Playwright timeout, and status stayed Ready. |
| Restored action              | Real Escape input removed the overlay. Hit testing selected the action button. The same role/name click succeeded, and status became Activated.                                                                                     |

Every emitted assertion passed. The overlay case supplies a refusal control and a restored successful action. The variable cases distinguish name/value presence from an actual consumer property and layout change.

## Limits

This experiment establishes platform counterexamples in the recorded Edge build. It does not accept Veneer, compare Bootstrap, prove an AST implementation, establish a browser support range, or judge visual taste. The unchanged structure reading covers the loaded stylesheet rule list, not every document/style source: the button handler changed an inline custom property on the live element. Product journeys must use the published Orkestrel journey layer rather than copying this standalone research runner.
