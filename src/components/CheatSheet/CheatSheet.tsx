import { Col, Row, Tabs } from 'antd'
import { HiraganaDictionary } from '../../dictionary/hiragana'
import { SwapOutlined } from '@ant-design/icons'
import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import { KatakanaDictionary } from '../../dictionary/katakana'

const CheatSheet = () => {
  const buildDictionary = (dictionary: JapaneseSymbol[]) => {
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
  return (
    <Tabs
      items={[
        {
          label: 'Hiragana',
          key: 'hiragana',
          children: buildDictionary(HiraganaDictionary),
        },
        {
          label: 'Katakana',
          key: 'katakana',
          children: buildDictionary(KatakanaDictionary),
        },
      ]}
    />
  )
}

export { CheatSheet }
