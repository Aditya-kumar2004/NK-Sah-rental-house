/**
 * Global Site Configuration
 * Centralized coordinates, maps links, contact details, and address.
 */
export const siteConfig = {
    name: "NK Sah Rental House",
    nameHindi: "नंद किशोर रेंटल हाउस",
    phone: "+919771233530",
    phoneDisplay: "+91 9771233530",
    email: "contact@nksahrental.com",
    whatsapp: {
        number: "919771233530",
        chatUrl: "https://wa.me/919771233530?text=Hi%2C%20I%20want%20to%20inquire%20about%20room%20availability%20at%20NK%20Sah%20Rental%20House.",
        alternateNumber: "917050308555",
        alternateChatUrl: "https://wa.me/917050308555?text=Hi%2C%20I%20want%20to%20inquire%20about%20room%20availability%20at%20NK%20Sah%20Rental%20House.",
    },
    address: {
        short: "Chotkipatti, Bargaw, Bihar",
        shortHindi: "छोटकीपट्टी, बरगांव, बिहार",
        full: "Near City Montessori School, Chotkipatti, Bargaw, Bihar – 845401",
        fullHindi: "सिटी मोंटेसरी स्कूल के पास, छोटकीपट्टी, बरगांव, बिहार – 845401",
        landmark: "Near City Montessori School",
        village: "Chotkipatti",
        post: "Bargaw",
        state: "Bihar",
        country: "IN",
        postalCode: "845401",
    },
    geo: {
        latitude: 27.096498,
        longitude: 84.154552,
    },
    maps: {
        query: "27.096498,84.154552",
        // Embedded iframe src (exact coordinates, zoom 17)
        embedUrl: "https://www.google.com/maps?q=27.096498,84.154552&z=17&output=embed",
        // 'Open in Google Maps' button link
        searchUrl: "https://www.google.com/maps/search/?api=1&query=27.096498,84.154552",
        // 'Get Directions' buttons link
        directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=27.096498,84.154552",
        // Original short link
        shortLink: "https://maps.app.goo.gl/YPcVErPF2psDCcN89",
    },
    developer: {
        name: "Artifex Web",
        url: "https://www.artifexweb.in/",
    },
};

