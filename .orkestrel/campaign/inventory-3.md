# Third distributable inventory

Taken 2026-09-02 against each package's declared published version; dist compared by material content (no sourcemaps, whitespace ignored); README compared byte for byte. The layer is the runtime-dependency publish round from layers.mjs; scaffold publishes on its own account.

| Package | Version | Layer | Tip | dist moved | added | removed | changed | README moved |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| abort | 0.0.8 | 1 | 968549c | true | 0 | 0 | 4 | true |
| agent | 0.0.19 | 5 | a1e2d49 | true | 0 | 0 | 4 | true |
| brief | 0.0.6 | 4 | 2324035 | true | 0 | 0 | 4 | false |
| browser | 0.0.14 | 3 | c25c36b | true | 0 | 0 | 8 | true |
| budget | 0.0.8 | 1 | aa92b5f | true | 0 | 0 | 4 | true |
| codec | 0.0.1 | 0 | 8adc908 | true | 0 | 0 | 2 | false |
| console | 0.0.11 | 2 | ed4e280 | true | 0 | 0 | 10 | true |
| contract | 0.0.15 | 0 | 7de1ef2 | true | 0 | 0 | 4 | true |
| csv | 0.0.5 | 1 | 5e4f03b | true | 0 | 0 | 4 | true |
| database | 0.0.12 | 2 | 42c0235 | true | 0 | 0 | 10 | true |
| emitter | 0.0.8 | 1 | fdb2e36 | true | 0 | 0 | 4 | true |
| form | 0.0.3 | 2 | ec87b5a | true | 0 | 0 | 4 | false |
| guide | 0.0.15 | 3 | 8b6ac02 | true | 0 | 0 | 4 | true |
| html | 0.0.7 | 1 | 532fc73 | true | 0 | 0 | 4 | false |
| indexeddb | 0.0.9 | 1 | 7783d6d | true | 0 | 0 | 2 | true |
| interpret | 0.0.11 | 3 | 8fa4740 | true | 0 | 0 | 4 | true |
| lsp | 0.0.5 | 3 | 262012f | true | 0 | 0 | 8 | false |
| markdown | 0.0.12 | 2 | b6717a5 | true | 0 | 0 | 4 | true |
| mcp | 0.0.27 | 3 | 249299f | true | 0 | 0 | 10 | false |
| middleware | 0.0.18 | 2 | 917ccd9 | true | 0 | 0 | 8 | true |
| msg | 0.0.8 | 0 | 234386a | true | 0 | 0 | 4 | true |
| ndjson | 0.0.8 | 1 | 293ed4a | true | 0 | 0 | 4 | true |
| ollama | 0.0.13 | 6 | 6a6342d | true | 0 | 0 | 4 | true |
| pool | 0.0.9 | 2 | fe2c9f1 | true | 0 | 0 | 4 | true |
| probe | 0.0.11 | 4 | 030ac69 | true | 0 | 0 | 8 | false |
| process | 0.0.9 | 2 | d272bbe | true | 0 | 0 | 8 | false |
| program | 0.0.11 | 4 | af03b38 | true | 0 | 0 | 4 | true |
| qualifier | 0.0.12 | 3 | 10bd46f | true | 0 | 0 | 4 | true |
| queue | 0.0.11 | 3 | 00d0352 | true | 0 | 0 | 4 | true |
| rater | 0.0.12 | 3 | 1ccb968 | true | 0 | 0 | 4 | true |
| reason | 0.0.8 | 2 | 80151ce | true | 0 | 0 | 4 | true |
| relation | 0.0.10 | 3 | 795a34d | true | 0 | 0 | 4 | false |
| router | 0.0.12 | 2 | 0302d86 | true | 0 | 0 | 10 | true |
| scaffold | 0.0.59 | 3 | d0f7a87 | true | 0 | 0 | 14 | false |
| sea | 0.0.13 | 3 | c3c36c8 | true | 0 | 0 | 4 | true |
| server | 0.0.17 | 3 | 4b53210 | true | 0 | 0 | 4 | true |
| sqlite | 0.0.9 | 1 | 1ede0ae | true | 0 | 0 | 4 | true |
| sse | 0.0.5 | 0 | b639721 | true | 0 | 0 | 4 | true |
| table | 0.0.3 | 2 | 079fc2c | true | 0 | 0 | 4 | false |
| template | 0.0.5 | 2 | 7ffa579 | true | 0 | 0 | 4 | true |
| terminal | 0.0.13 | 3 | c0947ba | true | 0 | 0 | 8 | false |
| test | 0.0.11 | 0 | 5aff09d | true | 0 | 0 | 10 | false |
| timeout | 0.0.8 | 1 | 53117b7 | true | 0 | 0 | 4 | true |
| tool | 0.0.12 | 1 | 04c0395 | true | 0 | 0 | 4 | false |
| toolbox | 0.0.11 | 6 | 0ec520f | true | 0 | 0 | 8 | true |
| websocket | 0.0.10 | 2 | 4f59e55 | true | 0 | 0 | 4 | true |
| worker | 0.0.10 | 4 | 5d1d6df | true | 0 | 0 | 8 | true |
| workflow | 0.0.16 | 4 | 6f99184 | true | 0 | 0 | 10 | true |
| workspace | 0.0.6 | 3 | 555706b | true | 0 | 0 | 4 | true |

## Republish order

Every package whose dist moved bumps and publishes in layer order; a package whose dist stands but whose README moved publishes on its next release. Layers:

- L0: codec contract msg sse test
- L1: abort budget csv emitter html indexeddb ndjson sqlite timeout tool
- L2: console database form markdown middleware pool process reason router table template websocket
- L3: browser guide interpret lsp mcp qualifier queue rater relation scaffold sea server terminal workspace
- L4: brief probe program worker workflow
- L5: agent
- L6: ollama toolbox
