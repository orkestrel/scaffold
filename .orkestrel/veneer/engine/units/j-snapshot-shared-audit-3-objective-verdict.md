# J-SNAPSHOT-SHARED round-3 audit — the objective lane (analyst on GPT-6 Astra, thread 01a0d615-fc74-7172-b0d8-ae5a4eb19c9c, journal tmp/codex/j-snapshot-shared-audit-3.jsonl; brief units/j-snapshot-shared-audit-3-analyst-brief.md; claims units/j-snapshot-shared-audit-claims-3.md)

Thread `01a0d615-fc74-7172-b0d8-ae5a4eb19c9c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-snapshot-shared-audit-3.jsonl` (launch copy under `tmp/codex/`); 25 commands; 363 s; usage {"input_tokens":1943449,"cached_input_tokens":1752064,"cache_write_input_tokens":0,"output_tokens":9485,"reasoning_output_tokens":2418}. Retained verbatim from the exec's last message.

---

Source review of `43637c1` against `e3167f7`. No tests were run. Findings below are source-and-specification deductions; execution evidence comes from the retained Orchestrator logs. The mutation instrument’s source digests match the commit.

| Claim | Ruling | Evidence at `43637c1` | Mutation and assertion discrimination |
|---|---|---|---|
| **1. The key is fixed at save** | **CONFIRMED** | `src/browser/HostSnapshot.ts:110` resolves the target; `:112` computes its key; `:158` stores them together. Relinquishment (`:236`), write-back (`:361`), restoration withdrawal (`:209`), and clear (`:217`) use that stored key. `#resolve` has no caller outside save. | **N1-STORED** restores the original spelling and recomputes the release key. The assertion at `tests/src/browser/HostSnapshot.test.ts:1315` distinguishes it: the subsequent restoration leaves `live` instead of restoring `changed`. This specifically proves release through `clear()` after adoption. |
| **2. Folding follows the platform** | **CONFIRMED** | `src/browser/HostSnapshot.ts:343` calls `Document.prototype.createElement` with the supplied document as receiver, bypassing its own method. DOM’s `createElement` lowercases the name exactly for an HTML document; attribute-name lookup additionally requires the HTML namespace, checked at `:332`. The cache follows document identity, whose exposed operations do not change its HTML/XML type. See [DOM creation and document types](https://dom.spec.whatwg.org/#dom-document-createelement) and [attribute-name lookup](https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name). Document kinds are addressed below. | **N1-TYPE** substitutes `contentType === 'text/html'`. Assertions at `tests/src/browser/HostSnapshot.test.ts:1287`, `:1298`, and `:1300` distinguish it using an actual plain-text iframe document. They do not independently prove the own-method bypass or cache stability. |
| **3. Write-back names the saved attribute or property** | **CONFIRMED**, within the stated same-document scope | Save reads the resolved name at `src/browser/HostSnapshot.ts:136`; restoration uses it at `:204`. Property access uses the same resolved name at `:142` and `:188`. **HTML → XML:** a saved `DATA-STATE` becomes `data-state` before adoption, so restoration reaches the original attribute. **XML → HTML:** an uppercase saved name subsequently folds during restoration and reaches the lowercase attribute instead. Ordinary qualified-name accessors cannot reach that uppercase attribute there; namespace-aware string accessors can. See [namespace-aware attribute access](https://dom.spec.whatwg.org/#dom-element-setattributens). The latter defect is A1 below, outside this claim’s same-document qualification. | **R1-FOLD**, **R1-NAMESPACE**, **R1-DOCUMENT**, and **R1-CUSTOM** distinguish folding and its exceptions through the cases beginning at `tests/src/browser/HostSnapshot.test.ts:1174` and `:1238`. **N1-STORED** exercises adoption followed by clear, not restoration across adoption. No retained mutation proves the XML → HTML restoration. |
| **4. Placement reads before writing and restores after an owned-option failure** | **FAIL** | The eager reads hold: `src/browser/Placement.ts:77`, `:87`, and `:106` precede the first save at `:126` or `:132`; fallback mapping completes at `:119`. The cleanup guarantee fails on native form markup. Use a connected positioned `<form><input name="removeAttribute"></form>` and an `owned` callback that throws. The catch calls `destroy()` at `:152`; restoration calls the shadowed member at `HostSnapshot.ts:204`, throws a `TypeError`, and leaves the added `popover` attribute present. | **C1-PLACEMENT** moves fallback-entry reads after promotion. Assertions at `tests/src/browser/Placement.test.ts:101` distinguish it through the open-popover state and changed markup. They do not exercise failure inside cleanup. |
| **5. A body-less first lock holds nothing** | **CONFIRMED** | `src/browser/ScrollLock.ts:73` reads the body; `:75` aborts the controller and `:76` throws `SCROLL_LOCK_BODY_MISSING`, before publication at `:79`. The external abort listener uses that controller’s signal at `:64`. A later construction therefore reaches the normal lock path. An already-aborted lifetime correctly returns earlier without acquiring anything. | **C1-SCROLLLOCK** disables the missing-body guard. `tests/src/browser/ScrollLock.test.ts:30` distinguishes the stale holder because the later lock fails to write `overflow: hidden`; `:33` also checks the error code. The case supplies no signal, so it does not independently distinguish listener removal. |
| **6. ColorMode puts the root back and rethrows the same error** | **FAIL** | The ordinary cleanup path exists at `src/browser/ColorMode.ts:56`; no registry claim precedes it. However, an initially unthemed `<form><input name="removeAttribute"></form>` is a valid root. With storage returning `dark` and throwing from `setItem`, `:74` writes the theme and `:79` throws. Cleanup sets `#original` to undefined at `:92`, then calls the shadowed `removeAttribute` at `:93`. The root remains dark and a different `TypeError` escapes. | **C1-COLORMODE** removes the catch-path `destroy()`. The absent-attribute assertion at `tests/src/browser/ColorMode.test.ts:43` distinguishes it. The case uses a div and checks the error message, so it does not distinguish cleanup failure on a form, restoration of a present value, or error identity. |
| **7. The C1 search is complete** | **FAIL** | **Swipe:** a native form containing `<input name="addEventListener">` passes the HTMLElement check, saves at `src/browser/Swipe.ts:67`, writes `pointer-event` at `:68`, then throws at `:70` without cleanup. The failed instance retains its snapshot holding. **Isolation:** a form containing `<input name="toggleAttribute">` saves and publishes its claim at `src/browser/Isolation.ts:136` and `:138`, then throws at `:140` without cleanup. These inputs require no overridden methods or invalid typed objects. Native form named properties override inherited members; see [HTMLFormElement’s named-property rules](https://html.spec.whatwg.org/multipage/forms.html#the-form-element). The complete class search is recorded below. | No retained mutation exercises either native form failure. The **R2-\*** cleanup mutations distinguish the named engine option failures, not these omitted acquisition paths. |
| **8. The proofs bind** | **CONFIRMED** | The retained red log records assertion failures against `e3167f7` at `units/j-snapshot-shared-red-3-orchestrator.log.txt:11`. The mutation replay records the named rows at `units/j-snapshot-shared-mutations-3-orchestrator.log.txt:44`, the surviving control at `:49`, and independent restoration verification at `:103`. The cause replay identifies assertion failures at `units/j-snapshot-shared-causes-3-orchestrator.log.txt:28` through `:32`, with the control passing at `:33`. This confirms the recorded executions and their bounded assertions. | **N1-STORED**, **N1-TYPE**, **C1-PLACEMENT**, **C1-SCROLLLOCK**, and **C1-COLORMODE** are distinguished as described above. **HELD** adds a competing-restoration-owner guard and survives. The second-spelling pin at `HostSnapshot.test.ts:1318` remains explicitly exempt from the base-red claim; it does not distinguish duplicate target bookkeeping when final observable restoration remains identical. |
| **9. Greenfield and scope** | **CONFIRMED** | The commit comparison confines changes to `HostSnapshot`, `Placement`, `ScrollLock`, `ColorMode`, their tests, `src/browser/types.ts`, and the ownership section at `guides/veneer.md:932`. These fit the inherited ownership and round-3 grant at `units/j-snapshot-shared-brief-3.md:35`. `HostSnapshot.ts:328` replaces the removed `#key`; no declaration or caller of `#key` remains. Changed fields and imports have consumers; no compatibility path is introduced. | Static comparison; no behavioral mutation applies. |

The document-kind readings for claim 2 are:

- **`createDocument`:** XML, including an XHTML-namespace document; `#folds` returns false.
- **`createHTMLDocument`:** HTML; `#folds` returns true.
- **`DOMParser`:** `text/html` produces HTML; XML MIME types, including `application/xhtml+xml`, produce XML. See [DOMParser’s parsing branches](https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring).
- **A `text/plain` load:** HTML despite its MIME type; `#folds` returns true. See [text-document loading](https://html.spec.whatwg.org/multipage/document-lifecycle.html#read-text).
- **An iframe document:** its document type decides the result. The retained plain-text iframe case demonstrates the cross-realm receiver. Navigation replaces the document rather than invalidating a cached reading for that document.

The class search for claim 7 covered every class declaration under `src/browser` at the subject commit:

| Classes | Construction reading |
|---|---|
| `Button`, `Collapse`, `Alert`, `Toast` | Post-claim work has cleanup catches at `Button.ts:71`, `Collapse.ts:132`, `Alert.ts:99`, and `Toast.ts:131`. |
| `ScrollSpy`, `Dropdown`, `Tab`, `Carousel` | Post-claim work has cleanup catches at `ScrollSpy.ts:175`, `Dropdown.ts:174`, `Tab.ts:129`, and `Carousel.ts:208`. A failed nested `Swipe` construction cannot be recovered through an instance that never returned. |
| `Tooltip`, `Popover` | `Tooltip.ts:373` catches construction failure; `Popover.ts:42` inherits that constructor. |
| `HostSnapshot`, `Placement`, `ScrollLock`, `ColorMode` | Reviewed directly for the preceding claims. `HostSnapshot.save` also has the partial-publication defect A2 below. |
| `Swipe`, `Isolation` | The native form witnesses falsify C1 at `Swipe.ts:70` and `Isolation.ts:140`. |
| `Delegate` | Scan acquisitions have cleanup at `Delegate.ts:502`, but subsequent listener binding at `:442` is outside that catch. A form root can shadow that method after a successful scan. |
| `Registry`, `Backdrop`, `ConfigSanitizer` | Constructors at `Registry.ts:29`, `Backdrop.ts:45`, and `sanitizers/ConfigSanitizer.ts:69` publish no host claim, snapshot holding, or promotion. |
| `Modal`, `Offcanvas` | Read at `Modal.ts:171` and `Offcanvas.ts:173`; excluded as instructed because J-SAMEWAY owns their construction cleanup. |

The behavior defects outside the claims are:

**A1 — XML → HTML adoption restores a different attribute.** This falls outside claim 3’s explicit same-document condition. The smallest witness is:

```ts
const host = document.createElement('div')
const xml = document.implementation.createDocument(null, 'root')
xml.adoptNode(host)
host.setAttribute('DATA-STATE', 'original')

const snapshot = new HostSnapshot()
snapshot.save({ category: 'attribute', element: host, name: 'DATA-STATE' })
host.setAttribute('DATA-STATE', 'changed')

document.adoptNode(host)
snapshot.restore()
```

Source-derived result: `getAttributeNS(null, 'DATA-STATE')` remains `changed`, while a separate lowercase `data-state="original"` appears. The saved key is released correctly; the write at `src/browser/HostSnapshot.ts:205` targets the wrong attribute. Namespace-aware access can reach the original. A correction must preserve the saved attribute’s identity without changing the successful HTML → XML case.

**A2 — A failed presence read publishes an unreleasable snapshot holding.** This concerns `save()`, not construction:

```ts
const host = document.createElement('form')
const control = document.createElement('input')
control.name = 'hasAttribute'
host.append(control)

const snapshot = new HostSnapshot()
try {
	snapshot.save({ category: 'token', element: host, name: 'selected' })
} catch {
	snapshot.clear()
}
```

`src/browser/HostSnapshot.ts:155` publishes the target record before `#join` calls the shadowed `hasAttribute` at `:281`. The throw prevents insertion into `#targets` at `:158`. Consequently, `clear()` cannot relinquish that record. After removing the control, a later snapshot saving `selected` joins the orphaned holding and cannot restore as its last holder. Read presence before publication, or roll back the publication on failure; cleanup must also handle native form named properties.

VERDICT: FAIL 4, 6, 7
