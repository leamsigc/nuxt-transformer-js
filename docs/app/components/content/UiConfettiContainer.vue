<script lang="ts" setup>
/**
 *
 * The container for the Confetti.
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface Actions {
  cannonSide: () => void
  randomCannon: () => void
  fireworkCannon: () => void
  firework: (e?: Event) => void
}

interface Props {
  confetti?: keyof Actions
}

const props = withDefaults(defineProps<Props>(), {
  confetti: "cannonSide",
});

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const action: Actions = {
  cannonSide: () => {
    const end = Date.now() + 5 * 1000;
    function frame() {
      useConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        // colors: colors,
      });
      useConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        // colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  },
  randomCannon: () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      useConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      useConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  },
  fireworkCannon: () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      useConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      useConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  },
  firework: (_?: Event) => {
    useConfetti({ particleCount: 100, spread: 90, origin: { y: 0.6, x: 0.7 } });
  },
};

onMounted(() => {
  action[props.confetti]();
});
defineExpose({
  action,
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped></style>
