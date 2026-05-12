import { configure, getConsoleSink } from '@logtape/logtape';

export async function configureLogger(): Promise<void> {
	return configure({
		sinks: {console: getConsoleSink()},
		loggers: [
			{category: ['logtape', 'meta'], sinks: ['console'], lowestLevel: 'warning'},
			{category: 'ingress.arkevorkhat.net', lowestLevel: 'debug', sinks: ['console']}
		]
	})
}