# Appends the fourth standing reading to units/host-chromium-153-reading.md (2026-09-25): the four button-reboot cases
# the styles session's E-ID-BUTTON-CLASSES added read red on this host at `pressed`, on outline-width. The reading was
# taken on Veneer main 0a0a252 alone, with no engine change present.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\units\host-chromium-153-reading.md')
t = p.read_bytes().decode('utf-8')
t = t.rstrip('\n') + '\n\n' + (
    "## Fourth standing reading (2026-09-25, the J-SAMEWAY-ENGINES-B landing)\n\n"
    "The styles session's E-ID-BUTTON-CLASSES (on `main` as `0a0a252`) closes the third row. Its `.btn` form case "
    "compares the Veneer map of button-versus-anchor differences with the release's map, read in the same browser. "
    "Its four new button-reboot cases read red on this host.\n\n"
    "The J-SAMEWAY-ENGINES-B landing chain read the four reds. The Orchestrator re-ran the four files alone on the main "
    "checkout at `0a0a252`, with no engine change present, through the styles config after `npm run build:src:styles`, "
    "and read the same four failures. So they are `main`'s reading on this host, not the engine landing's.\n\n"
    "| Proof | State | The release's map | Veneer's map |\n"
    "| --- | --- | --- | --- |\n"
    "| `tests/src/styles/components/carousel.test.ts`, \"carousel button reboot\" (the carousel indicator) | pressed | "
    "`outline-width: 0px` | absent |\n"
    "| `tests/src/styles/components/dropdown.test.ts`, \"dropdown-item button reboot\" | pressed | `outline-width: 0px` | "
    "absent |\n"
    "| `tests/src/styles/components/list-group.test.ts`, \"list-group-item button reboot\" | pressed | "
    "`outline-width: 0px` | absent |\n"
    "| `tests/src/styles/components/nav.test.ts`, \"nav-link button reboot\" | pressed | `outline-width: 0px` | absent |\n\n"
    "Each is the same Chromium 153 behaviour as the third row: the user agent's focus outline on a pressed button, "
    "which the release's map carries and Veneer's does not. E5 excludes these four as standing rows, and the landing "
    "runs `tools/w2-land-rest.sh` past them. The styles session receives the reading.\n"
)
p.write_bytes(t.encode('utf-8'))
print('ok')
