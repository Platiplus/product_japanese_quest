import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import { ChangeEvent, useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { getRandomElement } from '../../utils/array.util'
import { HideWhenEmpty } from '../HideWhenEmpty/HideWhenEmpty'
import { useForm } from 'antd/es/form/Form'

type QuizProps = {
  dictionary: JapaneseSymbol[]
}

export const Quiz = ({ dictionary }: QuizProps) => {
  const [form] = useForm()
  const [guess, setGuess] = useState<string>('')
  const [availableSymbols, setAvailableSymbols] = useState<JapaneseSymbol[]>(dictionary)
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
          <Row justify={'center'}>
            <Col>
              <h1 style={{ fontSize: '120px' }}>{randomSymbol?.symbol}</h1>
            </Col>
            <Col xs={24}>
              <Form.Item name={'guess'}>
                <Input
                  style={{ width: '100%', textAlign: 'center' }}
                  autoFocus={true}
                  value={guess}
                  onChange={(value: ChangeEvent<HTMLInputElement>) => setGuess(value.target.value)}
                ></Input>
              </Form.Item>
              <HideWhenEmpty condition={guess.toLowerCase() === randomSymbol?.romaji}>
                <Form.Item name={'submit'}>
                  <Button
                    style={{ width: '100%', backgroundColor: '#222831', color: 'white' }}
                    htmlType={'submit'}
                    onClick={() => onRightGuess(randomSymbol!)}
                  >
                    Next symbol
                  </Button>
                </Form.Item>
              </HideWhenEmpty>
            </Col>
          </Row>
        </HideWhenEmpty>
      </Row>
    </Form>
  )
}
