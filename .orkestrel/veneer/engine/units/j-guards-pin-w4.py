import hashlib
import subprocess
import sys

path = "src/browser/validators.ts"

def sha(p):
    with open(p, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

before = sha(path)
print("before:", before)

with open(path, "rb") as f:
    raw = f.read()

target = b"return isInstance(value, CustomEvent) && value.detail === null"
replacement = b"return isInstance(value, CustomEvent) && value.detail == null"
assert target in raw, "target not found"
raw2 = raw.replace(target, replacement)

with open(path, "wb") as f:
    f.write(raw2)

try:
    result = subprocess.run(
        [
            "npx", "vitest", "run", "--config", "vite.config.ts", "--no-cache",
            "--project", "src:browser", "tests/src/browser/validators.test.ts",
            "-t", "returns false for a custom event whose detail reads undefined",
        ],
        shell=True,
        capture_output=True,
    )
    out = result.stdout.decode("utf-8", errors="replace")
    err = result.stderr.decode("utf-8", errors="replace")
    sys.stdout.buffer.write(out[-3000:].encode("ascii", errors="replace"))
    sys.stdout.buffer.write(err[-3000:].encode("ascii", errors="replace"))
    print("\nexit:", result.returncode)
finally:
    with open(path, "wb") as f:
        f.write(raw)

after = sha(path)
print("after:", after)
assert before == after, "restore mismatch"
