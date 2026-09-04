# Fourth distributable inventory

Taken 2026-09-04 against each package's declared published version; dist compared by material content (no sourcemaps, whitespace ignored); README compared byte for byte. The layer is the runtime-dependency publish round from layers.mjs; scaffold publishes on its own account.

| Package | Version | Layer | Tip | dist moved | added | removed | changed | README moved |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| abort | 0.0.8 | 1 | 8650d55 | true | 0 | 0 | 4 | true |
| agent | 0.0.19 | 5 | b5f826b | true | 0 | 0 | 4 | true |
| brief | 0.0.6 | 4 | 71d12f8 | true | 0 | 0 | 4 | true |
| browser | 0.0.14 | 3 | 6206f6d | true | 0 | 0 | 8 | true |
| budget | 0.0.8 | 1 | e69ac63 | true | 0 | 0 | 4 | true |
| codec | 0.0.1 | 0 | 93af38e | true | 0 | 0 | 2 | true |
| console | 0.0.11 | 2 | e4a2707 | true | 0 | 0 | 10 | true |
| contract | 0.0.15 | 0 | aae8c4c | true | 0 | 0 | 4 | true |
| csv | 0.0.5 | 1 | 0d9e184 | true | 0 | 0 | 4 | true |
| database | 0.0.12 | 2 | 4b5087d | true | 0 | 0 | 10 | true |
| emitter | 0.0.8 | 1 | 2633dee | true | 0 | 0 | 4 | true |
| form | 0.0.4 | 2 | 40b9091 | true | 0 | 0 | 4 | true |
| guide | 0.0.15 | 3 | a8caefd | true | 0 | 0 | 4 | true |
| html | 0.0.7 | 1 | 075ab1a | true | 0 | 0 | 4 | false |
| indexeddb | 0.0.9 | 1 | 3f0bc58 | true | 0 | 0 | 2 | true |
| interpret | 0.0.11 | 3 | c3b95fc | true | 0 | 0 | 4 | true |
| lsp | 0.0.5 | 3 | 00106db | true | 0 | 0 | 8 | true |
| markdown | 0.0.12 | 2 | 771fa80 | true | 0 | 0 | 4 | true |
| mcp | 0.0.27 | 3 | cd631bb | true | 0 | 0 | 10 | true |
| middleware | 0.0.18 | 2 | 8364025 | true | 0 | 0 | 8 | true |
| msg | 0.0.8 | 0 | db29a1e | true | 0 | 0 | 4 | true |
| ndjson | 0.0.8 | 1 | daed151 | true | 0 | 0 | 4 | true |
| ollama | 0.0.13 | 6 | c3c8c05 | true | 0 | 0 | 4 | true |
| pool | 0.0.9 | 2 | 21ffb8c | true | 0 | 0 | 4 | true |
| probe | 0.0.11 | 4 | cc54d40 | true | 0 | 0 | 9 | false |
| process | 0.0.9 | 2 | 8d321dd | true | 0 | 0 | 8 | true |
| program | 0.0.11 | 4 | be4e5a3 | true | 0 | 0 | 4 | true |
| qualifier | 0.0.12 | 3 | 79e7086 | true | 0 | 0 | 4 | true |
| queue | 0.0.11 | 3 | 113e374 | true | 0 | 0 | 4 | true |
| rater | 0.0.12 | 3 | a61a457 | true | 0 | 0 | 4 | true |
| reason | 0.0.8 | 2 | 1321747 | true | 0 | 0 | 4 | true |
| relation | 0.0.10 | 3 | 4103d30 | true | 0 | 0 | 4 | true |
| router | 0.0.12 | 2 | 915088e | true | 0 | 0 | 10 | true |
| scaffold | 0.0.60 | 3 | 7f47c023 | true | 0 | 0 | 49 | true |
| sea | 0.0.13 | 3 | c20c9a6 | true | 0 | 0 | 4 | true |
| server | 0.0.17 | 3 | 10b489b | true | 0 | 0 | 4 | true |
| sqlite | 0.0.9 | 1 | f180803 | true | 0 | 0 | 4 | true |
| sse | 0.0.5 | 0 | 483eb60 | true | 0 | 0 | 4 | true |
| table | 0.0.3 | 2 | 46a7b53 | true | 0 | 0 | 4 | true |
| template | 0.0.5 | 2 | 74c01ff | true | 0 | 0 | 4 | true |
| terminal | 0.0.13 | 3 | 0ce9a02 | true | 0 | 0 | 8 | true |
| test | 0.0.12 | 0 | bccbafc | true | 0 | 0 | 10 | true |
| timeout | 0.0.8 | 1 | 7315d2c | true | 0 | 0 | 4 | true |
| tool | 0.0.12 | 1 | 5b70253 | true | 0 | 0 | 4 | true |
| toolbox | 0.0.11 | 6 | 4dd0983 | true | 0 | 0 | 8 | true |
| websocket | 0.0.10 | 2 | 1b56037 | true | 0 | 0 | 4 | true |
| worker | 0.0.10 | 4 | f3b14c3 | true | 0 | 0 | 8 | true |
| workflow | 0.0.16 | 4 | affe372 | true | 0 | 0 | 10 | true |
| workspace | 0.0.6 | 3 | fe0bfc4 | true | 0 | 0 | 4 | true |

## Republish order

Every package whose dist moved bumps and publishes in layer order; a package whose dist stands but whose README moved publishes on its next release. Layers:

- L0: codec contract msg sse test
- L1: abort budget csv emitter html indexeddb ndjson sqlite timeout tool
- L2: console database form markdown middleware pool process reason router table template websocket
- L3: browser guide interpret lsp mcp qualifier queue rater relation scaffold sea server terminal workspace
- L4: brief probe program worker workflow
- L5: agent
- L6: ollama toolbox
