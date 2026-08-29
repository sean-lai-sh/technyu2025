/**
 * Alumni results bento — Studio schema to add in sanity-technyu2025.
 *
 * This frontend repo has no Studio and no write token. Production today has
 * ZERO `alumniResultsSection` documents (types: profile, program, pressPost,
 * pressSpotlight, eboardBio, teamMember). Until Sean publishes one, the
 * homepage History section falls back to `lib/homepage/alumni-results.ts`.
 *
 * When a document exists with a non-empty `tiles` array, it wins wholesale
 * (heading / body / footnote / tiles). Empty or failed fetches keep fallback.
 *
 * Paste the objects below into the Studio repo (`schemaTypes/`) and register
 * `alumniResultsSection` in `schemaTypes/index.ts`.
 *
 * --- document: alumniResultsSection (singleton recommended) ---
 *
 * defineType({
 *   name: 'alumniResultsSection',
 *   title: 'Alumni Results (homepage bento)',
 *   type: 'document',
 *   fields: [
 *     defineField({ name: 'heading', type: 'string', validation: Rule => Rule.required() }),
 *     defineField({ name: 'body', type: 'text', rows: 3 }),
 *     defineField({ name: 'footnote', type: 'string' }),
 *     defineField({
 *       name: 'tiles',
 *       type: 'array',
 *       of: [{ type: 'alumniResultTile' }],
 *     }),
 *   ],
 * })
 *
 * --- object: alumniResultTile ---
 *
 * defineType({
 *   name: 'alumniResultTile',
 *   title: 'Alumni result tile',
 *   type: 'object',
 *   fields: [
 *     defineField({
 *       name: 'tileType',
 *       type: 'string',
 *       options: { list: ['logo', 'quote', 'stat', 'person'] },
 *       validation: Rule => Rule.required(),
 *     }),
 *     defineField({ name: 'col', type: 'number', description: 'Desktop start slot (1–12). Blank = auto-flow.' }),
 *     defineField({ name: 'row', type: 'number', description: 'Desktop start row (1–3).' }),
 *     defineField({ name: 'span', type: 'number', description: 'Width in slots. Logo=1, stat=2, quote=3+.' }),
 *     defineField({ name: 'tall', type: 'number', description: 'Height in rows. Blank=1, quote often=2.' }),
 *     defineField({ name: 'href', type: 'url', description: 'Optional outbound (company / writeup). Shows ↗.' }),
 *     defineField({ name: 'foundedByEboard', type: 'boolean' }),
 *     defineField({ name: 'marker', type: 'string', initialValue: '*' }),
 *     defineField({ name: 'alt', type: 'string' }),
 *     defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
 *     defineField({ name: 'width', type: 'number' }),
 *     defineField({ name: 'height', type: 'number' }),
 *     defineField({ name: 'quote', type: 'text', rows: 4 }),
 *     defineField({ name: 'attributionName', type: 'string' }),
 *     defineField({ name: 'attributionRole', type: 'string' }),
 *     defineField({ name: 'statValue', type: 'string' }),
 *     defineField({ name: 'statLabel', type: 'string' }),
 *     defineField({ name: 'personName', type: 'string' }),
 *     defineField({ name: 'personRole', type: 'string' }),
 *     defineField({ name: 'personImage', type: 'image' }),
 *   ],
 * })
 *
 * GROQ shape (see getAlumniResultsSection): reuses logoSliderSection's
 * imageUrl / alt / width / height projection.
 */

export const ALUMNI_RESULTS_DOCUMENT_TYPE = 'alumniResultsSection' as const
export const ALUMNI_RESULT_TILE_TYPE = 'alumniResultTile' as const
