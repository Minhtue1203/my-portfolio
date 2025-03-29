async function translateTextLibre(text, targetLang) {
    if (targetLang === "fr") return text; // Si FR, on retourne directement le texte original

    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: text,
                source: "fr",
                target: targetLang,
                format: "text"
            })
        });

        if (!response.ok) throw new Error("Erreur lors de la traduction");
        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error("API indisponible :", error);
        return text; // Retourne le texte original en cas d'échec
    }
}

async function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-translate]");

    for (let el of elements) {
        const originalText = el.getAttribute("data-original") || el.textContent;
        el.setAttribute("data-original", originalText); // Sauvegarde du texte original

        if (lang === "fr") {
            el.textContent = originalText; // Restaurer le texte original
        } else {
            el.textContent = await translateTextLibre(originalText, lang);
        }
    }

    localStorage.setItem("lang", lang); // Sauvegarde de la langue choisie
}

// Charger la langue enregistrée au démarrage
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "fr";
    changeLanguage(savedLang);
});
