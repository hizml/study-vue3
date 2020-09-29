<template>
  <div class="about">
    <h1>{{ title }}我是子组件</h1>
    <button @click="$emit('update:title', '杰克')">点我肉丝变杰克</button>
  </div>
</template>
<script>
  // import { h, ref, reactive } from 'vue'
  export default {
    props: {
      title: {
        type: String
      }
    }
    // setup() {
    //   const count = ref(0)
    //   const object = reactive({ foo: 'bar' })
    //
    //   return () => h('div', [count.value, object.foo])
    // }
  }
</script>
