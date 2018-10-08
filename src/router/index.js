import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'
import center from '@/components/pages/center'
import goods_manager from '@/components/pages/centers/goods_manager'
import fenlei from '@/components/pages/centers/fenlei'
import xgmm from '@/components/pages/centers/xgmm'
import zlxg from '@/components/pages/centers/zlxg'

Vue.use(Router)


 const routes = [
    {
      path:'/',
      name:'home',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component:login,
      props:true
    },
    {
      path:'/center',
      name:'center',
      component:center,
      props:true,
      meta:{ requiresAuth:true},
      children:[
        {
          path:'/goods_manager',
          name:'goods_manager',
          component:goods_manager,
          props:true
        },
        {
          path:'/fenlei',
          name:'fenlei',
          component:fenlei,
          props:true
        },
        {
          path:'/xgmm',
          name:'xgmm',
          component:xgmm,
          props:true
        },
        {
          path:'/zlxg',
          name:'zlxg',
          component:zlxg,
          props:true
        }
      ]
    },
    

  ]

const router = new Router({
  mode:'history',
  routes,
})

// 路由拦截
// 导航卫士（钩子函数）
// 操作导航卫士时，路由处于暂停状态
router.beforeEach((to, from, next) => {

  // 需要登录才允许进入路由
  if(to.meta.requiresAuth){
  	// 判断是否登录
  	if(sessionStorage.getItem('token')){
  		next();
  	}else{
  		next({
  			path:'/login'
  		})
  	}
  }else{
	  // 调用next()方法，放行路由跳转
	  next();
  }
});

export default router;