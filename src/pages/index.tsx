import { useCallback, useState } from 'react';

import { CardSection } from '../components/CardSection';
import { TransactionItem } from '../components/TransactionItem';
import { NewTransactionForm } from '../components/NewTransactionForm';
import { useTransaction } from '../hooks/useTransaction';
import { Statistcs } from '../components/Statistcs';

import { Container, Content, Button, Header } from '../styles/pages/Home';

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
    <Container>
      <Header>
        <div>
          <button type="button">
            <span>Nova transação</span>
            <div />
          </button>
        </div>
      </Header>

      <Content>
        {/* <NewTransactionForm /> */}

        <CardSection />

        <Button
          type="button"
          onClick={handleVisibleSection}
          visibleSection={visibleSection}
        >
          <strong>TRANSAÇÕES</strong>
          <span />
          <strong>ESTATÍSTICAS</strong>
        </Button>

        {visibleSection === 'statistcs' && <Statistcs />}

        {visibleSection === 'transactions' && (
          <div>
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
      </Content>
    </Container>
  );
}
