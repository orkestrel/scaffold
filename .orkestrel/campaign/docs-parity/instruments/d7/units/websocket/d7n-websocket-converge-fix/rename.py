from pathlib import Path
import re, shutil

files = ['tests/setupServer.ts', 'tests/setupServer.test.ts', 'tests/src/server/parsers.test.ts', 'tests/src/server/NodeWebSocket.test.ts']
out = Path('tmp/d7n-websocket-converge-fix/rename')
for name in files:
    text = Path(name).read_text(encoding='utf8')
    text = text.replace('{@link frame}', '{@link encodeTestFrame}')
    text = text.replace('/** Encodes one wire message for tests, optionally clearing FIN for fragmentation cases. */',
                        '/** Encodes one RFC 6455 frame for tests, optionally clearing FIN for fragmentation cases. */')
    text = text.replace('export function frame(', 'export function encodeTestFrame(')
    text = re.sub(r'(?<![\w.$])frame\(', 'encodeTestFrame(', text)
    text = re.sub(r'^\tframe,$', '\tencodeTestFrame,', text, flags=re.M)
    target = out / name.replace('/', '__')
    target.write_text(text, encoding='utf8')
    print(name, '->', target)
