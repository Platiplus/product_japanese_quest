import { Empty, Button, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'

type HideWhenEmptyProps = {
  children: JSX.Element
  condition: boolean
  showEmpty?: boolean
}

export const HideWhenEmpty = ({ children, condition, showEmpty }: HideWhenEmptyProps) => {
  const navigate = useNavigate()

  if (condition) {
    return children
  }

  if (showEmpty) {
    return (
      <Row justify={'center'}>
        <Col span={24}>
          <Empty description={<span>Congratulations, you got every symbol right!</span>} />
          <Button
            style={{ marginTop: 24, width: '100%', backgroundColor: '#222831', color: 'white' }}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </Col>
      </Row>
    )
  }

  return <></>
}
