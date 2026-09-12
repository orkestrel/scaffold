# Probe helper line-ending reproduction

Root ran `node --experimental-strip-types tmp/pass/probe-helper-line-endings.mjs`
against the real canonical setup helpers. The command exited 1 on Node24.20.0.
The LF claim and section were extracted; equivalent CRLF text returned undefined.
JSON null below is the instrument's output representation of undefined.

```json
{
  "lf": {
    "claim": "const claim: Claim = {\n\tproject: 'core',\n}",
    "section": "\n\nBody."
  },
  "crlf": {
    "claim": null,
    "section": null
  }
}
```

The final deep-equality assertion failed. This confirms the independent lane's
specific line-ending vector. It does not claim that every helper or Guide's
inventory path fails on CRLF, nor does it establish a compiler mutation receipt.
No target source was edited. The registered transport failure remains separate.
