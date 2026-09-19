# Rough Notes

> Coverage knowledge for independent agents: products, magazine, marketplace search, and subscribe.

This workspace is a private Vue 3 knowledge site. It publishes no library. The `AGENTS.md` file at
the repository root names where the coding contract, the rule files, and the skills resolve.

## Development

```sh
npm install
npm run dev
npm test
```

Quality gates before commit, in order. Run `lint` then `format` first only to converge, then prove
with the checks:

```text
npm run format:check → npm run lint:check → npm run check → npm run build → npm test
```
