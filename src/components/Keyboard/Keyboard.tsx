import { Card, Col, Row, Tabs } from 'antd'
import { HiraganaDictionary } from '../../dictionary/hiragana'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { HIRAGANA_KEYBOARD } from '../../utils/regex.util'

const Keyboard = () => {
  const [text, setText] = useState('')

  const onTextAreaInput = ({ target }: any) => {
    let t = target.value
    const hasSymbolEquivalent = HIRAGANA_KEYBOARD.exec(target.value)
    if (hasSymbolEquivalent) {
      t = t.replace(
        hasSymbolEquivalent[0],
        HiraganaDictionary.find((s) => s.romaji == hasSymbolEquivalent[0])?.symbol,
      )
    }
    setText(t)
  }

  const onButtonClick = (symbol: string) => {
    setText(text + symbol)
  }

  const buildHiraganaKeyboard = () => {
    return (
      <>
        <h1>Teclado Hiragana</h1>
        <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
          Alguns caracteres estão faltando (Isto é proposital para controlar o aprendizado, serão
          adicionados em breve)
        </h4>
        <Row justify={'center'} style={{ marginBottom: '24px' }}>
          <Col flex={1}>
            <TextArea
              style={{ height: '180px', fontSize: '3em' }}
              value={text}
              onChange={onTextAreaInput}
            />
          </Col>
        </Row>
        <Row justify={'center'}>
          {HiraganaDictionary.map((symbol) => {
            return (
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '8px',
                  cursor: 'pointer',
                }}
                key={symbol.symbol}
                onClick={() => onButtonClick(symbol.symbol)}
              >
                <Row>
                  <span style={{ fontSize: '2em' }}>{symbol.symbol}</span>
                </Row>
                <Row justify={'center'}>
                  <span>{symbol.romaji}</span>
                </Row>
              </Card>
            )
          })}
        </Row>
      </>
    )
  }

  return (
    <Tabs
      items={[
        {
          label: 'Hiragana',
          key: 'hiragana',
          children: buildHiraganaKeyboard(),
        },
        {
          label: 'Katakana',
          key: 'katakana',
          children: <span>Em breve</span>,
        },
        {
          label: 'Kanji',
          key: 'kanji',
          children: <span>Em breve</span>,
        },
      ]}
    ></Tabs>
  )
}

export { Keyboard }
