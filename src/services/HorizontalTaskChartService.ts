// services/HorizontalTaskChartService.ts
export interface UserTaskData {
    username: string
    todo: number
    in_progress: number
    verify: number
    done: number
    countTask: number
  }
  
  export function sortTaskData(data: UserTaskData[], sortOrder: "asc" | "desc" | null): UserTaskData[] {
    if (sortOrder === null) return [...data]
    return [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.countTask - b.countTask
      } else {
        return b.countTask - a.countTask
      }
    })
  }
  
  export function calculateScaleMax(data: UserTaskData[]): number {
    const maxTasks = Math.max(...data.map((user) => user.countTask))
  
    // Round up to the nearest 5
    const roundedUp = Math.ceil(maxTasks / 5) * 5
  
    // Add at least 10 to ensure there's space
    return roundedUp + 10
  }
  
  export function generateScaleTicks(scaleMax: number): number[] {
    return Array.from({ length: Math.ceil(scaleMax / 5) + 1 }, (_, i) => i * 5)
  }
  