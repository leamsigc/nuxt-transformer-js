<script setup lang="ts" generic="T extends z.ZodAny">
import type { Config, ConfigItem } from "./interface";
import { PlusIcon, TrashIcon } from "lucide-vue-next";
import { FieldArray, FieldContextKey, useField } from "vee-validate";
import { computed, provide } from "vue";
import * as z from "zod";
import { beautifyObjectName, getBaseType } from "./utils";

const props = defineProps<{
  fieldName: string;
  required?: boolean;
  config?: Config<T>;
  schema?: z.ZodArray<T>;
  disabled?: boolean;
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isZodArray(item: z.ZodArray<any> | z.ZodDefault<any>): item is z.ZodArray<any> {
  return item instanceof z.ZodArray;
}

function isZodDefault(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: z.ZodArray<any> | z.ZodDefault<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): item is z.ZodDefault<any> {
  return item instanceof z.ZodDefault;
}

const itemShape = computed(() => {
  if (!props.schema) return;

  const schema: z.ZodAny = isZodArray(props.schema)
    ? props.schema._def.type
    : isZodDefault(props.schema)
    ? // @ts-expect-error missing schema
      props.schema._def.innerType._def.type
    : null;

  return {
    type: getBaseType(schema),
    schema,
  };
});

const fieldContext = useField(props.fieldName);
// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);
</script>

<template>
  <FieldArray v-slot="{ fields, remove, push }" as="section" :name="fieldName">
    <slot v-bind="props">
      <UiAccordion
        type="multiple"
        class="w-full"
        collapsible
        :disabled="disabled"
        as-child
      >
        <UiFormItem>
          <UiAccordionItem :value="fieldName" class="border-none">
            <UiAccordionTrigger>
              <UiAutoFormLabel class="text-base" :required="required">
                {{ schema?.description || beautifyObjectName(fieldName) }}
              </UiAutoFormLabel>
            </UiAccordionTrigger>

            <UiAccordionContent>
              <template v-for="(field, index) of fields" :key="field.key">
                <div class="mb-4 p-1">
                  <UiAutoFormField
                    :field-name="`${fieldName}[${index}]`"
                    :label="fieldName"
                    :shape="itemShape!"
                    :config="config as ConfigItem"
                  />

                  <div class="!my-4 flex justify-end">
                    <UiButton
                      type="button"
                      size="icon"
                      variant="secondary"
                      @click="remove(index)"
                    >
                      <TrashIcon :size="16" />
                    </UiButton>
                  </div>
                  <UiSeparator v-if="!field.isLast" />
                </div>
              </template>

              <UiButton
                type="button"
                variant="secondary"
                class="mt-4 flex items-center"
                @click="push(null)"
              >
                <PlusIcon class="mr-2" :size="16" />
                Add
              </UiButton>
            </UiAccordionContent>

            <UiFormMessage />
          </UiAccordionItem>
        </UiFormItem>
      </UiAccordion>
    </slot>
  </FieldArray>
</template>
