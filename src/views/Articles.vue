<template>
    <div class="ui center aligned container">
        <MarkerUrl url="/Articles.md" :safe="true"></MarkerUrl>
    </div>
    <ArticleCards></ArticleCards>
</template>

<script>
export default {
    name: 'Articles'
};
</script>
