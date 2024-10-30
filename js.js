// Inicializa EmailJS con tu clave pública
// REEMPLAZA 'TU_PUBLIC_KEY' con tu clave pública real de EmailJS
(function(){
    emailjs.init("wzIa35bDBaaIW_IdU");
})();

document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribe-form');
    
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (!isValidEmail(email)) {
            showMessage('Por favor, introduce un email válido.', 'error');
            return;
        }

        // Mostrar indicador de carga
        const submitButton = this.querySelector('button');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Enviar email usando EmailJS
        // REEMPLAZA 'TU_SERVICE_ID', 'TU_TEMPLATE_ID' con tus IDs reales de EmailJS
        emailjs.send("service_zh011sg", "template_5xjob25", {
            to_email: email,
            reply_to: "tu@email.com",
        })
        .then(function() {
            showMessage('¡Gracias por suscribirte! Por favor, verifica tu correo.', 'success');
            subscribeForm.reset();
        })
        .catch(function(error) {
            console.error('Error:', error);
            showMessage('Hubo un error al procesar tu suscripción. Por favor, intenta de nuevo.', 'error');
        })
        .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = 'Suscribirse';
        });
    });
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;

    const form = document.getElementById('subscribe-form');
    form.parentNode.insertBefore(messageElement, form.nextSibling);

    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}