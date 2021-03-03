<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"
      >Vite Documentation</a
    >
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

  <label>{{ t("language") }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="ja">ja</option>
  </select>
  <p>{{ t("hello") }}</p>
</template>

<script setup>
import { defineProps, reactive, ref, getCurrentInstance, computed } from "vue";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });

// 获取组件实例
const ins = getCurrentInstance()

function useI18n() {
  const locale = ref('en')
  // 获取i18n资源
  const i18n = ins.type.i18n

  // 编写t函数，根据传入msg，传出对应的翻译
  const t = (msg) => {
    return computed(() => i18n[locale.value][msg]).value
  }
  
  return { locale, t }
}

const { locale, t } = useI18n();
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>

<style scoped>
a {
  color: #42b983;
}
</style>
