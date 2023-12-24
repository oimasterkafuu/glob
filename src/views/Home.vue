<template>
    <MarkerUrl url="/Home.md" :safe="true"></MarkerUrl>
    <h2>最新文章</h2>
    <ArticleCards :limit="2"></ArticleCards>
</template>

<script>
export default {
    name: 'Home'
};
</script>
