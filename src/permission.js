import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] 

router.beforeEach(async(to, from, next) => {

  NProgress.start()


   if( store.getters.token ){
        if(to.path === '/login'){
           next('/')
        }else{
           next()    
        }
   }else{
         if(whiteList.indexOf(to.path) !== -1){
                next() 
         }else{
              next('/login') 
         }
   }

    NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
