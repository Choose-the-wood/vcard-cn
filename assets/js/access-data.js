// 这里的配置随网站发布，仅填写公开入口、管理员联系方式和专用体验账号。
// miniPrograms 支持多个小程序：[{ name: '可搜索的小程序名称', qrImage: '' }]。
// downloads 填写正式 Android / iOS 下载地址；空值时提供联系管理员获取的入口。
// account 可选：{ username, password, note }，默认通过管理员获取。
window.PORTFOLIO_ADMIN = { phone: '18336261273' };

window.PORTFOLIO_ACCESS = {
  'qingling-mini': { website: '', miniPrograms: [], account: null },
  'lingxiaopin-web': { website: 'https://vip.wisematch.com.cn/matcher', account: null },
  'company-skills': { website: 'https://github.com/Choose-the-wood/pt-skills', websiteLabel: '查看 Skill 仓库', accountRequired: false },
  'school-mini': {
    miniPrograms: [{ name: 'wisematch校园版', qrImage: '' }],
    downloads: { android: '', ios: '' }, account: null,
  },
  'wisematch-web': {
    website: 'https://wisematch.com.cn/',
    miniPrograms: [{ name: 'wisematch', qrImage: '' }],
    downloads: { android: '', ios: '' }, account: null,
  },
  'ai-friend': { miniPrograms: [{ name: 'wisematch甜蜜版', qrImage: '' }], account: null },
  'school-manager': { website: '', account: null },
  'platform-manager': { website: '', account: null },
  'qingling-admin': { website: '', account: null },
  'local-hr': { website: '', account: null },
  'ai-relay': { website: 'https://gpt.wisematch.com.cn/', account: null },
  'digital-human': {
    website: 'https://www.huyingai.com/',
    miniPrograms: [{ name: '光年引力', qrImage: '' }], account: null,
  },
  'taimanman': {
    website: 'https://www.taimanman.com/',
    miniPrograms: [{ name: '台满满商家', qrImage: '' }, { name: '台满满+', qrImage: '' }], account: null,
  },
  'feiqiu': {
    website: 'http://ficoo.vip/gywm',
    miniPrograms: [{ name: '我爱桌球', qrImage: '' }, { name: '非球科技管理端', qrImage: '' }], account: null,
  },
};
