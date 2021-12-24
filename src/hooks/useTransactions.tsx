import { useState, useEffect, ReactNode, useContext } from 'react'
import { createContext } from 'react'
import { api } from '../services/api'

interface ITransactionProps {
  id: number
  title: string
  value: number
  category: string
  type: string
  date: number
}

interface ITransactionsProviderProps {
  children: ReactNode
}

type TransactionForm = Omit<ITransactionProps, 'id' | 'date'>

interface ITransactionsContextData {
  transactions: ITransactionProps[]
  createTransaction: (transaction: TransactionForm) => Promise<void>
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
)

export const TransactionsProvicer = ({
  children,
}: ITransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransactionProps[]>([])

  useEffect(() => {
    api.get('/transactions').then((response) => setTransactions(response.data))
  }, [])

  const createTransaction = async (transaction: TransactionForm) => {
    await api
      .post('/transactions', {
        ...transaction,
        date: new Date().getTime() / 1000,
      })
      .then((response) => setTransactions([...transactions, response.data]))
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  return context
}
