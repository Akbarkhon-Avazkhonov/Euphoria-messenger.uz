# Используем официальный образ Node.js версии 18
FROM node:18.18.2

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./
RUN npm install
COPY . .

# Собираем проект
RUN npm run build

# Указываем команду запуска
CMD ["npm", "run", "start:prod"]

# Открываем порт
EXPOSE 4000
