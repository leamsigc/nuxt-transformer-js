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
</script>

<template>
    <main class="blog">
        <Navbar />
        <section class="mx-auto max-w-5xl px-6 prose pt-6 text-sm md:text-xl dark:prose-invert">
            <slot />
        </section>
        <TheFooter />
    </main>
</template>
<style scoped></style>