<script lang="ts" setup>
/**
 *
 * TranscriptView
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
const { getModels, modelsOptions, selectedModel } = useTranscriber();
await getModels();
</script>

<template>
  <div>
    <h1>TranscriptView</h1>
    <div>
      <select v-model="selectedModel" placeholder="Select a model">
        <option disabled value="">Select a model</option>
        <option v-for="model in modelsOptions" :value="model.id" :key="model.id">
          {{ model.name }}
        </option>
      </select>
    </div>

  </div>
</template>
<style scoped></style>
