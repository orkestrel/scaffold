# fold-57.py: the BROWSER-SERIALIZATION landing (83d23cf over 30978a8, base 97ac9ab, D45): record the build-independent proofs in the
# ROADMAP's Chromium 141 standing-condition row and in the plan's marker paragraph, and drop the CLOSE-OUT reading clause the landing
# satisfies. Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'; P='/home/user/scaffold/.orkestrel/veneer/plan.md'
edit(R, "Treat a reading that changes across builds as a defect in the assertion until it is proved a defect in the cascade. Chromium 141 clears an event's `target` after `dispatchEvent` returns on a detached host.",
        "Treat a reading that changes across builds as a defect in the assertion until it is proved a defect in the cascade: from `83d23cf` (D45) the close, form-select, and validation style proofs accept every serialization Chromium writes for one computed background position or size, and the preflight service proof compares each move by tag, property, and preflight value, so the rows the engine session's Chromium 153 host read red under E5 read green there. Chromium 141 clears an event's `target` after `dispatchEvent` returns on a detached host.")
edit(P, "D45 rules that those proofs assert computed geometry and build-independent values, and BROWSER-SERIALIZATION (`builder`, `/home/user/veneer-bs` from `97ac9ab`) carries it. The engine session's E5 excludes from its landing gate the rows red on its Windows host with Chromium 153 (the close, form-select, and validation style proofs and the preflight service proof, each green in this container's Chromium 141); those proofs are this session's, so CLOSE-OUT carries a reading of them against the engine session's `engine/units/host-chromium-153-reading.md` before the family closes.",
        "D45 rules that those proofs assert computed geometry and build-independent values, and BROWSER-SERIALIZATION (`builder`, `/home/user/veneer-bs` from `97ac9ab`, verified by `checker`) landed it as `83d23cf` on 2026-09-23 at 17:23 UTC: the close, form-select, and validation style proofs accept every serialization Chromium writes for one computed value, and the preflight service proof compares each move by tag, property, and preflight value, each green here on Chromium 141. The engine session reads those rows on its Chromium 153 host at its next landing and, where green, retires the E5 exclusion for them; a row still red there is a defect this session owns, reported through `engine/decisions.md`.")
print('fold-57 applied')
