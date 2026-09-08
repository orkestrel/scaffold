"""Compares the guide's table cells against the baseline, ignoring column padding."""

import subprocess


def rows(text):
    out = {}
    for line in text.split("\n"):
        stripped = line.strip()
        if not stripped.startswith("|") or set(stripped) <= set("|- "):
            continue
        cells = [cell.strip() for cell in stripped.strip("|").split(" | ")]
        out.setdefault(cells[0], []).append(cells)
    return out


base = rows(
    subprocess.run(
        ["git", "show", "HEAD:guides/browser.md"],
        cwd="/home/user/fleet/browser",
        capture_output=True,
        text=True,
        check=True,
    ).stdout
)
now = rows(open("/home/user/fleet/browser/guides/browser.md", encoding="utf-8").read())

print(f"keys in baseline: {len(base)} keys now: {len(now)}")
print(f"keys missing now: {sorted(set(base) - set(now))}")
print(f"keys added now: {sorted(set(now) - set(base))}")
for key in sorted(set(base) & set(now)):
    if base[key] != now[key]:
        for left, right in zip(base[key], now[key]):
            if left != right:
                print(f"CHANGED {key}")
                for column, (a, b) in enumerate(zip(left, right), 1):
                    if a != b:
                        print(f"  column {column}\n    was: {a}\n    now: {b}")
        if len(base[key]) != len(now[key]):
            print(f"  ROW COUNT {len(base[key])} -> {len(now[key])}")
