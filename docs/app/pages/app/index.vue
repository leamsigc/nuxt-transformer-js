<script lang="ts" setup>
/**
 *
 * Only user that are authenticated can access this page
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
import { signOut, useSession } from "~~/lib/auth-client";
const router = useRouter();

const HandleSingOut = async () => {
  await signOut();
  router.push("/login");
};

const { data: session, isPending, error } = await useSession(useFetch);
</script>

<template>
  <div>
    <UiButton class="px-5 py-3 border border-slate-400 rounded-lg" @click="HandleSingOut">
      Logout
    </UiButton>
    <section>Pending: {{ isPending }}</section>
    <section>Error: {{ error }}</section>
    <section>
      User:
      <code>{{ session?.user }}</code>
    </section>
  </div>
</template>
<style scoped></style>
