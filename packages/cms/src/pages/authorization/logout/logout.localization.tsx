import LocalizedStrings from "react-localization"
import { store } from "../../../util/store"

const localization = new LocalizedStrings({
    en: {
        logout: "Logoout"
    },
    sr: {
        logout: "Odjavi se"
    }
})

const state = store.getState()
localization.setLanguage(state.localization.language)

export default localization