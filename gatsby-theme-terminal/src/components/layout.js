import React from "react"
import { styled } from '@linaria/react'
import { useColors } from '../styles/variable'
import CssBaseline from "../styles/base"
import Header from "./header"

const Layout = ({ children, classname }) => {
  const menu = [
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Tags',
      href: '/tags'
    }
  ]

  const [ color ] = useColors()

  return (
    <Wrap className={classname}>
      <CssBaseline />
      <Header siteTitle='Terminal' menu={menu} color={color} />
      <Main>{children}</Main>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 784px;
  padding: 40px;
  border-right: 1px solid hsla(0,0%,100%,.1);
`

const Main = styled.main``

export default Layout
