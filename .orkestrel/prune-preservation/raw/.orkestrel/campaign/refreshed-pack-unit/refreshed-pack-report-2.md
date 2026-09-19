# Refreshed candidate pack successor

The `pack-refreshed-candidate.ps1` script uses Windows PowerShell 5.1-compatible SHA512 hashing and UTF-8 metadata writing. The native-command splat uses `$startOptions`, which avoids the `$Arguments` parameter collision.

The predecessor script is retained as `.orkestrel/campaign/refreshed-pack-unit/pack-refreshed-candidate-previous.ps1`.

The host probes write under `.orkestrel/campaign/refreshed-pack-unit/host-controls`. They cover SHA512 hashing, UTF-8 JSON output, and the native command wrapper with `node --version`.

Windows PowerShell 5.1 ran the probes successfully. The SHA512 result is `sha512-q5jnyi5N3lLbRg+61dIH0M+R/SlRTqdjlFs4UtVNPk47ttL2lzxYKjVYOGIUc7h8qPzVqVIym0pM8AZxKq7bIg==`. The metadata bytes are `7B-22-73-74-61-74-75-73-22-3A-22-70-61-73-73-22-7D`, with no byte order mark. The redirected `node --version` result is `v24.20.0`.

Windows PowerShell parsed the successor script without syntax errors. No package operation ran.

DEVIATIONS: none.
