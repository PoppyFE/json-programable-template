# json-programable-template

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/json-programable-template.svg?style=flat-square
[npm-url]: https://npmjs.org/package/json-programable-template
[travis-image]: https://img.shields.io/travis/eggjs/json-programable-template.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/json-programable-template
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/json-programable-template.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/json-programable-template?branch=master
[david-image]: https://img.shields.io/david/eggjs/json-programable-template.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/json-programable-template
[snyk-image]: https://snyk.io/test/npm/json-programable-template/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/json-programable-template
[download-image]: https://img.shields.io/npm/dm/json-programable-template.svg?style=flat-square
[download-url]: https://npmjs.org/package/json-programable-template

<!--
Description here.
-->

## Install

```bash
$ npm i json-programable-template --save
```


## Example

```bash
Here is a basic example 

const helloWorld = {
    "rules":{
        hello:"const@hello",
        world:"const@world",
    }
};

const model = new JSONNormal().parseJson(helloWorld,null);

output: { hello: 'hello', world: 'world' }
```

```bash
let us move a bit deeper

const sum = {
    "rules":{
        sum:"const@1 => sum@5,6",
        sumTwo:"const@1 => sum@10,11",
    }
};

const model = new JSONNormal().parseJson(sum);

output: { sum: 11, sumTwo: 21 }

```

```bash
You can use key word '~' to get previous value

const sum = {
    "rules":{
        sum:"const@1 => sum@~,~,10",
        sumTwo:"const@1 => sum@10,11",
    }
};

const model = new JSONNormal().parseJson(sum);

output: { sum: 12, sumTwo: 21 }
```

```bash
You also can define and use you own function here as well

const moment = require('moment');

const sum = {
    "rules":{
        currentTime:"time@now",
        parseTime: "const@20181021 => time@~,YYYY-MM-DD,YYYY-MM-DD HH:mm:ss"
    }
};

const model = new JSONNormal().parseJson(sum,func);

output: 
{ 
  currentTime: '2018-10-22T15:58:21+08:00',
  parseTime: '2018-10-21 00:00:00'
}

however the arguments you passed in the function should follow the rules:
function(argOne, argTwo, argThree, custom variable);
The last argument have to leave the space to the custom variable. 
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
