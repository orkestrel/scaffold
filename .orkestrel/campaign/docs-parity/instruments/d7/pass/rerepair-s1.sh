#!/usr/bin/env bash
# rerepair-s1.sh: codec, msg, sse re-repaired serially from the re-packed tip after slice 1 closed.
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
for p in codec msg sse; do bash $SCR/rerepair.sh $p; done
echo "== rerepair-s1 done"
