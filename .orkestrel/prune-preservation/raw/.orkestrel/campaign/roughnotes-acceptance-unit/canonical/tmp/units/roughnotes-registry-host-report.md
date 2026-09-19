# Align Roughnotes with the published host

Root executed the brief at tmp/units/roughnotes-registry-host-brief.md on2026-09-18. Registry installation had already passed with native and launcher exit0, session36677/tool3e6560, and terminal2026-09-18T21:01:33.661Z. Its record is tmp/units/roughnotes-registry-adoption-evidence/registry-adoption-20260918/terminal.json. Protected source matched before/after installation. Manifest and lock declare Scaffold^0.0.75 and test^0.0.18, with registry URLs and the measured published integrity. Installed codex/config.toml hashes to C8364A20FCA401E65F3C092968B1F6B4D4E025A1EFD91E22BEB01B3FCD39E076, binding the installation to the actual shipped host rather than the historical local archive.

From C:/Users/mikes/WebstormProjects/scaffold/tmp/recovery/roughnotes, root ran the installed node_modules/@orkestrel/scaffold/dist/bin/main.js entry.

The repair command exited0 in toolb885c4. Its complete output was:

```text
guides: The mirror at guides/scaffold.md differs from the hosted guide. Run catalog to refresh it.
0 of 42 planned paths drifted from the plan. Audit compared bytes at 26, existence at 4, and nothing at 12.
0 written, 43 unchanged, 0 removed in ..
```

The catalog command exited0 in tool0077c0. Its complete output was:

```text
3 written, 7 unchanged, 0 removed in ..
50 published, 8 guides fetched, 0 no longer listed.
```

The final audit command exited0 in toold1778c. Its complete output was:

```text
guides: The mirror at guides/test.md differs from the hosted guide. Run catalog to refresh it.
dependencies: @vitest/browser-playwright declares major 4, while the registry serves major 5.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vitest declares major 4, while the registry serves major 5.
0 of 42 planned paths drifted from the plan. Audit compared bytes at 26, existence at 4, and nothing at 12.
```

Root read the actual generated diff in toolfa4bc8. Catalog updated .claude/agents/orkestrel.md to the published Scaffold/test versions and refreshed guides/scaffold.md and guides/test.md. No package was added and no major upgrade ran. The fetched test guide and neighboring test/guides/test.md share SHA2568BFDC650F1FAE3092A45EC7E11A79F996892ABB8D8E8A69E46D14A3D0B41D1F6. Installed Scaffold's bundled test guide and canonical Scaffold's guides/test.md share the earlier SHA2567B12682ED593698334073ED6DF85ECE53D946B08D4ED56D303F2C068B3F45242, measured in tool60c258. Keep the fetched upstream mirror; the nonblocking hosted-guide notice is this version skew. Do not republish or edit the mirror to silence it.

The initial audit --json output exceeded the tool transport limit because it carries observed file bytes. That truncated output is not complete evidence. The subsequent plain-text audit output is complete.

Application gates and final capture against the registry artifact remain pending. Original Roughnotes and its staged Codex entries were not changed.
