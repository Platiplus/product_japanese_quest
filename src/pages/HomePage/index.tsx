import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ContentCard } from '../../components/ContentCard'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 24 }}>
      <Row justify={'center'} gutter={[24, 24]}>
        <Col sm={12} xs={24}>
          <ContentCard title="Quiz" onClick={() => navigate('/quiz')}>
            <p>
              Test your knowledge of the alphabet on simple games where we will show you the
              alphabet symbol and you will have to type the romaji equivalent of it to progress!
            </p>
          </ContentCard>
        </Col>
        <Col sm={12} xs={24}>
          <ContentCard title="Keyboard" onClick={() => navigate('/keyboard')}>
            <p>
              On a computer, if you don&apos;t have a Japanese keyboard, it&apos;s really hard to
              type the Japanese symbols. Use our keyboards to type romaji characters and get
              immediate translation to Hiragana/Katakana symbols.
            </p>
          </ContentCard>
        </Col>
        <Col sm={12} xs={24}>
          <ContentCard title="Glossary" onClick={() => navigate('/glossary')}>
            <p>Check up the Japanese alphabet symbols and their equivalents on romaji.</p>
          </ContentCard>
        </Col>
      </Row>
    </div>
  )
}
