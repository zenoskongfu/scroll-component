<script setup lang="ts">
import avatar from "../jinkesi.jpeg";

const data = ref([
  {
    id: 1,
    imgSrc: avatar,
    name: "JinKeSi",
    msg: "hello, my friend",
  },
  {
    id: 2,
    imgSrc: avatar,
    name: "Blue",
    msg: "hello",
  },
  {
    id: 3,
    imgSrc: avatar,
    name: "Zenos",
  },
]);
</script>

<template>
  <div class="chat-list-container">
    <SlidingList :list-data="data">
      <template #default="{ data }">
        <ChatItemFriend :data="data"></ChatItemFriend>
      </template>
    </SlidingList>
  </div>
</template>

<style scoped lang="scss">
.chat-list-container {
  width: 500px;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-radius: 4px;
  overflow: hidden;
}

.button-container {
  display: flex;

  button {
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    padding: 0 1.2em;
  }

  button + button {
    margin-left: 1em;
  }
}
</style>
