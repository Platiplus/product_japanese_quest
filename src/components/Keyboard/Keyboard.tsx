import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'

import { Card, Col, Row, Tabs } from 'antd'
import {
  HiraganaDictionary,
  HSmallKanaDictionary,
  NVariantsDictionary,
} from '../../dictionary/hiragana'
import {
  H_SMALL_KANA_KEYBOARD,
  HIRAGANA_KEYBOARD,
  N_VARIANT_KEYBOARD,
} from '../../utils/regex.util'
import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'

const Keyboard = () => {
  const [text, setText] = useState('')

  const replaceSymbols = (dict: JapaneseSymbol[], romaji: string, text: string) => {
    return text.replace(romaji, String(dict.find((s) => s.romaji == romaji.toLowerCase())?.symbol))
  }

  const onTextAreaInput = ({ target }: any) => {
    let t = target.value
    const hasSmallEquivalent = H_SMALL_KANA_KEYBOARD.exec(target.value)
    const hasSymbolEquivalent = HIRAGANA_KEYBOARD.exec(target.value)
    const hasNVariantEquivalent = N_VARIANT_KEYBOARD.exec(target.value)

    if (hasNVariantEquivalent) t = replaceSymbols(NVariantsDictionary, hasNVariantEquivalent[0], t)
    if (hasSmallEquivalent) t = replaceSymbols(HSmallKanaDictionary, hasSmallEquivalent[0], t)
    if (hasSymbolEquivalent) t = replaceSymbols(HiraganaDictionary, hasSymbolEquivalent[0], t)

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
          Digite o representante em romaji dos símbolos do Hiragana e ele será substitúido pelo
          símbolo correto.
        </h4>
        <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
          Digite o sinal de &quot;=&quot; antes, para os pequenos kana. Exemplo: =tsu =ya =yo | っ
          ゃ ょ
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
        <Row justify={'center'}>
          {['ー', 'ゝ', 'ゞ', '、', '。'].map((symbol) => {
            return (
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '8px',
                  cursor: 'pointer',
                }}
                key={`${symbol}-1`}
                onClick={() => onButtonClick(symbol)}
              >
                <Row>
                  <span style={{ fontSize: '2em' }}>{symbol}</span>
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
