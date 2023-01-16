import { Empty } from 'antd'

type HideWhenEmptyProps = {
  children: JSX.Element
  condition: boolean
  showEmpty?: boolean
}

const HideWhenEmpty = ({ children, condition, showEmpty }: HideWhenEmptyProps) => {
  if (condition) {
    return children
  }

  if (showEmpty) {
    return <Empty description={<span>Parabéns, você acertou todos!</span>} />
  }

  return <></>
}

export { HideWhenEmpty }
