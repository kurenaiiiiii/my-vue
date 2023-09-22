<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch:{
  '$i18n.locale'(newVal,oldVal){
     if(newVal!=oldVal){
         location.reload()
     }
      
  }
}
}
</script>
