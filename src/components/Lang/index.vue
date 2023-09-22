<template>
    <div>
            <el-dropdown trigger="click" @command="changeLanguage">
                <div>
                <svg-icon style="color:#000;font-size:20px;position:absolute;right:13px;top:-10px" icon-class="language" />
               
                </div>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh" :disabled="'zh'=== $i18n.locale ">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="'en'=== $i18n.locale ">en</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
    </div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
       data(){
        return{
              
        }
       },
       methods:{
           changeLanguage(lang){
                   Cookie.set('language', lang)
                   this.$i18n.locale = lang  
                   this.$message.success('切换多语言成功')
           }
       }
}
</script>

<style scoped>
  
</style>
