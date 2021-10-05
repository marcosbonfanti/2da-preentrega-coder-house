export interface newCartI {
    nombre?: string;
    precio?: number;
    productId?: string 
  }
  
  export interface cartI {
    _id: string;
    nombre: string;
    precio: number;
    productId: string
  }
  
  export interface cartQuery {
    _id?: number;
  }
  
  export interface cartBaseClass {
    get(id?: string | undefined): Promise<cartI[]>;
    add(data: newCartI): Promise<cartI>;
    delete(id: string): Promise<void>;
    // query(options: cartQuery): Promise<cartI[]>;
  }
  