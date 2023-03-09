import { Col, Row } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'

type GlossaryProps = {
  dictionary: JapaneseSymbol[]
}

export const Glossary = ({ dictionary }: GlossaryProps) => {
  return (
    <Row gutter={[64, 64]}>
      {dictionary.map((symbol) => {
        return (
          <Col
            style={{ display: 'flex', justifyContent: 'center' }}
            xs={24}
            sm={12}
            md={6}
            key={symbol.symbol}
          >
            <span style={{ fontSize: '3em', marginRight: '24px' }}>{symbol.symbol}</span>
            <SwapOutlined style={{ fontSize: '2em', color: 'red' }} />
            <span style={{ fontSize: '3em', marginLeft: '24px' }}>{symbol.romaji}</span>
          </Col>
        )
      })}
    </Row>
  )
}
