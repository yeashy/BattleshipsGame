import Header from "./Header"
import Menu from "./Menu"

var SettingsScreen = (props) => {
    return (
        <div>
            <Header screen="Menu" />
            <Menu plate="Settings" />
        </div>
    )
}

export default SettingsScreen;