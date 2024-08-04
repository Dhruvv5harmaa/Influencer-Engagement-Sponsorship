// export default {
//     template: `
//       <div class='d-flex justify-content-center' style="margin-top:25vh">
//         <div class="mb-3 p-5 bg-light">
//           <div class='text-danger'>*{{error}}</div>
//           <label for="username" class="form-label">Username</label>
//           <input type="text" class="form-control" id="username" placeholder="name" v-model="cred.username">
//           <label for="user-email" class="form-label">Email address</label>
//           <input type="email" class="form-control" id="user-email" placeholder="name@example.com" v-model="cred.email">
//           <label for="user-password" class="form-label">Password</label>
//           <input type="password" class="form-control" id="user-password" v-model="cred.password">
//           <label for="industry" class="form-label">Industry</label>
//           <input type="text" class="form-control" id="industry" placeholder="Tech Industry" v-model="cred.industry">
//           <label for="niche" class="form-label">Niche</label>
//           <input type="text" class="form-control" id="niche" placeholder="unboxing" v-model="cred.niche">
//           <label for="reach" class="form-label">Reach</label>
//           <input type="text" class="form-control" id="reach" placeholder="1 Million" v-model="cred.reach">
//           <label for="platform" class="form-label">Platform</label>
//           <input type="text" class="form-control" id="platform" placeholder="Instagram" v-model="cred.platform">
//           <button class="btn btn-primary mt-2" @click='register_influencer'>Register</button>
//         </div>
//       </div>
//     `,
//     data() {
//       return {
//         cred: {
//           username: null,
//           email: null,
//           password: null,
//           industry: null,
//           niche: null,
//           reach: null,
//           platform: null,
//         },
//         error: null,
//       };
//     },
//     methods: {
//       async register_influencer() {
//         try {
//           const res = await fetch('/register-user', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(this.cred),
//           });
//           const data = await res.json();
//           if (res.ok) {
//             console.log(data);
//             this.$router.push({ path: '/' });  // Navigate to the home page after registration
//           } else {
//             this.error = data.message;
//           }
//         } catch (error) {
//           console.error("Error during registration:", error);
//           this.error = "An error occurred. Please try again.";
//         }
//       },
//     },
//   };
  

export default {
    template: `
    <div>
        <div class='d-flex justify-content-center' style="margin-top:25vh">
            <div class="mb-3 p-5 bg-light">
                <div class='text-danger'>*{{error}}</div>
                
                <input type="text" placeholder="Username" v-model="user.username" class="form-control mb-2"/>
                <input type="email" placeholder="Email address" v-model="user.email" class="form-control mb-2"/>
                <input type="password" placeholder="Password" v-model="user.password" class="form-control mb-2"/>
                <input type="text" placeholder="Industry" v-model="user.industry" class="form-control mb-2"/>
                <input type="text" placeholder="Niche" v-model="user.niche" class="form-control mb-2"/>
                <input type="text" placeholder="Reach" v-model="user.reach" class="form-control mb-2"/>
                <input type="text" placeholder="Platform" v-model="user.platform" class="form-control mb-2"/>
                
                <button class="btn btn-primary mt-2" @click="registerUser">Register</button>
            </div>
        </div>
    </div>`,
    data() {
        return {
            user: {
                username: null,
                email: null,
                password: null,
                industry: null,
                niche: null,
                reach: null,
                platform: null,
            },
            error: null,
        };
    },
    methods: {
        async registerUser() {
            console.log(this.user);
            const res = await fetch('/user-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.user),
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                this.$router.push('/login'); // Navigate to login page after successful registration
            } else {
                this.error = data.message;
            }
        },
    },
};
