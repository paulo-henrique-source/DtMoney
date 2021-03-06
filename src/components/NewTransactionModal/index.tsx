import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions'
import { FormEvent, useState } from 'react'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

interface INewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: INewTransactionModalProps) => {
  const { createTransaction } = useTransactions()
  const [title, setTitle] = useState('')
  const [value, setValue] = useState<number>(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault()

    await createTransaction({
      title,
      category,
      type,
      value,
    })
    closeModalIfSuceeded()
  }

  const closeModalIfSuceeded = () => {
    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')
    onRequestClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar informação</h2>
          <input
            placeholder="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            onChange={(event) => setValue(Number(event.target.value))}
          />
          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => {
                setType('deposit')
              }}
              isActive={type === 'deposit'}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>
            <RadioBox
              type="button"
              onClick={() => {
                setType('withdraw')
              }}
              isActive={type === 'withdraw'}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>
          <input
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    </>
  )
}
