/* ============================================
   CONFIGURACIÓN DE SERVICIOS
   ============================================= */

const SUPABASE_CONFIG = {
    // URL del proyecto Supabase
    SUPABASE_URL: 'https://rwaapplgacexiqhpvjko.supabase.co',

    // Clave pública (Publishable key)
    SUPABASE_KEY: 'sb_publishable_enXMmMOjWJV0K0CcMBT0Gg_OpECZGx4'
};

/* ============================================
   CONFIGURACIÓN DE N8N (para notificaciones)
   ============================================
   INSTRUCCIONES:
   1. Crea un workflow en n8n con un nodo "Webhook"
   2. Copia la URL del webhook y pégala aquí
   3. El webhook recibirá: { name, email, message, timestamp }
   ============================================= */

const N8N_CONFIG = {
    // URL del webhook de n8n
    WEBHOOK_URL: 'https://angel050521.app.n8n.cloud/webhook/df370471-eebe-4503-8aa7-e5600dd937b1',

    // Activa/desactiva las notificaciones
    ENABLED: true  // ✅ Notificaciones activadas
};

// Exportar configuraciones
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.N8N_CONFIG = N8N_CONFIG;
