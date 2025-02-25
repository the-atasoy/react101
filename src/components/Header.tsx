export default function Header() {
  return (
    <header style={styles.header}>
      <h1>Platform Commands</h1>
      <nav style={styles.nav}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/platforms" style={styles.link}>Platforms</a>
        <a href="/about" style={styles.link}>About</a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#282c34',
    padding: '1rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nav: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
};