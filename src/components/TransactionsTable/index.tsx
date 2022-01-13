import { useTransactions } from '../../hooks/useTransactions'

import { Container, ActionsContainer } from './styles'

import { api } from '../../services/api'

import { FiTrash2 } from 'react-icons/fi'
import { useEffect, useState } from 'react'

interface ITransactionProps {
  id: number
  title: string
  value: number
  category: string
  date: number
  type: string
}

export const TransactionsTable = () => {
  const { transactions } = useTransactions()
  const [newTransactions, setNewTransactions] = useState(transactions)

  const handleDelete = async (id: number) => {
    var answer = window.confirm('Deseja realmente deletar essa transação ?')
    if (answer) {
      await api.delete(`/transactions/${id}`).then((response) => {
        const data: any = transactions.filter(
          (transaction) => transaction.id !== response.data.id
        )
        setNewTransactions(data)
      })
    } else {
      return
    }
  }

  useEffect(() => {
    setNewTransactions(transactions)
  }, [transactions])

  return (
    <>
      <Container>
        {newTransactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {newTransactions.map((transaction: ITransactionProps) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.title}</td>
                    <td
                      className={
                        transaction.type === 'deposit' ? 'deposit' : 'withdraw'
                      }
                    >
                      {transaction.type === 'withdraw' && '-'}
                      {new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(transaction.value)}
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {new Intl.DateTimeFormat('pt-br').format(
                        new Date(transaction.date * 1000)
                      )}
                    </td>
                    <td>
                      <ActionsContainer>
                        <FiTrash2
                          color="red"
                          fontSize="1.5rem"
                          onClick={() => handleDelete(transaction.id)}
                        />
                      </ActionsContainer>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <span>Nenhuma transação cadastrada</span>
          </div>
        )}
      </Container>
    </>
  )
}
