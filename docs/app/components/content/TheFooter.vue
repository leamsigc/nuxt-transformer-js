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
const { data } = await useAsyncData("footer_links", () =>
  queryCollection("navigation").where('stem', '=', 'nav/links').first()
);
const { data: site } = await useAsyncData("meta_site", () =>
  queryCollection("navigation").where('stem', '=', 'nav/siteMeta').first()
);

</script>

<template>
  <footer id="footer" class="container py-24 pb-16 sm:py-32 sm:pb-24">
    <div class="p-10 bg-muted/50 dark:bg-card border rounded-2xl">
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div class="col-span-full xl:col-span-2">
          <a href="#" class="flex font-bold items-center">
            <NuxtLink v-if="site" href="/" class="font-bold text-lg flex items-center">
              <NuxtImg :src="site.siteMeta.logo" :alt="site.siteMeta.logoAlt" class="w-64 rounded-full" width="160"
                height="60" />
            </NuxtLink>
          </a>
        </div>

        <div class="flex flex-col gap-2 " v-for="{ title, links } in data?.footerLinks" :key="title">
          <h3 class="font-bold text-lg">{{ title }}</h3>
          <div v-for="{ name, url, icon } in links" :key="name">
            <NuxtLink :href="url" class="opacity-60 hover:opacity-100" :arial-label="name" :title="name">
              <Icon :name="icon" class="mr-2" v-if="icon" />
              {{ name }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <UiSeparator class="my-6" />
      <section className="">
        <h3 class="">
          &copy; 2024 Designed and developed by
          <a target="_blank" href="https://github.com/leoMirandaa"
            className="text-primary transition-all border-primary hover:border-b-2">
            Leo Miranda
          </a>
          Port to nuxt 4 by
          <a target="_blank" href="https://github.com/leamsigc"
            className="text-primary transition-all border-primary hover:border-b-2">
            Leamsigc
          </a>
        </h3>
      </section>
    </div>
  </footer>
</template>
