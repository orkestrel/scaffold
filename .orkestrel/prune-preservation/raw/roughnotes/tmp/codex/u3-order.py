from pathlib import Path

path = Path('app/browser/controllers/ApplicationController.ts')
text = path.read_text(encoding='utf-8')
text = text.replace("import type { ShallowRef } from 'vue'\n", '')
text = text.replace("import type { NavigatorInterface } from '@orkestrel/router/browser'\n", "import type { NavigatorInterface } from '@orkestrel/router/browser'\nimport type { ShallowRef } from 'vue'\n")
fields = []
for name in ['subscription', 'inquiry', 'payment']:
    start = text.index(f'\treadonly #{name} = {{')
    end = text.index('\n\t}', start) + len('\n\t}\n')
    fields.append(text[start:end])
    text = text[:start] + text[end:]
for line in ['\treadonly #emitter: Emitter<ApplicationEventMap>\n', '\treadonly #storage: Storage\n']:
    fields.insert(0, line)
    text = text.replace(line, '')
anchor = 'export class ApplicationController implements ApplicationInterface {\n'
text = text.replace(anchor, anchor + ''.join(fields))
path.write_text(text,encoding='utf-8')
