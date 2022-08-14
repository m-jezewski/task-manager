interface Task {
  id?: string
  uid?: string
  description: string
  fromDate: number | null
  dueDate: number | null
  priority: string
  orderIndex: number
  space: string
  status: string
}

interface Space {
  id?: string
  uid?: string
  name: string
}

interface Status {
  id?: string
  uid?: string
  name: string
  orderIndex: number
  color: string
}

interface Goal {
  id?: string
  uid?: string
  title: string
  description: string
}

interface GoalStep {
  id?: string
  goalID?: string
  uid?: string
  description?: string
  type: 'boolean' | 'number' | 'task'
  done: boolean
  target?: number
  startWith?: number
  taskID?: string
}

export type { Task, Space, Status, Goal, GoalStep }
