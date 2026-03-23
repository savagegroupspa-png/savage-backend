import dotenv from 'dotenv';
// Nota: En Node v22 no necesitas el import de fetch

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
            html: `
                <div style="background-color: #000; color: #fff; padding: 0; margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; border: 8px solid #111;">
                    <div style="padding: 50px 20px; border-bottom: 4px solid #facc15; background-color: #050505;">
                        <h1 style="color: #facc15; font-size: 40px; letter-spacing: 12px; margin: 0; font-weight: 900; text-transform: uppercase;">SAVAGE</h1>
                        <p style="letter-spacing: 4px; font-size: 10px; color: #666; margin-top: 10px; font-weight: bold;">ENERGY FROM THE EDGE</p>
                    </div>
                    <div style="padding: 40px 30px; max-width: 500px; margin: 0 auto;">
                        <h2 style="color: #fff; font-size: 22px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">HOLA, ${nombreFan.toUpperCase()}</h2>
                        <p style="font-size: 16px; line-height: 1.6; color: #bbb;">Has entrado en la lista de espera más exclusiva de Chile. En <strong>Savage Energy</strong> no buscamos clientes, buscamos una manada.</p>
                        
                        <div style="margin: 35px 0; border-top: 1px solid #222; border-bottom: 1px solid #222; padding: 25px 0;">
                            <p style="color: #facc15; font-weight: bold; font-size: 13px; letter-spacing: 2px; margin: 0; text-transform: uppercase;">TU BENEFICIO:</p>
                            <p style="font-size: 20px; color: #fff; margin: 10px 0 0 0; font-weight: bold;">ACCESO ANTICIPADO AL LANZAMIENTO</p>
                        </div>
                        
                        <a href="${INSTAGRAM_URL}" style="background-color: #facc15; color: #000; padding: 18px 35px; text-decoration: none; font-weight: 900; display: inline-block; text-transform: uppercase; letter-spacing: 2px; border-radius: 2px; font-size: 14px;">
                            ÚNETE AL INSTAGRAM
                        </a>
                    </div>
                    <div style="padding: 25px; background-color: #050505; color: #444; font-size: 10px; letter-spacing: 1px;">
                        <p>SAVAGE GROUP SPA | VIÑA DEL MAR, CHILE</p>
                        <p style="margin-top: 5px;">© 2026 SAVAGE PROJECT - TODOS LOS DERECHOS RESERVADOS</p>
                    </div>
                </div>
            `
        });
        console.log(`📧 Correo Fan enviado con estilo a: ${emailDestino}`);
    } catch (error) {
        console.error('❌ Error API Brevo Fans:', error.message);
    }
};

export const enviarDossierComercial = async (emailDestino, nombreContacto, empresa) => {
    try {
        await enviarViaAPI({
            to: emailDestino,
            subject: `Dossier Comercial Savage Group - ${empresa.toUpperCase()}`,
            html: `
                <div style="background-color: #000; color: #fff; padding: 40px; font-family: 'Helvetica Neue', Arial, sans-serif; border-left: 5px solid #facc15;">
                    <h1 style="color: #facc15; font-size: 24px; letter-spacing: 3px; text-transform: uppercase;">RELACIONES COMERCIALES</h1>
                    <p style="font-size: 16px; margin-top: 20px;">Estimado/a ${nombreContacto},</p>
                    <p style="color: #ccc; line-height: 1.6; font-size: 15px;">Hemos recibido su interés por distribuir <strong>Savage Energy</strong> en <strong>${empresa}</strong>.</p>
                    
                    <div style="margin: 30px 0; padding: 25px; border: 1px solid #333; background-color: #0a0a0a;">
                        <p style="color: #facc15; margin: 0 0 15px 0; font-weight: bold; letter-spacing: 1px;">PRÓXIMOS PASOS:</p>
                        <ul style="color: #ccc; padding-left: 20px; line-height: 2;">
                            <li>Revisión de zona de operación.</li>
                            <li>Envío de lista de precios mayoristas.</li>
                            <li>Validación de punto de venta.</li>
                        </ul>
                    </div>

                    <p style="color: #666; font-size: 13px;">Un ejecutivo comercial se pondrá en contacto con usted a la brevedad.</p>
                    <br>
                    <div style="border-top: 1px solid #222; padding-top: 20px;">
                        <p style="color: #facc15; font-weight: bold; margin: 0;">Savage Group SpA</p>
                        <p style="color: #444; font-size: 11px; margin: 5px 0;">Innovation in Mass Consumption | Chile</p>
                    </div>
                </div>
            `
        });
        console.log(`💼 Correo B2B enviado con estilo a: ${empresa}`);
    } catch (error) {
        console.error('❌ Error API Brevo B2B:', error.message);
    }
};
