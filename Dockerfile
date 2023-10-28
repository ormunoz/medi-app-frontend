# Utiliza una imagen de Node.js como base
FROM node:20.1.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de tu proyecto al directorio de trabajo
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación (asegúrate de que coincida con la configuración de tu proyecto)
EXPOSE 8080

# Comando para ejecutar la aplicación (ajústalo según sea necesario)
CMD ["npm", "run", "serve"]
