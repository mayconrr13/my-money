interface TransactionProps {
  id: string;
  description: string;
  value: number;
  type: string;
  category: string;
  createdAt: number;
}

export function sortTransactionsByDate(
  transactions: TransactionProps[]
): TransactionProps[] {
  return transactions.sort((a, b) => b.createdAt - a.createdAt);
}
