"use client";

import { useState } from "react";
import {
  Key,
  ArrowsClockwise,
  Funnel,
  GearSix,
  PuzzlePiece,
  Skull,
  GameController,
  CloudSun,
  Trophy,
  DeviceMobile,
  MusicNote,
  Sword,
  ShoppingCart,
  Newspaper,
  ForkKnife,
  ChartBar,
  FilmStrip,
  Medal,
  CaretDown,
  Lock,
  LockOpen,
  Rocket,
  Check,
  Target,
  ClipboardText,
} from "@phosphor-icons/react";

const FASE_ICONS: Record<string, React.ReactNode> = {
  acesso: <Key size={14} />,
  loops: <ArrowsClockwise size={14} />,
  filtros: <Funnel size={14} />,
  transformacao: <GearSix size={14} />,
  funcoes: <PuzzlePiece size={14} />,
  boss: <Skull size={14} />,
};

const TEMA_ICONS: Record<string, React.ReactNode> = {
  game: <GameController size={15} />,
  weather: <CloudSun size={15} />,
  football: <Trophy size={15} />,
  social: <DeviceMobile size={15} />,
  music: <MusicNote size={15} />,
  sword: <Sword size={15} />,
  shop: <ShoppingCart size={15} />,
  news: <Newspaper size={15} />,
  food: <ForkKnife size={15} />,
  chart: <ChartBar size={15} />,
  film: <FilmStrip size={15} />,
  trophy: <Medal size={15} />,
};

const FASES = [
  {
    id: "acesso",
    label: "Acesso Direto",
    cor: "#22d3ee",
    desc: "Acessar valores em dicionários simples e aninhados",
  },
  {
    id: "loops",
    label: "Loops + Listas",
    cor: "#a78bfa",
    desc: "Iterar sobre listas de dicionários",
  },
  {
    id: "filtros",
    label: "Filtros + Condicionais",
    cor: "#fbbf24",
    desc: "Combinar loops com if/else para filtrar dados",
  },
  {
    id: "transformacao",
    label: "Transformação",
    cor: "#34d399",
    desc: "Criar novos dicts e listas a partir de dados existentes",
  },
  {
    id: "funcoes",
    label: "Funções + API",
    cor: "#f472b6",
    desc: "Encapsular lógica em funções reutilizáveis",
  },
  {
    id: "boss",
    label: "Boss Final",
    cor: "#ef4444",
    desc: "Desafios completos que combinam tudo",
  },
];

const DESAFIOS = [
  // ═══════════════ FASE 1: ACESSO DIRETO ═══════════════
  {
    fase: "acesso",
    numero: 1,
    titulo: "Ficha do Pokémon",
    tema: "PokéAPI",
    icone: "game",
    dados: `dados = {
    "name": "charizard",
    "id": 6,
    "height": 17,
    "weight": 905,
    "base_experience": 267,
    "types": [
        {"slot": 1, "type": {"name": "fire"}},
        {"slot": 2, "type": {"name": "flying"}}
    ]
}`,
    missao: `Imprima as seguintes informações:
• Nome do Pokémon
• Peso
• Experiência base
• Nome do primeiro tipo (ex: "fire")
• Nome do segundo tipo (ex: "flying")`,
    saida_esperada: `charizard
905
267
fire
flying`,
    dicas: [
      `Pense no dicionário como uma ficha cadastral: cada informação tem uma etiqueta (a chave). Para ler o nome, basta "abrir a gaveta" certa com dados["nome_da_chave"].`,
      `As primeiras três informações (nome, peso, experiência) estão na "camada de fora" do dicionário — é só acessar direto. Já os tipos estão guardados dentro de uma lista, como uma pasta com várias fichas dentro.`,
      `"types" é uma lista com dois itens. Para pegar o primeiro, use [0]. Mas cada item dessa lista também é um dicionário — então depois do [0] você ainda precisa entrar em mais uma "gaveta" para chegar no nome do tipo.`,
    ],
    conceitos: ["acesso a chaves", "lista dentro de dict", "acesso aninhado"],
  },
  {
    fase: "acesso",
    numero: 2,
    titulo: "Previsão do Tempo",
    tema: "OpenWeather",
    icone: "weather",
    dados: `dados = {
    "coord": {"lon": -46.63, "lat": -23.55},
    "weather": [
        {"id": 802, "main": "Clouds", "description": "nublado"}
    ],
    "main": {
        "temp": 22.5,
        "feels_like": 23.1,
        "temp_min": 19.0,
        "temp_max": 27.0,
        "humidity": 68
    },
    "wind": {"speed": 3.5},
    "name": "São Paulo"
}`,
    missao: `Usando os dados, monte e imprima a seguinte frase:

"São Paulo: 22.5°C (sensação de 23.1°C), nublado, umidade 68%"

Use f-string para formatar.`,
    saida_esperada: `São Paulo: 22.5°C (sensação de 23.1°C), nublado, umidade 68%`,
    dicas: [
      `A ideia é juntar vários pedaços de informação numa frase só. Primeiro, descubra onde cada pedaço mora dentro do dicionário — alguns estão mais "escondidos" que outros.`,
      `Tente guardar cada valor numa variável separada (ex: cidade = dados["name"]). Isso facilita na hora de montar a frase. Lembre que dentro de "main" tem vários valores, e "weather" funciona diferente dos outros...`,
      `"weather" é uma lista (repare nos colchetes []), então mesmo tendo só um item, você precisa usar [0] para entrar nele. Depois, use uma f-string para colar tudo: f"{cidade}: {temp}°C ...".`,
    ],
    conceitos: ["acesso aninhado", "f-string", "lista com um item"],
  },
  {
    fase: "acesso",
    numero: 3,
    titulo: "Perfil do Jogador",
    tema: "API de Futebol",
    icone: "football",
    dados: `dados = {
    "jogador": {
        "nome": "Neymar Jr.",
        "idade": 33,
        "posicao": "Atacante",
        "clube": {
            "nome": "Santos FC",
            "pais": "Brasil",
            "estadio": "Vila Belmiro"
        },
        "estatisticas": {
            "gols": 440,
            "assistencias": 258,
            "jogos": 716
        }
    }
}`,
    missao: `Imprima:
• O nome do jogador
• O nome do estádio do clube
• A média de gols por jogo (gols / jogos), com 2 casas decimais
• A frase: "Neymar Jr. jogou 716 partidas pelo(s) clube(s)"`,
    saida_esperada: `Neymar Jr.
Vila Belmiro
0.61
Neymar Jr. jogou 716 partidas pelo(s) clube(s)`,
    dicas: [
      `Imagine que os dados são pastas dentro de pastas. Para chegar no estádio, você precisa abrir a pasta "jogador", depois a pasta "clube", e aí sim encontrar "estadio".`,
      `Para a média de gols por jogo, é uma divisão simples: gols dividido por jogos. O resultado vai ter muitas casas decimais — você vai precisar dizer ao Python para mostrar só duas.`,
      `O caminho completo para o estádio é dados["jogador"]["clube"]["estadio"]. Para mostrar a média com 2 casas, use :.2f dentro da f-string — por exemplo: f"{media:.2f}".`,
    ],
    conceitos: ["acesso profundo", "operações matemáticas", "f-string com formatação"],
  },
  {
    fase: "acesso",
    numero: 4,
    titulo: "Dados do Usuário",
    tema: "API de Rede Social",
    icone: "social",
    dados: `dados = {
    "user": {
        "username": "python_dev_br",
        "display_name": "Dev Brasil 🇧🇷",
        "followers_count": 12450,
        "following_count": 892,
        "bio": "Aprendendo Python no SENAI",
        "verified": False,
        "created_at": "2023-03-15",
        "pinned_post": {
            "text": "Primeiro código em Python!",
            "likes": 342,
            "reposts": 28
        }
    }
}`,
    missao: `Imprima:
• O username
• Se o usuário é verificado (True/False)
• O texto do post fixado
• A proporção seguidores/seguindo (followers / following), arredondada para 1 casa decimal
• A frase: "@python_dev_br tem 12450 seguidores"`,
    saida_esperada: `python_dev_br
False
Primeiro código em Python!
14.0
@python_dev_br tem 12450 seguidores`,
    dicas: [
      `Olhe o dicionário como um perfil de rede social. Cada informação tem seu "campo". Comece pelos mais fáceis: username e verified estão logo ali dentro de "user".`,
      `O post fixado está "escondido" um nível mais fundo — é um dicionário dentro de outro. Para a proporção, pense: se alguém tem 100 seguidores e segue 10, a proporção é 100 / 10 = 10.0.`,
      `Para arredondar, você pode usar round(valor, 1) ou formatar com :.1f. O post fixado está em dados["user"]["pinned_post"]["text"]. Na f-string, o @ é só texto normal: f"@{username} tem ...".`,
    ],
    conceitos: ["booleanos", "round / formatação", "acesso aninhado"],
  },

  // ═══════════════ FASE 2: LOOPS + LISTAS ═══════════════
  {
    fase: "loops",
    numero: 1,
    titulo: "Playlist Brasileira",
    tema: "API de Músicas",
    icone: "music",
    dados: `dados = {
    "playlist": "Top Brasil",
    "musicas": [
        {"titulo": "Evidências", "artista": "Chitãozinho & Xororó", "plays": 890000},
        {"titulo": "Aquarela", "artista": "Toquinho", "plays": 750000},
        {"titulo": "Ai Se Eu Te Pego", "artista": "Michel Teló", "plays": 2100000},
        {"titulo": "Garota de Ipanema", "artista": "Tom Jobim", "plays": 3200000},
        {"titulo": "Trem-Bala", "artista": "Ana Vilela", "plays": 1800000}
    ]
}`,
    missao: `1. Imprima o nome de cada música e seu artista no formato:
   "Evidências - Chitãozinho & Xororó"

2. Calcule e imprima o total de plays da playlist.

3. Calcule e imprima a média de plays por música.`,
    saida_esperada: `Evidências - Chitãozinho & Xororó
Aquarela - Toquinho
Ai Se Eu Te Pego - Michel Teló
Garota de Ipanema - Tom Jobim
Trem-Bala - Ana Vilela
Total de plays: 8740000
Média de plays: 1748000.0`,
    dicas: [
      `Você tem uma lista de músicas. Precisa passar por cada uma, como se estivesse folheando um álbum de figurinhas — olhando uma por uma. Em Python, o "for" faz exatamente isso.`,
      `Para somar todos os plays, pense numa calculadora: comece do zero e vá somando o valor de cada música. Crie uma variável antes do loop (ex: total = 0) e dentro do loop vá adicionando.`,
      `Dentro do for, cada música é um dicionário. Acesse com musica["titulo"] e musica["plays"]. Para a média, depois do loop, divida o total pelo número de músicas — use len() para contar quantas tem na lista.`,
    ],
    conceitos: ["for loop", "acumulador", "len()", "f-string"],
  },
  {
    fase: "loops",
    numero: 2,
    titulo: "Tabela do Brasileirão",
    tema: "API de Futebol",
    icone: "football",
    dados: `dados = {
    "campeonato": "Brasileirão Série A",
    "rodada": 20,
    "classificacao": [
        {"pos": 1, "time": "Botafogo", "pontos": 43, "vitorias": 13, "gols_pro": 35, "gols_contra": 18},
        {"pos": 2, "time": "Palmeiras", "pontos": 40, "vitorias": 12, "gols_pro": 33, "gols_contra": 15},
        {"pos": 3, "time": "Flamengo", "pontos": 37, "vitorias": 11, "gols_pro": 30, "gols_contra": 19},
        {"pos": 4, "time": "Fortaleza", "pontos": 36, "vitorias": 10, "gols_pro": 27, "gols_contra": 20},
        {"pos": 5, "time": "São Paulo", "pontos": 35, "vitorias": 10, "gols_pro": 28, "gols_contra": 21},
        {"pos": 6, "time": "Cruzeiro", "pontos": 32, "vitorias": 9, "gols_pro": 25, "gols_contra": 22}
    ]
}`,
    missao: `1. Imprima cada time com sua posição e pontos:
   "1º Botafogo - 43 pts"

2. Imprima o saldo de gols de cada time (gols_pro - gols_contra).

3. Encontre e imprima qual time tem mais vitórias.`,
    saida_esperada: `1º Botafogo - 43 pts
2º Palmeiras - 40 pts
3º Flamengo - 37 pts
4º Fortaleza - 36 pts
5º São Paulo - 35 pts
6º Cruzeiro - 32 pts

Saldos de gols:
Botafogo: +17
Palmeiras: +18
Flamengo: +11
Fortaleza: +7
São Paulo: +7
Cruzeiro: +3

Time com mais vitórias: Botafogo (13)`,
    dicas: [
      `São três tarefas, mas todas usam o mesmo truque: percorrer a lista de times com um "for". Resolva uma de cada vez — comece imprimindo a posição e os pontos de cada time.`,
      `O saldo de gols é como o saldo da conta bancária: o que entrou menos o que saiu. Subtraia gols_contra de gols_pro para cada time. Para achar o time com mais vitórias, pense assim: se você está numa fila e quer achar a pessoa mais alta, você compara cada uma com a mais alta que viu até agora.`,
      `Antes do loop, crie duas variáveis: melhor_time = "" e mais_vitorias = 0. Dentro do loop, se o time atual tem mais vitórias que mais_vitorias, atualize as duas variáveis. No final do loop, você terá o campeão de vitórias.`,
    ],
    conceitos: ["for loop", "operações dentro do loop", "comparação / máximo"],
  },
  {
    fase: "loops",
    numero: 3,
    titulo: "Inventário RPG",
    tema: "API de Game",
    icone: "sword",
    dados: `dados = {
    "personagem": "Guerreiro",
    "nivel": 15,
    "inventario": [
        {"item": "Espada de Ferro", "tipo": "arma", "dano": 25, "valor": 150},
        {"item": "Escudo de Madeira", "tipo": "defesa", "defesa": 10, "valor": 80},
        {"item": "Poção de Vida", "tipo": "consumivel", "cura": 50, "valor": 30},
        {"item": "Poção de Vida", "tipo": "consumivel", "cura": 50, "valor": 30},
        {"item": "Anel de Força", "tipo": "acessorio", "bonus": 5, "valor": 200},
        {"item": "Arco Longo", "tipo": "arma", "dano": 20, "valor": 120},
        {"item": "Poção de Mana", "tipo": "consumivel", "cura": 30, "valor": 25}
    ]
}`,
    missao: `1. Imprima todos os itens e seus valores em ouro:
   "Espada de Ferro - 150 ouro"

2. Calcule o valor total do inventário.

3. Conte quantos itens consumíveis o personagem tem.

4. Imprima os nomes dos itens que valem mais de 100 de ouro.`,
    saida_esperada: `Espada de Ferro - 150 ouro
Escudo de Madeira - 80 ouro
Poção de Vida - 30 ouro
Poção de Vida - 30 ouro
Anel de Força - 200 ouro
Arco Longo - 120 ouro
Poção de Mana - 25 ouro

Valor total: 635 ouro
Consumíveis: 3
Itens valiosos (>100): Espada de Ferro, Anel de Força, Arco Longo`,
    dicas: [
      `O inventário é uma lista de itens. Passe por cada um com um "for" — como se estivesse abrindo a mochila e vendo item por item. Comece só imprimindo o nome e valor de cada um.`,
      `Você vai precisar de "ajudantes" — variáveis que ficam anotando coisas enquanto você percorre os itens. Um ajudante soma o valor total, outro conta os consumíveis. Crie eles antes do loop, zerados.`,
      `Para o valor total: total += item["valor"]. Para consumíveis: if item["tipo"] == "consumivel", aí soma 1 no contador. Para itens valiosos, crie uma lista vazia antes do loop e use .append() para guardar o nome dos itens com valor > 100.`,
    ],
    conceitos: ["for loop", "múltiplos acumuladores", "contador", ".append()"],
  },
  {
    fase: "loops",
    numero: 4,
    titulo: "Catálogo de Produtos",
    tema: "API de E-commerce",
    icone: "shop",
    dados: `dados = {
    "loja": "TechBR",
    "produtos": [
        {"nome": "Fone Bluetooth", "preco": 89.90, "estoque": 45, "categoria": "audio"},
        {"nome": "Webcam HD", "preco": 199.90, "estoque": 0, "categoria": "video"},
        {"nome": "Teclado Mecânico", "preco": 349.90, "estoque": 12, "categoria": "perifericos"},
        {"nome": "Mouse Gamer", "preco": 159.90, "estoque": 30, "categoria": "perifericos"},
        {"nome": "Caixa de Som", "preco": 129.90, "estoque": 0, "categoria": "audio"},
        {"nome": "Monitor 24pol", "preco": 899.90, "estoque": 5, "categoria": "video"},
        {"nome": "Hub USB-C", "preco": 79.90, "estoque": 60, "categoria": "acessorios"}
    ]
}`,
    missao: `1. Imprima cada produto no formato: "Fone Bluetooth - R$ 89.90 (45 em estoque)"

2. Imprima quais produtos estão SEM estoque.

3. Calcule o valor total em estoque (preço × quantidade de cada item, somados).

4. Encontre o produto mais caro e o mais barato.`,
    saida_esperada: `Fone Bluetooth - R$ 89.90 (45 em estoque)
Webcam HD - R$ 199.90 (0 em estoque)
...

Sem estoque: Webcam HD, Caixa de Som

Valor total em estoque: R$ 67384.00

Mais caro: Monitor 24pol (R$ 899.90)
Mais barato: Hub USB-C (R$ 79.90)`,
    dicas: [
      `Pense nesse exercício como organizar uma loja: você passa por cada produto na prateleira e anota as informações. Comece imprimindo cada produto com seu preço e estoque — isso é só um for com uma f-string.`,
      `Produto sem estoque é aquele que tem estoque igual a zero. Para o valor total em estoque, pense assim: se tem 45 fones de R$ 89.90, o valor em fones na loja é 45 x 89.90. Some isso para todos os produtos.`,
      `Para achar o mais caro e mais barato, use a mesma ideia da "fila": guarde o produto atual como candidato e compare com cada novo produto. Comece com o primeiro produto como referência e vá atualizando se encontrar um com preço maior (ou menor).`,
    ],
    conceitos: ["for loop", "multiplicação no loop", "min/max manual", "estoque zero"],
  },

  // ═══════════════ FASE 3: FILTROS + CONDICIONAIS ═══════════════
  {
    fase: "filtros",
    numero: 1,
    titulo: "Filtro de Pokémon",
    tema: "PokéAPI",
    icone: "game",
    dados: `dados = {
    "pokemon_list": [
        {"name": "pikachu", "type": "electric", "hp": 35, "attack": 55, "legendary": False},
        {"name": "charizard", "type": "fire", "hp": 78, "attack": 84, "legendary": False},
        {"name": "mewtwo", "type": "psychic", "hp": 106, "attack": 110, "legendary": True},
        {"name": "bulbasaur", "type": "grass", "hp": 45, "attack": 49, "legendary": False},
        {"name": "rayquaza", "type": "dragon", "hp": 105, "attack": 150, "legendary": True},
        {"name": "jigglypuff", "type": "fairy", "hp": 115, "attack": 45, "legendary": False},
        {"name": "gengar", "type": "ghost", "hp": 60, "attack": 65, "legendary": False},
        {"name": "lugia", "type": "psychic", "hp": 106, "attack": 90, "legendary": True}
    ]
}`,
    missao: `1. Imprima apenas os Pokémon lendários.

2. Imprima os Pokémon com HP maior que 100.

3. Imprima os Pokémon NÃO-lendários que têm ataque maior que 60.

4. Separe os Pokémon em duas listas: "fortes" (attack >= 80) e "fracos" (attack < 80). Imprima cada lista.`,
    saida_esperada: `Lendários: mewtwo, rayquaza, lugia

HP > 100: mewtwo, rayquaza, jigglypuff, lugia

Não-lendários fortes: charizard, gengar
(gengar tem attack 65, não entra — só charizard)

Fortes: charizard, mewtwo, rayquaza, lugia
Fracos: pikachu, bulbasaur, jigglypuff, gengar`,
    dicas: [
      `Pense no "if" dentro do "for" como um porteiro: ele olha cada Pokémon e só deixa passar quem atende à condição. Comece com a tarefa mais simples — imprimir só os lendários.`,
      `"legendary" é True ou False. Você não precisa escrever == True — basta usar: if pokemon["legendary"]. Para combinar duas condições (ex: não é lendário E tem ataque alto), use "and" para juntar as duas perguntas.`,
      `Para separar em duas listas, crie fortes = [] e fracos = [] antes do loop. Dentro do loop, use if/else para decidir em qual lista colocar cada Pokémon com .append(). No final, imprima as duas listas.`,
    ],
    conceitos: ["for + if", "booleano como filtro", "múltiplas condições", "separar listas"],
  },
  {
    fase: "filtros",
    numero: 2,
    titulo: "Relatório de Vendas",
    tema: "API de Dashboard",
    icone: "chart",
    dados: `dados = {
    "periodo": "2024-Q3",
    "vendas": [
        {"vendedor": "Ana", "valor": 15000, "regiao": "SP", "meta": 12000},
        {"vendedor": "Bruno", "valor": 8500, "regiao": "RJ", "meta": 10000},
        {"vendedor": "Carla", "valor": 22000, "regiao": "SP", "meta": 18000},
        {"vendedor": "Diego", "valor": 11000, "regiao": "MG", "meta": 10000},
        {"vendedor": "Elena", "valor": 9000, "regiao": "RJ", "meta": 12000},
        {"vendedor": "Fábio", "valor": 19500, "regiao": "SP", "meta": 15000},
        {"vendedor": "Gabi", "valor": 7200, "regiao": "MG", "meta": 10000}
    ]
}`,
    missao: `1. Imprima quem BATEU a meta e quem NÃO bateu:
   "Ana: R$ 15000 ✅ (meta: R$ 12000)"
   "Bruno: R$ 8500 ❌ (meta: R$ 10000)"

2. Calcule o total de vendas por região (SP, RJ, MG).

3. Calcule a porcentagem de vendedores que bateram a meta.

4. Encontre o vendedor com maior diferença positiva acima da meta.`,
    saida_esperada: `Ana: R$ 15000 ✅ (meta: R$ 12000)
Bruno: R$ 8500 ❌ (meta: R$ 10000)
...

SP: R$ 56500 | RJ: R$ 17500 | MG: R$ 18200

Bateram a meta: 57.1%

Maior destaque: Carla (+R$ 4000 acima da meta)`,
    dicas: [
      `Para cada vendedor, compare o valor vendido com a meta. Se vendeu mais ou igual à meta, bateu. Se vendeu menos, não bateu. É como comparar a nota de uma prova com a nota mínima para passar.`,
      `Para somar por região, imagine três caixinhas — uma para SP, uma para RJ, uma para MG. Crie um dicionário com essas três regiões começando em zero. Dentro do loop, olhe a região do vendedor e coloque o valor na caixinha certa.`,
      `Para a porcentagem, conte quantos bateram a meta (um contador que soma 1 a cada "aprovado") e divida pelo total de vendedores, multiplicando por 100. Para o destaque, calcule valor - meta para cada um e guarde o que tiver a maior diferença.`,
    ],
    conceitos: ["for + if/else", "acumulador por categoria", "porcentagem", "emoji condicional"],
  },
  {
    fase: "filtros",
    numero: 3,
    titulo: "Feed de Notícias",
    tema: "API de Notícias",
    icone: "news",
    dados: `dados = {
    "feed": [
        {"titulo": "Python 4.0 anunciado", "categoria": "tech", "likes": 1200, "comentarios": 89, "autor": "TechBR"},
        {"titulo": "Receita de bolo de cenoura", "categoria": "culinaria", "likes": 450, "comentarios": 34, "autor": "ChefMaria"},
        {"titulo": "Novo jogo da Nintendo", "categoria": "games", "likes": 3400, "comentarios": 567, "autor": "GameOver"},
        {"titulo": "Dicas de investimento", "categoria": "financas", "likes": 890, "comentarios": 120, "autor": "FinBR"},
        {"titulo": "React vs Vue em 2024", "categoria": "tech", "likes": 670, "comentarios": 203, "autor": "DevBlog"},
        {"titulo": "Top 10 animes do ano", "categoria": "entretenimento", "likes": 5600, "comentarios": 890, "autor": "OtakuNews"},
        {"titulo": "Bug crítico no Linux", "categoria": "tech", "likes": 2100, "comentarios": 445, "autor": "TechBR"},
        {"titulo": "Treino para iniciantes", "categoria": "saude", "likes": 320, "comentarios": 45, "autor": "FitBR"}
    ]
}`,
    missao: `1. Filtre e imprima apenas notícias de "tech".

2. Imprima as notícias com mais de 1000 likes, ordenadas do mais curtido ao menos curtido (use sorted()).

3. Calcule o "engajamento" de cada post (likes + comentários) e imprima o top 3.

4. Conte quantos posts cada autor tem e imprima.`,
    saida_esperada: `Tech: Python 4.0 anunciado, React vs Vue em 2024, Bug crítico no Linux

Populares (>1000 likes):
Top 10 animes do ano - 5600 likes
Novo jogo da Nintendo - 3400 likes
Bug crítico no Linux - 2100 likes
Python 4.0 anunciado - 1200 likes

Top 3 engajamento:
1. Top 10 animes do ano - 6490
2. Novo jogo da Nintendo - 3967
3. Bug crítico no Linux - 2545

Posts por autor:
TechBR: 2
ChefMaria: 1
...`,
    dicas: [
      `Esse exercício tem quatro mini-tarefas. Comece pela mais fácil: filtrar por categoria. Para cada notícia, pergunte: "a categoria é tech?" Se sim, guarde ou imprima.`,
      `Para ordenar, o Python tem uma ferramenta chamada sorted() que coloca uma lista em ordem. Você pode dizer POR QUE critério quer ordenar — nesse caso, por número de likes, do maior para o menor. O engajamento é só a soma de likes + comentários de cada post.`,
      `sorted() funciona assim: sorted(lista, key=lambda x: x["likes"], reverse=True). "reverse=True" faz ir do maior para o menor. Para contar posts por autor, crie um dicionário vazio e, para cada post, use .get(autor, 0) + 1 para ir contando.`,
    ],
    conceitos: ["sorted() com lambda", "engajamento calculado", "contagem com dict", "top N"],
  },

  // ═══════════════ FASE 4: TRANSFORMAÇÃO ═══════════════
  {
    fase: "transformacao",
    numero: 1,
    titulo: "Transformar Resposta da API",
    tema: "OpenWeather",
    icone: "weather",
    dados: `dados = {
    "list": [
        {"dt_txt": "2024-08-01 09:00:00", "main": {"temp": 18.5, "humidity": 72}, "weather": [{"description": "chuva leve"}]},
        {"dt_txt": "2024-08-01 12:00:00", "main": {"temp": 22.3, "humidity": 65}, "weather": [{"description": "nublado"}]},
        {"dt_txt": "2024-08-01 15:00:00", "main": {"temp": 25.1, "humidity": 58}, "weather": [{"description": "céu limpo"}]},
        {"dt_txt": "2024-08-01 18:00:00", "main": {"temp": 21.0, "humidity": 70}, "weather": [{"description": "nublado"}]},
        {"dt_txt": "2024-08-01 21:00:00", "main": {"temp": 17.8, "humidity": 80}, "weather": [{"description": "chuva leve"}]}
    ]
}`,
    missao: `1. Crie uma lista simplificada com apenas hora, temperatura e descrição:
   [{"hora": "09:00", "temp": 18.5, "clima": "chuva leve"}, ...]

2. Encontre a temperatura máxima e mínima do dia.

3. Calcule a temperatura média do dia.

4. Crie um dict resumo_dia com: temp_max, temp_min, temp_media, descricao_mais_comum.`,
    saida_esperada: `Lista simplificada:
[{"hora": "09:00", "temp": 18.5, "clima": "chuva leve"}, ...]

Máxima: 25.1°C | Mínima: 17.8°C
Média: 20.94°C

Resumo:
{"temp_max": 25.1, "temp_min": 17.8, "temp_media": 20.94, "clima_frequente": "nublado"}`,
    dicas: [`Para a hora, use split() na string "2024-08-01 09:00:00" → .split(" ")[1][:5]. Para descrição mais comum, conte ocorrências com um dict.`],
    conceitos: ["criar dict novo", "split()", "min/max", "contagem de frequência"],
  },
  {
    fase: "transformacao",
    numero: 2,
    titulo: "Cardápio do iFood",
    tema: "API de Delivery",
    icone: "food",
    dados: `dados = {
    "restaurante": "Burger House",
    "cardapio": [
        {"nome": "X-Burguer", "preco": 22.90, "categoria": "lanches", "ingredientes": ["pão", "carne", "queijo", "alface"]},
        {"nome": "X-Bacon", "preco": 28.90, "categoria": "lanches", "ingredientes": ["pão", "carne", "queijo", "bacon", "alface"]},
        {"nome": "Batata Frita P", "preco": 12.90, "categoria": "acompanhamentos", "ingredientes": ["batata", "sal"]},
        {"nome": "Batata Frita G", "preco": 18.90, "categoria": "acompanhamentos", "ingredientes": ["batata", "sal"]},
        {"nome": "Coca-Cola 350ml", "preco": 6.90, "categoria": "bebidas", "ingredientes": []},
        {"nome": "Suco Natural", "preco": 9.90, "categoria": "bebidas", "ingredientes": ["fruta", "água", "açúcar"]},
        {"nome": "Milk Shake", "preco": 16.90, "categoria": "sobremesas", "ingredientes": ["leite", "sorvete", "chocolate"]}
    ]
}`,
    missao: `1. Crie um dict agrupando os itens por categoria:
   {"lanches": ["X-Burguer", "X-Bacon"], "bebidas": [...], ...}

2. Calcule o preço médio por categoria.

3. Encontre todos os itens que contêm "queijo" nos ingredientes.

4. Crie um combo automático: o lanche mais barato + acompanhamento mais barato + bebida mais barata. Imprima os itens e o preço total.`,
    saida_esperada: `Por categoria:
lanches: X-Burguer, X-Bacon
acompanhamentos: Batata Frita P, Batata Frita G
bebidas: Coca-Cola 350ml, Suco Natural
sobremesas: Milk Shake

Preço médio: lanches R$ 25.90, bebidas R$ 8.40, ...

Com queijo: X-Burguer, X-Bacon

Combo econômico:
X-Burguer + Batata Frita P + Coca-Cola 350ml = R$ 42.70`,
    dicas: [`Para agrupar, crie um dict vazio e use .setdefault(categoria, []).append(nome). Para o combo, filtre por categoria e pegue o min() com key=lambda.`],
    conceitos: ["agrupar em dict", ".setdefault()", "busca em lista", "min() com lambda"],
  },
  {
    fase: "transformacao",
    numero: 3,
    titulo: "Histórico de Partidas",
    tema: "API de Games",
    icone: "game",
    dados: `dados = {
    "jogador": "xDarkSlayer99",
    "jogo": "Valorant",
    "partidas": [
        {"mapa": "Ascent", "resultado": "vitoria", "kills": 22, "deaths": 14, "assists": 5, "agente": "Jett"},
        {"mapa": "Bind", "resultado": "derrota", "kills": 15, "deaths": 18, "assists": 8, "agente": "Sage"},
        {"mapa": "Haven", "resultado": "vitoria", "kills": 28, "deaths": 10, "assists": 3, "agente": "Jett"},
        {"mapa": "Ascent", "resultado": "vitoria", "kills": 19, "deaths": 16, "assists": 7, "agente": "Omen"},
        {"mapa": "Split", "resultado": "derrota", "kills": 11, "deaths": 20, "assists": 4, "agente": "Sage"},
        {"mapa": "Bind", "resultado": "vitoria", "kills": 25, "deaths": 12, "assists": 6, "agente": "Jett"},
        {"mapa": "Haven", "resultado": "derrota", "kills": 13, "deaths": 17, "assists": 9, "agente": "Sage"}
    ]
}`,
    missao: `1. Calcule o KDA de cada partida: (kills + assists) / deaths. Imprima junto com o mapa.

2. Calcule o KDA médio geral.

3. Calcule a taxa de vitória (winrate) em porcentagem.

4. Crie um dict com as estatísticas por agente:
   {"Jett": {"partidas": 3, "kills_total": 75, "kda_medio": 2.1}, ...}

5. Qual agente tem o melhor KDA médio?`,
    saida_esperada: `KDA por partida:
Ascent: 1.93 (vitória)
Bind: 1.28 (derrota)
...

KDA médio geral: 1.54
Winrate: 57.1%

Stats por agente:
Jett: 3 partidas, 75 kills, KDA médio 2.08
Sage: 3 partidas, 39 kills, KDA médio 0.69
Omen: 1 partida, 19 kills, KDA médio 1.63

Melhor agente: Jett`,
    dicas: [`Para estatísticas por agente: crie um dict onde a chave é o nome do agente e o valor é outro dict com os acumuladores. Cuidado com divisão por zero no deaths!`],
    conceitos: ["KDA como operação", "agrupamento complexo", "dict de dicts", "taxa/porcentagem"],
  },

  // ═══════════════ FASE 5: FUNÇÕES + API ═══════════════
  {
    fase: "funcoes",
    numero: 1,
    titulo: "Funções de Consulta",
    tema: "PokéAPI",
    icone: "game",
    dados: `pokedex = [
    {"name": "pikachu", "type": "electric", "hp": 35, "attack": 55},
    {"name": "charizard", "type": "fire", "hp": 78, "attack": 84},
    {"name": "mewtwo", "type": "psychic", "hp": 106, "attack": 110},
    {"name": "bulbasaur", "type": "grass", "hp": 45, "attack": 49},
    {"name": "gengar", "type": "ghost", "hp": 60, "attack": 65},
    {"name": "lugia", "type": "psychic", "hp": 106, "attack": 90}
]`,
    missao: `Crie as seguintes funções:

1. buscar_pokemon(nome) — recebe um nome e retorna o dict do pokémon, ou None se não existir.

2. filtrar_por_tipo(tipo) — retorna uma lista com todos os pokémon daquele tipo.

3. mais_forte(stat) — recebe "hp" ou "attack" e retorna o pokémon com o maior valor naquela stat.

4. comparar(nome1, nome2) — imprime uma comparação lado a lado dos dois pokémon.

Teste todas as funções com chamadas de exemplo.`,
    saida_esperada: `buscar_pokemon("pikachu")
→ {"name": "pikachu", "type": "electric", "hp": 35, "attack": 55}

buscar_pokemon("dragonite")
→ None

filtrar_por_tipo("psychic")
→ [mewtwo, lugia]

mais_forte("attack")
→ mewtwo (110)

comparar("pikachu", "charizard")
→ pikachu: HP 35, ATK 55
→ charizard: HP 78, ATK 84
→ Vencedor em HP: charizard
→ Vencedor em ATK: charizard`,
    dicas: [
      `Uma função é como uma "máquina" que recebe algo (a entrada), faz alguma coisa com aquilo, e devolve um resultado. Comece pela mais simples: buscar_pokemon. Ela recebe um nome, percorre a lista e devolve o Pokémon certo.`,
      `Para buscar_pokemon: use um for para percorrer a lista e, se o nome bater, devolva aquele Pokémon. Se o for terminar sem achar nada, devolva None (que é o jeito do Python de dizer "não encontrei"). Para filtrar_por_tipo, é parecido mas você junta os resultados numa lista em vez de parar no primeiro.`,
      `Para mais_forte, o Python tem uma ferramenta que acha o maior valor numa lista. Para comparar, uma boa ideia é reaproveitar a função buscar_pokemon que você já criou — chame ela de dentro da função comparar para pegar os dados de cada Pokémon.`,
    ],
    conceitos: ["def / return", "None como retorno", "max() com key", "funções que chamam funções"],
  },
  {
    fase: "funcoes",
    numero: 2,
    titulo: "Mini Sistema de Pedidos",
    tema: "API de E-commerce",
    icone: "shop",
    dados: `catalogo = {
    "001": {"nome": "Camiseta Básica", "preco": 49.90, "estoque": 20},
    "002": {"nome": "Calça Jeans", "preco": 129.90, "estoque": 8},
    "003": {"nome": "Tênis Runner", "preco": 299.90, "estoque": 3},
    "004": {"nome": "Boné Preto", "preco": 39.90, "estoque": 50},
    "005": {"nome": "Jaqueta Corta-Vento", "preco": 189.90, "estoque": 0}
}

pedido = [
    {"codigo": "001", "quantidade": 2},
    {"codigo": "003", "quantidade": 1},
    {"codigo": "005", "quantidade": 1},
    {"codigo": "004", "quantidade": 3}
]`,
    missao: `Crie as seguintes funções:

1. verificar_estoque(codigo, qtd) — retorna True se tem estoque suficiente, False se não.

2. calcular_subtotal(codigo, qtd) — retorna preço × quantidade.

3. processar_pedido(pedido) — percorre o pedido, verifica estoque de cada item, calcula o total, e retorna um dict com:
   {"itens_aprovados": [...], "itens_sem_estoque": [...], "total": valor}

4. gerar_resumo(resultado) — recebe o dict do pedido processado e imprime um resumo bonito.

Teste com o pedido fornecido.`,
    saida_esperada: `═══ RESUMO DO PEDIDO ═══
✅ Camiseta Básica (x2) — R$ 99.80
✅ Tênis Runner (x1) — R$ 299.90
❌ Jaqueta Corta-Vento — SEM ESTOQUE
✅ Boné Preto (x3) — R$ 119.70

Total: R$ 519.40
Itens sem estoque: 1`,
    dicas: [
      `Pense nesse sistema como uma loja real: antes de aprovar um item do pedido, o caixa verifica se tem no estoque. Comece criando as funções mais simples (verificar_estoque e calcular_subtotal) e teste elas sozinhas antes de juntar tudo.`,
      `verificar_estoque recebe o código do produto e a quantidade pedida. Ela olha no catálogo se o estoque daquele produto é maior ou igual à quantidade. calcular_subtotal é só multiplicar o preço pela quantidade.`,
      `processar_pedido é a função "chefe" — ela percorre cada item do pedido e USA as outras funções para tomar decisões. Crie duas listas (aprovados e sem estoque) e um total. Para cada item, chame verificar_estoque: se tiver, calcule o subtotal e adicione; se não tiver, coloque na lista de rejeitados.`,
    ],
    conceitos: ["funções compostas", "retornar dict", "validação", "formatação de moeda"],
  },

  // ═══════════════ FASE 6: BOSS FINAL ═══════════════
  {
    fase: "boss",
    numero: 1,
    titulo: "Dashboard de Streaming",
    tema: "API de Streaming",
    icone: "film",
    dados: `dados = {
    "plataforma": "StreamBR",
    "usuarios": [
        {
            "nome": "Ana",
            "plano": "premium",
            "historico": [
                {"titulo": "Breaking Bad", "tipo": "serie", "episodios_assistidos": 62, "nota": 9.5},
                {"titulo": "O Poderoso Chefão", "tipo": "filme", "episodios_assistidos": 1, "nota": 9.0},
                {"titulo": "Friends", "tipo": "serie", "episodios_assistidos": 45, "nota": 7.5}
            ]
        },
        {
            "nome": "Bruno",
            "plano": "basico",
            "historico": [
                {"titulo": "Stranger Things", "tipo": "serie", "episodios_assistidos": 34, "nota": 8.5},
                {"titulo": "Matrix", "tipo": "filme", "episodios_assistidos": 1, "nota": 8.0}
            ]
        },
        {
            "nome": "Carla",
            "plano": "premium",
            "historico": [
                {"titulo": "Breaking Bad", "tipo": "serie", "episodios_assistidos": 62, "nota": 10.0},
                {"titulo": "Dark", "tipo": "serie", "episodios_assistidos": 26, "nota": 9.0},
                {"titulo": "Interestelar", "tipo": "filme", "episodios_assistidos": 1, "nota": 9.5},
                {"titulo": "Friends", "tipo": "serie", "episodios_assistidos": 100, "nota": 6.0}
            ]
        },
        {
            "nome": "Diego",
            "plano": "basico",
            "historico": [
                {"titulo": "The Office", "tipo": "serie", "episodios_assistidos": 50, "nota": 9.0},
                {"titulo": "Interestelar", "tipo": "filme", "episodios_assistidos": 1, "nota": 9.0},
                {"titulo": "Dark", "tipo": "serie", "episodios_assistidos": 26, "nota": 8.0},
                {"titulo": "Matrix", "tipo": "filme", "episodios_assistidos": 1, "nota": 7.5},
                {"titulo": "Stranger Things", "tipo": "serie", "episodios_assistidos": 10, "nota": 7.0}
            ]
        }
    ]
}`,
    missao: `Crie um mini sistema de análise com as seguintes funções:

1. total_episodios(usuario) — retorna o total de episódios assistidos por um usuário.

2. nota_media(usuario) — retorna a nota média das avaliações do usuário.

3. conteudo_mais_popular() — encontra qual título aparece no histórico de mais usuários.

4. ranking_usuarios() — retorna os usuários ordenados por total de episódios (do maior para menor).

5. recomendacao(nome_usuario) — encontra títulos que OUTROS usuários assistiram mas este NÃO, filtrando apenas os com nota >= 8.5.

6. relatorio_geral() — imprime um relatório completo com todas as análises.

BÔNUS: Separe a análise entre usuários "premium" e "basico".`,
    saida_esperada: `═══════════════════════════════
   RELATÓRIO STREAMBR
═══════════════════════════════

📊 Ranking por episódios:
1. Carla — 189 episódios (premium)
2. Ana — 108 episódios (premium)
3. Diego — 91 episódios (basico)
4. Bruno — 35 episódios (basico)

⭐ Notas médias:
Ana: 8.67 | Bruno: 8.25 | Carla: 8.63 | Diego: 7.83

🏆 Conteúdo mais popular: Breaking Bad (2 usuários)

💡 Recomendações para Bruno:
- Breaking Bad (nota média: 9.75)
- Dark (nota: 9.0)
- O Poderoso Chefão (nota: 9.0)
- The Office (nota: 9.0)
- Interestelar (nota: 9.5)

Premium vs Básico:
Média de episódios premium: 148.5
Média de episódios básico: 63.0`,
    dicas: [
      `Esse desafio parece grande, mas é como montar um quebra-cabeça: peça por peça. Comece pelas funções pequenas (total_episodios, nota_media) e só depois passe para as mais complexas. Teste cada uma separadamente antes de juntar.`,
      `Para total_episodios, percorra o histórico do usuário somando os episódios. Para nota_media, some todas as notas e divida pela quantidade. Para conteudo_mais_popular, a ideia é: para cada título, conte em quantos históricos de usuários ele aparece — o que aparece mais vezes é o mais popular.`,
      `A recomendação funciona assim: primeiro, faça uma lista de tudo que o usuário JÁ assistiu. Depois, percorra os outros usuários e veja o que eles assistiram que NÃO está na lista do primeiro — mas só pegue os que têm nota boa (>= 8.5). Para o ranking, use sorted() nos usuários comparando pelo total de episódios.`,
      `Para o bônus premium vs básico: separe os usuários em dois grupos pelo plano, calcule o total de episódios de cada grupo e divida pela quantidade de pessoas. O relatorio_geral() é só uma função que chama todas as outras e imprime tudo de forma organizada.`,
    ],
    conceitos: ["funções compostas", "set para exclusão", "sorted com lambda", "relatório formatado"],
  },
  {
    fase: "boss",
    numero: 2,
    titulo: "API do Campeonato",
    tema: "Simulador de Campeonato",
    icone: "trophy",
    dados: `dados = {
    "campeonato": "Copa SENAI",
    "times": ["Python FC", "Java United", "C++ Rovers", "JavaScript City"],
    "jogos": [
        {"mandante": "Python FC", "visitante": "Java United", "gols_mandante": 3, "gols_visitante": 1},
        {"mandante": "C++ Rovers", "visitante": "JavaScript City", "gols_mandante": 2, "gols_visitante": 2},
        {"mandante": "Python FC", "visitante": "C++ Rovers", "gols_mandante": 1, "gols_visitante": 0},
        {"mandante": "Java United", "visitante": "JavaScript City", "gols_mandante": 0, "gols_visitante": 2},
        {"mandante": "Python FC", "visitante": "JavaScript City", "gols_mandante": 4, "gols_visitante": 1},
        {"mandante": "Java United", "visitante": "C++ Rovers", "gols_mandante": 1, "gols_visitante": 3},
        {"mandante": "JavaScript City", "visitante": "Python FC", "gols_mandante": 0, "gols_visitante": 2},
        {"mandante": "C++ Rovers", "visitante": "Java United", "gols_mandante": 1, "gols_visitante": 1},
        {"mandante": "JavaScript City", "visitante": "C++ Rovers", "gols_mandante": 3, "gols_visitante": 1},
        {"mandante": "Java United", "visitante": "Python FC", "gols_mandante": 2, "gols_visitante": 2},
        {"mandante": "JavaScript City", "visitante": "Java United", "gols_mandante": 1, "gols_visitante": 0},
        {"mandante": "C++ Rovers", "visitante": "Python FC", "gols_mandante": 0, "gols_visitante": 1}
    ]
}`,
    missao: `Construa um sistema completo de tabela de campeonato:

1. calcular_pontos(jogo, time) — dado um jogo e um nome de time, retorna 3 (vitória), 1 (empate) ou 0 (derrota).

2. gerar_tabela() — percorre TODOS os jogos e calcula para CADA time:
   pontos, vitórias, empates, derrotas, gols_pro, gols_contra, saldo

3. ordenar_tabela(tabela) — ordena por: pontos (desc), depois vitórias (desc), depois saldo de gols (desc).

4. imprimir_tabela(tabela) — imprime a tabela formatada.

5. artilheiro_time(nome) — encontra quantos gols o time fez como mandante vs visitante.

6. retrospecto(time1, time2) — mostra todos os jogos entre os dois times e o retrospecto geral.

Monte a tabela final e descubra quem é o campeão!`,
    saida_esperada: `═══ TABELA — COPA SENAI ═══
Pos | Time               | P  | V | E | D | GP | GC | SG
1   | Python FC          | 16 | 5 | 1 | 0 | 13 |  6 | +7
2   | JavaScript City    | 10 | 3 | 1 | 2 |  9 |  8 | +1
3   | C++ Rovers         |  5 | 1 | 2 | 3 |  7 |  9 | -2
4   | Java United        |  2 | 0 | 2 | 4 |  5 | 11 | -6

🏆 Campeão: Python FC!

Retrospecto Python FC vs Java United:
Jogo 1: Python FC 3 x 1 Java United
Jogo 2: Java United 2 x 2 Python FC
Python FC: 1V 1E 0D`,
    dicas: [
      `Esse é o chefão! Mas a estratégia é a mesma: divida em partes menores. Comece pela função calcular_pontos — ela só olha um jogo e diz se um time ganhou (3 pts), empatou (1 pt) ou perdeu (0 pts).`,
      `Para gerar_tabela, o truque principal é: antes de olhar os jogos, prepare uma "ficha" para cada time com tudo zerado (pontos, vitórias, empates, derrotas, gols a favor, gols contra). Depois, passe por cada jogo e atualize as fichas. Atenção: cada jogo mexe em DOIS times — o mandante e o visitante.`,
      `Para saber quem ganhou um jogo: compare gols_mandante com gols_visitante. Se o mandante fez mais gols, ele ganhou (+3 pts) e o visitante perdeu. Se foi igual, empate (+1 pt cada). Some os gols a favor e contra de cada lado.`,
      `Para ordenar a tabela, o Python permite ordenar por mais de um critério ao mesmo tempo usando uma tupla. O primeiro da tabela é quem tem mais pontos; se empatar, quem tem mais vitórias; se empatar de novo, quem tem melhor saldo de gols. Use sorted() com reverse=True.`,
    ],
    conceitos: ["sistema completo", "atualizar dois registros por iteração", "ordenação multi-critério", "retrospecto"],
  },
];

interface Desafio {
  fase: string;
  numero: number;
  titulo: string;
  tema: string;
  icone: string;
  dados: string;
  missao: string;
  saida_esperada: string;
  dicas: string[];
  conceitos: string[];
}

function HintBox({ dicas }: { dicas: string[] }) {
  const [reveladas, setReveladas] = useState(0);
  const total = dicas.length;

  return (
    <div className="flex flex-col gap-2">
      {dicas.map((dica, i) => {
        const visivel = i < reveladas;
        return (
          <div
            key={i}
            className={`rounded-xl border overflow-hidden transition-all duration-200 ${
              visivel ? "border-amber-400/30" : "border-border"
            }`}
            style={{
              background: visivel ? "rgba(251,191,36,0.08)" : "transparent",
            }}
          >
            {!visivel && i === reveladas ? (
              <button
                onClick={() => setReveladas(reveladas + 1)}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-transparent border-none cursor-pointer font-mono text-sm font-bold tracking-wide text-amber-400 hover:brightness-110"
              >
                <Lock size={14} />
                {i === 0
                  ? "PRECISO DE UMA DICA..."
                  : i === total - 1
                    ? "AINDA ESTOU PERDIDO... MAIS AJUDA!"
                    : "QUERO MAIS UMA DICA..."}
              </button>
            ) : visivel ? (
              <>
                <div className="flex items-center gap-2 px-3.5 pt-2.5 font-mono text-[0.78rem] font-bold tracking-wide text-amber-400/70">
                  <LockOpen size={12} />
                  DICA {i + 1} DE {total}
                </div>
                <div className="px-3.5 pb-3 pt-1.5 font-sans text-base leading-relaxed text-foreground">
                  {dica}
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ChallengeCard({
  d,
  expanded,
  onToggle,
}: {
  d: Desafio;
  idx: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const fase = FASES.find((f) => f.id === d.fase)!;

  return (
    <div
      className="bg-card rounded-xl overflow-hidden transition-colors duration-300"
      style={{
        border: `1px solid ${expanded ? fase.cor + "44" : "var(--border)"}`,
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3.5 px-5 py-4 bg-transparent border-none cursor-pointer text-left hover:brightness-110"
      >
        <span
          className="font-mono text-[0.8rem] font-bold px-2.5 py-1 rounded-md whitespace-nowrap tracking-wide"
          style={{ color: fase.cor, background: fase.cor + "15" }}
        >
          {d.fase.toUpperCase()} #{d.numero}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-foreground font-semibold text-base flex items-center gap-1.5">
            {TEMA_ICONS[d.icone]}
            {d.titulo}
          </div>
          <div className="text-muted-foreground/60 text-sm mt-0.5">
            {d.conceitos.join(" · ")}
          </div>
        </div>
        <span
          className="text-muted-foreground/60 transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <CaretDown size={16} />
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5">
          {/* Tema */}
          <div className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {d.tema}
          </div>

          {/* JSON data */}
          <div className="bg-background border border-border rounded-xl mb-4 overflow-hidden">
            <div className="px-3.5 py-2 border-b border-border flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span className="font-mono text-[0.8rem] text-muted-foreground/60 font-semibold tracking-widest">
                DADOS
              </span>
            </div>
            <pre className="m-0 px-4 py-3.5 font-mono text-sm leading-relaxed text-foreground overflow-x-auto whitespace-pre">
              {d.dados}
            </pre>
          </div>

          {/* Mission */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3.5 mb-4">
            <div className="font-mono text-[0.78rem] font-bold text-primary tracking-widest mb-2 flex items-center gap-1.5">
              <Target size={12} />
              MISSÃO
            </div>
            <pre className="m-0 font-sans text-base leading-relaxed text-foreground whitespace-pre-wrap">
              {d.missao}
            </pre>
          </div>

          {/* Expected output */}
          <div className="bg-muted border border-border rounded-xl px-4 py-3.5 mb-4">
            <div className="font-mono text-[0.78rem] font-bold text-muted-foreground/60 tracking-widest mb-2 flex items-center gap-1.5">
              <ClipboardText size={12} />
              SAÍDA ESPERADA
            </div>
            <pre className="m-0 font-mono text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {d.saida_esperada}
            </pre>
          </div>

          {/* Hint (collapsible) */}
          <HintBox dicas={d.dicas} />

          {/* Concept tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {d.conceitos.map((c) => (
              <span
                key={c}
                className="font-mono text-[0.78rem] px-2.5 py-0.5 rounded font-semibold"
                style={{
                  background: "rgba(124,59,237,0.1)",
                  color: "#7c3aed",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DesafiosAPI() {
  const [faseAtiva, setFaseAtiva] = useState<string | null>(null);
  const [expandido, setExpandido] = useState<string | null>(null);
  const [concluidos, setConcluidos] = useState<Set<string>>(new Set());

  const desafiosFiltrados = faseAtiva
    ? DESAFIOS.filter((d) => d.fase === faseAtiva)
    : DESAFIOS;

  const toggleConcluido = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConcluidos((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="bg-background min-h-screen text-foreground font-sans">
      <div className="max-w-3xl mx-auto px-5 py-7">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold tracking-tight m-0">
            <span className="text-primary font-mono font-medium">{"{ }"}</span>{" "}
            Decifrando APIs
          </h1>
          <p className="text-muted-foreground/60 text-sm mt-1 leading-relaxed">
            {DESAFIOS.length} desafios abertos · copie os dados, resolva na sua IDE,
            compare com a saída esperada
          </p>

          {/* Progress */}
          <div className="flex items-center gap-2.5 mt-3.5">
            <div className="flex-1 h-1 bg-border rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded transition-all duration-500 ease-in-out"
                style={{
                  width: `${(concluidos.size / DESAFIOS.length) * 100}%`,
                }}
              />
            </div>
            <span className="font-mono text-[0.82rem] text-muted-foreground/60 font-medium whitespace-nowrap">
              {concluidos.size}/{DESAFIOS.length}
            </span>
          </div>
        </div>

        {/* Phase filters */}
        <div className="flex gap-1.5 flex-wrap mb-6">
          <button
            onClick={() => setFaseAtiva(null)}
            className={`px-3.5 py-1.5 rounded-lg border font-mono text-[0.82rem] font-semibold cursor-pointer transition-colors hover:brightness-110 ${
              !faseAtiva
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border bg-transparent text-muted-foreground"
            }`}
          >
            Todas ({DESAFIOS.length})
          </button>
          {FASES.map((f) => {
            const count = DESAFIOS.filter((d) => d.fase === f.id).length;
            const done = DESAFIOS.filter(
              (d) => d.fase === f.id && concluidos.has(`${d.fase}-${d.numero}`)
            ).length;
            const active = faseAtiva === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFaseAtiva(active ? null : f.id)}
                className="px-3.5 py-1.5 rounded-lg font-mono text-[0.82rem] font-semibold cursor-pointer flex items-center gap-1.5 transition-colors hover:brightness-110"
                style={{
                  border: `1px solid ${active ? f.cor + "66" : "var(--border)"}`,
                  background: active ? f.cor + "15" : "transparent",
                  color: active ? f.cor : "var(--muted-foreground)",
                }}
              >
                {FASE_ICONS[f.id]}
                {f.label}
                <span className="opacity-50">
                  {done}/{count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phase description */}
        {faseAtiva && (
          <div className="px-4 py-3 bg-muted border border-border rounded-xl mb-5 text-base text-muted-foreground flex items-center gap-2.5">
            <span className="text-xl">
              {FASE_ICONS[faseAtiva]}
            </span>
            {FASES.find((f) => f.id === faseAtiva)?.desc}
          </div>
        )}

        {/* Challenges list */}
        <div className="flex flex-col gap-2.5 pl-8">
          {desafiosFiltrados.map((d, i) => {
            const key = `${d.fase}-${d.numero}`;
            return (
              <div key={key} className="relative">
                {/* Done checkbox */}
                <button
                  onClick={(e) => toggleConcluido(key, e)}
                  title={
                    concluidos.has(key)
                      ? "Marcar como pendente"
                      : "Marcar como concluído"
                  }
                  className="absolute top-4 -left-8 w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center z-10 p-0 transition-colors bg-transparent"
                  style={{
                    borderColor: concluidos.has(key) ? "#34d399" : "var(--border)",
                    background: concluidos.has(key) ? "#34d39920" : "transparent",
                    color: "#34d399",
                  }}
                >
                  {concluidos.has(key) ? <Check size={11} weight="bold" /> : null}
                </button>

                <ChallengeCard
                  d={d}
                  idx={i}
                  expanded={expandido === key}
                  onToggle={() =>
                    setExpandido(expandido === key ? null : key)
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 px-5 py-4 bg-muted border border-border rounded-xl text-center">
          <p className="font-mono text-[0.88rem] text-muted-foreground/60 leading-relaxed">
            Completou tudo? Parabéns!! {" "}
            <Rocket size={14} weight="fill" className="inline-block text-primary" />
          </p>
        </div>
      </div>
    </div>
  );
}
