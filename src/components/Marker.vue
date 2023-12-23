<template>
    <div v-html="parsedContent" v-if="content.trim() !== ''"></div>
    <div class="ui fluid placeholder" v-else>
        <div class="header">
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="paragraph" v-for="i in 10">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Marker',
    props: {
        content: {
            type: String,
            default: ''
        },
        safe: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        parsedContent() {
            const renderer = {
                table: (header, body) => {
                    return (
                        '<table class="ui unstackable celled table"><thead>' +
                        header +
                        '</thead><tbody>' +
                        body +
                        '</tbody></table>'
                    );
                },
                tablecell: (content, flags) => {
                    var tag = 'td';
                    if (flags.header) {
                        tag = 'th';
                    }
                    return (
                        '<' +
                        tag +
                        (flags.align && flags.align !== 'left' ? ' class="' + flags.align + ' aligned"' : '') +
                        '>' +
                        content +
                        '</' +
                        tag +
                        '>'
                    );
                },

                image: (href, title, text) => {
                    return '<div class="ui image"><img src="' + href + '" alt="' + text + '"></div>';
                },

                blockquote: (text) => {
                    return '<blockquote class="ui segment">' + text + '</blockquote>';
                },

                hr: () => {
                    return '<div class="ui divider"></div>';
                },

                html: (text) => {
                    if (this.safe) {
                        return text;
                    } else {
                        return $('<div/>').text(text).html();
                    }
                }
            };

            marked.use({ renderer });
            var element = $('<div/>');
            element.html(marked.parse(this.content));

            renderMathInElement($(element)[0], {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ]
            });

            return element.html();
        }
    }
};
</script>
