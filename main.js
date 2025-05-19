const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Test Electron App",
        width: isDev ? 1000 : 500,
        height: 600,
    });

    // можно открывать DevTools при запуске
    // npx electronmon . <-- команда для запуска с режимом трансляции изменений
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

const menu = [
    {
        label: "Файл",
        submenu: [
            {
                label: "Выйти",
                click: () => app.quit(),
                accelerator: "Ctrl+W",
            },
        ],
    },
];

app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});
