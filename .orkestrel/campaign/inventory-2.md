# Second distributable inventory

Taken 2026-09-02 against each package's declared published version; dist compared by material content (no sourcemaps, whitespace ignored); README compared byte for byte. The layer is the runtime-dependency publish round from layers.mjs; scaffold publishes on its own account.

| Package | Version | Layer | Tip | dist moved | added | removed | changed | README moved |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| abort | 0.0.8 | 1 | 79e62a8 | true | 0 | 0 | 4 | true |
| agent | 0.0.19 | 5 | 4df65d2 | true | 0 | 0 | 4 | true |
| brief | 0.0.6 | 4 | bc0f767 | true | 0 | 0 | 4 | false |
| browser | 0.0.14 | 3 | 35443be | true | 0 | 0 | 8 | true |
| budget | 0.0.8 | 1 | e91addf | true | 0 | 0 | 4 | true |
| codec | 0.0.1 | 0 | dcbeb4c | false | 0 | 0 | 0 | false |
| console | 0.0.11 | 2 | 5a75c04 | true | 0 | 0 | 10 | true |
| contract | 0.0.15 | 0 | 7ffbdcc | true | 0 | 0 | 4 | true |
| csv | 0.0.5 | 1 | 51860ac | true | 0 | 0 | 4 | true |
| database | 0.0.12 | 2 | 4c8399a | true | 0 | 0 | 10 | true |
| emitter | 0.0.8 | 1 | 22e4b0b | true | 0 | 0 | 4 | true |
| form | 0.0.3 | 2 | d51fac8 | true | 0 | 0 | 4 | false |
| guide | 0.0.15 | 3 | be6111e | true | 0 | 0 | 4 | true |
| html | 0.0.7 | 1 | bc53632 | true | 0 | 0 | 4 | false |
| indexeddb | 0.0.9 | 1 | 10ebdb4 | true | 0 | 0 | 2 | true |
| interpret | 0.0.11 | 3 | 738bb5b | true | 0 | 0 | 4 | true |
| lsp | 0.0.5 | 3 | 262012f | true | 0 | 0 | 8 | false |
| markdown | 0.0.12 | 2 | 7575e6d | true | 0 | 0 | 4 | true |
| mcp | 0.0.27 | 3 | 51775d1 | true | 0 | 0 | 10 | false |
| middleware | 0.0.18 | 2 | 2928f84 | true | 0 | 0 | 8 | true |
| msg | 0.0.8 | 0 | b6cf00e | true | 0 | 0 | 4 | true |
| ndjson | 0.0.8 | 1 | 73a203b | true | 0 | 0 | 4 | true |
| ollama | 0.0.13 | 6 | 3d681fa | true | 0 | 0 | 4 | true |
| pool | 0.0.9 | 2 | 0c94a11 | true | 0 | 0 | 4 | true |
| probe | 0.0.11 | 4 | 6366d1c | true | 0 | 0 | 8 | false |
| process | 0.0.9 | 2 | 8aa5dce | true | 0 | 0 | 8 | false |
| program | 0.0.11 | 4 | 1a53925 | true | 0 | 0 | 4 | true |
| qualifier | 0.0.12 | 3 | 476fdc7 | true | 0 | 0 | 4 | true |
| queue | 0.0.11 | 3 | 38da78b | true | 0 | 0 | 4 | true |
| rater | 0.0.12 | 3 | 350608e | true | 0 | 0 | 4 | true |
| reason | 0.0.8 | 2 | c363201 | true | 0 | 0 | 4 | true |
| relation | 0.0.10 | 3 | e675bd0 | true | 0 | 0 | 4 | false |
| router | 0.0.12 | 2 | 3daca9b | true | 0 | 0 | 6 | true |
| scaffold | 0.0.59 | 3 | ab7a54d | true | 0 | 0 | 14 | false |
| sea | 0.0.13 | 3 | 93fd98a | true | 0 | 0 | 4 | true |
| server | 0.0.17 | 3 | bb68ef5 | true | 0 | 0 | 4 | true |
| sqlite | 0.0.9 | 1 | 5a9340b | true | 0 | 0 | 4 | true |
| sse | 0.0.5 | 0 | 9b183c2 | true | 0 | 0 | 4 | true |
| table | 0.0.3 | 2 | e270928 | true | 0 | 0 | 4 | false |
| template | 0.0.5 | 2 | 85bc44b | true | 0 | 0 | 4 | true |
| terminal | 0.0.13 | 3 | 4ea17d7 | true | 0 | 0 | 8 | false |
| test | 0.0.11 | 0 | cced24a | true | 0 | 0 | 10 | false |
| timeout | 0.0.8 | 1 | 6f6b729 | false | 0 | 0 | 0 | true |
| tool | 0.0.12 | 1 | 1ba9528 | true | 0 | 0 | 4 | false |
| toolbox | 0.0.11 | 6 | c13a526 | true | 0 | 0 | 8 | true |
| websocket | 0.0.10 | 2 | ce8a22a | true | 0 | 0 | 4 | true |
| worker | 0.0.10 | 4 | 3944faf | true | 0 | 0 | 4 | true |
| workflow | 0.0.16 | 4 | df98381 | true | 0 | 0 | 10 | true |
| workspace | 0.0.6 | 3 | e564c2d | true | 0 | 0 | 4 | true |

## Republish order

Every package whose dist moved bumps and publishes in layer order; a package whose dist stands but whose README moved publishes on its next release. Layers:

- L0: codec contract msg sse test
- L1: abort budget csv emitter html indexeddb ndjson sqlite timeout tool
- L2: console database form markdown middleware pool process reason router table template websocket
- L3: browser guide interpret lsp mcp qualifier queue rater relation scaffold sea server terminal workspace
- L4: brief probe program worker workflow
- L5: agent
- L6: ollama toolbox
