const config = {
    gateWayURL: "http://localhost:8000",
    authUrl: {
        baseURL: "/api/contact/auth",
        login: "/login",
        register: "/register/user"
    },
    contacts: {
        baseURL: "/api/contact/contacts",
    }
}

export default config;