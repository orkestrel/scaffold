import re, json, sys
VERBS = set('is are reads writes carries names sits holds follows loads ships keeps takes returns emits paints binds drives records refuses omits moves leaves stays becomes means covers lists adds declares compiles resolves matches includes uses sets has have does can may will reaches answers renders mounts'.split())
CSS_PROPS = set('row-gap mask-position color-adjust box-shadow line-height transform opacity z-index transition appearance border-radius vertical-align interpolate-size grid-column-start grid-column-end print-color-adjust caption-side padding margin width height outline filter display position'.split())
CSS_VALUES = set('auto bottom top transparent none inherit initial baseline normal ease underline em rem hidden block inline flex grid'.split())
def token_class(tok):
    t = tok.strip('`').strip()
    if t.startswith('--'): return 'CSS property'
    if t.startswith('!important'): return '`!important` token'
    if re.fullmatch(r'-(webkit|moz)-[\w-]+', t) or t in CSS_PROPS: return 'CSS property'
    if re.fullmatch(r'[\w-]+:\s*.+', t) and t.split(':')[0] in CSS_PROPS | {'line-height','z-index','transform','opacity','interpolate-size'}: return 'CSS declaration'
    if re.fullmatch(r'(var|rgba?|hsla?|color-mix|translate3d|scale|calc|oklch|oklab|linear-gradient|url)\(.*', t): return 'CSS function'
    if re.fullmatch(r'#[0-9a-fA-F]{3,8}', t): return 'CSS value'
    if re.fullmatch(r'-?[\d.]+(px|rem|em|%|s|ms|deg|vw|vh)?( [\w-]+)*', t): return 'CSS value'
    if t in CSS_VALUES: return 'CSS value'
    return None
def rule_hit(h, text_after):
    if h['kind'] == 'table': return 'permitted as a table cell'
    if h['kind'] == 'heading': return 'permitted as a heading'
    if h['rule'] == 'link': return None
    q = h['quote']
    tok = re.match(r'(``[^`]+``|`[^`]+`)', q).group(0)
    c = token_class(tok)
    if c: return 'permitted as a ' + c if c[0] != '`' else 'permitted as an ' + c
    # list membership: comma followed by another token, possibly after and/or
    after = text_after
    if after.startswith(','):
        rest = after[1:].lstrip()
        rest = re.sub(r'^(and|or)\s+', '', rest)
        if rest.startswith('`'):
            # walk to the list end
            m = re.match(r'((?:``[^`]+``|`[^`]+`)(?:,\s*(?:(?:and|or)\s+)?(?:``[^`]+``|`[^`]+`))*|(?:``[^`]+``|`[^`]+`)(?:\s+(?:and|or)\s+(?:``[^`]+``|`[^`]+`)))', rest)
            end = rest[m.end():] if m else ''
            # continue through ", and `x`" chains
            while True:
                m2 = re.match(r',?\s*(?:(?:and|or)\s+)?(``[^`]+``|`[^`]+`)', end)
                if not m2: break
                end = end[m2.end():]
            nxt = re.match(r'\s*([\w-]+)', end)
            word = nxt.group(1) if nxt else ''
            if word and word not in VERBS and word not in ('which', 'so', 'the', 'each', 'as', 'because', 'and', 'or', 'with', 'over', 'to', 'in', 'at', 'from', 'for', 'on', 'but', 'then', 'that', 'both', 'all'):
                return 'permitted as a noun following a token list'
    return None
