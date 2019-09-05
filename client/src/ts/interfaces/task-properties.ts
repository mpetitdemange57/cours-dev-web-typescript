export interface TaskProperties {
  id: string;
  title: string;
  type: string;
  owner: string | null;
  dueDate?: Date;
}