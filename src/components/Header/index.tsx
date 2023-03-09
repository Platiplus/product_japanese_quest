import { useState } from 'react'
import { Button, Card, Col, Drawer, Layout, Row } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import Logo from '../../assets/horizontal_logo.png'
const { Header: H, Content } = Layout

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Quizes', path: '/quiz' },
  { label: 'Keyboards', path: '/keyboard' },
  { label: 'Glossaries', path: '/glossary' },
]

export const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Layout>
        <H
          style={{
            top: 0,
            height: 65,
            zIndex: 1,
            width: '100%',
            backgroundColor: '#f5f5f5',
            paddingTop: 16,
          }}
        >
          <Row justify={'center'} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Col style={{ marginRight: 24 }}>
              <img src={Logo} height={72} />
            </Col>
          </Row>
        </H>
      </Layout>
      <Content style={{ padding: '64px 30px' }}>
        <Row justify={'start'} align={'middle'} style={{ padding: 24 }}>
          <Button
            style={{ backgroundColor: '#222831', color: 'white' }}
            type="primary"
            onClick={() => setOpen(true)}
          >
            {open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} Menu
          </Button>
          <Drawer title="Menu" placement="right" onClose={() => setOpen(false)} open={open}>
            {navigationItems.map((item) => (
              <Card
                hoverable
                bordered={false}
                type={'inner'}
                key={item.label}
                onClick={() => {
                  navigate(item.path)
                  setOpen(false)
                }}
                style={{
                  cursor: 'pointer',
                  marginBottom: 8,
                  backgroundColor: '#222831',
                  color: 'white',
                }}
              >
                {item.label}
              </Card>
            ))}
          </Drawer>
        </Row>
        <Outlet />
      </Content>
    </>
  )
}
