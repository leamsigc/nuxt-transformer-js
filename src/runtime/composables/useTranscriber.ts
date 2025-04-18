import { ref, computed } from 'vue'
import TranscriptionWorker from '../workers/transcription.worker?worker'

type WorkerStatus = 'idle' | 'loading' | 'loaded' | 'transcribing' | 'done' | 'models' | 'error'
type ModelsOption = {
  id: string
  name: string
  description: string
}

const getAudioData = async (audioFile: File): Promise<AudioBuffer> => {
  const arrayBuffer = await audioFile.arrayBuffer()
  const audioCTX = new AudioContext({
    sampleRate: 16000,
  })
  const audioBuffer = await audioCTX.decodeAudioData(arrayBuffer)
  return audioBuffer
}

const status = ref<WorkerStatus>('idle')
const worker = ref<Worker | null>(null)

const selectedModel = ref('Xenova/whisper-tiny.en')
const modelsOptions = ref<ModelsOption[]>([])

const progress = ref<number>(0)
const error = ref<string | null>(null)

const result = ref<any>(null)

export const useTranscriber = () => {
  const initWorker = async () => {
    if (!worker.value) {
      worker.value = new TranscriptionWorker()
      if (!worker.value) {
        throw new Error('Failed to create worker')
      }

      worker.value.onmessage = (event) => {
        const { type, status: workerStatus, progress: workerProgress, error: workerError, result: workerResult, modelsOptions: availableModels } = event.data

        switch (type) {
          case 'models':
            modelsOptions.value = availableModels
            break
          case 'status':
            status.value = workerStatus
            if (workerProgress !== undefined) {
              progress.value = workerProgress
            }
            break
          case 'error':
            status.value = 'error'
            error.value = workerError
            break
          case 'result':
            result.value = workerResult
            break
        }
      }
    }
  }

  const init = async () => {
    await initWorker()
    worker.value?.postMessage({ type: 'loadModel', payload: { model: selectedModel.value } })
  }
  const run = async (audioFile: File, language: string) => {
    if (status.value === 'idle') {
      await init()
    }

    try {
      const audioBuffer = await getAudioData(audioFile)
      // Convert AudioBuffer to Float32Array for the worker
      const audioData = audioBuffer.getChannelData(0)
      worker.value?.postMessage({
        type: 'transcribe',
        payload: {
          audio: audioData,
          language,
          model: selectedModel.value,
        },
      })
    }
    catch (err) {
      error.value = (err as Error).message
      status.value = 'error'
    }
  }

  const getModels = async () => {
    await initWorker()
    worker.value?.postMessage({ type: 'models' })
    status.value = 'models'
  }

  return {
    getModels,
    init,
    run,
    isLoaded: computed(() => status.value === 'loaded' || status.value === 'done'),
    isRunning: computed(() => status.value === 'transcribing'),
    modelsOptions,
    selectedModel,
    status,
    progress,
    error,
    result,
  }
}
