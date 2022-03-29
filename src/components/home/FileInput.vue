<template>
  <div class="p-3">
    <h4>{{ props.title }}</h4>
    <div class="d-flex file-upload-wrap">
      <div>
        <div class="file-element" v-for="file in files" :key="file">
          {{ file.name }}
        </div>
        <file-upload
          class="file-upload w-100 h-100"
          ref="upload"
          :drop="true"
          v-model="files"
          multiple
        >
          <div>
            <p v-if="!isFileExist">file upload</p>
          </div>
        </file-upload>
      </div>
    </div>
    <div class="w-100 mt-2 d-flex justify-content-end">
      <el-button @click="onDeleteAll" type="danger" size="small"
        >모두 삭제</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "FileInput",
  props: {
    title: String,
  },
  setup(props) {
    const files = ref([]);
    const isFileExist = computed(() => Boolean(files.value.length));

    function onDeleteAll() {
      files.value = [];
    }

    return { props, files, isFileExist, onDeleteAll };
  },
});
</script>

<style lang="scss" scoped>
.file-upload-wrap {
  border: 1px solid black;
  min-height: 300px;

  &::v-deep {
    .file-upload {
      width: 100%;
      height: 100%;
    }
    label {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
