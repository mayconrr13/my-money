import { useCallback, useState } from 'react';

import { CardSection } from '../components/CardSection';
import { TransactionsList } from '../components/TransactionsList';
import { NewTransactionForm } from '../components/NewTransactionForm';
import { Statistics } from '../components/Statistcs';

import {
  Container,
  Content,
  Button,
  Header,
  AdditionalDetailsSection,
} from '../styles/pages/Home';

export default function Home(): JSX.Element {
  const [formModalIsOpen, setFormModalIsOpen] = useState<boolean>(false);
  const [visibleSection, setVisibleSection] = useState<
    'statistics' | 'transactions'
  >('transactions');

  const handleVisibleSection = useCallback(() => {
    if (visibleSection === 'statistics') {
      setVisibleSection('transactions');
    } else {
      setVisibleSection('statistics');
    }
  }, [visibleSection]);

  const handleOpenModal = useCallback(() => {
    setFormModalIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setFormModalIsOpen(false);
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <button type="button" onClick={handleOpenModal}>
            <span>Nova transação</span>
            <div />
          </button>
        </div>
      </Header>

      <Content>
        <NewTransactionForm
          isOpen={formModalIsOpen}
          onRequestClose={handleCloseModal}
        />

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

        <AdditionalDetailsSection>
          <TransactionsList visibleSection={visibleSection} />

          <Statistics visibleSection={visibleSection} />
        </AdditionalDetailsSection>
      </Content>
    </Container>
  );
}
