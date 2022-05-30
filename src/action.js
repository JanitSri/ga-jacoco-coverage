const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const GITHUB_TOKEN = core.getInput('githubToken');
    const octokit = github.getOctokit(GITHUB_TOKEN);

    const context = github.context;

    const { comment } = context.payload;
    const issue = context.issue;

    await octokit.rest.issues.createComment({
        repo: issue.repo,
        owner: issue.owner,
        issue_number: issue.pull_request,
        body: `Hello World - PR Number: ${pull_request.number}...runnigng code coverage`
    });
}

run();