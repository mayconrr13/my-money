import { useTransaction } from '../../hooks/useTransaction';

import { TransactionItem } from '../TransactionItem';

import { Container } from './styles';

interface TransactionsListProps {
  visibleSection: 'statistics' | 'transactions';
}

export const TransactionsList = ({
  visibleSection,
}: TransactionsListProps): JSX.Element => {
  const { transactions } = useTransaction();

  return (
    <Container visibleSection={visibleSection}>
      {transactions &&
        transactions.map(transaction => {
          return (
            <TransactionItem transaction={transaction} key={transaction.id} />
          );
        })}
    </Container>
  );
};
