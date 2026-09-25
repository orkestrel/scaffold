# Applies round 2's prose edits to guides/veneer.md: the § Additions preamble (F1, F2) and the
# § Outside the ledger reset paragraph with its list item.
p='/home/user/veneer-lad/guides/veneer.md'
s=open(p).read()
def rep(old,new):
    global s
    assert s.count(old)==1,old
    s=s.replace(old,new)
rep("""added: a `selector` the release does not write, a `declaration` the release omits at a site it does
write or that an added selector carries, or a custom `property` the component's official vocabulary
lacks.""","""added: a `selector` the release does not write; a `declaration` the release omits at a site it
writes, or any declaration under an added selector; or a custom `property` the component's official
vocabulary lacks.""")
rep("""colon, and a `—` cell records a `selector` row, which names a rule rather than a declaration. The
`Reason` cell is the only cell no measurement fixes.

A rule that no inventory rule and no class attributes to a shipped component is owned by its
`selector` row. The `.caption-bottom` class and each button reboot rule written on a `:where()`
selector are such rules. The `collectLedger` function attributes the rule to the component that row
names, at that row's condition, and then measures its declarations like those of any added selector.
A row never overrides an owner the inventory, a layer, or a class supplies, and a row naming a
component that does not ship owns nothing. The conformance proof also names every emitted rule no
shipped component measures and expects none, so a rule outside every vocabulary reports rather than
leaving both ledgers unread.""","""colon, and a `—` cell records a `selector` row, which names a rule rather than a declaration. An
owning row's `Component` cell and the `Reason` cell are the cells no measurement fixes.

Attribution reads a class written inside an `:is()` or a `:where()` argument as the rule's own,
because that argument matches the element the rule matches. It reads no class inside a `:not()` or a
`:has()` argument. So each button reboot rule written on a `:where()` selector, such as
`:where(button.nav-link)`, answers to the component its class names, as the `.nav-link` selector
does. A rule that no inventory rule, no layer, and no class attributes to a shipped component is
owned by its `selector` row, which is then an owning row. The `.caption-bottom` class is such a
rule: the inventory records it under no key, and no key opens its name. The
`:where(button.page-link)` rule is another: the inventory records the `.page-link` selector under
the `pagination` key but records no `button.page-link` selector, and no key opens the `page-link`
class. The `collectLedger` function attributes an owned rule to the component its row names, at
that row's condition, and then measures its declarations like those of any added selector. A row
never overrides an owner the inventory, a layer, or a class supplies, and a row naming a component
that does not ship owns nothing. The conformance proof also names every emitted rule no shipped
component measures and expects none, so a rule outside every vocabulary reports rather than
leaving both ledgers unread.""")
rep("""names this release declares nowhere, the button reboot rules, and the Elements behaviors this
package does not copy sit outside that measurement, and are recorded here instead.""","""names this release declares nowhere, and the Elements behaviors this package does not copy sit
outside that measurement, and are recorded here instead.""")
i=s.index('The button reboot rules come after those names.')
j=s.index('The Elements behaviors this package does not copy close the list.')
assert s[i:j].count('\n\n')==1 and s[i:j].endswith('\n\n')
s=s[:i]+s[j:]
open(p,'w').write(s)
