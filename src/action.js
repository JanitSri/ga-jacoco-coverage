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
        issue_number: issue.number,
        body: `Hello World - PR Number: ${issue.number}...runnigng code coverage - ${comment.body}`
    });

    console.log(comment);
}

run();