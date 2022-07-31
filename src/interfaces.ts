interface Task {
  id?: string
  uid: string
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
  uid: string
  name: string
}

interface Status {
  id?: string
  uid: string
  name: string
  orderIndex: number
  color: string
}

export type { Task, Space, Status }
