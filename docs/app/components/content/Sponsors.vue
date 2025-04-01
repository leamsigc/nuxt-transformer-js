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
interface ReviewCardProps {
  img: string;
  name: string;
  username: string;
  body: string;
}
interface Props {
  reviews?: ReviewCardProps[];
}
const props = withDefaults(defineProps<Props>(), {
  reviews: () => [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://i.pravatar.cc/250?img=58",
    },
    {
      name: "Luna",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://i.pravatar.cc/250?img=58",
    },
    {
      name: "Jack Risider",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://i.pravatar.cc/250?img=58",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://i.pravatar.cc/250?img=51",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://i.pravatar.cc/250?img=50",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://i.pravatar.cc/250?img=50",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://i.pravatar.cc/250?img=50",
    },
  ],
});

const { reviews } = toRefs(props);

const timeInMiliseconds = computed(() => {
  return reviews.value.length * 15;
});
</script>

<template>
  <section id="sponsors" class="max-w-[75%] mx-auto pb-24 sm:pb-32">
    <h2 class="text-lg md:text-xl text-center mb-6">Our Platinum Sponsors</h2>
    <div
      class="relative flex w-[300px] lg:w-full flex-col items-center justify-center overflow-hidden rounded-lg mx-auto container"
    >
      <Marquee pause-on-hover :style="`--duration:${timeInMiliseconds}s`">
        <div v-for="{ img, name, username, body } in reviews" :key="username">
          <ReviewCard
            :key="username"
            :username="username"
            :img="img"
            :name="name"
            :body="body"
          />
        </div>
      </Marquee>
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
      />
    </div>
  </section>
</template>
