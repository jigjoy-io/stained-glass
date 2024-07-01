/**
 * Defines a schema object that represents a data structure for validating page cretion dto.
 * @type {object}
 * @property {string} type - The type of the object (required).
 * @property {object} discriminator - Specifies page type to be schema discrimnator..
 * @property {array} oneOf - An array of objects representing different possible structures.
 * @returns None
 */
export const schema = {
	type: 'object',
	required: [
		'type'
	],
	discriminator: { propertyName: 'type' },
	oneOf: [
		{
			properties: {
				id: {
					type: 'string',
				},
				origin: {
					type: 'string',
				},
				created: {
					type: 'string',
				},
				updated: {
					type: 'string',
				},
				type: { enum: ['blank'] },
				config: {
					type: 'object',
					properties: {
						buildingBlocks: {
							type: 'array'
						}
					},
					required: ['buildingBlocks']
				}
			},
			required: ['config', 'origin'],
		},
		{
			properties: {
				id: {
					type: 'string',
				},
				origin: {
					type: 'string',
				},
				created: {
					type: 'string',
				},
				updated: {
					type: 'string',
				},
				type: { enum: ['carousel'] },
				config: {
					type: 'object',
					properties: {
						pages: {
							type: 'array',
							items: {
								type: 'string'
							}
						}
					},
					required: ['pages']
				}
			},
			required: ['config', 'origin'],
		},
	]
}
