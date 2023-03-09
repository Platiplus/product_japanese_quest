import { useParams, useNavigate } from 'react-router-dom'
import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import { HiraganaDictionary } from '../../dictionary/hiragana'
import { KatakanaDictionary } from '../../dictionary/katakana'
import { Quiz } from '../../components/Quiz'
import { ContentCard } from '../../components/ContentCard'

const alphabetLibrary: { [key: string]: JapaneseSymbol[] | null } = {
  hiragana: HiraganaDictionary,
  katakana: KatakanaDictionary,
}

export const QuizPage = () => {
  const { alphabet } = useParams()
  const navigate = useNavigate()
  const dictionary = alphabetLibrary[alphabet || '']

  if (!dictionary) {
    return (
      <ContentCard onClick={() => navigate('/quiz')}>
        <p>
          You have entered a page to a quiz that has not been implemented yet, please click here to
          go back to the quiz selection page
        </p>
      </ContentCard>
    )
  }

  return (
    <ContentCard onClick={() => null}>
      <Quiz dictionary={dictionary} />
    </ContentCard>
  )
}
