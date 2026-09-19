# Propose exact native identity

Role: objective design lane, GPT-5.6 Sol. This is a proposal, not acceptance.

Change WriteAnchor.device and .inode to readonly bigint before implementation; read with attempt(() => lstatSync(path, { bigint: true })). Preserve guards and strict comparison. Installed fs.d.ts:1517 returns BigIntStats. No numeric alias, serialization conversion, or public member is justified by the bounded callers. Keep the contract attempt boundary and test scratch infrastructure. ScratchIdentity in test adds birth and uses numbers; its semantics differ.

The retained defect contains native inodes 54324670505422941 and 54324670505422943 collapsed to number 54324670505422940. A read-only observation on the release tree returned native 60798594969751563n and captured 60798594969751560; exact equality was false, untouched match true, altered identity false on Windows Node 24.20.0.

Add strict native bigint comparisons to the real scratch capture test before repairing implementation. Record red and green with npm.cmd run test:src:server -- tests/src/server/helpers.test.ts -t "write anchors". Require unchanged native anchor to match and altered device/inode independently to fail. Retain live-sibling rename replacement with original kept allocated and independently distinct native identities. Keep absent/file/symlink controls and add matcher refusal when a file replaces the directory. Numeric regression must fail the collected runtime assertion, not collection/imports.

Suggested probe: candidate full types/helpers drafts under configs/src/tsconfig.server.json and exact capture test. Control retains bigint contract but restores default numeric lstatSync, expected type-stage failure. Obtain a verbatim receipt; no receipt was produced by this design lane. Runtime replacement and rebuilt-entry observations remain required.

Own types, helpers, helper tests, guide, and distribution example expectation at tests/distribution.test.ts:602; extend WriteTransaction.test.ts only for consumer proof. Preserve documented inode-reuse limit. Replace fictional numeric TSDoc metadata with a real-directory example and align distribution expectation.

Brief deviation: createWriteDirectory does not exist. Actual behavior is WriteTransaction.#establish at :489. Do not create a helper. Close with red/green, controls, transaction tests, scoped check, parity, built declarations/runtime, full release gate and fresh archive.
