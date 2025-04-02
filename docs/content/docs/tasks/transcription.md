---
layout: blog-layout
title: Using popular models for transcription | Nuxt Transformers JS
description: Use popular models for transcription with Nuxt & Transformers.js.

ogImage:
  component: Pergel
  props:
    title: Use popular models for transcription with Nuxt & Transformers.js | Nuxt Transformers JS
    description: Use popular models for transcription with Nuxt & Transformers.js | Nuxt module powered by Transformers.js.
    heading: Nuxt 4

head:
  htmlAttrs:
    lang: en
  bodyAttrs:
    class: ""
  meta:
    - name: keywords
      content: Transcription task locally | Nuxt module to run AI model with in the browser using Web Workers and Transformers.js
    - name: robots
      content: index, follow
    - name: author
      content: Transcription task locally | Nuxt module to run AI model with in the browser using Web Workers and Transformers.js
    - name: description
      content: Transcription task locally | module.
    - name: twitter:title
      content: Transcription task locally | Nuxt module to run AI model with in the browser using Web Workers and Transformers.js
    - name: twitter:card
      content: summary_large_image
    - name: twitter:title
      content: Transcription task locally | Nuxt module to run AI model with in the browser using Web Workers and Transformers.js
    - name: twitter:description
      content: Transcription task locally | module.
---

<div class="mx-auto container">

## Getting Started

Please make sure that you completed the [Getting Started](/docs/getting-started) section before reading this guide.

## Features

- 🤖 Transcribe Audio to text
- 🚀 Fast and easy
- 🧩 Shadcn-vue inspired
- ⚡ Copy paste the `composable & worker` code
- 📚 Examples of usage



## Demo

## Usage
```vue [TranscriptionView.vue]
<script lang="ts" setup>
const { getModels, modelsOptions, selectedModel, progress, init, status, run, result } = useTranscriber()
await getModels()

const HandleSelectedFile = (event: Event) => {
  const audioFile = event.target as HTMLInputElement
  const file = audioFile.files
  if (!file || !file[0]) return

  const selectedFile = file[0]
  const language = 'en'
  run(selectedFile, language)
}
</script>

<template>
  <div>
    <section>
      <h1>Options</h1>
      <div>
        <select
          v-model="selectedModel"
          placeholder="Select a model"
        >
          <option
            disabled
            value=""
          >
            Select a model
          </option>
          <option
            v-for="model in modelsOptions"
            :key="model.id"
            :value="model.id"
          >
            {{ model.name }}
          </option>
        </select>
      </div>
    </section>
    <section>
      <h2>Load model</h2>
      <button
        :disabled="!selectedModel"
        @click="init"
      >
        Load selected model
      </button>
    </section>

    <section>
      <h2>Loading indicator</h2>
      <div>
        {{ status == "loading" ? "loading ..." : "" }} {{ progress }}
      </div>
    </section>

    <section>
      <h2>Transcribe</h2>
      <div>
        <input
          type="file"
          accept="audio/*"
          @change="HandleSelectedFile"
        >
      </div>
    </section>

    <section>
      <h2>Result</h2>
      <div>
        {{ result }}
      </div>
    </section>
  </div>
</template>

<style scoped></style>

```

## Code

Is recommended to create the Web Worker in the `assets/workers` folder.


::steps
### Create composable

```ts [useTranscriber.ts]
import { ref, computed } from 'vue'
import TranscriptionWorker from '~~/assets/workers/transcription.worker?worker'

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

```
### Create worker

```ts [transcription.worker.ts]
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

```

### Other model that can be use  for transcription

- [ Model catalog ](https://huggingface.co/models?pipeline_tag=automatic-speech-recognition&library=transformers.js&sort=trending)


::







## Examples

- [Audio Notes](https://human-ideas.giessen.dev/tools/audio-text-notes): Privacy friendly Audio to text notes.
- [whisper-web](https://huggingface.co/spaces/Xenova/whisper-web)

</div>
