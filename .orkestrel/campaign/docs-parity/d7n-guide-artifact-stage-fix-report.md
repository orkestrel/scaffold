Changed only `tmp/pass/guide-artifact-stage/inspect.mjs`.

```diff
-console.log(`guide-entry\t${require.resolve('@orkestrel/guide')}`)
 console.log(`markdown-entry\t${require.resolve('@orkestrel/markdown')}`)
```

Retained Guide manifest identity and runtime dependency checks. `node --check tmp/pass/guide-artifact-stage/inspect.mjs` exited 0.
