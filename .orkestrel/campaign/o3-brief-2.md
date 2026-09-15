# Unit O3, second run — successor to `o3-brief.md`

This brief supersedes step 3 of `tmp/units/o3-brief.md` and restates the deviation contract.
Everything else in the first brief stands unchanged.

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/ollama`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit.

## What changed and why

The first brief's step 3 conflated two server-side failures in one sentence. The installed relay
maps them differently, by design (the campaign's design row 7 and the ruled `RelayFrame`): a
server-side `ProviderAbortError` crosses as the `abort` frame carrying the partial, and only a
non-abort failure becomes the fixed `error` frame. The Orchestrator wrote the conflation; the
relay is right.

## The superseding step 3

3. Abort and failure across the hop, hermetic, as three cases:
   - **Browser cancel.** A daemon transport whose stream stays open after one delta; the browser
     side reads that delta, then aborts its own signal; assert the browser side throws
     `ProviderAbortError` with `partial.content` equal to the delta, the daemon transport's
     recorded request signal is aborted, and the relay server has no open provider iterator (its
     `stop` resolves within the test's own budget).
   - **Server-side abort.** The server's `createOllama` carries a short `timeout` (for example
     50 ms) over a daemon transport that delivers one delta and then stalls; the base's own
     deadline throws `ProviderAbortError` on the server, the relay writes the `abort` frame with
     the partial, and the browser side throws `ProviderAbortError` whose `partial.content` equals
     the delta while the browser's own signal stays unaborted.
   - **Server-side failure.** A daemon transport whose stream errors after one delta; the
     server-side provider surfaces a non-abort failure, the relay writes the `error` frame
     (`channel` and `message` only, the fixed relay message), and the browser side throws
     `ProviderError` with code `PROVIDER`, the fixed message, and no daemon text in it.

## Standing conditions added

- The tree at launch is `4ce25b3` plus whatever the first run left; read `git status --porcelain`
  first and keep every edit the first run made that the superseding step does not contradict.
- Git prints a warning that it cannot access `C:\Users\mikes/.config/git/ignore` inside the
  sandbox. The warning is harmless.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing. Read `tmp/units/o3-brief.md` first, then `tmp/units/o3-report.md` if the first run wrote
one, then this brief, and execute the first brief as amended here.

## Output

Write the report to `tmp/units/o3-report-2.md` and return the same text as your final message, in
the shape the first brief's § Output fixes.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
the installed relay cannot express a case, when a case needs a `src/**` change, or when the canned
transport cannot produce a daemon shape `OllamaProvider` reads. Decide, record, and carry on from
test naming, fixture placement inside `setupServer.ts`, and the exact timeout values.
