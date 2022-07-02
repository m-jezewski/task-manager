interface Task {
  id?: string
  uid: string
  text: string
  priority: string
  orderIndex: number
  space: string
  status: string
}

interface Space {
  id?: string
  uid: string
  space: string
}

interface Status {
  id?: string
  uid: string
  status: string
  orderIndex: number
  color: string
}

export type { Task, Space, Status }
