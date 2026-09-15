<!-- Unit G5c — researcher (Sonnet, native), successor of G5b. Retained verbatim from the completion notification, 2026-09-15. Duration 107 s, 12 tool uses. Every quote is WebFetch's rendering of the source except the IDL fetch of index.bs and the chromestatus JSON, which returned literally (see Deviation). -->

Question: Quote the WebMCP specification's WebIDL, code samples, declarative attributes, lifecycle sentences, and chromestatus fields verbatim, so a design can name the surface exactly.

## 1. The WebIDL (from `https://raw.githubusercontent.com/webmachinelearning/webmcp/main/index.bs`, fetched 2026-09-15)

The global is `document.modelContext`, confirmed by the IDL's own `partial interface Document`.

```webidl
partial interface Document {
  [SecureContext, SameObject] readonly attribute ModelContext modelContext;
};

[Exposed=Window, SecureContext]
interface ModelContext : EventTarget {
  Promise<undefined> registerTool(ModelContextTool tool, optional ModelContextRegisterToolOptions options = {});
  Promise<sequence<RegisteredTool>> getTools(optional ModelContextGetToolOptions options = {});
  Promise<DOMString> executeTool(RegisteredTool tool, optional any inputObject, optional ModelContextExecuteToolOptions options = {});

  attribute EventHandler ontoolchange;
};

dictionary ModelContextTool {
  required DOMString name;
  USVString title;
  required DOMString description;
  object inputSchema;
  required ToolExecuteCallback execute;
  ToolAnnotations annotations;
};

dictionary ToolAnnotations {
  boolean readOnlyHint = false;
  boolean untrustedContentHint = false;
  boolean consequentialHint = false;
};

dictionary ToolExecuteCallbackOptions {
  required AbortSignal signal;
};

callback ToolExecuteCallback = Promise<any> (object inputObject, ToolExecuteCallbackOptions options);

dictionary ModelContextRegisterToolOptions {
  sequence<USVString> exposedTo;
  AbortSignal signal;
};

dictionary ModelContextGetToolOptions {
  sequence<USVString> fromOrigins;
};

dictionary ModelContextExecuteToolOptions {
  AbortSignal signal;
};

dictionary RegisteredTool {
  required DOMString name;
  DOMString title;
  required DOMString description;
  object inputSchema;
  required Window window;
  required USVString origin;
  ToolAnnotations annotations;
};
```

`executeTool`'s IDL return type is `Promise<DOMString>`, which conflicts with the README sample's
structured `{ content: [...] }` return value. The primary source disagrees with itself; the design
names it as open rather than resolving it by inference.

## 2. Imperative samples (from `https://raw.githubusercontent.com/webmachinelearning/webmcp/main/README.md`, fetched 2026-09-15)

```js
const controller = new AbortController();

await document.modelContext.registerTool({
  name: "add-todo",
  description: "Add a new item to the user's active todo list",
  inputSchema: {
    type: "object",
    properties: {
      text: { type: "string", description: "The text content of the todo item" }
    },
    required: ["text"]
  },
  async execute({ text }) {
    await addTodoItemToCollection(text);
    return {
      content: [
        { type: "text", text: `Added todo item: "${text}" successfully.` }
      ]
    };
  }
}, { signal: controller.signal });

// To unregister the tool later, abort the signal.
// controller.abort();
```

```js
const tools = await document.modelContext.getTools();
const crossOriginTools = await document.modelContext.getTools({
  fromOrigins: ["https://trusted-partner.example"]
});
```

```js
const tools = await document.modelContext.getTools();
const addTodoTool = tools.find(t => t.name === "add-todo");
const result = await document.modelContext.executeTool(addTodoTool, { text: "Buy groceries" });
```

```js
const controller = new AbortController();
const executionPromise = document.modelContext.executeTool(
  addTodoTool,
  { text: "Buy groceries" },
  { signal: controller.signal }
);
stopButton.addEventListener('click', e => controller.abort());
```

```js
document.modelContext.addEventListener("toolchange", async () => {
  const currentTools = await document.modelContext.getTools();
  updateAgentToolRegistry(currentTools);
});
```

## 3. Declarative surface (`index.bs` says "This section is entirely a TODO. For now, refer to the Declarative API explainer."; explainer at `declarative-api-explainer.md`, fetched 2026-09-15)

```html
<form
  toolname="Search flights"
  tooldescription="This form searches flights and displays [...]"
  toolautosubmit>
```

```html
<form toolname="search-cars" tooldescription="Perform a car make/model search" [...]>
 <input type=text name="make" toolparamdescription="The vehicle's make (i.e., BMW, Ford)" required>
 <input type=text name="model" toolparamdescription="The vehicle's model (i.e., 330i, F-150)" required>
 <button type=submit>Search</button>
</form>
```

Attributes on `<form>`: `toolname`, `tooldescription`, boolean `toolautosubmit`. Attribute on a
form control: `toolparamdescription`. The `[...]` markers are the fetch tool's elisions.

Submission-to-tool-call path (WebFetch's rendering, marked inference): when a form performs a
navigation, the first `<script type=application/ld+json>` tag on the target page is used as the
cross-document tool's response; `SubmitEvent#respondWith(Promise<any> agentResponse)` overrides
default submission; new CSS pseudo-classes `:tool-form-active` and `:tool-submit-active`; new events
`toolactivated` and `toolcanceled` on the `ModelContext` object.

## 4. Tool result shape

IDL types `executeTool` as `Promise<DOMString>`; the README's `execute` returns
`{ content: [{ type: "text", text }] }` (the MCP tool-result shape). Errors: the sample wraps
`executeTool` in `try`/`catch`; no separate refusal signal is quoted. Annotations, verbatim:
`readOnlyHint = false`, `untrustedContentHint = false`, `consequentialHint = false`.

## 5. Lifecycle (WebFetch's rendering of `index.bs` prose, marked inference)

- "Access to the APIs in this specification is gated behind the policy-controlled feature "tools", which has a default allowlist of 'self'."
- "Because documents only process tasks on their event loops when fully active, if targetDocument is not fully active, this will simply queue the steps to execute the tool, to run when the document finally becomes active again (i.e., when it leaves the bf-cache)."
- "Consider supporting tool execution across top-level documents in the same browsing context group."
- Chrome docs (`https://developer.chrome.com/docs/ai/webmcp`): both APIs gated by the `tools` Permissions Policy; defaults to `self`; cross-origin iframe needs `allow="tools"`.

## 6. Caller

Nothing fetched names an extension API or the user agent as the direct caller. The README samples
show a page script calling `document.modelContext.executeTool` itself, so on the fetched evidence a
page can execute its own registered tool. No fetched sentence states the deployed caller.

## 7. Shipping status (`https://chromestatus.com/api/v0/features/5117755740913664`, literal JSON, fetched 2026-09-15)

```json
{
  "name": "WebMCP",
  "browsers": { "chrome": { "bug": "https://crbug.com/445637567", "origintrial": false, "flag": false,
    "status": { "text": "Proposed", "val": 2, "milestone_str": "Proposed" }, "announced": false } },
  "standards": { "spec": "https://webmachinelearning.github.io/webmcp",
    "maturity": { "text": "Specification being incubated in a Community Group", "short_text": "Incubation", "val": 3 } },
  "created": { "by": "bokan@chromium.org", "when": "2025-07-08 19:29:42.615078" },
  "updated": { "by": "fbeaufort@google.com", "when": "2026-08-12 05:43:50.470558" }
}
```

`"origintrial": false` and `"flag": false` contradict the rendered-page paraphrases (Chrome 149
origin trial, `chrome://flags/#enable-webmcp-testing`). The JSON field is the reading of record;
the rendered-page claims are unverified.

## Distillate (names a design must use)

- Global: `document.modelContext` (`ModelContext`, an `EventTarget`).
- Methods: `registerTool(tool, options)`, `getTools(options)`, `executeTool(tool, inputObject, options)`. Event: `toolchange`.
- `ModelContextTool`: `name`, `title`, `description`, `inputSchema`, `execute`, `annotations`. `ToolAnnotations`: `readOnlyHint`, `untrustedContentHint`, `consequentialHint`. `RegisteredTool`: `name`, `title`, `description`, `inputSchema`, `window`, `origin`, `annotations`.
- Options: `ModelContextRegisterToolOptions` (`exposedTo`, `signal`), `ModelContextGetToolOptions` (`fromOrigins`), `ModelContextExecuteToolOptions` (`signal`).
- Callback: `ToolExecuteCallback(inputObject, { signal })` → `Promise<any>`; `executeTool` declared `Promise<DOMString>` (open contradiction).
- Declarative: `toolname`, `tooldescription`, `toolautosubmit` on `<form>`; `toolparamdescription` on controls; `:tool-form-active`, `:tool-submit-active`; `toolactivated`, `toolcanceled`.
- Permissions Policy feature `"tools"`, default `'self'`. Chromestatus: `Proposed`, no flag, no origin trial, 2026-08-12.

## Unknowns

- `executeTool` return: `Promise<DOMString>` (IDL) or a structured object (sample).
- Byte-exact text of the declarative explainer and the lifecycle prose (WebFetch paraphrased).
- The intended production caller of `executeTool`.
- Whether the rendered-page origin-trial and flag claims are stale, wrong, or newer than the JSON record.
- Whether `navigator.modelContext` appears anywhere; only the `Document` partial was found.

Journal: native lane, no journal.

Deviation: WebFetch never returned unmediated raw bytes for the README's full text, the lifecycle
prose, or the declarative explainer; every quote is WebFetch's rendering except the IDL fetch of
`index.bs` and the chromestatus JSON, which returned literally.
