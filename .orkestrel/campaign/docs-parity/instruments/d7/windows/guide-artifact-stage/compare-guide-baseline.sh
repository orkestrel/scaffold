#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
STAGE="$SCR/d7n-guide-stage.MQbCaa"
BEFORE="$SCR/packed/d7n-guide-bootstrap.47Q7XT/orkestrel-guide-0.0.18.tgz"
printf '%s  %s\n' 3a60e83f4c6319f029106f3d9588ed186639f72c222a34045326439cfff73519 "$BEFORE" | sha256sum --check --status
test ! -e "$STAGE/previous-guide"
mkdir "$STAGE/previous-guide"
tar -xzf "$BEFORE" -C "$STAGE/previous-guide"
diff -qr -x '*.map' "$STAGE/previous-guide/package/dist" "$STAGE/extracted/package/dist" > "$STAGE/logs/baseline-dist.log.txt"
printf 'exit=0\n' >> "$STAGE/logs/baseline-dist.log.txt"
