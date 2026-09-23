
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
	Object.freeze({
		name: 'Captioned carousel',
		markup:
			'<div id="pier-carousel" class="carousel"><div class="carousel-indicators"><button type="button" data-bs-target="#pier-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Pier 1"></button><button type="button" data-bs-target="#pier-carousel" data-bs-slide-to="1" aria-label="Pier 2"></button><button type="button" data-bs-target="#pier-carousel" data-bs-slide-to="2" aria-label="Pier 3"></button></div><div class="carousel-inner"><div class="carousel-item active"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23343a40\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%236c757d\'/%3E%3C/svg%3E" alt="North pier at dawn" width="800" height="400"><div class="carousel-caption"><h5>North pier</h5><p>Cargo ships berth here before dawn.</p></div></div><div class="carousel-item"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23212529\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%23495057\'/%3E%3C/svg%3E" alt="South pier at noon" width="800" height="400"><div class="carousel-caption"><h5>South pier</h5><p>Ferries leave on the hour.</p></div></div><div class="carousel-item"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23495057\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%23343a40\'/%3E%3C/svg%3E" alt="East pier at dusk" width="800" height="400"><div class="carousel-caption"><h5>East pier</h5><p>Fishing boats land their catch at dusk.</p></div></div></div><button class="carousel-control-prev" type="button" data-bs-target="#pier-carousel" data-bs-slide="prev" aria-label="Previous pier"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button><button class="carousel-control-next" type="button" data-bs-target="#pier-carousel" data-bs-slide="next" aria-label="Next pier"><span class="carousel-control-next-icon" aria-hidden="true"></span></button></div>',
	}),
	Object.freeze({
		name: 'Fading carousel',
		markup:
			'<div id="tide-carousel" class="carousel carousel-fade"><div class="carousel-inner"><div class="carousel-item active"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%230d6efd\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%230a58ca\'/%3E%3C/svg%3E" alt="High tide over the breakwater" width="800" height="400"></div><div class="carousel-item"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23198754\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%23146c43\'/%3E%3C/svg%3E" alt="Low tide over the breakwater" width="800" height="400"></div></div><button class="carousel-control-prev" type="button" data-bs-target="#tide-carousel" data-bs-slide="prev" aria-label="Previous tide"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button><button class="carousel-control-next" type="button" data-bs-target="#tide-carousel" data-bs-slide="next" aria-label="Next tide"><span class="carousel-control-next-icon" aria-hidden="true"></span></button></div>',
	}),
	Object.freeze({
		name: 'Inverted carousel',
		markup:
			'<div id="chart-carousel" class="carousel carousel-dark"><div class="carousel-indicators"><button type="button" data-bs-target="#chart-carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Chart 1"></button><button type="button" data-bs-target="#chart-carousel" data-bs-slide-to="1" aria-label="Chart 2"></button></div><div class="carousel-inner"><div class="carousel-item active"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23f8f9fa\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%23dee2e6\'/%3E%3C/svg%3E" alt="Chart of the inner harbor" width="800" height="400"><div class="carousel-caption"><h5>Inner harbor</h5><p>Depths are marked in meters.</p></div></div><div class="carousel-item"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23e9ecef\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%23ced4da\'/%3E%3C/svg%3E" alt="Chart of the outer harbor" width="800" height="400"><div class="carousel-caption"><h5>Outer harbor</h5><p>The channel runs north of the buoys.</p></div></div></div><button class="carousel-control-prev" type="button" data-bs-target="#chart-carousel" data-bs-slide="prev" aria-label="Previous chart"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button><button class="carousel-control-next" type="button" data-bs-target="#chart-carousel" data-bs-slide="next" aria-label="Next chart"><span class="carousel-control-next-icon" aria-hidden="true"></span></button></div>',
	}),
	Object.freeze({
		name: 'Advancing carousel',
		markup:
			'<div class="carousel"><div class="carousel-inner"><div class="carousel-item active carousel-item-start"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%236c757d\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%23495057\'/%3E%3C/svg%3E" alt="Lighthouse at dusk" width="800" height="400"></div><div class="carousel-item carousel-item-next carousel-item-start"><img class="img-fluid" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 400\'%3E%3Crect width=\'800\' height=\'400\' fill=\'%23fd7e14\'/%3E%3Cpath d=\'M0 400L260 180L480 320L640 220L800 400Z\' fill=\'%23ca6510\'/%3E%3C/svg%3E" alt="Lighthouse at sunset" width="800" height="400"></div></div></div>',
	}),
])
