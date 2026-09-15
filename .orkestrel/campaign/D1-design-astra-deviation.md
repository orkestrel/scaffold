OBJECTIVE lane.

## Design

## Alternatives

## Constraints

**Deviation: the fleet evidence contradicts the consumer manifests on the version baseline required by question 7.**

- **Expected:** O1 reports “No runtime range disagreement visible.” See [O1-orkestrel-report.md:45](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/O1-orkestrel-report.md:45).
- **Found:** Toolbox declares `@orkestrel/agent: ^0.0.21` under runtime dependencies. See [toolbox/package.json:86](C:/Users/mikes/WebstormProjects/toolbox/package.json:86).
- **Found:** Ollama declares `@orkestrel/agent: ^0.0.22` under runtime dependencies. See [ollama/package.json:75](C:/Users/mikes/WebstormProjects/ollama/package.json:75).

These ranges select different agent releases under the workspace’s documented `0.0.x` dependency policy. See [orchestration.md:837](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md:837), “What a bump obliges.”

## Refusals

The brief requires: “Stop and report — expected, found, exact evidence — when a distillate contradicts a file you read first-hand on a point the design rests on.”

That condition applies to the fleet baseline used to determine version alignment and re-pin obligations. The design and implementation units remain unissued pending corrected evidence. See [D1-design-brief.md](C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/D1-design-brief.md), “Deviation contract.”

## Measurements

The read-only command was:

```powershell
rg -n -F '"@orkestrel/agent"' `
  'C:/Users/mikes/WebstormProjects/toolbox/package.json' `
  'C:/Users/mikes/WebstormProjects/ollama/package.json'
```

It returned:

```text
toolbox/package.json:86: "@orkestrel/agent": "^0.0.21",
ollama/package.json:75: "@orkestrel/agent": "^0.0.22",
```

The declarations are beneath each manifest’s `dependencies` key, at toolbox line 85 and ollama line 74.

## Units

## Tensions

O1 must record toolbox’s agent range before the version plan is fixed. The corrected baseline must distinguish existing range disagreement from changes introduced by this campaign.

## Risks

The manifest evidence establishes differing declared ranges. It does not establish duplicate installed agent instances or a runtime failure. Those claims require inspecting the resolved consumer graph.