import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'

import { Card, Col, Row, Tabs } from 'antd'
import {
  HiraganaDictionary,
  HSmallKanaDictionary,
  HNVariantsDictionary,
  HPunctuationDictionary,
} from '../../dictionary/hiragana'
import {
  KatakanaDictionary,
  KSmallKanaDictionary,
  KNVariantsDictionary,
  KPunctuationDictionary,
} from '../../dictionary/katakana'
import {
  H_SMALL_KANA_KEYBOARD,
  HIRAGANA_KEYBOARD,
  HIRAGANA_PUNCTUATION,
  H_N_VARIANT_KEYBOARD,
  K_SMALL_KANA_KEYBOARD,
  KATAKANA_KEYBOARD,
  KATAKANA_PUNCTUATION,
  K_N_VARIANT_KEYBOARD,
} from '../../utils/regex.util'
import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'

const Keyboard = () => {
  const [hiraganaText, setHiraganaText] = useState('')
  const [katakanaText, setKatakanaText] = useState('')

  const replaceSymbols = (dict: JapaneseSymbol[], romaji: string, text: string) => {
    return text.replace(romaji, String(dict.find((s) => s.romaji == romaji.toLowerCase())?.symbol))
  }

  const onHiraganaTextAreaInput = ({ target }: any) => {
    let t = target.value
    const hasSmallEquivalent = H_SMALL_KANA_KEYBOARD.exec(target.value)
    const hasSymbolEquivalent = HIRAGANA_KEYBOARD.exec(target.value)
    const hasNVariantEquivalent = H_N_VARIANT_KEYBOARD.exec(target.value)
    const hasPunctuationEqv = HIRAGANA_PUNCTUATION.exec(target.value)

    if (hasNVariantEquivalent) t = replaceSymbols(HNVariantsDictionary, hasNVariantEquivalent[0], t)
    if (hasSmallEquivalent) t = replaceSymbols(HSmallKanaDictionary, hasSmallEquivalent[0], t)
    if (hasPunctuationEqv) t = replaceSymbols(HPunctuationDictionary, hasPunctuationEqv[0], t)
    if (hasSymbolEquivalent) t = replaceSymbols(HiraganaDictionary, hasSymbolEquivalent[0], t)

    setHiraganaText(t)
  }

  const onHiraganaButtonClick = (symbol: string) => {
    setHiraganaText(hiraganaText + symbol)
  }

  const onKatakanaTextAreaInput = ({ target }: any) => {
    let t = target.value
    const hasSmallEquivalent = K_SMALL_KANA_KEYBOARD.exec(target.value)
    const hasSymbolEquivalent = KATAKANA_KEYBOARD.exec(target.value)
    const hasNVariantEquivalent = K_N_VARIANT_KEYBOARD.exec(target.value)
    const hasPunctuationEqv = KATAKANA_PUNCTUATION.exec(target.value)

    if (hasNVariantEquivalent) t = replaceSymbols(KNVariantsDictionary, hasNVariantEquivalent[0], t)
    if (hasSmallEquivalent) t = replaceSymbols(KSmallKanaDictionary, hasSmallEquivalent[0], t)
    if (hasPunctuationEqv) t = replaceSymbols(KPunctuationDictionary, hasPunctuationEqv[0], t)
    if (hasSymbolEquivalent) t = replaceSymbols(KatakanaDictionary, hasSymbolEquivalent[0], t)

    setKatakanaText(t)
  }

  const onKatakanaButtonClick = (symbol: string) => {
    setKatakanaText(hiraganaText + symbol)
  }

  const buildKeyboard = (
    language: string,
    example: string,
    dictionary: JapaneseSymbol[],
    replaceFunction: ({ target }: any) => void,
    clickFunction: (symbol: string) => void,
    textAreaValue: string,
  ) => {
    return (
      <>
        <h1>Teclado {language}</h1>
        <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
          Type the romaji equivalent of the {language} symbols and it will be replaced by the
          correct symbol.
        </h4>
        <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
          Type the &quot;=&quot; sign before the romaji to type a small kana. Eg: {example}
        </h4>
        <h4 style={{ marginTop: '-16px', color: 'gray', fontStyle: 'italic' }}>
          To type quotes please add a space after the quote for a opening one, and a space before
          the quote for a closing one.
        </h4>
        <Row justify={'center'} style={{ marginBottom: '24px' }}>
          <Col flex={1}>
            <TextArea
              style={{ height: '180px', fontSize: '3em' }}
              value={textAreaValue}
              onChange={replaceFunction}
            />
          </Col>
        </Row>
        <Row justify={'center'}>
          {dictionary.map((symbol) => {
            return (
              <Card
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '8px',
                  cursor: 'pointer',
                }}
                key={symbol.symbol}
                onClick={() => clickFunction(symbol.symbol)}
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
                onClick={() => clickFunction(symbol)}
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
          children: buildKeyboard(
            'Hiragana',
            '=tsu =ya =yo | っ ゃ ょ',
            HiraganaDictionary,
            onHiraganaTextAreaInput,
            onHiraganaButtonClick,
            hiraganaText,
          ),
        },
        {
          label: 'Katakana',
          key: 'katakana',
          children: buildKeyboard(
            'Katakana',
            '=tsu =ya =yo | ッ ャ ョ',
            KatakanaDictionary,
            onKatakanaTextAreaInput,
            onKatakanaButtonClick,
            katakanaText,
          ),
        },
        // {
        //   label: 'Kanji',
        //   key: 'kanji',
        //   children: <span>Soon</span>,
        // },
      ]}
    ></Tabs>
  )
}

export { Keyboard }
