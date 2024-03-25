import NavigationBar from "./navigation";

function Container({ children }) {
    return (
        <>
            <NavigationBar>
                <a>brothers</a>
                <a>rush</a>
                <a>summer housing</a>
                <a>contact</a>
            </NavigationBar>
            {children}
        </>
    )
}

export default Container;