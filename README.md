# Nuxt Transformer.js Module

Run popular AI models directly in your browser with this Nuxt module powered by Transformer.js. Perform AI tasks efficiently using web workers while keeping your main thread responsive.

## Features

- 🤖 Easy integration with popular AI models
- 🚀 Web Worker-based processing for optimal performance
- 🧩 Simple composables for AI tasks
- ⚡ Zero-config setup with Nuxt 3/4
- 🎨 Built-in UI components using Shadcn Vue
- 📚 Comprehensive documentation with Nuxt Content

## Installation

```bash
# npm
npm i @huggingface/transformers
# yarn
yarn add @huggingface/transformers

# pnpm
pnpm add @huggingface/transformers
```

## Setup

Explore the task that we have available for you:

- [Tasks](/docs/getting-started)


## Usage

```vue
<script setup>

const { getModels, modelsOptions, selectedModel, progress, init, status, run, result } = useTranscriber()

// Get a list of available models
await getModels()

// Upload a file
const HandleSelectedFile = (event: Event) => {
  const audioFile = event.target as HTMLInputElement
  const file = audioFile.files
  if (!file || !file[0]) return

  const selectedFile = file[0]
  const language = 'en'


  // Run the task
  run(selectedFile, language)
}
</script>
```

## Web Worker Implementation

All AI-related tasks run in a dedicated web worker, preventing UI blocking:

```ts
// Access worker methods
const { worker } = useTransformer()

// Run heavy computations
await worker.process(data)
```

## Available Models

```js
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
```

## Tech Stack

- Nuxt 3/4
- Transformer.js
- Web Workers
- Nuxt Content (documentation)
- Nuxt Scripts
- Shadcn Vue (UI components)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT

## Author

Leamsigc
