import { configure, getConsoleSink } from '@logtape/logtape';

export async function configureLogger(): Promise<void> {
	return configure({
		sinks: {console: getConsoleSink()},
		loggers: [
			{category: 'ingress.arkevorkhat.net', lowestLevel: 'debug', sinks: ['console']}
		]
	})
}