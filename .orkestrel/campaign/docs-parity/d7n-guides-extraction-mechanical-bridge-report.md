Engine: Cursor Grok.

Launch is blocked: `CURSOR_GROK_MODEL` is unset. The versioned CLI passed `--version`; containment stayed unchanged.

```powershell
& 'C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.09.08-6caf4ff\node.exe' `
  'C:\Users\mikes\AppData\Local\cursor-agent\versions\2026.09.08-6caf4ff\index.js' `
  -p --trust --mode=ask --model $env:CURSOR_GROK_MODEL --output-format stream-json `
  'C:\Users\mikes\WebstormProjects\scaffold\tmp\units\d7n-guides-extraction-mechanical-brief.md' `
  > 'C:\Users\mikes\WebstormProjects\scaffold\tmp\cursor\d7n-guides-extraction-mechanical.jsonl' `
  2> 'C:\Users\mikes\WebstormProjects\scaffold\tmp\cursor\d7n-guides-extraction-mechanical.err'
```

Journal: `tmp/cursor/d7n-guides-extraction-mechanical.jsonl`
Stderr: `tmp/cursor/d7n-guides-extraction-mechanical.err`
Session: unavailable until launch.
