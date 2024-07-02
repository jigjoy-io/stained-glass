
 /**
  * Schema definition for an object with specific properties based on the 'type' field.
  * @type {object}
  * @property {string} type - The type of the object.
  * @property {object} discriminator - The property used for object type discrimination.
  * @property {array} required - An array of required properties.
  * @property {array} oneOf - An array of possible object structures based on 'type'.
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
				devConfig: {
					type: 'object',
					properties: {
						buildingBlocks: {
							type: 'array'
						}
					},
					required: ['buildingBlocks']
				},
                prodConfig: {
					type: ['object', 'null'],
					properties: {
						buildingBlocks: {
							type: 'array'
						}
					},
					required: ['buildingBlocks']
				}
			},
			required: ['devConfig', 'origin'],
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
				devConfig: {
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
				},
                prodConfig: {
					type: ['object', 'null'],
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
			required: ['devConfig', 'origin'],
		},
	]
}
