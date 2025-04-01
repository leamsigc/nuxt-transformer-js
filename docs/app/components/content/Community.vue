<script lang="ts" setup>
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
interface Props {
  icon?: string;
  url?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "lucide:discord",
  url: "https://discord.com/",
  label: "Join our Discord",
});

const { icon, url, label } = toRefs(props);
</script>
<template>
  <section id="community" class="py-12">
    <UiSeparator show-buckle />
    <div class="container ">
      <div class="lg:w-[60%] mx-auto">
        <UiCard class="bg-background shadow-none text-center flex flex-col items-center justify-center border-0">
          <UiCardHeader>
            <UiCardTitle class="text-4xl md:text-5xl font-bold">
              <slot name="title">
                Ready to join this
                <span class="gradient-text"> Community? </span>
              </slot>
            </UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="lg:w-[80%] text-xl text-muted-foreground">
            <slot name="content">
              Join our vibrant Discord community! Connect, share, and grow with
              like-minded enthusiasts. Click to dive in! 🚀
            </slot>
          </UiCardContent>

          <UiCardFooter>
            <UiButton as-child>
              <NuxtLink :href="url" target="_blank">
                <Icon class="size-6 mr-2" :name="icon" />
                {{ label }}
              </NuxtLink>
            </UiButton>
          </UiCardFooter>
        </UiCard>
      </div>
    </div>
    <UiSeparator show-buckle />
  </section>
</template>
