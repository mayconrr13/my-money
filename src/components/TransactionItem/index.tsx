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
    <div>
      <img src="" alt={transaction.category} />

      <div>
        <strong>{transaction.description}</strong>
        <span>{transaction.createdAt}</span>
      </div>

      <strong>{`${
        transaction.type === 'outcome' ? '- R$' : 'R$'
      } ${transaction.value.toFixed(2)}`}</strong>
    </div>
  );
};
