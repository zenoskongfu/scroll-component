<script setup lang="ts">
const props = defineProps(["listData"]);

const revertFnRef = ref();
const moveToEnd = (revertFn: Function) => {
  if (
    typeof revertFnRef.value == "function" &&
    revertFnRef.value !== revertFn
  ) {
    revertFnRef.value();
  }
  revertFnRef.value = revertFn;
};
</script>

<template>
  <div class="list" style="overflow: hidden">
    <div
      class="list-item-wrapper"
      v-for="(item, index) in props.listData"
      :key="index"
    >
      <SlidingMove
        direction="left"
        end="20%"
        :move-to-end="moveToEnd"
        style="z-index: 1; position: relative"
      >
        <slot :data="item"></slot>
      </SlidingMove>
      <div class="delete-button">
        <slot name="delete"
          ><div class="delete-text">
            <slot name="delete-text">DELETE</slot>
          </div></slot
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.list {
  .list-item {
    width: 300px;
    height: 60px;
    border-right: 1px solid lightgray;
    background-color: white;
    line-height: 60px;
    user-select: none;
    position: relative;
  }

  .list-item-wrapper {
    position: relative;

    .delete-button {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 20%;
      color: white;
      font-size: 12px;
      user-select: none;
      background-color: red;
    }

    .delete-text {
      margin: auto;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 50%;
    }
  }
}
</style>
