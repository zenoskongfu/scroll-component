<script setup lang="ts">
const listData = ref([
  { name: "zenos 1" },
  { name: "blue 1" },
  { name: "zenos 2" },
  { name: "blue 2" },
]);

const clickFn = () => {
  console.log("hello world");
};
</script>

<template>
  <SlidingList :listData="listData" class="sliding-list">
    <template #default="{ data }">
      <div class="list-item list-item-2" @click="clickFn">{{ data.name }}</div>
    </template>

    <template #delete>
      <div class="delete-slot" @click="clickFn">123</div>
    </template>
  </SlidingList>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.sliding-list {
  box-shadow: 0 0 4px 2px lightgray;
  border-radius: 4px;
}

.delete-slot {
  line-height: 60px;
  width: 100%;
}
</style>
