import { useState } from 'react';
import { useTransaction } from '../../hooks/useTransaction';

import { Container, ButtonsGroup, Summary } from './styles';

export const Statistcs = (): JSX.Element => {
  const {
    handleTransactionsGroupedByDateRange,
    groupedTransactionsByDate,
    groupedFinancesSummary,
  } = useTransaction();

  const [selectedRange, setSelectedRange] = useState<number>(1);

  return (
    <Container>
      <ButtonsGroup selectedRange={selectedRange}>
        <button
          type="button"
          onClick={() => {
            handleTransactionsGroupedByDateRange(0);
            setSelectedRange(1);
          }}
        >
          TOTAL
        </button>
        <button
          type="button"
          onClick={() => {
            handleTransactionsGroupedByDateRange(1);
            setSelectedRange(2);
          }}
        >
          HOJE
        </button>
        <button
          type="button"
          onClick={() => {
            handleTransactionsGroupedByDateRange(7);
            setSelectedRange(3);
          }}
        >
          SEMANAL
        </button>
        <button
          type="button"
          onClick={() => {
            handleTransactionsGroupedByDateRange(30);
            setSelectedRange(4);
          }}
        >
          MENSAL
        </button>
        <button
          type="button"
          onClick={() => {
            handleTransactionsGroupedByDateRange(365);
            setSelectedRange(5);
          }}
        >
          ANUAL
        </button>
      </ButtonsGroup>

      <span />

      <Summary>
        <div>
          <span>ENTRADA</span>
          <strong>R$ {groupedFinancesSummary.incomes.toFixed(2)}</strong>
        </div>

        <div>
          <span>SAÍDA</span>
          <strong>- R$ {groupedFinancesSummary.outcomes.toFixed(2)}</strong>
        </div>
      </Summary>
    </Container>
  );
};
