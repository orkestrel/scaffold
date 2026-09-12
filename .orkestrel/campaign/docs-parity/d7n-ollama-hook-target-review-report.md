The target application and candidate landing satisfy the scoped claims.

1. **CONFIRMED.** Recorded overwrite exits `1` with the documented skipped-catalog diagnostic; the following offline audit and packed hook/settings comparisons exit `0`. The diff records tracked script deletions, removes the `docs` command, and retains the native `GuideCommand` entry. CI and the guide invoke `ollama.sh`. The Vite change only corrects service ownership wording.

2. **CONFIRMED.** Registry installation succeeds. The manifest declares Scaffold `^0.0.64`, and the captured lock entry resolves registry version `0.0.64`; installed version `0.0.65` matches the packed archive’s `dist`. Manifest/lock hashes remain unchanged across the no-save install. SDK and peer-metadata readings match. The generated diff changes no published runtime implementation or public contract.

3. **CONFIRMED — landing-script source review.** The script requires prepublish success, expected canonical branch/HEAD, empty index, no untracked input, matching diff, allowed paths, and origin/main ancestry before committing explicit paths. It pushes only the campaign branch and checks its remote tip. The prepublish receipt records exit `0`, and its diff matches the reviewed trial diff. The existing workflow accepts campaign pushes on Ubuntu.

Linux lifecycle execution remains unresolved. This verdict supports candidate landing, not main closure or release acceptance.
