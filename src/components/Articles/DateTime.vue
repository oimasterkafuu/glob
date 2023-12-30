<template>
    <span v-text="formattedTime" :title="originalTime"></span>
</template>

<script>
import moment from 'moment';
import 'moment/dist/locale/zh-cn';

export default {
    name: 'DateTime',
    props: {
        time: {
            type: Date
        },
        specialFormat: {
            type: String
        }
    },
    computed: {
        formattedTime() {
            if (!this.time) {
                return '刚刚';
            }
            if (this.specialFormat) {
                return moment(this.time).format(this.specialFormat);
            }
            return moment(this.time).fromNow();
        },
        originalTime() {
            if (!this.time || this.specialFormat === 'LLL') {
                return '';
            }
            return moment(this.time).format('LLL');
        }
    }
};
</script>
