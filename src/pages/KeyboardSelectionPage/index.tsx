import { Col, Row } from 'antd'
import { ContentCard } from '../../components/ContentCard'
import { useNavigate } from 'react-router-dom'

export const KeyboardSelectionPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24 }}>
      <Row justify={'center'} gutter={[24, 24]}>
        <Col sm={12} xs={24}>
          <ContentCard title="Hiragana" onClick={() => navigate('/keyboard/hiragana')}>
            <p>Type in romaji and get the text back in Hiragana</p>
          </ContentCard>
        </Col>
        <Col sm={12} xs={24}>
          <ContentCard title="Katakana" onClick={() => navigate('/keyboard/katakana')}>
            <p>Type in romaji and get the text back in Katakana</p>
          </ContentCard>
        </Col>
      </Row>
    </div>
  )
}
