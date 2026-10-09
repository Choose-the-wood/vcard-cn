(function () {
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  function webUrl(value) {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
    } catch { return ''; }
  }

  function externalButton(url, label) {
    return `<a class="cn-button" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}<ion-icon name="open-outline" aria-hidden="true"></ion-icon></a>`;
  }

  function administrator() {
    const phone = escape(window.PORTFOLIO_ADMIN.phone);
    return `<div class="cn-admin-contact"><p class="cn-admin-phone"><span>管理员手机号</span><a href="tel:${phone}">${phone}</a></p><div class="cn-action-row"><button type="button" class="cn-button" data-admin-copy><ion-icon name="copy-outline" aria-hidden="true"></ion-icon>复制手机号</button><a class="cn-button" href="weixin://"><ion-icon name="logo-wechat" aria-hidden="true"></ion-icon>打开微信</a></div><p class="cn-access-note">复制手机号后，可在微信中搜索联系。</p></div>`;
  }

  function website(item, entry) {
    const url = webUrl(entry.website);
    if (!url && !item.platforms.some((platform) => ['web', 'tool'].includes(platform))) return '';
    return `<section><h3>${item.platforms.includes('tool') ? '演示与资料' : '网站入口'}</h3>${url ? externalButton(url, entry.websiteLabel || '打开网站') : '<p>体验入口请联系管理员获取。</p>'}</section>`;
  }

  function miniPrograms(item, entry) {
    if (!item.platforms.includes('mini')) return '';
    const programs = (entry.miniPrograms || []).filter((program) => typeof program.name === 'string' && program.name.trim());
    const qrImages = programs.filter((program) => /^(\.\/)?assets\//.test(program.qrImage || '')).map((program) => `<figure class="cn-mini-qr"><img src="${escape(program.qrImage)}" alt="${escape(program.name)}小程序二维码"><figcaption>${escape(program.name)}</figcaption></figure>`).join('');
    const names = programs.map((program) => `<button type="button" class="cn-mini-label" data-mini-copy="${escape(program.name)}" aria-label="复制小程序名称 ${escape(program.name)}"><span>${escape(program.name)}</span><ion-icon name="copy-outline" aria-hidden="true"></ion-icon></button>`).join('');
    return `<section><h3>小程序入口</h3>${qrImages}${programs.length ? `<p>在微信中搜索，点击名称可复制。</p><div class="cn-mini-names">${names}</div>` : '<p>小程序体验入口请联系管理员获取。</p>'}</section>`;
  }

  function downloads(item, entry) {
    if (!item.platforms.includes('app')) return '';
    const platforms = [['android', 'Android App'], ['ios', 'iOS 版']];
    const rows = platforms.map(([key, label]) => {
      const url = webUrl(entry.downloads?.[key]);
      const action = url ? externalButton(url, '下载') : '<a class="cn-button" href="weixin://">联系获取</a>';
      return `<div class="cn-download-item"><strong>${label}</strong>${action}</div>`;
    }).join('');
    const missing = platforms.some(([key]) => !webUrl(entry.downloads?.[key]));
    return `<section><h3>App 下载</h3><p>${escape(item.appDescription || '提供 Android App 与 iOS 版体验。')}</p><div class="cn-download-list">${rows}</div>${missing ? '<p class="cn-access-note">下载链接请联系管理员获取。</p>' : ''}</section>`;
  }

  function account(entry) {
    if (entry.accountRequired === false) return '';
    if (!entry.account) return `<section><h3>体验账号</h3><p>体验账号请联系管理员获取。</p>${administrator()}</section>`;
    const account = entry.account;
    return `<section><h3>体验账号</h3><button type="button" class="cn-button" data-account-toggle aria-expanded="false">查看体验账号</button><div class="cn-account-fields" hidden><label>账号<input type="text" readonly value="${escape(account.username)}"></label><label>密码<input type="password" readonly value="${escape(account.password)}"></label>${account.note ? `<p>${escape(account.note)}</p>` : ''}<div class="cn-action-row"><button type="button" class="cn-button" data-account-copy>复制账号</button><button type="button" class="cn-button" data-password-copy>复制密码</button></div></div></section>`;
  }

  function skillCatalog(item) {
    if (item.id !== 'company-skills') return '';
    const skills = window.PORTFOLIO_SKILLS || [];
    const groups = new Map();
    skills.forEach((skill) => {
      if (!groups.has(skill.group)) groups.set(skill.group, []);
      groups.get(skill.group).push(skill);
    });
    const tables = [...groups].map(([group, items], index) => `<details class="cn-skill-group"${index === 0 ? ' open' : ''}><summary><span>${escape(group)}</span><span class="cn-skill-count">${items.length} 项</span><ion-icon name="chevron-down" aria-hidden="true"></ion-icon></summary><table class="cn-skill-table"><caption class="cn-visually-hidden">${escape(group)} Skill 名称与简介</caption><thead><tr><th scope="col">名称</th><th scope="col">简介</th></tr></thead><tbody>${items.map((skill) => `<tr data-skill-name="${escape(skill.name)}"><td><strong>${escape(skill.title)}</strong><small>${escape(skill.name)}</small></td><td>${escape(skill.description)}</td></tr>`).join('')}</tbody></table></details>`).join('');
    return `<section class="cn-skill-catalog"><h3>Skill 名称与简介</h3><p>已整理 ${skills.length} 项可复用工作流，点击分类可展开名称表与用途。</p><div class="cn-skill-groups">${tables}</div></section>`;
  }

  function renderProject(item, entry = {}) {
    const preview = item.preview ? `./assets/images/${item.preview.split('/').pop()}` : '';
    const body = `${preview ? `<figure class="cn-project-preview"><img src="${escape(preview)}" alt="${escape(item.title)}相关产品视觉"></figure>` : ''}<section><h3>项目介绍</h3><p>${escape(item.overview)}</p></section><section><h3>我的工作</h3><ul>${item.ownership.map((text) => `<li>${escape(text)}</li>`).join('')}</ul></section><section><h3>技术栈</h3><div class="cn-stack">${item.stack.map((text) => `<span>${escape(text)}</span>`).join('')}</div></section><section><h3>关键实践</h3><ul>${item.highlights.map((text) => `<li>${escape(text)}</li>`).join('')}</ul></section>${skillCatalog(item)}`;
    const access = `${website(item, entry)}${miniPrograms(item, entry)}${downloads(item, entry)}${account(entry)}`;
    return `<header class="cn-project-header"><p class="project-type">${escape(item.role)} · ${escape(item.year)}</p><h2 id="project-detail-title">${escape(item.title)}</h2><p>${escape(item.description)}</p></header><div class="cn-project-columns"><div class="cn-project-body">${body}</div><aside class="cn-access" aria-label="项目体验入口">${access}</aside></div>`;
  }

  window.PORTFOLIO_VIEWS = { escape, renderProject };
})();
