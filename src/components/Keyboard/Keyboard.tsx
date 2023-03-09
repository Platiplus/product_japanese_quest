import { useState } from 'react'
import { Card, Col, Row } from 'antd'
import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import TextArea from 'antd/es/input/TextArea'

type KeyboardRegex = {
  smallKana: RegExp
  nVariant: RegExp
  punctuation: RegExp
  symbols: RegExp
}

type KeyboardDictionary = {
  smallKana: JapaneseSymbol[]
  nVariant: JapaneseSymbol[]
  punctuation: JapaneseSymbol[]
  symbols: JapaneseSymbol[]
}

export type KeyboardProps = {
  regexes: KeyboardRegex
  dictionaries: KeyboardDictionary
  alphabet: string
  smallKanaExamples: string
}

export const Keyboard = ({ regexes, dictionaries, alphabet, smallKanaExamples }: KeyboardProps) => {
  const [text, setText] = useState('')

  const replaceSymbols = (dict: JapaneseSymbol[], romaji: string, text: string) => {
    return text.replace(romaji, String(dict.find((s) => s.romaji == romaji.toLowerCase())?.symbol))
  }

  const onTextAreaInput = ({ target }: any) => {
    let t = target.value
    const hasSmallEquivalent = regexes.smallKana.exec(target.value)
    const hasSymbolEquivalent = regexes.symbols.exec(target.value)
    const hasNVariantEquivalent = regexes.nVariant.exec(target.value)
    const hasPunctuationEqv = regexes.punctuation.exec(target.value)

    if (hasNVariantEquivalent)
      t = replaceSymbols(dictionaries.nVariant, hasNVariantEquivalent[0], t)
    if (hasSmallEquivalent) t = replaceSymbols(dictionaries.smallKana, hasSmallEquivalent[0], t)
    if (hasPunctuationEqv) t = replaceSymbols(dictionaries.punctuation, hasPunctuationEqv[0], t)
    if (hasSymbolEquivalent) t = replaceSymbols(dictionaries.symbols, hasSymbolEquivalent[0], t)

    setText(t)
  }

  const onButtonClick = (symbol: string) => {
    setText(text + symbol)
  }

  return (
    <>
      <h1>{alphabet} Keyboard</h1>
      <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
        Type the romaji equivalent of the {alphabet} symbols and it will be replaced by the correct
        symbol.
      </h4>
      <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
        Type the &quot;=&quot; sign before the romaji to type a small kana. Eg: {smallKanaExamples}
      </h4>
      <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
        To type quotes please add a space after the quote for a opening one, and a space before the
        quote for a closing one.
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
        {dictionaries.symbols.map((symbol) => {
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
