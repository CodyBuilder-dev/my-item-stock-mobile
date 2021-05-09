const { Octokit } = require("@octokit/core");
const octokit = new Octokit({auth:"Github Token(ghp_...) with 'repo' scope"});

async function migrate_labels() {
    const res = await octokit.request('GET /repos/{owner}/{repo}/labels', {
        owner: 'codybuilder-dev',
        repo: 'my-item-stock'
    })

    // Label name과 color 가져오기
    const label_list = res.data.map(x=>[x.name,x.color])
    console.log(label_list)
    label_list.forEach( async(x) => {
        await octokit.request('POST /repos/{owner}/{repo}/labels', {
            owner: 'codybuilder-dev',
            repo: 'my-item-stock-mobile',
            name: x[0],
            color: x[1]
         })
    })
}

migrate_labels()