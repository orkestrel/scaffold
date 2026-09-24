# Unit J-SANITIZER-CONTEXT, round 3 — state the divergence as a class, not a census

Successor of `j-sanitizer-context-brief-2.md`, whose sections stand except what follows. What changed and why: the round-2 audit (`units/j-sanitizer-context-audit-2-objective-verdict.md`, `analyst` on Astra, thread `01a0d5be-9085-7113-942b-e2ec267b6d87`) confirmed the constants, the surface, the unchanged walk, and the proofs, and it confirmed your reading of `</p>` and `</br>`. It failed claim 1 again with a new token class. After the markup closes every element it opened, a formatting end tag is ignored at the root in the standard's foreign integration-point context, and the active-formatting entry it leaves makes later text reconstruct the element: `<p><b>x</p></b>y` gives `<p><b>x</b></p><b>y</b>`. In a `div` context, the adoption agency algorithm (§ 13.2.6.4.7) removes the entry, giving `<p><b>x</b></p>y`.

Each round has found another input where the `div` and the standard's integration-point parse differ, so a sentence that lists the differences never closes (`.claude/rules/quality.md` § Rounds and verdicts: recast a census as the property it stood for). The property the walk keeps is that an integration point's markup parses as HTML elements on every build, within the configuration. The walk does not promise tree-identity with the standard's foreign-context parse.

## Objective

Rewrite the class `@remarks` and the guide's `ConfigSanitizer` paragraph to state the divergence as its class, not as a list, and pin the round-2 audit's input on both routes.

## The obligations

- **T1 The class.** Replace the sentences claiming the standard "differs in one place" with a statement of the class. The standard parses the tokens it reads while the stack of open elements holds only its root through the foreign-content rules. That covers tokens read before the markup opens an element, and tokens read after it closes every element it opened. Under those rules a CDATA section is text, and an end tag other than `</p>` or `</br>` is ignored. The `div` parses the same tokens through the HTML insertion mode, so a CDATA section is a comment the walk removes, and an end tag takes its in-body effect. Give CDATA and a formatting end tag as examples, cite § 13.2.5.42, § 13.2.6.5, and § 13.2.6.4.7, and keep the measured-agreement sentence limited to the inputs you measured. Use the same class statement in the guide.
- **T2 The pin.** Measure `<p><b>x</p></b>y` on Chromium 153 on both targets (`annotation-xml encoding=text/html` and `foreignObject`) through the round-1 copy, the `div`, and `setHTML`, with a scratch program as in round 2. Add that input to the bound case: assert the walk's tree, and assert the native route's tree beside it as this host reads it. If the two routes disagree on this host, say so in the case title and the remarks.
- **T3 Unchanged.** Nothing else changes. Re-run `ConfigSanitizer.test.ts`, `index.test.ts`, `test:guides`, and `test:policy`, and the static gates over the owned files.

## Scope

As round 2: `src/browser/sanitizers/ConfigSanitizer.ts` (the remarks only), `tests/src/browser/sanitizers/ConfigSanitizer.test.ts` (the bound case only), `guides/veneer.md` (the `ConfigSanitizer` paragraph only), and `tmp/j-sanitizer-context/**`. Every other file is off-limits.

## Output

Your final message: T2's measurement table; the rewritten sentences in both places; the bound case's reading; the acceptance output; `git status --short`; the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing.
