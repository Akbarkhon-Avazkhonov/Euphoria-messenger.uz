# Используем официальный образ Node.js версии 18
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production
RUN npm install -g @nestjs/cli

# Создаем папку uploads
RUN mkdir -p /app/uploads

# Копируем оставшиеся файлы
COPY . .

# Собираем проект
RUN npm run build

# Указываем переменные окружения
ENV NODE_ENV=production
ENV PORT=4000

# Указываем команду запуска
CMD ["npm", "run", "start:prod"]

# Открываем порт
EXPOSE 4000
