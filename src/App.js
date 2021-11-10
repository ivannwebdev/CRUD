import styles from './app.css'
import UsersTable from './components/UsersTable/UsersTableContainer';


const App = () => {
  return (
    <div className={styles.app}>
        <UsersTable />
    </div>
  );
}

export default App;
