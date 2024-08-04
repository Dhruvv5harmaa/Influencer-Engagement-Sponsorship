import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Users from "./components/Users.js"
import StudyResourceForm from "./components/StudyResourceForm.js"
import InfluencerRegistration from "./components/InfluencerRegistration.js"

const routes=[
    {path:'/',component:Home}, //this '/'path is linked to Home component.
    {path:'/login',component:Login,name:'Login'},//this '/login'path is linked to Home component.
    {path:'/users',component:Users},
    {path:'/create-resource',component:StudyResourceForm},
    {path:'/register-user',component:InfluencerRegistration},
]



// router instance below
export default new VueRouter({
    routes,

})