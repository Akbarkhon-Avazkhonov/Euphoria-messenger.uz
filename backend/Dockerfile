# Используем официальный образ Node.js версии 18
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./
RUN npm install
COPY . .

# создай папку uploads
RUN mkdir -p /app/uploads
# Собираем проект
RUN npm run build

# Указываем команду запуска
CMD ["npm", "run", "start:prod"]

# Открываем порт
EXPOSE 4000
