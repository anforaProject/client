<template>
    <div v-if="previewing" class="upload-column">
        <img class="preview" :src="previewing">
    </div>
</template>

<script>
export default {
    name: 'Preview',
    props:['previewing', "filter"],
    data(){
      return{
      }
    },
    computed:{
    },
    methods:{

    }

}
</script>

<style media="screen">


.preview {
  max-height: 90%;
}


.upload-column{
    padding-top: 4em;
}


</style>
