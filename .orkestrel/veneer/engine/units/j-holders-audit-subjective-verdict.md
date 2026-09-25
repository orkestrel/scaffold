<!-- The J-HOLDERS subjective lane (reviewer on Opus 5.5, native read-only subagent adc88cc286b0443b3), retained verbatim from its completion notification because its transcript file was empty; brief: units/j-holders-audit-reviewer-brief.md; claims units/j-holders-audit-claims.md; subject Veneer ef320ca. -->

**J-HOLDERS audit: subjective lane (Opus 5.5, `reviewer`)**

I held the subjective lane: shape, naming, design fit, and guide voice. I ruled on no behaviour. The subject is the Veneer snapshot at `ef320ca`: `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-holders-ef320ca/`. I read it against `j-holders.diff` and the status in the brief.

The design fits. H1, H2, H3, and H4's placement and names all hold. Five prose changes are needed, all in the guide or in TSDoc: findings 3, 5, 8, 9, and 11.

## Findings

1. **H4 placement: the four shapes belong in `types.ts` and in the barrel.** `src/browser/types.ts:422-458`. **CONFIRMED-FIT.**
   - The repository has no private placement for a shared type. The barrel is `export *` only (`src/browser/index.ts:1`). `architecture.md` § Declaration placement requires every declaration in a centralized file to be exported. The `INTERNAL` exemption in § Barrel exports covers classes only.
   - The only other option, "a true local", is the inline shape. That is the carried finding this unit closes.
   - Precedent exists: `TabInitialWrite` and `TabDropdown` (`types.ts:1196`, `types.ts:1206`) are used only by Tab's private methods (`Tab.ts:286`, `302`, `343`, `351`). Both are exported with § Surface rows (`guides/veneer.md:190-191`).
   - "Minimal public API" is a gate on creating a capability, not on where a shape is declared. So it does not conflict with "Centralize by kind" here.
   - Each shape appeared inline at least twice at the base, so extracting them follows "Centralize any pattern repeated twice". Isolation's claim shape appears once (`Isolation.ts:43`), so leaving it inline is consistent.

2. **H4 names: `HostSnapshotEntry`, `HostSnapshotRecord`, `HostSnapshotHolding`, `HostSnapshotPresence`.** `types.ts:423`, `431`, `445`, `453`. **CONFIRMED-FIT.**
   - Each follows the `{Entity}{Noun}` form that `HostSnapshotTarget` and `TabDropdown` already use.
   - None is plural, none uses `kind` or `type`, and none uses a rejected generic word.
   - `Entry` and `Holding` use two different words for "a thing a snapshot holds", one for a target and one for a presence record. Each TSDoc line says which it is, so renaming them is churn with no gain.
   - Typing parameters as `HostSnapshotHolding['attribute']` has precedent in `TooltipProfile['attributes']`.

3. **H4 § Surface voice: `HostSnapshotRecord` and `HostSnapshotPresence`.** `types.ts:430` and `guides/veneer.md:66`; `types.ts:452` and `guides/veneer.md:68`. **CHANGE.**
   - The Record summary says the last holder "writes back" the record. The holder writes back the record's value, which is the wording § Engine uses at `veneer.md:934`.
   - The Presence summary ends "shares for the attribute that holds it". There, "it" can mean the token, the property, or the element.
   - Replace both sentences, in the TSDoc and the § Surface row alike, because parity compares them:
     - Record: "Describes the one record that every snapshot holding a target shares, and whose value the target's last holder writes back."
     - Presence: "Describes the presence record that every snapshot saving a class token or an inline property on one element shares, which reads whether the element carried its `class` or `style` attribute."
   - `HostSnapshotEntry` and `HostSnapshotHolding` rows read correctly and stay.

4. **H1 shape: `Modal` keeps a second snapshot, `#open`.** `src/browser/Modal.ts:107-111`, `274-278`, `407`, `454`. **CONFIRMED-FIT.**
   - The two fields hold two lifetimes. `#snapshot` covers the modal's life and restores at destruction. `#open` covers one show-to-hide span and restores at each hide or at destruction.
   - Each field is one concept, and deleting `#holdOpen`, `#releaseOpen`, and the static map leaves no wrapper behind.
   - `open` (the token string), `#open` (the snapshot), and `opened` (the step's result) sit within a few lines of each other. Each is qualified by its position, and the field mirrors the `open` key of the classes group, so no rename is needed.

5. **H1 TSDoc: the show sentence.** `Modal.ts:50-51`. **CHANGE.**
   - "joins the one record the modals of one document share of the body's `open` token and adds the token when the body lacks it" breaks on first reading at "share of".
   - Replace with: "joins the record of the body's `open` token that the modals of one document share, adds the token when the body lacks it, shows the backdrop …". The rest of the sentence stays as it is.

6. **H2 shape: `Isolation` splits its claims list from its snapshot.** `src/browser/Isolation.ts:38-53`, `125-161`. **CONFIRMED-FIT.**
   - The static `#claims` list holds precedence: which claim decides the attribute now. The per-isolation `#snapshot` holds the original value to write back.
   - The base bundled a shared snapshot into each claims entry. Isolation now matches every other engine's `#snapshot` field, which is simpler.
   - The comment at `Isolation.ts:38-40` states why the record cannot hold the order. The class remarks at `Isolation.ts:16-28` describe the hand-offs followed by one restoration.

7. **H3: why ScrollLock keeps its holder group.** `src/browser/ScrollLock.ts:36-41`. **CONFIRMED-FIT.**
   - The comment gives the right reason: the first lock's measurement is what finds the targets, and a later lock cannot find them again.
   - It also explains the contrast with H1. The `open` token is one target every modal already knows, so Modal could move to the shared record while ScrollLock cannot.
   - The comment is written as a "why" comment, as `typescript.md` requires.

8. **§ Engine: the "each engine keeps a snapshot" sentence.** `guides/veneer.md:927` and `veneer.md:933`. **CHANGE.**
   - The unit changed "one" to "a" at line 927. That hedges rather than states the new fact: Modal now keeps two snapshots.
   - Line 933 still says "the engine's snapshot", which is false for Modal.
   - Replace line 927 with: "Each engine keeps a `HostSnapshot` instance of its own, and it saves every attribute, class token, and inline property the engine writes before the first write; the modal keeps a second one for the body's `open` token, which its hide restores, as the modal's section states."
   - At line 933, write "every target the engine's snapshots hold".

9. **The Modal record paragraph.** `guides/veneer.md:2231-2233`. **CHANGE.**
   - "The last to release the token restores the body" and "so only the last holder writes the body back" state the same fact twice.
   - Replace with: "The modals of one document that resolve the same `open` token share one record of it. Each modal holds the token through a snapshot of its own, which its hide or its destruction restores, and only the last holder to release it writes the body back." The sentences from "A show adds the token whenever …" onward stay.

10. **Remaining guide prose the unit changed.** The Isolation bullet (`veneer.md:2098-2104`), the show paragraph (`veneer.md:2031-2036`), and the departure bullet (`veneer.md:2296-2298`). **CONFIRMED-FIT.**
    - Each matches what the code does and uses the shared-record vocabulary.
    - No "reference count" wording for the `open` token remains. The phrase appears only for the scroll lock, at lines 2296 and 2704 and `ScrollLock.ts:13`.

11. **Line wrapping in the guide source.** `guides/veneer.md:2036` and `veneer.md:2104-2105`. **CHANGE.**
    - Line 2036 runs past 150 columns inside a paragraph wrapped at 100, because the edit joined two lines. Lines 2104-2105 break early at "passes its own / lifetime".
    - Rewrap both paragraphs to 100 columns. The words stay the same.

## Referrals to the objective lane

- **The ScrollLock signal test's spy question.** `tests/src/browser/ScrollLock.test.ts:55`: `recordCalls(AbortController.prototype, 'abort')` is how the missing listener is observed. Rule two things:
  - whether recording a platform prototype method this way is a "framework spy" under the `AGENTS.md` non-negotiables, or an allowed recorder;
  - whether `count === 1` together with `calls[0][0] === controller` tells the H5-SIGNAL mutation apart from the passing case.
- **The unguarded `open` restore in hide.** `Modal.ts:407` calls `this.#open.restore()` unconditionally. The base code at `4cd56a8` guarded that call on `lock !== undefined` and passed `lock.document`. Rule whether any hide path, such as a takeover or a superseded show, can now write back the body's `open` token at a point where the base wrote nothing.

The brief names no report path and no command, so there is no dispatch defect to report.

VERDICT: FAIL 3, 5, 8, 9, 11
