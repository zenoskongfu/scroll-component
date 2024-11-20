<script setup lang="ts">
const props = defineProps<{
  data: {
    imgSrc: string;
    name: string;
    msg?: string;
    enableEdit?: boolean;
  };
}>();

const emit = defineEmits(["edit-name"]);

const isEdit = ref(false);
const localName = ref(props.data.name);
const inputRef = ref();
const iconClick = () => {
  isEdit.value = true;

  setTimeout(() => {
    inputRef.value.focus();
  });
};

const inputBlur = () => {
  isEdit.value = false;

  if (props.data.name !== localName.value) {
    emit("edit-name", localName.value);
  }
};
</script>

<template>
  <div class="chat-item">
    <div class="left-content">
      <img class="chat-item-img" :src="props.data.imgSrc" alt="avator" />
      <div class="content">
        <div class="content-name">
          <div class="content-name-text" v-if="!isEdit">{{ localName }}</div>
          <el-input
            v-else
            ref="inputRef"
            v-model="localName"
            @blur="inputBlur"
            @keydown.enter="inputBlur"
          />
          <el-icon
            :size="12"
            color="gray"
            v-if="props.data.enableEdit && isEdit == false"
            @click="iconClick"
          >
            <EditPen />
          </el-icon>
        </div>

        <div class="content-msg">{{ props.data.msg }}</div>
      </div>
    </div>

    <div class="button-container">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-item {
  height: fit-content;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  border-bottom: none;
  padding-right: 12px;

  background-color: white;

  .left-content {
    display: flex;
    align-items: center;
  }

  &:last-child {
    border-bottom: 1px solid lightgray;
  }

  .chat-item-img {
    $size: 48px;
    border-radius: 50%;
    width: $size;
    height: $size;

    margin: 12px;
  }

  .content {
    user-select: none;
    .content-name {
      text-align: left;
      display: flex;
      align-items: center;

      .content-name-text {
        margin-right: 0.5em;

        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .content-msg {
      font-size: 12px;
      color: gray;
      text-align: left;
    }
  }
}
</style>
