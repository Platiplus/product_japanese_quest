import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import { ChangeEvent, useRef, useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { HiraganaDictionary } from '../../dictionary/hiragana'
import { getRandomElement } from '../../utils/array.util'
import { HideWhenEmpty } from '../HideWhenEmpty/HideWhenEmpty'
import { useForm } from 'antd/es/form/Form'

const SymbolsCard = () => {
  const [form] = useForm()
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
    form.resetFields()
  }

  return (
    <Form form={form}>
      <Row justify={'center'}>
        <HideWhenEmpty showEmpty={true} condition={!isListEmpty}>
          <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '120px' }}>{randomSymbol?.symbol}</h1>
            <Form.Item name={'guess'}>
              <Input
                autoFocus={true}
                value={guess}
                onChange={(value: ChangeEvent<HTMLInputElement>) => setGuess(value.target.value)}
              ></Input>
            </Form.Item>
          </Col>
        </HideWhenEmpty>
      </Row>
      <HideWhenEmpty condition={guess.toLowerCase() === randomSymbol?.romaji}>
        <Row justify={'center'} style={{ marginTop: '12px' }}>
          <Form.Item name={'submit'}>
            <Button htmlType={'submit'} onClick={() => onRightGuess(randomSymbol!)}>
              Manda outro!
            </Button>
          </Form.Item>
        </Row>
      </HideWhenEmpty>
    </Form>
  )
}

export { SymbolsCard }
