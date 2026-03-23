import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Inicializamos Resend con tu llave secreta
const resend = new Resend(process.env.RESEND_API_KEY);
const INSTAGRAM_URL = "https://www.instagram.com/savageproyect/";

// --- 1. FUNCIÓN PARA FANS (B2C) ---
export const enviarCorreoBienvenida = async (emailDestino, nombreFan) => {
    try {
        const data = await resend.emails.send({
            from: 'Savage Group <onboarding@resend.dev>', // Correo oficial de pruebas de Resend
            to: emailDestino, // ¡Recuerda probar con tu propio correo registrado en Resend!
            subject: '¡BIENVENIDO A LA MANADA SAVAGE! 🔥',
            html: `
                <div style="background-color: #000; color: #fff; padding: 0; margin: 0; font-family: Arial, sans-serif; text-align: center; border: 10px solid #111;">
                    <div style="padding: 60px 20px; border-bottom: 5px solid #facc15; background-color: #050505;">
                        <h1 style="color: #facc15; font-size: 3rem; letter-spacing: 10px; margin: 0; font-weight: 900;">SAVAGE</h1>
                        <p style="letter-spacing: 5px; font-size: 0.8rem; color: #888; margin-top: 10px;">ENERGY FROM THE EDGE</p>
                    </div>
                    <div style="padding: 50px 30px; max-width: 500px; margin: 0 auto;">
                        <h2 style="color: #fff; font-size: 1.5rem; text-transform: uppercase; margin-bottom: 25px;">HOLA, ${nombreFan.toUpperCase()}</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #ccc;">Has entrado en la lista de espera más exclusiva de Chile. En <strong>Savage Energy</strong> no buscamos clientes, buscamos una manada.</p>
                        <div style="margin: 40px 0; border-top: 1px solid #333; border-bottom: 1px solid #333; padding: 25px 0;">
                            <p style="color: #facc15; font-weight: bold; font-size: 0.9rem; letter-spacing: 2px; margin: 0;">TU BENEFICIO:</p>
                            <p style="font-size: 1.3rem; color: #fff; margin: 10px 0 0 0;">ACCESO ANTICIPADO AL LANZAMIENTO</p>
                        </div>
                        
                        <a href="${INSTAGRAM_URL}" target="_blank" style="background-color: #facc15; color: #000; padding: 20px 40px; text-decoration: none; font-weight: 900; display: inline-block; text-transform: uppercase; letter-spacing: 2px;">
                            ÚNETE AL INSTAGRAM
                        </a>
                    </div>
                    <div style="padding: 30px; background-color: #050505; color: #333; font-size: 0.7rem;">
                        <p>SAVAGE GROUP SPA | VIÑA DEL MAR, CHILE</p>
                    </div>
                </div>
            `,
        });
        console.log(`📧 Correo Fan enviado por Resend a: ${emailDestino}`, data);
    } catch (error) {
        console.error('❌ Error Mailer Fans:', error.message);
    }
};

// --- 2. FUNCIÓN PARA DISTRIBUIDORES (B2B) ---
export const enviarDossierComercial = async (emailDestino, nombreContacto, empresa) => {
    try {
        const data = await resend.emails.send({
            from: 'Savage Group B2B <onboarding@resend.dev>',
            to: emailDestino,
            subject: `Dossier Comercial Savage Group - ${empresa.toUpperCase()}`,
            html: `
                <div style="background-color: #000; color: #fff; padding: 40px; font-family: Helvetica, sans-serif; border-top: 5px solid #facc15;">
                    <h1 style="color: #facc15; font-size: 1.8rem; letter-spacing: 2px;">RELACIONES COMERCIALES</h1>
                    <p style="font-size: 1.1rem;">Estimado/a ${nombreContacto},</p>
                    <p style="color: #ccc; line-height: 1.6;">Hemos recibido su interés por distribuir <strong>Savage Energy</strong> en <strong>${empresa}</strong>.</p>
                    
                    <div style="margin: 30px 0; padding: 20px; border: 1px solid #333; background-color: #0a0a0a;">
                        <p style="color: #facc15; margin: 0; font-weight: bold;">PRÓXIMOS PASOS:</p>
                        <ul style="color: #ccc; padding-left: 20px;">
                            <li>Revisión de zona de operación.</li>
                            <li>Envío de lista de precios mayoristas.</li>
                            <li>Validación de punto de venta.</li>
                        </ul>
                    </div>

                    <p style="color: #888; font-size: 0.9rem;">Mientras procesamos su solicitud, puede seguir nuestros avances aquí:</p>
                    <a href="${INSTAGRAM_URL}" style="color: #facc15; text-decoration: underline; font-weight: bold;">@savageproyect en Instagram</a>

                    <div style="margin-top: 40px; border-top: 1px solid #222; padding-top: 20px;">
                        <p style="color: #facc15; font-weight: bold; margin: 0;">Savage Group SpA</p>
                        <p style="color: #666; font-size: 0.8rem; margin: 5px 0;">Innovation in Mass Consumption | Viña del Mar, Chile</p>
                    </div>
                </div>
            `,
        });
        console.log(`💼 Correo B2B enviado por Resend a: ${empresa}`, data);
    } catch (error) {
        console.error('❌ Error Mailer B2B:', error.message);
    }
};
