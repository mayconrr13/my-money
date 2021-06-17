import axios from 'axios';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionProps {
  id: string;
  description: string;
  value: number;
  type: string;
  category: string;
  createdAt: number;
}

interface FinancesProps {
  incomes: number;
  outcomes: number;
  balance: number;
}

interface TransactionContextData {
  transactions: TransactionProps[];
  setTransactions: (transactions: TransactionProps[]) => void;
  groupedTransactionsByDate: TransactionProps[];
  setGroupTransactionsByDate: (transactions: TransactionProps[]) => void;
  financesSummary: FinancesProps;
  groupedFinancesSummary: FinancesProps;
  handleTransactionsGroupedByDateRange: (ranger: number) => void;
}

const TransactionContext = createContext({} as TransactionContextData);

export const TransactionProvider = ({
  children,
}: TransactionProviderProps): JSX.Element => {
  const [transactions, setTransactions] = useState<TransactionProps[]>(
    [] as TransactionProps[]
  );
  const [groupedTransactionsByDate, setGroupTransactionsByDate] =
    useState<TransactionProps[]>(transactions);

  const financesSummary = useMemo(() => {
    const summary = transactions.reduce(
      (acc, init) => {
        if (init.type === 'income') {
          acc.incomes += init.value;
          acc.balance += init.value;
        } else {
          acc.outcomes += init.value;
          acc.balance -= init.value;
        }

        return acc;
      },
      {
        incomes: 0,
        outcomes: 0,
        balance: 0,
      } as FinancesProps
    );

    return summary;
  }, [transactions]);

  const groupedFinancesSummary = useMemo(() => {
    const summary = groupedTransactionsByDate.reduce(
      (acc, init) => {
        if (init.type === 'income') {
          acc.incomes += init.value;
        } else {
          acc.outcomes += init.value;
        }

        return acc;
      },
      {
        incomes: 0,
        outcomes: 0,
      } as FinancesProps
    );

    return summary;
  }, [groupedTransactionsByDate]);

  const handleTransactionsGroupedByDateRange = useCallback(
    (range: number): void => {
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

  useEffect(() => {
    const getTransactions = async (): Promise<void> => {
      const response = await axios.get<TransactionProps[]>('/api/transactions');

      setTransactions([...response.data]);
      setGroupTransactionsByDate([...response.data]);
    };

    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        groupedTransactionsByDate,
        setGroupTransactionsByDate,
        financesSummary,
        groupedFinancesSummary,
        handleTransactionsGroupedByDateRange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = (): TransactionContextData => {
  return useContext(TransactionContext);
};
