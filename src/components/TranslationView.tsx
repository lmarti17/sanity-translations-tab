import React, { useContext, useEffect, useState } from 'react'
import { Stack } from '@sanity/ui'
import { TranslationContext } from './TranslationContext'

import { NewTask } from './NewTask'
import { TaskView } from './TaskView'
import { TranslationTask, TranslationLocale } from '../types'

export const TranslationView = () => {
  const [locales, setLocales] = useState<TranslationLocale[]>([])
  const [tasks, setTask] = useState<TranslationTask[] | null>([])

  const context = useContext(TranslationContext)

  useEffect(() => {
    async function fetchData() {
      if (!context) {
        console.error('Missing context')
        return
      }
      context.adapter
        .getLocales(context.secrets)
        .then(setLocales)
        .then(() =>
          context.adapter.getTranslationTask(
            context.documentId,
            context.secrets
          )
        )
        .then(setTask)
    }
    fetchData()
  }, [context])

  return (
    <Stack space={5}>
      <NewTask locales={locales} />
      {tasks && <TaskView tasks={tasks} />}
    </Stack>
  )
}
