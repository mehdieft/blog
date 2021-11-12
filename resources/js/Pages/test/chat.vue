<template>

        
    
</template>
<script> 
import openSocket from 'socket.io-client';
export default {   
    mounted() {
        openSocket("http://localhost:3000")
    }
    
}
</script>