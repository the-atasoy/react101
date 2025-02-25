export default function Home() {
  return (
    <div style={styles.container}>
      <h2>Welcome to React101</h2>
      <p>This is your first React application!</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center' as const
  }
};