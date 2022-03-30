<template>
  <div id="titleBar"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TitleBar",
});
</script>

<style lang="scss" scoped>
#titleBar {
  height: 30px;
  background-color: #495057;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
