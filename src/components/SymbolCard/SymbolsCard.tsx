import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import { ChangeEvent, useState } from 'react'
import { Button, Input, Row } from 'antd'
import { HiraganaDictionary } from '../../dictionary/hiragana'
import { getRandomElement } from '../../utils/array.util'
import { HideWhenEmpty } from '../HideWhenEmpty/HideWhenEmpty'

const SymbolsCard = () => {
  const [guess, setGuess] = useState<string>('')
  const [availableSymbols, setAvailableSymbols] = useState<JapaneseSymbol[]>(HiraganaDictionary)
  const [randomSymbol, setRandomSymbol] = useState(getRandomElement(availableSymbols))

  const isListEmpty = availableSymbols.length === 0

  const onRightGuess = (symbol: JapaneseSymbol) => {
    const list = [...availableSymbols]
    const index = availableSymbols.findIndex((s) => s.symbol === symbol.symbol)
    list.splice(index, 1)

    setAvailableSymbols(list)
    setGuess('')
    if (list.length !== 0) {
      setRandomSymbol(list[Math.floor(Math.random() * list.length)])
    } else {
      setRandomSymbol(undefined)
    }
  }

  return (
    <>
      <HideWhenEmpty showEmpty={true} condition={!isListEmpty}>
        <Row justify={'center'}>
          <Row>
            <h1 style={{ fontSize: '72px' }}>{randomSymbol?.symbol}</h1>
          </Row>
          <Input
            value={guess}
            onChange={(value: ChangeEvent<HTMLInputElement>) => setGuess(value.target.value)}
          ></Input>
        </Row>
      </HideWhenEmpty>
      <HideWhenEmpty condition={guess === randomSymbol?.romaji}>
        <Row justify={'center'} style={{ marginTop: '12px' }}>
          <Button onClick={() => onRightGuess(randomSymbol!)}>Manda outro!</Button>
        </Row>
      </HideWhenEmpty>
    </>
  )
}

export { SymbolsCard }
