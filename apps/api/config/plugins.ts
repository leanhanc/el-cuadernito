export default () => ({
	'users-permissions': {
		config: {
			jwtSecret: process.env.JWT_SECRET,
			jwt: {
				expiresIn: '60d',
			},
			register: {
				allowedFields: ['whatsapp'],
			},
		},
	},
	slugify: {
		enabled: true,
		config: {
			contentTypes: {
				course: {
					field: 'slug',
					references: 'name',
				},
			},
		},
	},
	email: {
		config: {
			provider: 'sendgrid',
			providerOptions: {
				apiKey: process.env.SENDGRID_API_KEY,
			},
			settings: {
				defaultFrom: 'vozycuento@gmail.com',
				defaultReplyTo: 'vozycuento@gmail.com',
			},
		},
	},
});
