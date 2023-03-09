import { Col, Row } from 'antd'
import { ContentCard } from '../../components/ContentCard'
import { useNavigate } from 'react-router-dom'

export const QuizSelectionPage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24 }}>
      <Row justify={'center'} gutter={[24, 24]}>
        <Col sm={12} xs={24}>
          <ContentCard title="Hiragana" onClick={() => navigate('/quiz/hiragana')}>
            <p>Test your memory agains our Hiragana quiz! (Contains symbols and variants)</p>
          </ContentCard>
        </Col>
        <Col sm={12} xs={24}>
          <ContentCard title="Katakana" onClick={() => navigate('/quiz/katakana')}>
            <p>Test your memory agains our Katakana quiz! (Contains symbols and variants)</p>
          </ContentCard>
        </Col>
      </Row>
    </div>
  )
}
