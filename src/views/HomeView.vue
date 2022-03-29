<template>
  <div class="file-section w-100 d-flex p-2">
    <FileInput class="input-section w-50" title="동영상 파일" />
    <FileInput class="input-section w-50" title="자막 파일" />
  </div>

  <div class="run-wrap my-2 px-4">
    <el-button type="primary" size="large" class="w-100">RUN</el-button>
  </div>

  <div class="option-section pt-4 px-4">
    <h5>옵션</h5>
    <div class="option-element">
      <h6 class="text-start">파일 이름</h6>
      <el-radio-group
        class="d-flex flex-column align-items-start w-100"
        v-model="radio"
      >
        <el-radio label="video">동영상 따라가기</el-radio>
        <el-radio label="subtitle">자막 따라가기</el-radio>
        <el-radio label="custom">직접설정</el-radio>
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
export default defineComponent({
  name: "HomeView",
  components: { FileInput },
  setup() {
    const radio: Ref<string> = ref("video");
    const isCustomSelected = computed(() => radio.value === "custom");

    const customNameInput = ref("");
    const customEpisodeInput = ref(1);

    return { radio, isCustomSelected, customNameInput, customEpisodeInput };
  },
});
</script>

<style lang="scss" scoped>
.input-section {
  min-height: 300px;
}
</style>
