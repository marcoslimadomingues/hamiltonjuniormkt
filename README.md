# Site — Hamilton Júnior, Estrategista Digital

Site estático (HTML, CSS e JavaScript puro), mobile-first. Não precisa de build. Domínio de produção: `hamiltonjuniormkt.com.br`, hospedado no **GitHub Pages** (repositório `marcoslimadomingues/hamiltonjuniormkt`, branch `main`, domínio custom via arquivo `CNAME`).

GitHub Pages não roda Apache/Nginx, então tudo aqui é feito só com arquivos estáticos — sem `.htaccess`, sem redirect de servidor, sem headers HTTP customizados além do que o `<meta>` permite. Ative "Enforce HTTPS" em Settings → Pages para o certificado do domínio custom funcionar.

## Páginas

| Arquivo | Página |
|---|---|
| `index.html` | Início |
| `sobre.html` | Sobre mim |
| `servicos.html` | Como posso ajudar |
| `como-trabalho.html` | Meu jeito de trabalhar |
| `experiencia.html` | Experiência e clientes |
| `contato.html` | Contato + formulário |

## Antes de publicar

1. **Contatos** — edite o topo de `assets/js/main.js`:
   ```js
   const CONFIG = {
     whatsapp: '5585999999999',   // 55 + DDD + número, só dígitos
     email: 'contato@seudominio.com.br',
     instagram: 'seuperfil',      // sem @
   };
   ```
   Todos os botões de WhatsApp, o rodapé e a página de contato usam esses dados.
2. **Foto** — `assets/img/hamilton.jpg` (800×1000) já está no ar, recortada de `Hamilto Junior Perfil.jpg` (mantida fora da pasta publicada, em `../Site Hamilton - arquivos-fonte/`). O arquivo-fonte era 462×462 — se surgir uma foto em resolução maior, vale substituir pra ganhar nitidez. Se a imagem algum dia sumir, o monograma "HJ" reaparece como fallback automático.
3. **Imagem de compartilhamento** — `assets/img/og.webp` (1200×630) já existe, recortada da mesma foto.
4. **Google Search Console** — depois de verificar a propriedade, troque `COLE_AQUI_O_CODIGO_DO_SEARCH_CONSOLE` pelo código real em `index.html` (linha da tag `google-site-verification`, só existe na home).
5. **Google Analytics 4** — troque as três ocorrências de `G-XXXXXXXXXX` pelo Measurement ID real. O snippet já está no fim do `<body>` de todas as páginas. Se depois for usar Google Tag Manager em vez de gtag.js direto, use só um dos dois — nunca os dois juntos (duplica pageview).
6. **CSP** — se adicionar outro serviço externo (chat, mapa, vídeo incorporado), inclua o domínio dele na tag `<meta http-equiv="Content-Security-Policy">`, presente no `<head>` de cada página. Sem isso o navegador bloqueia o recurso silenciosamente (só aparece erro no console).

## Como funciona o contato

- Cada botão abre o WhatsApp com uma mensagem pronta, adequada ao contexto (ex.: "Quero conversar sobre anúncios…"). O texto fica no atributo `data-wa` de cada botão.
- O formulário não usa servidor. Ele valida os campos e abre o WhatsApp com a mensagem já organizada.
- No celular, uma barra fixa de WhatsApp aparece depois da rolagem e some quando outro botão de contato está visível.

## Identidade visual

| Token | Cor | Uso |
|---|---|---|
| `--ink` | `#0E2E35` petróleo | base, textos, seções escuras |
| `--paper` | `#F2F5F3` branco frio | fundo de leitura |
| `--sun` | `#F2B33D` âmbar | ações, WhatsApp, destaques |

Tipografia: **Fraunces** (serifada, variable font) nos títulos e **Inter** (sans-serif) no corpo de texto, ambas do Google Fonts. Fraunces usa o eixo óptico (`opsz`) alto no `.display` do hero para dar mais contraste em tamanho grande, e mais baixo nos subtítulos.

## SEO técnico

Aplicado a partir de um checklist de otimizações replicáveis (canonical/HTTPS, CSP, schema, sitemap etc.):

| Arquivo | Função |
|---|---|
| `CNAME` | Domínio custom do GitHub Pages — não apague, é o que faz `hamiltonjuniormkt.com.br` funcionar. |
| `robots.txt` | Libera todo o crawl e aponta pro sitemap. |
| `sitemap.xml` | Lista as 6 páginas reais — atualize se criar ou remover página. |
| `ads.txt` | Vazio de propósito, evita 404 repetido de bots de anúncio (o site não usa AdSense). |
| `llms.txt` | Resumo do site pra crawlers de IA (ChatGPT, Claude, Perplexity). |
| `favicon.ico` | Ícone na raiz do domínio — bots e navegadores antigos pedem esse caminho fixo, mesmo com o `<link rel="icon">` apontando pro SVG. |

Cada página também tem `<link rel="canonical">`, `<meta http-equiv="Content-Security-Policy">`, Open Graph com `og:url`/`og:image`, e um JSON-LD `@graph` (`ProfessionalService` + `Person` + `WebSite` + `WebPage`) com IDs cruzados entre si.

**Limitação do GitHub Pages:** canonical host (força `https://` sem `www`), cabeçalhos como `X-Content-Type-Options` e `Referrer-Policy`, e `frame-ancestors` na CSP só existem via header HTTP real — `<meta>` não os suporta e não há servidor próprio aqui pra defini-los. O canonical host fica a cargo do "Enforce HTTPS" do GitHub Pages e de como o DNS do domínio foi apontado (com ou sem `www`).

**Não incluído de propósito**, porque exigiria dado real ou risco de conteúdo fabricado:
- `FAQPage` no schema — o site não tem uma seção de perguntas frequentes ainda.
- `aggregateRating` — só deve entrar com nota e número de avaliações reais, copiados do perfil do Google Meu Negócio.
- `hasMap` / endereço completo — só faz sentido se Hamilton quiser divulgar publicamente o endereço; hoje o schema usa apenas cidade/estado.
- Depoimentos de clientes — a página de Experiência lista empresas atendidas, mas nenhum depoimento foi inventado. Se for adicionar depoimentos reais depois, use nome, foto e nota reais, nunca fabricados.
