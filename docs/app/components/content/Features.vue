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
import {
  Paintbrush,
  MessageCircle,
  TabletSmartphone,
  BadgeCheck,
  Goal,
  PictureInPicture,
  MousePointerClick,
  Newspaper,
} from "lucide-vue-next";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}
interface Props {
  list?: FeaturesProps[];
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [
    {
      icon: "tabletSmartphone",
      title: "Mobile Friendly",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, consectetur.",
    },
    {
      icon: "badgeCheck",
      title: "Social Proof",
      description:
        "Lorem ipsum dolor sit amet consectetur. Natus consectetur, odio ea accusamus aperiam.",
    },
    {
      icon: "goal",
      title: "Targeted Content",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. odio ea accusamus aperiam.",
    },
    {
      icon: "pictureInPicture",
      title: "Strong Visuals",
      description:
        "Lorem elit. A odio velit cum aliquam. Natus consectetur dolores, odio ea accusamus aperiam.",
    },
    {
      icon: "mousePointerClick",
      title: "Clear CTA",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing. odio ea accusamus consectetur.",
    },
    {
      icon: "newspaper",
      title: "Clear Headline",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur.",
    },
  ],
});

const iconMap: Record<
  string,
  | typeof TabletSmartphone
  | typeof BadgeCheck
  | typeof Goal
  | typeof PictureInPicture
  | typeof Paintbrush
  | typeof MousePointerClick
  | typeof MessageCircle
  | typeof Newspaper
> = {
  tabletSmartphone: TabletSmartphone,
  badgeCheck: BadgeCheck,
  goal: Goal,
  pictureInPicture: PictureInPicture,
  paintbrush: Paintbrush,
  mousePointerClick: MousePointerClick,
  messageCircle: MessageCircle,
  newspaper: Newspaper,
};
const { list } = toRefs(props);
</script>

<template>
  <section id="features" class="container py-24 sm:py-32">
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      <slot name="title"> Features </slot>
    </h2>

    <h3 class="text-3xl md:text-4xl text-center font-bold mb-4">
      <slot name="subtitle">
        What Makes Us Different
      </slot>
    </h3>

    <h4 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      <slot name="description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, odit
        similique quasi sint reiciendis quidem iure veritatis optio facere tenetur.
      </slot>
    </h4>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="{ icon, title, description } in list" :key="title">
        <UiCard class="h-full bg-background border-0 shadow-none">
          <UiCardHeader class="flex justify-center items-center">
            <div class="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
              <component :is="iconMap[icon]" class="size-6 text-primary" />
            </div>

            <UiCardTitle>
              {{ title }}
            </UiCardTitle>
          </UiCardHeader>

          <UiCardContent class="text-muted-foreground text-center">
            {{ description }}
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </section>
  <div id="container" class="container w-screen min-h-screen p-12 grid grid-cols-12 gap-6">
    <ShinyCard class="h-80 col-span-8" />
    <ShinyCard class="h-80 col-span-4" />
    <ShinyCard class="h-80 col-span-6" />
    <ShinyCard class="h-80 col-span-6" />
    <ShinyCard class="h-80 col-span-4" />
    <ShinyCard class="h-80 col-span-8" />
  </div>
</template>

<style lang="less" scoped></style>
