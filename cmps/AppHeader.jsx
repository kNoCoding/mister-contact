const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <div className="header-container">
        <h1>Contacts App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contacts</NavLink>
        </nav>
      </div>
    </header>
  )
}
