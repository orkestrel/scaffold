# Release close — toolbox and ollama

Layer L6, published serially in one window from one one-time code, on 2026-09-13.

| package              | prior registry | published | journal line                  |
| -------------------- | -------------- | --------- | ----------------------------- |
| `@orkestrel/toolbox` | `0.0.12`       | `0.0.13`  | `+ @orkestrel/toolbox@0.0.13` |
| `@orkestrel/ollama`  | `0.0.14`       | `0.0.15`  | `+ @orkestrel/ollama@0.0.15`  |

Both uploads exited `0` on their first attempt, with no `EOTP` and no retry. Registry confirmed both
after CDN lag. Account `mikesaintsg`, authenticated by `npm login --browser=false` under
`script -qfc` with stdin held open by a fifo; the first minted approval died on the 45-second abandon
before relay and was killed by process id, and the second was relayed and clicked.

Each package uploaded with `--ignore-scripts`, because every gate ran outside the window against the
artifact that shipped. The gate evidence is `evidence/linux-gate/toolbox.status.txt`,
`ollama.status.txt`, and `ollama-service.log.txt`.

Neither package is a runtime dependency of any fleet package, so no dependent re-pin or republish is
owed. Both keep `@orkestrel/scaffold` at the published `^0.0.64`; that development re-pin comes due
only after scaffold itself publishes.

`@orkestrel/scaffold@0.0.65` was held out of this window on the round's ruling in
`linux-gate-audit-verdict.md`.
