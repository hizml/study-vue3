<template>
    <div v-for="item in tree" :key="item.id" class="child-root">Child
        <div class="child">child-2</div>
        <template v-if="item.child">
            <child :tree="item.child"></child>
        </template>
    </div>
</template>

<script>
    export default  {
        name: 'child',
        props: ['helloWorld', 'tree'],
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
