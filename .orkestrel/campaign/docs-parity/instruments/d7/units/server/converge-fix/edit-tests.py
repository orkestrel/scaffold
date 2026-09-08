# Takes the pilot's header line, re-transcribes the Quickstart fence, and adds the
# presence guard beside the executed transcriptions.
import pathlib
import sys

path = pathlib.Path('tests/guides.test.ts')
text = path.read_text(encoding='utf8')


def swap(old: str, new: str) -> None:
    global text
    if text.count(old) != 1:
        sys.exit(f'anchor not unique ({text.count(old)}): {old[:70]!r}')
    text = text.replace(old, new)


# Item 9 — the drop-in header's third line is the pilot's.
swap(
    "// package's own, and are the only part a sibling package changes.\n",
    "// package's own, as is the executed section that closes the file.\n",
)

# The executed section reads the guide text the presence guard asserts against.
swap(
    """describe('guide fences', () => {
	it('the substrate fence negotiates""",
    """describe('guide fences', () => {
	const guideText = requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`)

	it('the substrate fence negotiates""",
)

# Item 2 — the Quickstart fence carries the connection fact, so its transcription does too.
swap(
    """		interface State {
			readonly requestId: string
		}
""",
    """		interface State {
			readonly requestId: string
			readonly ip: string | undefined
		}
""",
)
swap(
    """			state: () => ({ requestId: crypto.randomUUID() }),
""",
    """			state: (connection) => ({ requestId: crypto.randomUUID(), ip: connection.ip }),
""",
)

# Item 6 — the presence guard beside the transcriptions.
swap(
    """		} finally {
			await server.destroy()
		}
	})
})
""",
    """		} finally {
			await server.destroy()
		}
	})

	it('carries the fence lines the transcriptions copy', () => {
		// The presence guards beside the transcriptions: they prove the transcribed
		// lines are still the documented ones, and nothing about behavior. Binding the
		// construction line alone would leave a comment free to claim the opposite
		// value and stay green, so every line carrying a claim is bound.
		expect(guideText).toContain(
			"negotiator.negotiate('text/html, application/json;q=0.9', ['application/json', 'text/html']) // 'text/html'",
		)
		expect(guideText).toContain(
			"negotiator.encoding('gzip;q=1.0, deflate;q=0.8', ['gzip', 'deflate']) // 'gzip'",
		)
		expect(guideText).toContain(
			"negotiator.language('en-US, en;q=0.8, fr;q=0.5', ['en', 'fr']) // 'en'",
		)
		expect(guideText).toContain(
			"await verifyToken('bad.token', 'secret') // undefined — total, never throws",
		)
		expect(guideText).toContain(
			"const body = await decompressRequestBody(gzipped, 'gzip', 1_048_576)",
		)
		expect(guideText).toContain('const port = await server.start()')
		expect(guideText).toContain('await server.stop()')
	})
})
""",
)

path.write_text(text, encoding='utf8')
print('tests/guides.test.ts written')
