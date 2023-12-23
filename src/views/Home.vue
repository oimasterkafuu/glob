<template>
    <div id="content"></div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            content: `# Glob

Get Lit, Oimasterkafuu's Blog. 点亮吧，Oimasterkafuu 的博客！

> 这是一个无服务器博客，正在开发中。它使用 Vue 作为前端，Leancloud 作为后端，以及 Vite 作为构建工具。

可能后面会有更详细的介绍……现在内容那么少，我也不清楚会发生什么。

不愧是 <span style="color: #8db3f1;">oimasterkafuu<span class="ui tiny label" style="display: inline-block; color: white; background-color: #8db3f1">かわいい</span></span>！

---

# Markdown测试文章

## 标题

### 小标题

#### 更小的标题

##### 还要小的标题

###### 最小的标题

## 文本格式

* **粗体**：**粗体**
* *斜体*：*斜体*
* ~~删除线~~：~~删除线~~

## 列表

* 无序列表：
    * 第一项
    * 第二项
    * 第三项
* 有序列表：
    1. 第一项
    2. 第二项
    3. 第三项

## 代码块

\`\`\`python
print("Hello, world!")
\`\`\`

## 链接

[Google](https://www.google.com)

## 图片

![oimaster](https://gravatar.oimaster.top/avatar/c2f21b7c17cbc4aecabfa3e44b58d164?size=800)

## 表格

| 表头 | 表头 | 表头 |
|:--|--:|:--:|
| 内容 | 内容 | 内容 |
| 内容 | 内容 | 内容 |


## 公式

$$ e^{i\\pi} + 1 = 0 $$
$ 1 + 2 = 3 $ 是一道简单的算术题。
`
        };
    },
    mounted() {
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
            }
        };

        marked.use({ renderer });

        $('#content').html(marked.parse(this.content));

        renderMathInElement($('#content')[0], {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ]
        });
    }
};
</script>
