const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


import { HomePage } from './pages/HomePage.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'


export class App extends React.Component {

    render() {
        return (
            <Router>
                <section className="main-layout app">
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ContactIndex />} path="/contact" />

                        </Routes>
                    </main>
                </section>
            </Router>
        )
    }
}


