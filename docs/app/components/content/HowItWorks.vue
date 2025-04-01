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
interface HowItWorksProps {
  badgeTitle: string;
  title: string;
  description: string;
  image: string;
}
interface Props {
  list?: HowItWorksProps[];
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [
    {
      badgeTitle: "Contribute",
      title: "Make a Difference with Every Contribution",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, quasi sint reiciendis quidem iure.",
      image: "roboto.png",
    },
    {
      badgeTitle: "Discover",
      title: "Create an Impact with Every Choice",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, sint reiciendis quidem iure veritatis optio facere tenetur.",
      image: "runner.png",
    },
    {
      badgeTitle: "Innovate",
      title: "Make Every Action Count",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, odit similique quasi sint.",
      image: "pacheco.png",
    },
    {
      badgeTitle: "Collaborate",
      title: "Tackle this challenge together",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, quasi sint reiciendis quidem iure.",
      image: "gamestation.png",
    },
  ],
});
const { list } = toRefs(props);
</script>

<template>
  <section id="how-it-works" class="container py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        <slot name="title"> How It Works </slot>
      </h2>

      <h3 class="text-3xl md:text-4xl text-center font-bold">
        <slot name="subtitle">
          Step-by-Step Process
        </slot>
      </h3>
    </div>

    <div class="lg:w-[80%] mx-auto relative">
      <div v-for="({ badgeTitle, title, description }, index) in list" :key="title"
        :class="['flex mb-8 items-center', { ' flex-row-reverse': index % 2 !== 0 }]">
        <UiCard class="h-full bg-transparent border-0 shadow-none">
          <UiCardHeader>
            <div class="pb-4">
              <UiBadge>{{ badgeTitle }}</UiBadge>
            </div>

            <UiCardTitle>
              {{ title }}
            </UiCardTitle>
          </UiCardHeader>

          <UiCardContent class="text-muted-foreground w-[80%]">
            {{ description }}
          </UiCardContent>
        </UiCard>

        <NuxtImg src="https://shadcn-vue-landing-page.vercel.app/roboto.png" :alt="`Image describing ${title} `"
          class="w-[150px] md:w-[250px] lg:w-[300px] mx-auto -scale-x-100" width="150" height="350" />
        <div :class="[
          '-z-10 absolute right-0 w-44 h-72  lg:w-64 lg:h-80 rounded-full bg-primary/15 dark:bg-primary/10 blur-3xl',
          {
            'left-0': index % 2 !== 0,
          },
        ]" />
      </div>
    </div>
  </section>
</template>
