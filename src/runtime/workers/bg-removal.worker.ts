import { type BackgroundRemovalPipeline, pipeline } from "@huggingface/transformers";

interface ErrorEvent {
  message: string
}

const BASE_MODEL = 'briaai/RMBG-1.4';
let backgroundRemover: BackgroundRemovalPipeline | null = null;



const modelsOptions = [
  {
    id: 'briaai/RMBG-1.4',
    name: 'briaai/RMBG-1.4',
    description: 'briaai/RMBG-1.4',
  },
  {
    id: 'onnx-community/BEN2-ONNX',
    name: 'onnx-community/BEN2-ONNX',
    description: 'onnx-community/BEN2-ONNX',
  },
]

globalThis.onmessage = async (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'models':
      try {
        globalThis.postMessage({ type: 'models', modelsOptions });

      } catch (error: any) {
        globalThis.postMessage({ type: 'error', error: error.message });
      }
      break;
    case 'loadModel':
      try {
        globalThis.postMessage({ type: 'status', status: 'loading', progress: 0 });

        backgroundRemover = await pipeline('background-removal', payload.model || BASE_MODEL);
        globalThis.postMessage({ type: 'status', status: 'loaded', progress: 100 });

      } catch (error: any) {
        globalThis.postMessage({ type: 'error', error: error.message });
      }
      break;

    case 'run':
      if (!backgroundRemover) {
        globalThis.postMessage({ type: 'error', error: 'Model not loaded' });
        return;
      }
      try {
        globalThis.postMessage({ type: 'status', status: 'transcribing', progress: 0 });
        const { image, language, model } = payload;
        console.log('Transcribing audio:', image, 'with language:', language, 'and model:', model);

        const result = await backgroundRemover(image);

        globalThis.postMessage({ type: 'status', status: 'done', progress: 100 });

        globalThis.postMessage({ type: 'result', result });
      } catch (error: any) {
        globalThis.postMessage({ type: 'error', error: error.message });
      }
      break;

    case 'unloadModel':
      backgroundRemover = null;
      globalThis.postMessage({ type: 'status', status: 'unloaded', progress: 100 });
      break;

    default:
      globalThis.postMessage({ type: 'error', error: 'Unknown message type' });
      break;
  }
};
