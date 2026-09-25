# Updates plan.md at 05:45 EDT (2026-09-25). It records J-RELEASE-CORE's landing (b8c6a08), rewrites its In flight line to
# J-RELEASE-RECORD, and adds J-CONCERNS-B's round 2.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


swap_line(
    "- **J-RELEASE-CORE round 3** is committed as `8b4e9d6`",
    "- **J-RELEASE-RECORD** (`units/j-release-record-brief.md`, `opus` on Opus 5.5) is writing in "
    "`tmp/worktrees/release-record` from `b8c6a08`. `recordHostWrite` writes through `HostSnapshot.write`, every caller "
    "moves with it, and no engine saves a target it never changes (E35 unit 2a). J-RELEASE-POPUPS follows it on the "
    "popup files.\n"
    "- **J-CONCERNS-B round 2** (`units/j-concerns-b-brief-2.md`) is writing. Round 1 (`7ab04db`) closed D-MOTION, "
    "and its P-CANCEL cases now add a mutation history, per the audit's FAIL 2 (`units/j-concerns-b-audit-verdict.md`).",
)
old = "- 2026-09-25: J-MOTION-PROOFS-B as `b867c96`, pushed."
assert t.count(old) == 1, t.count(old)
t = t.replace(
    old,
    "- 2026-09-25: J-RELEASE-CORE as `b8c6a08`, pushed: `Lifetime`, `HostSnapshot.write`, `matchesHostValue`, and "
    "`Button` as the first consumer (E35). Its rounds are `d702bb8`, `03526bc`, `8b4e9d6`, and `0becad3` "
    "(`units/j-release-core-audit-verdict.md` and `-audit-2-verdict.md` to `-audit-4-verdict.md`, PASS on round 4). "
    "The landing read every gate green except the four standing reboot rows.\n" + old,
    1,
)
p.write_bytes(t.encode('utf-8'))
print('ok')
