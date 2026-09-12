Finished corrections:

- `scripts/ollama.sh`: native IP classification, bounded TERM/KILL cleanup, reserved cleanup time, and post-install daemon re-probe.
- `tests/src/server/helpers.test.ts`: numeric-prefix DNS regression.
- `guides/scaffold.md`: truthful vendor preservation, service preparation, and cleanup wording.
- `.claude/rules/workspace.md` and `src/core/templates.ts`: caller preparation and readiness verification wording.

No validation command was run; root owns the gates. Suggested settling command:

```bash
OLLAMA_HOST=http://127.example.invalid:11434 OLLAMA_MODEL=fixture-model scripts/ollama.sh
```

Linux installation remains unexecuted. No command is running.
