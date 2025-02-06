import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import dotenv from 'dotenv';
dotenv.config();


// Decodificar JSON desde la variable de entorno


const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)


// Inicializa Firebase
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'papeleria-4b9da.firebasestorage.app',  // Cambia esto por tu bucket de Firebase
});
const storage = getStorage().bucket();


export const addProductToFirebase = async (id, file) => {
    try {
        if (!file || !file.data) {
            throw new Error("El archivo no contiene datos válidos.");
        }

        const fileName = `products/${id}.png`; // Guarda la imagen con el ID del producto
        const fileRef = storage.file(fileName);

        // Subimos el archivo a Firebase Storage
        await fileRef.save(file.data, {
            metadata: {
                contentType: file.mimetype, // Mimetype correcto de la imagen
            },
        });

        // Obtener la URL pública de la imagen
        await fileRef.makePublic();
        const imageUrl = `https://storage.googleapis.com/${storage.name}/${fileName}`;

        return imageUrl;
    } catch (error) {
        console.error("Error al subir la imagen a Firebase Storage:", error);
        throw new Error("Error al subir la imagen a Firebase Storage");
    }
};


// Función para eliminar la imagen del bucket de Firebase Storage
export const deleteImageFromFirebase = async (id) => {
  try {
    const fileName = `products/${id}.png`; // El archivo que queremos eliminar
    const fileRef = storage.file(fileName); // Referencia al archivo

    // Eliminar el archivo
    await fileRef.delete();

    return `Imagen con ID ${id} eliminada de Firebase Storage.`
  } catch (error) {
    console.error(`Error al eliminar la imagen con ID ${id} de Firebase Storage:`, error);
  }
};
