import { useTransactions } from '../../hooks/useTransactions'

import { Container } from './styles'

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
  return (
    <>
      <Container>
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction: ITransactionProps) => {
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
