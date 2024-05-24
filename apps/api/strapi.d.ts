interface StrapiEnvUtility {
	env: {
		(key: string, defaultValue?: string): string;
		int(key: string, defaultValue: number): number;
		float(key: string, defaultValue: number): number;
		bool(key: string, defaultValue: boolean): boolean;
		json<T>(key: string, defaultValue: T): T;
		array<T>(key: string, defaultValue: T[]): T[];
		date(key: string, defaultValue: Date): Date;
		oneOf<T extends string>(key: string, validValues: T[], defaultValue: T): T;
	};
}
