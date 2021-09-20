import { Card, Flex, Label } from '@sanity/ui'
import React from 'react'

type ProgressBarProps = {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Card border radius={2} style={{ width: `100%`, position: `relative` }}>
      <Flex
        style={{
          position: `absolute`,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
        align="center"
        justify="center"
      >
        <Label size={1}>{progress}%</Label>
      </Flex>
      <Card
        style={{
          width: '100%',
          transform: `scaleX(${progress / 100})`,
          transformOrigin: 'left',
          transition: 'transform .2s ease',
          boxSizing: 'border-box',
        }}
        padding={2}
        tone="positive"
      ></Card>
    </Card>
  )
}
