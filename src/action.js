const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const GITHUB_TOKEN = core.getInput('githubToken');
    const octokit = github.getOctokit(myToken);

    const context = github.context;

    const { pull_request } = context.payload;

    await octokit.rest.issues.createComment({
        repo: context.repo,
        owner: context.owner,
        issue_number: pull_request.number,
        body: `Hello World - PR Number: ${pull_request.number}`
    });

}

run();