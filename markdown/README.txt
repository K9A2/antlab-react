本模块负责把 /markdown 文件夹下的 Markdown 文件转换为 html 格式，并储存在 /dist/markdown.txt 中。
转换的内容包括以下文件夹中的 Markdown 文件：
1. activities，用于放置实验室活动信息
2. announcements，用于放置实验室公告信息
3. members，用于放置实验室成员信息
4. intros，用于放置实验室简介的详细版本和简要版本

如果 Markdown 文件中引用了图片，请放置到响应文件夹下的 img 文件夹中。注意，图片命名不要重复，
重复命名会导致覆盖。图片会被压缩后复制到 /dist/img 下。

