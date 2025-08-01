import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

/* LiveStore */
import { nanoid, queryDb } from '@livestore/livestore';
import { useStore, useQuery } from '@livestore/react';
import { events, tables } from '@db';

/* Utils */
import { getRandomExpense } from '@mobile/lib/utils/expenses';

export default function HomeTab() {
	const { store } = useStore();

	const expenses = useQuery(
		queryDb(tables.expenses.where({ userId: 'gXRwqvhT' })),
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Expenses</Text>
				<Text style={styles.subtitle}>Track your spending</Text>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					const expense = getRandomExpense();

					store.commit(
						events.expenseCreated({
							id: nanoid(8),
							userId: expense.userId,
							amountArs: expense.amountArs,
							amountUsd: expense.amountUsd,
							exchangeRate: expense.exchangeRate,
							currency: expense.currency,
							categoryId: expense.categoryId,
							subCategoryId:
								'subCategoryId' in expense ? expense.subCategoryId : undefined,
							note: expense.note,
							date: expense.date,
							createdAt: expense.createdAt,
						}),
					);
				}}
			>
				<Text style={styles.buttonText}>+ Add Expense</Text>
			</TouchableOpacity>

			<ScrollView
				contentContainerStyle={styles.expenseList}
				showsVerticalScrollIndicator={false}
			>
				{expenses.length === 0 ? (
					<View style={styles.emptyState}>
						<Text style={styles.emptyText}>No expenses yet</Text>
						<Text style={styles.emptySubtext}>
							Tap the button above to add your first expense
						</Text>
					</View>
				) : (
					expenses.map((exp) => (
						<View key={exp.id} style={styles.card}>
							<View style={styles.cardHeader}>
								<Text style={styles.amount}>
									{exp.currency}{' '}
									{exp.currency === 'USD' ? exp.amountUsd : exp.amountArs}
								</Text>
								<View style={styles.currencyBadge}>
									<Text style={styles.currencyText}>{exp.currency}</Text>
								</View>
							</View>
							{exp.note && <Text style={styles.note}>{exp.note}</Text>}
							<Text style={styles.date}>
								{new Date(exp.createdAt).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								})}
							</Text>
						</View>
					))
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	header: {
		paddingTop: 60,
		paddingHorizontal: 20,
		paddingBottom: 20,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#E9ECEF',
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: '#1A1A1A',
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 16,
		color: '#6C757D',
		fontWeight: '400',
	},
	button: {
		margin: 20,
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 12,
		backgroundColor: '#007AFF',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#007AFF',
		shadowOpacity: 0.3,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 8,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: '600',
	},
	expenseList: {
		paddingHorizontal: 20,
		paddingBottom: 100,
	},
	emptyState: {
		alignItems: 'center',
		paddingVertical: 60,
	},
	emptyText: {
		fontSize: 20,
		fontWeight: '600',
		color: '#6C757D',
		marginBottom: 8,
	},
	emptySubtext: {
		fontSize: 16,
		color: '#ADB5BD',
		textAlign: 'center',
	},
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 20,
		marginBottom: 16,
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 4 },
		elevation: 4,
		borderWidth: 1,
		borderColor: '#F1F3F4',
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	amount: {
		fontSize: 24,
		fontWeight: '700',
		color: '#1A1A1A',
	},
	currencyBadge: {
		backgroundColor: '#E3F2FD',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	currencyText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#1976D2',
	},
	note: {
		fontSize: 16,
		color: '#495057',
		marginBottom: 8,
		fontWeight: '500',
	},
	date: {
		fontSize: 14,
		color: '#6C757D',
		fontWeight: '400',
	},
});
