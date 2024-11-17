<template>
  <div class="flex flex-wrap gap-4 items-center">
    <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <ScrollComponent @load="handleLoad" style="overflow: auto; height: 100px">
        <el-option
          v-for="item in optionsRef"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ScrollComponent>
    </el-select>
    <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <ScrollComponent @load="handleLoad" style="overflow: auto; height: 100px">
        <el-option
          v-for="item in optionsRef"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ScrollComponent>
    </el-select>
    <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <ScrollComponent @load="handleLoad" style="overflow: auto; height: 100px">
        <el-option
          v-for="item in optionsRef"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ScrollComponent>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

const optionsRef = ref(options);
const index = ref(6);
const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1500);
  });
};
const handleLoad = async (callback: () => void) => {
  await sleep();
  console.log("load");
  index.value++;
  const item = {
    label: index.value + "",
    value: index.value + "",
  };
  optionsRef.value.push(item);
  // await fetch('/data');
  callback && callback();
};
</script>
