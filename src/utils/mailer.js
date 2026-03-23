import dotenv from 'dotenv';
dotenv.config();

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const INSTAGRAM_URL = "https://www.instagram.com/savageproyect/";

const enviarViaAPI = async (mailOptions) => {
    const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender: { name: "Savage Group", email: process.env.SMTP_USER },
            to: [{ email: mailOptions.to }],
            subject: mailOptions.subject,
            htmlContent: mailOptions.html
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error en la API de Brevo");
    }
    return await response.json();
};

export const enviarCorreoBienvenida = async (emailDestino, nombreFan) => {
    try {
        await enviarViaAPI({
            to: emailDestino,
            subject: '¡BIENVENIDO A LA MANADA SAVAGE! 🔥',
            html: `<h1>HOLA ${nombreFan.toUpperCase()}</h1><p>Bienvenido a la manada.</p><a href="${INSTAGRAM_URL}">INSTAGRAM</a>`
        });
        console.log(`📧 Correo Fan enviado vía API a: ${emailDestino}`);
    } catch (error) {
        console.error('❌ Error API Brevo Fans:', error.message);
    }
};

export const enviarDossierComercial = async (emailDestino, nombreContacto, empresa) => {
    try {
        await enviarViaAPI({
            to: emailDestino,
            subject: `Dossier Savage - ${empresa.toUpperCase()}`,
            html: `<h1>Estimado ${nombreContacto}</h1><p>Gracias por tu interés en ${empresa}.</p>`
        });
        console.log(`💼 Correo B2B enviado vía API a: ${empresa}`);
    } catch (error) {
        console.error('❌ Error API Brevo B2B:', error.message);
    }
};
