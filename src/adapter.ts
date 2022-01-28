import { Adapter, TranslationTask } from './types'

// Dummy operation just reading previous translation tasks from localStorage
const getTasks = (): TranslationTask[] => {
  const taskJSON = window.localStorage.getItem('dummyTasks')
  if (!taskJSON) return []
  return JSON.parse(taskJSON)
}

// Dummy operation writing new translation task to localStorage. Normally you'd
// want to ring up an API and create a translation job there.
const addTask = (task: TranslationTask) => {
  const tasks = getTasks()
  window.localStorage.setItem('dummyTasks', JSON.stringify([...tasks, task]))
}

const getTaskDetails = (taskId: string): TranslationTask | null => {
  const task = getTasks().find(t => t.taskId === taskId)
  return task ? task : null
}

// Dummy translation vendor adapter that just stores translation tasks to
// localStorage and returns the same translation for any content it receives.
export const DummyAdapter: Adapter = {
  getLocales: async () => {
    return new Promise(resolve => {
      resolve([
        {
          enabled: true,
          description: 'German',
          localeId: 'de',
        },
        {
          enabled: true,
          description: 'Norwegian (Bokmål)',
          localeId: 'no_nb',
        },
        {
          enabled: false,
          description: 'Icelandic',
          localeId: 'is',
        },
      ])
    })
  },
  getTranslationTask: async (documentId: string) => {
    console.debug('Fetching translation tasks for document', documentId)
    return new Promise(() => {
      const tasks = getTasks()
      const result = tasks.length ? tasks[tasks.length - 1] : null
      return result
    })
  },
  createTask: async (
    documentId: string,
    document: Record<string, any>,
    localeIds: string[]
  ) => {
    console.debug('Sending over serialized document', document)
    return new Promise(resolve => {
      const tasks: TranslationTask[] = []
      localeIds.forEach(locale => {
        const task: TranslationTask = {
          taskId: new Date().getTime().toString(),
          documentId,
          progress: 80,
          localeId: locale,
          description: 'Description',
        }
        addTask(task)
        tasks.push(task)
      })
      resolve(tasks)
    })
  },
  getTranslation: async (taskId: string, localeId: string) => {
    console.debug('Fetching translation for locale', localeId)
    await setTimeout(() => {}, 1000)
    const task = getTaskDetails(taskId)
    if (!task) {
      return null
    }

    return new Promise(resolve => {
      resolve({
        _id: task.documentId,
        title: 'This is just a dummy translation',
      })
    })
  },
}
