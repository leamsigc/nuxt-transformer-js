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
  question: string;
  answer: string;
  value: string;
}
interface Props {
  list?: FAQProps[];
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [
    {
      question: "Is this template free?",
      answer: "Yes. It is a free Shadcn/Vue template.",
      value: "item-1",
    },
    {
      question: "Duis aute irure dolor in reprehenderit in voluptate velit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam consectetur sapiente, iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
      value: "item-2",
    },
    {
      question: "Lorem ipsum dolor sit amet Consectetur natus dolor minus quibusdam?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis.",
      value: "item-3",
    },
    {
      question: "Excepteur sint occaecat cupidata non proident sunt?",
      answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      value: "item-4",
    },
    {
      question: "Enim ad minim veniam, quis nostrud exercitation ullamco laboris?",
      answer: "consectetur adipisicing elit. Sint labore.",
      value: "item-5",
    },
  ],
});
const { list } = toRefs(props);
</script>

<template>
  <section id="faq" class="container md:w-[700px] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        <slot name="title"> FAQS </slot>
      </h2>

      <h3 class="text-3xl md:text-4xl text-center font-bold">
        <slot name="subtitle"> Common Questions </slot>
      </h3>
    </div>

    <UiAccordion type="single" collapsible class="AccordionRoot">
      <UiAccordionItem v-for="{ question, answer, value } in list" :key="value" :value="value">
        <UiAccordionTrigger class="text-left"> {{ question }} </UiAccordionTrigger>

        <UiAccordionContent>{{ answer }}</UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>

    <h3 class="font-medium mt-4">
      Still have questions?
      <NuxtLink href="/" class="text-muted-foreground underline">Contact us </NuxtLink>
    </h3>
  </section>
</template>
