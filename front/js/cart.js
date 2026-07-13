// Sauvegarder les commandes

// Contrôles de caractères spéciaux
const regex = /^[a-zA-Z0-9àâäéèêëïîôùûüÿæœçÀÂÄÉÈÊËÏÎÔÙÛÜŸÆŒÇ\s_-]+$/;
const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Verication
    if (!regex.test(firstName) || !regex.test(lastName) || !regex.test(adress) || !regex.test(city)) {
        message.textContent = "Veuillez retirer les caractères spéciaux."
        return
    }
    if (!regexMail.test(mail)) {
        const message = document.querySelector("#message")
        message.textContent = "Veuillez renseigné un mail valide."
        return
    }