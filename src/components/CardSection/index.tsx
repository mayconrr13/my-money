import { useTransaction } from '../../hooks/useTransaction';

import { Container } from './styles';

export const CardSection = (): JSX.Element => {
  const { financesSummary } = useTransaction();
  return (
    <Container>
      <section>
        <h2>ENTRADA</h2>
        <strong>R$ {financesSummary.incomes.toFixed(2)}</strong>
        <img src="/icons/arrow.svg" alt="Entrada" />
      </section>

      <section>
        <h2>SAíDA</h2>
        <strong>- R$ {financesSummary.outcomes.toFixed(2)}</strong>
        <img src="/icons/arrow.svg" alt="Saída" />
      </section>

      <section>
        <h2>SALDO</h2>
        <strong>R$ {financesSummary.balance.toFixed(2)}</strong>
        <img src="/icons/money.svg" alt="Saldo" />
      </section>
    </Container>
  );
};
