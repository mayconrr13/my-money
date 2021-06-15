import { useTransaction } from '../../hooks/useTransaction';

export const CardSection = (): JSX.Element => {
  const { financesSummary } = useTransaction();
  return (
    <div>
      <section>
        <h2>ENTRADA</h2>
        <strong>R$ {financesSummary.incomes}</strong>
      </section>

      <section>
        <h2>SAIDA</h2>
        <strong>- R$ {financesSummary.outcomes}</strong>
      </section>

      <section>
        <h2>SALDO</h2>
        <strong>R$ {financesSummary.balance}</strong>
      </section>
    </div>
  );
};
