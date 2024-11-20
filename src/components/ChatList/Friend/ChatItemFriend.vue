<script setup lang="ts">
const props = defineProps<{
  data: {
    id: number;
    name: string;
    imgSrc: string;
  };
}>();

const rightClick = () => {
  console.log("right click", props.data.id, props.data.name);
};
</script>

<template>
  <ChatItem :data="props.data" @contextmenu.prevent="rightClick"></ChatItem>
</template>

<style scoped lang="scss"></style>
