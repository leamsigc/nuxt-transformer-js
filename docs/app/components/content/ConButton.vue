<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "radix-vue";
import type { ButtonVariants } from "@/components/ui/button";
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
interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <UiButton v-bind="props">
    <slot name="default" />
  </UiButton>
</template>
<style scoped></style>
