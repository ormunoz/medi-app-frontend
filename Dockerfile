# Utiliza una imagen de Node.js como base
FROM node:20.1.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Copia el resto de los archivos de tu proyecto al directorio de trabajo
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Exponer el puerto en el que se ejecutará la aplicación (ajústalo según sea necesario)
EXPOSE 8080

# Comando para ejecutar la aplicación (ajústalo según sea necesario)
CMD ["npm", "run", "serve"]