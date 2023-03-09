import { useParams, useNavigate } from 'react-router-dom'
import { JapaneseSymbol } from '../../common/interfaces/japaneseSymbol'
import { HiraganaDictionary } from '../../dictionary/hiragana'
import { KatakanaDictionary } from '../../dictionary/katakana'
import { ContentCard } from '../../components/ContentCard'
import { Glossary } from '../../components/Glossary/Glossary'

const alphabetLibrary: { [key: string]: JapaneseSymbol[] | null } = {
  hiragana: HiraganaDictionary,
  katakana: KatakanaDictionary,
}

export const GlossaryPage = () => {
  const { alphabet } = useParams()
  const navigate = useNavigate()
  const dictionary = alphabetLibrary[alphabet || '']

  if (!dictionary) {
    return (
      <ContentCard onClick={() => navigate('/quiz')}>
        <p>
          You have entered a page to a glossary that has not been implemented yet, please click here
          to go back to the glossary selection page
        </p>
      </ContentCard>
    )
  }

  return (
    <ContentCard>
      <Glossary dictionary={dictionary} />
    </ContentCard>
  )
}
