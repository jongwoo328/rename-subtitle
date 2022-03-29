<template>
  <TitleBar />
  <div class="container" style="padding-bottom: 50px">
    <router-view id="routerView" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TitleBar from "@/components/title/TitleBar.vue";

export default defineComponent({
  components: { TitleBar },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
