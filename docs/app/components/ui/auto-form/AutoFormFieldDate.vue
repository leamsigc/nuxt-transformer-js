<script setup lang="ts">
import type { FieldProps } from "./interface";
import { cn } from "~~/lib/utils";

import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { beautifyObjectName } from "./utils";

defineProps<FieldProps>();

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});
</script>

<template>
  <UiFormField v-slot="slotProps" :name="fieldName">
    <UiFormItem>
      <UiAutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </UiAutoFormLabel>
      <UiFormControl>
        <slot v-bind="slotProps">
          <div>
            <UiPopover>
              <UiPopoverTrigger as-child :disabled="disabled">
                <UiButton
                  variant="outline"
                  :class="
                    cn(
                      'w-full justify-start text-left font-normal',
                      !slotProps.componentField.modelValue && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" :size="16" />
                  {{
                    slotProps.componentField.modelValue
                      ? df.format(
                          slotProps.componentField.modelValue.toDate(getLocalTimeZone())
                        )
                      : "Pick a date"
                  }}
                </UiButton>
              </UiPopoverTrigger>
              <UiPopoverContent class="w-auto p-0">
                <UiCalendar initial-focus v-bind="slotProps.componentField" />
              </UiPopoverContent>
            </UiPopover>
          </div>
        </slot>
      </UiFormControl>

      <UiFormDescription v-if="config?.description">
        {{ config.description }}
      </UiFormDescription>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
</template>
