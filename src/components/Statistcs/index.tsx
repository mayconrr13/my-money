import { useTransaction } from '../../hooks/useTransaction';

export const Statistcs = (): JSX.Element => {
  const {
    handleTransactionsGroupedByDateRange,
    groupedTransactionsByDate,
    groupedFinancesSummary,
  } = useTransaction();

  return (
    <div>
      <h2>Estatísticas</h2>
      <div>
        <button
          type="button"
          onClick={() => handleTransactionsGroupedByDateRange(0)}
        >
          TOTAL
        </button>
        <button
          type="button"
          onClick={() => handleTransactionsGroupedByDateRange(1)}
        >
          HOJE
        </button>
        <button
          type="button"
          onClick={() => handleTransactionsGroupedByDateRange(7)}
        >
          SEMANAL
        </button>
        <button
          type="button"
          onClick={() => handleTransactionsGroupedByDateRange(30)}
        >
          MENSAL
        </button>
        <button
          type="button"
          onClick={() => handleTransactionsGroupedByDateRange(365)}
        >
          ANUAL
        </button>
      </div>

      <div>
        {groupedTransactionsByDate &&
          groupedTransactionsByDate.map(transaction => {
            return (
              <div key={transaction.id}>
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
          })}
      </div>

      <div>Chart</div>

      <div>
        <div>
          <span>ENTRADA</span>
          <strong>R$ {groupedFinancesSummary.incomes}</strong>
        </div>

        <div>
          <span>SAÍDA</span>
          <strong>- R$ {groupedFinancesSummary.outcomes}</strong>
        </div>
      </div>
    </div>
  );
};
