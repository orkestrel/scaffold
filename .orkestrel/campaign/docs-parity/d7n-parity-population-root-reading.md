# Parity population reading

Root ran the saved instrument against canonical Guide's built output and its real
fixture inventory. Command:

```text
node --experimental-strip-types C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/inspect-parity-population.mjs
```

The host run exited 0 (terminal 2a32cc). An intact fixture reports no fence or example
findings. Removing the member's source example and its guide invocation leaves
fences, method membership, and matched drift empty, but reports the missing
WidgetInterface.render example. Selecting a configured example language absent
from the guide leaves the current fences group empty. Rejecting the actual guide
language produces fence findings, so the inspection was exercised.

This reading confirms the report-population separation and missing configured-language
presence in the held artifact. It does not certify a corrected implementation or
claim a Probe receipt. This instrument measures built behavior, not a proposed
TypeScript edit. Permanent Guide controls and the actual scaffold command carry
the correction's acceptance.

```json
{
  "intact": { "fences": [], "examples": [] },
  "undocumentedMember": {
    "fences": [], "methods": [], "drift": [],
    "examples": [{
      "spec": "guides/widget.md",
      "text": "guides/widget.md has no example for WidgetInterface.render."
    }]
  },
  "absentLanguage": [],
  "refusedLanguage": [
    {
      "spec": "guides/widget.md",
      "text": "guides/widget.md has an unlisted fence language under Create a widget: ts."
    },
    {
      "spec": "guides/widget.md",
      "text": "guides/widget.md has an unlisted fence language under Render a widget: ts."
    }
  ]
}
```
