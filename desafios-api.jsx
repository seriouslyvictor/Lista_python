import { useState, useRef, useEffect } from "react";

const FASES = [
  {
    id: "acesso",
    label: "Acesso Direto",
    icon: "🔑",
    cor: "#22d3ee",
    desc: "Acessar valores em dicionários simples e aninhados",
  },
  {
    id: "loops",
    label: "Loops + Listas",
    icon: "🔄",
    cor: "#a78bfa",
    desc: "Iterar sobre listas de dicionários",
  },
  {
    id: "filtros",
    label: "Filtros + Condicionais",
    icon: "🎯",
    cor: "#fbbf24",
    desc: "Combinar loops com if/else para filtrar dados",
  },
  {
    id: "transformacao",
    label: "Transformação",
    icon: "⚙️",
    cor: "#34d399",
    desc: "Criar novos dicts e listas a partir de dados existentes",
  },
  {
    id: "funcoes",
    label: "Funções + API",
    icon: "🧩",
    cor: "#f472b6",
    desc: "Encapsular lógica em funções reutilizáveis",
  },
  {
    id: "boss",
    label: "Boss Final",
    icon: "🐉",
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
    tema: "🎮 PokéAPI",
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
    dica: `Lembre: "types" é uma lista. Para acessar o primeiro item use [0], depois navegue nas chaves internas.`,
    conceitos: ["acesso a chaves", "lista dentro de dict", "acesso aninhado"],
  },
  {
    fase: "acesso",
    numero: 2,
    titulo: "Previsão do Tempo",
    tema: "🌤️ OpenWeather",
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
    dica: `Extraia cada valor em uma variável separada antes de montar a f-string. "weather" é uma lista — precisa do [0].`,
    conceitos: ["acesso aninhado", "f-string", "lista com um item"],
  },
  {
    fase: "acesso",
    numero: 3,
    titulo: "Perfil do Jogador",
    tema: "⚽ API de Futebol",
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
    dica: `Para a média, divida gols por jogos e use :.2f na f-string. O caminho pro estádio é: dados → jogador → clube → estadio.`,
    conceitos: ["acesso profundo", "operações matemáticas", "f-string com formatação"],
  },
  {
    fase: "acesso",
    numero: 4,
    titulo: "Dados do Usuário",
    tema: "📱 API de Rede Social",
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
    dica: `Use round(valor, 1) ou :.1f para a proporção. Para o @, é só concatenar na f-string.`,
    conceitos: ["booleanos", "round / formatação", "acesso aninhado"],
  },

  // ═══════════════ FASE 2: LOOPS + LISTAS ═══════════════
  {
    fase: "loops",
    numero: 1,
    titulo: "Playlist Brasileira",
    tema: "🎵 API de Músicas",
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
    dica: `Para o total, use o padrão acumulador (total = 0, depois total += ...). Para a média, divida o total por len(dados["musicas"]).`,
    conceitos: ["for loop", "acumulador", "len()", "f-string"],
  },
  {
    fase: "loops",
    numero: 2,
    titulo: "Tabela do Brasileirão",
    tema: "⚽ API de Futebol",
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
    dica: `Para encontrar o time com mais vitórias, use uma variável para guardar o melhor até agora e compare a cada volta do loop.`,
    conceitos: ["for loop", "operações dentro do loop", "comparação / máximo"],
  },
  {
    fase: "loops",
    numero: 3,
    titulo: "Inventário RPG",
    tema: "🗡️ API de Game",
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
    dica: `Use contadores separados: um para o total de valor, outro para contar consumíveis. Para itens valiosos, tente acumular em uma lista com .append().`,
    conceitos: ["for loop", "múltiplos acumuladores", "contador", ".append()"],
  },
  {
    fase: "loops",
    numero: 4,
    titulo: "Catálogo de Produtos",
    tema: "🛒 API de E-commerce",
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
    dica: `Para valor em estoque: multiplique preço × estoque de cada produto e acumule. Para mais caro/barato, guarde o produto atual e compare a cada iteração.`,
    conceitos: ["for loop", "multiplicação no loop", "min/max manual", "estoque zero"],
  },

  // ═══════════════ FASE 3: FILTROS + CONDICIONAIS ═══════════════
  {
    fase: "filtros",
    numero: 1,
    titulo: "Filtro de Pokémon",
    tema: "🎮 PokéAPI",
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
    dica: `Combine o for com if. Para separar em duas listas, crie duas listas vazias antes do loop e use .append() com a condição.`,
    conceitos: ["for + if", "booleano como filtro", "múltiplas condições", "separar listas"],
  },
  {
    fase: "filtros",
    numero: 2,
    titulo: "Relatório de Vendas",
    tema: "📊 API de Dashboard",
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
    dica: `Para total por região, crie um dict como totais = {"SP": 0, "RJ": 0, "MG": 0} e acumule dentro do loop. Para porcentagem: (acertos / total) * 100.`,
    conceitos: ["for + if/else", "acumulador por categoria", "porcentagem", "emoji condicional"],
  },
  {
    fase: "filtros",
    numero: 3,
    titulo: "Feed de Notícias",
    tema: "📰 API de Notícias",
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
    dica: `Para sorted(), use o parâmetro key: sorted(lista, key=lambda x: x["likes"], reverse=True). Para contar por autor, crie um dict e use .get() para inicializar.`,
    conceitos: ["sorted() com lambda", "engajamento calculado", "contagem com dict", "top N"],
  },

  // ═══════════════ FASE 4: TRANSFORMAÇÃO ═══════════════
  {
    fase: "transformacao",
    numero: 1,
    titulo: "Transformar Resposta da API",
    tema: "🌤️ OpenWeather",
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
    dica: `Para a hora, use split() na string "2024-08-01 09:00:00" → .split(" ")[1][:5]. Para descrição mais comum, conte ocorrências com um dict.`,
    conceitos: ["criar dict novo", "split()", "min/max", "contagem de frequência"],
  },
  {
    fase: "transformacao",
    numero: 2,
    titulo: "Cardápio do iFood",
    tema: "🍔 API de Delivery",
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
    dica: `Para agrupar, crie um dict vazio e use .setdefault(categoria, []).append(nome). Para o combo, filtre por categoria e pegue o min() com key=lambda.`,
    conceitos: ["agrupar em dict", ".setdefault()", "busca em lista", "min() com lambda"],
  },
  {
    fase: "transformacao",
    numero: 3,
    titulo: "Histórico de Partidas",
    tema: "🎮 API de Games",
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
    dica: `Para estatísticas por agente: crie um dict onde a chave é o nome do agente e o valor é outro dict com os acumuladores. Cuidado com divisão por zero no deaths!`,
    conceitos: ["KDA como operação", "agrupamento complexo", "dict de dicts", "taxa/porcentagem"],
  },

  // ═══════════════ FASE 5: FUNÇÕES + API ═══════════════
  {
    fase: "funcoes",
    numero: 1,
    titulo: "Funções de Consulta",
    tema: "🎮 PokéAPI",
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
    dica: `Use for + if + return para buscar_pokemon. Para mais_forte, use max() com key=lambda. Para comparar, chame buscar_pokemon() dentro da função.`,
    conceitos: ["def / return", "None como retorno", "max() com key", "funções que chamam funções"],
  },
  {
    fase: "funcoes",
    numero: 2,
    titulo: "Mini Sistema de Pedidos",
    tema: "🛒 API de E-commerce",
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
    dica: `processar_pedido() deve chamar verificar_estoque() e calcular_subtotal() internamente. Use listas para acumular aprovados e rejeitados.`,
    conceitos: ["funções compostas", "retornar dict", "validação", "formatação de moeda"],
  },

  // ═══════════════ FASE 6: BOSS FINAL ═══════════════
  {
    fase: "boss",
    numero: 1,
    titulo: "Dashboard de Streaming",
    tema: "🎬 API de Streaming",
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
                {"titulo": "The Office", "tipo": "serie", "episodios_assistidos": 80, "nota": 9.0},
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
    dica: `Quebre o problema! Faça uma função de cada vez, teste, e depois combine no relatorio_geral(). Para recomendação: pegue todos os títulos, remova os que o usuário já viu, filtre por nota.`,
    conceitos: ["funções compostas", "set para exclusão", "sorted com lambda", "relatório formatado"],
  },
  {
    fase: "boss",
    numero: 2,
    titulo: "API do Campeonato",
    tema: "⚽ Simulador de Campeonato",
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
    dica: `O segredo é inicializar um dict para cada time com todas as stats zeradas ANTES de percorrer os jogos. Cada jogo atualiza DOIS times (mandante e visitante). Use sorted() com key=lambda x: (x["pontos"], x["vitorias"], x["saldo"]) com reverse=True para critérios múltiplos de ordenação.`,
    conceitos: ["sistema completo", "atualizar dois registros por iteração", "ordenação multi-critério", "retrospecto"],
  },
];

const C = {
  bg: "#0b0d11",
  surface: "#12151c",
  surfaceAlt: "#161a24",
  border: "#1e2433",
  borderHover: "#2a3348",
  accent: "#22d3ee",
  accentDim: "rgba(34,211,238,0.08)",
  text: "#e2e8f0",
  textMid: "#94a3b8",
  textDim: "#4a5568",
  hint: "#fbbf24",
  hintDim: "rgba(251,191,36,0.08)",
  tag: "#7c3aed",
  tagDim: "rgba(124,59,237,0.1)",
};

function ChallengeCard({ d, idx, expanded, onToggle }) {
  const fase = FASES.find((f) => f.id === d.fase);

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${expanded ? fase.cor + "44" : C.border}`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: fase.cor,
            background: fase.cor + "15",
            padding: "4px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            letterSpacing: "0.04em",
          }}
        >
          {d.fase.toUpperCase()} #{d.numero}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: C.text,
              fontWeight: 600,
              fontSize: "0.92rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {d.tema.split(" ")[0]} {d.titulo}
          </div>
          <div
            style={{
              color: C.textDim,
              fontSize: "0.75rem",
              marginTop: 2,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {d.conceitos.join(" · ")}
          </div>
        </div>
        <span
          style={{
            color: C.textDim,
            fontSize: "1.1rem",
            transition: "transform 0.2s",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: "0 20px 20px" }}>
          {/* Tema tag */}
          <div
            style={{
              fontSize: "0.78rem",
              color: C.textMid,
              marginBottom: 16,
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.5,
            }}
          >
            {d.tema.split(" ").slice(1).join(" ")}
          </div>

          {/* JSON data */}
          <div
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                borderBottom: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  color: C.textDim,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                DADOS
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "14px 16px",
                fontFamily: "'DM Mono', 'Fira Code', monospace",
                fontSize: "0.76rem",
                lineHeight: 1.65,
                color: C.text,
                overflowX: "auto",
                whiteSpace: "pre",
              }}
            >
              {d.dados}
            </pre>
          </div>

          {/* Mission */}
          <div
            style={{
              background: C.accentDim,
              border: `1px solid ${C.accent}33`,
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: C.accent,
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              🎯 MISSÃO
            </div>
            <pre
              style={{
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.83rem",
                lineHeight: 1.7,
                color: C.text,
                whiteSpace: "pre-wrap",
              }}
            >
              {d.missao}
            </pre>
          </div>

          {/* Expected output */}
          <div
            style={{
              background: C.surfaceAlt,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: C.textDim,
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              📋 SAÍDA ESPERADA
            </div>
            <pre
              style={{
                margin: 0,
                fontFamily: "'DM Mono', 'Fira Code', monospace",
                fontSize: "0.76rem",
                lineHeight: 1.6,
                color: C.textMid,
                whiteSpace: "pre-wrap",
              }}
            >
              {d.saida_esperada}
            </pre>
          </div>

          {/* Hint (collapsible) */}
          <HintBox dica={d.dica} />

          {/* Concept tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 14,
            }}
          >
            {d.conceitos.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  padding: "3px 10px",
                  borderRadius: 6,
                  background: C.tagDim,
                  color: C.tag,
                  fontWeight: 600,
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

function HintBox({ dica }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: open ? C.hintDim : "transparent",
        border: `1px solid ${open ? C.hint + "33" : C.border}`,
        borderRadius: 10,
        overflow: "hidden",
        transition: "all 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: C.hint,
          letterSpacing: "0.05em",
        }}
      >
        {open ? "🔓" : "🔒"} {open ? "DICA REVELADA" : "CLIQUE PARA VER A DICA"}
      </button>
      {open && (
        <div
          style={{
            padding: "0 14px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            lineHeight: 1.6,
            color: C.text,
          }}
        >
          {dica}
        </div>
      )}
    </div>
  );
}

export default function DesafiosAPI() {
  const [faseAtiva, setFaseAtiva] = useState(null);
  const [expandido, setExpandido] = useState(null);
  const [concluidos, setConcluidos] = useState(new Set());

  const desafiosFiltrados = faseAtiva
    ? DESAFIOS.filter((d) => d.fase === faseAtiva)
    : DESAFIOS;

  const toggleConcluido = (key, e) => {
    e.stopPropagation();
    setConcluidos((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        color: C.text,
        fontFamily: "'DM Sans', -apple-system, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        button:hover { filter: brightness(1.1); }
      `}</style>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: C.accent, fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
              {"{ }"}
            </span>{" "}
            Decifrando APIs
          </h1>
          <p
            style={{
              color: C.textDim,
              fontSize: "0.82rem",
              marginTop: 4,
              lineHeight: 1.5,
            }}
          >
            {DESAFIOS.length} desafios abertos · copie os dados, resolva na sua IDE,
            compare com a saída esperada
          </p>

          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
            <div
              style={{
                flex: 1,
                height: 4,
                background: C.border,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(concluidos.size / DESAFIOS.length) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${C.accent}, #06b6d4)`,
                  borderRadius: 2,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                color: C.textDim,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {concluidos.size}/{DESAFIOS.length}
            </span>
          </div>
        </div>

        {/* Phase filters */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <button
            onClick={() => setFaseAtiva(null)}
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              border: `1px solid ${!faseAtiva ? C.accent : C.border}`,
              background: !faseAtiva ? C.accentDim : "transparent",
              color: !faseAtiva ? C.accent : C.textDim,
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 600,
            }}
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
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: `1px solid ${active ? f.cor + "66" : C.border}`,
                  background: active ? f.cor + "15" : "transparent",
                  color: active ? f.cor : C.textDim,
                  cursor: "pointer",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {f.icon} {f.label}
                <span style={{ opacity: 0.5 }}>
                  {done}/{count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fase description */}
        {faseAtiva && (
          <div
            style={{
              padding: "12px 16px",
              background: C.surfaceAlt,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              marginBottom: 20,
              fontSize: "0.82rem",
              color: C.textMid,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>
              {FASES.find((f) => f.id === faseAtiva)?.icon}
            </span>
            {FASES.find((f) => f.id === faseAtiva)?.desc}
          </div>
        )}

        {/* Challenges list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {desafiosFiltrados.map((d, i) => {
            const key = `${d.fase}-${d.numero}`;
            return (
              <div key={key} style={{ position: "relative" }}>
                {/* Done checkbox */}
                <button
                  onClick={(e) => toggleConcluido(key, e)}
                  title={concluidos.has(key) ? "Marcar como pendente" : "Marcar como concluído"}
                  style={{
                    position: "absolute",
                    top: 16,
                    left: -32,
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    border: `2px solid ${concluidos.has(key) ? "#34d399" : C.border}`,
                    background: concluidos.has(key) ? "#34d39920" : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    color: "#34d399",
                    zIndex: 2,
                    padding: 0,
                  }}
                >
                  {concluidos.has(key) ? "✓" : ""}
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
        <div
          style={{
            marginTop: 32,
            padding: "16px 20px",
            background: C.surfaceAlt,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              color: C.textDim,
              lineHeight: 1.6,
            }}
          >
            Completou tudo? Agora pode usar IA para codar — porque sabe ler o
            que ela escreve.{" "}
            <span style={{ color: C.accent }}>🚀</span>
          </p>
        </div>
      </div>
    </div>
  );
}
