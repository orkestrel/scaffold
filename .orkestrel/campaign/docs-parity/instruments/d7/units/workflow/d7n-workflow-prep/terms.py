from pathlib import Path

edits = [
('src/browser/FrameScheduler.ts',
 " * whose `yield` resumes just before the next paint through `requestAnimationFrame`.",
 " * whose `yield` resumes before the next paint through `requestAnimationFrame`."),
('src/browser/FrameScheduler.ts',
 "\t * Yields control to the host until just before the next paint through",
 "\t * Yields control to the host until the moment before the next paint through"),
('src/browser/factories.ts',
 " * just before the next paint through `requestAnimationFrame`; `delay(ms)` is a real",
 " * before the next paint through `requestAnimationFrame`; `delay(ms)` is a real"),
]

for path, before, after in edits:
    p = Path(path)
    text = p.read_text()
    if text.count(before) != 1:
        raise SystemExit(f'{path}: found {text.count(before)} occurrences of {before!r}')
    p.write_text(text.replace(before, after))
    print(f'{path}: ok')
