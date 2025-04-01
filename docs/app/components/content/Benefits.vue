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
import { Sparkle, Tag, Paintbrush, Blocks, LineChart, Wallet } from 'lucide-vue-next'

interface BenefitsProps {
  icon: string
  title: string
  description: string
}
interface Props {
  list?: BenefitsProps[]
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [
    {
      icon: 'blocks',
      title: 'Install',
      description:
        'Install the module `nuxt-transformersjs`',
    },
    {
      icon: 'lineChart',
      title: 'Update nuxt config',
      description:
        'Update the nuxt config to add the module `nuxt-transformersjs` to your project',
    },
    {
      icon: 'wallet',
      title: 'Read documentation',
      description:
        'Read the documentation and start using the provided composables',
    },
    {
      icon: 'sparkle',
      title: 'Enjoy',
      description:
        'Copy paste the examples and enjoy the process',
    },
  ],
})
const { list } = toRefs(props)

const iconMap: Record<
  string,
  | typeof Sparkle
  | typeof Tag
  | typeof Paintbrush
  | typeof Blocks
  | typeof LineChart
  | typeof Wallet
> = {
  sparkle: Sparkle,
  tag: Tag,
  paintbrush: Paintbrush,
  blocks: Blocks,
  lineChart: LineChart,
  wallet: Wallet,
}
</script>

<template>
  <section
    id="benefits"
    class="container py-24 sm:py-32"
  >
    <div class="grid lg:grid-cols-2 place-items-center lg:gap-24">
      <div>
        <h2 class="text-lg text-primary mb-2 tracking-wider">
          <slot name="title">
            Features
          </slot>
        </h2>

        <h3 class="text-3xl md:text-4xl font-bold mb-4">
          <slot name="subtitle">
            From audio transcription to image segmentation
          </slot>
        </h3>
        <p class="text-xl text-muted-foreground mb-8">
          <slot name="description">
            Run popular AI models directly in your browser with this Nuxt module powered by Transformer.js. Perform AI
            tasks efficiently using web workers while keeping your main thread responsive.
          </slot>
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-4 w-full">
        <ShinyCard
          v-for="({ icon, title, description }, index) in list"
          :key="title"
          :show-bg="false"
        >
          <UiCard
            class="bg-muted/50 dark:bg-card hover:bg-background dark:hover:bg-background transition-all delay-75 group/number h-full"
          >
            <UiCardHeader>
              <div class="flex justify-between">
                <component
                  :is="iconMap[icon]"
                  class="size-8 mb-6 text-primary"
                />

                <span
                  class="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30"
                >
                  0{{ index + 1 }}
                </span>
              </div>

              <UiCardTitle>{{ title }}</UiCardTitle>
            </UiCardHeader>

            <UiCardContent class="text-muted-foreground">
              {{ description }}
            </UiCardContent>
          </UiCard>
        </ShinyCard>
      </div>
    </div>
  </section>
</template>
