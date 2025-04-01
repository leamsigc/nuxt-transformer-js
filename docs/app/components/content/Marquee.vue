<script lang="ts" setup>
import { cn } from "~~/lib/utils";

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

interface MarqueeProps {
  class?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
  class: "",
});

const className = cn("flex shrink-0 justify-around [gap:var(--gap)]", {
  "animate-marquee-vertical flex-col": props.vertical,
  "animate-marquee flex-row": !props.vertical,
  "[animation-direction:reverse]": props.reverse,
  "group-hover:[animation-play-state:paused]": props.pauseOnHover,
});
</script>

<template>
  <div
    v-bind="props"
    :class="
      cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !props.vertical,
          'flex-col': props.vertical,
        },
        props.class
      )
    "
  >
    <div v-for="i in Array(props.repeat).fill(0)" :key="i">
      <div :key="i" :class="className">
        <slot />
      </div>
    </div>
  </div>
</template>
