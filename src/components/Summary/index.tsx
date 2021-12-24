import { useTransactions } from '../../hooks/useTransactions'

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

import { Container } from './styles'

export const Summary = () => {
  const { transactions } = useTransactions()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.value
        acc.total += transaction.value
      } else if (transaction.type === 'withdraw') {
        acc.withdraws += transaction.value
        acc.withdraws -= transaction.value
      }

      return acc
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  )

  const currencyNumberFormat = (value: number) => {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <>
      <Container>
        <div>
          <header>
            <p>Entradas</p>
            <img src={incomeImg} alt="Entradas"></img>
          </header>
          <strong>{currencyNumberFormat(summary.deposits)}</strong>
        </div>

        <div>
          <header>
            <p>Saídas</p>
            <img src={outcomeImg} alt="Saídas"></img>
          </header>
          <strong>
            {summary.withdraws > 0
              ? `- ${currencyNumberFormat(summary.withdraws)}}`
              : currencyNumberFormat(summary.withdraws)}
          </strong>
        </div>

        <div className="highlight-background">
          <header>
            <p>Total</p>
            <img src={totalImg} alt="Total"></img>
          </header>
          <strong>{currencyNumberFormat(summary.total)}</strong>
        </div>
      </Container>
    </>
  )
}
