export default function Layout({ children }) {
  return (
      <div>
          <header>
              <h1>Notification App</h1>
          </header>
          <main>{children}</main>
          <footer>Footer content</footer>
      </div>
  );
}
