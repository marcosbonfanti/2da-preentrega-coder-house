export interface newCartI {
    _id?: string;
  }
  
  export interface cartI {
    _id: string;
    nombre: string;
    precio: number;
  }
  
  export interface cartQuery {
    _id?: number;
  }
  
  export interface cartBaseClass {
    get(id?: string | undefined): Promise<cartI[]>;
    add(data: string): Promise<cartI>;
    delete(id: string): Promise<void>;
    // query(options: cartQuery): Promise<cartI[]>;
  }
  