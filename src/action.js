const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const GITHUB_TOKEN = core.getInput('githubToken');
    const octokit = github.getOctokit(GITHUB_TOKEN);

    const context = github.context;

    const { comment } = context.payload;
    const { pull_request } = context.payload;

    // await octokit.rest.issues.createComment({
    //     repo: context.repo.repo,
    //     owner: context.repo.owner,
    //     issue_number: pull_request.number,
    //     body: `Hello World - PR Number: ${pull_request.number}`
    // });

    console.log(comment);
    console.log(pull_request);
}

run();