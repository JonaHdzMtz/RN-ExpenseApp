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
  console.log("insert")
  try {
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

export const getItemExpense = async (id) => {
  const db = await openDatabase();
  const result = await db.getFirstAsync("SELECT  * FROM expenses WHERE idExpense  = ?",[id])
  // console.log("result", result);
  return result;
}

export const getExpensese = async () =>{
  const db = await openDatabase();
  const result = await db.getAllAsync("SELECT * FROM expenses");
  return result;
}

export const updateItemExpense = async (item) => {
  const { idExpense="", title="", description="",  category="", price="", picture="" } = item;
  const db = await openDatabase();
  const statement = await db.prepareAsync(`
    UPDATE expenses SET title = ?, description = ?, category = ?, price = ?, picture = ? WHERE idExpense = ?
  `);
  const result = await statement.executeAsync([title, description, category, price, picture, idExpense]);
  return result;
}

export const deleteItemExpense = async (id) => {
  const db = await openDatabase();
  const result = await db.runAsync("DELETE FROM expenses WHERE idExpense = ?", [id]);
  return result;
}