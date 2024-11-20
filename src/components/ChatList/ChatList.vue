<script setup lang="ts">
import ChatItem from "./component/ChatItem.vue";
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
    status: 0,
  },
  {
    id: 3,
    imgSrc: avatar,
    name: "Zenos",
    enableEdit: true,
    status: 0,
  },
]);

// const status = ref(0); // 0未处理，1同意，2拒绝

const agreeClick = (id: number) => {
  console.log("agree");

  data.value.forEach((item) => {
    if (item.id == id) {
      item.status = 1;
    }
  });
};

const rejectClick = (id: number) => {
  console.log("reject");

  data.value.forEach((item) => {
    if (item.id == id) {
      item.status = 2;
    }
  });
};

const currentPersonData = {
  id: 3,
  imgSrc: avatar,
  name: "Zenos",
  enableEdit: false,
};

const editName = (newName: string) => {
  currentPersonData.name = newName;
  console.log(currentPersonData);
};
</script>

<template>
  <div class="chat-list-container">
    <ChatItem v-for="item in data" :data="item" @edit-name="editName">
      <div class="button-container" v-if="item.status == 0">
        <button @click="() => agreeClick(item.id)">Agree</button>
        <button @click="() => rejectClick(item.id)">Reject</button>
      </div>
      <div v-else-if="item.status == 1">Agree</div>
      <div v-else-if="item.status == 2">Reject</div>
    </ChatItem>
  </div>
</template>

<style scoped lang="scss">
.chat-list-container {
  width: 500px;
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
