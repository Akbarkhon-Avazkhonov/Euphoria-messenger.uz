# Используем официальный образ Node.js версии 18
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package*.json ./
RUN npm install
COPY . .

# Собираем проект
RUN npm run build

# Указываем команду запуска
CMD ["npm", "run", "start"]

# Открываем порт
EXPOSE 3000
