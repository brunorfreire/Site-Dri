import { ServiceItem, AudienceItem, CredentialItem, TestimonialItem } from '../types';

export const CLINIC_CONTACT = {
  phone: "(21) 99876-5432",
  phoneRaw: "5521998765432",
  whatsappMessage: "Olá Dra. Adriana! Gostaria de agendar uma avaliação na clínica de fisioterapia.",
  instagram: "@dra.adrianamartins.fisio",
  instagramOld: "@pilatesmoradadosol",
  instagramUrl: "https://instagram.com/pilatesmoradadosol",
  address: "Rua Morada do Sol, 450 - Sala 302 - Jardim Oceânico / Barra da Tijuca, Rio de Janeiro - RJ",
  hours: "Segunda a Sexta: 07:00 às 20:00 | Sábado: 08:00 às 13:00",
  email: "contato@draadrianamartins.com.br",
  crefito: "CREFITO-2 / 68.421-F"
};

export const CREDENTIALS: CredentialItem[] = [
  {
    title: "Graduação em Fisioterapia",
    institution: "UNESA - Universidade Estácio de Sá",
    yearOrDetail: "Turma de 2004 (20+ anos de prática clínica)",
    description: "Formação sólida com duas décadas de atuação na recuperação funcional e motora de pacientes com quadros agudos e crônicos.",
    iconName: "GraduationCap"
  },
  {
    title: "Pós-Graduação em Traumato-Ortopedia e Desportiva",
    institution: "UGF - Universidade Gama Filho",
    yearOrDetail: "Especialização Lato Sensu",
    description: "Diagnóstico cinético-funcional aprofundado, tratamento de patologias osteoarticulares, ligamento e reabilitação de atletas.",
    iconName: "Award"
  },
  {
    title: "Especialista em RPG, Terapia Manual e Drenagem",
    institution: "Formações Internacionais & Chanceladas",
    yearOrDetail: "Reeducação Postural Global e Liberação Miofascial",
    description: "Abordagem biomecânica completa: alinhamento das cadeias musculares, descompressão articular e equilíbrio linfático.",
    iconName: "Activity"
  },
  {
    title: "Certificação em Pilates Clínico e Aparelhos",
    institution: "Metacorpus, D&D e Vipilates",
    yearOrDetail: "Tríplice Certificação Reconhecida",
    description: "Domínio total dos equipamentos originais (Cadillac, Reformer, Step Chair, Ladder Barrel) aplicados à reabilitação e performance.",
    iconName: "CheckCircle2"
  },
  {
    title: "Atleta de Alto Rendimento & Campeã Mundial Master",
    institution: "IBJJF World Master Championship 2024",
    yearOrDetail: "Medalhista de Ouro / World Master 2024",
    description: "Vivência real na pele de atleta: disciplina de treino, prevenção de lesões, ganho de força e superação física que enriquecem o tratamento.",
    iconName: "Trophy"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "fisioterapia-ortopedica",
    category: "fisioterapia",
    title: "Fisioterapia Traumato-Ortopédica",
    subtitle: "Recuperação biomecânica precisa de articulações, músculos e ligamentos",
    description: "Tratamento individualizado focado na causa raiz da dor, e não apenas no alívio temporário dos sintomas. Indicado para quem busca retorno rápido às atividades sem recidivas.",
    indications: ["Hérnia de disco e lombalgias", "Tendinites e bursites", "Pós-operatórios ortopédicos", "Lesões de joelho, ombro e tornozelo"],
    benefits: ["Alívio efetivo da dor desde as primeiras sessões", "Recuperação da amplitude de movimento", "Reestruturação da força muscular"],
    tag: "Reabilitação Avançada",
    iconName: "Bone"
  },
  {
    id: "rpg-reeducacao-postural",
    category: "fisioterapia",
    title: "RPG - Reeducação Postural Global",
    subtitle: "Alinhamento das cadeias musculares e descompressão da coluna",
    description: "Método exclusivo que trata as retrações corporais globais através de posturas estáticas progressivas e respiração consciente, corrigindo desvios e aliviando a sobrecarga crônica.",
    indications: ["Escoliose, hiperlordose e hipercifose", "Dores de cabeça tensionais e cervicalgias", "Desvios posturais ocupacionais", "Dores no nervo ciático"],
    benefits: ["Alinhamento simétrico da coluna", "Melhora drástica na postura diária", "Descompressão dos discos vertebrais"],
    tag: "Alinhamento Postural",
    iconName: "AlignCenterVertical"
  },
  {
    id: "terapia-manual",
    category: "fisioterapia",
    title: "Terapia Manual & Liberação Miofascial",
    subtitle: "Manipulação articular e desativação de pontos de tensão muscular",
    description: "Técnicas manuais refinadas aplicadas diretamente nos tecidos moles e fáscias, restaurando a lubrificação articular e eliminando nós de tensão que limitam o movimento.",
    indications: ["Espasmos musculares severos", "Travamentos de coluna (lumbago)", "Restrições de mobilidade articular", "Tensão por estresse e fadiga"],
    benefits: ["Sensação imediata de leveza corporal", "Aumento da circulação local", "Desbloqueio de movimentos restritos"],
    tag: "Técnica Especializada",
    iconName: "Sparkles"
  },
  {
    id: "drenagem-linfatica",
    category: "fisioterapia",
    title: "Drenagem Linfática Especializada",
    subtitle: "Eliminação de edemas, desintoxicação tecidual e pós-operatório",
    description: "Método clínico com toques suaves e ritmados para estimular o sistema linfático, acelerando a cicatrização, reduzindo o inchaço e promovendo alívio circulatório.",
    indications: ["Pós-cirurgia ortopédica ou plástica", "Retenção hídrica e pernas pesadas", "Gestantes e puerpério", "Edemas inflamatórios"],
    benefits: ["Redução expressiva de inchaço", "Aceleração da recuperação cirúrgica", "Melhora da circulação periférica"],
    tag: "Cuidado Clínico",
    iconName: "Droplets"
  },
  {
    id: "pilates-clinico",
    category: "pilates",
    title: "Pilates Clínico & Reabilitação",
    subtitle: "Fortalecimento do core e estabilidade articular em aparelhos de precisão",
    description: "Diferente de estúdios convencionais com turmas cheias, aqui o Pilates é conduzido por fisioterapeuta especialista, adaptando cada mola e movimento às limitações e metas do paciente.",
    indications: ["Instabilidade lombar e fraqueza de core", "Condições degenerativas (artrose/osteopenia)", "Retorno progressivo às atividades físicas", "Melhora de equilíbrio e coordenação"],
    benefits: ["Fortalecimento profundo sem impacto articular", "Aparelhos originais (Cadillac, Reformer, Chair)", "Acompanhamento 1:1 rigoroso"],
    tag: "Precisão & Segurança",
    iconName: "ShieldCheck"
  },
  {
    id: "reabilitacao-desportiva",
    category: "performance",
    title: "Fisioterapia Desportiva & Alta Performance",
    subtitle: "Da recuperação pós-trauma ao retorno ao esporte de alto nível",
    description: "Sob a ótica de quem é campeã mundial de Jiu-Jitsu e especialista pela UGF, combinamos prevenção de lesões, ganho de potência e reatletaçāo para quem não aceita ficar parado.",
    indications: ["Lesões em lutas, corrida, crossfit e musculação", "Prevenção de lesões pré-competição", "Ganhos específicos de mobilidade e agilidade", "Transição segura para treino pesado"],
    benefits: ["Protocolos modernos baseados em evidência", "Prevenção de recidivas comuns em atletas", "Otimização da biomecânica do movimento"],
    tag: "Alta Performance",
    iconName: "Zap"
  }
];

export const AUDIENCES: AudienceItem[] = [
  {
    id: "atletas",
    title: "Atletas & Praticantes de Esportes",
    subtitle: "Jiu-jitsu, corrida, musculação, tênis e esportes funcionais",
    description: "Você não quer apenas 'parar de doer' — você quer voltar a competir e treinar no mais alto nível. A Dra. Adriana entende a urgência e a biomecânica esportiva como ninguém.",
    highlights: [
      "Liberação miofascial profunda para acelerar recuperação muscular",
      "Estabilização de joelhos, ombros e tornozelos contra sobrecarga",
      "Planejamento de 'Return to Sport' seguro sem medo de nova lesão"
    ],
    badge: "Alta Performance",
    imageHint: "Atleta World Master & treino funcional"
  },
  {
    id: "idosos",
    title: "Idosos & Longevidade Ativa",
    subtitle: "Preservação da autonomia, equilíbrio e alívio de dores crônicas",
    description: "Envelhecer com independência significa conseguir subir escadas, brincar com os netos e passear sem medo de quedas ou dores paralisantes.",
    highlights: [
      "Exercícios sem impacto em aparelhos de Pilates que protegem as articulações",
      "Fortalecimento muscular progressivo para combater sarcopenia",
      "Treinamento proprioceptivo de equilíbrio para prevenção rigorosa de quedas"
    ],
    badge: "Longevidade",
    imageHint: "Alunos da terceira idade felizes e ativos"
  },
  {
    id: "gestantes",
    title: "Gestantes & Pós-Parto",
    subtitle: "Alívio lombar, mobilidade pélvica e preparação do corpo",
    description: "A gestação exige adaptação contínua da coluna e bacia. Oferecemos um acompanhamento carinhoso e técnico para prevenir dores e facilitar o parto e a recuperação.",
    highlights: [
      "Descompressão suave do nervo ciático e coluna lombar",
      "Exercícios de respiração e fortalecimento do assoalho pélvico",
      "Drenagem linfática para alívio imediato do inchaço nas pernas"
    ],
    badge: "Saúde Materna",
    imageHint: "Gestante em postura assistida com bola suíça"
  },
  {
    id: "homens",
    title: "Homens no Pilates & Fisioterapia",
    subtitle: "Combate à rigidez, hérnias de disco e dores da rotina de trabalho",
    description: "Pilates foi criado por um homem (Joseph Pilates) para atletas e reabilitação. Na nossa clínica, 'Os Homens do Pilates' encontram um treino intenso de força profunda e mobilidade.",
    highlights: [
      "Desmistificação do método com foco em força funcional e potência",
      "Alívio de dores posturais causadas por longas horas sentado ou ao volante",
      "Prevenção e tratamento conservador de hérnias de disco lombares"
    ],
    badge: "Força & Coluna",
    imageHint: "Os Homens do Pilates em exercícios de reformer"
  },
  {
    id: "reabilitacao-coluna",
    title: "Quem Sofre com a Coluna",
    subtitle: "Lombalgia, cervicalgia, artrose e hérnias vertebrais",
    description: "A dor na coluna não deve ser uma sentença para o resto da vida. Com a combinação de RPG, Terapia Manual e Pilates Clínico, realinhamos a raiz da sobrecarga.",
    highlights: [
      "Mapeamento postural completo para identificar o desequilíbrio primário",
      "Descompressão foraminal e alívio de dores que irradiam para pernas e braços",
      "Construção de uma 'cinta muscular' natural e protetora ao redor da coluna"
    ],
    badge: "Sem Dor",
    imageHint: "Realinhamento vertebral e descompressão"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    name: "Carlos Eduardo Mendes",
    role: "Praticante de Jiu-Jitsu & Empresário",
    age: 44,
    content: "Sofri uma hérnia lombar L5-S1 que me tirou dos tatames e quase me levou à cirurgia. Com o trabalho minucioso da Dra. Adriana de terapia manual e pilates em aparelhos, hoje voltei a treinar forte e sem nenhuma dor. Ela vive o esporte e entende exatamente o que o nosso corpo precisa.",
    outcome: "Recuperação total e retorno aos campeonatos",
    stars: 5
  },
  {
    id: "2",
    name: "Dona Maria Helena Vianna",
    role: "Aposentada",
    age: 72,
    content: "Eu sentia tonturas, dores nos joelhos e mal conseguia caminhar duas quadras. A paciência, o carinho e o conhecimento da Dra. Adriana mudaram a minha vida. Já faço pilates com ela há anos e hoje tenho disposição para viajar e brincar com meus netos!",
    outcome: "Autonomia restaurada e zero dores articulares",
    stars: 5
  },
  {
    id: "3",
    name: "Dra. Renata Vasconcelos",
    role: "Médica Cardiologista & Gestante",
    age: 36,
    content: "Como médica, sou extremamente criteriosa. O nível técnico da Dra. Adriana é impressionante: cada sessão é pensada na minha fase gestacional. A drenagem e as posturas de RPG aliviaram meu ciático de forma mágica. Recomendo para todas as minhas pacientes.",
    outcome: "Gestação ativa e parto tranquilo sem dores lombares",
    stars: 5
  }
];

export const FAQS = [
  {
    question: "Como funciona a primeira avaliação com a Dra. Adriana Martins?",
    answer: "A avaliação é individual e tem duração de 50 a 60 minutos. A Dra. Adriana realiza uma anamnese clínica completa, testes ortopédicos específicos, avaliação postural dinâmica e estática, além da análise detalhada de exames de imagem (ressonâncias, raio-x). Ao final, é traçado um plano de tratamento personalizado para o seu objetivo."
  },
  {
    question: "O Pilates na clínica é igual ao de estúdios comuns de academia?",
    answer: "Não. Na nossa clínica, o Pilates é estritamente clínico e conduzido por fisioterapeutas especializadas. Não trabalhamos com turmas cheias: cada paciente realiza um programa terapêutico sob medida nos aparelhos oficiais (Reformer, Cadillac, Barrel, Chair), garantindo máxima segurança para quem tem hérnia de disco, artrose ou lesões prévias."
  },
  {
    question: "Preciso ter encaminhamento médico para iniciar?",
    answer: "O encaminhamento médico é bem-vindo, mas não obrigatório para a avaliação inicial. A Dra. Adriana é fisioterapeuta graduada com pós-graduação e possui competência técnica e legal para diagnosticar cineticamente disfunções do movimento e indicar o protocolo ideal."
  },
  {
    question: "A clínica emite recibo para reembolso em plano de saúde?",
    answer: "Sim! Emitimos notas fiscais e relatórios fisioterapêuticos detalhados com CREFITO para que você possa solicitar o reembolso de consultas e sessões de fisioterapia e RPG junto ao seu convênio médico (conforme regras da sua apólice)."
  },
  {
    question: "Quanto tempo dura cada sessão de atendimento?",
    answer: "Cada sessão é individual e dura aproximadamente 50 a 60 minutos de acompanhamento focado e exclusivo com a profissional, garantindo atenção total aos mínimos detalhes do seu movimento."
  }
];
