<template>
  <UiCard class="bg-muted/30 relative overflow-hidden [&:not(:first-child)]:mt-5 [&:not(:last-child)]:mb-5" :class="[
    (inGroup || inTree) && 'mb-0 rounded-t-none border-none shadow-none',
    inStack && 'mb-0 rounded-none border-none shadow-none',
  ]">
    <div v-if="!inGroup && filename" class="bg-background flex items-center border-b py-2 pl-3 pr-2 font-mono text-sm">
      <SmartIcon v-if="icon" :name="icon" class="mr-1.5" />
      <span>{{ filename }}</span>
      <CodeCopy :code class="ml-auto" />
    </div>

    <div v-if="!filename" class="absolute right-2 top-2 z-10">
      <CodeCopy :code />
    </div>

    <div v-if="parsedMeta.has('collapse')">
      <div
        :style="[((parsedMeta.has('height') || height) && !expanded) ? `height: ${height || parsedMeta.get('height')}px` : undefined]"
        class="overflow-x-auto overflow-y-hidden py-3 text-sm" :class="[
          !inGroup && !inTree && !filename && 'inline-copy',
          !language && 'pl-3',
          parsedMeta.has('line-numbers') && 'show-line-number',
          expanded && 'pb-14',
        ]">
        <slot />
      </div>
    </div>
    <UiScrollArea v-else
      :style="[(parsedMeta.has('height') || height) && `height: ${height || parsedMeta.get('height')}px`]">
      <div class="overflow-x-auto py-3 text-sm" :class="[
        !inGroup && !inTree && !filename && 'inline-copy',
        !language && 'pl-3',
        parsedMeta.has('line-numbers') && 'show-line-number',
      ]">
        <slot />
      </div>
      <ScrollBar orientation="horizontal" />
    </UiScrollArea>

    <div v-if="parsedMeta.has('collapse')"
      class="absolute inset-x-0 bottom-0 flex h-16 items-center justify-center rounded-b"
      :class="[!expanded && 'from-muted bg-gradient-to-t dark:from-zinc-950']">
      <UiButton size="sm" variant="outline" @click="expanded = !expanded">
        <Icon :name="expanded ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" />
        {{ expanded ? $t('Collapse') : $t('Expand') }}
      </UiButton>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import type { BuiltinLanguage } from 'shiki';
import ScrollBar from '../ui/scroll-area/ScrollBar.vue';
const codeIcon = {
  'package.json': 'vscode-icons:file-type-node',
  'tsconfig.json': 'vscode-icons:file-type-tsconfig',
  '.npmrc': 'vscode-icons:file-type-npm',
  '.editorconfig': 'vscode-icons:file-type-editorconfig',
  '.eslintrc': 'vscode-icons:file-type-eslint',
  '.eslintrc.cjs': 'vscode-icons:file-type-eslint',
  '.eslintignore': 'vscode-icons:file-type-eslint',
  'eslint.config.js': 'vscode-icons:file-type-eslint',
  'eslint.config.mjs': 'vscode-icons:file-type-eslint',
  'eslint.config.cjs': 'vscode-icons:file-type-eslint',
  '.gitignore': 'vscode-icons:file-type-git',
  'yarn.lock': 'vscode-icons:file-type-yarn',
  '.env': 'vscode-icons:file-type-dotenv',
  '.env.example': 'vscode-icons:file-type-dotenv',
  '.vscode/settings.json': 'vscode-icons:file-type-vscode',
  'nuxt': 'vscode-icons:file-type-nuxt',
  '.nuxtrc': 'vscode-icons:file-type-nuxt',
  '.nuxtignore': 'vscode-icons:file-type-nuxt',
  'nuxt.config.js': 'vscode-icons:file-type-nuxt',
  'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
  'nuxt.schema.ts': 'vscode-icons:file-type-nuxt',
  'tailwind.config.js': 'vscode-icons:file-type-tailwind',
  'tailwind.config.ts': 'vscode-icons:file-type-tailwind',
  'vue': 'vscode-icons:file-type-vue',
  'ts': 'vscode-icons:file-type-typescript',
  'tsx': 'vscode-icons:file-type-typescript',
  'mjs': 'vscode-icons:file-type-js',
  'cjs': 'vscode-icons:file-type-js',
  'js': 'vscode-icons:file-type-js',
  'jsx': 'vscode-icons:file-type-js',
  'md': 'vscode-icons:file-type-markdown',
  'mdc': 'vscode-icons:file-type-markdown',
  'css': 'vscode-icons:file-type-css',
  'py': 'vscode-icons:file-type-python',
  'npm': 'vscode-icons:file-type-npm',
  'pnpm': 'vscode-icons:file-type-pnpm',
  'npx': 'vscode-icons:file-type-npm',
  'yarn': 'vscode-icons:file-type-yarn',
  'bun': 'vscode-icons:file-type-bun',
  'yml': 'vscode-icons:file-type-yaml',
  'json': 'vscode-icons:file-type-json',
  'terminal': 'lucide:terminal',
};
const {
  code = '',
  inGroup = false,
  inTree = false,
  inStack = false,
  language,
  filename,
  meta,
} = defineProps<{
  code?: string;
  language?: BuiltinLanguage;
  filename?: string;
  inGroup?: boolean;
  inTree?: boolean;
  inStack?: boolean;
  highlights?: number[];
  meta?: string;
  height?: number;
}>();

const parsedMeta = computed(() => {
  const split = meta?.split(' ') ?? [];
  const params = new Map<string, string | undefined>();

  for (const param of split) {
    const [key, val] = param.split('=');
    params.set(key, val);
  }

  return params;
});

const expanded = ref(false);

const iconMap = new Map(Object.entries(codeIcon));
const icon = computed(() => {
  const filenameLow = filename?.toLowerCase();
  return parsedMeta.value.get('icon') || (filenameLow && iconMap.get(filenameLow)) || (language && iconMap.get(language));
});
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.shiki .line.highlight {
  background-color: hsl(var(--muted) / 0.9);
}

.shiki .line {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.inline-copy .line {
  padding-right: 2.75rem;
}

.show-line-number .line::before {
  content: attr(line);
  @apply text-sm w-5 inline-block text-right mr-4 text-muted-foreground;
}
</style>
