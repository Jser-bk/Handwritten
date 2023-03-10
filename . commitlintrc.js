module.exports = {
  // commit lint校验规则继承
  extends: ['@commitlint/config-conventional'],
  // 自定义校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'merge',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'release',
      ],
    ],
  },
};
