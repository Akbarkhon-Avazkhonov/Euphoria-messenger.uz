# Используем официальный образ Node.js версии 18
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только production-зависимости
RUN npm install --production

# Создаем папку uploads
RUN mkdir -p /app/uploads

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем переменные окружения (опционально)
ENV NODE_ENV=production
ENV PORT=4000

# Указываем команду запуска
CMD ["npm", "run", "start:prod"]

# Открываем порт
EXPOSE 4000
