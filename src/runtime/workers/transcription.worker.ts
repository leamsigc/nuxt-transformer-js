import { type AutomaticSpeechRecognitionPipeline, pipeline } from '@huggingface/transformers'

interface ErrorEvent {
  message: string
}

const BASE_MODEL = 'Xenova/whisper-tiny.en'
let transcriber: AutomaticSpeechRecognitionPipeline | null = null
let isEnglishModel = true

const modelsOptions = [
  {
    id: 'Xenova/whisper-tiny.en',
    name: 'whisper-tiny.en',
    description: 'whisper-tiny.en (English)',
  },
  {
    id: 'Xenova/whisper-tiny',
    name: 'whisper-tiny',
    description: 'whisper-tiny (Multilingual)',
  },
  {
    id: 'Xenova/whisper-small',
    name: 'whisper-small',
    description: 'whisper-small (Multilingual)',
  },
  {
    id: 'Xenova/whisper-small.en',
    name: 'whisper-small.en',
    description: 'whisper-small.en (English)',
  },
  {
    id: 'Xenova/whisper-base',
    name: 'whisper-base',
    description: 'whisper-base (Multilingual)',
  },
  {
    id: 'Xenova/whisper-medium.en',
    name: 'whisper-medium.en',
    description: 'whisper-medium.en (English)',
  },
  {
    id: 'Xenova/whisper-medium',
    name: 'whisper-medium',
    description: 'whisper-medium (Multilingual)',
  },
  {
    id: 'Xenova/whisper-large',
    name: 'whisper-large',
    description: 'whisper-large (Multilingual)',
  },
  {
    id: 'Xenova/whisper-large-v2',
    name: 'whisper-large-v2',
    description: 'whisper-large-v2 (Multilingual)',
  },
  {
    id: 'Xenova/whisper-large-v3',
    name: 'whisper-large-v3',
    description: 'whisper-large-v3 (Multilingual)',
  },

  {
    id: 'onnx-community/whisper-tiny_timestamped',
    name: 'whisper-tiny_timestamped',
    description: 'whisper-tiny_timestamped (Multilingual)',
  },
  {
    id: 'onnx-community/whisper-small_timestamped',
    name: 'whisper-small_timestamped',
    description: 'whisper-small_timestamped (Multilingual)',
  },
  {
    id: 'onnx-community/whisper-base_timestamped',
    name: 'whisper-base_timestamped',
    description: 'whisper-base_timestamped (Multilingual)',
  },
  {
    id: 'onnx-community/whisper-large-v3-turbo_timestamped',
    name: 'whisper-large-v3-turbo_timestamped',
    description: 'whisper-large-v3-turbo_timestamped (Multilingual)',
  },
]

globalThis.onmessage = async (event) => {
  const { type, payload } = event.data

  switch (type) {
    case 'models':
      try {
        globalThis.postMessage({ type: 'models', modelsOptions })
      }
      catch (error: any) {
        globalThis.postMessage({ type: 'error', error: error.message })
      }
      break
    case 'loadModel':
      try {
        globalThis.postMessage({ type: 'status', status: 'loading', progress: 0 })
        if (payload.model.includes('.en')) {
          isEnglishModel = true
        }
        else {
          isEnglishModel = false
        }

        transcriber = await pipeline('automatic-speech-recognition', payload.model || BASE_MODEL)
        globalThis.postMessage({ type: 'status', status: 'loaded', progress: 100 })
      }
      catch (error: any) {
        globalThis.postMessage({ type: 'error', error: error.message })
      }
      break

    case 'transcribe':
      if (!transcriber) {
        globalThis.postMessage({ type: 'error', error: 'Model not loaded' })
        return
      }
      try {
        globalThis.postMessage({ type: 'status', status: 'transcribing', progress: 0 })
        const { audio, language, model } = payload
        console.log('Transcribing audio:', audio, 'with language:', language, 'and model:', model)
        const settings = {
          language,
          return_timestamps: true,
        }

        const result = await transcriber(audio, !isEnglishModel ? settings : {})
        globalThis.postMessage({ type: 'status', status: 'done', progress: 100 })
        globalThis.postMessage({ type: 'result', result })
      }
      catch (error: any) {
        globalThis.postMessage({ type: 'error', error: error.message })
      }
      break

    case 'unloadModel':
      transcriber = null
      globalThis.postMessage({ type: 'status', status: 'unloaded', progress: 100 })
      break

    default:
      globalThis.postMessage({ type: 'error', error: 'Unknown message type' })
      break
  }
}
