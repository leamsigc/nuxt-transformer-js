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
const route = useRoute()
const { data } = await useAsyncData(`${route.path}-blog-hero`, () =>
  queryCollection('content').path(route.path)
    .select('title', 'description', 'image', 'publishedAt', 'author')
    .first())
</script>

<template>
  <section
    v-if="data"
    class="space-y-12 md:space-y-20"
  >
    <div class="mx-auto max-w-3xl px-8">
      <div class="pt-12 ">
        <div class="flex flex-col justify-center items-center space-y-3 md:space-y-6 relative">
          <p class="text-aquamarine text-sm">
            <time :datetime="data.publishedAt">{{ new Date(data.publishedAt).toLocaleDateString() }}</time>
          </p>
          <h1 class="font-bold text-2xl md:text-5xl text-center">
            {{ data.title }}
          </h1>
          <div class="flex flex-col md:flex-row gap-3 md:gap-5">
            <div class="flex items-center space-x-2.5">
              <UiAvatar size="base">
                <UiAvatarImage
                  :src="data.author.avatar"
                  :alt="data.author.name"
                />
                <UiAvatarFallback>{{ data.author.name.slice(0, 1) }}</UiAvatarFallback>
              </UiAvatar>
              <section class="grid">
                <span class="dark:text-white/70">{{ data.author.name }}</span>
                <span class="dark:text-white/30 text-sm">{{ data.author.role }}</span>
                <NuxtLink
                  :href="data.author.social"
                  target="_blank"
                  class="dark:text-white/30 text-sm"
                >
                  {{ data.author.social }}
                </NuxtLink>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-5xl px-8 my-10 pb-10">
      <div
        class="object-contain bg-[#26303B] aspect-video rounded-xl overflow-hidden flex items-center justify-center"
      >
        <NuxtPicture
          :alt="data.title"
          loading="eager"
          width="1080"
          height="900"
          class="w-full h-full"
          style="color: transparent;"
          :src="data.image.src"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
