# Tools and Linters

Getting the most out of _an automatic toolchain_ in order to focus on the best part of our work.

## Documentation

First thing first, each good project must have good internal ressources. Installation, team, guidelines, environments, features…

### ./README.md

The main entry point, everything start here.  
A global dedicated folder is encouraged (eg. `./docs`)

Example:

```md
<!-- ./README.md -->
# App name

Few words of introduction… app purpose… key features…

1. [Installation](./docs/install.md)
1. [Git guidelines](./docs/git.md)
1. [Feature A](./…/feature-a/README.md)
```

Alternatively, for main features, a `README.md` on the dedicated folder can be an option.

### 💡 Tips

1. It is recommended to use an helper such as [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) or equivalent in order to lint and improve consistency and readability.

### 📚 Ressources

1. [Outdated Docs Are Tech Debt](https://www.trevorlasn.com/blog/outdated-docs-are-tech-debt)

## Git & cie

### Git conventions

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

### Git internal config

1. [.gitignore](https://git-scm.com/docs/gitignore) (MUST)
1. [.gitattributes](https://git-scm.com/docs/gitattributes) (SHOULD)

### Git helpers

1. [Commitlint](https://commitlint.js.org/) (MUST)
    1. [Config](https://commitlint.js.org/reference/configuration.html)
1. [Husky](https://typicode.github.io/husky/) (MUST)
    1. [Config](https://typicode.github.io/husky/how-to.html)
    1. eg. `.husky/{pre-commit | pre-push…}`
1. [Commitizen](https://commitizen-tools.github.io/commitizen/) (SHOULD)
    1. [Config](https://commitizen-tools.github.io/commitizen/config/)

## CI/CD

1. [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/)
1. `.gitlab/`
    - A good way to organize [templates](https://docs.gitlab.com/ee/user/project/description_templates.html) (eg. MR templates and so on).
1. [Danger (Js)](https://danger.systems/js/)
    1. [Config](https://danger.systems/js/guides/getting_started#creating-a-dangerfile)
    1. eg. `dangerfile.common.ts`

## Node & cie

### Versions

Our App itself SHOULD track current Node and Npm (|| Yarn) used version. Distinct versions on a team can at least generate config conflicts.

1. [.nvmrc](https://github.com/nvm-sh/nvm?tab=readme-ov-file#nvmrc)
1. [.npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)

### Keep up with releases

1. [Renovate](https://docs.renovatebot.com/) (|| Dependabot)
    1. [renovate.json](https://docs.renovatebot.com/config-overview/)

## IDE

1. [.vscode/](https://code.visualstudio.com/docs/getstarted/settings#_settings-json-file)
    - eg. `.vscode/{settings | extensions | launch…}.json`

## Linters & cie

1. [Editorconfig](https://editorconfig.org/)
1. [Prettier](https://prettier.io/)
    1. [Config](https://prettier.io/docs/en/configuration)
    1. [Ignore](https://prettier.io/docs/en/ignore.html)
1. [ESLint](https://eslint.org/)
    1. [Config](https://eslint.org/docs/latest/use/configure/configuration-files)
    1. [Ignore](https://eslint.org/docs/latest/use/configure/ignore)
    1. ⚠️ No more [[deprecated] TSLint](https://palantir.github.io/tslint/)
1. [Stylelint](https://stylelint.io/)
    1. [Config](https://stylelint.io/user-guide/configure)
    1. [Ignore](https://stylelint.io/user-guide/ignore-code)

## @TODO

1. `CHANGELOG.md`
1. `.npm-version` ?
1. Monitoring (eg. SonarQube, Sentry, Snyk…) ?
