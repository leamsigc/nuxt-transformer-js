<script setup lang="ts">
import { ChevronsLeft } from 'lucide-vue-next'
import { PaginationFirst, type PaginationFirstProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~~/lib/utils'

const props = withDefaults(defineProps<PaginationFirstProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationFirst v-bind="delegatedProps">
    <UiButton
      :class="cn('w-10 h-10 p-0', props.class)"
      variant="outline"
    >
      <slot>
        <ChevronsLeft class="h-4 w-4" />
      </slot>
    </UiButton>
  </PaginationFirst>
</template>
