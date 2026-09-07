import io
P='src/core/types.ts'
EDITS=[
 ("/** Represents a JSON-RPC 2.0 correlation id — the value a request and its response share. */\n",
  "/**\n * Represents a JSON-RPC 2.0 correlation id — the value a request and its response share.\n *\n * @remarks\n * `null` is not an id. A response that could not read one omits the member entirely, which is\n * what {@link JSONRPCErrorResponse} declares.\n */\n"),
 ("/** Represents one RFC 6570 resource-template descriptor advertised by `resources/templates/list`. */\n",
  "/**\n * Represents one RFC 6570 resource-template descriptor advertised by `resources/templates/list`.\n *\n * @remarks\n * The `uriTemplate` member is published as a string and forwarded verbatim: this package never\n * parses or expands it, and no RFC 6570 level is implied.\n */\n"),
 ("/** Represents the cursor parameters shared by every paginated modern list method. */\n",
  "/**\n * Represents the cursor parameters shared by every paginated modern list method.\n *\n * @remarks\n * The cursor is opaque to this package, and the consumer's own manager mints it.\n */\n"),
 ("/** Represents the cursor result fields shared by every paginated modern list method. */\n",
  "/**\n * Represents the cursor result fields shared by every paginated modern list method.\n *\n * @remarks\n * An absent `nextCursor` member means the answered page was the final one.\n */\n"),
 ("/** Parameters accepted by `resources/read`. */\n",
  "/**\n * Represents the parameters `resources/read` accepts — a concrete `uri` plus the optional\n * multi-round continuation carriers.\n */\n"),
 ("/** Parameters accepted by `prompts/get`. */\n",
  "/**\n * Represents the parameters `prompts/get` accepts — a prompt name plus the optional argument\n * values and multi-round continuation carriers.\n *\n * @remarks\n * Argument values are strings by contract, which is what the prompt wire shape requires.\n */\n"),
 ("/** Parameters accepted by `completion/complete`. */\n",
  "/** Represents the parameters `completion/complete` accepts — a reference, the argument\n * fragment being completed, and the optional resolved context.\n */\n"),
 ("/** Represents a completion reference to one resource-template URI descriptor. */\n",
  "/**\n * Represents a completion reference to one resource-template URI descriptor.\n *\n * @remarks\n * The `uri` member may itself be a template, and it is forwarded to the host verbatim.\n */\n"),
 ("/** Represents the complete `completion/complete` result. */\n",
  "/**\n * Represents the complete `completion/complete` result.\n *\n * @remarks\n * The candidate set is capped at 100 values, and `hasMore` reads `true` whenever that cap\n * truncated the host's own answer.\n */\n"),
 ("/** Represents the parameters of a URL-mode `elicitation/create` request. */\n",
  "/**\n * Represents the parameters of a URL-mode `elicitation/create` request.\n *\n * @remarks\n * A consumer round may compose one, and the client must declare `elicitation.url` to receive it.\n */\n"),
]
s=io.open(P,encoding='utf8').read()
for old,new in EDITS:
    assert s.count(old)==1, (old[:70], s.count(old))
    s=s.replace(old,new,1)
io.open(P,'w',encoding='utf8').write(s)

P2='src/core/types.ts'
s=io.open(P2,encoding='utf8').read()
old=" * MCP owns no storage. The host may back this port with memory, a workspace, a database,\n * or any other registry."
new=" * MCP owns no storage and no template engine. The host may back this port with memory, a\n * workspace, a database, or any other registry."
assert s.count(old)==1
io.open(P2,'w',encoding='utf8').write(s.replace(old,new,1))
print('ok')
