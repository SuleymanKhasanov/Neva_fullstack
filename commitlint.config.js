module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feature',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'revert',
      ],
    ],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-max-length': [2, 'always', 72],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
    'scope-empty': [2, 'always'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+) \[Neva-\d+\]: (.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
};
