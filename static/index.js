import router from "./router.js"
import Navbar from "./components/Navbar.js"

// const isAuthenticated=localStorage.getItem('auth-token') ? true : false
// GOOD
router.beforeEach((to, from, next) => {
    // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    if (to.name !== 'Login' && !(localStorage.getItem('auth-token') ? true : false) ) next({ name: 'Login' })
        
    else next()
  })

new Vue({
    el:"#app",
    template:`<div>
    <Navbar :key='has_changed' />
    <router-view class="m-3"/></div>`,
    router,
    components:{
        Navbar,
    },
    data:{
        has_changed:true,

    },
    watch:{ // watcher is their to see for the router change 
        $route(to,from){
            this.has_changed=!this.has_changed // we are checking for the route change
        },
    },
})