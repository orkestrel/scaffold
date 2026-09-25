# Rewrites the Veneer ROADMAP.md J-ENGINE row's route, depends, and delivers cells in the roadmap-0925 worktree (the
# 2026-09-25 re-baseline, units/rebaseline-0925.md): the route cell points at the engine plan instead of listing units and
# names host-neutral paths and the ledger's audit routes; depends names E26's motion split; delivers adds E26's oracle.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\roadmap-0925\ROADMAP.md')
t = p.read_bytes().decode('utf-8')

ROUTE_OLD_START = 'in the engine session (D43): its own terrain and design rounds, then `opus` on Opus 5.5 per unit'
ROUTE_OLD_END = "the guide's `plugin` rows are the only record of which units have landed"
ROUTE_NEW = (
    "in the engine session (D43): its own terrain and design rounds, then each unit on the route its brief names "
    "(`opus` on Opus 5.5 for most), audited by `analyst` on GPT-6 Astra, the `checker` job on Grok first, and "
    "`reviewer` on Opus 5.5 where a unit changes a public shape; the kickoff brief `j-engine-session-brief.md` and the "
    "engine records sit in the scaffold checkout's `.orkestrel/veneer/` and `.orkestrel/veneer/engine/`; the engine "
    "`plan.md` is the one record of the units landed, in flight, and queued, with each open finding and its carrier, the "
    "engine `decisions.md` holds the rulings (`E<n>`), and each `plugin` row's Status, Proof, and Obligation cells "
    "record that plugin"
)
DEPENDS_OLD = 'B-MODAL … B-CAROUSEL); E-IDENTITY for the motion values'
DEPENDS_NEW = 'B-MODAL … B-CAROUSEL); the styles session for the motion values (E26)'
DELIVERS_OLD = '`Swipe`, `Sanitizer`, and `TemplateFactory` utilities ruled native-first (D41)'
DELIVERS_NEW = (
    '`Swipe`, `Sanitizer`, and `TemplateFactory` utilities ruled native-first (D41), and each plugin\'s parity proved '
    'against an independent recording of Bootstrap 5.3.8\'s bundle (E26)'
)

start = t.index(ROUTE_OLD_START)
end = t.index(ROUTE_OLD_END, start) + len(ROUTE_OLD_END)
assert t.count(ROUTE_OLD_START) == 1 and '\n' not in t[start:end]
t = t[:start] + ROUTE_NEW + t[end:]
for old, new in ((DEPENDS_OLD, DEPENDS_NEW), (DELIVERS_OLD, DELIVERS_NEW)):
    assert t.count(old) == 1, old
    t = t.replace(old, new)
p.write_bytes(t.encode('utf-8'))
print('rewritten')
