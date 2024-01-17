import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
return new Promise((resolve, reject) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "create table if not exists menuitems (id integer primary key not null, name text, description text, price decimal, image varchar(255), category varchar(50))"
            )
        },
        reject,
        resolve('successfully created')
    )
})
}

export async function getMenuItems() {
return new Promise((resolve) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "select * from menuitems",
                [],
                (_, { rows }) => {
                    resolve(rows._array)
                }
            )
        },
    )
})
}

export async function saveMenuItems(menuItems) {
db.transaction(
    (tx) => {
        menuItems.forEach((item, index) => {
            const query = 
            "INSERT INTO menuitems (id, name, description, price, image, category) VALUES (?, ?, ?, ?, ?, ?)";
            const imageFile = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item?.image}?raw=true`
            let itemVariables = [index, item?.name, item?.description, item?.price, imageFile, item?.category];
            tx.executeSql(
                query,
                itemVariables,
                (_, { rows }) => {
                    // console.log('result:', rows._array);
                },
                (err) => {
                console.log("Status : Saving to Storage has failed");
                }
            )
        })
    }
)
}