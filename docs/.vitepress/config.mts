import { defineConfig } from 'vitepress';

const weeks = Array.from({ length: 32 }, (_, index) => {
  const week = String(index + 1).padStart(2, '0');
  return { text: `第 ${index + 1} 周`, link: `/course/week-${week}` };
});

export default defineConfig({
  lang: 'zh-CN',
  title: 'Node.js 全栈学习手册',
  description: '面向 Java 后端工程师的 32 周项目驱动式 Node.js 全栈教材',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    search: { provider: 'local' },
    nav: [
      { text: '开始学习', link: '/getting-started/' },
      { text: '32 周课程', link: '/course/' },
      { text: '实验', link: '/labs/' },
      { text: '项目附录', link: '/appendix/project-map' },
    ],
    sidebar: {
      '/getting-started/': [
        { text: '开始之前', items: [
          { text: '如何使用本书', link: '/getting-started/' },
          { text: '环境安装', link: '/getting-started/environment' },
          { text: '学习与验收方法', link: '/getting-started/method' },
        ] },
      ],
      '/course/': [
        { text: '课程总览', items: [{ text: '32 周路线', link: '/course/' }] },
        { text: '每周课程', collapsed: false, items: weeks },
      ],
      '/labs/': [
        { text: '配套实训', items: [
          { text: '实验使用说明', link: '/labs/' },
          { text: '阶段项目', link: '/labs/milestones' },
          { text: '毕业项目', link: '/labs/capstone' },
        ] },
      ],
      '/appendix/': [
        { text: '项目附录', items: [
          { text: 'CRM 代码知识地图', link: '/appendix/project-map' },
          { text: '67 个云函数索引', link: '/appendix/functions' },
          { text: '版本兼容矩阵', link: '/appendix/compatibility' },
          { text: '术语与延伸资料', link: '/appendix/references' },
        ] },
      ],
    },
    socialLinks: [],
    footer: { message: '以可运行代码验证知识，以真实项目连接学习。' },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一课', next: '下一课' },
  },
});
