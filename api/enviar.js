export const config = { maxDuration: 30 };

const RESEND_KEY   = process.env.RESEND_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const FROM         = "resultado@claudioalecrim.com.br";
const ADMIN        = "resultado.mesadegoverno@gmail.com";

const NOMES = { SAN:"Sanguíneo", COL:"Colérico", FLE:"Fleumático", MEL:"Melancólico" };
const EMOJIS = { SAN:"☀️", COL:"🔥", FLE:"🌊", MEL:"🌑" };
const ELEMENTOS = { SAN:"Ar", COL:"Fogo", FLE:"Água", MEL:"Terra" };
const CORES_HEX = { SAN:"#4a90d9", COL:"#c85a35", FLE:"#4a8c6a", MEL:"#8c6aad" };

// ── EMAIL HTML ────────────────────────────────────────────────────────────────
function buildEmail(nome, nat, ada, sc1, sc2) {
  const firstName = nome.split(" ")[0];
  const corNat = CORES_HEX[nat];
  const corAda = CORES_HEX[ada];
  const mesmos = nat === ada;
  const maxR1 = 10 * 3;
  const maxR2 = 10 * 3;

  function pct(sc, mx) {
    return Object.fromEntries(Object.keys(sc).map(k => [k, Math.round(sc[k] / mx * 100)]));
  }

  const p1 = pct(sc1, maxR1);
  const p2 = pct(sc2, maxR2);

  const CONTEUDOS = {
    SAN: {
      abertura: `${firstName}, você chegou ao fim do diagnóstico com uma clareza que poucos param para buscar. O que as perguntas revelaram não é uma limitação. É um mapa.`,
      descricao: `O sanguíneo vê o mundo como uma festa que não deveria terminar. Sua leitura da realidade é imediata, colorida e relacional. Onde outros veem problema, você vê possibilidade. Onde outros veem conflito, você vê um equívoco que um bom papo resolve.\n\nBoaventura descreve o sanguíneo como o temperamento que reage prontamente e com intensidade, mas não guarda a impressão por muito tempo. É fogo de palha: acende rápido, arde forte, e se apaga antes que os outros percebam.`,
      maduro: `Pedro depois do Pentecostes: o mesmo temperamento, a mesma intensidade, a mesma presença magnética, mas agora ancorado. O sanguíneo maduro aprendeu que promessa é dívida. Que entusiasmo sem constância é crueldade com quem depende de você.`,
      imaturo: `O sanguíneo imaturo consome os que o amam. Não por maldade, por inconstância. Boaventura é preciso: promete tudo e cumpre pouco. As pessoas que o amam aprendem a não contar com o que ele promete quando está animado.`,
      encerramento: `Sua alegria é genuína. E é um presente raro. Mas ela vem embrulhada em inconstância. A versão de você que é fiel quando não está mais animado é a versão que vai mudar as histórias das pessoas ao seu redor.\n\nO Ponto de Ruptura foi construído para o homem que sente muito, começa muito e quer aprender a sustentar. Não é sobre frear quem você é. É sobre ancorar.`,
    },
    COL: {
      abertura: `${firstName}, você chegou ao fim do diagnóstico com uma clareza que poucos param para buscar. O que as perguntas revelaram não é uma limitação. É um mapa.`,
      descricao: `O colérico vê o mundo como um conjunto de problemas a resolver e resultados a conquistar. Onde outros veem complexidade, você vê obstáculo. Onde outros veem processo, você vê atraso.\n\nBoaventura descreve o colérico como aquele que reage prontamente e com intensidade, e guarda essa impressão de forma profunda e duradoura. É fogo: acende rápido, expande com força, não se deixa apagar. A ação é o idioma natural da sua alma.`,
      maduro: `LaHaye descreve um empresário de 72 anos que construiu igrejas, transformou empresas, e havia se tornado tão ponderado que os ao redor mal acreditavam ser o mesmo homem de fogo. As forças permaneceram. Mas a ira desapareceu. Boaventura o descreve como a brasa: aquece e ilumina, em vez de destruir.`,
      imaturo: `O colérico imaturo é devastador, especialmente para quem mais o ama. Não por maldade. Por força sem governo. Há uma insegurança velada, um sentimento de não poder errar. E porque não pode errar, não reconhece o erro. E porque não reconhece, não cresce.`,
      encerramento: `A mesma força que te faz conquistar resultados onde outros desistem cobra um preço das pessoas que estão mais perto de você. São o cônjuge que aprende a não contrariar. O filho que cresce medindo o seu humor antes de falar.\n\nPaulo foi o maior colérico da Bíblia. E sua maior carta foi escrita do cárcere. Quando não podia agir, aprendeu a depender. O que você vai construir quando sua força estiver submetida vai transformar.\n\nO Ponto de Ruptura existe para o homem que já provou que tem força, mas percebeu que força sozinha não é suficiente.`,
    },
    FLE: {
      abertura: `${firstName}, você chegou ao fim do diagnóstico com uma clareza que poucos param para buscar. O que as perguntas revelaram não é uma limitação. É um mapa.`,
      descricao: `O fleumático vê o mundo com equanimidade e paciência. Onde outros enxergam urgência, você vê algo que pode esperar. Onde outros reagem, você observa.\n\nBoaventura descreve o fleumático como aquele que não reage com intensidade imediata, e também não guarda a impressão por muito tempo. É água: se move com calma, encontra sempre o caminho mais suave, e tem uma força profunda que só aparece quando acumulada.`,
      maduro: `São Tomás de Aquino foi chamado de boi mudo pelos colegas de seminário. Produziu uma das obras intelectuais mais extraordinárias da história. A calma não era ausência de força. Era forma de força. O fleumático maduro aprendeu a quebrar o silêncio quando é necessário.`,
      imaturo: `O fleumático imaturo desaparece. Não de forma dramática, mas gradual. Boaventura nomeia sua fraqueza principal como acídia, uma preguiça ontológica que o faz preferir o mundo dos próprios pensamentos à realidade nua e crua. Presente fisicamente, ausente emocionalmente.`,
      encerramento: `Não tem pressa com você, e tudo bem. Mas o que você chama de paz, às vezes, é evitação. A conversa que você adiou há meses. O posicionamento que nunca veio.\n\nAs pessoas que te amam não precisam de mais de você. Precisam de algo específico: saber que você está lá de verdade. Não apenas presente. Presente.\n\nO Ponto de Ruptura não vai te pressionar. Vai te dar o espaço e a estrutura para finalmente sair do lugar que você sabe que precisa sair.`,
    },
    MEL: {
      abertura: `${firstName}, você chegou ao fim do diagnóstico com uma clareza que poucos param para buscar. O que as perguntas revelaram não é uma limitação. É um mapa.`,
      descricao: `O melancólico vê o mundo com profundidade, análise e uma sensibilidade que os outros temperamentos raramente alcançam. Você nota o que os outros ignoram.\n\nBoaventura descreve o melancólico como aquele que não reage com intensidade imediata, mas guarda a impressão de forma profunda e duradoura. É a fogueira que demora a acender, mas que, uma vez acesa, é difícil de apagar.`,
      maduro: `João era o melancólico mais profundo do Novo Testamento. O único que ficou ao pé da cruz. A mesma sensibilidade que o fazia chorar com mais facilidade também o fez permanecer quando todos fugiram. Sua profundidade não era fraqueza. Era a raiz da coragem mais silenciosa da história.`,
      imaturo: `O melancólico imaturo é o prisioneiro mais cruel, porque é prisioneiro de si mesmo. Boaventura descreve o ensimesmamento como o grande perigo: uma hipnose interna. O melancólico imaturo sofre mais do que a realidade exige, com uma precisão analítica que usa contra si mesmo.`,
      encerramento: `A profundidade com que você sente, a precisão com que analisa, a lealdade com que ama, essas coisas são reais e são raras.\n\nMas há uma pergunta que vale fazer: o quanto dessa profundidade está servindo ao crescimento, e o quanto está alimentando um loop?\n\nVocê não precisa mudar quem você é. Precisa aprender a usar a profundidade a seu favor e parar de usá-la contra si mesmo.\n\nO Ponto de Ruptura existe para o homem que sente com profundidade mas ainda não transformou isso em movimento.`,
    },
  };

  const c = CONTEUDOS[nat];

  // Gap
  function gapTexto() {
    if (mesmos) return `<p style="font-size:14px;line-height:1.8;color:#c8c0b8;margin:0 0 10px">Seus dois perfis são o mesmo: <strong style="color:${corNat}">${NOMES[nat]}</strong>. Você é o mesmo homem em público e em privado. Isso é raro e é uma forma de integridade profunda. Não há custo energético de adaptação.</p>`;
    return `<p style="font-size:14px;line-height:1.8;color:#c8c0b8;margin:0 0 10px">Seu temperamento natural é <strong style="color:${corNat}">${NOMES[nat]}</strong>, mas sob pressão você tende a operar como <strong style="color:${corAda}">${NOMES[ada]}</strong>. Essa diferença tem um nome: <strong style="color:#c8a97a">custo de adaptação</strong>.</p><p style="font-size:14px;line-height:1.8;color:#c8c0b8;margin:0 0 10px">Toda vez que o ambiente exige que você seja diferente do que é, você gasta energia sustentando essa versão. Energia que poderia ir para o que realmente importa: as quatro áreas que o Ponto de Ruptura trabalha, Deus, si mesmo, família e negócios.</p>`;
  }

  const encParas = c.encerramento.split('\n\n').map(p =>
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#c8c0b8">${p}</p>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Seu Diagnóstico de Temperamento</title></head>
<body style="margin:0;padding:0;background:#050505;font-family:'Georgia',serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#050505">
<tr><td align="center" style="padding:40px 16px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- HEADER -->
  <tr><td style="background:#0a0a0a;border:1px solid #1e1e1e;border-radius:14px 14px 0 0;padding:40px 40px 32px;text-align:center">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#6b6055;font-family:'Arial',sans-serif">Análise de Temperamento · Claudio Alecrim</p>
    <div style="margin:16px 0 8px">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto">
        <tr>
          <td style="text-align:center;padding:0 12px">
            <div style="font-size:2rem">${EMOJIS[nat]}</div>
            <div style="font-family:'Georgia',serif;font-size:1.4rem;font-weight:600;color:${corNat};margin:4px 0 2px">${NOMES[nat]}</div>
            <div style="font-size:10px;color:${corNat}88;letter-spacing:.06em;text-transform:uppercase">${ELEMENTOS[nat]} · Natural</div>
            <div style="font-size:11px;color:${corNat};margin-top:4px">Score ${p1[nat]}%</div>
          </td>
          ${!mesmos ? `<td style="padding:0 12px;color:#333;font-size:1.2rem">→</td>
          <td style="text-align:center;padding:0 12px">
            <div style="font-size:2rem">${EMOJIS[ada]}</div>
            <div style="font-family:'Georgia',serif;font-size:1.4rem;font-weight:600;color:${corAda};margin:4px 0 2px">${NOMES[ada]}</div>
            <div style="font-size:10px;color:${corAda}88;letter-spacing:.06em;text-transform:uppercase">${ELEMENTOS[ada]} · Adaptado</div>
            <div style="font-size:11px;color:${corAda};margin-top:4px">Score ${p2[ada]}%</div>
          </td>` : `<td style="padding:0 12px;color:#4a8c6a;font-size:1rem">✓</td>
          <td style="text-align:center;padding:0 12px">
            <div style="font-size:2rem">${EMOJIS[ada]}</div>
            <div style="font-family:'Georgia',serif;font-size:1.4rem;font-weight:600;color:${corAda};margin:4px 0 2px">${NOMES[ada]}</div>
            <div style="font-size:10px;color:${corAda}88;letter-spacing:.06em;text-transform:uppercase">Confirmado sob pressão</div>
            <div style="font-size:11px;color:${corAda};margin-top:4px">Score ${p2[ada]}%</div>
          </td>`}
        </tr>
      </table>
    </div>
  </td></tr>

  <!-- ABERTURA -->
  <tr><td style="background:#0d0d0d;border-left:1px solid #1e1e1e;border-right:1px solid #1e1e1e;padding:28px 40px">
    <p style="margin:0;font-size:16px;line-height:1.85;color:#e8e0d4;font-family:'Georgia',serif">${c.abertura}</p>
  </td></tr>

  <!-- GAP -->
  <tr><td style="background:#0a0a0a;border-left:1px solid ${corNat}33;border-right:1px solid ${corNat}33;padding:24px 40px">
    <p style="margin:0 0 10px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${corNat};font-family:'Arial',sans-serif">${mesmos ? 'Perfil consistente' : 'Natural vs. Adaptado'}</p>
    ${gapTexto()}
  </td></tr>

  <!-- DESCRIÇÃO -->
  <tr><td style="background:#0d0d0d;border-left:1px solid #1e1e1e;border-right:1px solid #1e1e1e;padding:28px 40px">
    <p style="margin:0 0 10px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${corNat};font-family:'Arial',sans-serif">Como o ${NOMES[nat].toLowerCase()} vê o mundo</p>
    ${c.descricao.split('\n\n').map(p => `<p style="margin:0 0 12px;font-size:14px;line-height:1.8;color:#c8c0b8;font-family:'Georgia',serif">${p}</p>`).join('')}
  </td></tr>

  <!-- MADURO / IMATURO -->
  <tr><td style="background:#0a0a0a;border-left:1px solid #1e1e1e;border-right:1px solid #1e1e1e;padding:28px 40px">
    <table width="100%" cellpadding="0" cellspacing="0"><tr valign="top">
      <td width="48%" style="padding-right:12px">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#4a8c6a;font-family:'Arial',sans-serif">Maduro</p>
        <p style="margin:0;font-size:13px;line-height:1.75;color:#c8c0b8;font-family:'Georgia',serif">${c.maduro}</p>
      </td>
      <td width="4%"><div style="width:1px;background:#1e1e1e;height:100%;margin:0 auto"></div></td>
      <td width="48%" style="padding-left:12px">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#c85a35;font-family:'Arial',sans-serif">Imaturo</p>
        <p style="margin:0;font-size:13px;line-height:1.75;color:#c8c0b8;font-family:'Georgia',serif">${c.imaturo}</p>
      </td>
    </tr></table>
  </td></tr>

  <!-- ENCERRAMENTO -->
  <tr><td style="background:#0a0a0a;border-left:1px solid ${corNat}44;border-right:1px solid ${corNat}44;border-top:1px solid ${corNat}44;padding:32px 40px">
    <p style="margin:0 0 14px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${corNat};font-family:'Arial',sans-serif">Uma palavra para você</p>
    ${encParas}
  </td></tr>

  <!-- CTA -->
  <tr><td style="background:#111;border:1px solid #1e1e1e;border-top:none;padding:32px 40px;text-align:center">
    <p style="margin:0 0 8px;font-size:11px;color:#6b6055;letter-spacing:.08em;text-transform:uppercase;font-family:'Arial',sans-serif">Próximo passo</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#c8c0b8;font-family:'Georgia',serif">Se você quer trabalhar o que esse diagnóstico revelou em um processo real, a Mentoria Ponto de Ruptura foi construída exatamente para isso.</p>
    <a href="https://wa.me/5543996694899" style="display:inline-block;padding:14px 32px;background:${corNat};color:#fff;text-decoration:none;border-radius:8px;font-family:'Arial',sans-serif;font-size:14px;font-weight:600;letter-spacing:.03em">Conhecer o Ponto de Ruptura →</a>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:24px 40px;text-align:center">
    <p style="margin:0;font-size:11px;color:#3a3530;font-family:'Arial',sans-serif">Claudio Alecrim · claudioalecrim.com.br · (43) 99669-4899</p>
    <p style="margin:6px 0 0;font-size:11px;color:#3a3530;font-family:'Arial',sans-serif">Diagnóstico baseado em <em>Temperamentos Transformados</em> (Tim LaHaye) e <em>Os 4 Temperamentos e a Espiritualidade</em> (F. Boaventura)</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ── SUPABASE ──────────────────────────────────────────────────────────────────
async function salvarSupabase(nome, email, nat, ada, sc1, sc2) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads_temperamento`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      nome,
      email,
      temperamento_natural: NOMES[nat],
      temperamento_adaptado: NOMES[ada],
      alinhado: nat === ada,
      score_san_natural: sc1.SAN,
      score_col_natural: sc1.COL,
      score_fle_natural: sc1.FLE,
      score_mel_natural: sc1.MEL,
      score_san_adaptado: sc2.SAN,
      score_col_adaptado: sc2.COL,
      score_fle_adaptado: sc2.FLE,
      score_mel_adaptado: sc2.MEL,
    }),
  });
  if (!res.ok) throw new Error(`Supabase: ${res.status}`);
}

// ── HANDLER ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { nome, email, temperamentoNatural: nat, temperamentoAdaptado: ada, sc1, sc2 } = req.body;
  if (!nome || !email || !nat || !ada) return res.status(400).json({ error: "Dados incompletos" });

  const html = buildEmail(nome, nat, ada, sc1, sc2);
  const firstName = nome.split(" ")[0];

  const emailUsuario = fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      subject: `${firstName}, seu temperamento é ${NOMES[nat]} — análise completa`,
      html,
    }),
  });

  const emailAdmin = fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [ADMIN],
      subject: `[Diagnóstico Temperamento] ${nome} — ${NOMES[nat]} / Adaptado: ${NOMES[ada]}`,
      html: `<p><b>Nome:</b> ${nome}</p><p><b>Email:</b> ${email}</p><p><b>Natural:</b> ${NOMES[nat]}</p><p><b>Adaptado:</b> ${NOMES[ada]}</p><p><b>Alinhado:</b> ${nat === ada ? "Sim" : "Não"}</p>`,
    }),
  });

  const supabase = salvarSupabase(nome, email, nat, ada, sc1, sc2);

  const [r1, r2, r3] = await Promise.allSettled([emailUsuario, emailAdmin, supabase]);

  return res.status(r1.status === "fulfilled" ? 200 : 500).json({
    ok: r1.status === "fulfilled",
    email: r1.status,
    admin: r2.status,
    supabase: r3.status,
  });
}
