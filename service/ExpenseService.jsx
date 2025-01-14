import * as SQLite from 'expo-sqlite';

// Función para abrir la base de datos y crear la tabla
const deleteTAble = async () => {
  const db = await SQLite.openDatabaseAsync('expensesdb'); // Abrir base de datos
  // Crear la tabla si no existe
  await db.execAsync(`DROP TABLE expenses;`);
  return db;
}

const openDatabase = async () => {
  const db = await SQLite.openDatabaseAsync('expensesdb'); // Abrir base de datos

  // Crear la tabla si no existe
  await db.runAsync(`
    CREATE TABLE IF NOT EXISTS expenses (
      idExpense INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      date TEXT,
      category TEXT,
      price NUMERIC ,
      picture BLOB
    );`
  );
  return db;
}

// Crear la base de datos e insertar datos
export const insertExpense = async (item) => {
  try {
    console.log(item.title, item.description, item.date, item.category, item.price);
    const { title ="", description="", date="", category="", price=0, picture="" } = item;
    const db = await openDatabase();  
    const statement = await db.prepareAsync(`
      INSERT INTO expenses (title, description, date, category, price, picture)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Ejecutar la consulta pasando los valores como arreglo
    const result = await statement.executeAsync([
      title,
      description,
      date,
      category,
      price,
      picture
    ]);
    return result;
  } catch (e) {
    console.log("error ", e);
    return 0;
  }

}

export const getExpensese = async () =>{
  const db = await openDatabase();
  const result = await db.getAllAsync("SELECT * FROM expenses");
  return result;
}
