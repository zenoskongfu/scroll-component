<template>
  <div ref="id">
    <slot />
  </div>
</template>

<script lang="ts">
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
    const id = ref<HTMLElement | null>(null);

    let dom: HTMLElement | null = null;
    let loading = false;

    const onScroll = (e: any) => {
      const tempDom = dom!;

      if (tempDom.scrollHeight - tempDom.clientHeight - tempDom.scrollTop < 1) {
        // 滚到底啦
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
      dom = id.value!;
      dom.addEventListener("scroll", debounceScroll);
    });

    onUnmounted(() => {
      dom && dom.removeEventListener("scroll", debounceScroll); //放置内存泄漏
    });

    return { id };
  },
};
</script>

<style></style>
