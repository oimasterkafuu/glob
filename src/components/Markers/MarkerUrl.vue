<template>
    <Marker :safe="safe" :content="content"></Marker>
</template>

<script>
export default {
    name: 'MarkerUrl',
    props: {
        safe: {
            type: Boolean,
            default: false
        },
        url: {
            type: String
        }
    },
    data() {
        return {
            content: ''
        };
    },
    mounted() {
        fetch(this.url)
            .then((res) => res.text())
            .then((res) => {
                this.content = res;
            });
    }
};
</script>
