<template>
  <el-dialog v-model="errorDialogVisible" :title="errorData.title" width="30%">
    <span v-text="errorData.message"></span>
    <template #footer>
      <div>
        <el-button
          class="w-100"
          type="primary"
          plain
          @click="errorDialogVisible = false"
          >OK</el-button
        >
      </div>
    </template>
  </el-dialog>
  <div class="file-section w-100 d-flex p-2">
    <FileInput ref="videos" class="input-section w-50" title="동영상 파일" />
    <FileInput ref="subtitles" class="input-section w-50" title="자막 파일" />
  </div>

  <div class="px-4 d-flex justify-content-end">
    <el-popover
      placement="top-end"
      title="주의사항"
      :width="330"
      trigger="hover"
      content="위 목록에 추가된 순서대로 이름이 변경됩니다."
    >
      <template #reference>
        <el-icon><warning-filled /></el-icon>
      </template>
    </el-popover>
  </div>

  <div class="run-wrap my-2 px-4">
    <el-button @click="onRunClicked" type="primary" size="large" class="w-100"
      >RUN</el-button
    >
  </div>

  <div class="option-section pt-4 px-4">
    <h5>옵션</h5>
    <div class="option-element">
      <h6 class="text-start">파일 이름</h6>
      <el-radio-group
        class="d-flex flex-column align-items-start w-100"
        v-model="nameOption"
      >
        <el-radio :label="fileNameOption.VIDEO">동영상 따라가기</el-radio>
        <el-radio :label="fileNameOption.SUBTITLE">자막 따라가기</el-radio>
        <el-radio :label="fileNameOption.CUSTOM">직접설정</el-radio>
      </el-radio-group>
      <div
        class="name-option-custom-input ps-3 d-flex flex-column align-items-start"
      >
        <div class="pt-1 w-100 d-flex justify-content-start">
          <div
            style="font-size: 14px"
            class="w-25 d-flex justify-content-start align-items-center"
          >
            이름
          </div>
          <el-input
            v-model="customNameInput"
            :disabled="!isCustomSelected"
            class="w-75"
          ></el-input>
        </div>
        <div class="pt-1 w-100 d-flex justify-content-start">
          <div
            style="font-size: 14px"
            class="w-25 d-flex justify-content-start align-items-center"
          >
            시작 에피소드
          </div>
          <el-input-number
            v-model="customEpisodeInput"
            :disabled="!isCustomSelected"
            class="w-75"
          ></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from "vue";
import FileInput from "@/components/home/FileInput.vue";
import { WarningFilled } from "@element-plus/icons-vue";
import { VueUploadItem } from "vue-upload-component";
import { ipcRenderer } from "electron";

export default defineComponent({
  name: "HomeView",
  components: { FileInput, WarningFilled },
  setup() {
    enum fileNameOption {
      VIDEO,
      SUBTITLE,
      CUSTOM,
    }

    const videos: Ref<typeof FileInput | null> = ref(null);
    const subtitles: Ref<typeof FileInput | null> = ref(null);

    const nameOption: Ref<number> = ref(fileNameOption.VIDEO);
    const isCustomSelected = computed(
      () => nameOption.value === fileNameOption.CUSTOM
    );

    const customNameInput = ref("");
    const customEpisodeInput = ref(1);

    let errorData = ref({
      title: "title",
      message: "message",
    });
    const errorDialogVisible = ref(false);

    function assertError(title: string, message: string) {
      errorData.value = {
        title,
        message,
      };
      errorDialogVisible.value = true;
    }

    async function onRunClicked() {
      if (videos.value === null || subtitles.value === null) {
        assertError("에러", "파일을 가져올 수 없습니다.");
        return;
      }

      let videoList: Array<VueUploadItem> = videos.value.getFiles();
      let subtitleList: Array<VueUploadItem> = subtitles.value.getFiles();

      if (videoList.length !== subtitleList.length) {
        assertError("에러", "파일 수가 맞지 않습니다.");
        return;
      }

      if (videoList.length === 0) {
        assertError("에러", "추가된 파일이 없습니다.");
        return;
      }

      const taskList: Array<Promise<void>> = [];
      Array(videoList.length)
        .fill(null)
        .forEach((_, idx) => {
          const videoFile = videoList[idx].file as File;
          const subtitleFile = subtitleList[idx].file as File;

          if (nameOption.value === fileNameOption.VIDEO) {
            taskList.push(
              ipcRenderer.invoke("rename-video", {
                data: {
                  videoFile: { path: videoFile.path },
                  subtitleFile: { path: subtitleFile.path },
                },
              })
            );
          } else if (nameOption.value === fileNameOption.SUBTITLE) {
            taskList.push(
              ipcRenderer.invoke("rename-subtitle", {
                data: {
                  videoFile: { path: videoFile.path },
                  subtitleFile: { path: subtitleFile.path },
                },
              })
            );
          } else {
            taskList.push(
              ipcRenderer.invoke("rename-custom", {
                data: {
                  videoFile: { path: videoFile.path },
                  subtitleFile: { path: subtitleFile.path },
                  customData: {
                    customNameInput: customNameInput.value,
                    customEpisodeInput: customEpisodeInput.value + idx,
                  },
                },
              })
            );
          }
        });

      await Promise.all(taskList).then(() => {
        assertError("변경완료", "파일명 변경이 완료되었습니다.");
      });
    }

    return {
      nameOption,
      errorDialogVisible,
      isCustomSelected,
      customNameInput,
      customEpisodeInput,
      errorData,
      onRunClicked,
      videos,
      subtitles,
      fileNameOption,
    };
  },
});
</script>

<style lang="scss" scoped>
.input-section {
  min-height: 300px;
}
</style>
