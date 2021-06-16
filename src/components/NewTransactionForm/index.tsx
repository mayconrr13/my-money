import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { useTransaction } from '../../hooks/useTransaction';

import { Header, Form } from './styles';

interface NewTransactionFormData {
  description: string;
  value: number;
  type: string;
  category: string;
}

interface FormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionForm = ({
  isOpen,
  onRequestClose,
}: FormModalProps): JSX.Element => {
  const { transactions, setTransactions, setGroupTransactionsByDate } =
    useTransaction();

  const [selectedTransactionType, setSelectedTransactionType] = useState<
    'income' | 'outcome'
  >('income');

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

        await axios.post(
          'http://localhost:3000/api/transactions',
          newTransaction
        );

        setTransactions([newTransaction, ...transactions]);
        setGroupTransactionsByDate([newTransaction, ...transactions]);

        reset({
          description: '',
          value: 0,
          type: 'income',
          category: 'default',
        });

        onRequestClose();
        return;
      } catch {
        console.log('Não foi possível adicionar a nova transação');
      }
    },
    [
      onRequestClose,
      reset,
      setGroupTransactionsByDate,
      setTransactions,
      transactions,
    ]
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Header>
        <strong>Nova transação</strong>
        <button
          type="button"
          onClick={() => {
            onRequestClose();
            reset({
              description: '',
              value: undefined,
              type: 'income',
              category: 'default',
            });
          }}
        >
          +
        </button>
      </Header>

      <Form
        onSubmit={handleSubmit(handleFormSubmit)}
        selectedTransactionType={selectedTransactionType}
      >
        {errors?.value && 'Por favor, insira uma descrição'}
        <input
          type="text"
          placeholder="Descrição"
          {...register('description', { required: true })}
        />

        {errors?.value && 'Por favor, insira um valor válido'}
        <input
          type="number"
          placeholder="Valor"
          {...register('value', { required: true })}
        />

        {errors?.value && 'Selecione um tipo de transação'}
        <fieldset>
          <button
            type="button"
            onClick={() => setSelectedTransactionType('income')}
          >
            Entrada
            <input
              onClick={() => setSelectedTransactionType('income')}
              type="radio"
              id="income"
              value="income"
              {...register('type', { required: true })}
            />
            <img src="/icons/arrow-form.svg" alt="Entrada" />
          </button>

          <button
            type="button"
            onClick={() => setSelectedTransactionType('outcome')}
          >
            Saída
            <input
              type="radio"
              id="outcome"
              value="outcome"
              {...register('type', { required: true })}
            />
            <img src="/icons/arrow-form.svg" alt="Saída" />
          </button>
        </fieldset>

        {errors?.value && 'Selecione uma categoria'}
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

        <button type="submit">Adicionar transação</button>
      </Form>
    </Modal>
  );
};
