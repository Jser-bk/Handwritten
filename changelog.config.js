// changelog配置，commit规则也在这里进行配置参考文档：https://www.npmjs.com/package/git-cz

module.exports = {
  disableEmoji: false,
  list: ['feat', 'fix', 'style', 'docs', 'merge', 'chore', 'ci', 'perf', 'refactor', 'release', 'test'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    // "lerna"
  ],
  scopes: [],
  // 翻译了一下描述部分
  types: {
    feat: {
      description: '功能开发',
      emoji: '🎲',
      value: 'feat',
    },
    fix: {
      description: 'bug修复',
      emoji: '🐞',
      value: 'fix',
    },
    style: {
      description: '代码的样式美化，不修改代码逻辑',
      emoji: '🌺',
      value: 'style',
    },
    docs: {
      description: '文档的新增或者修改',
      emoji: '📚',
      value: 'docs',
    },
    merge: {
      description: 'merge或者cherry-pick代码',
      emoji: '🔀',
      value: 'merge',
    },
    chore: {
      description: '与主要业务无关的构建/工程依赖/工具等功能改动（比如新增一个文档生成工具）',
      emoji: '🎁',
      value: 'chore',
    },
    ci: {
      description: '自动化工具的新增或者修改',
      emoji: '🔨',
      value: 'ci',
    },
    perf: {
      description: '性能优化，不改动代码逻辑和样式',
      emoji: '🚀',
      value: 'perf',
    },
    refactor: {
      description: '代码结构优化，不新增和修改现有逻辑',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: '创建一个发布版本',
      emoji: '🏆',
      value: 'release',
    },
    test: {
      description: '新增或者修改已有的测试代码',
      emoji: '🤺',
      value: 'test',
    },
  },
};
