
import StudentHome from "./StudentHome.js"
import InstructorHome from "./InstructorHome.js"
import AdminHome from "./AdminHome.js"
import StudyResource from "./StudyResource.js"
import InfluencerRegistration from "./InfluencerRegistration.js"

export default { 
     // template:`<div>Welcome Home {{$route.query}}</div>`
    //  {{this.$route.query.role }}
    //2.{{$route.query}}
    template:`<div>Welcome Home 
   
    
    <StudentHome v-if="userRole=='stud' "/>
    <AdminHome v-if="userRole=='admin' "/>
    <InstructorHome v-if="userRole=='inst' "/>

    <StudyResource v-for="(resource, index) in resources" :key="index" :resource="resource" />
    </div>`,

    // <StudyResource v-for="(resource,index) in resources":key='index': resource="resource" />
    data(){
        return{
            // userRole: this.$route.query.role,
            userRole:localStorage.getItem('role') ,
            authToken:localStorage.getItem('auth-token'),
            resources:[],
        }
    },
    components:{
        StudentHome,
        InstructorHome,
        AdminHome,
        StudyResource,
    },
    async mounted(){
        const res=await fetch('/api/study_material',{
            headers:{
                'Authentication-Token':this.authToken,
            },
        })
        const data=await res.json()
        console.log(data)
        if (res.ok){
            this.resources=data
        }
        else{
            alert(data.message)
        }
    },
}