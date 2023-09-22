import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import myZh from './zh.js'
import myEN from './en.js'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'




Vue.use(VueI18n)



 export default  new VueI18n({
    locale: Cookie.get('language') || 'en',
    messages:{

           en:{
                 ...enLocale,
                 ...myEN
           },
           zh:{
                 ...zhLocale,
                 ...myZh
           }


           
    }
  })



