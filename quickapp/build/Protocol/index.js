(function(){
  
  var createPageHandler = function() {
    return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ({

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var $app_template$ = __webpack_require__(56)
var $app_style$ = __webpack_require__(57)

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$){
     $app_module$.exports.template = $app_template$
     $app_module$.exports.style = $app_style$
})

$app_bootstrap$('@app-component/index',{ packagerVersion: '0.0.5'})


/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "flex_page"
      ],
      "children": [
        {
          "type": "text",
          "attr": {
            "value": "e兼职用户协议"
          },
          "classList": [
            "title"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "“e兼职”平台通过以下条款为您提供服务。您只有完全同意下列所有服务条款并完成注册程序，才能成为”e兼职”的用户并使用相应服务。您在使用”e兼职”提供的各项服务之前，应仔细阅读本用户协议。 您在注册程序过程中点击“我已阅读并同意《用户注册和隐私协议》”按钮后即表示您与”e兼职”达成协议，完全接受本服务条款项下的全部条款。您一旦使用”e兼职”的服务，即视为您已了解并完全同意本服务条款各项内容，包括”e兼职”对服务条款随时做的任何修改。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "一、服务说明"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "“e兼职”的具体服务内容由”e兼职”根据实际情况提供，如照片上传功能、私信功能、在线投票、在线参加活动等。”e兼职”保留变更、中断或终止部分网络服务的权利。 “e兼职”保留根据实际情况随时调整”e兼职”平台提供的服务种类、形式的权利。”e兼职”不承担因业务调整给用户造成的损失。”e兼职”仅提供相关服务，除此之外与本服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由用户自行负担。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "二、隐私条款"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "1.用户在注册账号或使用本服务的过程中，可能需要填写或提交一些必要的信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则用户可能无法使用本服务或在使用本服务的过程中受到限制。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "2.个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、身份证号、手机号码、手机设备识别码、IP地址、用户聊天记录。非个人隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在e兼职服务器端的基本记录信息、个人隐私信息范围外的其它普通信息，以及用户同意公开的上述隐私信息。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "3.尊重用户个人隐私信息的私有性是e兼职的一贯制度，e兼职将采取技术措施和其他必要措施，确保用户个人隐私信息安全，防止在本服务中收集的用户个人隐私信息泄露、毁损或丢失。在发生前述情形或者e兼职发现存在发生前述情形的可能时，将及时采取补救措施"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "4.e兼职未经用户同意不向任何第三方公开、 透露用户个人隐私信息。但以下特定情形除外"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(1) e兼职根据法律法规规定或有权机关的指示提供用户的个人隐私信息；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(2) 由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人信息的泄漏，或其他非因e兼职原因导致的个人隐私信息的泄露；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(3) 用户自行向第三方公开其个人隐私信息；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(4) 用户与e兼职及合作单位之间就用户个人隐私信息的使用公开达成约定，e兼职因此向合作单位公开用户个人隐私信息；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(5) 任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "5.用户同意e兼职可在以下事项中使用用户的个人隐私信息："
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(1) e兼职向用户及时发送重要通知，如软件更新、本协议条款的变更；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(2) e兼职内部进行审计、数据分析和研究等，以改进e兼职的产品、服务和与用户之间的沟通；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(3) 依本协议约定，e兼职管理、审查用户信息及进行处理措施；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "(4) 适用法律法规规定的其他事项。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "除上述事项外，如未取得用户事先同意，e兼职不会将用户个人隐私信息使用于任何其他用途。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "6.为了改善e兼职的技术和服务，向用户提供更好的服务体验，e兼职或可会自行收集使用或向第三方提供用户的非个人隐私信息。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "三、注册信息"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "如发现用户账号中含有不雅文字或不恰当名称的，本平台保留取消用户资格的权利。 请勿以党和国家领导人或其他社会名人真实姓名、字号、艺名、笔名注册； 请勿以国家机构或其他机构名称注册 请勿注册不文明、不健康的名称，及包含歧视、侮辱、猥亵类词语的名称 请勿注册易产生歧义、引起他人误解或其他不符合法律规定的账号； 用户自己有义务保证账号和密码的安全，用户利用该账号和密码进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本平台不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应该立即修改帐号密码并妥善保管，如有必要，请通知本平台，因黑客行为或用户的保管疏忽导致账号非法使用，本平台不承担任何责任。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "四、用户行为"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "用户同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "1.发布或以其它方式传送含有下列内容之一的信息："
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "反对宪法所确定的基本原则的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "损害国家荣誉和利益的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "煽动民族仇恨、民族歧视、破坏民族团结的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "破坏国家宗教政策，宣扬邪教和封建迷信的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "散布谣言，扰乱社会秩序，破坏社会稳定的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "侮辱或者诽谤他人，侵害他人合法权利的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "含有虚假、诈骗、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "含有”e兼职”认为不适合在”e兼职”展示的内容；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "2.以任何方式危害他人的合法权益；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "3.冒充其他任何人或机构，或以虚伪不实的方式陈述或谎称与任何人或机构有关；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "4.将依据任何法律或合约或法定关系（例如由于雇佣关系和依据保密合约所得知或揭露之内部资料、专属及机密资料）知悉但无权传送之任何内容加以发布、发送电子邮件或以其它方式传送；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "5.将侵害他人著作权、专利权、商标权、商业秘密、或其它专属权利（以下简称“专属权利”）之内容加以发布或以其它方式传送；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "6.将任何广告信函、促销资料、“垃圾邮件”、““滥发信件”、“连锁信件”、“直销”或其它任何形式的劝诱资料加以发布、发送或以其它方式传送；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "7.将设计目的在于干扰、破坏或限制任何计算机软件、硬件或通讯设备功能之计算机病毒（包括但不限于木马程序（trojan horses）、蠕虫（worms）、定时炸弹、删除蝇（cancelbots）（以下简称“病毒”）或其它计算机代码、档案和程序之任何资料，加以发布、发送或以其它方式传送；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "8.干扰或破坏本服务或与本服务相连线之服务器和网络，或违反任何关于本服务连线网络之规定、程序、政策或规范；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "9.跟踪、人肉搜索或以其它方式骚扰他人；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "10.故意或非故意地违反任何适用的当地、国家法律，以及任何具有法律效力的规则"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "11.未经合法授权而截获、篡改、收集、储存或删除他人个人信息、站内邮件或其它数据资料，或将获知的此类资料用于任何非法或不正当目的。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "您已认可”e兼职”未对用户的使用行为进行全面控制，您使用任何内容时，包括依赖前述内容之正确性、完整性或实用性时，您同意将自行加以判断并承担所有风险，而不依赖于”e兼职”。但”e兼职”依其自行之考虑，可拒绝和删除经由本服务提供之违反本条款的或其它引起”e兼职”反感的任何内容。您了解并同意，”e兼职”依据法律法规的要求，或基于诚信为了以下目的或在合理必要范围内，认定必须将内容加以保存或揭露时，得加以保存或揭露："
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "1.遵守法律程序；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "2.执行本使用协议；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "3.回应任何第三人提出的权利主张；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "4.保护”e兼职”、其用户及公众之权利、财产或个人安全；"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "5.其它”e兼职”认为有必要的情况。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "五、知识产权"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "“e兼职”的整体内容版权属于北京世诚优聘科技发展有限公司所有。”e兼职”所有的产品、技术与所有程序均属于”e兼职”知识产权，在此并未授权。”e兼职”为我们的商标。 “e兼职”所有设计图样以及其他图样、产品及服务名称，均为北京世诚优聘科技发展有限公司所享有的商标、标识。任何人不得使用、复制或用作其他用途。 我们对”e兼职”专有内容、原创内容和其他通过授权取得的独占或者独家内容享有完全知识产权。未经我们许可，任何单位和个人不得私自复制、传播、展示、镜像、上载、下载、使用，或者从事任何其他侵犯我们知识产权的行为。否则，我们将追究相关法律责任。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "六、内容所有权"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "“e兼职”提供的本服务内容可能包括：文字、软件、声音、图片、录象、图表等。所有这些内容受版权、商标和其它财产所有权法律的保护。 用户只有在获得”e兼职”或其他相关权利人的授权之后才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。 “e兼职”鼓励用户充分利用”e兼职”平台自由地张贴和共享自己的信息，但这些内容必须位于公共领域内，或者用户拥有这些内容的使用权。同时，用户对于其创作并在”e兼职”上发布的合法内容依法享有著作权及其相关权利。用户不应通过”e兼职”张贴其他受版权保护的内容。”e兼职”如果收到正式版权投诉，将会删除这些内容。 在”e兼职”张贴的公开信息 在本协议中，“本服务公开使用区域”系指一般公众可以使用的区域。 用户同意已就用户于本服务公开使用区域及本服务其它任何公开使用区域张贴之内容，或包括照片、图形或影音资料等内容，授予”e兼职”全球性、免许可费及非独家的使用权，”e兼职”可以为了展示、散布及推广张贴前述内容之特定服务目的，将前述内容复制、修改、改写、改编或出版，对于照片及图形资料的上述使用，仅为张贴该照片或图形于本服务之目的而为之。在用户将前述内容放入本服务期间，使用权持续有效；若用户将前述内容自本服务中删除，则使用权于删除时终止。 用户同意已就用户于本服务其它公开使用区域张贴的其它内容，授予”e兼职”免许可费、永久有效、不可撤销、非独家及可完全再授权之权利在全球使用、复制、修改、改写、改编、发行、翻译、创造衍生性著作，及/或将前述内容（部分或全部）加以散布、表演、展示，及/ 或放入利用任何现在已知和未来开发出之形式、媒体和科技之其它著作物当中。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "七、遵守法律"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "您同意遵守中华人民共和国相关法律法规的所有规定，并对以任何方式使用您的密码和您的帐号使用本服务的任何行为及其结果承担全部责任。如您的行为违反国家法律和法规的任何规定，有可能构成犯罪的，将被追究刑事责任，并由您承担全部法律责任。同时，如果”e兼职”有理由认为您的任何行为，包括但不限于您的任何言论和其它行为违反或可能违反国家法律和法规的任何规定，”e兼职”可在任何时候不经任何事先通知终止向您提供服务。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "八、与广告商进行交易"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "用户通过本服务与广告商进行任何形式的通讯或商业往来，或参与促销活动，包含相关商品或服务之付款及交付，以及达成的其它任何相关条款、条件、保证或声明，完全为用户与广告商之间之行为。有关法律法规有明文规定要求”e兼职”承担责任以外，用户因前述任何交易或前述广告商而遭受的任何性质的损失或损害，”e兼职”均不予负责。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "九、免责声明"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "互联网是一个开放平台，用户将照片等个人资料上传到互联网上，有可能会被其他组织或个人复制、转载、擅改或做其它非法用途，用户必须充分意识此类风险的存在。用户明确同意其使用”e兼职”服务所存在的风险将完全由其自己承担；因其使用”e兼职”服务而产生的一切后果也由其自己承担，我们对用户不承担任何责任。我们不保证服务一定能满足用户的要求，也不保证服务不会中断，对服务的及时性、安全性、准确性也都不作保证。对于因不可抗力或”e兼职”无法控制的原因造成的网络服务中断或其他缺陷，”e兼职”不承担任何责任。我们不对用户所发布信息的删除或储存失败承担责任。我们有权判断用户的行为是否符合本网站使用协议条款之规定，如果我们认为用户违背了协议条款的规定，我们有终止向其提供网站服务的权利。"
          },
          "classList": [
            "text"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "十、附则"
          },
          "classList": [
            "subtitle"
          ]
        },
        {
          "type": "text",
          "attr": {
            "value": "本用户条款的订立、执行和解释及争议的解决均应适用中华人民共和国法律。 如用户就本协议内容或其执行发生任何争议，用户应尽量与我们友好协商解决；协商不成时，任何一方均可向”e兼职”所在地的人民法院提起诉讼。我们未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。如本用户条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本用户条款的其余条款仍应有效并且有约束力。本协议所有条款的最终解释权属于”e兼职”。"
          },
          "classList": [
            "text"
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

module.exports = {
  ".page .flex_page": {
    "width": "100%",
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": "0px",
    "paddingRight": "46px",
    "paddingBottom": "0px",
    "paddingLeft": "46px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "flex_page"
        }
      ]
    }
  },
  ".title": {
    "color": "#333333",
    "fontSize": "40px",
    "textAlign": "center",
    "marginTop": "34px",
    "marginRight": "0px",
    "marginBottom": "34px",
    "marginLeft": "0px"
  },
  ".text": {
    "color": "#333333",
    "fontSize": "22px"
  },
  ".subtitle": {
    "fontSize": "26px",
    "color": "#333333"
  }
}

/***/ })

/******/ });
  };
  if (typeof window === "undefined") {
    return createPageHandler();
  }
  else {
    window.createPageHandler = createPageHandler
  }
})();
//# sourceMappingURL=index.js.map