const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const fs = require('fs/promises');

async function run() {
    const GITHUB_TOKEN = core.getInput('githubToken');
    const octokit = github.getOctokit(GITHUB_TOKEN);

    const context = github.context;

    // const { comment } = context.payload;
    // const issue = context.issue;

    // await octokit.rest.issues.createComment({
    //     repo: issue.repo,
    //     owner: issue.owner,
    //     issue_number: issue.number,
    //     body: `Hello World - PR Number: ${issue.number}...runnigng code coverage - ${comment.body}`
    // });

    // console.log(comment);
    
    const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE;
    const FILENAME = core.getInput('filename');
    await readFile(path.join(GITHUB_WORKSPACE, FILENAME))
}

async function readFile(filename) {
    console.log(`Reading file: ${filename}`);

    try {
        let content = await fs.readFile(filename, { encoding: 'utf8' });    
        console.log(`CONTENT: ${content}`);
    } catch (err) {
        console.log(`ERROR: getting file - ${err}`);
    }
}

run();