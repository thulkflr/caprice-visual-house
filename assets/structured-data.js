import { contact, site } from "./config.js";

const data = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: site.name,
  email: contact.email,
  telephone: contact.whatsapp,
  areaServed: { "@type": "Country", name: site.origin },
  sameAs: [contact.instagramUrl],
};

if (site.productionOrigin) data.url = site.productionOrigin;
const script = document.createElement("script");
script.type = "application/ld+json";
script.textContent = JSON.stringify(data);
document.head.append(script);
