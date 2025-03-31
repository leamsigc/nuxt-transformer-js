export interface WorkerEventHandler {
  (event: MessageEvent): void
}

export const useWebWorker = (workerEventHandler: WorkerEventHandler, worker: Worker) => {
  worker.addEventListener('message', workerEventHandler)
  return worker
}
