<script setup lang="ts">
// const listData = ref([
//   { name: "zenos 1" },
//   { name: "blue 1" },
//   { name: "zenos 2" },
//   { name: "blue 2" },
// ]);
</script>

<template>
  <!-- <ListDemo /> -->

  <!-- 
  <SlidingMove>
    <div
      style="width: 200px; height: 200px; background-color: antiquewhite"
    ></div>
  </SlidingMove> 
  -->

  <SlidingList listData="listData">
    <template #default="{ data }">
      <div class="list-item">{{ data.name }}</div>
    </template>

    <template #delete>
      <div>delete</div>
    </template>
  </SlidingList>
</template>

<style scoped>
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
</style>
