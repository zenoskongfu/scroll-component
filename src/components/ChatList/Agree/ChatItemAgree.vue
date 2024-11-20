<script setup lang="ts">
// 同意拒绝
const props = defineProps<{
  data: {
    id: number;
    name: string;
    imgSrc: string;
    status: number;
  };
}>();

const localName = ref(props.data.name);
const emit = defineEmits(["agree", "reject"]);
const agreeClick = () => {
  console.log("agree");

  emit("agree", props.data.id, localName);
};

const rejectClick = () => {
  console.log("reject");

  emit("reject", props.data.id);
};

const editName = (newName: string) => {
  localName.value = newName;
};
</script>

<template>
  <ChatItem
    :data="{ ...props.data, enableEdit: props.data.status == 0 }"
    @edit-name="editName"
  >
    <div class="button-container" v-if="props.data.status == 0">
      <button @click="agreeClick">Agree</button>
      <button @click="rejectClick">Reject</button>
    </div>
    <div v-else-if="props.data.status == 1">Agree</div>
    <div v-else-if="props.data.status == 2">Reject</div>
  </ChatItem>
</template>

<style scoped lang="scss"></style>
