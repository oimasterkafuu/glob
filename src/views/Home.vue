<template>
    <Marker :safe="true" :content="content"></Marker>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            content: ''
        };
    },
    mounted() {
        fetch('/Home.md')
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                this.content = res;
            });
    }
};
</script>
