# Omitted method-table reading

Root reproduced Astra's source-backed vector through canonical Guide's built API.

```text
node --experimental-strip-types C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/inspect-parity-method-population.mjs
```

The command exited 0 (terminal a895e0). Removing the fixture's Methods section
leaves Guide.methods() empty while Source.methods('WidgetInterface') still returns
render. The shared methods report remains empty. Renaming the documented method
in an existing group produces missing and extra findings, so the group-inspection
path was exercised. The omitted-group boundary is not exercised by that control.

The retained pre-extraction scaffold expression in
evidence/d7n-scripts-ownership/product.diff.txt walks source.surface(), then requires
a method table for a behavioral declaration or exact coverage through its named
interface. The extracted loop only walks guide.methods(). The lost assertion is
inside preservation of scaffold's existing parity contract, not a new requirement.

```json
{
  "omittedGroups": [],
  "sourceMethods": [{ "name": "render", "summary": "Renders the widget." }],
  "omittedReport": [],
  "alteredReport": [
    { "spec": "guides/widget.md", "text": "guides/widget.md does not document WidgetInterface.render." },
    { "spec": "guides/widget.md", "text": "guides/widget.md documents no source WidgetInterface.missing." },
    { "spec": "guides/widget.md", "text": "guides/widget.md Widget.render is outside the WidgetInterface contract." }
  ]
}
```

This is an executed built-behavior reading, not a correction or a Probe receipt.
