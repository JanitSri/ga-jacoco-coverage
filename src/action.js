const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const fs = require('fs/promises');
const pomParser = require("pom-parser");

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

    const POM_FILE = 'pom.xml';
    readPom(path.join(GITHUB_WORKSPACE, POM_FILE))
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

function readPom(pomFile) {
    console.log(`Reading pom.xml: ${pomFile}`);
    pomParser.parse({ filePath: pomFile }, function(err, pomResponse) {
        if (err) {
          console.log("ERROR: " + err);
          process.exit(1);
        }
      
        console.log("XML: " + pomResponse.pomXml);
        console.log("===========================");
        console.log("OBJECT: " + JSON.stringify(pomResponse.pomObject));
    });
}

run();