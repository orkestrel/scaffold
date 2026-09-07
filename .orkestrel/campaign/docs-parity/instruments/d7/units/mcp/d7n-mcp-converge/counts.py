import io
p='guides/mcp.md'
s=io.open(p,encoding='utf8').read()
E=[
("call, so no request needing the other two targets can leave through it. A consumer issuing\neither method over its own transport stamps the header itself, through `encodeSentinel`.\nThe server validates all three.",
 "call, so no request needing a prompt or a resource target can leave through it. A consumer\nissuing either method over its own transport stamps the header itself, through\n`encodeSentinel`. The server validates `tools/call`, `prompts/get`, and `resources/read`\nalike."),
("check that the two agree. `buildHeaderParameters` reads the annotations one `inputSchema`",
 "check that the header and the body agree. `buildHeaderParameters` reads the annotations one\n`inputSchema`"),
("declares, `buildHeaderProjection` turns them plus a call's `arguments` into the headers,\nand both sides of the protocol run the same pair.",
 "declares, `buildHeaderProjection` turns them plus a call's `arguments` into the headers,\nand both sides of the protocol run the same pair."),
("An annotation breaking any of them makes the whole tool definition invalid, and the two\nsides answer that differently.",
 "An annotation breaking any of them makes the whole tool definition invalid, and the client\nand the server answer that differently."),
("the two options at the moment the listen request is answered; no stored flag records it, so it\ncannot drift from them.",
 "`task` and `subscription` at the moment the listen request is answered; no stored flag records\nit, so it cannot drift from them."),
("not-this-caller's produce byte-identical acknowledgements, because the port collapses all\nthree into one `undefined` and an acknowledgement that separated them would publish a",
 "not-this-caller's produce byte-identical acknowledgements, because the port collapses each of\nthem into one `undefined` and an acknowledgement that separated them would publish a"),
("the input selector, the canonical `ToolCall`, and the executor — no step re-snapshots, so no\ntwo of them can be looking at different values.",
 "the input selector, the canonical `ToolCall`, and the executor — no step re-snapshots, so no\nstep can be looking at a different value from another."),
("client comes back later for the outcome. Everything between those two moments belongs to the",
 "client comes back later for the outcome. Everything between the answer and the outcome belongs\nto the"),
("`stop` its owner needs. Two interfaces over one entity because two parties hold it and are owed\ndifferent powers — an executor",
 "`stop` its owner needs. A second interface over one entity because the executor and the owner\nhold it and are owed different powers — an executor"),
("supplies the hint, the one-shot read, and the two doors a peer's inbound\ntask notification arrives through.",
 "supplies the hint, the one-shot read, and the doors a peer's inbound\ntask notification arrives through."),
("promise rather than throwing. The client cannot tell the two apart, which is",
 "promise rather than throwing. The client cannot tell a rejection from a throw, which is"),
("publishes these two doors over that pair. The handle serves one lifetime — `stop()`",
 "publishes `start` and `stop` over that pair. The handle serves one lifetime — `stop()`"),
("  `MCPClientInterface` publishes no `prompts/get` and no `resources/read` call: the other\n  two targets the header is scoped to have no reachable path out of this client. The\n  server validates all three, so the asymmetry is the client's method surface rather than",
 "  `MCPClientInterface` publishes no `prompts/get` and no `resources/read` call: the prompt and\n  resource targets the header is scoped to have no reachable path out of this client. The\n  server validates every scoped target, so the asymmetry is the client's method surface rather\n  than"),
("through the `subscriptions/listen` mechanism, but no published source states how the two\ncompose.",
 "through the `subscriptions/listen` mechanism, but no published source states how the extension\nand that mechanism compose."),
]
for old,new in E:
    assert s.count(old)==1, old[:70]
    s=s.replace(old,new,1)
io.open(p,'w',encoding='utf8').write(s)
print('ok')
