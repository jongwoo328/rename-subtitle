<template>
  <TitleBar />
  <div class="container view-wrap">
    <div class="float-end">
      <span>{{ version }}</span>
    </div>
    <router-view id="routerView" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TitleBar from "@/components/title/TitleBar.vue";

export default defineComponent({
  components: { TitleBar },
  setup() {
    const version = computed(() => process.env.VUE_APP_VERSION);
    return { version };
  },
});
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.view-wrap {
  margin-top: 30px;
}
</style>
