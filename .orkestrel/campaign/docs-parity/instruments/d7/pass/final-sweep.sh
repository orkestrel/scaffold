#!/usr/bin/env bash
# final-sweep.sh: reinstall the final guide tarball (1d5afa3 pack, dist index.js sha 2b76b363) --no-save in every closed checkout, serially.
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
for p in "$@"; do
  echo "##### $p $(date -u +%T)"
  bash $SCR/head-start.sh $p 2>&1 | grep -E '^==|EXIT|^[0-9]|^\(status' | tr '\n' ' '; echo
  echo "installed sha $(sha256sum /home/user/fleet/$p/node_modules/@orkestrel/guide/dist/src/core/index.js | cut -c1-8); dirty $(git -C /home/user/fleet/$p status --short | wc -l)"
done
