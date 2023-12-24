<template>
    {{ formattedTime }}
</template>

<script>
import moment from 'moment';
import 'moment/dist/locale/zh-cn';

export default {
    name: 'DateAndTime',
    props: {
        time: {
            type: Date
        }
    },
    computed: {
        formattedTime() {
            return moment(this.time).fromNow();
        }
    }
};
</script>
