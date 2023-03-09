import { Col, Row } from 'antd'
import { ContentCard } from '../../components/ContentCard'
import { useNavigate } from 'react-router-dom'

export const GlossarySelectionPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24 }}>
      <Row justify={'center'} gutter={[24, 24]}>
        <Col sm={12} xs={24}>
          <ContentCard title="Hiragana" onClick={() => navigate('/glossary/hiragana')}>
            <p>Take a look at the Hiragana alphabet glossary</p>
          </ContentCard>
        </Col>
        <Col sm={12} xs={24}>
          <ContentCard title="Katakana" onClick={() => navigate('/glossary/katakana')}>
            <p>Take a look at the Katakana alphabet glossary</p>
          </ContentCard>
        </Col>
      </Row>
    </div>
  )
}
