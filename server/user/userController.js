const fetch = require('node-fetch');
const client_secret = process.env.GH_CLIENT_SECRET;
const client_id = process.env.GH_CLIENT_ID;
const orgController = require('./../orgs/orgController');
const repoController = require('./../repo/repoController');


const userController = {};

function getTokenFromGithub(req, res) {
  const code = req.query.code;
  const giturl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  let token;
  const options1 = {
    method: 'POST',
    headers: {'Content-Type': 'text'}
  };
  return new Promise( (resolve, reject) => {
    fetch(giturl, options1)
      .then( response => response.text())
      .then( text => {
        res.locals.token = text.split('&')[0].split('=')[1];
        const option = { maxAge: 600000, httpOnly: true };
        res.cookie('token', res.locals.token, option);
        resolve();
      })
      .catch( err => {
        console.log('fetch token ERR', err);
        reject('err in getTokenFromGithub');
      });
  });
}

userController.getToken = (req, res, next) => {
  if (!req.url.includes('/?code')) return res.send('no code');
  if (req.cookies.token) {
    res.locals.token = req.cookies.token;
    console.log('token exsit',req.cookies.token);
    next();
  } else {
    getTokenFromGithub(req, res)
      .then(() => { next(); })
      .catch(err => console.log('getToken',err));
  }

}

userController.getOneOrg = (req, res, next) => {
  const org = 'uber';
  const giturl = `https://api.github.com/orgs/${org}`;
  res.locals.optionsFetch = {
    method: 'GET',
    headers: {'User-Agent': 'GitSource',
              'Authorization': `token ${res.locals.token}` }
  };
  fetch(giturl, res.locals.optionsFetch)
    .then( response => response.json() )
    .then( organization => {
      res.locals.organization = organization;
      // console.log(res.locals.organization.name.toLowerCase());
    })
    .then( () => {next();})
    .catch( err => console.log('fetchAPI failer', err) )
}

userController.getReposInfo = (req, res, next) => {
  const repoPages = Math.ceil(res.locals.organization.public_repos/30);    // public_repos --- number of total repos
  const initialProms = [];
  for (let i=1; i <= repoPages; i++) {
    initialProms.push(fetchRequest('repo', res.locals.organization.repos_url + `?page=${i}`, res.locals.optionsFetch));
  }
  Promise.all(initialProms)
    .then( (result) => {
      res.locals.allrepos = result.reduce((arr, reposOfOnePage) => {
        arr = arr.concat(reposOfOnePage);
        return arr;
      }, []);
    })
    .then( () => next() )
    .catch( (err) => console.log(err) )
}


userController.langAndContr = (req, res, next) => {
  // deleteOneRepo('paddle_paddle_model_zoo', res);
  const initialProms = [];
  for (let i=0; i < res.locals.allrepos.length; i++) {
    // if (res.locals.allrepos[i].name === 'paddle_paddle_model_zoo') console.log(res.locals.allrepos[i]);
    initialProms.push(fetchRequest('language', res.locals.allrepos[i].languages_url, res.locals.optionsFetch));
    initialProms.push(fetchRequest('contributor', res.locals.allrepos[i].contributors_url, res.locals.optionsFetch));
  }

  Promise.all(initialProms)
    .then( (result) => {
      const allLang = [];
      const allContr = [];
      for (let i=0; i < initialProms.length; i+=2) {
        const contrs = [];
        for (let contr of result[i+1]) {
          contrs.push({login: contr.login, contributions: contr.contributions})
        }
        allContr.push(contrs);
        allLang.push(result[i]); //language Obj
      }
      repoController.createRepos(res.locals.organization, res.locals.allrepos, allLang, allContr);
    })
    .then( () => next() )
    .catch( (err) => console.log(err) )
};

function fetchRequest( purpose, url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then( response => response.json() )
      .then(   (data) => resolve(data) )
      // .catch(      () => resolve([]) )
      .catch(   (err) => reject(`ERR in ${purpose} Request ${url} ${err}`))
  });
}


function deleteOneRepo(repoName, res) {
  let idx;
  for (idx=0; idx < res.locals.allrepos.length; idx++) {
    if (res.locals.allrepos[idx].name === repoName) break;
  }
  res.locals.allrepos.splice(idx,1);
}





module.exports = userController;
