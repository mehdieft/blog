<template>


    
</template>
<script>
export default {
    props:['users','sender'],
    created(){
        console.log("this is all users",this.users);
        console.log("this is admin",this.sender);
    }
}
</script>