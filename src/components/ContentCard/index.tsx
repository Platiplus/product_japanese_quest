import { Card } from 'antd'

type ContentCardProps = {
  children: JSX.Element | JSX.Element[]
  onClick?: () => void
  title?: string
}

const cardStyle = {
  boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
  cursor: 'pointer',
}

export const ContentCard = ({ children, onClick = () => null, title }: ContentCardProps) => {
  return (
    <Card title={title} onClick={onClick} style={cardStyle}>
      {children}
    </Card>
  )
}
