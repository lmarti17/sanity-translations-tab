import React, { useContext } from 'react'
import { Box, Stack, Text, useToast } from '@sanity/ui'

import { TranslationContext } from './TranslationContext'
import { TranslationTask } from '../types'
import { LanguageStatus } from './LanguageStatus'

type JobProps = {
  tasks: TranslationTask[]
}

export const TaskView = ({ tasks }: JobProps) => {
  const context = useContext(TranslationContext)
  const toast = useToast()

  const importFile = async (taskId: string, localeId: string) => {
    if (!context) {
      console.error('Missing context')
      return
    }

    return context.adapter
      .getTranslation(taskId, localeId, context.secrets)
      .then(record => {
        if (record) {
          return context.importTranslation(localeId, record)
        } else {
          toast.push({
            title: 'Error getting the translated content!',
            status: 'warning',
          })
          return null
          // alert('Error getting the translated content!')
        }
      })
  }

  return (
    <Stack space={3}>
      <Text weight="semibold" size={1}>
        Current job progress
      </Text>
      <Box>
        {tasks.map(({ taskId, localeId, description, progress }) => {
          const reportPercent = progress || 0
          // const locale = locales.find(l => l.localeId === localeTask.localeId)
          return (
            <LanguageStatus
              key={[taskId, localeId].join('.')}
              importFile={() => {
                importFile(taskId, localeId).then(() => {
                  toast.push({ title: 'Import successful ', status: 'success' })
                })
              }}
              title={description || localeId}
              progress={reportPercent}
            />
          )
        })}
        {/* {task.locales.map(localeTask => {
          const reportPercent = localeTask.progress || 0
          const locale = locales.find(l => l.localeId === localeTask.localeId)
          return (
            <LanguageStatus
              key={[task.taskId, localeTask.localeId].join('.')}
              importFile={() => {
                importFile(localeTask.localeId).then(() => {
                  toast.push({ title: 'Hello', status: 'info' })
                })
                
              }}
              title={locale?.description || localeTask.localeId}
              progress={reportPercent}
            />
          )
        })} */}
      </Box>
    </Stack>
  )
}
