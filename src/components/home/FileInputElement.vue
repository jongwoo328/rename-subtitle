<template>
  <div class="w-100 file-element d-flex justify-content-start">
    <div class="delete-icon-wrap text-center" @click="onDeleteClick">
      <el-icon :size="14" color="#f03e3e">
        <Delete />
      </el-icon>
    </div>
    <p
      class="file-name m-0 fw-bold text-start ps-1 overflow-hidden"
      v-text="file.name"
    ></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { Delete } from "@element-plus/icons-vue";

export default defineComponent({
  props: {
    file: Object,
  },
  components: { Delete },
  emits: ["delete-file"],
  setup(props, { emit }) {
    const { file } = toRefs(props);
    function onDeleteClick() {
      emit("delete-file", file.value?.id);
    }
    return { onDeleteClick };
  },
});
</script>

<style lang="scss" scoped>
p {
  font-size: 14px;
}

.delete-icon-wrap {
  width: 20px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
}

.file-element {
  &:hover {
    background-color: #339af0;
    color: white;
  }
}

.file-name {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
