export interface Asset {
	id: number;
	amount: number;
	asset_type: 'account' | 'cash' | 'investment' | 'other';
	currency: 'USD' | 'ARS';
	bank?: string | null;
	updated_at: Date;
}
