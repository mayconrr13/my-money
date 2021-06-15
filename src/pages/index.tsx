import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface TransactionProps {
  id: string;
  description: string;
  value: number;
  type: string;
  category: string;
  createdAt: number;
}

interface NewTransactionFormData {
  description: string;
  value: number;
  type: string;
  category: string;
}

export default function Home(): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionProps[]>(
    [] as TransactionProps[]
  );
  const [groupedTransactionsByDate, setGroupTransactionsByDate] =
    useState<TransactionProps[]>(transactions);

  const incomes = useMemo((): number => {
    const totalIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((accumulator, current) => accumulator + current.value, 0);

    return Number(totalIncome.toFixed(2));
  }, [transactions]);

  const outcomes = useMemo((): number => {
    const totalOutcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((accumulator, current) => accumulator + current.value, 0);

    return Number(totalOutcome.toFixed(2));
  }, [transactions]);

  const balance = useMemo(() => {
    return Number((incomes - outcomes).toFixed(2));
  }, [incomes, outcomes]);

  useEffect(() => {
    const getTransactions = async (): Promise<void> => {
      const response = await axios.get('http://localhost:3333/transactions');

      setTransactions([...response.data]);
      setGroupTransactionsByDate([...response.data]);
    };

    getTransactions();
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTransactionFormData>({
    defaultValues: {
      description: '',
      value: 0,
      type: 'income',
      category: 'default',
    },
  });

  const handleAddNewTransaction = useCallback(
    async (data: NewTransactionFormData) => {
      const { description, value, type, category } = data;

      try {
        const newTransaction = {
          id: uuidv4(),
          description,
          value: Number(value),
          type,
          category,
          createdAt: Date.now(),
        };

        await axios.post('http://localhost:3333/transactions', newTransaction);

        setTransactions([...transactions, newTransaction]);
        reset({
          description: '',
          value: 0,
          type: 'income',
          category: 'default',
        });
        return;
      } catch {
        console.log('Não foi possível adicionar a nova transação');
      }
    },
    [reset, transactions]
  );

  const handleTransactionsGroupedByDateRange = useCallback(
    (range = 0) => {
      if (range === 0) {
        setGroupTransactionsByDate(transactions);
        return;
      }

      const groupedTransactions = transactions.filter(
        transaction => transaction.createdAt >= Date.now() - range * 86400000
      );

      setGroupTransactionsByDate(groupedTransactions);
    },
    [transactions]
  );

  return (
    <>
      <header>
        <div>
          <button type="button">Nova transação</button>
        </div>
      </header>

      <main>
        <form onSubmit={handleSubmit(handleAddNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description', { required: true })}
          />
          {errors?.value && 'Por favor, insira uma descrição'}

          <input
            type="number"
            placeholder="Valor"
            {...register('value', { required: true })}
          />
          {errors?.value && 'Por favor, insira um valor válido'}

          <fieldset>
            <label htmlFor="income">Entrada</label>
            <input
              type="radio"
              id="income"
              value="income"
              {...register('type', { required: true })}
            />

            <label htmlFor="income">Saída</label>
            <input
              type="radio"
              id="outcome"
              value="outcome"
              {...register('type', { required: true })}
            />
            {errors?.value && 'Selecione um tipo'}
          </fieldset>

          <select
            id="category"
            defaultValue="default"
            {...register('category', { required: true })}
          >
            <option value="default" disabled>
              Selecione uma categoria
            </option>
            <option value="health">Saúde</option>
            <option value="food">Alimentação</option>
            <option value="fitness">Atividades Físicas</option>
            <option value="work">Trabalho</option>
          </select>
          {errors?.value && 'Selecione uma categoria'}

          <button type="submit">Adicionar transação</button>
        </form>

        <div>
          <section>
            <h2>ENTRADA</h2>
            <strong>R$ {incomes}</strong>
          </section>

          <section>
            <h2>SAIDA</h2>
            <strong>- R$ {outcomes}</strong>
          </section>

          <section>
            <h2>SALDO</h2>
            <strong>R$ {balance}</strong>
          </section>
        </div>

        <button type="button">
          <strong>TRANSAÇÕES</strong>
          <span />
          <strong>SALDO</strong>
        </button>

        {/* balance section */}
        <div>
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
              <strong>R$ 1253,48</strong>
            </div>

            <div>
              <span>SAÍDA</span>
              <strong>R$ 1253,48</strong>
            </div>
          </div>
        </div>

        {/* transactions section */}
        <div>
          <span>Transações</span>
          {transactions &&
            transactions.map(transaction => {
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
      </main>
    </>
  );
}
