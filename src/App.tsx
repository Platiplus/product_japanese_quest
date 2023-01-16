import React from 'react'
import { Card, Layout, Menu } from 'antd'
import { SymbolsCard } from './components/SymbolCard/SymbolsCard'
const { Header, Content } = Layout

const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Menu theme={'dark'} mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item title={'Hiragana'} key={'1'} className={'menu-platy'}>
            Hiragana
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '16px 50px' }}>
        <div className="site-layout-content" style={{ background: '#f5f5f5' }}>
          <Card>
            <SymbolsCard />
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default App
