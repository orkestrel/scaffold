# Unit websocket-fixup — report (2026-09-02)

Writer: `builder` on Claude Sonnet (native). Returned report, as data:

- Referral A closed — `src/server/types.ts:84`: `WebSocketErrorCode` is
  `'OPTION' | 'LIMIT' | 'CLOSE' | 'FRAME'`; carried through `errors.ts`, the throw sites in
  `NodeWebSocket.ts`, the tests, and the guide's Errors section. README named no code.
- F1 closed — the refusal case binds the peer, records its bytes, snapshots after the handshake,
  and asserts no byte arrives across the three refusals; planted `this.#socket.write(Buffer.from([0x00]))`
  at the top of `ping()` reddened exactly that case (`expected Buffer[ 0 ] to deeply equal Buffer[]`),
  restored exactly, then `1 passed`.
- F2 closed — the `key` and `protocol` `OPTION` cases assert `{ key: 'not-base64' }` and
  `{ protocol: 'mcp\r\nX-Injected: true' }`.
- F3 / Referral B closed — `parseWebSocketFrame` and `parseUTF8` moved into `src/server/parsers.ts`;
  `isWebSocketKey`, `isWebSocketProtocol`, `isCloseCode` into the new `src/server/validators.ts`;
  `measureWebSocketFrame` stays in `helpers.ts`; the barrel exports validators in sorted position;
  tests mirrored into `parsers.test.ts` and the new `validators.test.ts`; the guide's Tests index
  follows the split. Published surface unchanged.

Sweep for `'CODE'`, `'PAYLOAD'`, and the seven moved names over `src`, `tests`,
`guides/websocket.md`, `README.md`: no stale code literal; every moved-name hit resolves to its
new file or a cross-reference.

Gates: `format:check` 0 (after one `npm run format` convergence), `lint:check` 0, `check` 0,
`build` 0, `test` 0 (src 120, policy 111, config 46, setup 17, guides 18, integration 14).

```text
 10 files changed, 545 insertions(+), 642 deletions(-) (plus validators.ts and validators.test.ts, new)
```

Committed by the Orchestrator as `abcf675`.
