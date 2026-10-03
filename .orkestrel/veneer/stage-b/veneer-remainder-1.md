I'll read the brief and follow it exactly.Slice 1 is the conflict study at the tip. I’ll read the study output, the earlier status map, and the browser sources it names.The study’s rulings and the earlier map are in hand. Next I’ll read ruling 16 and check each item against the tip.Ruling 16’s three bullets are the U items. I’ll check the tip’s code, tests, and guide against each ruling.# Slice 1 — conflict study at dc4654b

## Rulings

| id | status | evidence | remaining work |
| --- | --- | --- | --- |
| R1 | done | `src/browser/Hold.ts:82`; `src/browser/Tip.ts:194`; `src/browser/Placement.ts:199`; `src/browser/Lock.ts:45`; `src/browser/Trap.ts:42`; `src/browser/Engine.ts:69`; `guides/veneer.md:600` | |
| R2 | done | `src/browser/Hold.ts:11`; `src/browser/types.ts:2242`; `src/browser/types.ts:2257`; `scaffold:.orkestrel/veneer/browser-convention-verdict.md:155` | |
| R3 | done | `src/browser/Tip.ts:200`; `src/browser/Tip.ts:293`; `src/browser/Tip.ts:279`; `guides/veneer.md:586`; `tests/src/browser/Tip.test.ts:1452` | |
| R4 | done | `src/browser/Placement.ts:205`; `src/browser/Placement.ts:162`; `src/browser/constants.ts:291`; `tests/src/browser/Placement.test.ts:132`; `guides/veneer.md:604` | |
| R5 | done | `src/browser/Tip.ts:74`; `src/browser/Tip.ts:276`; `guides/veneer.md:600`; `tests/src/browser/Tip.test.ts:846` | |
| R6 | done | `src/browser/Collapse.ts:60`; `src/browser/Tab.ts:120`; `src/browser/Tab.ts:182`; `tests/src/browser/Collapse.test.ts:103`; `tests/src/browser/Tab.test.ts:21` | |
| R7 | partial | `src/browser/Engine.ts:74`; `src/browser/Engine.ts:206`; `src/browser/types.ts:2079`; `guides/veneer.md:580`; `tests/src/browser/Engine.test.ts:601`; `scaffold:.orkestrel/veneer/browser-convention-verdict.md:50`; `scaffold:.orkestrel/veneer/browser-convention-verdict.md:63` | Ruling 2 still says route and clear listeners are capture-phase. Ruling 3 still says each plugin runs clear before its routes. |
| R8 | done | `src/browser/Engine.ts:191`; `src/browser/Engine.ts:201`; `tests/src/browser/Engine.test.ts:396` | |
| R9 | done | `src/browser/Alert.ts:23`; `src/browser/Modal.ts:53`; `src/browser/Offcanvas.ts:61`; `src/browser/Tip.ts:73`; `tests/src/browser/Engine.test.ts:510` | |
| R10 | done | `src/browser/plugins.ts:284`; `tests/src/browser/plugins.test.ts:63`; `tests/setupBrowser.ts:4762`; `guides/veneer.md:689` | |
| R11 | done | `src/browser/helpers.ts:173`; `src/browser/helpers.ts:695`; `src/browser/plugins.ts:225` | |
| R12 | done | `src/browser/Trap.ts:47`; `src/browser/Trap.ts:62`; `guides/veneer.md:673`; `tests/src/browser/Offcanvas.test.ts:33`; `tests/setupBrowser.ts:3522` | |
| R13 | partial | `src/browser/Tip.ts:220`; `src/browser/Dropdown.ts:129`; `tests/src/browser/Dropdown.test.ts:26` | Each tip and dropdown still binds its own `mouseover` listeners on the body's children. No departure row records that against Bootstrap's shared noop, and the CDP touch case does not read those listeners. |
| R14 | done | `guides/veneer.md:920`; `guides/veneer.md:921`; `tests/src/browser/Tip.test.ts:1452` | |
| R15 | done | `tests/src/browser/Engine.test.ts:848`; `tests/src/browser/Engine.test.ts:948`; `tests/setupBrowser.ts:3496`; `guides/veneer.md:671` | |
| R16 | done | `tests/src/browser/integration.test.ts:62`; `tests/src/browser/Collapse.test.ts:103`; `tests/src/browser/Tab.test.ts:21` | |
| R17 | done | `guides/veneer.md:592`; `guides/veneer.md:600`; `src/browser/Modal.ts:180`; `src/browser/Modal.ts:224` | |
| R18 | done | `guides/veneer.md:580`; `guides/veneer.md:582`; `src/browser/Registry.ts:58` | |
| R19 | done | `guides/veneer.md:588`; `tests/src/browser/Tip.test.ts:289` | |
| R20 | done | `src/browser/plugins.ts:213`; `src/browser/plugins.ts:250` | |

## Critic refutations

| id | status | evidence | remaining work |
| --- | --- | --- | --- |
| C1 | done | `guides/veneer.md:918`; `guides/veneer.md:919`; `tests/src/browser/Tip.test.ts:1710` | |
| C2 | done | `src/browser/Tip.ts:74`; `src/browser/Tip.ts:274`; `tests/src/browser/Tip.test.ts:846` | |
| C3 | done | `src/browser/Tip.ts:276`; `guides/veneer.md:600` | |
| C4 | done | `src/browser/Registry.ts:101`; `guides/veneer.md:602`; `tests/src/browser/integration.test.ts:41` | |
| C5 | done | `src/browser/Tip.ts:165`; `src/browser/Tip.ts:179`; `src/browser/Tip.ts:262`; `src/browser/Tip.ts:293`; `tests/src/browser/Tip.test.ts:482`; `tests/src/browser/Tip.test.ts:182` | |
| C6 | done | `src/browser/Engine.ts:211`; `tests/src/browser/Engine.test.ts:421` | |
| C7 | done | `src/browser/plugins.ts:213`; `src/browser/plugins.ts:250` | |
| C8 | done | `src/browser/Modal.ts:180`; `src/browser/Modal.ts:224`; `guides/veneer.md:600`; `guides/veneer.md:777` | |

## Laws

| id | status | evidence | remaining work |
| --- | --- | --- | --- |
| L1 | done | `src/browser/Tip.ts:194`; `src/browser/Placement.ts:199`; `src/browser/types.ts:2257`; `guides/veneer.md:600` | |
| L2 | done | `src/browser/Hold.ts:20`; `src/browser/types.ts:2231`; `src/browser/Tip.ts:293`; `src/browser/Placement.ts:206` | |
| L3 | done | `src/browser/Lock.ts:16`; `src/browser/Lock.ts:115`; `guides/veneer.md:600` | |
| L4 | done | `src/browser/Hold.ts:82`; `src/browser/types.ts:2242`; `src/browser/Lock.ts:45` | |
| L5 | done | `src/browser/Registry.ts:46`; `src/browser/Registry.ts:58`; `src/browser/Registry.ts:66`; `guides/veneer.md:580` | |

## Missing

| id | status | evidence | remaining work |
| --- | --- | --- | --- |
| M1 | partial | `src/browser/Tip.ts:194`; `src/browser/Tip.ts:295`; `guides/veneer.md:920`; `tests/src/browser/Tip.test.ts:1452` | Show and hide edit the live token list, and the author-token departure covers a token present before show. No proof adds and removes a page token between show and hide. |
| M2 | done | `src/browser/Collapse.ts:60`; `tests/src/browser/Collapse.test.ts:166` | |
| M3 | done | `guides/veneer.md:592`; `src/browser/Tip.ts:95`; `src/browser/Modal.ts:173`; `tests/src/browser/Tip.test.ts:209` | |
| M4 | partial | `guides/veneer.md:604`; `src/browser/Placement.ts:65`; `tests/src/browser/Placement.test.ts:96` | The guide states that an inline `anchor-name` hides a stylesheet `anchor-name`, and a placement proof shows the stylesheet name return after release. The engine departure table has no row for that case. |
| M5 | done | `guides/veneer.md:602`; `src/browser/Placement.ts:58`; `tests/src/browser/Placement.test.ts:148` | |

## User rulings

| id | status | evidence | remaining work |
| --- | --- | --- | --- |
| U1 | done | `scaffold:.orkestrel/veneer/browser-convention-verdict.md:150`; `src/browser/Trap.ts:47`; `guides/veneer.md:673`; `tests/src/browser/Offcanvas.test.ts:33` | |
| U2 | done | `scaffold:.orkestrel/veneer/browser-convention-verdict.md:151`; `guides/veneer.md:806`; `guides/veneer.md:820`; `guides/veneer.md:853`; `src/browser/Hold.ts:143`; `src/browser/Tip.ts:194` | |
| U3 | done | `scaffold:.orkestrel/veneer/browser-convention-verdict.md:152`; `guides/veneer.md:582`; `src/browser/Engine.ts:145`; `tests/src/browser/Engine.test.ts:935` | |

## Counts

| status | count |
| --- | --- |
| done | 37 |
| partial | 4 |
| open | 0 |
| moot | 0 |