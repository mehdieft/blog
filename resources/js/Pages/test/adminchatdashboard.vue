<template>
<div class="py-10 h-screen bg-gray-300 px-2">
    <div class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
  
        <div class="md:flex ">
            <div class="w-full p-4">
                <div class="relative"> <input type="text" class="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md" placeholder="Search..."> <i class="fa fa-search absolute right-3 top-4 text-gray-300"></i> </div>
                <ul class="overflow-y-auto
                        scrollbar-thumb-blue
                        scrollbar-thumb-rounded
                        scrollbar-track-blue-lighter
                        scrollbar-w-2
                        scrolling-touch" style="max-height:400px;">
                    <li v-for="user in userList" :key="user.id" class="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                        <div class="flex ml-2">
                      
                       <!-- <inertia-link :href="'/'" >Home</inertia-link>
                       <inertia-link :href="'/'" >Home</inertia-link>
                       <inertia-link :href="'/'" >Home</inertia-link> -->
               
                         <img v-if="user.image !=null" src="https://i.imgur.com/aq39RMA.jpg" width="40" height="40" class="rounded-full">
                         <img v-else src="https://i.imgur.com/aq39RMA.jpg" width="40" height="40" class="rounded-full">
                            <div class="flex flex-col ml-2"> <span class="font-medium text-black">{{user.name}}</span>
                             <span v-if="user.socketID!=null" class="text-sm text-green-400 truncate w-32">online</span> 
                             <span v-else class="text-sm text-gray-400 truncate w-32">ofline</span>
                             </div>
                        </div>
                        <div class="flex flex-col items-end"><inertia-link href="/test/admin/chatwithuser" v-if="user.socketID!=null" method="post" :data="{id:user.id,soxketId:user.socketID}"><span  class="text-green-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        </span> 
                        </inertia-link> 
                        <inertia-link href="/test/admin/chatwithuser"  v-else method="post" :data="{id:user.id,soxketId:user.socketID}">
                        <span  class="text-grey-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        </span>
                        </inertia-link>
                        <i class="fa fa-star text-green-400"></i> 
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

    
</template>
<script>
    import ChatApp from './chat';
    import io from "socket.io-client";
    import { Link } from '@inertiajs/inertia-vue3'
    
    let socket = null;
export default {
  components: {Link},
  data(){
    return{ 
      userList:[],
    }
  },

    props:['users','sender'],
    created(){
        console.log("this is all users",this.users);
        console.log("this is admin",this.sender);
    },
    components:{
        ChatApp
    },
    mounted(){
      socket = io.connect("http://localhost:5000");
        socket.emit("findme", {
            email: this.sender,
        });
        socket.on('users',(users)=>{
          console.log("all users",users);
          this.userList=users;
        })

    },
}
</script>