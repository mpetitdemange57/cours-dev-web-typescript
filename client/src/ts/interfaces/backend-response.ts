export interface BackendResponse<T> {
  data: T
  metadata: {
    url: string;
  }
}