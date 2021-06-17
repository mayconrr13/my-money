/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';

import firebase from '../../services/firebaseAdmin';
import { sortTransactionsByDate } from '../../utils/transactionsOperations';

interface TransactionProps {
  id: string;
  description: string;
  value: number;
  type: string;
  category: string;
  createdAt: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = firebase.firestore();

  if (req.method === 'GET') {
    const transactions = await db
      .collection('transactions')
      .get()
      .then(transaction => transaction.docs.map(doc => doc.data()));

    const sortedTransactionsByDate = sortTransactionsByDate(
      transactions as TransactionProps[]
    );

    return res.status(200).json(sortedTransactionsByDate);
  }
  if (req.method === 'POST') {
    const newTransaction = req.body;

    try {
      await db.collection('transactions').add(newTransaction);

      return res.status(200).end('Transação adicionada com sucesso!');
    } catch (error) {
      return res.status(405).end('Method not allowed');
    }
  } else {
    return res.status(405).end('Method not allowed');
  }
};
