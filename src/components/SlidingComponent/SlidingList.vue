<script setup lang="ts">
const listData = ref([
  { name: "zenos 1" },
  { name: "blue 1" },
  { name: "zenos 2" },
  { name: "blue 2" },
]);

// const listRef = ref();
const revertFnRef = ref();
const moveToEnd = (revertFn: Function) => {
  if (
    typeof revertFnRef.value == "function" &&
    revertFnRef.value !== revertFn
  ) {
    revertFnRef.value();
    console.log("move end", typeof revertFn);
  }
  revertFnRef.value = revertFn;
};
</script>

<template>
  <div class="list" style="overflow: hidden">
    <div
      class="list-item-wrapper"
      v-for="(item, index) in listData"
      :key="index"
    >
      <div
        style="
          z-index: 1;
          position: relative;
          border-bottom: 1px solid lightgray;
        "
      >
        <SlidingMove direction="left" end="20%" :move-to-end="moveToEnd">
          <slot :data="item"></slot>
        </SlidingMove>
      </div>
      <div class="delete-button">
        <slot name="delete"> DELETE </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.list {
  box-shadow: 0 0 4px 1px lightgray;
  border-radius: 4px;
  background-color: red;

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
      line-height: 60px;
      color: white;
      font-size: 12px;
      user-select: none;
    }
  }
}
</style>
