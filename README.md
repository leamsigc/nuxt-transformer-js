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
npm i nuxt-transformerjs
npx nuxi@latest module add image
# yarn
yarn add nuxt-transformerjs

# pnpm
pnpm add nuxt-transformerjs
```

## Setup

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-transformerjs']
})
```

## Usage

```vue
<script setup>
import { useTransformer } from '#imports'

// Initialize a model
const { loadModel, runInference } = useTransformer()

// Load a specific model
await loadModel('bert-base-uncased')

// Run inference
const result = await runInference('Your text here')
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

- BERT
- GPT-2
- T5
- More models coming soon...

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
