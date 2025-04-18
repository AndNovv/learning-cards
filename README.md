# 📘 Plexicon

**Plexicon** — это образовательная платформа для изучения иностранных языков с помощью интерактивных флешкарточек и встроенного AI-ассистента на базе ChatGPT.  
Проект создан с использованием **Next.js**, **MongoDB** и **Docker Compose**, и доступен онлайн по адресу: [https://plexicon.ru](https://plexicon.ru).

## Возможности

- 🧠 Эффективное запоминание слов благодаря алгоритму интервального повторения (spaced repetition)
- 🤖 Помощь в изучении от искусственного интеллекта (ChatGPT): примеры, объяснения, грамматика
- 📚 Создание и редактирование собственных карточек
- 🔐 Вход через Google-аккаунт (OAuth 2.0)
- 📊 Личный кабинет с прогрессом и статистикой и настройкой ассистента
- 🐳 Быстрый запуск проекта через Docker Compose

---

## Стек технологий

- **Frontend / Backend**: Next.js (App Router)
- **База данных**: MongoDB
- **Аутентификация**: NextAuth.js + Google OAuth
- **AI**: OpenAI (ChatGPT API)
- **Контейнеризация**: Docker + Docker Compose

---

## Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/your-username/plexicon.git
cd plexicon
```
### 2. Создайте файл .env.local

Скопируйте пример и заполните переменные:

```
cp .env.example .env.local
```

Пример переменных окружения:

```
MONGODB_URI=ваш_адрес_бд
GOOGLE_CLIENT_ID=ваш_google_client_id
GOOGLE_CLIENT_SECRET=ваш_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=секрет_для_nextauth
OFFICIAL_AUTHOR_ID=внутренний_id_автора
BASE_URL=http://localhost:3000
OPENAI_API_KEY=ваш_openai_api_key
```

### 3. Запуск через Docker Compose

Убедитесь, что Docker установлен:

docker-compose up --build

После запуска платформа будет доступна по адресу: http://localhost:3000
## Разработка без Docker

```
npm install
npm run dev
```

