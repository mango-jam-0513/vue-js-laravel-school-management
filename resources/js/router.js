import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//admin project pages
import adminuser from './admin/pages/adminuser'
import role from './admin/pages/role'
import login from './admin/pages/login'
import assignRole from './admin/pages/assignRole'
import School from './admin/pages/school'
import Grade from './admin/pages/grade'
import Lesson from './admin/pages/lesson'
//chungHua
import schoolSpace from './view/chungHua/schoolSpace'
import firstPage from './view/chungHua/firstPage'
import allTeacher from './view/chungHua/allTeacher'
import high21 from './view/chungHua/high21'
import baidumap from './components/pages/baidumap'
import mobilePostView from './components/chungHua/postDetailView'
import profile from './components/profile/profile'
import chatComponent from './components/pages/chat/mobile/chatAddress'
const routes = [
    
    {
        path: '/',
        component: firstPage,
        // name:dashboard
    },
    {
        path:'/mobile',component:schoolSpace,
            
    },
    {
        path:'/profile',component:profile
    },
    {
        path:'/chat', component:chatComponent
    },
    // {path:'/mobile/post',component:mobilePost},
    {path:'/mobile/postView',component:mobilePostView},
    
    //user management
    {
        path: '/login',
        component: login,
        name:'login'
    },
    {
        path: '/adminuser',
        component: adminuser,
        name:'adminuser'
    },
    {
        path: '/role',
        component: role,
        name:'role'
    },
    {
        path: '/assignRole',
        component: assignRole,
        name:'assignRole'
    },

    {
        path: '/School',
        component: School,
        name:'School'
    },
    {
        path: '/Grade',
        component: Grade,
        name:'Grade'
    },
    {
        path: '/Lesson',
        component: Lesson,
        name:'Lesson'
    },

    //chungHua link
    {
        path:'/schoolSpace/:schoolName/',
        component:schoolSpace,
        name:'schoolSpace',
        props(route) {
            return {  myprop: route.query.myprop }
          }
    },
    {
        path:'/allTeachers',
        component:allTeacher,
        name:'allTeacher'
    },
    {
        path:'/class/:className/',
        component:high21,
        name:'classView'  
    },
    {
        path:"/baidumap",
        component:baidumap,
        name:"baidumap"
    },
]

export default new Router({
    mode: 'history',
    routes
})