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
const { getModels, modelsOptions, selectedModel, progress, init, status, run, result } = useTranscriber();
await getModels();


const HandleSelectedFile = (event: Event) => {

  const audioFile = event.target as HTMLInputElement;
  const file = audioFile.files;
  if (!file || !file[0]) return;


  const selectedFile = file[0];
  const language = 'en';
  run(selectedFile, language);
}
</script>

<template>
  <div>
    <section>
      <h1>Options</h1>
      <div>
        <select v-model="selectedModel" placeholder="Select a model">
          <option disabled value="">Select a model</option>
          <option v-for="model in modelsOptions" :value="model.id" :key="model.id">
            {{ model.name }}
          </option>
        </select>
      </div>
    </section>
    <section>
      <h2>Load model</h2>
      <button @click="init" :disabled="!selectedModel">Load selected model</button>
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
        <input type="file" accept="audio/*" @change="HandleSelectedFile">
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
