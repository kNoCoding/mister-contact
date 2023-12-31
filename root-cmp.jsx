const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


import { HomePage } from './pages/HomePage.jsx'
import { ContactDetails } from './cmps/ContactDetails.jsx'
import { ContactIndex } from './pages/ContactIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'



export class App extends React.Component {

    render() {
        return (
            <Router>
                <section className="main-layout app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<ContactDetails />} path="/" />
                            <Route element={<ContactIndex />} path="/contact" />

                        </Routes>
                    </main>
                </section>
            </Router>
        )
    }
}


