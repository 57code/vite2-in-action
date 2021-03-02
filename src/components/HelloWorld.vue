<template>
  <h1>{{ msg }}</h1>
  <p>{{ $store.state.counter }}</p>

  <!-- 国际化 -->
  <form>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="ja">ja</option>
    </select>
  </form>
  <p>{{ t('hello') }}</p>

  <el-button @click="state.count++">count is: {{ state.count }}</el-button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
const { locale, t } = useI18n({
  inheritLocale: true,
});
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
