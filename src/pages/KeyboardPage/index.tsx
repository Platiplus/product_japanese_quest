import { useParams, useNavigate } from 'react-router-dom'
import { Quiz } from '../../components/Quiz'
import { ContentCard } from '../../components/ContentCard'
import { Keyboard, KeyboardProps } from '../../components/Keyboard/Keyboard'

import * as hiragana from '../../dictionary/hiragana'
import * as katakana from '../../dictionary/katakana'
import * as regex from '../../utils/regex.util'

const keyboardLibrary: { [key: string]: KeyboardProps | null } = {
  hiragana: {
    alphabet: 'Hiragana',
    smallKanaExamples: '=tsu =ya =yo | っ ゃ ょ',
    dictionaries: {
      symbols: hiragana.HiraganaDictionary,
      smallKana: hiragana.HSmallKanaDictionary,
      nVariant: hiragana.HNVariantsDictionary,
      punctuation: hiragana.HPunctuationDictionary,
    },
    regexes: {
      symbols: regex.HIRAGANA_KEYBOARD,
      smallKana: regex.H_SMALL_KANA_KEYBOARD,
      nVariant: regex.H_N_VARIANT_KEYBOARD,
      punctuation: regex.HIRAGANA_PUNCTUATION,
    },
  },
  katakana: {
    alphabet: 'Katakana',
    smallKanaExamples: '=tsu =ya =yo | ッ ャ ョ',
    dictionaries: {
      symbols: katakana.KatakanaDictionary,
      smallKana: katakana.KSmallKanaDictionary,
      nVariant: katakana.KNVariantsDictionary,
      punctuation: katakana.KPunctuationDictionary,
    },
    regexes: {
      symbols: regex.KATAKANA_KEYBOARD,
      smallKana: regex.K_SMALL_KANA_KEYBOARD,
      nVariant: regex.K_N_VARIANT_KEYBOARD,
      punctuation: regex.KATAKANA_PUNCTUATION,
    },
  },
}

export const KeyboardPage = () => {
  const { alphabet } = useParams()
  const navigate = useNavigate()
  const keyboard = keyboardLibrary[alphabet || '']

  if (!keyboard) {
    return (
      <ContentCard onClick={() => navigate('/keyboard')}>
        <p>
          You have entered a page to a keyboard that has not been implemented yet, please click here
          to go back to the keyboard selection page
        </p>
      </ContentCard>
    )
  }

  return (
    <ContentCard>
      <Keyboard
        alphabet={keyboard.alphabet}
        smallKanaExamples={keyboard.smallKanaExamples}
        regexes={keyboard.regexes}
        dictionaries={keyboard.dictionaries}
      />
    </ContentCard>
  )
}
