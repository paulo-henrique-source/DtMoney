import { useState } from 'react'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import Modal from 'react-modal'

import { TransactionsProvicer } from './hooks/useTransactions'
import { GlobalStyle } from './styles/global'
import { NewTransactionModal } from './components/NewTransactionModal'

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModal] = useState(false)

  const onChangeNewTransactionModalVisibility = () => {
    setIsNewTransactionModal(!isNewTransactionModalOpen)
  }

  return (
    <TransactionsProvicer>
      <Header
        onChangeNewTransactionModalVisibility={
          onChangeNewTransactionModalVisibility
        }
      />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={onChangeNewTransactionModalVisibility}
      />

      <GlobalStyle />
    </TransactionsProvicer>
  )
}
