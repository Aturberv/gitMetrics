const fetch = require('isomorphic-fetch');
const fs = require('fs');
const Repo = require('../server/repo/repoModel.js')
const client_id = process.env.GH_CLIENT_ID
const mongoose = require('mongoose');
const beginnerRepos = {
	moby: 'moby/moby',
	node: 'nodejs/node',
	atom: 'atom/atom',
	django: 'django/django',
	rustLang: 'rust-lang/rust',
	homebrew: 'Homebrew/brew',
	howdyai: 'howdyai/botkit',
	middleman: 'middleman/middleman',
	zulip: 'zulip/zulip',
	exercism: 'exercism/exercism.io',
	hospitalRun: 'HospitalRun/hospitalrun-frontend',
	hoodie: 'hoodiehq/hoodie',
	pybee: 'pybee/batavia'
}

const mongoURI = 'mongodb://teamfirrre:teamfire1@ds245518.mlab.com:45518/teamfirescratchproject';
mongoose.connect(mongoURI, {useMongoClient: true})

const repoObj = {};

function parseData(repo) {
	return new Promise((resolve, reject) => {
	return fetch(`https://api.github.com/repos/${repo}?client_id=${client_id}`)
	.then((res) => res.json())
	.then((data) => {
		console.log('data', data)
		let info = repo.split('/')
		repoObj[info[1]] = {
			org: info[0],
			forks: data.forks,
			open_issues: data.open_issues,
			watchers: data.watchers,
			url: data.html_url,
			avatar: data.avatar_url,
			description: data.description
		}
	})
	.then(() => { parseLanguages(repo) })
	.then(() => { parseIssues(repo) })
	.then(() => { resolve() })
	.catch((err) => {reject(err)})
	})
}

function parseLanguages(repo) {
	return fetch(`https://api.github.com/repos/${repo}/languages?client_id=${client_id}`)
	.then((res) => res.json())
	.then((data) => {
		console.log('lang', data)
		let info = repo.split('/')
		let languageArr = [];
		languageArr.push(data)
		repoObj[info[1]].languages = languageArr
	})
	.catch((err) => {console.log(err)})
}

function parseIssues(repo) {
	return fetch(`https://api.github.com/repos/${repo}/issues?client_id=${client_id}`)
	.then((res) => res.json())
	.then((data) => {
		console.log('issue', data)
		let info = repo.split('/')
		let issueLabels = {};
			if(Array.isArray(data)) {
				data.forEach((issue) => {
					issue.labels.reduce((acc, label) => {
						if(acc[label.name] === undefined) acc[label.name] = 1
						else acc[label.name] += 1
						return acc
					},	issueLabels)
				})
			}
		let issueArr = [];
		issueArr.push(issueLabels)
		repoObj[info[1]].issues = issueArr
		return repoObj
	})
	.catch((err) => {console.log(err)})
}

function repoStore(repo) {
	return new Promise(function(resolve, reject){
		Repo.create({
			name: repo,
			org: repoObj[repo].org,
			forks: repoObj[repo].forks,
			open_issues: repoObj[repo].open_issues,
			watchers: repoObj[repo].watchers,
			url: repoObj[repo].url,
			description: repoObj[repo].description,
			languages: repoObj[repo].languages,
			issues: repoObj[repo].issues
		}, (err, repoDB) => {
			if(err) {
				console.log(err)
				reject('rejected')
			} else {
				console.log(repoDB)
				resolve('success')
			}
		})
		// if(err) reject(err)
		// else resolve()
	})
}

// Object.keys(beginnerRepos).forEach((repo) => {
// 	repoStore(repo)
// })

let promises = [];

Object.keys(beginnerRepos).forEach((repo) => {
	promises.push(parseData(beginnerRepos[repo]))
})

Promise.all(promises).then(() => {
	fs.writeFile('./repoData.json', JSON.stringify(repoObj, null, 4), (err) => {
		if(err) console.log(err)
	})
	Object.keys(repoObj).forEach((repo) => {
		repoStore(repo)
	})
}).catch((error) => { console.log(error) })


// parseData('pybee/batavia')
// setTimeout(() => { Repo.create({
// 	name: 'batavia',
// 	org: repoObj['batavia'].org,
// 	forks: repoObj['batavia'].forks,
// 	open_issues: repoObj['batavia'].open_issues,
// 	watchers: repoObj['batavia'].watchers,
// 	url: repoObj['batavia'].url,
// 	description: repoObj['batavia'].description,
// 	languages: repoObj['batavia'].languages,
// 	issues: repoObj['batavia'].issues
// }, (err, repo) => { if (err) console.log(err)
// 	else console.log(repo)
// })}, 3000)
