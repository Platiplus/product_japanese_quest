import { Tabs } from 'antd'
import { HiraganaDictionary } from '../../dictionary/hiragana'
import { Quiz } from '../Quiz/Quiz'
import { KatakanaDictionary } from '../../dictionary/katakana'

const Quizes = () => {
  return (
    <Tabs
      items={[
        {
          label: 'Hiragana',
          key: 'hiragana',
          children: <Quiz dictionary={HiraganaDictionary} />,
        },
        {
          label: 'Katakana',
          key: 'katakana',
          children: <Quiz dictionary={KatakanaDictionary} />,
        },
      ]}
    />
  )
}

export { Quizes }
