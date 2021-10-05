import { CartMemDAO } from './DAOs/memory';
import { CartMongoDAO } from './DAOs/mongo';
// import { ProductosFSDAO } from './DAOs/fs';
// import { ProductosAtlasDAO } from './DAOs/mongo';

import path from 'path';
// import { CartMongoDAO } from './DAOs/mongo';
export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}

export class CartFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      // case TipoPersistencia.FileSystem:
      //   console.log('RETORNANDO INSTANCIA CLASE FS');
      //   const filePath = path.resolve(__dirname, './DAOs/products.json');
      //   console.log(filePath);
      //   return new CartMemDAO();

      case TipoPersistencia.MongoAtlas:
        console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
        return new CartMongoDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new CartMongoDAO(true);

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new CartMemDAO();
    }
  }
}
