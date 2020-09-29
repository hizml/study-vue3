<template>
  <div class="about">
    <h1>{{ title }}我是父组件</h1>
    <item v-model:title="title"></item>
    <button @click="title='肉丝'">点我杰克变肉丝</button>
  </div>
  <div class="box">
    <input type="text" v-model="option">
    <button @click="addItem">添加</button>
    {{ option }}
    <ul>
      <li v-for="item in list" :key="item.id" :class="{'del': item.done}">{{ item.value }} <span @click="removeItem(item.id)">X</span></li>
    </ul>
  </div>
</template>
<script>
  import { onMounted , ref, reactive} from 'vue'
  import item from './Item'
  export default {
    components: {
      item
    },
    setup () {
      let id = 1
      const title = ref('肉丝');
      const option = ref('')
      const list = reactive([])

      onMounted(() => {
        console.log(2333)
      })

      function addItem() {
        if (option.value) {
          list.push({
            id: ++id,
            value: option.value,
            done: false
          })
        }

        option.value = ''
      }

      const removeItem = function (id) {
        list.map(item => {
          if (item.id === id) {
            item.done = true
          }
        })
      }
      return {
        title,
        option,
        list,
        addItem,
        removeItem
      }
    }
  }
</script>
<style>
  .box {
    width: 300px;
    margin: 0 auto;
  }
  .del {
    text-decoration: line-through;
  }
</style>
