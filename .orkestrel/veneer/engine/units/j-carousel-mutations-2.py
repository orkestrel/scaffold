# J-CAROUSEL round-2 mutation instrument, a copy of tmp/j-carousel/mutations.py with every round-1 row
# kept (its pattern rewritten where round 2 changed the source text, its intent unchanged) and the
# round-2 rows added. Shaped after tmp/j-collapse/mutations-3.py: applies each named
# mutation to an owned source file, runs the WHOLE test file it names (no -t), reads Vitest's JSON
# report, and records every failing case, then writes the original bytes back and checks every owned
# source's digest against the digest taken before the run, writing that receipt into the log.
import hashlib, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel')
REPORT = ROOT / 'tmp/j-carousel/mutation-report.json'
LOG = ROOT / 'tmp/j-carousel/mutations-2.log.txt'
VITEST = [
    'node', 'node_modules/vitest/vitest.mjs', 'run', '--config', 'vite.config.ts', '--no-cache',
    '--project', 'src:browser', '--reporter=json', f'--outputFile={REPORT}',
]
C = 'src/browser/Carousel.ts'
S = 'src/browser/Swipe.ts'
D = 'src/browser/Delegate.ts'
V = 'src/browser/validators.ts'
P = 'src/browser/parsers.ts'
H = 'src/browser/helpers.ts'
K = 'src/browser/constants.ts'
I = 'src/browser/index.ts'
CT = 'tests/src/browser/Carousel.test.ts'
ST = 'tests/src/browser/Swipe.test.ts'
DT = 'tests/src/browser/Delegate.test.ts'
VT = 'tests/src/browser/validators.test.ts'
PT = 'tests/src/browser/parsers.test.ts'
HT = 'tests/src/browser/helpers.test.ts'
IT = 'tests/src/browser/index.test.ts'
Y = 'src/styles/components/_carousel.scss'
OWNED = [C, S, D, V, P, H, K, I, Y]


LEAVING_READS = ('\t\t\t\t\t\tpair,\n\t\t\t\t\t\t[[outgoing, active]],\n\t\t\t\t\t\t[\n\t\t\t\t\t\t\t[incoming, active],\n'
                 '\t\t\t\t\t\t\t[indicator, active],\n\t\t\t\t\t\t],\n')
ARRIVING_READS = ('\t\t\t\t\t\tpair,\n\t\t\t\t\t\t[\n\t\t\t\t\t\t\t[outgoing, active],\n\t\t\t\t\t\t\t[indicator, active],\n'
                  '\t\t\t\t\t\t],\n\t\t\t\t\t\t[[incoming, active]],\n')
ORDER_DOOR = ('\t\t\t\t\t() => incoming.classList.add(order),\n\t\t\t\t\tpair,\n\t\t\t\t\t[\n\t\t\t\t\t\t[outgoing, active],\n'
              '\t\t\t\t\t\t[incoming, order],\n\t\t\t\t\t],\n')
ACTIVE_DOOR = ('\t\t\t\t\t() => incoming.classList.add(active),\n\t\t\t\t\tpair,\n\t\t\t\t\t[\n\t\t\t\t\t\t[outgoing, active],\n'
               '\t\t\t\t\t\t[outgoing, direction],\n\t\t\t\t\t\t[incoming, active],\n\t\t\t\t\t],\n')
REFUSAL = ('\t\tconst current = this.#items()\n\t\tif (\n\t\t\tthis.#controller.signal.aborted ||\n'
           '\t\t\tthis.#change !== undefined ||\n\t\t\tthis.#slides !== slides ||\n'
           '\t\t\tthis.#active(current) !== outgoing ||\n\t\t\t!current.includes(incoming) ||\n'
           '\t\t\tincoming.classList.contains(active)\n\t\t) {\n\t\t\treturn false\n\t\t}\n')
RESTART = '\t\t\tif (cycling) this.#arm()\n'
INTERACTION = "\t\t\tif (interactive && this.#ride === 'interaction' && this.#pauses === pauses) this.start()\n"
TEXT_GUARD = ('\t\tif (\n\t\t\tisInstance(event.target, HTMLInputElement) ||\n'
              '\t\t\tisInstance(event.target, HTMLTextAreaElement)\n\t\t) {\n\t\t\treturn\n\t\t}\n')
VISIBLE = ("\t\t\tthis.#host.ownerDocument.visibilityState === 'visible' &&\n"
           '\t\t\tthis.#host.checkVisibility({ visibilityProperty: true })\n')
SETTLE = '\t\t\t\tawait settleAnimations(incoming, this.#controller.signal)\n'
SCAN_GUARD = ("\t\t\tif (parseRide(host.getAttribute(ride)) !== 'load' || Carousel.find(host) !== undefined) {\n")
SWIPE_KEPT = ('\t\tif (signal.aborted) {\n\t\t\tswipe?.destroy()\n\t\t\tthis.#swipe = undefined\n'
              '\t\t} else this.#swipe = swipe\n')
HOVER_READ = "\t\t\t(this.#hover && !this.#touched && this.#host.matches(':hover')) ||\n"
RESTORE_ORDER = '\t\tthis.#snapshot.restore()\n\t\tthis.#swipe?.destroy()\n'

MUTATIONS = [
    # Round 1: sliding
    ('the backward slide writes the forward order token', CT, 'slides to the preceding item',
     [(C, 'const order = forward ? this.#classes.next : this.#classes.previous', 'const order = this.#classes.next')]),
    ('the direction token goes to the outgoing item alone', CT, 'slides to the following item through its order and direction tokens',
     [(C, '() => incoming.classList.add(direction), pair, moving, blocked', '() => undefined, pair, moving, blocked'),
      (C, '\t\t\t\t[incoming, order],\n\t\t\t\t[incoming, direction],\n\t\t\t]\n', '\t\t\t\t[incoming, order],\n\t\t\t]\n')]),
    ('wrapping is always on', CT, 'refuses next at the last item',
     [(C, 'items[this.#wrap ? (target + count) % count : target]', 'items[(target + count) % count]')]),
    ('the indicator is not moved', CT, 'moving the indicator between slide and slid',
     [(C, 'const leaving = this.#indicators(`.${CSS.escape(active)}`)', 'const leaving: readonly HTMLElement[] = []')]),
    ('the indicator position is not written', CT, 'moving the indicator between slide and slid',
     [(C, "() => indicator.setAttribute('aria-current', 'true'),", '() => indicator.classList.add(active),')]),
    ('the settle is skipped', CT, 'dispatches slid after the incoming transform transition finishes',
     [(C, SETTLE, '')]),
    ('the settle always runs', CT, 'completes in the same task when the host lacks the slide token',
     [(C, 'if (this.#host.classList.contains(this.#classes.slide)) {', 'if (this.#host.isConnected) {')]),
    ('a zero timer replaces the settle', CT, 'waits on the incoming opacity transition under the fade variant',
     [(C, SETTLE, '\t\t\t\tawait new Promise((resolve) => setTimeout(resolve, 0))\n')]),
    ('the slide event return value is ignored', CT, 'untouched when a listener prevents slide',
     [(C, 'if (!emitEvent(this.#host, CAROUSEL_EVENTS.slide, detail, true)) return false', 'emitEvent(this.#host, CAROUSEL_EVENTS.slide, detail, true)')]),
    ('slide refuses in flight instead of queueing', CT, 'queues each slide call until slid',
     [(C, 'while (this.#change !== undefined) await this.#change.promise', 'if (this.#change !== undefined) return false')]),
    ('next queues behind a slide in flight', CT, 'resolves false for next and previous while a slide is in flight',
     [(C, 'if (this.#controller.signal.aborted || this.#change !== undefined) return false\n\t\tconst items', 'while (this.#change !== undefined) await this.#change.promise\n\t\tif (this.#controller.signal.aborted) return false\n\t\tconst items')]),
    ('nested items are counted', CT, 'reads the items of a nested carousel as its own',
     [(C, '\t\t\t.filter((item) => !nested.has(item))\n', '')]),
    ('the two events share one detail object', CT, 'each carrying its own detail object',
     [(C, 'emitEvent(this.#host, CAROUSEL_EVENTS.slid, { ...detail }, false)', 'emitEvent(this.#host, CAROUSEL_EVENTS.slid, detail, false)')]),
    ('a completed event is cancelable', CT, 'slide cancelable and slid not',
     [(C, 'emitEvent(this.#host, CAROUSEL_EVENTS.slid, { ...detail }, false)', 'emitEvent(this.#host, CAROUSEL_EVENTS.slid, { ...detail }, true)')]),
    ('the event guard admits every custom event', CT, 'binds only engine-shaped events to hooks',
     [(V, '\t\treturn (\n\t\t\tisRecord(detail) &&', '\t\treturn true || (\n\t\t\tisRecord(detail) &&')]),
    # Round 1: timer
    ('the item interval is ignored', CT, 'reads the active item interval attribute',
     [(C, 'return parseNumber(item?.getAttribute(this.#attributes.interval)) ?? this.#interval', 'return item === undefined ? this.#interval : this.#interval')]),
    ('pause leaves the timer armed', CT, 'cycles through the items on its timer at the interval and stops when paused',
     [(C, '\t\tthis.#pauses += 1\n\t\tthis.#disarm()\n', '\t\tthis.#pauses += 1\n')]),
    ('reduced motion is not read', CT, 'arms no timer under staged reduced motion',
     [(C, "this.#host.matches(':hover')) ||\n\t\t\tmatchesReducedMotion(this.#host)\n", "this.#host.matches(':hover'))\n")]),
    ('the visibility read is dropped', CT, 'skips a tick while the host is not rendered',
     [(C, VISIBLE, '\t\t\ttrue\n')]),
    ('a load ride does not start', CT, 'starts at construction for a load ride',
     [(C, "\t\tif (this.#ride === 'load') this.start()\n", '')]),
    ('an interaction ride never starts', CT, 'starts cycling under an interaction ride',
     [(C, INTERACTION, '')]),
    ('every interactive slide starts the timer', CT, 'a carousel without a ride does not',
     [(C, INTERACTION, '\t\t\tif (interactive) this.start()\n')]),
    ('the timer restarts whether or not it was running', CT, 'arms after the preference lifts only when started again',
     [(C, RESTART, '\t\t\tthis.#arm()\n')]),
    ('a pause during the slide is ignored', CT, 'keeps its timer stopped after a slide whose slid listener paused it',
     [(C, '\t\t\tthis.#controller.signal.aborted ||\n\t\t\t!this.#started ||\n', '\t\t\tthis.#controller.signal.aborted ||\n')]),
    ('a taken-over slide leaves the timer stopped', CT, 'keeps its timer running after a slide a reaction took over',
     [(C, RESTART, ''),
      (C, INTERACTION, INTERACTION + '\t\t\tif (cycling) this.#arm()\n')]),
    ('hover does not pause', CT, 'pauses on pointer hover',
     [(C, "\t\t\thost.addEventListener('mouseenter', () => this.#disarm(), { signal })\n", '')]),
    ('the pointer leaving resumes nothing', CT, 'pauses on pointer hover',
     [(C, "\t\t\thost.addEventListener('mouseleave', () => this.#leave(), { signal })\n", '')]),
    ('a touch release defers nothing', CT, 'defers its restart by the touch delay',
     [(C, "\t\tif (event.pointerType === 'mouse') return\n\t\tthis.#touched = true\n", "\t\treturn\n")]),
    ('a mouse release defers too', CT, 'defers its restart by the touch delay',
     [(C, "\t\tif (event.pointerType === 'mouse') return\n", '')]),
    ('an earlier touch deferral is kept', CT, 'defers its restart by the touch delay',
     [(C, '\t\tthis.#disarm()\n\t\tclearTimeout(this.#touch)\n\t\tthis.#touch = setTimeout', '\t\tthis.#disarm()\n\t\tthis.#touch = setTimeout')]),
    # Round 1: input
    ('the arrow keys are swapped', CT, 'slides with the arrow keys as trusted input',
     [(C, "void this.#step(event.key === 'ArrowRight', true)", "void this.#step(event.key === 'ArrowLeft', true)")]),
    ('the text-control guard is dropped', CT, 'slides with the arrow keys as trusted input',
     [(C, TEXT_GUARD, '')]),
    ('the key default is kept', CT, 'slides with the arrow keys as trusted input',
     [(C, '\t\tevent.preventDefault()\n\t\tvoid this.#step(event.key', '\t\tvoid this.#step(event.key')]),
    ('the keyboard option is ignored', CT, 'to a carousel whose keyboard is off',
     [(C, '\t\tif (resolved.keyboard) {', '\t\tif (resolved.keyboard || host.isConnected) {')]),
    ('the swipe direction is swapped', CT, 'slides next on a leftward touch swipe',
     [(C, "void this.#step(direction === 'left', true)", "void this.#step(direction === 'right', true)")]),
    ('the drag refusal is dropped', CT, 'refuses the native drag of an image inside an item',
     [(C, 'event.target.matches(image)) event.preventDefault()', 'event.target.matches(image)) return')]),
    ('the image selector is not scoped to an item', CT, 'refuses the native drag of an image inside an item',
     [(C, 'const image = `:is(${this.#selectors.entry}) :is(${this.#selectors.image})`', 'const image = this.#selectors.image')]),
    ('touch off still swipes', CT, 'no touch deferral when touch is off',
     [(C, 'const swipe = resolved.touch', 'const swipe = host.isConnected')]),
    # Round 1: cleanup
    ('destruction omits the abort', CT, 'abandons a slide in flight on destruction',
     [(C, '\t\tthis.#controller.abort()\n\t\tthis.#disarm()\n', '\t\tthis.#disarm()\n'),
      (C, '\tdestroy(): void {\n\t\tif (this.#controller.signal.aborted) return\n', '\tdestroy(): void {\n')]),
    ('destruction leaves the swipe', CT, 'abandons a slide in flight on destruction',
     [(C, '\t\tthis.#swipe?.destroy()\n', '')]),
    ('the items are not saved', CT, 'restores the items and the indicators after completed slides',
     [(C, '\t\t\tthis.#save(outgoing, incoming, [...leaving, ...arriving])\n', '')]),
    ('the indicator attribute is not saved', CT, 'restores the items and the indicators after completed slides',
     [(C, "\t\t\tthis.#snapshot.save({ category: 'attribute', element: indicator, name: 'aria-current' })\n", '')]),
    ('the signal is ignored', CT, 'destroys the carousel when its signal aborts',
     [(C, '\t\tif (lifetime?.aborted) this.destroy()\n\t\telse {', '\t\tif (lifetime === undefined) this.destroy()\n\t\telse {')]),
    ('the host is not claimed', CT, 'refuses an invalid host and a second owner',
     [(C, '\t\tCarousel.#registry.claim(host, this)\n', '')]),
    # Round 1: vocabulary
    ('the classes group is ignored', CT, 'only the replacing values when every group is replaced',
     [(C, 'isClassToken,\n\t\t\toptions?.classes,', 'isClassToken,\n\t\t\tundefined,')]),
    ('the attributes group is ignored', CT, 'only the replacing values when every group is replaced',
     [(C, 'isAttributeName,\n\t\t\toptions?.attributes,', 'isAttributeName,\n\t\t\tundefined,')]),
    ('the selectors group is ignored', CT, 'only the replacing values when every group is replaced',
     [(C, 'isSelector,\n\t\t\toptions?.selectors,', 'isSelector,\n\t\t\tundefined,')]),
    ('a class replacement is not validated', CT, 'refuses a group value',
     [(C, 'CAROUSEL_CLASSES,\n\t\t\tisClassToken,', 'CAROUSEL_CLASSES,\n\t\t\tisSelector,')]),
    ('the ride attribute is not coerced', CT, 'refuses a group value',
     [(C, '\t\t\t\tride: parseRide,\n', '\t\t\t\tride: (value: unknown) => (typeof value === \'string\' ? \'load\' : undefined),\n')]),
    ('a default table is left unfrozen', CT, 'publishes frozen default tables',
     [(K, 'export const CAROUSEL_CLASSES: CarouselClassMap = Object.freeze({', 'export const CAROUSEL_CLASSES: CarouselClassMap = ({')]),
    # Round 1: doors
    ('a write is not followed by a read', CT, 'stops writing when a reaction to its own write destroys it',
     [(C, '\t\twrite()\n\t\treturn this.#holds(pair, present, absent, marks)', '\t\twrite()\n\t\treturn true')]),
    ('the slide dispatch is not followed by a read', CT, 'runs one slide when a listener to its slide event slides again',
     [(C, REFUSAL, '')]),
    ('the indicator doors read no item', CT, 'stops a slide whose indicator write a reaction answers',
     [(C, LEAVING_READS, '\t\t\t\t\t\tpair,\n\t\t\t\t\t\t[],\n\t\t\t\t\t\t[[indicator, active]],\n', 2),
      (C, ARRIVING_READS, '\t\t\t\t\t\tpair,\n\t\t\t\t\t\t[[indicator, active]],\n\t\t\t\t\t\t[],\n', 2)]),
    ('the order door reads no order token', CT, 'stops a slide whose order-token write a reaction answers',
     [(C, ORDER_DOOR, '\t\t\t\t\t() => incoming.classList.add(order),\n\t\t\t\t\tpair,\n\t\t\t\t\t[[outgoing, active]],\n')]),
    ('the read after the transition is dropped', CT, 'loses its active token during the transition',
     [(C, '\t\t\t\tif (!this.#holds(pair, moving, blocked, [])) return false\n', '')]),
    ('the completion door reads no active token', CT, 'stops a slide whose completing write a reaction answers',
     [(C, ACTIVE_DOOR, '\t\t\t\t\t() => incoming.classList.add(active),\n\t\t\t\t\tpair,\n\t\t\t\t\t[\n\t\t\t\t\t\t[outgoing, active],\n\t\t\t\t\t\t[outgoing, direction],\n\t\t\t\t\t],\n')]),
    # Round 1: swipe
    ('the threshold is inclusive', ST, 'none at the threshold',
     [(S, 'if (Math.abs(distance) <= this.#threshold) return', 'if (Math.abs(distance) < this.#threshold) return')]),
    ('the swipe reads mouse pointers', ST, 'reads pen pointers and ignores mouse pointers',
     [(S, "\t\tif (event.pointerType !== 'touch' && event.pointerType !== 'pen') return\n", '')]),
    ('a release from another pointer counts', ST, 'pairs a release with the pointer that went down last',
     [(S, '\t\tif (event.pointerId !== this.#pointer) return\n', '\t\tif (this.#pointer === undefined) return\n')]),
    ('a cancelled pointer is kept', ST, 'discards a pointer the platform cancels',
     [(S, '\t\tif (event.pointerId === this.#pointer) this.#pointer = undefined\n', '')]),
    ('the pointer token is not written', ST, 'adds its pointer token at construction',
     [(S, '\t\thost.classList.add(classes.pointer)\n', '')]),
    ('the pointer token is not restored', ST, 'restores the host on destruction',
     [(S, '\t\tthis.#controller.abort()\n\t\tthis.#snapshot.restore()', '\t\tthis.#controller.abort()')]),
    ('the threshold is not validated', ST, 'refuses an invalid host, token, or threshold',
     [(S, '\t\tif (!isFiniteNumber(threshold) || threshold < 0) {', '\t\tif (threshold === undefined) {')]),
    ('the swipe classes group is ignored', ST, 'writes the replacing token',
     [(S, 'isClassToken,\n\t\t\toptions.classes,', 'isClassToken,\n\t\t\tundefined,')]),
    ('a swipe default table is left unfrozen', ST, 'publishes frozen default tables',
     [(K, 'export const SWIPE_CLASSES: SwipeClassMap = Object.freeze({', 'export const SWIPE_CLASSES: SwipeClassMap = ({')]),
    # Round 1: delegate
    ('the delegate has no carousel route', DT, 'slides the carousel a control names',
     [(D, '\t\tthis.#routeCarousel(event, event.target)\n', '')]),
    ('the carousel route prevents nothing', DT, 'slides the carousel a control names',
     [(D, '\t\tif (!this.#mark(event, Carousel, host)) return\n\t\tevent.preventDefault()\n', '\t\tif (!this.#mark(event, Carousel, host)) return\n')]),
    ('the carousel route ignores the position', DT, 'slides the carousel a control names',
     [(D, '\t\tif (position !== undefined) void engine.slide(position)\n\t\telse if', '\t\tif (position === -1) void engine.slide(position)\n\t\telse if')]),
    ('the carousel route reads every step as next', DT, 'slides the carousel a control names',
     [(D, "\t\telse if (control.getAttribute(this.#carousel.attributes.step) === 'next') void engine.next()\n\t\telse void engine.previous()\n", '\t\telse void engine.next()\n')]),
    ('a control naming no move is routed', DT, 'slides the carousel a control names',
     [(D, "\t\treturn position !== undefined || move === 'next' || move === 'prev' ? control : undefined", '\t\treturn move === null && position === undefined ? undefined : control')]),
    ('the host token is not required', DT, 'lacks the host token',
     [(D, '\t\treturn host.classList.contains(this.#carousel.classes.host) ? host : undefined', '\t\treturn host')]),
    ('a carousel outside the root is driven', DT, 'lies outside the root',
     [(D, '\t\tif (host === undefined || !this.#root.contains(host)) return undefined\n', '\t\tif (host === undefined) return undefined\n')]),
    ('the construction scan is dropped', DT, 'acquires every carousel whose ride attribute reads load',
     [(D, '\t\ttry {\n\t\t\tthis.#scan()\n', '\t\ttry {\n')]),
    ('the scan acquires every ride', DT, 'acquires every carousel whose ride attribute reads load',
     [(D, SCAN_GUARD, '\t\t\tif (Carousel.find(host) !== undefined) {\n')]),
    ('a failing scan keeps what it acquired', DT, 'destroys what it acquired and rethrows',
     [(D, '\t\t} catch (error) {\n\t\t\tthis.destroy()\n\t\t\tthrow error', '\t\t} catch (error) {\n\t\t\tthrow error')]),
    ('the carousel same-host conflict is not refused', DT, 'refuses a click whose slide control names a carousel that is also its button host',
     [(D, 'if (this.#conflicts(event.target) || this.#conflictsCarousel(event.target)) return', 'if (this.#conflicts(event.target)) return')]),
    ('the carousel collapse conflict is not refused', DT, 'refuses a click whose collapse trigger is a slide control',
     [(D, '\t\t\ttrigger !== undefined &&\n\t\t\treadTargets(trigger, this.#collapse.attributes).includes(host) &&\n\t\t\tCollapse.find(host) === undefined\n',
       '\t\t\ttrigger !== undefined &&\n\t\t\treadTargets(trigger, this.#collapse.attributes).includes(host) &&\n\t\t\tCollapse.find(host) === null\n')]),
    ('the carousel mark is dropped', DT, 'slides a carousel once per click under nested roots',
     [(D, '\t\tif (!this.#mark(event, Carousel, host)) return\n', '')]),
    ('the delegate routes by the default carousel attributes', DT, 'routes carousel clicks by the replaced step',
     [(D, 'isAttributeName,\n\t\t\t\toptions?.carousel?.attributes,', 'isAttributeName,\n\t\t\t\tundefined,')]),
    ('the delegate ignores the carousel classes group', DT, 'routes carousel clicks by the replaced step',
     [(D, 'isClassToken,\n\t\t\t\toptions?.carousel?.classes,', 'isClassToken,\n\t\t\t\tundefined,')]),
    ('the delegate does not validate the carousel classes', DT, 'refuses a carousel group value',
     [(D, "'CAROUSEL_OPTION_INVALID',\n\t\t\t\tCAROUSEL_CLASSES,\n\t\t\t\tisClassToken,", "'CAROUSEL_OPTION_INVALID',\n\t\t\t\tCAROUSEL_CLASSES,\n\t\t\t\tisSelector,")]),
    ('the discard ignores carousels', DT, 'releases one at the observer delivery after its removal',
     [(D, '\t\t\t\tCollapse.find(engine.host) !== engine &&\n\t\t\t\tCarousel.find(engine.host) !== engine\n', '\t\t\t\tCollapse.find(engine.host) !== engine\n')]),
    # Round 1: guards, parser, helper, barrel
    ('the carousel event guard admits any direction', VT, 'requires a custom event carrying an HTML element',
     [(V, "\t\t\t(detail.direction === 'left' || detail.direction === 'right') &&\n", '')]),
    ('the carousel event guard reads uncontained', VT, 'returns false when a prototype, the detail, or a detail field accessor throws',
     [(V, '\t\t\tisNonNegativeInteger(detail.to)\n\t\t)\n\t} catch {\n\t\treturn false\n\t}\n', '\t\t\tisNonNegativeInteger(detail.to)\n\t\t)\n\t} finally {\n\t\tvoid 0\n\t}\n')]),
    ('the ride parser passes any string', PT, 'returns undefined for every other value',
     [(P, "\tif (value === 'interaction' || value === 'true') return 'interaction'\n", "\tif (typeof value === 'string') return 'interaction'\n")]),
    ('the ride parser misses the Bootstrap spellings', PT, 'parses each ride and the Bootstrap spelling of each',
     [(P, "\tif (value === 'load' || value === 'carousel') return 'load'", "\tif (value === 'load') return 'load'")]),
    ('the preference is read from the global window', HT, 'returns false for an element whose document has no view',
     [(H, "\t\telement.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ??", "\t\twindow.matchMedia('(prefers-reduced-motion: reduce)').matches ??")]),
    ('the preference query reads no preference', HT, 'reads the reduced-motion preference',
     [(H, "matchMedia('(prefers-reduced-motion: reduce)')", "matchMedia('(prefers-reduced-motion: no-preference)')")]),
    ('the barrel omits the carousel and the swipe', IT, 'exports the browser surface',
     [(I, "export * from './Swipe.js'\nexport * from './Carousel.js'\n", '')]),
    # Round 2: A
    ('a swipe constructed while the carousel was destroyed is kept', CT, 'destroys the swipe it constructed when a reaction to the swipe token destroys the carousel',
     [(C, SWIPE_KEPT, '\t\tthis.#swipe = swipe\n')]),
    # Round 2: B
    ('the dispatch reads no slide count', CT, 'refuses the slide whose event a listener answered with newer slides',
     [(C, '\t\t\tthis.#slides !== slides ||\n', '')]),
    ('the indicator doors read no indicator', CT, 'stops a slide whose indicator attribute write a reaction answers by rewriting that attribute',
     [(C, "\t\t\tmarks.every(([element, value]) => element.getAttribute('aria-current') === value)\n", '\t\t\tmarks.length >= 0\n')]),
    ('the outgoing order token is not read', CT, 'giving the outgoing item the order token',
     [(C, '\t\t\t\t[incoming, active],\n\t\t\t\t[outgoing, order],\n\t\t\t]\n', '\t\t\t\t[incoming, active],\n\t\t\t]\n')]),
    ('the doors read no membership', CT, 'taking the incoming item out of the host',
     [(C, '\t\t\tpair.every((item) => items.includes(item)) &&\n', '\t\t\titems.length >= 0 &&\n')]),
    # Round 2: C
    ('arming reads no hover', CT, 'arms no timer after an animated slide during which the pointer entered the host',
     [(C, HOVER_READ, '')]),
    ('arming reads no pending touch deferral', CT, 'leaves the restart to the touch deferral',
     [(C, '\t\t\tthis.#touch !== undefined ||\n', '')]),
    ('a pause during the slide does not hold over the ride', CT, 'keeps a pause a slid listener made under an interaction ride',
     [(C, " && this.#pauses === pauses) this.start()", ') this.start()')]),
    ('the hover a tap leaves holds the timer', CT, 'cycles after a trusted tap and its touch delay',
     [(C, "(this.#hover && !this.#touched && this.#host.matches(':hover'))", "(this.#hover && this.#host.matches(':hover'))")]),
    ('the key arm starts no ride', CT, 'starts an interaction ride after a slide a key or a swipe asks for',
     [(C, "void this.#step(event.key === 'ArrowRight', true)", "void this.#step(event.key === 'ArrowRight', false)")]),
    ('the swipe arm starts no ride', CT, 'starts an interaction ride after a slide a key or a swipe asks for',
     [(C, "void this.#step(direction === 'left', true)", "void this.#step(direction === 'left', false)")]),
    # Round 2: D
    ('the swipe restores before the items', CT, 'restores the items before the swipe token',
     [(C, RESTORE_ORDER, '\t\tthis.#swipe?.destroy()\n\t\tthis.#snapshot.restore()\n')]),
    # Round 2: E
    ('the carousel route reads no lifetime', DT, 'leaves a carousel unmarked when a listener to an earlier route destroys the delegate',
     [(D, '\t\tif (control === undefined || host === undefined || this.#controller.signal.aborted) return\n', '\t\tif (control === undefined || host === undefined) return\n')]),
    ('a carousel built while the delegate was destroyed is acquired', DT, 'destroys a carousel it constructed while a reaction to the construction destroyed the delegate',
     [(D, '\t\tif (!this.#controller.signal.aborted) return this.#acquire(engine)\n', '\t\treturn this.#acquire(engine)\n')]),
    # Round 2: F
    ('the swipe writes its default pointer token', CT, 'only the replacing values when every group is replaced',
     [(C, '\t\t\t\t\tclasses: { pointer: this.#classes.pointer },\n', '')]),
    # Round 2: H
    ('the shipped cascade leaves horizontal panning to the browser', CT, 'reads the shipped carousel declarations',
     [(Y, '\t\ttouch-action: pan-y;\n', '')]),
]


def digest(path):
    return hashlib.sha256((ROOT / path).read_bytes()).hexdigest()


def run(test):
    if REPORT.exists():
        REPORT.unlink()
    done = subprocess.run(VITEST + [test], cwd=ROOT, capture_output=True, text=True,
                          encoding='utf-8', errors='replace', timeout=400)
    if not REPORT.exists():
        return done.returncode, None, re.sub(r'\x1b\[[0-9;]*m', '', done.stdout + done.stderr)[-600:]
    report = json.loads(REPORT.read_text(encoding='utf-8'))
    cases = [case for result in report['testResults'] for case in result['assertionResults']]
    failed = [case['title'] for case in cases if case['status'] == 'failed']
    message = '' if cases else ' '.join(result.get('message', '') for result in report['testResults'])[:300]
    return done.returncode, (len(cases), failed), message


def main():
    wanted = sys.argv[1:]
    before = {path: digest(path) for path in OWNED}
    lines = [f'digest before: {json.dumps(before)}']
    for label, test, named, edits in MUTATIONS:
        if wanted and not any(word in label for word in wanted):
            continue
        originals = {}
        try:
            for edit in edits:
                path, old, new = edit[0], edit[1], edit[2]
                count = edit[3] if len(edit) > 3 else 1
                file = ROOT / path
                if path not in originals:
                    originals[path] = file.read_bytes()
                text = file.read_bytes().decode('utf-8')
                if text.count(old) != count:
                    raise RuntimeError(f'expected {count} match in {path}, found {text.count(old)}')
                file.write_bytes(text.replace(old, new).encode('utf-8'))
            code, result, tail = run(test)
            if result is None:
                line = f'NOREPORT exit={code} | {label} | {test} | {tail}'
            else:
                total, failed = result
                hit = [title for title in failed if named in title]
                others = [title for title in failed if named not in title]
                verdict = ('EXACT' if hit and not others else 'JOINED' if hit else 'MISSED')
                if total == 0:
                    verdict = 'COLLECTION'
                line = (f'{verdict} exit={code} | {label} | {test} | {len(failed)} failed of {total} | '
                        f'named: {hit} | joined: {others}{" | " + tail if tail else ""}')
        except Exception as error:
            line = f'ERR | {label} | {error}'
        finally:
            for path, data in originals.items():
                (ROOT / path).write_bytes(data)
        print(line, flush=True)
        lines.append(line)
    if not wanted:
        for test in [CT, ST, DT, VT, PT, HT, IT]:
            code, result, tail = run(test)
            total, failed = result if result is not None else (0, ['no report'])
            line = f'GREEN? exit={code} | {test} | {len(failed)} failed of {total} | {failed}'
            print(line, flush=True)
            lines.append(line)
    after = {path: digest(path) for path in OWNED}
    receipt = 'restored byte for byte' if after == before else f'DIGEST MISMATCH {json.dumps(after)}'
    lines.append(f'digest after: {json.dumps(after)}')
    lines.append(f'receipt: {receipt}')
    print(lines[-1], flush=True)
    LOG.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')


main()
