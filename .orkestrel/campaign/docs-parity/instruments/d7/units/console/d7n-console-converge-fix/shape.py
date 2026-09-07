import re

SHAPES = {
 'Color': "'black' \\| 'red' \\| 'green' \\| 'yellow' \\| 'blue' \\| 'magenta' \\| 'cyan' \\| 'white' \\| 'brightBlack' \\| 'brightRed' \\| 'brightGreen' \\| 'brightYellow' \\| 'brightBlue' \\| 'brightMagenta' \\| 'brightCyan' \\| 'brightWhite' \\| 'default'",
 'Attribute': "'bold' \\| 'dim' \\| 'italic' \\| 'underline' \\| 'inverse' \\| 'strikethrough'",
 'Style': '{ foreground?, background?, attributes }',
 'RendererInterface': '{} plus render',
 'StylerOptions': '{ renderer?, enabled? }',
 'StylerInterface': '{ style, enabled, black, red, green, yellow, blue, magenta, cyan, white, brightBlack, brightRed, brightGreen, brightYellow, brightBlue, brightMagenta, brightCyan, brightWhite, bold, dim, italic, underline, inverse, strikethrough } plus render',
 'ThemeStatus': '{ icon, style }',
 'Theme': '{ levels, statuses, accent, chrome }',
 'ThemeOptions': '{ levels?, statuses?, accent?, chrome? }',
 'LogLevel': "'debug' \\| 'info' \\| 'warn' \\| 'error'",
 'LogRecord': '{ level, message, time, name?, data? }',
 'SinkInterface': '{} plus write',
 'WriterSet': '{ log, warn, error }',
 'LoggerEventMap': '{ entry: [record: LogRecord] }',
 'LogFormatFunction': '(record: LogRecord, styler: StylerInterface, theme: Theme) => string',
 'LoggerOptions': '{ on?, error?, level?, name?, sink?, styler?, theme?, format?, limit?, silent? }',
 'LoggerInterface': '{ emitter, level, name? } plus debug, info, warn, error, entries, clear, destroy',
 'LoggerManagerOptions': '{ level?, sink?, styler?, theme?, format?, limit?, silent? }',
 'LoggerManagerInterface': '{ count } plus register, logger, loggers, debug, info, warn, error, remove',
 'Alignment': "'left' \\| 'center' \\| 'right'",
 'BorderStyle': "'single' \\| 'double' \\| 'round' \\| 'heavy'",
 'BorderChars': '{ horizontal, vertical, topLeft, topRight, bottomLeft, bottomRight, cross, teeDown, teeUp, teeRight, teeLeft }',
 'SeparatorOptions': '{ title?, width?, fill?, styler?, style? }',
 'BoxOptions': '{ content, title?, padding?, border?, width?, styler?, style? }',
 'ColumnSpec': '{ label, align? }',
 'TableOptions': '{ columns, rows, border?, styler?, style? }',
 'TreeNode': '{ label, children? }',
 'TreeOptions': '{ root, border?, styler?, style? }',
 'StatusLevel': "'success' \\| 'error' \\| 'warn' \\| 'info'",
 'StepPosition': '{ index, total }',
 'ReporterOptions': '{ sink?, styler?, theme?, width? }',
 'ReporterInterface': '{} plus section, step, timing, status, table, tree, box, line, blank',
 'CaptureLevel': "'log' \\| 'info' \\| 'warn' \\| 'error' \\| 'debug'",
 'ConsoleMethod': '(...args: unknown[]) => void',
 'CapturedMessage': '{ level, text, time }',
 'CaptureEventMap': '{ capture: [message: CapturedMessage]; start: []; stop: [] }',
 'CaptureOptions': '{ on?, error?, levels?, mirror?, sink?, limit? }',
 'CaptureInterface': '{ emitter, active } plus start, stop, messages, clear, destroy',
 'CaptureResult': '{ value, messages }',
 'RetentionInterface': '{} plus add, records, clear',
 'ConsoleErrorCode': "'INVARIANT'",
 'BarOptions': '{ current, total, width?, fill?, empty?, styler?, style? }',
 'SpinnerEventMap': '{ frame: [line: string]; start: []; stop: [] }',
 'SpinnerOptions': '{ on?, error?, message?, frames?, interval?, sink?, styler?, theme? }',
 'SpinnerInterface': '{ emitter, active, message } plus start, tick, update, succeed, fail, stop, destroy',
 'ProgressReport': '{ current, total }',
 'ProgressEventMap': '{ update: [progress: ProgressReport]; succeed: [] }',
 'ProgressOptions': '{ on?, error?, total, message?, width?, fill?, empty?, sink?, styler?, theme? }',
 'ProgressInterface': '{ emitter, active, succeeded, current, total } plus update, succeed, fail, destroy',
 'BrowserPalette': '{ color?, attribute? }',
 'BrowserSinkOptions': '{ palette? }',
 'ConsoleOutput': '{ format, styles }',
 'StyleAccumulator': '{ foreground?, background?, attributes }',
 'StreamTargetInterface': '{ isTTY?, columns? } plus write',
 'ServerSinkOptions': '{ stdout?, stderr?, styled?, environment?, columns? }',
 'ServerSinkInterface': '{ styled, columns } plus write',
 'StreamLevel': "'stdout' \\| 'stderr'",
 'StreamWriteFunction': "NodeJS.WriteStream['write']",
 'StreamWriteCallback': '(error?: Error \\| null) => void',
 'CapturedChunk': '{ level, text, time }',
 'ProcessCaptureEventMap': '{ capture: [chunk: CapturedChunk]; start: []; stop: [] }',
 'ProcessCaptureOptions': '{ on?, error?, levels?, mirror?, sink?, limit? }',
 'ProcessCaptureInterface': '{ emitter, active } plus start, stop, messages, clear, destroy',
}

SENTENCE = "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`."

def cells(row):
    return [c.strip() for c in row.strip().strip('|').split(' | ')]

def main():
    text = open('guides/console.md').read()
    lines = text.split('\n')
    stop = next(i for i, l in enumerate(lines) if l.startswith('## Methods'))
    out = []
    i = 0
    used = set()
    while i < len(lines):
        line = lines[i]
        if i < stop and line.startswith('| API ') and '| Kind ' in line and '| Shape ' not in line:
            j = i + 2
            body = []
            while j < len(lines) and lines[j].startswith('|'):
                body.append(lines[j]); j += 1
            kinds = [cells(r)[1] for r in body]
            if not any(k in ('interface', 'type') for k in kinds):
                out.append(line); i += 1; continue
            # convention sentence above the table
            if out and out[-1].strip() == '':
                out.insert(len(out) - 1, SENTENCE)
            else:
                out.append(SENTENCE); out.append('')
            head = cells(line)
            out.append('| ' + ' | '.join([head[0], head[1], 'Shape', head[2]]) + ' |')
            out.append('| --- | --- | --- | --- |')
            for row in body:
                c = cells(row)
                name = c[0].strip('`')
                shape = SHAPES.get(name, '')
                if shape:
                    used.add(name)
                    shape = '`%s`' % shape
                out.append('| ' + ' | '.join([c[0], c[1], shape, c[2]]) + ' |')
            i = j
            continue
        out.append(line); i += 1
    open('guides/console.md', 'w').write('\n'.join(out))
    missing = sorted(set(SHAPES) - used)
    print('rows filled:', len(used))
    print('unused shape entries:', missing)

main()
