import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import { ChangeEvent, useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { getRandomElement } from '../../utils/array.util'
import { HideWhenEmpty } from '../HideWhenEmpty/HideWhenEmpty'
import { useForm } from 'antd/es/form/Form'

type QuizProps = {
  dictionary: JapaneseSymbol[]
}

const Quiz = ({ dictionary }: QuizProps) => {
  const [form] = useForm()
  const [guess, setGuess] = useState<string>('')
  const [availableSymbols, setAvailableSymbols] = useState<JapaneseSymbol[]>(dictionary)
  const [randomSymbol, setRandomSymbol] = useState(getRandomElement(availableSymbols))
  const [tries, setTries] = useState(0)

  const isListEmpty = availableSymbols.length === 0

  const onRightGuess = (symbol: JapaneseSymbol) => {
    const list = [...availableSymbols]
    const index = availableSymbols.findIndex((s) => s.symbol === symbol.symbol)
    list.splice(index, 1)

    setTries(0)
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
                onChange={(value: ChangeEvent<HTMLInputElement>) => {
                  setTries(tries + 1)
                  setGuess(value.target.value)
                }}
              ></Input>
            </Form.Item>
          </Col>
        </HideWhenEmpty>
      </Row>
      <HideWhenEmpty condition={guess.toLowerCase() === randomSymbol?.romaji}>
        <Row justify={'center'} style={{ marginTop: '12px' }}>
          <Form.Item name={'submit'}>
            <Button htmlType={'submit'} onClick={() => onRightGuess(randomSymbol!)}>
              Give me another!
            </Button>
          </Form.Item>
        </Row>
      </HideWhenEmpty>
      <HideWhenEmpty condition={tries > 12}>
        <Row style={{ textAlign: 'center', fontStyle: 'bold', color: 'red' }} justify={'center'}>
          You can look up the glossary if you don&apos;t remember, but you will lose your progress
          in the process!
        </Row>
      </HideWhenEmpty>
    </Form>
  )
}

export { Quiz }
