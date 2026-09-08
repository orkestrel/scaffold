import sys, pathlib

def sub1(path, old, new, label):
    p = pathlib.Path(path)
    t = p.read_text(encoding='utf-8')
    if t.count(old) != 1:
        sys.exit(f'FAIL {label}: occurrences={t.count(old)}')
    p.write_text(t.replace(old, new, 1), encoding='utf-8')
    print('ok', label)

# --- Item 4: the README's onboarding ---
sub1('/home/user/fleet/queue/README.md',
"""Create a queue with the `createQueue` function, hand it the handler that does the work, and
await the promise each input hands back. Pass a `store` where the unfinished work must survive
a restart, and subscribe to the `emitter` where a logger, a metric, or a trace needs the
lifecycle moments. Environment-agnostic — no I/O, no browser or server assumptions. Part of
the `@orkestrel` line.""",
"""Create a queue with the `createQueue` function, hand it the handler that does the work, and
await each input's result. Pass a `store` where the unfinished work must survive a restart,
and subscribe to the `emitter` where a logger, a metric, or a trace needs the lifecycle
moments. Environment-agnostic — no I/O, no browser or server assumptions. Part of the
`@orkestrel` line.""",
'README onboarding')

# --- Item 2: QueueErrorContext's clause ---
sub1('/home/user/fleet/queue/src/core/types.ts',
""" * Represents the structured context carried by a {@link QueueError}.
 *
 * @example""",
""" * Represents the structured context carried by a {@link QueueError}.
 *
 * @remarks
 * `option` names the {@link QueueOption} the refused value was supplied for, and `operation`
 * names the store call that failed.
 *
 * @example""",
'QueueErrorContext remarks')

# --- Item 6: BROAD ---
sub1('/home/user/fleet/queue/src/core/factories.ts',
'// runs on the BROAD `ContractShape`,',
'// runs on the broad `ContractShape`,',
'BROAD comment')

# --- Item 5: the drop-in header ---
sub1('/home/user/fleet/queue/tests/guides.test.ts',
"// package's own, and are the only part a sibling package changes.",
"// package's own, as is the executed section that closes the file.",
'drop-in header line 3')
