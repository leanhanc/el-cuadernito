export interface Asset {
	id: number;
	amount: number;
	asset_type: 'account' | 'cash' | 'investment' | 'other';
	currency: 'USD' | 'ARS';
	holder?: string | null;
	description?: string;
	updated_at: string;
}
