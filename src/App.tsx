import React, { useState } from 'react'
import { Card, Layout, Menu } from 'antd'
import { SymbolsCard } from './components/SymbolCard/SymbolsCard'
import { CheatSheet } from './components/CheatSheet/CheatSheet'
import { Keyboard } from './components/Keyboard/Keyboard'

const { Header, Content } = Layout

const App: React.FC = () => {
  const [tabOpen, setTabOpen] = useState('1')

  const renderTab = () => {
    if (tabOpen === '1') {
      return <SymbolsCard />
    }

    if (tabOpen === '2') {
      return <CheatSheet />
    }

    if (tabOpen === '3') {
      return <Keyboard />
    }
  }

  return (
    <Layout>
      <Header>
        <Menu theme={'dark'} mode="horizontal" defaultSelectedKeys={[tabOpen]}>
          <Menu.Item title={'Quiz'} key={'1'} onClick={() => setTabOpen('1')}>
            Quiz
          </Menu.Item>
          <Menu.Item title={'CheatSheet'} key={'2'} onClick={() => setTabOpen('2')}>
            Glossário
          </Menu.Item>
          <Menu.Item title={'Teclado'} key={'3'} onClick={() => setTabOpen('3')}>
            Teclado
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '48px 48px' }}>
        <div className="site-layout-content" style={{ background: '#f5f5f5' }}>
          <Card>{renderTab()}</Card>
        </div>
      </Content>
    </Layout>
  )
}

export default App
