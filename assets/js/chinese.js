(function () {
  const $ = (selector) => document.querySelector(selector);
  const projects = window.PORTFOLIO_PROJECTS;
  const owner = window.PORTFOLIO_OWNER;
  const access = window.PORTFOLIO_ACCESS;
  const labels = { web: '网站', mini: '小程序', app: 'App', tool: '研发工具' };
  const { escape, renderProject } = window.PORTFOLIO_VIEWS;
  const preview = (item) => item.preview ? `./assets/images/${item.preview.split('/').pop()}` : '';
  const cover = (item) => preview(item)
    ? `<img src="${escape(preview(item))}" alt="${escape(item.title)}产品视觉" loading="lazy">`
    : `<div class="cn-cover tone-${escape(item.tone)}" aria-hidden="true"><strong>${escape(item.avatar)}</strong><span>${escape(item.category)}</span></div>`;

  const social = $('.social-list');
  social.innerHTML = `<li class="social-item"><button type="button" class="social-link" data-copy="email" aria-label="复制邮箱"><ion-icon name="mail-outline"></ion-icon></button></li><li class="social-item"><a class="social-link" href="./assets/resume.html" target="_blank" rel="noopener" aria-label="查看简历"><ion-icon name="document-text-outline"></ion-icon></a></li><li class="social-item"><button type="button" class="social-link" data-copy="phone" aria-label="复制电话"><ion-icon name="call-outline"></ion-icon></button></li>`;

  const focusProjects = ['taimanman', 'wisematch-web'].map((id) => projects.find((item) => item.id === id));
  document.querySelectorAll('[data-testimonials-item]').forEach((card, index) => {
    const item = focusProjects[index];
    const image = card.querySelector('[data-testimonials-avatar]');
    image.src = `./assets/images/project-mark-${index + 1}.svg`;
    image.alt = item.title;
    card.querySelector('[data-testimonials-title]').textContent = item.title;
    card.querySelector('[data-testimonials-text]').innerHTML = `<p>${escape(item.overview)}</p>`;
    card.dataset.projectId = item.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `查看${item.title}详情`);
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); } });
  });
  $('.testimonials-modal time').remove();
  $('.testimonials-modal .modal-img-wrapper > img').remove();
  $('[data-modal-close-btn]').setAttribute('aria-label', '关闭项目简介');

  $('.clients-list').innerHTML = ['Vue 3', 'React', 'uni-app', 'Nuxt', 'AI Skill', 'SSE / RTC'].map((text) => `<li class="clients-item"><span class="tech-word">${text}</span></li>`).join('');

  const timeline = (name, items) => `<section class="timeline"><div class="title-wrapper"><div class="icon-box"><ion-icon name="book-outline"></ion-icon></div><h3 class="h3">${name}</h3></div><ol class="timeline-list">${items.map((item) => `<li class="timeline-item"><h4 class="h4 timeline-item-title">${item.title}</h4><span>${item.year}</span><p class="timeline-text">${item.description}</p></li>`).join('')}</ol></section>`;
  $('[data-page="resume"]').innerHTML = `<header><h2 class="h2 article-title">工作经历</h2></header>${timeline('前端项目负责人', [
    { title: '杭州青麟栖云科技有限公司', year: '2025.11 — 至今', description: '负责数字人创作与 WiseMatch 多端生态的前端架构、核心开发和交付。2025.11—2026.02 为光子纪元 / 互映数字人项目，2026.02 起推进灵工、招聘、校园及研发平台。' },
    { title: '杭州非球互联网科技有限公司', year: '2022.10 — 2025.11', description: '负责门店 SaaS、多端球房管理与台满满数字化系统，覆盖管理小程序、消费者端、横屏收银、运营后台和客服 H5。推进请求、状态、订单、库存、会员与支付的完整前端链路。' },
  ])}${timeline('教育经历', [{ title: '北京语言大学网络教育学院', year: '2021 — 2024', description: '大专 · 汉语言文学' }])}<section class="skill"><h3 class="h3 skills-title">技术能力</h3><ul class="skills-list content-card">${[
    ['前端与多端架构', 'Vue 3、React、TypeScript、uni-app、Nuxt、Pinia、TDesign'],
    ['AI 应用与流式交互', 'SSE、ASR、RTC、企业知识库、AI 人设与业务结果回填'],
    ['模型接入与部署', 'AI API 中转、Docker Compose、OpenAI / Anthropic 兼容接入、健康检查'],
    ['AI Skill 与工程流程', 'Skill 注册、自然语言路由、运行时输入、Bugbook 与多端发布'],
  ].map(([title, text]) => `<li class="skills-item"><h5 class="h5">${title}</h5><p class="skill-tools">${text}</p></li>`).join('')}</ul></section>`;

  $('[data-page="portfolio"] .article-title').textContent = '项目作品';
  const filters = [['all', '全部'], ['web', '网站'], ['mini', '小程序'], ['tool', '研发工具']];
  document.querySelectorAll('[data-filter-btn]').forEach((button, index) => { button.textContent = filters[index][1]; button.dataset.filterKey = filters[index][0]; button.type = 'button'; });
  document.querySelectorAll('[data-select-item]').forEach((button, index) => { button.textContent = filters[index][1]; button.dataset.filterKey = filters[index][0]; button.type = 'button'; });
  $('[data-selecct-value]').textContent = '选择项目分类';
  $('.project-list').innerHTML = projects.map((item) => `<li class="project-item active" data-filter-item data-platforms="${item.platforms.join(' ')}"><a href="#project/${escape(item.id)}" data-project-id="${escape(item.id)}" aria-label="查看${escape(item.title)}详情"><figure class="project-img"><div class="project-item-icon-box"><ion-icon name="eye-outline"></ion-icon></div>${cover(item)}</figure><h3 class="project-title">${escape(item.title)}</h3><p class="project-category">${item.platforms.map((key) => labels[key]).join(' / ')} · ${escape(item.category)}</p></a></li>`).join('');

  $('[data-page="blog"] .article-title').textContent = '研发实践';
  const practices = [
    { id: 'company-skills', title: '把研发经验做成 AI Skill', text: '通过项目配置、运行时输入和任务路由沉淀工作流，复用根因、修复与验证证据。' },
    { id: 'ai-relay', title: '统一模型接入与 AI API 中转', text: '将兼容端点、上游账号、健康检查和客户端接入放进明确的部署与维护流程。' },
    { id: 'lingxiaopin-web', title: '企业知识库进入招聘流程', text: '把文件上传、异步解析结果和人设上下文接入可编辑、可确认的招聘工作流。' },
    { id: 'wisematch-web', title: '语音、RTC 与多端交付', text: '跟进原生能力、录音、视频层、构建和发布问题，让多端交互有一致的业务边界。' },
  ];
  $('.blog-posts-list').innerHTML = practices.map((note) => { const item = projects.find((p) => p.id === note.id); return `<li class="blog-post-item"><a href="#project/${item.id}" data-project-id="${item.id}"><figure class="blog-banner-box">${cover(item)}</figure><div class="blog-content"><div class="blog-meta"><p class="blog-category">工程实践</p><span class="dot"></span><time>项目经验</time></div><h3 class="h3 blog-item-title">${note.title}</h3><p class="blog-text">${note.text}</p></div></a></li>`; }).join('');

  $('[data-page="contact"] .article-title').textContent = '联系我';
  $('[data-mapbox]').outerHTML = `<section class="contact-location"><h3>杭州 · 前端与 AI 产品</h3><p>欢迎交流产品建设、项目合作和岗位机会。<br>也可以联系我获取作品的访问入口、小程序二维码和专用体验账号。</p><div class="contact-actions"><a class="cn-button" href="mailto:${owner.email}"><ion-icon name="mail-outline"></ion-icon>发送邮件</a><button class="cn-button" type="button" data-copy="email">复制邮箱</button><button class="cn-button" type="button" data-copy="phone">复制电话</button></div></section>`;
  $('.form-title').textContent = '给我留言';
  const form = $('[data-form]');
  form.insertAdjacentHTML('beforebegin', '<p class="form-note">填写后会生成邮件并交给你的邮件应用发送。</p>');
  form.elements.fullname.placeholder = '你的称呼';
  form.elements.email.placeholder = '你的邮箱';
  form.elements.message.placeholder = '想交流的项目、合作或岗位';
  $('[data-form-btn] span').textContent = '生成邮件';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const subject = `作品集交流 · ${form.elements.fullname.value}`;
    const body = `称呼：${form.elements.fullname.value}\n邮箱：${form.elements.email.value}\n\n${form.elements.message.value}`;
    window.location.href = `mailto:${owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const toast = document.createElement('div');
  toast.className = 'cn-toast'; toast.hidden = true; toast.setAttribute('role', 'status'); document.body.append(toast);
  let toastTimer;
  async function copy(text, label) {
    try { await navigator.clipboard.writeText(text); toast.textContent = `${label}已复制`; } catch { toast.textContent = '复制失败，可手动选择文字'; }
    toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 2500);
  }
  document.addEventListener('click', (event) => {
    const mini = event.target.closest('[data-mini-copy]');
    if (mini) { copy(mini.dataset.miniCopy, '小程序名称'); return; }
    const admin = event.target.closest('[data-admin-copy]');
    if (admin) { copy(window.PORTFOLIO_ADMIN.phone, '管理员手机号'); return; }
    const button = event.target.closest('[data-copy]');
    if (button) copy(owner[button.dataset.copy], button.dataset.copy === 'email' ? '邮箱' : '电话');
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'project-dialog'; dialog.setAttribute('aria-labelledby', 'project-detail-title');
  dialog.innerHTML = '<button type="button" class="modal-close-btn" data-project-close aria-label="关闭项目详情"><ion-icon name="close-outline"></ion-icon></button><div data-project-content></div>';
  document.body.append(dialog);
  dialog.querySelector('[data-project-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });

  function showProject(id) {
    const item = projects.find((project) => project.id === id);
    if (!item) return;
    const entry = access[id] || {};
    dialog.querySelector('[data-project-content]').innerHTML = renderProject(item, entry);
    const toggle = dialog.querySelector('[data-account-toggle]');
    if (toggle) {
      toggle.addEventListener('click', (event) => {
        const fields = dialog.querySelector('.cn-account-fields');
        fields.hidden = !fields.hidden;
        event.currentTarget.setAttribute('aria-expanded', String(!fields.hidden));
        event.currentTarget.textContent = fields.hidden ? '查看体验账号' : '收起体验账号';
      });
    }
    if (entry.account) {
      dialog.querySelector('[data-account-copy]').addEventListener('click', () => copy(entry.account.username, '账号'));
      dialog.querySelector('[data-password-copy]').addEventListener('click', () => copy(entry.account.password, '密码'));
    }
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-project-id]');
    if (link) { event.preventDefault(); showProject(link.dataset.projectId); }
  });

  document.body.insertAdjacentHTML('beforeend', '<footer class="source-credit">基于 <a href="https://github.com/codewithsadee/vcard-personal-portfolio" target="_blank" rel="noopener noreferrer">codewithsadee / vCard</a> 中文化 · MIT</footer>');
})();
