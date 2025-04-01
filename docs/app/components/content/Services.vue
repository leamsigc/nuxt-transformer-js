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
import { Badge } from "@/components/ui/badge";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}
interface Props {
  list?: ServiceProps[];
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [
    {
      title: "Custom Domain Integration",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit adipisicing.",
      pro: 0,
    },
    {
      title: "Social Media Integrations",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, dicta.",
      pro: 0,
    },
    {
      title: "Email Marketing Integrations",
      description: "Lorem dolor sit amet adipisicing.",
      pro: 0,
    },
    {
      title: "SEO Optimization",
      description: "Lorem ipsum dolor sit amet consectetur.",
      pro: 1,
    },
  ],
});

const { list } = toRefs(props);
</script>

<template>
  <section id="services" class="container py-24 sm:py-32">
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      <slot name="title"> Services </slot>
    </h2>

    <h3 class="text-3xl md:text-4xl text-center font-bold mb-4">
      <slot name="subtitle"> Grow Your Business </slot>
    </h3>
    <h4 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      <slot name="description">
        From marketing and sales to operations and strategy, we have the expertise to help
        you achieve your goals.
      </slot>
    </h4>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" />

    <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
      <div v-for="{ title, description, pro } in list" :key="title">
        <UiCard class="bg-muted/60 dark:bg-card h-full relative">
          <UiCardHeader>
            <UiCardTitle>{{ title }}</UiCardTitle>
            <UiCardDescription>{{ description }}</UiCardDescription>
          </UiCardHeader>
          <Badge v-if="pro === ProService.YES" variant="secondary" class="absolute -top-2 -right-3">PRO</Badge>
        </UiCard>
      </div>
    </div>
  </section>
</template>
