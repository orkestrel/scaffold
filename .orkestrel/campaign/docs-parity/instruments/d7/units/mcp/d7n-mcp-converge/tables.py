import io,re,sys
sys.path.insert(0,'tmp/d7n-mcp-converge')
from shape import shape as type_shape

GUIDE='guides/mcp.md'
SPLIT=re.compile(r'(?<!\\)\|')

CONST_SHAPE={
 'MCP_HANDSHAKE_VERSION':'MCPLegacyVersion','MCP_FALLBACK_VERSION':'MCPLegacyVersion',
 'MCP_MODERN_VERSION':'MCPModernVersion',
 'SUPPORTED_MODERN_PROTOCOL_VERSIONS':'readonly MCPModernVersion[]',
 'SUPPORTED_LEGACY_PROTOCOL_VERSIONS':'readonly MCPLegacyVersion[]',
 'SUPPORTED_MCP_VERSIONS':'readonly MCPVersion[]',
 'MCP_META_VERSION':"'io.modelcontextprotocol/protocolVersion'",
 'MCP_META_CAPABILITIES':"'io.modelcontextprotocol/clientCapabilities'",
 'MCP_META_CLIENT':"'io.modelcontextprotocol/clientInfo'",
 'MCP_META_SERVER':"'io.modelcontextprotocol/serverInfo'",
 'MCP_META_SUBSCRIPTION':"'io.modelcontextprotocol/subscriptionId'",
 'MCP_EXTENSION_TASKS':"'io.modelcontextprotocol/tasks'",
 'MCP_SENTINEL_PREFIX':"'=?base64?'",'MCP_SENTINEL_SUFFIX':"'?='",
 'MCP_PARAM_PREFIX':"'Mcp-Param-'",'MCP_HEADER_ANNOTATION':"'x-mcp-header'",
 'MCP_LOOKUP_PAGES':'8','MCP_HEADER_MISMATCH':'-32020','MCP_MISSING_CAPABILITY':'-32021',
 'MCP_UNSUPPORTED_VERSION':'-32022','DEFAULT_MCP_CACHE_TTL':'60000',
 'DEFAULT_MCP_LIMITS':'Readonly<{ message, metadata, keys, state, content, subscriptions, depth }>',
 'EMPTY_MCP_ARGUMENTS':'Readonly<Record<string, unknown>>',
 'JSONRPC_PARSE_ERROR':'-32700','JSONRPC_INVALID_REQUEST':'-32600',
 'JSONRPC_METHOD_NOT_FOUND':'-32601','JSONRPC_INVALID_PARAMS':'-32602',
 'JSONRPC_INTERNAL_ERROR':'-32603','JSONRPC_SERVER_ERROR':'-32000',
 'DEFAULT_MCP_CLIENT_NAME':"'@orkestrel/mcp'",'DEFAULT_MCP_CLIENT_VERSION':"'1.0.0'",
 'DEFAULT_MCP_REQUEST_TIMEOUT':'30000','DEFAULT_MCP_SUBSCRIPTION_CAPACITY':'64',
 'MCP_SESSION_HEADER':"'mcp-session-id'",'MCP_PROTOCOL_VERSION_HEADER':"'mcp-protocol-version'",
 'MCP_METHOD_HEADER':"'mcp-method'",'MCP_NAME_HEADER':"'mcp-name'",
 'MCP_WEBSOCKET_SUBPROTOCOL':"'mcp'",
 'SSE_BUFFERING_HEADER':"'x-accel-buffering'",'SSE_BUFFERING_DISABLED':"'no'",
 'DEFAULT_MCP_PATH':"'/mcp'",'DEFAULT_MCP_KEEPALIVE_INTERVAL':'15000',
 'SSE_KEEPALIVE_COMMENT':"'keepalive'",'DEFAULT_MCP_SESSION_CAPACITY':'1024',
 'DEFAULT_MCP_SESSION_TTL':'300000','DEFAULT_MCP_DELIVERY':'10000',
 'DEFAULT_MCP_SERVER_NAME':"'@orkestrel/mcp'",'DEFAULT_MCP_SERVER_VERSION':"'1.0.0'",
}

TYPES_SENTENCE=("A `Shape` cell holds an interface's data members as bare names in braces, `?` marking "
 "an optional member and `plus` introducing its call-signature members, and a type alias's own type "
 "literal with a union's arms escaped as `\\|`.")
CONST_SENTENCE="A `Shape` cell holds the constant's declared type."

def cells(line):
    parts=SPLIT.split(line)
    return [c.strip() for c in parts[1:-1]]

def row(vals):
    return '| '+' | '.join(vals)+' |'

def sep(n):
    return '| '+' | '.join(['---']*n)+' |'

def clause(text):
    """Split a cell into its leading literal and the prose clause after the first spaced em dash."""
    m=re.search(r' — ', text)
    if m: return text[:m.start()].strip(), text[m.end():].strip()
    return text, ''

def main():
    lines=io.open(GUIDE,encoding='utf8').read().split('\n')
    out=[]
    i=0
    report=[]
    while i<len(lines):
        line=lines[i]
        if line.startswith('| ') and i+1<len(lines) and re.match(r'^\|[\s\-:|]+\|$', lines[i+1]):
            head=cells(line)
            body=[]
            j=i+2
            while j<len(lines) and lines[j].startswith('|'):
                body.append(cells(lines[j])); j+=1
            new_head, new_body, sentence = transform(head, body, report, i+1)
            if new_head is None:
                out.extend(lines[i:j])
            else:
                if sentence is not None:
                    # insert the convention sentence and a blank line above the table
                    while out and out[-1]=='' : out.pop()
                    out.append(''); out.append(sentence); out.append('')
                out.append(row(new_head)); out.append(sep(len(new_head)))
                for b in new_body: out.append(row(b))
            i=j
            continue
        out.append(line); i+=1
    io.open(GUIDE,'w',encoding='utf8').write('\n'.join(out))
    for r in report: print(r)

def transform(head, body, report, ln):
    if len(head)>=3 and head[-1]=='Behavior':
        report.append(f'{ln}: Behavior -> Summary ({head[0]} table)')
        return head[:-1]+['Summary'], body, None
    if head[-1]=='Value' and head[0]=='Constant' and head[1]=='Kind':
        nb=[]
        for b in body:
            name=b[0].strip('`')
            sh=CONST_SHAPE.get(name)
            if sh is None:
                report.append(f'{ln}: NO SHAPE for const {name}'); sh='?'
            lit,cl=clause(b[2])
            nb.append([b[0], b[1], f'`{sh}`', cl or b[2]])
            report.append(f'{ln}\tconst {name}\tSHAPE {sh}\tLITERAL {lit}\tCLAUSE {cl}')
        return ['Constant','Kind','Shape','Summary'], nb, CONST_SENTENCE
    if head[-1]=='Shape' and head[1]=='Kind':
        nb=[]
        for b in body:
            name=b[0].strip('`')
            sh=type_shape(name)
            if sh is None:
                report.append(f'{ln}: NO SHAPE for type {name}'); sh='?'
            lit,cl=clause(b[2])
            nb.append([b[0], b[1], f'`{sh}`', cl or b[2]])
            report.append(f'{ln}\t{b[1]} {name}\tSHAPE {sh}\tOLD {lit}\tCLAUSE {cl}')
        return [head[0],'Kind','Shape','Summary'], nb, TYPES_SENTENCE
    return None, None, None

main()
