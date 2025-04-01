<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { PaginationNext, type PaginationNextProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '~~/lib/utils'

const props = withDefaults(defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationNext v-bind="delegatedProps">
    <UiButton
      :class="cn('w-10 h-10 p-0', props.class)"
      variant="outline"
    >
      <slot>
        <ChevronRight class="h-4 w-4" />
      </slot>
    </UiButton>
  </PaginationNext>
</template>
