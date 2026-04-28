# Clody

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

---

> 🌤️ **Clody** é um aplicativo de previsão do tempo pensado para ser **calmo, bonito e direto ao ponto**.

---

## Sobre o Clody

Clody nasceu de uma pergunta simples: por que aplicativos de clima precisam ser tão carregados de informação, tão frios, tão técnicos?

A proposta foi criar algo diferente, um app que você abre, entende o tempo em segundos, e sente que está olhando algo agradável. Para isso, o design segue o conceito de **claymorphism**: superfícies suaves, sombras leves, gradientes orgânicos e formas arredondadas que passam uma sensação de calma e conforto. O visual muda conforme o clima, céu claro, dias quentes, noites escuras e acolhedoras.

O resultado é um app que informa sem estressar.

---

## Funcionalidades

- **Onboarding contextual** — apresentação visual que muda conforme o horário: dia ou noite
- **Tela inicial com clima atual** — temperatura, cidade, umidade, vento, sensação térmica e previsão hora a hora
- **Busca de cidades** — pesquisa com debounce, sugestões em tempo real e histórico local de cidades visitadas
- **Previsão para os próximos dias** — agrupamento diário com gráfico de temperaturas por hora ao expandir cada dia

---

## Stack e motivações

### React Native + Expo

O app é mobile-first. React Native com Expo foi a escolha natural por permitir desenvolver para iOS e Android com uma única base de código, sem abrir mão de acesso a recursos nativos como localização e armazenamento local. O Expo Router organiza a navegação por sistema de arquivos, o que torna a estrutura de telas simples de entender e manter.

### TypeScript

Todo o projeto é tipado com TypeScript. Isso elimina uma categoria inteira de bugs em tempo de desenvolvimento, especialmente importante quando trabalhamos com respostas de API externas onde os tipos precisam ser definidos explicitamente.

### OpenWeatherMap API

A fonte de todos os dados climáticos. Utilizamos três endpoints:

| Endpoint | Onde é usado |
|---|---|
| `/data/2.5/weather` | Clima atual na tela inicial |
| `/data/2.5/forecast` | Previsão por hora (próximas horas na home e gráficos na agenda) |
| `/data/2.5/air_pollution` | Índice de qualidade do ar (AQI) e CO ao salvar uma cidade |
| `Geocoding API`| Busca de cidades por nome |

Toda requisição passa por um cliente Axios centralizado que injeta automaticamente a API key, a unidade métrica (`metric`) e o idioma (`pt_br`). Isso garante que nenhuma tela precise se preocupar com esses detalhes, é uma configuração única, aplicada globalmente.

### TanStack Query (React Query)

Gerencia o ciclo de vida das requisições: cache, loading states, re-fetch automático e prevenção de chamadas duplicadas. Na home, as queries de clima atual e forecast ficam habilitadas somente após a localização GPS estar disponível (`enabled: !!lat && !!lon`). Na agenda, aguardam a rehidratação do Zustand antes de disparar. Isso evita chamadas desnecessárias e garante que os dados só sejam buscados quando temos tudo que precisamos.

### Zustand

Estado global leve. O principal uso é o `useLocationStore`, que persiste lat/lon e nome da cidade via AsyncStorage. Quando o usuário volta ao app, a localização já está disponível para as outras telas (busca, agenda) sem precisar pedir GPS de novo. O flag `_hasHydrated` controla quando o estado foi restaurado do storage, evitando que queries disparem antes da hora.

### Expo SQLite + Drizzle ORM

Problema: o usuário busca uma cidade, vê o clima, fecha o app. Na próxima vez que abrir a busca, seria chato precisar digitar tudo de novo.

Solução: quando uma cidade é selecionada na busca, salvamos ela localmente no SQLite usando Drizzle ORM. O repositório mantém no máximo 2 cidades recentes — ao chegar no limite, a mais antiga é removida. Se a cidade já existe, apenas atualizamos o timestamp.

O Drizzle foi escolhido por oferecer uma API type-safe e migrações versionadas, tornando o schema previsível e fácil de evoluir.

### Skia + Inner Shadow

Para os efeitos visuais do claymorphism, sombras internas, superfícies com profundidade e cartões com aparência "tridimensional suave", usamos `@shopify/react-native-skia` e `react-native-inner-shadow`. Bibliotecas nativas de renderização que garantem que o visual permaneça fluido independente do dispositivo.

### Zod + React Hook Form

Usados para validação de formulários. Zod garante que os dados passem por uma tipagem rigorosa antes de chegar na lógica da aplicação.

---

## Telas

### Onboarding

Primeira tela que o usuário vê. Detecta se é dia ou noite no dispositivo e adapta o visual: gradiente claro com nuvem de sol durante o dia, gradiente escuro e acolhedor com lua durante a noite. O texto também muda para refletir o momento. Após confirmar, a flag de onboarding é salva e o usuário vai direto para a home nas próximas aberturas.

### Home

O coração do app. Ao abrir:

1. Solicita permissão de localização GPS
2. Obtém as coordenadas do dispositivo
3. Faz reverse geocoding para obter o nome da cidade
4. Dispara duas queries em paralelo: clima atual e forecast

Com os dados em mãos, exibe:
- Imagem contextual do clima (sol, chuva, neve, etc.)
- Temperatura atual em destaque
- Nome da cidade
- Cards com umidade, velocidade do vento e sensação térmica
- Lista horizontal com previsão para as próximas horas

O gradiente de fundo muda conforme a condição climática, dia ensolarado tem tons quentes alaranjados, noite tem tons escuros azulados, chuva tem fundo sombrio.

### Busca

Permite encontrar qualquer cidade do mundo. A pesquisa usa debounce de 500ms para não disparar uma requisição a cada tecla digitada. Os resultados vêm da Geocoding API da OpenWeatherMap.

Ao selecionar uma cidade:
1. Buscamos clima atual e qualidade do ar em paralelo
2. Salvamos tudo no SQLite como localização recente
3. A cidade aparece nos cards de "Recentes" para acesso rápido

### Próximos dias (Agenda)

Usa o endpoint de forecast para trazer previsão de até 5 dias. Os dados vêm em intervalos de 3 horas, o app agrupa por dia, calcula mínima e máxima, e escolhe o ícone mais frequente do dia para representá-lo. Cada card pode ser expandido para ver um gráfico com as temperaturas em horários específicos (8h, 12h, 18h, 22h).

---

## Acessibilidade

Clody foi construído com acessibilidade como parte do design, não como adição posterior. O objetivo é que o app funcione bem para o maior número possível de pessoas, incluindo quem usa leitores de tela como VoiceOver (iOS) e TalkBack (Android).

### Tipografia escalável

Todos os tamanhos de fonte no app passam pelo hook `useFontScale`, que calcula um fator de escala baseado na largura real da tela do dispositivo. A referência é 390px (iPhone 14), em telas menores o texto encolhe proporcionalmente, em telas maiores cresce, sempre dentro de limites seguros (mínimo 85%, máximo 120%).

Isso significa que nenhum texto está com tamanho fixo no código, todos respondem ao dispositivo automaticamente.

### Leitores de tela

Componentes interativos e informativos usam as APIs de acessibilidade do React Native para comunicar sua função e conteúdo aos leitores de tela:

- **`accessibilityRole`** — indica ao leitor de tela o tipo do elemento (`button`, `header`, `text`, etc.), para que ele possa comunicar a função corretamente ao usuário
- **`accessibilityLabel`** — texto descritivo lido pelo leitor de tela no lugar do conteúdo visual. Em cards com múltiplas informações (cidade, temperatura, condição), o label consolida tudo em uma frase natural: *"São Paulo, BR, 24 graus"*
- **`accessibilityHint`** — instrução sobre o que acontece ao interagir com o elemento: *"Toque para ver os detalhes desta cidade"*
- **`accessibilityElementsHidden` / `importantForAccessibility`** — usado para ocultar elementos decorativos (ícones SVG, camadas de sombra) do fluxo do leitor de tela, evitando ruído desnecessário

---

## Como rodar

**Pré-requisitos:** Node.js, Expo CLI e uma chave da [OpenWeatherMap API](https://openweathermap.org/api).

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Criar arquivo de variáveis de ambiente
echo "EXPO_PUBLIC_OWM_API_KEY=sua_chave_aqui" > .env

# Prebuild
npx expo prebuild
```

Para rodar em dispositivo físico ou emulador:

```bash
npx expo run:ios
# ou
npx expo run:android
```

---

---

# Clody (English)

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

---

> 🌤️ **Clody** is a weather app built to feel **calm, beautiful, and to the point**.

---

## About Clody

Clody started from a simple question: why do weather apps have to be so cluttered, so cold, so technical?

The goal was to build something different, an app you open, understand the weather in seconds, and actually enjoy looking at. To achieve this, the design follows **claymorphism**: soft surfaces, gentle shadows, organic gradients, and rounded shapes that create a sense of calm and comfort. The visual adapts to the current weather, clear sky, warm days, dark and cozy nights.

The result is an app that informs without overwhelming.

---

## Features

- **Contextual onboarding** — visual introduction that adapts to day or night
- **Current weather home screen** — temperature, city, humidity, wind, feels-like and hourly forecast
- **City search** — debounced search, real-time suggestions, and local history of visited cities
- **Multi-day forecast** — daily grouping with an hourly temperature chart when each day is expanded

---

## Stack and motivations

### React Native + Expo

The app is mobile-first. React Native with Expo was the natural choice: one codebase for iOS and Android, with access to native features like GPS and local storage. Expo Router handles navigation through a file-based structure, making screens easy to understand and maintain.

### TypeScript

The entire project is typed with TypeScript. This eliminates a whole category of runtime bugs, which is especially important when working with external API responses where types must be explicitly defined.

### OpenWeatherMap API

The source for all weather data. Three endpoints are used:

| Endpoint | Where it's used |
|---|---|
| `/data/2.5/weather` | Current weather on the home screen |
| `/data/2.5/forecast` | Hourly forecast (next hours on home, charts on schedule) |
| `/data/2.5/air_pollution` | AQI and CO index when saving a city |
| `Geocoding API` | City search by name |

Every request goes through a centralized Axios client that automatically injects the API key, metric units, and Portuguese language. No screen needs to worry about those details, it's configured once, applied globally.

### TanStack Query (React Query)

Manages the full request lifecycle: caching, loading states, automatic re-fetch, and duplicate call prevention. On the home screen, queries are only enabled once GPS coordinates are available (`enabled: !!lat && !!lon`). On the schedule screen, they wait for Zustand to rehydrate before firing. This prevents unnecessary API calls and ensures data is only fetched when everything is ready.

### Zustand

Lightweight global state. The main use is `useLocationStore`, which persists lat/lon and city name via AsyncStorage. When the user returns to the app, the location is already available for other screens (search, schedule) without requesting GPS again. The `_hasHydrated` flag controls when state has been restored from storage, preventing queries from firing prematurely.

### Expo SQLite + Drizzle ORM

Problem: the user searches for a city, checks the weather, closes the app. Next time they open search, it would be annoying to type everything again.

Solution: when a city is selected in search, we save it locally to SQLite using Drizzle ORM. The repository keeps at most 2 recent cities, when the limit is reached, the oldest is removed. If the city already exists, only the timestamp is updated.

Drizzle was chosen for its type-safe API and versioned migrations, making the schema predictable and easy to evolve.

### Skia + Inner Shadow

For the claymorphism visual effects, inner shadows, depth surfaces, and "softly three-dimensional" cards, we use `@shopify/react-native-skia` and `react-native-inner-shadow`. Native rendering libraries that keep the visuals smooth regardless of the device.

### Zod + React Hook Form

Used for form validation. Zod ensures data passes strict type checking before reaching application logic.

---

## Screens

### Onboarding

The first screen the user sees. It detects whether it's day or night on the device and adapts accordingly: a light gradient with a sun-cloud illustration during the day, a dark and cozy gradient with a moon at night. The copy also changes to reflect the moment. After confirming, the onboarding flag is saved and the user goes straight to home on future opens.

### Home

The heart of the app. On open:

1. Requests GPS location permission
2. Gets device coordinates
3. Performs reverse geocoding to get the city name
4. Fires two queries in parallel: current weather and forecast

With data in hand, it displays:
- A contextual weather image (sun, rain, snow, etc.)
- Current temperature in large type
- City name
- Cards with humidity, wind speed and feels-like temperature
- A horizontal list with hourly forecast for the next few hours

The background gradient changes with the weather condition, sunny day uses warm orange tones, night uses dark blue tones, rain uses a dark moody background.

### Search

Lets users find any city in the world. Search uses 500ms debounce to avoid firing a request on every keystroke. Results come from the OpenWeatherMap Geocoding API.

When a city is selected:
1. Current weather and air quality are fetched in parallel
2. Everything is saved to SQLite as a recent location
3. The city appears in the "Recent" cards for quick access

### Schedule (Next Days)

Uses the forecast endpoint to show up to 5 days ahead. Data comes in 3-hour intervals — the app groups by day, calculates min and max temperatures, and picks the most frequent icon of the day to represent it. Each card can be expanded to reveal a chart with temperatures at specific times (8h, 12h, 18h, 22h).

---

## Accessibility

Clody was built with accessibility as part of the design, not as an afterthought. The goal is for the app to work well for as many people as possible, including those who use screen readers like VoiceOver (iOS) and TalkBack (Android).

### Scalable typography

Every font size in the app goes through the `useFontScale` hook, which calculates a scale factor based on the actual screen width of the device. The baseline is 390px (iPhone 14), on smaller screens text scales down proportionally, on larger screens it grows, always within safe bounds (minimum 85%, maximum 120%).

This means no text in the codebase has a hardcoded fixed size, everything responds to the device automatically.

### Screen readers

Interactive and informational components use React Native's accessibility APIs to communicate their role and content to screen readers:

- **`accessibilityRole`** — tells the screen reader what kind of element it is (`button`, `header`, `text`, etc.), so it can communicate the function correctly to the user
- **`accessibilityLabel`** — descriptive text read by the screen reader instead of the visual content. In cards with multiple pieces of information (city, temperature, condition), the label consolidates everything into a natural sentence: *"São Paulo, BR, 24 degrees"*
- **`accessibilityHint`** — instruction about what happens when the element is interacted with: *"Tap to see details for this city"*
- **`accessibilityElementsHidden` / `importantForAccessibility`** — used to hide decorative elements (SVG icons, shadow layers) from the screen reader flow, avoiding unnecessary noise

---

## Running locally

**Prerequisites:** Node.js, Expo CLI, and an [OpenWeatherMap API](https://openweathermap.org/api) key.

```bash
# Install dependencies
npm install

# Create environment variables file
echo "EXPO_PUBLIC_OWM_API_KEY=your_key_here" > .env

# Prebuild
npx expo prebuild
```

To run on a physical device or emulator:

```bash
npx expo run:ios
# or
npx expo run:android
```
