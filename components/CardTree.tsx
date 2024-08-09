import React from 'react'
import Card from './Card'
import { TemplateProps } from '@/data/treeTemplate'
import { ArcherContainer } from 'react-archer'

interface CardTreeProps {
  data: TemplateProps[]
}

const CardTree = (data : CardTreeProps) => {
  return ( 
    <div className='flex mt-12 justify-center space-x-72 pt-24'>
      {data.data.map((node) => (
      <div key={node.id}>
        <Card id={node.id}
              title={node.title}
              valueStart={node.valueStart}
              valueEnd={node.valueEnd}
              change={node.change}
              start_month={node.start_month}
              end_month={node.end_month}
              year={node.year}>
          {node.children && <CardTree data={node.children} />}
        </Card>
      </div>
      ))}
    </div>
  )
}

export default CardTree