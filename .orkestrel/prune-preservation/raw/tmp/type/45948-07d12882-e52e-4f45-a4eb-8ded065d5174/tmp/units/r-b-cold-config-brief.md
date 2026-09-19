# Author cold dev-entry comparison configurations

Act as builder on Terra. Read canonical AGENTS.md, .agents/orchestration.md, tests/workspace/portability rules, orkestrel-prove-journey and references, and saved `r-b-config-design.md`. Perform directly and spawn nothing. The R-B source snapshot is frozen; do not modify source.

Own only `C:/Users/mikes/WebstormProjects/scaffold/tmp/recovery/roughnotes/tmp/probe/r-b-cold/`. Author a plain Vite config and a historical-list Vite config. Each imports defineConfig from vite and appBrowser from ../../../vite.config.ts. Each calls the generated appBrowser with a distinct relative cacheDir inside this temporary directory and a strict local server port: plain127.0.0.1:5197, historical127.0.0.1:5198.

Plain supplies no optimizeDeps override. Historical supplies exactly optimizeDeps.include ['vue','bootstrap','@popperjs/core','@orkestrel/test','@orkestrel/test/browser']. Preserve all other generated appBrowser behavior through its existing mergeOverride. No env changes, source edits, package addition, install, server start or browser run.

Return exact npm/npx commands to launch each with --force. Validate scoped formatting only. The Orchestrator will compare real dev arrival, route navigation and Bootstrap menu interaction through Chromium and retain results. If using these temporary configs changes a generated HTML or root path assumption, report that before writing a workaround.
