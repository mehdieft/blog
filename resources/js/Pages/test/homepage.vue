<template>
    <div class="text-gray-700">
        <div>
            <nav>
                <div>
                    <h1><a href=""></a></h1>
                </div>
                <ul>
                    <li>
                        <a class="text-red-700" href=""><span>sweet home</span></a>
                    </li>
                    <li>
                        <a href=""><span>home</span></a>
                    </li>
                    <li>
                        <a href=""><span>home</span></a>
                    </li>
                    <li>
                        <a href=""><span>home</span></a>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- -->
        <main>
            <div>
                <a href=""></a>
                <a href=""></a>
            </div>
            <header>
                <h2>بلاگ</h2>
                <h3>دکتر هوشمند</h3>
            </header>
            <div>
                <h4>آخرین اخبار</h4>
                <div>
                    <div>
                        <img src="" alt="" />
                        <div>
                            <span>this text</span>
                            <span>this text</span>
                        </div>
                    </div>

                    <!--کارت های اخبار-->
                </div>
                <h4 >اطلاعیه</h4>
                <div>
                    <div>
                        <img src="" alt="" />
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout.vue";
import  openSocket from 'socket.io-client'
//   import { Head } from '@inertiajs/inertia-vue3'

export default {
    
    
    
    created() {
       openSocket('https://localhost:3000')
    },





    methods() {
        openSocket('https://localhost:3000',{ transports : ['websocket'] })
    },
    mounted() {
        console.log("hello");
    },
    components: {
        AppLayout,
    },

    // components: {
    //   Head,dasd
    //   Layout,
    // },
    // props: {
    //   user: Object,
    // },
};
</script>
