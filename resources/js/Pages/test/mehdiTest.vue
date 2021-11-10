<template>
  <Layout>
    <Head title="Welcome" />
    <H1>Welcome</H1>
    <p>hello mehdi this is the test</p>
    <!-- {{$page.props}} -->
  </Layout>
</template>

<script>
//   import Layout from './Layout'
//   import { Head } from '@inertiajs/inertia-vue3'

  export default {
      methods(){

      },
      mounted(){
          console.log("hello");
          console.log("this is data",this.users[0])
      },
      props:['users'],
      
      components:{

      }

    // components: {
    //   Head,
    //   Layout,
    // },
    // props: {
    //   user: Object,
    // },
  }
</script>
