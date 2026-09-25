
Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the
`@layer theme` block, so an unlayered rule wins. Each custom property resolves on the element whose
rule declares it, from the values that element inherits, and a descendant inherits the resolved
value. An override therefore reaches every declaration that reads the token on its own element or
inside it, and no declaration on an element above it; an element inside it that declares the token
again gives its own subtree that value. The placement decides what follows:

- An override in a `:root` rule reaches every rule, tier, and alias that reads the token, except
  inside a `[data-bs-theme]` element whose mode scope declares that token again.
- An override on a `[data-bs-theme]` element reaches the tiers and aliases its mode scope derives
  from the token, which § Color modes describes, and every rule inside it that reads the token. The
  aliases only the `:root` selector declares keep their value.
- An override on any other element reaches the rules and the component aliases inside it that read
