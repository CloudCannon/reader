export interface IGenerator {
	name: string;
	version: string;
	environment?: string;
	metadata?: IGeneratorMetadata;
}

interface IGeneratorMetadata {
	markdown: string;
	[key: string]: Record<string, unknown>;
}
