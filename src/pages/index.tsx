import { useCallback, useState } from 'react';

import { CardSection } from '../components/CardSection';
import { TransactionItem } from '../components/TransactionItem';
import { NewTransactionForm } from '../components/NewTransactionForm';
import { useTransaction } from '../hooks/useTransaction';
import { Statistcs } from '../components/Statistcs';

export default function Home(): JSX.Element {
  const { transactions } = useTransaction();

  const [visibleSection, setVisibleSection] = useState<
    'statistcs' | 'transactions'
  >('transactions');

  const handleVisibleSection = useCallback(() => {
    if (visibleSection === 'statistcs') {
      setVisibleSection('transactions');
    } else {
      setVisibleSection('statistcs');
    }
  }, [visibleSection]);

  return (
    <>
      <header>
        <div>
          <button type="button">Nova transação</button>
        </div>
      </header>

      <main>
        <NewTransactionForm />

        <CardSection />

        <button type="button" onClick={handleVisibleSection}>
          <strong>TRANSAÇÕES</strong>
          <span />
          <strong>ESTATÍSTICAS</strong>
        </button>

        {visibleSection === 'statistcs' && <Statistcs />}

        {visibleSection === 'transactions' && (
          <div>
            <span>Transações</span>
            {transactions &&
              transactions.map(transaction => {
                return (
                  <TransactionItem
                    transaction={transaction}
                    key={transaction.id}
                  />
                );
              })}
          </div>
        )}
      </main>
    </>
  );
}
