<script setup lang="jsx">
import { defineComponent } from "vue";
import logo from "./assets/logo.png";

export default defineComponent({
  render: () => (
    <>
      <img alt="Vue logo" src={logo} />
      <router-view></router-view>
    </>
  ),
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
