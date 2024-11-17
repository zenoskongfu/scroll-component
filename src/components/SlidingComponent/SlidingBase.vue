<script setup lang="ts">
const emit = defineEmits(["move-start", "move", "move-end"]);
const containerRef = ref<HTMLDivElement | null>(null);
const isMouseDown = ref(false);
const isMouseUp = ref(true);
const startPosition = ref({ x: 0, y: 0 });

defineExpose({
  dom: containerRef,
});

const mouseUp = (e: MouseEvent) => {
  isMouseUp.value = true;
  isMouseDown.value = false;

  emit("move-end", {
    dx: startPosition.value.x - e.clientX,
    dy: startPosition.value.y - e.clientY,
    x: e.clientX,
    y: e.clientY,
  });
};

const mouseDown = (e: MouseEvent) => {
  isMouseUp.value = false;
  isMouseDown.value = true;
  startPosition.value = { x: e.clientX, y: e.clientY }; // e.pageX e.pageY
  emit("move-start", { x: e.clientX, y: e.clientY });
};

const mouseMove = (e: MouseEvent) => {
  if (!isMouseDown.value) return;

  const dx = e.clientX - startPosition.value.x,
    dy = e.clientY - startPosition.value.y;

  emit("move", { dx, dy });
};
</script>

<template>
  <div
    ref="containerRef"
    @mouseup="mouseUp"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseout="mouseUp"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
