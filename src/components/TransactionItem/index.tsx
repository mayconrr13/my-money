import { useMemo } from 'react';
import { format } from 'date-fns';

import { Container } from './styles';

interface TransactionProps {
  transaction: {
    id: string;
    description: string;
    value: number;
    type: string;
    category: string;
    createdAt: number;
  };
}

export const TransactionItem = ({
  transaction,
}: TransactionProps): JSX.Element => {
  const formatedDateAndHour = useMemo(() => {
    const date = format(new Date(transaction.createdAt), 'dd/MM/y - HH:mm');

    return date;
  }, [transaction]);

  return (
    <Container type={transaction.type}>
      <span>
        <img src="/icons/dollar.svg" alt={transaction.category} />
      </span>

      <div>
        <strong>{transaction.description}</strong>
        <span>{formatedDateAndHour}</span>
      </div>

      <strong>{`${
        transaction.type === 'outcome' ? '- R$' : 'R$'
      } ${transaction.value.toFixed(2)}`}</strong>
    </Container>
  );
};
