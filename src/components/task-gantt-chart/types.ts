export interface Task {
  id: string;
  content: string;
  time_start: string;
  deadline: string;
  description: string;
  is_late: boolean;
  is_near_deadline: boolean;
  project_id: number;
  status_key: string;
  user_count: number;
}

export interface FormattedTask extends Task {
  startPosition: number
  duration: number
  startDate: Date
  endDate: Date
}

export interface MonthHeader {
  month: string
  colSpan: number
}

