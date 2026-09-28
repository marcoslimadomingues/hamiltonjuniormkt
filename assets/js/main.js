/* ==========================================================================
   Configuração — edite aqui os dados de contato.
   O número do WhatsApp deve ter apenas dígitos: 55 + DDD + número.
   ========================================================================== */
const CONFIG = {
  whatsapp: '5585999999999',            // TODO: número real do Hamilton
  email: 'contato@seudominio.com.br',   // TODO: e-mail profissional
  instagram: 'seuperfil',               // TODO: perfil sem @
  defaultMessage: 'Olá, Hamilton! Vim pelo seu site e quero conversar sobre o meu negócio.'
};

(() => {
  const waUrl = (msg) =>
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.defaultMessage)}`;

  const formatPhone = (digits) => {
    const d = digits.replace(/\D/g, '');
    const local = d.startsWith('55') ? d.slice(2) : d;
    if (local.length < 10) return `+${d}`;
    const ddd = local.slice(0, 2);
    const num = local.slice(2);
    return `+55 (${ddd}) ${num.slice(0, num.length - 4)}-${num.slice(-4)}`;
  };

  /* Links de WhatsApp: <a data-wa="mensagem opcional"> */
  document.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = waUrl(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Dados de contato: <a data-contact="whatsapp|email|instagram"> */
  document.querySelectorAll('[data-contact]').forEach((el) => {
    const type = el.dataset.contact;
    if (type === 'whatsapp') {
      el.textContent = formatPhone(CONFIG.whatsapp);
      el.href = waUrl();
      el.target = '_blank';
      el.rel = 'noopener';
    } else if (type === 'email') {
      el.textContent = CONFIG.email;
      el.href = `mailto:${CONFIG.email}`;
    } else if (type === 'instagram') {
      el.textContent = `@${CONFIG.instagram}`;
      el.href = `https://www.instagram.com/${CONFIG.instagram}/`;
      el.target = '_blank';
      el.rel = 'noopener';
    }
  });

  /* Ano no rodapé */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* Menu mobile */
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.getElementById('menu');
  if (toggle && panel) {
    const setMenu = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      panel.hidden = !open;
      document.documentElement.classList.toggle('menu-open', open);
      if (open) panel.querySelector('a')?.focus();
    };
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* Barra fixa de WhatsApp: aparece após rolar e some quando outro CTA está visível */
  const bar = document.querySelector('.wa-bar');
  if (bar) {
    const inView = new Set();
    let scrolled = false;
    const update = () => {
      const show = scrolled && inView.size === 0;
      bar.classList.toggle('is-visible', show);
      bar.inert = !show;
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        update();
      });
      document.querySelectorAll('[data-cta-watch]').forEach((el) => io.observe(el));
    }
    let threshold = window.innerHeight * 0.45;
    const onScroll = () => {
      const s = window.scrollY > threshold;
      if (s !== scrolled) { scrolled = s; update(); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { threshold = window.innerHeight * 0.45; onScroll(); }, { passive: true });
    onScroll();
    update();
  }

  /* Formulário de contato → mensagem pronta no WhatsApp */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const f = form.elements;

    const setError = (input, msg) => {
      const err = document.getElementById(`${input.id}-error`);
      if (msg) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
      if (err) err.textContent = msg || '';
    };

    f.whatsapp.addEventListener('blur', () => {
      const d = f.whatsapp.value.replace(/\D/g, '');
      if (d.length === 10 || d.length === 11) {
        f.whatsapp.value = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
      }
    });

    form.querySelectorAll('input, textarea').forEach((el) =>
      el.addEventListener('input', () => { if (el.hasAttribute('aria-invalid')) setError(el, ''); })
    );

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const checks = [
        [f.nome, !f.nome.value.trim() && 'Informe seu nome.'],
        [f.whatsapp, f.whatsapp.value.replace(/\D/g, '').length < 10 &&
          'Informe um WhatsApp com DDD, por exemplo (85) 99999-9999.'],
        [f.email, f.email.value.trim() && !f.email.validity.valid &&
          'Confira o e-mail. Ele precisa ter o formato nome@empresa.com.br.']
      ];
      let first = null;
      checks.forEach(([input, msg]) => {
        setError(input, msg || '');
        if (msg && !first) first = input;
      });
      if (first) { first.focus(); return; }

      const objetivos = [...form.querySelectorAll('input[name="objetivo"]:checked')].map((c) => c.value);
      const line = (label, value) => (value && value.trim() ? `*${label}:* ${value.trim()}\n` : '');
      const msg =
        'Olá, Hamilton! Vim pelo seu site.\n\n' +
        line('Nome', f.nome.value) +
        line('Empresa', f.empresa.value) +
        line('WhatsApp', f.whatsapp.value) +
        line('E-mail', f.email.value) +
        line('Instagram ou site', f.site.value) +
        line('Quero', objetivos.join(', ')) +
        (f.negocio.value.trim() ? `\n*Sobre o negócio:*\n${f.negocio.value.trim()}` : '');

      const url = waUrl(msg.trim());
      const win = window.open(url, '_blank');
      if (win) win.opener = null;
      status.hidden = false;
      status.innerHTML = win === null
        ? `Toque em <a href="${url}" target="_blank" rel="noopener">abrir o WhatsApp</a> para enviar sua mensagem.`
        : `Sua mensagem foi aberta no WhatsApp. Se não abriu, <a href="${url}" target="_blank" rel="noopener">toque aqui</a>.`;
      status.focus();
    });
  }
})();
