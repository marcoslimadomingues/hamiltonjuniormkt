# Site — Hamilton Júnior, Estrategista Digital

Site estático (HTML, CSS e JavaScript puro), mobile-first. Não precisa de build: basta publicar a pasta em qualquer hospedagem (Hostinger, Netlify, Vercel, GitHub Pages etc.).

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
2. **Foto** — salve a foto do Hamilton em `assets/img/hamilton.jpg` (vertical, 4:5, cerca de 800×1000 px). Enquanto ela não existir, aparece o monograma "HJ".
3. **Imagem de compartilhamento (opcional)** — para ter prévia no WhatsApp e nas redes, crie `assets/img/og.jpg` (1200×630) e adicione no `<head>` de cada página, com o domínio completo:
   `<meta property="og:image" content="https://seudominio.com.br/assets/img/og.jpg">`

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

Tipografia: Bricolage Grotesque (Google Fonts), em uma família só. Os títulos usam a versão condensada.
