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
  return (
    <Container type={transaction.type}>
      <img src="/icons/dollar.svg" alt={transaction.category} />

      <div>
        <strong>{transaction.description}</strong>
        <span>{transaction.createdAt}</span>
      </div>

      <strong>{`${
        transaction.type === 'outcome' ? '- R$' : 'R$'
      } ${transaction.value.toFixed(2)}`}</strong>
    </Container>
  );
};
