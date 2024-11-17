<template>
  <div :id="id">
    <slot />
  </div>
</template>

<script lang="ts">
let componentNumber = 0;
const debounce = (fn: (...args: any[]) => any | void, time = 300) => {
  let id = 0;
  return (...args: any[]) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

export default {
  emits: ["load"],
  setup(props, ctx) {
    const id = ref("");
    onBeforeMount(() => {
      componentNumber++;
      id.value = "scroll-component" + componentNumber;
    });

    let dom: HTMLElement | null = null;
    let loading = false;

    const onScroll = (e: any) => {
      const tempDom = dom!;
      if (tempDom.scrollHeight - tempDom.clientHeight - tempDom.scrollTop < 1) {
        if (loading === false) {
          loading = true;
          ctx.emit("load", () => {
            loading = false;
          });
        }
      }
    };

    const debounceScroll = debounce(onScroll);

    onMounted(() => {
      const tempDom = document.getElementById(id.value)!;
      dom = tempDom;
      dom.addEventListener("scroll", debounceScroll);
    });

    onUnmounted(() => {
      dom && dom.removeEventListener("scroll", debounceScroll);
    });

    return { id };
  },
};
</script>

<style></style>
