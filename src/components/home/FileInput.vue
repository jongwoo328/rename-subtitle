<template>
  <div class="p-3">
    <h4 class="fw-bold">{{ props.title }}</h4>
    <div class="d-flex file-upload-wrap">
      <div class="overflow-auto w-100 position-relative">
        <div
          class="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center"
          style="top: 0"
          v-if="!files.length"
        >
          <p class="mb-0">클릭하여 업로드</p>
          <p class="mb-0">또는 드래그 앤 드롭</p>
        </div>
        <div v-else>
          <FileInputElement
            @delete-file="onDeleteFile"
            v-for="file in files"
            :key="file.id"
            :file="file"
          />
        </div>
        <file-upload
          class="file-upload w-100"
          style="height: 97%"
          ref="upload"
          :drop="true"
          v-model="files"
          multiple
        >
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
import { computed, defineComponent, ref, Ref } from "vue";
import FileInputElement from "@/components/home/FileInputElement.vue";
import { VueUploadItem } from "vue-upload-component";

export default defineComponent({
  name: "FileInput",
  props: {
    title: String,
  },
  components: { FileInputElement },
  setup(props) {
    const files: Ref<Array<VueUploadItem>> = ref([]);
    const isFileExist = computed(() => Boolean(files.value.length));

    function onDeleteAll() {
      files.value = [];
    }

    function onDeleteFile(fileId: string) {
      let idx = -1;
      files.value.forEach((f: VueUploadItem, i) => {
        if (f.id === fileId) {
          idx = i;
        }
      });
      files.value.splice(idx, 1);
    }

    return { props, files, isFileExist, onDeleteAll, onDeleteFile };
  },
});
</script>

<style lang="scss" scoped>
.file-upload-wrap {
  border: 1px solid black;
  min-height: 300px;
  max-height: 450px;
  height: 50vh;

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
