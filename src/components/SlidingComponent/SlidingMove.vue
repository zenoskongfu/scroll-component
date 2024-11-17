<script setup lang="ts">
import { isInMiddle, whichMoreCloser } from "../util";

const props = defineProps({
  direction: { type: String, default: "left" },
  end: { type: [Number, String], default: "20%" },
  moveToEnd: { type: Function, default: () => null },
});

const containerRef = ref<{ dom: HTMLDivElement }>();

// defined start and end.
const dynamicEnd = ref(0);
const start = 0,
  end = computed(() => {
    if (typeof props.end == "number") return props.end;
    return dynamicEnd.value;
  });
onMounted(() => {
  if (typeof props.end == "number") return;

  try {
    const percentNum = Number(props.end.split("%")[0]) / 100;
    if (isNaN(percentNum) || percentNum < 0 || percentNum > 1) throw "";

    let flag = 1;
    if (props.direction == "left" || props.direction == "up") flag = -1;

    dynamicEnd.value = containerRef.value!.dom.clientWidth * percentNum * flag;
  } catch (error) {
    console.log(
      "please input correct end, the end type could be number, or string like 20%"
    );
  }
});

// defined direction type
const directionType = computed(() => {
  if (props.direction == "up" || props.direction == "down") return "y";
  return "x";
});

// update dom transform distance
const domPosition = ref({ x: 0, y: 0 });
watch(
  () => domPosition.value.x + domPosition.value.y,
  () => {
    containerRef.value!.dom.style.transform = `translate(${domPosition.value.x}px,${domPosition.value.y}px)`;
  }
);
const toStart = () => {
  domPosition.value = {
    ...domPosition.value,
    [directionType.value]: start,
  };
};
const toEnd = () => {
  domPosition.value = {
    ...domPosition.value,
    [directionType.value]: end.value,
  };
};

// handle mouse up event
const endPosition = ref({ x: 0, y: 0 });
const mouseEnd = () => {
  const moreCloseIndex = whichMoreCloser(
    domPosition.value[directionType.value],
    [start, end.value]
  );

  if (moreCloseIndex == 0) {
    toStart();
  } else {
    toEnd();
    props.moveToEnd(toStart);
  }

  endPosition.value = { ...domPosition.value };
};

const mouseMove = (position: { dx: number; dy: number }) => {
  const endDistance =
    endPosition.value[directionType.value] +
    position[("d" + directionType.value) as "dx"];

  if (isInMiddle(endDistance, start, end.value)) {
    domPosition.value[directionType.value] = endDistance;
  }
};
</script>

<template>
  <SlidingBase
    @move="mouseMove"
    @move-end="mouseEnd"
    style="transition: all 0.1s ease"
    ref="containerRef"
  >
    <slot></slot>
  </SlidingBase>
</template>
<style></style>
