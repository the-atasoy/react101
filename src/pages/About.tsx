export default function About() {
  return (
    <div style={styles.container}>
      <h2>About React101</h2>
      <p>This is a learning project to understand React fundamentals.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center' as const
  }
};