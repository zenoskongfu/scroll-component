<script setup lang="ts">
import { isInMiddle, judgeDirectionSimple, whichMoreCloser } from "./util";

const props = defineProps({
  direction: { type: String, default: "left" },
  end: { type: [Number, String], default: "20%" },
});

const containerRef = ref<HTMLDivElement | null>(null);
const isMouseDown = ref(false);
const isMouseUp = ref(true);
const dynamicEnd = ref(0);

const startPosition = ref({ x: 0, y: 0 });
// const endPosition = ref({ x: 0, y: 0 });
const currentPosition = ref({ x: 0, y: 0 });
const endPositionRelative = ref({ x: 0, y: 0 });

const start = 0,
  end = computed(() => {
    if (typeof props.end == "number") return props.end;
    return dynamicEnd.value;
  });

const directionType = computed(() => {
  if (props.direction == "up" || props.direction == "down") return "y";
  return "x";
});

onMounted(() => {
  if (typeof props.end == "number") return;
  try {
    const percentNum = Number(props.end.split("%")[0]) / 100;
    if (isNaN(percentNum) || percentNum < 0 || percentNum > 1) throw "";

    let flag = 1;
    if (props.direction == "left" || props.direction == "up") flag = -1;

    dynamicEnd.value = containerRef.value!.clientWidth * percentNum * flag;
  } catch (error) {
    console.log(
      "please input correct end, the end type could be number, or string like 20%"
    );
  }
});

watch(
  () => end.value,
  () => {
    console.log("direction type: ", directionType.value);
    console.log(start, end.value);
  }
);

watch(
  () => currentPosition.value.x + currentPosition.value.y,
  () => {
    containerRef.value!.style.transform = `translate(${currentPosition.value.x}px,${currentPosition.value.y}px)`;
  }
);

const mouseUp = () => {
  isMouseUp.value = true;
  isMouseDown.value = false;

  const moreCloseIndex = whichMoreCloser(
    currentPosition.value[directionType.value],
    [start, end.value]
  );
  if (moreCloseIndex == 0) {
    currentPosition.value = {
      ...currentPosition.value,
      [directionType.value]: start,
    };
    endPositionRelative.value = {
      ...currentPosition.value,
      [directionType.value]: start,
    };
  } else {
    currentPosition.value = {
      ...currentPosition.value,
      [directionType.value]: end.value,
    };
    endPositionRelative.value = {
      ...currentPosition.value,
      [directionType.value]: end.value,
    };
  }

  console.log("currentPosition: ", currentPosition.value);

  containerRef.value!.style.transitionDuration = "0.1s";

  console.log("up");
};

const mouseDown = (e: MouseEvent) => {
  isMouseUp.value = false;
  isMouseDown.value = true;

  startPosition.value = {
    x: e.clientX,
    y: e.clientY,
  };

  containerRef.value!.style.transitionDuration = "0s";

  console.log("down");
};

const mouseMove = (e: MouseEvent) => {
  if (!isMouseDown.value) return;

  const moveRes = judgeDirectionSimple(startPosition.value, {
    x: e.clientX,
    y: e.clientY,
  });

  console.log(currentPosition.value);

  if (props.direction == "up" || props.direction == "down") {
    if (isInMiddle(currentPosition.value.y, start, end.value)) {
      currentPosition.value.y = endPositionRelative.value.y + moveRes.dy;
    }
    return;
  }

  if (props.direction == "left" || props.direction === "right") {
    if (isInMiddle(currentPosition.value.x, start, end.value)) {
      currentPosition.value.x = endPositionRelative.value.x + moveRes.dx;
    }
    return;
  }
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
    <slot></slot>
  </div>
  <!-- <SlidingBase 
  @move="mouseMove"
  @move-start=""
  @move-end=""
  style="transition: all 0s ease">
    <slot></slot>
  </SlidingBase> -->
</template>
<style></style>
