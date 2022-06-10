interface Todo {
  id: number
  text: string
  priority: string
}

interface Space {
  spaceName: string
  statuses: {
    [key: string]: Todo[]
  }
}

export type { Todo, Space }
