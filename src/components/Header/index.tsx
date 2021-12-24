import { useState } from 'react'
import LogoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface IHeaderProps {
  onChangeNewTransactionModalVisibility: () => void
}

export const Header = ({
  onChangeNewTransactionModalVisibility,
}: IHeaderProps) => {
  return (
    <>
      <Container>
        <Content>
          <img src={LogoImg} alt="Logo"></img>
          <button type="button" onClick={onChangeNewTransactionModalVisibility}>
            Nova transação
          </button>
        </Content>
      </Container>
    </>
  )
}
