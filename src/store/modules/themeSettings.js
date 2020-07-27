export default {
    state: {
        settings: {
            primary: '#009688', //#4188F7 009688
            secondary: '#E9E9E9',
            sideIcon: "#009688",
            sideIconActive: "#fff",
            systemIcons: "#919191",
            labels: '#777',
            danger: '#EF3030',
            light: '#FAFAFA'
        }
    },
    getters: {
        settings: state => state.settings
    }
}