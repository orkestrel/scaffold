# Independent review launch preparation

The reviewer bridge reported that the local Claude CLI resolves and its
authentication-status probe reports an active session. It reported no credential
read. This is untrusted bridge evidence, not a product review.

The returned launch omitted the reviewer route selector and verbose stream flag.
Root requested that bounded correction. The bridge returned:

```text
claude --agent reviewer -p 'Read and execute only the final brief at "tmp/claude/d7n-guide-parity-core-review-brief.md". Do not run commands, edit files, delegate, read credentials, orchestrate, reconcile, or accept. Return only the verdict required by the brief.' --model opus --effort high --permission-mode plan --verbose --output-format stream-json > tmp/claude/d7n-guide-parity-core-review.jsonl
```

No review was launched by the bridge. Root's saved carrier adds the pass environment,
explicit Git Bash path, canonical working directory, input guards, stderr journal,
and timeout 1800. Root will read the final brief before launching it.
