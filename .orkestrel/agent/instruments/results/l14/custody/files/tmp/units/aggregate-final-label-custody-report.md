# Aggregate final-label custody report

## Alias `a`

**Mechanical result: accepted.** This receipt checks only the packet/label contract. It is not semantic adjudication, root approval, or adoption authority. The ephemeral object passed to `isRefitLabels` supplied unused metadata fields solely to exercise the real labels-array schema guard; it was not persisted.

- Packet: `tmp/units/aggregate-final-label-a-packet.jsonl`, 168 items, SHA-256 `d261b832f1574c64add6c602a42a3af8fa35b6d41e41ceb8e8906c2047286124` (matches released hash).
- Labels: `tmp/units/aggregate-final-label-a.json`, 168 labels, SHA-256 `3d069191d08f43c35f02674d11f7d33569dbad3f094bef67d22cdf870592e580` (matches released hash).
- Emitted guards: `.orkestrel/agent/instruments/harness/.build/bench5/refit/validators.js`, SHA-256 `b0941d59503065d71df42712a3b5faea17f4aa7370b4ac2f48510ff6b7997f66`; its `isRefitItem` accepted every packet row and `isRefitLabels` accepted the label array schema.
- Emitted verifier: `.orkestrel/agent/instruments/harness/.build/bench5/refit/helpers.js`, SHA-256 `b19bac72bee3ba0b74d2bd56f9b4317b2938a4c057e41d8ce76532a35c428a75`; its `verifyLabels` returned without refusal. That verifies exact ID coverage/bijection, each item digest, positive-label proposition consistency, and literal quotations against its `renderSource` output.
- Literal quotations checked: 525. Each quotation SHA-256 is recorded in the per-alias receipt without storing or reproducing quotation text.
- Post-check packet, label, emitted-validator, and emitted-helper hashes still match their pre-check values. The checker exited 0; no stderr failure was reported.

The checker and receipt are `tmp/units/aggregate-final-label-custody-a.ts` and `tmp/units/aggregate-final-label-custody-a-receipt.json`. Receipt SHA-256: `d68a582e0c6799112c921811d48c220f2aa2a9bef241e7d038346e53a1ae41d6`. The receipt contains the full ordered set of 525 quotation hashes and exact input/emitted-module hashes.

At the time of the alias `a` check, only `a` had been released. Alias `b` was released and checked afterward below; this report makes no semantic correctness claim.

## Alias `b`

**Mechanical result: accepted.** This remains a custody/contract result only, with no semantic adjudication or adoption ruling. The emitted `isRefitItem` accepted all 174 packet rows, `isRefitLabels` accepted the label-array schema, and emitted `verifyLabels` returned without refusal after checking complete ID coverage/bijection, item digests, positive-label proposition consistency, and literal quotations against `renderSource` output.

- Packet: `tmp/units/aggregate-final-label-b-packet.jsonl`, 174 items, SHA-256 `1e198b860a4a0b8c5933a2cafccc0b4dca3a1a75b0bbbc959008fb5d894ca672` (matches released hash).
- Labels: `tmp/units/aggregate-final-label-b.json`, 174 labels, SHA-256 `b125a0ba9b90b4731a8a569f4a8e0c8432b61e47bc00c68500f031b02a531092` (matches released hash).
- Emitted validator/helper hashes match alias `a`: `validators.js` `b0941d59503065d71df42712a3b5faea17f4aa7370b4ac2f48510ff6b7997f66`; `helpers.js` `b19bac72bee3ba0b74d2bd56f9b4317b2938a4c057e41d8ce76532a35c428a75`. Both remained unchanged through this check.
- Literal quotations checked: 718. Their ordered SHA-256 values are preserved in `tmp/units/aggregate-final-label-custody-b-receipt.json`; no quotation text is reproduced here.
- Checker exited 0; no stderr failure was reported. Receipt SHA-256: `9d3d6365f742d3400224ae0f7eb8d58c13689d019168d9679c44a17887e7523d`.

Checker: `tmp/units/aggregate-final-label-custody-b.ts`. Packet, label, validator, and helper hashes matched again after verification. Only aliases `a` and `b` have been released and checked; remaining aliases stay pending release.

## Alias `c`

**Mechanical result: accepted.** The emitted `isRefitItem` accepted all 179 packet rows, `isRefitLabels` accepted the labels-array schema, and emitted `verifyLabels` returned without refusal after checking complete ID coverage/bijection, item digests, positive-label proposition consistency, and literal quotations against `renderSource` output. This is not semantic adjudication or adoption approval.

- Packet: `tmp/units/aggregate-final-label-c-packet.jsonl`, 179 items, SHA-256 `9c7632d7224759d227d119d5609e5280cf8a2ad480a842df2bfcdeb4d29488c3` (matches released hash).
- Labels: `tmp/units/aggregate-final-label-c.json`, 179 labels, SHA-256 `cca2b9e61bf3a678cf18b31c3b9cd04cb1ffa6410d676aa8953b5a28990e4d91` (matches released hash).
- Emitted validator/helper hashes remained `validators.js` `b0941d59503065d71df42712a3b5faea17f4aa7370b4ac2f48510ff6b7997f66` and `helpers.js` `b19bac72bee3ba0b74d2bd56f9b4317b2938a4c057e41d8ce76532a35c428a75` through the check.
- Literal quotations checked: 802. Their ordered SHA-256 values are preserved in `tmp/units/aggregate-final-label-custody-c-receipt.json`; no quotation text is reproduced here.
- Checker exited 0; no stderr failure was reported. Receipt SHA-256: `f7e355c4b1bc04e0899a0e50ecb0dd6a37497a57b416e69552efd3ddc77783ee`.

Checker: `tmp/units/aggregate-final-label-custody-c.ts`. Packet, labels, validator, and helper hashes matched again after verification. Aliases `a`, `b`, and `c` have been mechanically checked; any other aliases remain pending release.

## Alias `d`

**Mechanical result: accepted.** The emitted `isRefitItem` accepted all 171 packet rows, `isRefitLabels` accepted the labels-array schema, and emitted `verifyLabels` returned without refusal after checking complete ID coverage/bijection, item digests, positive-label proposition consistency, and literal quotations against `renderSource` output. This is not semantic adjudication or adoption approval.

- Packet: `tmp/units/aggregate-final-label-d-packet.jsonl`, 171 items, SHA-256 `8a80bfbce51cb4040aedad1dfd834351d821c37506a08218a70ef3a2a5e7e4aa` (matches released hash).
- Labels: `tmp/units/aggregate-final-label-d.json`, 171 labels, SHA-256 `8cd6f70f4beeb47171a0379a2b7b7178f8f586968cf23f15385e309ffd819130` (matches released hash).
- Emitted validator/helper hashes remained `validators.js` `b0941d59503065d71df42712a3b5faea17f4aa7370b4ac2f48510ff6b7997f66` and `helpers.js` `b19bac72bee3ba0b74d2bd56f9b4317b2938a4c057e41d8ce76532a35c428a75` through the check.
- Literal quotations checked: 627. Their ordered SHA-256 values are preserved in `tmp/units/aggregate-final-label-custody-d-receipt.json`; no quotation text is reproduced here.
- Checker exited 0; no stderr failure was reported. Receipt SHA-256: `d2118150c3d51727ee978571e8daa33230adb481dd3f3c0ba77311ca219a3c44`.

Checker: `tmp/units/aggregate-final-label-custody-d.ts`. Packet, labels, validator, and helper hashes matched again after verification. Aliases `a`, `b`, `c`, and `d` have been mechanically checked; other aliases remain pending release.
