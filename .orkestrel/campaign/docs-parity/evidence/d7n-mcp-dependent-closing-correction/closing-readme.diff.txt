diff --git a/tmp/d7n-mcp-dependent-closing-correction/source-prepublish-freeze-v2/README.md b/README.md
index 1958c19..4a89a55 100644
--- a/tmp/d7n-mcp-dependent-closing-correction/source-prepublish-freeze-v2/README.md
+++ b/README.md
@@ -27,8 +27,6 @@ npm install @orkestrel/mcp
 
 ## Usage
 
-Expose a tool registry over MCP, mounted on the HTTP spine:
-
 ```ts
 import { createMCPLegacy, createMCPServer } from '@orkestrel/mcp'
 import { createMCPRoutes } from '@orkestrel/mcp/server'
@@ -43,6 +41,8 @@ const routes = createMCPRoutes(createMCPLegacy(mcp)) // answers `initialize` too
 router.add(routes)
 ```
 
+This example exposes a tool registry over MCP, mounted on the HTTP spine.
+
 Drive a remote MCP server as a client, over the same transport-agnostic core:
 
 ```ts
