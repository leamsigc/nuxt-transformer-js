<script setup lang="ts">
/**
 *
 * Component Description:Desc
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface FAQProps {
  question: string
  answer: string
  value: string
}
interface Props {
  list?: FAQProps[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [
    {
      question: 'How can I use this module?',
      answer: 'You can install the module, but I recommend that you create each file base on the documentation.',
      value: 'item-1',
    },
    {
      question: 'Can I use the specific AI model and the composables?',
      answer:
        'Yes, that is the recomended way to use this module. If you have use shadcn-vue, is the same idea.',
      value: 'item-2',
    },
    {
      question: 'Can I request a specific model or task ?',
      answer:
        'Yes for sure, but it can be that someone already have the model that you need, so you can use it.',
      value: 'item-3',
    },
    {
      question: 'Where can I find the documentation for the Transformer js module ?',
      answer: 'You can read the documentation in the website. https://huggingface.co/docs/transformers.js/index',
      value: 'item-4',
    },
    {
      question: 'Where I can find models that are available or that can be use with Transformers js?',
      answer: 'You can find all the models that are available in the website. https://huggingface.co/models?library=transformers.js',
      value: 'item-5',
    },
  ],
})
const { list } = toRefs(props)
</script>

<template>
  <section id="faq" class="container md:w-[700px] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        <slot name="title">
          FAQS
        </slot>
      </h2>

      <h3 class="text-3xl md:text-4xl text-center font-bold">
        <slot name="subtitle">
          Common Questions
        </slot>
      </h3>
    </div>

    <UiAccordion type="single" collapsible class="AccordionRoot">
      <UiAccordionItem v-for="{ question, answer, value } in list" :key="value" :value="value">
        <UiAccordionTrigger class="text-left">
          {{ question }}
        </UiAccordionTrigger>

        <UiAccordionContent>{{ answer }}</UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>

    <h3 class="font-medium mt-4">
      Still have questions?
      <NuxtLink href="/" class="text-muted-foreground underline">Contact us </NuxtLink>
    </h3>
  </section>
</template>
