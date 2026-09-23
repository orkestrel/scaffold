def pic(fill, ridge, alt):
    return ("<img class=\"img-fluid\" src=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E"
            f"%3Crect width='800' height='400' fill='%23{fill}'/%3E%3Cpath d='M0 400L260 180L480 320L640 220L800 400Z' fill='%23{ridge}'/%3E%3C/svg%3E\" alt=\"{alt}\" width=\"800\" height=\"400\">")
def indicators(ident, noun, n):
    out='<div class="carousel-indicators">'
    for i in range(n):
        cur = ' class="active" aria-current="true"' if i==0 else ''
        out+=f'<button type="button" data-bs-target="#{ident}" data-bs-slide-to="{i}"{cur} aria-label="{noun} {i+1}"></button>'
    return out+'</div>'
def controls(ident, noun):
    return (f'<button class="carousel-control-prev" type="button" data-bs-target="#{ident}" data-bs-slide="prev" aria-label="Previous {noun.lower()}"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button>'
            f'<button class="carousel-control-next" type="button" data-bs-target="#{ident}" data-bs-slide="next" aria-label="Next {noun.lower()}"><span class="carousel-control-next-icon" aria-hidden="true"></span></button>')
def slide(classes, picture, caption=None):
    cap = f'<div class="carousel-caption"><h5>{caption[0]}</h5><p>{caption[1]}</p></div>' if caption else ''
    return f'<div class="carousel-item{classes}">{picture}{cap}</div>'

captioned = ('<div id="pier-carousel" class="carousel">' + indicators('pier-carousel','Pier',3) + '<div class="carousel-inner">'
  + slide(' active', pic('343a40','6c757d','North pier at dawn'), ('North pier','Cargo ships berth here before dawn.'))
  + slide('', pic('212529','495057','South pier at noon'), ('South pier','Ferries leave on the hour.'))
  + slide('', pic('495057','343a40','East pier at dusk'), ('East pier','Fishing boats land their catch at dusk.'))
  + '</div>' + controls('pier-carousel','Pier') + '</div>')
fading = ('<div id="tide-carousel" class="carousel carousel-fade"><div class="carousel-inner">'
  + slide(' active', pic('0d6efd','0a58ca','High tide over the breakwater'))
  + slide('', pic('198754','146c43','Low tide over the breakwater'))
  + '</div>' + controls('tide-carousel','Tide') + '</div>')
dark = ('<div id="chart-carousel" class="carousel carousel-dark">' + indicators('chart-carousel','Chart',2) + '<div class="carousel-inner">'
  + slide(' active', pic('f8f9fa','dee2e6','Chart of the inner harbor'), ('Inner harbor','Depths are marked in meters.'))
  + slide('', pic('e9ecef','ced4da','Chart of the outer harbor'), ('Outer harbor','The channel runs north of the buoys.'))
  + '</div>' + controls('chart-carousel','Chart') + '</div>')
advancing = ('<div class="carousel"><div class="carousel-inner">'
  + slide(' active carousel-item-start', pic('6c757d','495057','Lighthouse at dusk'))
  + slide(' carousel-item-next carousel-item-start', pic('fd7e14','ca6510','Lighthouse at sunset'))
  + '</div></div>')
import json
for name, m in [('Captioned carousel',captioned),('Fading carousel',fading),('Inverted carousel',dark),('Advancing carousel',advancing)]:
    print(name); print(m); print()

def ts(s): return "'" + s.replace("\\","\\\\").replace("'", "\\'") + "'"
block = '''
/** Holds the Carousel section's visible copy and accessible name. */
export const CAROUSEL_COPY = Object.freeze({
	region: 'Carousel',
	paragraph:
		'Compare a captioned carousel, a fading one, an inverted one over light pictures, and one caught advancing to its next slide, each state set as a class in markup. Hover or focus a control to compare its states.',
})

/**
 * Lists the carousel specimens the section renders, one state each, in render order.
 *
 * @remarks
 * Each state is a class written in the markup: `active` marks the resting slide and its indicator,
 * and the advancing specimen carries the classes an engine writes while the next slide moves in.
 * The indicators and controls carry the release's own trigger attributes, which the indicator rule
 * selects on, and no specimen carries the `slide` class, which no rule reads. Each control is named
 * by its `aria-label` attribute, because the visually hidden label the release writes is a utility
 * this cascade does not ship, and each name is unique to the showcase so a pointer drive reaches
 * one control. Each picture is an inline SVG document: dark behind the white caption, and light
 * behind the black caption the `carousel-dark` class paints, so each caption reads over the picture
 * it sits on. The inverted specimen is named for what the class does rather than for the class,
 * because a capture scenario carries no mode word.
 *
 * No specimen renders a lone incoming slide or the swipe class. A lone incoming slide rests a whole
 * width outside its track, so its frame would be the resting frame, and the swipe class changes no
 * paint. Nor does one render the backward advance or the fade's outgoing slide: each leaves the
 * incoming slide at rest in the track, which is the paint the advancing and the fading frames
 * already carry. The `tests/src/styles/components/carousel.test.ts` file reads each of them on its
 * own elements.
 */
export const CAROUSEL_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
'''
for name, m in [('Captioned carousel',captioned),('Fading carousel',fading),('Inverted carousel',dark),('Advancing carousel',advancing)]:
    block += f'\tObject.freeze({{\n\t\tname: {ts(name)},\n\t\tmarkup:\n\t\t\t{ts(m)},\n\t}}),\n'
block += '])\n'
open('constants-block.ts','w').write(block)
