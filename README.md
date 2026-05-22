# Diagnóstico de Temperamento — Deploy

## Estrutura

```
diagnostico-temperamento-final/
├── public/
│   └── index.html          ← frontend completo (HTML + JS inline)
├── api/
│   └── enviar.js           ← serverless: Resend + Supabase
├── supabase-setup.sql      ← rodar antes do deploy
├── vercel.json             ← timeout 30s
└── README.md
```

---

## Deploy em 5 passos

### 1. Criar tabela no Supabase
- Acesse: supabase.com/dashboard → seu projeto → SQL Editor
- Cole e execute o conteúdo de `supabase-setup.sql`
- Copie a URL do projeto (Settings → API → Project URL)
- Copie a `service_role` key (Settings → API → Project API keys)

### 2. Criar repositório no GitHub
- github.com → New repository → `diagnostico-temperamento`
- Visibilidade: Private
- Faça upload de todos os arquivos desta pasta

### 3. Conectar no Vercel
- vercel.com → Add New Project → importar o repositório
- **NÃO clique em Deploy ainda**

### 4. Configurar variáveis de ambiente no Vercel
```
RESEND_API_KEY       → re_xxxxxxxxxxxx
SUPABASE_URL         → https://xxxx.supabase.co
SUPABASE_SERVICE_KEY → eyJhbGc... (service_role key)
```

### 5. Deploy + Domínio
- Clique em Deploy
- Settings → Domains → adicione: `temperamento.claudioalecrim.com.br`
- No Registro.br: CNAME `temperamento` → `cname.vercel-dns.com`

---

## O que a ferramenta entrega

**Fluxo completo:**
1. Usuário informa nome + email (captura imediata do lead)
2. Rodada 1 — 10 perguntas de comportamento natural (dia a dia)
3. Tela de transição explicando o contexto
4. Rodada 2 — 10 perguntas de comportamento adaptado (sob pressão)
5. Resultado exibido na tela instantaneamente com:
   - Dois cards: Temperamento Natural vs. Adaptado
   - Análise de gap (12 combinações possíveis)
   - 6 blocos acordeon com conteúdo profundo do temperamento natural
   - Cards de pontos fortes e a desenvolver
   - Encerramento dinâmico por temperamento com CTA para o Ponto de Ruptura
6. API disparada em paralelo:
   - Email HTML completo para o usuário (Resend)
   - Notificação para o admin (Resend)
   - Lead salvo no Supabase com natural + adaptado + todos os scores

**Perguntas embaralhadas** a cada acesso — impossível identificar padrão.

---

## Personalizar

| O que mudar | Onde |
|---|---|
| WhatsApp do CTA | Buscar `5543996694899` em `index.html` e `enviar.js` |
| Email admin | Buscar `resultado.mesadegoverno@gmail.com` em `enviar.js` |
| Remetente email | Buscar `resultado@claudioalecrim.com.br` em `enviar.js` |
