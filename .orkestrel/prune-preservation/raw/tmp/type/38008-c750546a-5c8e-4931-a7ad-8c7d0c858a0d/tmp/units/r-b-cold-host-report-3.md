# R-B cold-host pre-runtime correction

The runner pins `configs/app/vite.journey.config.ts` to SHA256 `B65C938A16A410F069166DCD0FF6F9E234354B533D7CA4C4A0BBEE89871F6EC9` before every launch.

The derived config exports its copied variant snapshot, resolves expected and actual cache paths through `node:path`, and emits an unwrapped active or refusal marker before any mismatch throw. Cache file collection always returns an array, including an empty result.

The successor retains the generated wrapper's exact variant block. Runtime proof remains parent-owned.
