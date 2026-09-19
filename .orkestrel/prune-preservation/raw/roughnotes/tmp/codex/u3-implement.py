from pathlib import Path

root = Path.cwd()
p = root / 'app/browser/controllers/ApplicationController.ts'
s = p.read_text(encoding='utf-8')
s = s.replace("import type { EmitterInterface }", "import type { Result } from '@orkestrel/contract'\nimport type { ShallowRef } from 'vue'\nimport type { EmitterInterface }")
s = s.replace('\tRouteMeta,', '\tRequestInterface,\n\tRouteMeta,')
start = s.index('\treadonly subscription =')
end = s.index('\treadonly #emitter:', start)
s = s[:start] + ''.join(f'''\treadonly #{noun} = {{
\t\taccepted: shallowRef<{value} | undefined>(),
\t\tissues: shallowRef<readonly {field}[] | undefined>(),
\t}}
\treadonly {noun}: RequestInterface<{value}, {field}> = {{
\t\taccepted: this.#{noun}.accepted,
\t\tissues: this.#{noun}.issues,
\t\tcheck: this.#{verb}.bind(this, false),
\t\tsubmit: this.#{verb}.bind(this, true),
\t}}
''' for noun,value,field,verb in [('subscription','Subscription','SubscriptionField','subscribe'),('inquiry','Inquiry','InquiryField','inquire'),('payment','Invoice','InvoiceField','pay')]) + s[end:]
start = s.index('\t/**\n\t * Parses `input`')
end = s.index('\t/**\n\t * Stops the navigator',start)
s = s[:start] + s[end:]
start = s.index('\t#arrive(')
s = s[:start] + ''.join(f'''\t#{verb}(commit: boolean, input: unknown): boolean {{
\t\tconst value = this.#validate({parser}(input), this.#{noun}.issues)
\t\tif (value === undefined) return false
\t\tif (commit) {{
\t\t\tthis.#{noun}.accepted.value = value
\t\t\tthis.#emitter.emit('{verb}', value)
\t\t}}
\t\treturn true
\t}}

''' for noun,verb,parser in [('subscription','subscribe','parseSubscription'),('inquiry','inquire','parseInquiry'),('payment','pay','parseInvoice')]) + '''\t#validate<Value, Field>(
\t\tresult: Result<Value, readonly Field[]>,
\t\tissues: ShallowRef<readonly Field[] | undefined>,
\t): Value | undefined {
\t\tissues.value = result.success ? undefined : result.error
\t\treturn result.success ? result.value : undefined
\t}

''' + s[start:]
s = s.replace('subscription parse.', 'request acceptance.')
p.write_text(s, encoding='utf-8')

for component,noun,verb,issues in [('SubscribeForm','subscription','subscribe','issues'),('ContactForm','inquiry','inquire','inquiryIssues'),('PaymentForm','payment','pay','paymentIssues')]:
    p = root / f'app/browser/components/{component}.vue'
    s = p.read_text(encoding='utf-8')
    s = s.replace(f'app.{noun}.value', f'app.{noun}.accepted.value')
    s = s.replace(f'app.{issues}.value', f'app.{noun}.issues.value')
    s = s.replace(f'app.{verb}(', f'app.{noun}.submit(',1)
    s = s.replace(f'app.{verb}(', f'app.{noun}.check(')
    p.write_text(s, encoding='utf-8')

p = root / 'tests/app/browser/controllers/ApplicationController.test.ts'
s = p.read_text(encoding='utf-8')
for noun,verb,issues in [('subscription','subscribe','issues'),('inquiry','inquire','inquiryIssues'),('payment','pay','paymentIssues')]:
    s = s.replace(f'app.{noun}.value', f'app.{noun}.accepted.value')
    s = s.replace(f'app.{issues}.value', f'app.{noun}.issues.value')
    s = s.replace(f'app.{verb}(', f'app.{noun}.submit(')
p.write_text(s,encoding='utf-8')
