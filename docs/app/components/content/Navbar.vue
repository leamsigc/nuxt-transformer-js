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

const mode = useColorMode();

const isOpen = ref<boolean>(false);

const { data } = await useAsyncData("header_links", () =>
  queryCollection("navigation").where('stem', '=', 'nav/headerLinks').first()
);

const { data: site } = await useAsyncData("meta_site", () =>
  queryCollection("navigation").where('stem', '=', 'nav/siteMeta').first()
);

</script>

<template>
  <section
    class="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-full mx-auto top-0 sticky border z-40 rounded-b-2xl flex justify-between items-center p-2 bg-card bg-blend-difference shadow-md"
    :class="{
      'shadow-light': mode.value === 'light',
      'shadow-dark': mode.value === 'dark',
    }">
    <header
      class="w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-2xl mx-auto sticky z-40  flex justify-between items-center p-2 ">
      <NuxtLink v-if="site?.siteMeta" href="/" class="font-bold text-lg flex items-center" aria-label="Home">
        <NuxtImg :src="site?.siteMeta.logo" :alt="site?.siteMeta.logoAlt" class="w-40 rounded-full max-h-16" width="160"
          height="60" />
      </NuxtLink>
      <!-- Mobile -->
      <div class="flex items-center xl:hidden">
        <UiSheet v-model:open="isOpen">
          <UiSheetTrigger as-child as="div">
            <Icon name="lucide:menu" class="cursor-pointer" @click="isOpen = true" />
          </UiSheetTrigger>

          <UiSheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card">
            <div>
              <UiSheetHeader class="mb-4 ml-4">
                <UiSheetTitle class="flex items-center">
                  <NuxtLink href="/" class="flex items-center">
                    <NuxtImg v-if="site?.siteMeta" :src="site?.siteMeta.logo" :alt="site?.siteMeta.logoAlt"
                      class="w-40 rounded-full" width="160" height="60" />
                  </NuxtLink>
                </UiSheetTitle>
              </UiSheetHeader>

              <div v-if="data" class="flex flex-col gap-2">
                <UiButton v-for="{ href, name } in data.headerLinks.ShortLinks" :key="name" as-child variant="ghost"
                  class="justify-start text-base">
                  <NuxtLink :href="href" @click="isOpen = false">
                    {{ name }}
                  </NuxtLink>
                </UiButton>
              </div>
            </div>

            <UiSheetFooter class="flex-col sm:flex-col justify-start items-start">
              <UiSeparator class="mb-2" />

              <ToggleTheme />
            </UiSheetFooter>
          </UiSheetContent>
        </UiSheet>
      </div>

      <!-- Desktop -->
      <UiNavigationMenu v-if="data" class="hidden xl:block">
        <UiNavigationMenuList>
          <UiNavigationMenuItem v-for="menuLink in data.headerLinks.MenuLinks" :key="menuLink.name">
            <template v-if="!menuLink.children">
              <UiNavigationMenuLink as-child>
                <UiButton as-child variant="ghost" class="justify-start text-base">
                  <NuxtLink :href="menuLink.href" prefetch>
                    {{ menuLink.name }}
                  </NuxtLink>
                </UiButton>
              </UiNavigationMenuLink>
            </template>
            <template v-else>
              <UiNavigationMenuTrigger class="bg-card text-base">
                {{ menuLink.name }}
              </UiNavigationMenuTrigger>
              <UiNavigationMenuContent>
                <div
                  class="grid grid-cols-1 gap-5 bg-background p-6 py-5 ring-1 ring-muted lg:w-[750px] lg:grid-cols-2 xl:w-[1000px] xl:grid-cols-3">
                  <NuxtImg src="/logo.png" :alt="menuLink.name" class="h-full w-full rounded-md object-cover" />
                  <div v-for="(item, index) in menuLink.children" :key="`${item.name}-${index}`">
                    <p class="mb-5 text-sm font-semibold capitalize text-primary">
                      {{ item.name }}
                    </p>
                    <ul class="flex w-full flex-col gap-2">
                      <li v-for="(child, k) in item.children" :key="k">
                        <UiNavigationMenuLink class="data-[active]:bg-muted/80" as-child v-if="child">
                          <NuxtLink :to="child?.href"
                            class="flex gap-4 rounded-md p-3 transition hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                            <Icon v-if="child.icon" :name="child.icon" class="mt-px h-5 w-5 shrink-0 text-primary" />
                            <div class="flex flex-col gap-1.5 leading-none">
                              <p class="text-sm font-semibold">
                                {{ child.name }}
                              </p>
                              <p class="text-sm text-muted-foreground" v-html="child.description" />
                            </div>
                          </NuxtLink>
                        </UiNavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </UiNavigationMenuContent>
            </template>
          </UiNavigationMenuItem>
        </UiNavigationMenuList>
      </UiNavigationMenu>

      <div class="hidden lg:flex">
        <ToggleTheme />

        <template v-if="data">
          <UiButton as-child size="sm" variant="ghost" :aria-label="action.label"
            v-for="action in data.headerLinks.Actions">
            <NuxtLink :aria-label="action.label" :href="action.href" :target="action.target || ''" :prefetch="false">
              <Icon :name="action.icon" v-if="action.icon" />
              {{ action.name }}
            </NuxtLink>
          </UiButton>
        </template>
      </div>
    </header>
  </section>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}
</style>
