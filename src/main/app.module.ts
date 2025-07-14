import { Database } from "./../../node_modules/sqlite3/lib/sqlite3.d";
import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ElectronModule } from "@doubleshot/nest-electron";
import { BrowserWindow, app } from "electron";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UserModule } from "./common/user/user.module";

console.log("-----------------", __dirname);
@Module({
  imports: [
    // electron
    ElectronModule.registerAsync({
      useFactory: async () => {
        const isDev = !app.isPackaged;
        const win = new BrowserWindow({
          width: 1024,
          height: 768,
          autoHideMenuBar: true,
          webPreferences: {
            contextIsolation: true,
            preload: join(__dirname, "../preload/index.js"),
          },
        });
        win.on("closed", () => {
          win.destroy();
        });
        const URL = isDev
          ? process.env.DS_RENDERER_URL
          : `file://${join(app.getAppPath(), "dist/render/index.html")}`;

        win.loadURL(URL);
        return { win };
      },
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "test.db",
      // entities: [],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,

      // type: 'mysql',
      // host: '192.168.7.4',
      // port: 3306,
      // username: 'root',
      // password: '123456',
      // database: 'mytest',
      // autoLoadEntities: true,
      // // entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      // synchronize: true,
      // logging:true
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
