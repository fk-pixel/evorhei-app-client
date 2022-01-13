import { toast } from "react-toastify";

// Setting notifications
export const notifies = (arg) => {
    if (arg === "add") {
      toast.success("Material erfolgreich hinzugefügt");
    } else if (arg === "error") {
      toast.error("Entschuldigung, 🙄 dass etwas schief gelaufen ist!");
    } else if (arg === "delete") {
      toast.success("Material erfolgreich gelöscht");
    } else if (arg === "update") {
      toast.info("Material erfolgreich aktualisiert");
    } else if (arg === "register") {
        toast.success("Benutzer erfolgreich registriert 👏");
    } else if (arg === "login") {
        toast.success("Herrzlich Wilkommen! 🥳 Sie können beginnen, indem Sie ein Material hinzufügen. ");
    } else if (arg === "logout") {
        toast.success("Benutzer-Logout erfolgreich. Wir werden dich vermissen 😢");
    } else if (arg === "not-found") {
        toast.error("Benutzer wurde nicht gefunden");
    } else if (arg === "token-invalid") {
        toast.warning("Token ist ungültig. Bitte erneut anmelden");
    } else if (arg === "must-register") {
        toast.error("E-Mail oder Passwort stimmen nicht überein. Bitte vorher anmelden!");
    } else if (arg === "no-product") {
        toast.error("Produkt nicht gefunden");
    }
};