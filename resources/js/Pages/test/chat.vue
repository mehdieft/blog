<template>
    <app-layout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                چت با دکتر
            </h2>
        </template>

        <div class="py-12">
            <div
                class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen"
            >
                <div
                    class="
                        flex
                        sm:items-center
                        justify-between
                        py-3
                        border-b-2 border-gray-200
                    "
                >
                    <div class="flex items-center space-x-4">
                        <img
                        :src="adminImage()"
                            alt=""
                            class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                        />
                        <div class="flex flex-col leading-tight">
                            <div class="text-2xl mt-1 flex items-center">
                                <span class="text-gray-700 mr-3"
                                    >Anderson Vanhron</span
                                >
                                <span class="text-green-500">
                                    <svg width="10" height="10">
                                        <circle
                                            cx="5"
                                            cy="5"
                                            r="5"
                                            fill="currentColor"
                                        ></circle>
                                    </svg>
                                </span>
                            </div>
                            <span class="text-lg text-gray-600"
                                >Junior Developer</span
                            >
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button
                            type="button"
                            class="
                                inline-flex
                                items-center
                                justify-center
                                rounded-full
                                h-10
                                w-10
                                transition
                                duration-500
                                ease-in-out
                                text-gray-500
                                hover:bg-gray-300
                                focus:outline-none
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                class="h-6 w-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </button>
                        <button
                            type="button"
                            class="
                                inline-flex
                                items-center
                                justify-center
                                rounded-full
                                h-10
                                w-10
                                transition
                                duration-500
                                ease-in-out
                                text-gray-500
                                hover:bg-gray-300
                                focus:outline-none
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                class="h-6 w-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                ></path>
                            </svg>
                        </button>
                        <button
                            type="button"
                            class="
                                inline-flex
                                items-center
                                justify-center
                                rounded-full
                                h-10
                                w-10
                                transition
                                duration-500
                                ease-in-out
                                text-gray-500
                                hover:bg-gray-300
                                focus:outline-none
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                class="h-6 w-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    id="messages"
                    ref="chat"
                    class="
                        flex flex-col
                        space-y-4
                        p-3
                        overflow-y-auto
                        scrollbar-thumb-blue
                        scrollbar-thumb-rounded
                        scrollbar-track-blue-lighter
                        scrollbar-w-2
                        scrolling-touch
                    "
                >
                    <div
                        class="chat-message"
                        v-for="massage in massagesList"
                        :key="massage.id"
                    >
                        <div
                            class="flex items-end"
                            v-if="massage.sender == senderid"
                        >
                            <div
                                class="
                                    flex flex-col
                                    space-y-2
                                    text-xs
                                    max-w-xs
                                    mx-2
                                    order-2
                                    items-start
                                "
                            >
                                <div>
                                    <span
                                    v-if="massage.image==NULL"
                                        class="
                                            px-4
                                            py-2
                                            rounded-lg
                                            inline-block
                                            rounded-bl-none
                                            bg-gray-300
                                            text-gray-600
                                        "
                                    >
                                        {{ massage.massage }}
                                    </span>
                                   <a v-else :href="image(massage.image)" target="_blank"> <img :src="image(massage.image)" alt="wrong"></a>
                                </div>
                            </div>
                            <img
                                :src="profileImage()"
                                alt="My profile"
                                class="w-6 h-6 rounded-full order-1"
                            />
                        </div>
                        <div
                            class="flex items-end justify-end"
                            v-if="massage.reciever == senderid"
                        >
                            <div
                                class="
                                    flex flex-col
                                    space-y-2
                                    text-xs
                                    max-w-xs
                                    mx-2
                                    order-1
                                    items-end
                                "
                            >
                                <div>
                                    <span
                                    v-if="massage.image==NULL"
                                        class="
                                            px-4
                                            py-2
                                            rounded-lg
                                            inline-block
                                            rounded-br-none
                                            bg-blue-600
                                            text-white
                                        "
                                        >{{ massage.massage }}</span
                                    >
                                    <img :src="massage.image" v-else alt="">
                                </div>
                            </div>
                            <img
                                :src="adminImage()"
                                alt="My profile"
                                class="w-6 h-6 rounded-full order-2"
                            />
                        </div>
                    </div>
                </div>
                <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div class="relative flex">
                        <span class="absolute inset-y-0 flex items-center">
                            <button
                                type="button"
                                class="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    h-12
                                    w-12
                                    transition
                                    duration-500
                                    ease-in-out
                                    text-gray-500
                                    hover:bg-gray-300
                                    focus:outline-none
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-6 w-6 text-gray-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                    ></path>
                                </svg>
                            </button>
                        </span>
                        <form class="
                                    w-full
                                    focus:outline-none
                                    focus:placeholder-gray-400
                                    text-gray-600
                                    placeholder-gray-600
                                    pl-12
                                    bg-gray-200
                                    rounded-full
                                    py-3
                                " @submit.prevent="sendmassage()">
                            <input
                                v-model="massage"
                                type="text"
                                placeholder="Write Something"
                                class="
                                    w-full
                                    focus:outline-none
                                    focus:placeholder-gray-400
                                    text-gray-600
                                    placeholder-gray-600
                                    pl-12
                                    bg-gray-200
                                    rounded-full
                                    py-3
                                "
                            />

                        </form>
                        <div
                            class="
                                absolute
                                right-0
                                items-center
                                inset-y-0
                                hidden
                                sm:flex
                            "
                        >
                            <input
                                type="file"
                                multiple
                                ref="file"
                                @change="previewFiles"
                                style="display: none"
                            />
                            <button
                                @click="$refs.file.click()"
                                type="button"
                                class="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    h-10
                                    w-10
                                    transition
                                    duration-500
                                    ease-in-out
                                    text-gray-500
                                    hover:bg-gray-300
                                    focus:outline-none
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-6 w-6 text-gray-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    ></path>
                                </svg>
                            </button>
                            <button
                                type="button"
                                class="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    h-10
                                    w-10
                                    transition
                                    duration-500
                                    ease-in-out
                                    text-gray-500
                                    hover:bg-gray-300
                                    focus:outline-none
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-6 w-6 text-gray-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                    ></path>
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                            </button>
                            <button
                                type="button"
                                class="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    h-10
                                    w-10
                                    transition
                                    duration-500
                                    ease-in-out
                                    text-gray-500
                                    hover:bg-gray-300
                                    focus:outline-none
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="h-6 w-6 text-gray-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </button>
                            <button
                                disabled="true"
                                type="submit"
                                class="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    h-12
                                    w-12
                                    transition
                                    duration-500
                                    ease-in-out
                                    text-white
                                    bg-blue-500
                                    hover:bg-blue-400
                                    focus:outline-none
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="h-6 w-6 transform rotate-90"
                                >
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
<style>
.scrollbar-w-2::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
    --bg-opacity: 1;
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
    --bg-opacity: 1;
    background-color: #edf2f7;
    background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
}
</style>

<script>
import io from "socket.io-client";
import AppLayout from "../../Layouts/AppLayout.vue";
import Welcome from "@/Jetstream/Welcome.vue";
import SocketIOFileUpload from "socketio-file-upload";
let socket = null;
let uploader = null;

export default {
    props: ["sender", "reciever", "massages", "senderid","userImage","adminImage"],
    data() {
        return {
            massage: "hello zepp",
            admin: null,
            basepath:'http://localhost:8000/',
            userImageUrl:'http://localhost:8000/storage/',
            massagesList: [],
        };
    },
    // watch:{massagesList},
    methods: {
        sendmassage() {
            if (this.massage == "") {
                alert("please type");
            } else {
                socket.emit("sendmassage", {
                    reciever: this.admin,
                    sender: this.sender,
                    massage: this.massage,
                });
                socket.off("get").on("get", (msg) => {
                    console.log("massage-------", msg[0]);
                    let duplicateMassage = this.massagesList.find((o) => {
                        o.id == msg[0].id;
                        console.log("find", duplicateMassage);
                    });
                    if (duplicateMassage == undefined) {
                        this.massagesList.push(msg[0]);
                    } else {
                        console.log("fucker");
                    }
                });
                this.massage = "";
                // console.log("this is fuck");
            }
        },

        previewFiles(event) {
            console.log("********", event.target.files);
            socket.emit("filesend", {
                file: this.uploader.listenOnInput(this.$refs.file),
                sender: this.sender,
                reciever: this.admin,
            });
            //method on get data back
            socket.off("getfile").on("getfile",(msg)=>{
                console.log("my file send back---->",msg)
                this.massagesList.push(msg[0]);
                let duplicateMassage = this.massagesList.find((o) => {
                        o.id == msg[0].id;
                        console.log("find", duplicateMassage);
                    });
                    if (duplicateMassage == undefined) {
                        this.massagesList.push(msg[0]);
                    } else {
                        console.log("fucker");
                    }
            });
        },
        image(item){
            console.log("imge",item);
            return this.basepath+item;
        },
        profileImage(){
            if(this.userImage==null){
                return this.basepath+"userdefault.png";

            }else{

                console.log("******profile",this.userImage)
                return this.userImageUrl+this.userImage;
            }
        },
        adminImage(){
            console.log("admin image what are you?",this.adminImage[0].profile_photo_path);
            if(this.adminImage[0]==null){

                return this.basepath+"userdefault.png"

            }else{

                return this.userImageUrl+this.adminImage[0].profile_photo_path;
            }

        }
    },

    components: {
        AppLayout,
        Welcome,
    },
    created() {
        document.body.scrollTop = document.body.scrollHeight;
        this.$refs.chat.scrollIntoView();
    },
    mounted() {
        console.log("fucking sender", this.sender);
        console.log("this is massages", this.massages);
        this.massagesList = this.massages;
        console.log("mylist", this.massagesList);

        socket = io.connect("http://localhost:5000");
        this.uploader = new SocketIOFileUpload(socket);

        socket.off("private-massage").on("private-massage", (msg) => {
            console.log("massage-------", msg[0]);
            this.massagesList.push(msg[0]);
        });
        socket.emit("findme", {
            email: this.sender,
        });
        //findig the guy(admin) we wanna send massage for him
        socket.on("admin", (admin) => {
            console.log("fuck you admin", admin.user[0]);
            // this.admin=admin
            this.admin = admin.user[0];
        });
    },
    created() {},
};
</script>
