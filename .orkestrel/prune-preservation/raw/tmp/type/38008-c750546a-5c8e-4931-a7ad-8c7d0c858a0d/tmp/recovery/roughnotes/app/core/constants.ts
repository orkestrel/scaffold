import type {
	Article,
	Asset,
	Category,
	Channel,
	Department,
	Era,
	Market,
	Office,
	Product,
	Rep,
	Sku,
	View,
} from './types.js'

/**
 * Holds the product id treated as the featured offering on listings.
 */
export const FEATURED_PRODUCT = 'roughnotes-pro'

/**
 * Lists every magazine {@link Category} value in display order.
 */
export const CATEGORIES: readonly Category[] = Object.freeze([
	'coverage',
	'specialty',
	'management',
	'technology',
	'personal',
	'program',
])

/**
 * Holds the visible label for each magazine {@link Category}.
 */
export const CATEGORY_LABELS: Readonly<Record<Category, string>> = Object.freeze({
	coverage: 'Coverage',
	specialty: 'Specialty',
	management: 'Management',
	technology: 'Technology',
	personal: 'Personal lines',
	program: 'Program business',
})

/**
 * Holds the fixture product catalog.
 */
export const PRODUCTS: readonly Product[] = Object.freeze([
	Object.freeze({
		id: FEATURED_PRODUCT,
		name: 'RoughNotes-Pro',
		summary:
			'The producer toolkit: PF&M coverage analysis, commercial and personal risk evaluation, court decisions, and In-Action sales guidance.',
		audience: 'Individual producers who need the full technical desk on every device.',
		inclusions: Object.freeze([
			'Policy Forms & Manual Analysis',
			'Commercial and Personal Lines Risk Evaluation System',
			'In-Action sales guidance',
			'Rough Notes magazine',
			'The Insurance Marketplace',
		]),
	}),
	Object.freeze({
		id: 'advantage-plus',
		name: 'Advantage-Plus',
		summary:
			'Technical and educational content scaled for an entire agency, so every desk speaks with the same expertise.',
		audience: 'Agencies that need shared authority across producers, CSRs, and principals.',
		inclusions: Object.freeze([
			'Everything in RoughNotes-Pro',
			'How to Insure training courses',
			'Insurance Words and Their Meanings',
			'Business-building letters',
			'Agency blog articles',
		]),
	}),
	Object.freeze({
		id: 'marketplace',
		name: 'The Insurance Marketplace',
		summary:
			'The national directory of excess, surplus, and specialty markets for hard-to-place coverage.',
		audience: 'Licensed agents searching specialty markets.',
		inclusions: Object.freeze([
			'Industry categories across specialty lines',
			'Free access for licensed agents',
			'Submission-oriented market notes',
		]),
	}),
	Object.freeze({
		id: 'pfm-online',
		name: 'PF&M Online',
		summary:
			'Policy Forms & Manual Analysis — the desk reference for commercial, personal, and specialty coverage questions.',
		audience: 'Producers presenting coverage concerns with court-backed analysis.',
		inclusions: Object.freeze([
			'Commercial, personal, and specialty analysis',
			'Court decisions tied to coverage questions',
			'On-demand desk reference',
		]),
	}),
	Object.freeze({
		id: 'books',
		name: 'Books and calculator wheels',
		summary:
			'Reference guides, calculator wheels, and agency supplies used in classrooms and onboarding.',
		audience: 'Training desks and new producers.',
		inclusions: Object.freeze(['Coverages Applicable', 'Calculator wheels', 'Agency supplies']),
	}),
	Object.freeze({
		id: 'magazine',
		name: 'Rough Notes magazine',
		summary: 'The independent-agent publication on coverage, markets, leadership, and technology.',
		audience: 'Licensed P&C agents.',
		inclusions: Object.freeze([
			'Monthly print and digital issues',
			'All-agent editorial board',
			'Coverage and agency-management features',
		]),
	}),
])

/**
 * Holds the fixture magazine articles.
 */
export const ARTICLES: readonly Article[] = Object.freeze([
	Object.freeze({
		id: 'mass-shootings-occurrence',
		title: 'Mass shootings; mass confusion?',
		dek: 'Rulings on what constitutes an occurrence can dismay both insurers and policyholders.',
		author: 'J. Harrington',
		issued: '2026-09-01',
		category: 'coverage',
		body: 'Court readings of occurrence continue to split insurers and policyholders when a mass shooting produces many claims. The analysis walks the coverage question an agent must raise before the submission, and the documentation that keeps the recommendation on the record.',
	}),
	Object.freeze({
		id: 'cyber-claims-trends',
		title: 'Cyber claims trends you cannot ignore',
		dek: 'Where clients are most exposed to a costly cyber event this year.',
		author: 'Rob Jones',
		issued: '2026-09-01',
		category: 'specialty',
		body: 'Three claim patterns are showing up in specialty submissions: social-engineering transfers, interrupted operations after a ransomware event, and unpatched remote access. Each pattern has a coverage conversation the producer can take to the client before the market hardens the account.',
	}),
	Object.freeze({
		id: 'softening-market-service',
		title: 'Why a softening market demands better service',
		dek: 'How agencies keep clients when price is no longer the whole story.',
		author: 'Doug Mohr',
		issued: '2026-09-01',
		category: 'technology',
		body: 'As rates ease, the agencies that keep the book are the ones that can still explain the coverage and the gaps. Service is the differentiator, and the tools that put coverage analysis in front of the client are what make that service visible.',
	}),
	Object.freeze({
		id: 'responsibility-in-leadership',
		title: 'Responsibility in leadership',
		dek: 'Leaders who take responsibility navigate complexity without passing it down as fog.',
		author: 'RN Editorial',
		issued: '2026-09-01',
		category: 'management',
		body: 'Agency leadership is a coverage problem as much as a people problem: unclear authority produces E&O. The feature looks at principals who name who owns the recommendation and who owns the file.',
	}),
	Object.freeze({
		id: 'loss-control-salesperson',
		title: 'Make loss control your best salesperson',
		dek: 'A visit that is only service still sells the confidence behind the policy.',
		author: 'Top Q&A',
		issued: '2026-09-01',
		category: 'personal',
		body: 'Personal-lines households remember the person who walked the property more than the person who emailed a quote. Loss control is the conversation that documents recommendations and keeps the relationship from becoming a price shop.',
	}),
	Object.freeze({
		id: 'building-momentum',
		title: 'Building momentum',
		dek: 'Program-business resources keep expanding as the marketplace grows.',
		author: 'S. Ayars',
		issued: '2026-09-01',
		category: 'management',
		body: 'Program administrators are adding desk resources as more retail agents look for admitted and nonadmitted capacity by class. The directory and the evaluation checklists are how a retail shop enters that market without guessing the form.',
	}),
	Object.freeze({
		id: 'local-landscape',
		title: 'A permanent part of the local landscape',
		dek: 'How a Southeast agency grew with regional operating and distributed-equity models.',
		author: 'Christopher W. Cook',
		issued: '2026-09-01',
		category: 'management',
		body: 'Around thirty years ago an alliance of independent agencies in Georgia began sharing operating discipline without giving up local identity. The September feature follows how that model still explains growth that is regional rather than rolled-up.',
	}),
])

/**
 * Holds a searchable sample of Insurance Marketplace listings.
 *
 * @remarks
 * This is a fixture sample, not a scrape of the live directory.
 */
export const MARKETS: readonly Market[] = Object.freeze([
	Object.freeze({
		id: 'restaurant-gl',
		name: 'Restaurant general liability',
		industry: 'Hospitality',
		coverages: Object.freeze(['General liability', 'Liquor liability', 'Food contamination']),
		notes:
			'Class codes and liquor add-ons belong on the submission before the market sees the file.',
	}),
	Object.freeze({
		id: 'liquor-liability',
		name: 'Liquor liability',
		industry: 'Hospitality',
		coverages: Object.freeze(['Liquor liability', 'Assault and battery']),
		notes: 'Court precedent on occurrence often travels with the liquor placement.',
	}),
	Object.freeze({
		id: 'equipment-breakdown',
		name: 'Equipment breakdown',
		industry: 'Hospitality',
		coverages: Object.freeze(['Equipment breakdown', 'Spoilage']),
		notes: 'Kitchen equipment and refrigeration are the usual triggers in restaurant classes.',
	}),
	Object.freeze({
		id: 'cyber-data-breach',
		name: 'Cyber and data breach',
		industry: 'Technology',
		coverages: Object.freeze(['Cyber liability', 'Breach response']),
		notes: 'Emerging exposure for any class that stores payment or health data.',
	}),
	Object.freeze({
		id: 'contractors-gl',
		name: 'Contractors general liability',
		industry: 'Construction',
		coverages: Object.freeze(['General liability', 'Completed operations']),
		notes:
			'Wrap-up and additional-insured wording decide whether the retail agent can use admitted paper.',
	}),
	Object.freeze({
		id: 'inland-marine',
		name: 'Contractors inland marine',
		industry: 'Construction',
		coverages: Object.freeze(['Inland marine', 'Tools and equipment']),
		notes: 'Scheduled equipment and installation floaters are the usual asks.',
	}),
	Object.freeze({
		id: 'directors-officers',
		name: 'Directors and officers',
		industry: 'Financial',
		coverages: Object.freeze(['Directors and officers', 'Entity coverage']),
		notes: 'Private-company D&O still needs a side-A conversation on every nonprofit board.',
	}),
	Object.freeze({
		id: 'errors-omissions',
		name: 'Professional errors and omissions',
		industry: 'Professional services',
		coverages: Object.freeze(['Errors and omissions', 'Cyber liability']),
		notes: 'The claim is usually a failed advice file, not a premises event.',
	}),
	Object.freeze({
		id: 'flood-excess',
		name: 'Excess flood',
		industry: 'Property',
		coverages: Object.freeze(['Flood', 'Excess flood']),
		notes:
			'NFIP plus excess is the standard personal and commercial property ask in coastal counties.',
	}),
	Object.freeze({
		id: 'vacant-building',
		name: 'Vacant building',
		industry: 'Property',
		coverages: Object.freeze(['Vacant building', 'Vandalism']),
		notes: 'Vacancy permits and protective-safeguard warranties belong on the binder.',
	}),
	Object.freeze({
		id: 'trucking-liability',
		name: 'Trucking liability',
		industry: 'Transportation',
		coverages: Object.freeze(['Auto liability', 'Motor truck cargo']),
		notes: 'Radius, commodities, and MCS-90 decide the market before the loss run does.',
	}),
	Object.freeze({
		id: 'event-cancellation',
		name: 'Event cancellation',
		industry: 'Hospitality',
		coverages: Object.freeze(['Event cancellation', 'Weather']),
		notes: 'Nonappearance and weather franchises are separate talks from GL for the venue.',
	}),
])

/**
 * Lists every {@link View} value the navigator may name.
 */
export const VIEWS: readonly View[] = Object.freeze([
	'home',
	'about',
	'publications',
	'newsletter',
	'products',
	'product',
	'magazine',
	'article',
	'marketplace',
	'subscribe',
	'media',
	'contact',
	'shop',
	'item',
	'payment',
])

/**
 * Lists every shop {@link Department} value in display order.
 */
export const DEPARTMENTS: readonly Department[] = Object.freeze(['books', 'wheels', 'supplies'])

/**
 * Holds the visible label for each shop {@link Department}.
 */
export const DEPARTMENT_LABELS: Readonly<Record<Department, string>> = Object.freeze({
	books: 'Books',
	wheels: 'Calculator wheels',
	supplies: 'Agency supplies',
})

/**
 * Lists every media-kit {@link Channel} value in display order.
 */
export const CHANNELS: readonly Channel[] = Object.freeze(['magazine', 'marketplace', 'banner'])

/**
 * Holds the visible label for each media-kit {@link Channel}.
 */
export const CHANNEL_LABELS: Readonly<Record<Channel, string>> = Object.freeze({
	magazine: 'Rough Notes magazine',
	marketplace: 'The Insurance Marketplace',
	banner: 'Banner ads',
})

/**
 * Holds the published Indianapolis mailing office.
 */
export const OFFICE: Office = Object.freeze({
	street: '3755 East 82nd Street',
	suite: 'Suite 110',
	city: 'Indianapolis',
	region: 'Indiana',
	postal: '46240',
	voice: '317-582-1600',
	fax: '800-321-1909',
})

/**
 * Holds advertising representatives from the public media-kit page.
 */
export const REPS: readonly Rep[] = Object.freeze([
	Object.freeze({
		name: 'Tricia Cutter',
		role: 'Vice President, Advertising',
		phone: '317-816-1019',
		email: 'triciac@roughnotes.com',
	}),
	Object.freeze({
		name: 'Eric Hall',
		role: 'President, Strategic Partnerships',
		phone: '800-428-4384',
		email: 'ehall@roughnotes.com',
	}),
])

/**
 * Holds a fixture sample of orderable shop SKUs.
 *
 * @remarks
 * Prices and codes are taken from the public catalog listings. This is not a
 * scrape of every SKU, and live orders stay on Rough Notes.
 */
export const SKUS: readonly Sku[] = Object.freeze([
	Object.freeze({
		id: 'coverages-applicable',
		name: 'Coverages Applicable',
		summary:
			'The 2019 edition identifies the coverages a client needs, explains why they are necessary, and defines them in plain language. 426 pages.',
		department: 'books',
		code: '30040',
		price: 7800,
		isbn: '978-1-56461-339-4',
	}),
	Object.freeze({
		id: 'business-building-letters',
		name: 'Business Building Letters',
		summary:
			'Professionally written sales, survey, claim, cancellation, birthday, and special-event letters ready to customize for the agency and the client.',
		department: 'books',
		code: '58013',
		price: 6050,
		isbn: '978-1-56461-269-4',
	}),
	Object.freeze({
		id: 'ronoco-6-12-old-short-rate',
		name: 'RONOCO 6- and 12-month calculator wheel',
		summary:
			'Old short-rate method wheel. Gives earned and unearned, pro rata and old short-rate factors for 6- and 12-month policies.',
		department: 'wheels',
		code: '27006',
		price: 7500,
	}),
	Object.freeze({
		id: 'ronoco-online-1-10',
		name: 'RONOCO online calculator wheel',
		summary:
			'Online calculator wheel licensed for 1–10 workstations. Annual renewal is sold separately.',
		department: 'wheels',
		code: '1–10 workstations',
		price: 20000,
	}),
	Object.freeze({
		id: 'customer-line-folders-100',
		name: 'Customer line folders, printed, 100',
		summary:
			'Printed inside and out to show a schedule of insurance and prospect check-up, black ink on heavy manila card stock, for 8-inch by 5-inch sheets.',
		department: 'supplies',
		code: '05015',
		price: 7475,
	}),
])

/**
 * Holds public media-kit PDF destinations.
 */
export const ASSETS: readonly Asset[] = Object.freeze([
	Object.freeze({
		id: 'magazine-rate-2027',
		name: '2027 Rough Notes magazine rate card',
		channel: 'magazine',
		href: 'https://roughnotes.com/wp-content/uploads/2026/09/RN_MediaKit_2027_Rate%20Card.pdf',
	}),
	Object.freeze({
		id: 'magazine-mechanical-2027',
		name: '2027 Rough Notes magazine mechanical requirements',
		channel: 'magazine',
		href: 'https://roughnotes.com/wp-content/uploads/2026/09/RN_MediaKit_2027_Mechanical%20requirements.pdf',
	}),
	Object.freeze({
		id: 'magazine-calendar-2027',
		name: '2027 Rough Notes magazine editorial calendar',
		channel: 'magazine',
		href: 'https://roughnotes.com/wp-content/uploads/2026/09/RN_MediaKit_2027_Editorial%20Calendar.pdf',
	}),
	Object.freeze({
		id: 'magazine-kit-2027',
		name: '2027 Rough Notes magazine media kit',
		channel: 'magazine',
		href: 'https://roughnotes.com/wp-content/uploads/2026/09/RN_MediaKit_2027_sm.pdf',
	}),
	Object.freeze({
		id: 'magazine-audit-2026',
		name: 'Rough Notes Alliance for Audited Media statement',
		channel: 'magazine',
		href: 'https://roughnotes.com/wp-content/uploads/2026/07/AAM2026AuditReport-2.pdf',
	}),
	Object.freeze({
		id: 'marketplace-rate-2027',
		name: '2027 Insurance Marketplace rate card',
		channel: 'marketplace',
		href: 'https://roughnotes.com/wp-content/uploads/2026/08/IMPMediaKit2027_Rate%20Card.pdf',
	}),
	Object.freeze({
		id: 'marketplace-mechanical-2027',
		name: '2027 Insurance Marketplace mechanical requirements',
		channel: 'marketplace',
		href: 'https://roughnotes.com/wp-content/uploads/2026/08/IMPMediaKit2027_Mechanical%20Requirements.pdf',
	}),
	Object.freeze({
		id: 'marketplace-kit-2027',
		name: '2027 Insurance Marketplace media kit',
		channel: 'marketplace',
		href: 'https://roughnotes.com/wp-content/uploads/2026/08/IMPMediaKit2027.pdf',
	}),
	Object.freeze({
		id: 'banner-rate-2026',
		name: '2026 online banner ads rate card',
		channel: 'banner',
		href: 'https://roughnotes.com/wp-content/uploads/2025/09/RN_Online%20Banner%20ad%20Rates%20and%20Specs_2026.pdf',
	}),
])

/**
 * Holds a fixture sample of company timeline eras.
 */
export const ERAS: readonly Era[] = Object.freeze([
	Object.freeze({
		id: 'heritage',
		span: '1850s–1878',
		title: 'Rough notes from the field',
		body: 'Dr. Henry C. Martin left medicine for the unwieldy insurance business of the 1850s, traveling as a special agent and jotting field notes in an unregulated industry. Those notes became newsletters for his agents, then a magazine.',
	}),
	Object.freeze({
		id: 'born',
		span: '1878–1881',
		title: 'An agent magazine is born',
		body: 'Insurance Rough Notes became the first national publication for fire insurance agents. It gave producers practical selling information and a voice of reform for the industry.',
	}),
	Object.freeze({
		id: 'voice',
		span: '1888–1890',
		title: 'The voice of the agent',
		body: 'Editorial commentary helped standardize practice. The magazine spoke for independent agents as the business professionalized.',
	}),
	Object.freeze({
		id: 'earthquake',
		span: '1906–1913',
		title: 'San Francisco earthquake and fire',
		body: 'Coverage questions after the disaster shaped how agents explained forms. Rough Notes carried that technical conversation to desks across the country.',
	}),
	Object.freeze({
		id: 'technology',
		span: '1962–1978',
		title: 'A new age of technology',
		body: 'The company entered computing while the magazine marked its 75th year and then its 100th, adding products around the editorial core.',
	}),
	Object.freeze({
		id: 'core',
		span: '2008–',
		title: 'Core products, still independent',
		body: 'The desk still runs on Policy Forms & Manual Analysis, the Insurance Marketplace, and the magazine. The Rough Notes Company continues to serve the independent agency system from Indiana.',
	}),
])
