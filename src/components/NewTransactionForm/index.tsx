import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTransaction } from '../../hooks/useTransaction';

interface NewTransactionFormData {
  description: string;
  value: number;
  type: string;
  category: string;
}

export const NewTransactionForm = (): JSX.Element => {
  const { transactions, setTransactions, setGroupTransactionsByDate } =
    useTransaction();

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

  const handleFormSubmit = useCallback(
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
        setGroupTransactionsByDate([...transactions, newTransaction]);
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
    [reset, setGroupTransactionsByDate, setTransactions, transactions]
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
  );
};
