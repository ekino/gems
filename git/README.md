# Git

## Git conventions

1. [Conventional Commits](https://www.conventionalcommits.org)
    - [Git Commit Msg](https://karma-runner.github.io/6.4/dev/git-commit-msg.html)
1. [Use the imperative mood in the subject line](https://cbea.ms/git-commit/#imperative)

A quick look at some of the main points:

1. MUST **type**, **subject** and **footer**
1. SHOULD **scope**
1. MUST use **footer** for reference (eg. ticket id) ; MUST NOT use **scope** for reference
1. SHOULD use markdown link format in case of no GitLab integration (eg. generated URL link)

Examples:

```diff
# Wrong type & bad desc (past tense)
- fix(button): initiated component …
+ feat(button): init component …
```

```diff
# Ref & bad desc
- fix(FOO-666): fix rule
+ fix(auth): add required oauth 2 configuration
+ 
+ Refs: [FOO-666](https://…/FOO-666)
```

## Git internal config

1. [.gitignore](https://git-scm.com/docs/gitignore) (MUST)
1. [.gitattributes](https://git-scm.com/docs/gitattributes) (SHOULD)

## Git helpers

1. [Commitlint](https://commitlint.js.org/) (MUST)
    1. [Config](https://commitlint.js.org/reference/configuration.html)
1. [Husky](https://typicode.github.io/husky/) (MUST)
    1. [Config](https://typicode.github.io/husky/how-to.html)
    1. eg. `.husky/{pre-commit | pre-push…}`
1. [Commitizen](https://commitizen-tools.github.io/commitizen/) (SHOULD)
    1. [Config](https://commitizen-tools.github.io/commitizen/config/)
