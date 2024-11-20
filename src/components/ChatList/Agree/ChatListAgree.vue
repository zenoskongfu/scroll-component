<script setup lang="ts">
import avatar from "./jinkesi.jpeg";

const data = ref([
  {
    id: 1,
    imgSrc: avatar,
    name: "JinKeSi",
    msg: "hello, my friend",
    enableEdit: false,
    status: 0,
  },
  {
    id: 2,
    imgSrc: avatar,
    name: "Blue",
    msg: "hello",
    enableEdit: false,
    status: 1,
  },
  {
    id: 3,
    imgSrc: avatar,
    name: "Zenos",
    enableEdit: true,
    status: 2,
  },
]);

const agree = (id: number, name: string) => {
  console.log(id, name);
  data.value.forEach((item) => {
    if (item.id == id) {
      item.status = 1;
      item.name = name;
    }
  });
};

const reject = (id: number) => {
  data.value.forEach((item) => {
    if (item.id == id) {
      item.status = 2;
    }
  });
};
</script>

<template>
  <div class="chat-list-agree">
    <ChatItemAgree
      v-for="item in data"
      :data="item"
      @agree="agree"
      @reject="reject"
    ></ChatItemAgree>
  </div>
</template>

<style scoped lang="scss">
.chat-list-agree {
  width: 500px;
}
</style>
