
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Brand
 * 
 */
export type Brand = $Result.DefaultSelection<Prisma.$BrandPayload>
/**
 * Model BrandTranslation
 * 
 */
export type BrandTranslation = $Result.DefaultSelection<Prisma.$BrandTranslationPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model CategoryTranslation
 * 
 */
export type CategoryTranslation = $Result.DefaultSelection<Prisma.$CategoryTranslationPayload>
/**
 * Model Subcategory
 * 
 */
export type Subcategory = $Result.DefaultSelection<Prisma.$SubcategoryPayload>
/**
 * Model SubcategoryTranslation
 * 
 */
export type SubcategoryTranslation = $Result.DefaultSelection<Prisma.$SubcategoryTranslationPayload>
/**
 * Model SubcategoryBrand
 * 
 */
export type SubcategoryBrand = $Result.DefaultSelection<Prisma.$SubcategoryBrandPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductTranslation
 * 
 */
export type ProductTranslation = $Result.DefaultSelection<Prisma.$ProductTranslationPayload>
/**
 * Model ProductSpecification
 * 
 */
export type ProductSpecification = $Result.DefaultSelection<Prisma.$ProductSpecificationPayload>
/**
 * Model ProductImage
 * 
 */
export type ProductImage = $Result.DefaultSelection<Prisma.$ProductImagePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Section: {
  NEVA: 'NEVA',
  X_SOLUTION: 'X_SOLUTION'
};

export type Section = (typeof Section)[keyof typeof Section]


export const Locale: {
  ru: 'ru',
  en: 'en',
  uz: 'uz',
  kr: 'kr'
};

export type Locale = (typeof Locale)[keyof typeof Locale]

}

export type Section = $Enums.Section

export const Section: typeof $Enums.Section

export type Locale = $Enums.Locale

export const Locale: typeof $Enums.Locale

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Brands
 * const brands = await prisma.brand.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Brands
   * const brands = await prisma.brand.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.BrandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brandTranslation`: Exposes CRUD operations for the **BrandTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BrandTranslations
    * const brandTranslations = await prisma.brandTranslation.findMany()
    * ```
    */
  get brandTranslation(): Prisma.BrandTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoryTranslation`: Exposes CRUD operations for the **CategoryTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoryTranslations
    * const categoryTranslations = await prisma.categoryTranslation.findMany()
    * ```
    */
  get categoryTranslation(): Prisma.CategoryTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subcategory`: Exposes CRUD operations for the **Subcategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subcategories
    * const subcategories = await prisma.subcategory.findMany()
    * ```
    */
  get subcategory(): Prisma.SubcategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subcategoryTranslation`: Exposes CRUD operations for the **SubcategoryTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubcategoryTranslations
    * const subcategoryTranslations = await prisma.subcategoryTranslation.findMany()
    * ```
    */
  get subcategoryTranslation(): Prisma.SubcategoryTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subcategoryBrand`: Exposes CRUD operations for the **SubcategoryBrand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubcategoryBrands
    * const subcategoryBrands = await prisma.subcategoryBrand.findMany()
    * ```
    */
  get subcategoryBrand(): Prisma.SubcategoryBrandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productTranslation`: Exposes CRUD operations for the **ProductTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductTranslations
    * const productTranslations = await prisma.productTranslation.findMany()
    * ```
    */
  get productTranslation(): Prisma.ProductTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productSpecification`: Exposes CRUD operations for the **ProductSpecification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductSpecifications
    * const productSpecifications = await prisma.productSpecification.findMany()
    * ```
    */
  get productSpecification(): Prisma.ProductSpecificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productImage`: Exposes CRUD operations for the **ProductImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductImages
    * const productImages = await prisma.productImage.findMany()
    * ```
    */
  get productImage(): Prisma.ProductImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Brand: 'Brand',
    BrandTranslation: 'BrandTranslation',
    Category: 'Category',
    CategoryTranslation: 'CategoryTranslation',
    Subcategory: 'Subcategory',
    SubcategoryTranslation: 'SubcategoryTranslation',
    SubcategoryBrand: 'SubcategoryBrand',
    Product: 'Product',
    ProductTranslation: 'ProductTranslation',
    ProductSpecification: 'ProductSpecification',
    ProductImage: 'ProductImage',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "brand" | "brandTranslation" | "category" | "categoryTranslation" | "subcategory" | "subcategoryTranslation" | "subcategoryBrand" | "product" | "productTranslation" | "productSpecification" | "productImage" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Brand: {
        payload: Prisma.$BrandPayload<ExtArgs>
        fields: Prisma.BrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findFirst: {
            args: Prisma.BrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findMany: {
            args: Prisma.BrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          create: {
            args: Prisma.BrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          createMany: {
            args: Prisma.BrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BrandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          delete: {
            args: Prisma.BrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          update: {
            args: Prisma.BrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          deleteMany: {
            args: Prisma.BrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BrandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          upsert: {
            args: Prisma.BrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          aggregate: {
            args: Prisma.BrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrand>
          }
          groupBy: {
            args: Prisma.BrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrandCountArgs<ExtArgs>
            result: $Utils.Optional<BrandCountAggregateOutputType> | number
          }
        }
      }
      BrandTranslation: {
        payload: Prisma.$BrandTranslationPayload<ExtArgs>
        fields: Prisma.BrandTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrandTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrandTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>
          }
          findFirst: {
            args: Prisma.BrandTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrandTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>
          }
          findMany: {
            args: Prisma.BrandTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>[]
          }
          create: {
            args: Prisma.BrandTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>
          }
          createMany: {
            args: Prisma.BrandTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BrandTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>[]
          }
          delete: {
            args: Prisma.BrandTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>
          }
          update: {
            args: Prisma.BrandTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>
          }
          deleteMany: {
            args: Prisma.BrandTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrandTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BrandTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>[]
          }
          upsert: {
            args: Prisma.BrandTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandTranslationPayload>
          }
          aggregate: {
            args: Prisma.BrandTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrandTranslation>
          }
          groupBy: {
            args: Prisma.BrandTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrandTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrandTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<BrandTranslationCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      CategoryTranslation: {
        payload: Prisma.$CategoryTranslationPayload<ExtArgs>
        fields: Prisma.CategoryTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          findFirst: {
            args: Prisma.CategoryTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          findMany: {
            args: Prisma.CategoryTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>[]
          }
          create: {
            args: Prisma.CategoryTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          createMany: {
            args: Prisma.CategoryTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>[]
          }
          delete: {
            args: Prisma.CategoryTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          update: {
            args: Prisma.CategoryTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          deleteMany: {
            args: Prisma.CategoryTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>[]
          }
          upsert: {
            args: Prisma.CategoryTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryTranslationPayload>
          }
          aggregate: {
            args: Prisma.CategoryTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoryTranslation>
          }
          groupBy: {
            args: Prisma.CategoryTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryTranslationCountAggregateOutputType> | number
          }
        }
      }
      Subcategory: {
        payload: Prisma.$SubcategoryPayload<ExtArgs>
        fields: Prisma.SubcategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubcategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubcategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          findFirst: {
            args: Prisma.SubcategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubcategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          findMany: {
            args: Prisma.SubcategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>[]
          }
          create: {
            args: Prisma.SubcategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          createMany: {
            args: Prisma.SubcategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubcategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>[]
          }
          delete: {
            args: Prisma.SubcategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          update: {
            args: Prisma.SubcategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          deleteMany: {
            args: Prisma.SubcategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubcategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubcategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>[]
          }
          upsert: {
            args: Prisma.SubcategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryPayload>
          }
          aggregate: {
            args: Prisma.SubcategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubcategory>
          }
          groupBy: {
            args: Prisma.SubcategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubcategoryCountArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryCountAggregateOutputType> | number
          }
        }
      }
      SubcategoryTranslation: {
        payload: Prisma.$SubcategoryTranslationPayload<ExtArgs>
        fields: Prisma.SubcategoryTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubcategoryTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubcategoryTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>
          }
          findFirst: {
            args: Prisma.SubcategoryTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubcategoryTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>
          }
          findMany: {
            args: Prisma.SubcategoryTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>[]
          }
          create: {
            args: Prisma.SubcategoryTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>
          }
          createMany: {
            args: Prisma.SubcategoryTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubcategoryTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>[]
          }
          delete: {
            args: Prisma.SubcategoryTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>
          }
          update: {
            args: Prisma.SubcategoryTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>
          }
          deleteMany: {
            args: Prisma.SubcategoryTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubcategoryTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubcategoryTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>[]
          }
          upsert: {
            args: Prisma.SubcategoryTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryTranslationPayload>
          }
          aggregate: {
            args: Prisma.SubcategoryTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubcategoryTranslation>
          }
          groupBy: {
            args: Prisma.SubcategoryTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubcategoryTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryTranslationCountAggregateOutputType> | number
          }
        }
      }
      SubcategoryBrand: {
        payload: Prisma.$SubcategoryBrandPayload<ExtArgs>
        fields: Prisma.SubcategoryBrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubcategoryBrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubcategoryBrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>
          }
          findFirst: {
            args: Prisma.SubcategoryBrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubcategoryBrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>
          }
          findMany: {
            args: Prisma.SubcategoryBrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>[]
          }
          create: {
            args: Prisma.SubcategoryBrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>
          }
          createMany: {
            args: Prisma.SubcategoryBrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubcategoryBrandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>[]
          }
          delete: {
            args: Prisma.SubcategoryBrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>
          }
          update: {
            args: Prisma.SubcategoryBrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>
          }
          deleteMany: {
            args: Prisma.SubcategoryBrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubcategoryBrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubcategoryBrandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>[]
          }
          upsert: {
            args: Prisma.SubcategoryBrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubcategoryBrandPayload>
          }
          aggregate: {
            args: Prisma.SubcategoryBrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubcategoryBrand>
          }
          groupBy: {
            args: Prisma.SubcategoryBrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryBrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubcategoryBrandCountArgs<ExtArgs>
            result: $Utils.Optional<SubcategoryBrandCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductTranslation: {
        payload: Prisma.$ProductTranslationPayload<ExtArgs>
        fields: Prisma.ProductTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>
          }
          findFirst: {
            args: Prisma.ProductTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>
          }
          findMany: {
            args: Prisma.ProductTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>[]
          }
          create: {
            args: Prisma.ProductTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>
          }
          createMany: {
            args: Prisma.ProductTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>[]
          }
          delete: {
            args: Prisma.ProductTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>
          }
          update: {
            args: Prisma.ProductTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>
          }
          deleteMany: {
            args: Prisma.ProductTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>[]
          }
          upsert: {
            args: Prisma.ProductTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductTranslationPayload>
          }
          aggregate: {
            args: Prisma.ProductTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductTranslation>
          }
          groupBy: {
            args: Prisma.ProductTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<ProductTranslationCountAggregateOutputType> | number
          }
        }
      }
      ProductSpecification: {
        payload: Prisma.$ProductSpecificationPayload<ExtArgs>
        fields: Prisma.ProductSpecificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductSpecificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductSpecificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>
          }
          findFirst: {
            args: Prisma.ProductSpecificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductSpecificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>
          }
          findMany: {
            args: Prisma.ProductSpecificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>[]
          }
          create: {
            args: Prisma.ProductSpecificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>
          }
          createMany: {
            args: Prisma.ProductSpecificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductSpecificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>[]
          }
          delete: {
            args: Prisma.ProductSpecificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>
          }
          update: {
            args: Prisma.ProductSpecificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>
          }
          deleteMany: {
            args: Prisma.ProductSpecificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductSpecificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductSpecificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>[]
          }
          upsert: {
            args: Prisma.ProductSpecificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductSpecificationPayload>
          }
          aggregate: {
            args: Prisma.ProductSpecificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductSpecification>
          }
          groupBy: {
            args: Prisma.ProductSpecificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductSpecificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductSpecificationCountArgs<ExtArgs>
            result: $Utils.Optional<ProductSpecificationCountAggregateOutputType> | number
          }
        }
      }
      ProductImage: {
        payload: Prisma.$ProductImagePayload<ExtArgs>
        fields: Prisma.ProductImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findFirst: {
            args: Prisma.ProductImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          findMany: {
            args: Prisma.ProductImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          create: {
            args: Prisma.ProductImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          createMany: {
            args: Prisma.ProductImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          delete: {
            args: Prisma.ProductImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          update: {
            args: Prisma.ProductImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          deleteMany: {
            args: Prisma.ProductImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>[]
          }
          upsert: {
            args: Prisma.ProductImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductImagePayload>
          }
          aggregate: {
            args: Prisma.ProductImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductImage>
          }
          groupBy: {
            args: Prisma.ProductImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductImageCountArgs<ExtArgs>
            result: $Utils.Optional<ProductImageCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    brand?: BrandOmit
    brandTranslation?: BrandTranslationOmit
    category?: CategoryOmit
    categoryTranslation?: CategoryTranslationOmit
    subcategory?: SubcategoryOmit
    subcategoryTranslation?: SubcategoryTranslationOmit
    subcategoryBrand?: SubcategoryBrandOmit
    product?: ProductOmit
    productTranslation?: ProductTranslationOmit
    productSpecification?: ProductSpecificationOmit
    productImage?: ProductImageOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BrandCountOutputType
   */

  export type BrandCountOutputType = {
    translations: number
    products: number
    subcategoryBrands: number
  }

  export type BrandCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | BrandCountOutputTypeCountTranslationsArgs
    products?: boolean | BrandCountOutputTypeCountProductsArgs
    subcategoryBrands?: boolean | BrandCountOutputTypeCountSubcategoryBrandsArgs
  }

  // Custom InputTypes
  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandCountOutputType
     */
    select?: BrandCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandTranslationWhereInput
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountSubcategoryBrandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryBrandWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    translations: number
    subcategories: number
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | CategoryCountOutputTypeCountTranslationsArgs
    subcategories?: boolean | CategoryCountOutputTypeCountSubcategoriesArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryTranslationWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountSubcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type SubcategoryCountOutputType
   */

  export type SubcategoryCountOutputType = {
    translations: number
    products: number
    subcategoryBrands: number
  }

  export type SubcategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | SubcategoryCountOutputTypeCountTranslationsArgs
    products?: boolean | SubcategoryCountOutputTypeCountProductsArgs
    subcategoryBrands?: boolean | SubcategoryCountOutputTypeCountSubcategoryBrandsArgs
  }

  // Custom InputTypes
  /**
   * SubcategoryCountOutputType without action
   */
  export type SubcategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryCountOutputType
     */
    select?: SubcategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubcategoryCountOutputType without action
   */
  export type SubcategoryCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryTranslationWhereInput
  }

  /**
   * SubcategoryCountOutputType without action
   */
  export type SubcategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * SubcategoryCountOutputType without action
   */
  export type SubcategoryCountOutputTypeCountSubcategoryBrandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryBrandWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    translations: number
    specifications: number
    images: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | ProductCountOutputTypeCountTranslationsArgs
    specifications?: boolean | ProductCountOutputTypeCountSpecificationsArgs
    images?: boolean | ProductCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductTranslationWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSpecificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSpecificationWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Brand
   */

  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandAvgAggregateOutputType = {
    id: number | null
  }

  export type BrandSumAggregateOutputType = {
    id: number | null
  }

  export type BrandMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BrandAvgAggregateInputType = {
    id?: true
  }

  export type BrandSumAggregateInputType = {
    id?: true
  }

  export type BrandMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brand to aggregate.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Brands
    **/
    _count?: true | BrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BrandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BrandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandMaxAggregateInputType
  }

  export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
        [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrand[P]>
      : GetScalarType<T[P], AggregateBrand[P]>
  }




  export type BrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandWhereInput
    orderBy?: BrandOrderByWithAggregationInput | BrandOrderByWithAggregationInput[]
    by: BrandScalarFieldEnum[] | BrandScalarFieldEnum
    having?: BrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandCountAggregateInputType | true
    _avg?: BrandAvgAggregateInputType
    _sum?: BrandSumAggregateInputType
    _min?: BrandMinAggregateInputType
    _max?: BrandMaxAggregateInputType
  }

  export type BrandGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  type GetBrandGroupByPayload<T extends BrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandGroupByOutputType[P]>
            : GetScalarType<T[P], BrandGroupByOutputType[P]>
        }
      >
    >


  export type BrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    translations?: boolean | Brand$translationsArgs<ExtArgs>
    products?: boolean | Brand$productsArgs<ExtArgs>
    subcategoryBrands?: boolean | Brand$subcategoryBrandsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>

  export type BrandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["brand"]>

  export type BrandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["brand"]>

  export type BrandSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BrandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["brand"]>
  export type BrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | Brand$translationsArgs<ExtArgs>
    products?: boolean | Brand$productsArgs<ExtArgs>
    subcategoryBrands?: boolean | Brand$subcategoryBrandsArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BrandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BrandIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Brand"
    objects: {
      translations: Prisma.$BrandTranslationPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      subcategoryBrands: Prisma.$SubcategoryBrandPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["brand"]>
    composites: {}
  }

  type BrandGetPayload<S extends boolean | null | undefined | BrandDefaultArgs> = $Result.GetResult<Prisma.$BrandPayload, S>

  type BrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BrandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BrandCountAggregateInputType | true
    }

  export interface BrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Brand'], meta: { name: 'Brand' } }
    /**
     * Find zero or one Brand that matches the filter.
     * @param {BrandFindUniqueArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrandFindUniqueArgs>(args: SelectSubset<T, BrandFindUniqueArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Brand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BrandFindUniqueOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrandFindUniqueOrThrowArgs>(args: SelectSubset<T, BrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrandFindFirstArgs>(args?: SelectSubset<T, BrandFindFirstArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrandFindFirstOrThrowArgs>(args?: SelectSubset<T, BrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brand.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrandFindManyArgs>(args?: SelectSubset<T, BrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Brand.
     * @param {BrandCreateArgs} args - Arguments to create a Brand.
     * @example
     * // Create one Brand
     * const Brand = await prisma.brand.create({
     *   data: {
     *     // ... data to create a Brand
     *   }
     * })
     * 
     */
    create<T extends BrandCreateArgs>(args: SelectSubset<T, BrandCreateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Brands.
     * @param {BrandCreateManyArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrandCreateManyArgs>(args?: SelectSubset<T, BrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Brands and returns the data saved in the database.
     * @param {BrandCreateManyAndReturnArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Brands and only return the `id`
     * const brandWithIdOnly = await prisma.brand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BrandCreateManyAndReturnArgs>(args?: SelectSubset<T, BrandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Brand.
     * @param {BrandDeleteArgs} args - Arguments to delete one Brand.
     * @example
     * // Delete one Brand
     * const Brand = await prisma.brand.delete({
     *   where: {
     *     // ... filter to delete one Brand
     *   }
     * })
     * 
     */
    delete<T extends BrandDeleteArgs>(args: SelectSubset<T, BrandDeleteArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Brand.
     * @param {BrandUpdateArgs} args - Arguments to update one Brand.
     * @example
     * // Update one Brand
     * const brand = await prisma.brand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrandUpdateArgs>(args: SelectSubset<T, BrandUpdateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Brands.
     * @param {BrandDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrandDeleteManyArgs>(args?: SelectSubset<T, BrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrandUpdateManyArgs>(args: SelectSubset<T, BrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands and returns the data updated in the database.
     * @param {BrandUpdateManyAndReturnArgs} args - Arguments to update many Brands.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Brands and only return the `id`
     * const brandWithIdOnly = await prisma.brand.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BrandUpdateManyAndReturnArgs>(args: SelectSubset<T, BrandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Brand.
     * @param {BrandUpsertArgs} args - Arguments to update or create a Brand.
     * @example
     * // Update or create a Brand
     * const brand = await prisma.brand.upsert({
     *   create: {
     *     // ... data to create a Brand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brand we want to update
     *   }
     * })
     */
    upsert<T extends BrandUpsertArgs>(args: SelectSubset<T, BrandUpsertArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brand.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends BrandCountArgs>(
      args?: Subset<T, BrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BrandAggregateArgs>(args: Subset<T, BrandAggregateArgs>): Prisma.PrismaPromise<GetBrandAggregateType<T>>

    /**
     * Group by Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrandGroupByArgs['orderBy'] }
        : { orderBy?: BrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Brand model
   */
  readonly fields: BrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Brand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends Brand$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Brand$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Brand$productsArgs<ExtArgs> = {}>(args?: Subset<T, Brand$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subcategoryBrands<T extends Brand$subcategoryBrandsArgs<ExtArgs> = {}>(args?: Subset<T, Brand$subcategoryBrandsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Brand model
   */
  interface BrandFieldRefs {
    readonly id: FieldRef<"Brand", 'Int'>
    readonly createdAt: FieldRef<"Brand", 'DateTime'>
    readonly updatedAt: FieldRef<"Brand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Brand findUnique
   */
  export type BrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findUniqueOrThrow
   */
  export type BrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findFirst
   */
  export type BrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findFirstOrThrow
   */
  export type BrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findMany
   */
  export type BrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brands to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand create
   */
  export type BrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to create a Brand.
     */
    data: XOR<BrandCreateInput, BrandUncheckedCreateInput>
  }

  /**
   * Brand createMany
   */
  export type BrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Brands.
     */
    data: BrandCreateManyInput | BrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brand createManyAndReturn
   */
  export type BrandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * The data used to create many Brands.
     */
    data: BrandCreateManyInput | BrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brand update
   */
  export type BrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to update a Brand.
     */
    data: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
    /**
     * Choose, which Brand to update.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand updateMany
   */
  export type BrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Brands.
     */
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     */
    where?: BrandWhereInput
    /**
     * Limit how many Brands to update.
     */
    limit?: number
  }

  /**
   * Brand updateManyAndReturn
   */
  export type BrandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * The data used to update Brands.
     */
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     */
    where?: BrandWhereInput
    /**
     * Limit how many Brands to update.
     */
    limit?: number
  }

  /**
   * Brand upsert
   */
  export type BrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The filter to search for the Brand to update in case it exists.
     */
    where: BrandWhereUniqueInput
    /**
     * In case the Brand found by the `where` argument doesn't exist, create a new Brand with this data.
     */
    create: XOR<BrandCreateInput, BrandUncheckedCreateInput>
    /**
     * In case the Brand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
  }

  /**
   * Brand delete
   */
  export type BrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter which Brand to delete.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand deleteMany
   */
  export type BrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brands to delete
     */
    where?: BrandWhereInput
    /**
     * Limit how many Brands to delete.
     */
    limit?: number
  }

  /**
   * Brand.translations
   */
  export type Brand$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    where?: BrandTranslationWhereInput
    orderBy?: BrandTranslationOrderByWithRelationInput | BrandTranslationOrderByWithRelationInput[]
    cursor?: BrandTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BrandTranslationScalarFieldEnum | BrandTranslationScalarFieldEnum[]
  }

  /**
   * Brand.products
   */
  export type Brand$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Brand.subcategoryBrands
   */
  export type Brand$subcategoryBrandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    where?: SubcategoryBrandWhereInput
    orderBy?: SubcategoryBrandOrderByWithRelationInput | SubcategoryBrandOrderByWithRelationInput[]
    cursor?: SubcategoryBrandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubcategoryBrandScalarFieldEnum | SubcategoryBrandScalarFieldEnum[]
  }

  /**
   * Brand without action
   */
  export type BrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
  }


  /**
   * Model BrandTranslation
   */

  export type AggregateBrandTranslation = {
    _count: BrandTranslationCountAggregateOutputType | null
    _avg: BrandTranslationAvgAggregateOutputType | null
    _sum: BrandTranslationSumAggregateOutputType | null
    _min: BrandTranslationMinAggregateOutputType | null
    _max: BrandTranslationMaxAggregateOutputType | null
  }

  export type BrandTranslationAvgAggregateOutputType = {
    id: number | null
    brandId: number | null
  }

  export type BrandTranslationSumAggregateOutputType = {
    id: number | null
    brandId: number | null
  }

  export type BrandTranslationMinAggregateOutputType = {
    id: number | null
    brandId: number | null
    locale: $Enums.Locale | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandTranslationMaxAggregateOutputType = {
    id: number | null
    brandId: number | null
    locale: $Enums.Locale | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BrandTranslationCountAggregateOutputType = {
    id: number
    brandId: number
    locale: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BrandTranslationAvgAggregateInputType = {
    id?: true
    brandId?: true
  }

  export type BrandTranslationSumAggregateInputType = {
    id?: true
    brandId?: true
  }

  export type BrandTranslationMinAggregateInputType = {
    id?: true
    brandId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandTranslationMaxAggregateInputType = {
    id?: true
    brandId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BrandTranslationCountAggregateInputType = {
    id?: true
    brandId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BrandTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BrandTranslation to aggregate.
     */
    where?: BrandTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrandTranslations to fetch.
     */
    orderBy?: BrandTranslationOrderByWithRelationInput | BrandTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrandTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrandTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrandTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BrandTranslations
    **/
    _count?: true | BrandTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BrandTranslationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BrandTranslationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandTranslationMaxAggregateInputType
  }

  export type GetBrandTranslationAggregateType<T extends BrandTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateBrandTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrandTranslation[P]>
      : GetScalarType<T[P], AggregateBrandTranslation[P]>
  }




  export type BrandTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandTranslationWhereInput
    orderBy?: BrandTranslationOrderByWithAggregationInput | BrandTranslationOrderByWithAggregationInput[]
    by: BrandTranslationScalarFieldEnum[] | BrandTranslationScalarFieldEnum
    having?: BrandTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandTranslationCountAggregateInputType | true
    _avg?: BrandTranslationAvgAggregateInputType
    _sum?: BrandTranslationSumAggregateInputType
    _min?: BrandTranslationMinAggregateInputType
    _max?: BrandTranslationMaxAggregateInputType
  }

  export type BrandTranslationGroupByOutputType = {
    id: number
    brandId: number
    locale: $Enums.Locale
    name: string
    createdAt: Date
    updatedAt: Date
    _count: BrandTranslationCountAggregateOutputType | null
    _avg: BrandTranslationAvgAggregateOutputType | null
    _sum: BrandTranslationSumAggregateOutputType | null
    _min: BrandTranslationMinAggregateOutputType | null
    _max: BrandTranslationMaxAggregateOutputType | null
  }

  type GetBrandTranslationGroupByPayload<T extends BrandTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], BrandTranslationGroupByOutputType[P]>
        }
      >
    >


  export type BrandTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brandId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brandTranslation"]>

  export type BrandTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brandId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brandTranslation"]>

  export type BrandTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    brandId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brandTranslation"]>

  export type BrandTranslationSelectScalar = {
    id?: boolean
    brandId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BrandTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "brandId" | "locale" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["brandTranslation"]>
  export type BrandTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }
  export type BrandTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }
  export type BrandTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }

  export type $BrandTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BrandTranslation"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      brandId: number
      locale: $Enums.Locale
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["brandTranslation"]>
    composites: {}
  }

  type BrandTranslationGetPayload<S extends boolean | null | undefined | BrandTranslationDefaultArgs> = $Result.GetResult<Prisma.$BrandTranslationPayload, S>

  type BrandTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BrandTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BrandTranslationCountAggregateInputType | true
    }

  export interface BrandTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BrandTranslation'], meta: { name: 'BrandTranslation' } }
    /**
     * Find zero or one BrandTranslation that matches the filter.
     * @param {BrandTranslationFindUniqueArgs} args - Arguments to find a BrandTranslation
     * @example
     * // Get one BrandTranslation
     * const brandTranslation = await prisma.brandTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrandTranslationFindUniqueArgs>(args: SelectSubset<T, BrandTranslationFindUniqueArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BrandTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BrandTranslationFindUniqueOrThrowArgs} args - Arguments to find a BrandTranslation
     * @example
     * // Get one BrandTranslation
     * const brandTranslation = await prisma.brandTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrandTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, BrandTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BrandTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandTranslationFindFirstArgs} args - Arguments to find a BrandTranslation
     * @example
     * // Get one BrandTranslation
     * const brandTranslation = await prisma.brandTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrandTranslationFindFirstArgs>(args?: SelectSubset<T, BrandTranslationFindFirstArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BrandTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandTranslationFindFirstOrThrowArgs} args - Arguments to find a BrandTranslation
     * @example
     * // Get one BrandTranslation
     * const brandTranslation = await prisma.brandTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrandTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, BrandTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BrandTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BrandTranslations
     * const brandTranslations = await prisma.brandTranslation.findMany()
     * 
     * // Get first 10 BrandTranslations
     * const brandTranslations = await prisma.brandTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandTranslationWithIdOnly = await prisma.brandTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrandTranslationFindManyArgs>(args?: SelectSubset<T, BrandTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BrandTranslation.
     * @param {BrandTranslationCreateArgs} args - Arguments to create a BrandTranslation.
     * @example
     * // Create one BrandTranslation
     * const BrandTranslation = await prisma.brandTranslation.create({
     *   data: {
     *     // ... data to create a BrandTranslation
     *   }
     * })
     * 
     */
    create<T extends BrandTranslationCreateArgs>(args: SelectSubset<T, BrandTranslationCreateArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BrandTranslations.
     * @param {BrandTranslationCreateManyArgs} args - Arguments to create many BrandTranslations.
     * @example
     * // Create many BrandTranslations
     * const brandTranslation = await prisma.brandTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrandTranslationCreateManyArgs>(args?: SelectSubset<T, BrandTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BrandTranslations and returns the data saved in the database.
     * @param {BrandTranslationCreateManyAndReturnArgs} args - Arguments to create many BrandTranslations.
     * @example
     * // Create many BrandTranslations
     * const brandTranslation = await prisma.brandTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BrandTranslations and only return the `id`
     * const brandTranslationWithIdOnly = await prisma.brandTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BrandTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, BrandTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BrandTranslation.
     * @param {BrandTranslationDeleteArgs} args - Arguments to delete one BrandTranslation.
     * @example
     * // Delete one BrandTranslation
     * const BrandTranslation = await prisma.brandTranslation.delete({
     *   where: {
     *     // ... filter to delete one BrandTranslation
     *   }
     * })
     * 
     */
    delete<T extends BrandTranslationDeleteArgs>(args: SelectSubset<T, BrandTranslationDeleteArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BrandTranslation.
     * @param {BrandTranslationUpdateArgs} args - Arguments to update one BrandTranslation.
     * @example
     * // Update one BrandTranslation
     * const brandTranslation = await prisma.brandTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrandTranslationUpdateArgs>(args: SelectSubset<T, BrandTranslationUpdateArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BrandTranslations.
     * @param {BrandTranslationDeleteManyArgs} args - Arguments to filter BrandTranslations to delete.
     * @example
     * // Delete a few BrandTranslations
     * const { count } = await prisma.brandTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrandTranslationDeleteManyArgs>(args?: SelectSubset<T, BrandTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BrandTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BrandTranslations
     * const brandTranslation = await prisma.brandTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrandTranslationUpdateManyArgs>(args: SelectSubset<T, BrandTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BrandTranslations and returns the data updated in the database.
     * @param {BrandTranslationUpdateManyAndReturnArgs} args - Arguments to update many BrandTranslations.
     * @example
     * // Update many BrandTranslations
     * const brandTranslation = await prisma.brandTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BrandTranslations and only return the `id`
     * const brandTranslationWithIdOnly = await prisma.brandTranslation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BrandTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, BrandTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BrandTranslation.
     * @param {BrandTranslationUpsertArgs} args - Arguments to update or create a BrandTranslation.
     * @example
     * // Update or create a BrandTranslation
     * const brandTranslation = await prisma.brandTranslation.upsert({
     *   create: {
     *     // ... data to create a BrandTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BrandTranslation we want to update
     *   }
     * })
     */
    upsert<T extends BrandTranslationUpsertArgs>(args: SelectSubset<T, BrandTranslationUpsertArgs<ExtArgs>>): Prisma__BrandTranslationClient<$Result.GetResult<Prisma.$BrandTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BrandTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandTranslationCountArgs} args - Arguments to filter BrandTranslations to count.
     * @example
     * // Count the number of BrandTranslations
     * const count = await prisma.brandTranslation.count({
     *   where: {
     *     // ... the filter for the BrandTranslations we want to count
     *   }
     * })
    **/
    count<T extends BrandTranslationCountArgs>(
      args?: Subset<T, BrandTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BrandTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BrandTranslationAggregateArgs>(args: Subset<T, BrandTranslationAggregateArgs>): Prisma.PrismaPromise<GetBrandTranslationAggregateType<T>>

    /**
     * Group by BrandTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandTranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BrandTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrandTranslationGroupByArgs['orderBy'] }
        : { orderBy?: BrandTranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BrandTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BrandTranslation model
   */
  readonly fields: BrandTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BrandTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrandTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends BrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrandDefaultArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BrandTranslation model
   */
  interface BrandTranslationFieldRefs {
    readonly id: FieldRef<"BrandTranslation", 'Int'>
    readonly brandId: FieldRef<"BrandTranslation", 'Int'>
    readonly locale: FieldRef<"BrandTranslation", 'Locale'>
    readonly name: FieldRef<"BrandTranslation", 'String'>
    readonly createdAt: FieldRef<"BrandTranslation", 'DateTime'>
    readonly updatedAt: FieldRef<"BrandTranslation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BrandTranslation findUnique
   */
  export type BrandTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BrandTranslation to fetch.
     */
    where: BrandTranslationWhereUniqueInput
  }

  /**
   * BrandTranslation findUniqueOrThrow
   */
  export type BrandTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BrandTranslation to fetch.
     */
    where: BrandTranslationWhereUniqueInput
  }

  /**
   * BrandTranslation findFirst
   */
  export type BrandTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BrandTranslation to fetch.
     */
    where?: BrandTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrandTranslations to fetch.
     */
    orderBy?: BrandTranslationOrderByWithRelationInput | BrandTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BrandTranslations.
     */
    cursor?: BrandTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrandTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrandTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrandTranslations.
     */
    distinct?: BrandTranslationScalarFieldEnum | BrandTranslationScalarFieldEnum[]
  }

  /**
   * BrandTranslation findFirstOrThrow
   */
  export type BrandTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BrandTranslation to fetch.
     */
    where?: BrandTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrandTranslations to fetch.
     */
    orderBy?: BrandTranslationOrderByWithRelationInput | BrandTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BrandTranslations.
     */
    cursor?: BrandTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrandTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrandTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BrandTranslations.
     */
    distinct?: BrandTranslationScalarFieldEnum | BrandTranslationScalarFieldEnum[]
  }

  /**
   * BrandTranslation findMany
   */
  export type BrandTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BrandTranslations to fetch.
     */
    where?: BrandTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BrandTranslations to fetch.
     */
    orderBy?: BrandTranslationOrderByWithRelationInput | BrandTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BrandTranslations.
     */
    cursor?: BrandTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BrandTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BrandTranslations.
     */
    skip?: number
    distinct?: BrandTranslationScalarFieldEnum | BrandTranslationScalarFieldEnum[]
  }

  /**
   * BrandTranslation create
   */
  export type BrandTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a BrandTranslation.
     */
    data: XOR<BrandTranslationCreateInput, BrandTranslationUncheckedCreateInput>
  }

  /**
   * BrandTranslation createMany
   */
  export type BrandTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BrandTranslations.
     */
    data: BrandTranslationCreateManyInput | BrandTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BrandTranslation createManyAndReturn
   */
  export type BrandTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many BrandTranslations.
     */
    data: BrandTranslationCreateManyInput | BrandTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BrandTranslation update
   */
  export type BrandTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a BrandTranslation.
     */
    data: XOR<BrandTranslationUpdateInput, BrandTranslationUncheckedUpdateInput>
    /**
     * Choose, which BrandTranslation to update.
     */
    where: BrandTranslationWhereUniqueInput
  }

  /**
   * BrandTranslation updateMany
   */
  export type BrandTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BrandTranslations.
     */
    data: XOR<BrandTranslationUpdateManyMutationInput, BrandTranslationUncheckedUpdateManyInput>
    /**
     * Filter which BrandTranslations to update
     */
    where?: BrandTranslationWhereInput
    /**
     * Limit how many BrandTranslations to update.
     */
    limit?: number
  }

  /**
   * BrandTranslation updateManyAndReturn
   */
  export type BrandTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * The data used to update BrandTranslations.
     */
    data: XOR<BrandTranslationUpdateManyMutationInput, BrandTranslationUncheckedUpdateManyInput>
    /**
     * Filter which BrandTranslations to update
     */
    where?: BrandTranslationWhereInput
    /**
     * Limit how many BrandTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BrandTranslation upsert
   */
  export type BrandTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the BrandTranslation to update in case it exists.
     */
    where: BrandTranslationWhereUniqueInput
    /**
     * In case the BrandTranslation found by the `where` argument doesn't exist, create a new BrandTranslation with this data.
     */
    create: XOR<BrandTranslationCreateInput, BrandTranslationUncheckedCreateInput>
    /**
     * In case the BrandTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrandTranslationUpdateInput, BrandTranslationUncheckedUpdateInput>
  }

  /**
   * BrandTranslation delete
   */
  export type BrandTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
    /**
     * Filter which BrandTranslation to delete.
     */
    where: BrandTranslationWhereUniqueInput
  }

  /**
   * BrandTranslation deleteMany
   */
  export type BrandTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BrandTranslations to delete
     */
    where?: BrandTranslationWhereInput
    /**
     * Limit how many BrandTranslations to delete.
     */
    limit?: number
  }

  /**
   * BrandTranslation without action
   */
  export type BrandTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandTranslation
     */
    select?: BrandTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BrandTranslation
     */
    omit?: BrandTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandTranslationInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    section: $Enums.Section | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    section: $Enums.Section | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    section: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    section?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    section?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    section?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    section: $Enums.Section
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    section?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    translations?: boolean | Category$translationsArgs<ExtArgs>
    subcategories?: boolean | Category$subcategoriesArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    section?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    section?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    section?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "section" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | Category$translationsArgs<ExtArgs>
    subcategories?: boolean | Category$subcategoriesArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      translations: Prisma.$CategoryTranslationPayload<ExtArgs>[]
      subcategories: Prisma.$SubcategoryPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      section: $Enums.Section
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends Category$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Category$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subcategories<T extends Category$subcategoriesArgs<ExtArgs> = {}>(args?: Subset<T, Category$subcategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly section: FieldRef<"Category", 'Section'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.translations
   */
  export type Category$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    where?: CategoryTranslationWhereInput
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    cursor?: CategoryTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * Category.subcategories
   */
  export type Category$subcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    where?: SubcategoryWhereInput
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    cursor?: SubcategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model CategoryTranslation
   */

  export type AggregateCategoryTranslation = {
    _count: CategoryTranslationCountAggregateOutputType | null
    _avg: CategoryTranslationAvgAggregateOutputType | null
    _sum: CategoryTranslationSumAggregateOutputType | null
    _min: CategoryTranslationMinAggregateOutputType | null
    _max: CategoryTranslationMaxAggregateOutputType | null
  }

  export type CategoryTranslationAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
  }

  export type CategoryTranslationSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
  }

  export type CategoryTranslationMinAggregateOutputType = {
    id: number | null
    categoryId: number | null
    locale: $Enums.Locale | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryTranslationMaxAggregateOutputType = {
    id: number | null
    categoryId: number | null
    locale: $Enums.Locale | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryTranslationCountAggregateOutputType = {
    id: number
    categoryId: number
    locale: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryTranslationAvgAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type CategoryTranslationSumAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type CategoryTranslationMinAggregateInputType = {
    id?: true
    categoryId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryTranslationMaxAggregateInputType = {
    id?: true
    categoryId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryTranslationCountAggregateInputType = {
    id?: true
    categoryId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryTranslation to aggregate.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoryTranslations
    **/
    _count?: true | CategoryTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryTranslationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoryTranslationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryTranslationMaxAggregateInputType
  }

  export type GetCategoryTranslationAggregateType<T extends CategoryTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoryTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoryTranslation[P]>
      : GetScalarType<T[P], AggregateCategoryTranslation[P]>
  }




  export type CategoryTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryTranslationWhereInput
    orderBy?: CategoryTranslationOrderByWithAggregationInput | CategoryTranslationOrderByWithAggregationInput[]
    by: CategoryTranslationScalarFieldEnum[] | CategoryTranslationScalarFieldEnum
    having?: CategoryTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryTranslationCountAggregateInputType | true
    _avg?: CategoryTranslationAvgAggregateInputType
    _sum?: CategoryTranslationSumAggregateInputType
    _min?: CategoryTranslationMinAggregateInputType
    _max?: CategoryTranslationMaxAggregateInputType
  }

  export type CategoryTranslationGroupByOutputType = {
    id: number
    categoryId: number
    locale: $Enums.Locale
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryTranslationCountAggregateOutputType | null
    _avg: CategoryTranslationAvgAggregateOutputType | null
    _sum: CategoryTranslationSumAggregateOutputType | null
    _min: CategoryTranslationMinAggregateOutputType | null
    _max: CategoryTranslationMaxAggregateOutputType | null
  }

  type GetCategoryTranslationGroupByPayload<T extends CategoryTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryTranslationGroupByOutputType[P]>
        }
      >
    >


  export type CategoryTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryTranslation"]>

  export type CategoryTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryTranslation"]>

  export type CategoryTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryTranslation"]>

  export type CategoryTranslationSelectScalar = {
    id?: boolean
    categoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "categoryId" | "locale" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["categoryTranslation"]>
  export type CategoryTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type CategoryTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type CategoryTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $CategoryTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoryTranslation"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      categoryId: number
      locale: $Enums.Locale
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["categoryTranslation"]>
    composites: {}
  }

  type CategoryTranslationGetPayload<S extends boolean | null | undefined | CategoryTranslationDefaultArgs> = $Result.GetResult<Prisma.$CategoryTranslationPayload, S>

  type CategoryTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryTranslationCountAggregateInputType | true
    }

  export interface CategoryTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoryTranslation'], meta: { name: 'CategoryTranslation' } }
    /**
     * Find zero or one CategoryTranslation that matches the filter.
     * @param {CategoryTranslationFindUniqueArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryTranslationFindUniqueArgs>(args: SelectSubset<T, CategoryTranslationFindUniqueArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CategoryTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryTranslationFindUniqueOrThrowArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationFindFirstArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryTranslationFindFirstArgs>(args?: SelectSubset<T, CategoryTranslationFindFirstArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationFindFirstOrThrowArgs} args - Arguments to find a CategoryTranslation
     * @example
     * // Get one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CategoryTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoryTranslations
     * const categoryTranslations = await prisma.categoryTranslation.findMany()
     * 
     * // Get first 10 CategoryTranslations
     * const categoryTranslations = await prisma.categoryTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryTranslationWithIdOnly = await prisma.categoryTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryTranslationFindManyArgs>(args?: SelectSubset<T, CategoryTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CategoryTranslation.
     * @param {CategoryTranslationCreateArgs} args - Arguments to create a CategoryTranslation.
     * @example
     * // Create one CategoryTranslation
     * const CategoryTranslation = await prisma.categoryTranslation.create({
     *   data: {
     *     // ... data to create a CategoryTranslation
     *   }
     * })
     * 
     */
    create<T extends CategoryTranslationCreateArgs>(args: SelectSubset<T, CategoryTranslationCreateArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CategoryTranslations.
     * @param {CategoryTranslationCreateManyArgs} args - Arguments to create many CategoryTranslations.
     * @example
     * // Create many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryTranslationCreateManyArgs>(args?: SelectSubset<T, CategoryTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CategoryTranslations and returns the data saved in the database.
     * @param {CategoryTranslationCreateManyAndReturnArgs} args - Arguments to create many CategoryTranslations.
     * @example
     * // Create many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CategoryTranslations and only return the `id`
     * const categoryTranslationWithIdOnly = await prisma.categoryTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CategoryTranslation.
     * @param {CategoryTranslationDeleteArgs} args - Arguments to delete one CategoryTranslation.
     * @example
     * // Delete one CategoryTranslation
     * const CategoryTranslation = await prisma.categoryTranslation.delete({
     *   where: {
     *     // ... filter to delete one CategoryTranslation
     *   }
     * })
     * 
     */
    delete<T extends CategoryTranslationDeleteArgs>(args: SelectSubset<T, CategoryTranslationDeleteArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CategoryTranslation.
     * @param {CategoryTranslationUpdateArgs} args - Arguments to update one CategoryTranslation.
     * @example
     * // Update one CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryTranslationUpdateArgs>(args: SelectSubset<T, CategoryTranslationUpdateArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CategoryTranslations.
     * @param {CategoryTranslationDeleteManyArgs} args - Arguments to filter CategoryTranslations to delete.
     * @example
     * // Delete a few CategoryTranslations
     * const { count } = await prisma.categoryTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryTranslationDeleteManyArgs>(args?: SelectSubset<T, CategoryTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryTranslationUpdateManyArgs>(args: SelectSubset<T, CategoryTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryTranslations and returns the data updated in the database.
     * @param {CategoryTranslationUpdateManyAndReturnArgs} args - Arguments to update many CategoryTranslations.
     * @example
     * // Update many CategoryTranslations
     * const categoryTranslation = await prisma.categoryTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CategoryTranslations and only return the `id`
     * const categoryTranslationWithIdOnly = await prisma.categoryTranslation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CategoryTranslation.
     * @param {CategoryTranslationUpsertArgs} args - Arguments to update or create a CategoryTranslation.
     * @example
     * // Update or create a CategoryTranslation
     * const categoryTranslation = await prisma.categoryTranslation.upsert({
     *   create: {
     *     // ... data to create a CategoryTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoryTranslation we want to update
     *   }
     * })
     */
    upsert<T extends CategoryTranslationUpsertArgs>(args: SelectSubset<T, CategoryTranslationUpsertArgs<ExtArgs>>): Prisma__CategoryTranslationClient<$Result.GetResult<Prisma.$CategoryTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CategoryTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationCountArgs} args - Arguments to filter CategoryTranslations to count.
     * @example
     * // Count the number of CategoryTranslations
     * const count = await prisma.categoryTranslation.count({
     *   where: {
     *     // ... the filter for the CategoryTranslations we want to count
     *   }
     * })
    **/
    count<T extends CategoryTranslationCountArgs>(
      args?: Subset<T, CategoryTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoryTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryTranslationAggregateArgs>(args: Subset<T, CategoryTranslationAggregateArgs>): Prisma.PrismaPromise<GetCategoryTranslationAggregateType<T>>

    /**
     * Group by CategoryTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryTranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryTranslationGroupByArgs['orderBy'] }
        : { orderBy?: CategoryTranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoryTranslation model
   */
  readonly fields: CategoryTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoryTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CategoryTranslation model
   */
  interface CategoryTranslationFieldRefs {
    readonly id: FieldRef<"CategoryTranslation", 'Int'>
    readonly categoryId: FieldRef<"CategoryTranslation", 'Int'>
    readonly locale: FieldRef<"CategoryTranslation", 'Locale'>
    readonly name: FieldRef<"CategoryTranslation", 'String'>
    readonly createdAt: FieldRef<"CategoryTranslation", 'DateTime'>
    readonly updatedAt: FieldRef<"CategoryTranslation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CategoryTranslation findUnique
   */
  export type CategoryTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation findUniqueOrThrow
   */
  export type CategoryTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation findFirst
   */
  export type CategoryTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryTranslations.
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryTranslations.
     */
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * CategoryTranslation findFirstOrThrow
   */
  export type CategoryTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslation to fetch.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryTranslations.
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryTranslations.
     */
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * CategoryTranslation findMany
   */
  export type CategoryTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which CategoryTranslations to fetch.
     */
    where?: CategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryTranslations to fetch.
     */
    orderBy?: CategoryTranslationOrderByWithRelationInput | CategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoryTranslations.
     */
    cursor?: CategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryTranslations.
     */
    skip?: number
    distinct?: CategoryTranslationScalarFieldEnum | CategoryTranslationScalarFieldEnum[]
  }

  /**
   * CategoryTranslation create
   */
  export type CategoryTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a CategoryTranslation.
     */
    data: XOR<CategoryTranslationCreateInput, CategoryTranslationUncheckedCreateInput>
  }

  /**
   * CategoryTranslation createMany
   */
  export type CategoryTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoryTranslations.
     */
    data: CategoryTranslationCreateManyInput | CategoryTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CategoryTranslation createManyAndReturn
   */
  export type CategoryTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many CategoryTranslations.
     */
    data: CategoryTranslationCreateManyInput | CategoryTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CategoryTranslation update
   */
  export type CategoryTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a CategoryTranslation.
     */
    data: XOR<CategoryTranslationUpdateInput, CategoryTranslationUncheckedUpdateInput>
    /**
     * Choose, which CategoryTranslation to update.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation updateMany
   */
  export type CategoryTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoryTranslations.
     */
    data: XOR<CategoryTranslationUpdateManyMutationInput, CategoryTranslationUncheckedUpdateManyInput>
    /**
     * Filter which CategoryTranslations to update
     */
    where?: CategoryTranslationWhereInput
    /**
     * Limit how many CategoryTranslations to update.
     */
    limit?: number
  }

  /**
   * CategoryTranslation updateManyAndReturn
   */
  export type CategoryTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * The data used to update CategoryTranslations.
     */
    data: XOR<CategoryTranslationUpdateManyMutationInput, CategoryTranslationUncheckedUpdateManyInput>
    /**
     * Filter which CategoryTranslations to update
     */
    where?: CategoryTranslationWhereInput
    /**
     * Limit how many CategoryTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CategoryTranslation upsert
   */
  export type CategoryTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the CategoryTranslation to update in case it exists.
     */
    where: CategoryTranslationWhereUniqueInput
    /**
     * In case the CategoryTranslation found by the `where` argument doesn't exist, create a new CategoryTranslation with this data.
     */
    create: XOR<CategoryTranslationCreateInput, CategoryTranslationUncheckedCreateInput>
    /**
     * In case the CategoryTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryTranslationUpdateInput, CategoryTranslationUncheckedUpdateInput>
  }

  /**
   * CategoryTranslation delete
   */
  export type CategoryTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter which CategoryTranslation to delete.
     */
    where: CategoryTranslationWhereUniqueInput
  }

  /**
   * CategoryTranslation deleteMany
   */
  export type CategoryTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryTranslations to delete
     */
    where?: CategoryTranslationWhereInput
    /**
     * Limit how many CategoryTranslations to delete.
     */
    limit?: number
  }

  /**
   * CategoryTranslation without action
   */
  export type CategoryTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryTranslation
     */
    select?: CategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryTranslation
     */
    omit?: CategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryTranslationInclude<ExtArgs> | null
  }


  /**
   * Model Subcategory
   */

  export type AggregateSubcategory = {
    _count: SubcategoryCountAggregateOutputType | null
    _avg: SubcategoryAvgAggregateOutputType | null
    _sum: SubcategorySumAggregateOutputType | null
    _min: SubcategoryMinAggregateOutputType | null
    _max: SubcategoryMaxAggregateOutputType | null
  }

  export type SubcategoryAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
  }

  export type SubcategorySumAggregateOutputType = {
    id: number | null
    categoryId: number | null
  }

  export type SubcategoryMinAggregateOutputType = {
    id: number | null
    categoryId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubcategoryMaxAggregateOutputType = {
    id: number | null
    categoryId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubcategoryCountAggregateOutputType = {
    id: number
    categoryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubcategoryAvgAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type SubcategorySumAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type SubcategoryMinAggregateInputType = {
    id?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubcategoryMaxAggregateInputType = {
    id?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubcategoryCountAggregateInputType = {
    id?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubcategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subcategory to aggregate.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subcategories
    **/
    _count?: true | SubcategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubcategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubcategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubcategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubcategoryMaxAggregateInputType
  }

  export type GetSubcategoryAggregateType<T extends SubcategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateSubcategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubcategory[P]>
      : GetScalarType<T[P], AggregateSubcategory[P]>
  }




  export type SubcategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryWhereInput
    orderBy?: SubcategoryOrderByWithAggregationInput | SubcategoryOrderByWithAggregationInput[]
    by: SubcategoryScalarFieldEnum[] | SubcategoryScalarFieldEnum
    having?: SubcategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubcategoryCountAggregateInputType | true
    _avg?: SubcategoryAvgAggregateInputType
    _sum?: SubcategorySumAggregateInputType
    _min?: SubcategoryMinAggregateInputType
    _max?: SubcategoryMaxAggregateInputType
  }

  export type SubcategoryGroupByOutputType = {
    id: number
    categoryId: number
    createdAt: Date
    updatedAt: Date
    _count: SubcategoryCountAggregateOutputType | null
    _avg: SubcategoryAvgAggregateOutputType | null
    _sum: SubcategorySumAggregateOutputType | null
    _min: SubcategoryMinAggregateOutputType | null
    _max: SubcategoryMaxAggregateOutputType | null
  }

  type GetSubcategoryGroupByPayload<T extends SubcategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubcategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubcategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubcategoryGroupByOutputType[P]>
            : GetScalarType<T[P], SubcategoryGroupByOutputType[P]>
        }
      >
    >


  export type SubcategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    translations?: boolean | Subcategory$translationsArgs<ExtArgs>
    products?: boolean | Subcategory$productsArgs<ExtArgs>
    subcategoryBrands?: boolean | Subcategory$subcategoryBrandsArgs<ExtArgs>
    _count?: boolean | SubcategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategory"]>

  export type SubcategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategory"]>

  export type SubcategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategory"]>

  export type SubcategorySelectScalar = {
    id?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubcategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "categoryId" | "createdAt" | "updatedAt", ExtArgs["result"]["subcategory"]>
  export type SubcategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    translations?: boolean | Subcategory$translationsArgs<ExtArgs>
    products?: boolean | Subcategory$productsArgs<ExtArgs>
    subcategoryBrands?: boolean | Subcategory$subcategoryBrandsArgs<ExtArgs>
    _count?: boolean | SubcategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubcategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type SubcategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $SubcategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subcategory"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      translations: Prisma.$SubcategoryTranslationPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      subcategoryBrands: Prisma.$SubcategoryBrandPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      categoryId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subcategory"]>
    composites: {}
  }

  type SubcategoryGetPayload<S extends boolean | null | undefined | SubcategoryDefaultArgs> = $Result.GetResult<Prisma.$SubcategoryPayload, S>

  type SubcategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubcategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubcategoryCountAggregateInputType | true
    }

  export interface SubcategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subcategory'], meta: { name: 'Subcategory' } }
    /**
     * Find zero or one Subcategory that matches the filter.
     * @param {SubcategoryFindUniqueArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubcategoryFindUniqueArgs>(args: SelectSubset<T, SubcategoryFindUniqueArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subcategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubcategoryFindUniqueOrThrowArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubcategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, SubcategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subcategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindFirstArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubcategoryFindFirstArgs>(args?: SelectSubset<T, SubcategoryFindFirstArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subcategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindFirstOrThrowArgs} args - Arguments to find a Subcategory
     * @example
     * // Get one Subcategory
     * const subcategory = await prisma.subcategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubcategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, SubcategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subcategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subcategories
     * const subcategories = await prisma.subcategory.findMany()
     * 
     * // Get first 10 Subcategories
     * const subcategories = await prisma.subcategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subcategoryWithIdOnly = await prisma.subcategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubcategoryFindManyArgs>(args?: SelectSubset<T, SubcategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subcategory.
     * @param {SubcategoryCreateArgs} args - Arguments to create a Subcategory.
     * @example
     * // Create one Subcategory
     * const Subcategory = await prisma.subcategory.create({
     *   data: {
     *     // ... data to create a Subcategory
     *   }
     * })
     * 
     */
    create<T extends SubcategoryCreateArgs>(args: SelectSubset<T, SubcategoryCreateArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subcategories.
     * @param {SubcategoryCreateManyArgs} args - Arguments to create many Subcategories.
     * @example
     * // Create many Subcategories
     * const subcategory = await prisma.subcategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubcategoryCreateManyArgs>(args?: SelectSubset<T, SubcategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subcategories and returns the data saved in the database.
     * @param {SubcategoryCreateManyAndReturnArgs} args - Arguments to create many Subcategories.
     * @example
     * // Create many Subcategories
     * const subcategory = await prisma.subcategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subcategories and only return the `id`
     * const subcategoryWithIdOnly = await prisma.subcategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubcategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, SubcategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subcategory.
     * @param {SubcategoryDeleteArgs} args - Arguments to delete one Subcategory.
     * @example
     * // Delete one Subcategory
     * const Subcategory = await prisma.subcategory.delete({
     *   where: {
     *     // ... filter to delete one Subcategory
     *   }
     * })
     * 
     */
    delete<T extends SubcategoryDeleteArgs>(args: SelectSubset<T, SubcategoryDeleteArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subcategory.
     * @param {SubcategoryUpdateArgs} args - Arguments to update one Subcategory.
     * @example
     * // Update one Subcategory
     * const subcategory = await prisma.subcategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubcategoryUpdateArgs>(args: SelectSubset<T, SubcategoryUpdateArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subcategories.
     * @param {SubcategoryDeleteManyArgs} args - Arguments to filter Subcategories to delete.
     * @example
     * // Delete a few Subcategories
     * const { count } = await prisma.subcategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubcategoryDeleteManyArgs>(args?: SelectSubset<T, SubcategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subcategories
     * const subcategory = await prisma.subcategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubcategoryUpdateManyArgs>(args: SelectSubset<T, SubcategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subcategories and returns the data updated in the database.
     * @param {SubcategoryUpdateManyAndReturnArgs} args - Arguments to update many Subcategories.
     * @example
     * // Update many Subcategories
     * const subcategory = await prisma.subcategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subcategories and only return the `id`
     * const subcategoryWithIdOnly = await prisma.subcategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubcategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, SubcategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subcategory.
     * @param {SubcategoryUpsertArgs} args - Arguments to update or create a Subcategory.
     * @example
     * // Update or create a Subcategory
     * const subcategory = await prisma.subcategory.upsert({
     *   create: {
     *     // ... data to create a Subcategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subcategory we want to update
     *   }
     * })
     */
    upsert<T extends SubcategoryUpsertArgs>(args: SelectSubset<T, SubcategoryUpsertArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryCountArgs} args - Arguments to filter Subcategories to count.
     * @example
     * // Count the number of Subcategories
     * const count = await prisma.subcategory.count({
     *   where: {
     *     // ... the filter for the Subcategories we want to count
     *   }
     * })
    **/
    count<T extends SubcategoryCountArgs>(
      args?: Subset<T, SubcategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubcategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubcategoryAggregateArgs>(args: Subset<T, SubcategoryAggregateArgs>): Prisma.PrismaPromise<GetSubcategoryAggregateType<T>>

    /**
     * Group by Subcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubcategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubcategoryGroupByArgs['orderBy'] }
        : { orderBy?: SubcategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubcategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubcategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subcategory model
   */
  readonly fields: SubcategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subcategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubcategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    translations<T extends Subcategory$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Subcategory$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Subcategory$productsArgs<ExtArgs> = {}>(args?: Subset<T, Subcategory$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subcategoryBrands<T extends Subcategory$subcategoryBrandsArgs<ExtArgs> = {}>(args?: Subset<T, Subcategory$subcategoryBrandsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subcategory model
   */
  interface SubcategoryFieldRefs {
    readonly id: FieldRef<"Subcategory", 'Int'>
    readonly categoryId: FieldRef<"Subcategory", 'Int'>
    readonly createdAt: FieldRef<"Subcategory", 'DateTime'>
    readonly updatedAt: FieldRef<"Subcategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subcategory findUnique
   */
  export type SubcategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory findUniqueOrThrow
   */
  export type SubcategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory findFirst
   */
  export type SubcategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subcategories.
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subcategories.
     */
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Subcategory findFirstOrThrow
   */
  export type SubcategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategory to fetch.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subcategories.
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subcategories.
     */
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Subcategory findMany
   */
  export type SubcategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which Subcategories to fetch.
     */
    where?: SubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subcategories to fetch.
     */
    orderBy?: SubcategoryOrderByWithRelationInput | SubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subcategories.
     */
    cursor?: SubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subcategories.
     */
    skip?: number
    distinct?: SubcategoryScalarFieldEnum | SubcategoryScalarFieldEnum[]
  }

  /**
   * Subcategory create
   */
  export type SubcategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Subcategory.
     */
    data: XOR<SubcategoryCreateInput, SubcategoryUncheckedCreateInput>
  }

  /**
   * Subcategory createMany
   */
  export type SubcategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subcategories.
     */
    data: SubcategoryCreateManyInput | SubcategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subcategory createManyAndReturn
   */
  export type SubcategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Subcategories.
     */
    data: SubcategoryCreateManyInput | SubcategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subcategory update
   */
  export type SubcategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Subcategory.
     */
    data: XOR<SubcategoryUpdateInput, SubcategoryUncheckedUpdateInput>
    /**
     * Choose, which Subcategory to update.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory updateMany
   */
  export type SubcategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subcategories.
     */
    data: XOR<SubcategoryUpdateManyMutationInput, SubcategoryUncheckedUpdateManyInput>
    /**
     * Filter which Subcategories to update
     */
    where?: SubcategoryWhereInput
    /**
     * Limit how many Subcategories to update.
     */
    limit?: number
  }

  /**
   * Subcategory updateManyAndReturn
   */
  export type SubcategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * The data used to update Subcategories.
     */
    data: XOR<SubcategoryUpdateManyMutationInput, SubcategoryUncheckedUpdateManyInput>
    /**
     * Filter which Subcategories to update
     */
    where?: SubcategoryWhereInput
    /**
     * Limit how many Subcategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subcategory upsert
   */
  export type SubcategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Subcategory to update in case it exists.
     */
    where: SubcategoryWhereUniqueInput
    /**
     * In case the Subcategory found by the `where` argument doesn't exist, create a new Subcategory with this data.
     */
    create: XOR<SubcategoryCreateInput, SubcategoryUncheckedCreateInput>
    /**
     * In case the Subcategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubcategoryUpdateInput, SubcategoryUncheckedUpdateInput>
  }

  /**
   * Subcategory delete
   */
  export type SubcategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    /**
     * Filter which Subcategory to delete.
     */
    where: SubcategoryWhereUniqueInput
  }

  /**
   * Subcategory deleteMany
   */
  export type SubcategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subcategories to delete
     */
    where?: SubcategoryWhereInput
    /**
     * Limit how many Subcategories to delete.
     */
    limit?: number
  }

  /**
   * Subcategory.translations
   */
  export type Subcategory$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    where?: SubcategoryTranslationWhereInput
    orderBy?: SubcategoryTranslationOrderByWithRelationInput | SubcategoryTranslationOrderByWithRelationInput[]
    cursor?: SubcategoryTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubcategoryTranslationScalarFieldEnum | SubcategoryTranslationScalarFieldEnum[]
  }

  /**
   * Subcategory.products
   */
  export type Subcategory$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Subcategory.subcategoryBrands
   */
  export type Subcategory$subcategoryBrandsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    where?: SubcategoryBrandWhereInput
    orderBy?: SubcategoryBrandOrderByWithRelationInput | SubcategoryBrandOrderByWithRelationInput[]
    cursor?: SubcategoryBrandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubcategoryBrandScalarFieldEnum | SubcategoryBrandScalarFieldEnum[]
  }

  /**
   * Subcategory without action
   */
  export type SubcategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
  }


  /**
   * Model SubcategoryTranslation
   */

  export type AggregateSubcategoryTranslation = {
    _count: SubcategoryTranslationCountAggregateOutputType | null
    _avg: SubcategoryTranslationAvgAggregateOutputType | null
    _sum: SubcategoryTranslationSumAggregateOutputType | null
    _min: SubcategoryTranslationMinAggregateOutputType | null
    _max: SubcategoryTranslationMaxAggregateOutputType | null
  }

  export type SubcategoryTranslationAvgAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
  }

  export type SubcategoryTranslationSumAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
  }

  export type SubcategoryTranslationMinAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    locale: $Enums.Locale | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubcategoryTranslationMaxAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    locale: $Enums.Locale | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubcategoryTranslationCountAggregateOutputType = {
    id: number
    subcategoryId: number
    locale: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubcategoryTranslationAvgAggregateInputType = {
    id?: true
    subcategoryId?: true
  }

  export type SubcategoryTranslationSumAggregateInputType = {
    id?: true
    subcategoryId?: true
  }

  export type SubcategoryTranslationMinAggregateInputType = {
    id?: true
    subcategoryId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubcategoryTranslationMaxAggregateInputType = {
    id?: true
    subcategoryId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubcategoryTranslationCountAggregateInputType = {
    id?: true
    subcategoryId?: true
    locale?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubcategoryTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubcategoryTranslation to aggregate.
     */
    where?: SubcategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryTranslations to fetch.
     */
    orderBy?: SubcategoryTranslationOrderByWithRelationInput | SubcategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubcategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubcategoryTranslations
    **/
    _count?: true | SubcategoryTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubcategoryTranslationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubcategoryTranslationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubcategoryTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubcategoryTranslationMaxAggregateInputType
  }

  export type GetSubcategoryTranslationAggregateType<T extends SubcategoryTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateSubcategoryTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubcategoryTranslation[P]>
      : GetScalarType<T[P], AggregateSubcategoryTranslation[P]>
  }




  export type SubcategoryTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryTranslationWhereInput
    orderBy?: SubcategoryTranslationOrderByWithAggregationInput | SubcategoryTranslationOrderByWithAggregationInput[]
    by: SubcategoryTranslationScalarFieldEnum[] | SubcategoryTranslationScalarFieldEnum
    having?: SubcategoryTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubcategoryTranslationCountAggregateInputType | true
    _avg?: SubcategoryTranslationAvgAggregateInputType
    _sum?: SubcategoryTranslationSumAggregateInputType
    _min?: SubcategoryTranslationMinAggregateInputType
    _max?: SubcategoryTranslationMaxAggregateInputType
  }

  export type SubcategoryTranslationGroupByOutputType = {
    id: number
    subcategoryId: number
    locale: $Enums.Locale
    name: string
    createdAt: Date
    updatedAt: Date
    _count: SubcategoryTranslationCountAggregateOutputType | null
    _avg: SubcategoryTranslationAvgAggregateOutputType | null
    _sum: SubcategoryTranslationSumAggregateOutputType | null
    _min: SubcategoryTranslationMinAggregateOutputType | null
    _max: SubcategoryTranslationMaxAggregateOutputType | null
  }

  type GetSubcategoryTranslationGroupByPayload<T extends SubcategoryTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubcategoryTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubcategoryTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubcategoryTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], SubcategoryTranslationGroupByOutputType[P]>
        }
      >
    >


  export type SubcategoryTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subcategoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategoryTranslation"]>

  export type SubcategoryTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subcategoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategoryTranslation"]>

  export type SubcategoryTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subcategoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategoryTranslation"]>

  export type SubcategoryTranslationSelectScalar = {
    id?: boolean
    subcategoryId?: boolean
    locale?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubcategoryTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subcategoryId" | "locale" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["subcategoryTranslation"]>
  export type SubcategoryTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
  }
  export type SubcategoryTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
  }
  export type SubcategoryTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
  }

  export type $SubcategoryTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubcategoryTranslation"
    objects: {
      subcategory: Prisma.$SubcategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      subcategoryId: number
      locale: $Enums.Locale
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subcategoryTranslation"]>
    composites: {}
  }

  type SubcategoryTranslationGetPayload<S extends boolean | null | undefined | SubcategoryTranslationDefaultArgs> = $Result.GetResult<Prisma.$SubcategoryTranslationPayload, S>

  type SubcategoryTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubcategoryTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubcategoryTranslationCountAggregateInputType | true
    }

  export interface SubcategoryTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubcategoryTranslation'], meta: { name: 'SubcategoryTranslation' } }
    /**
     * Find zero or one SubcategoryTranslation that matches the filter.
     * @param {SubcategoryTranslationFindUniqueArgs} args - Arguments to find a SubcategoryTranslation
     * @example
     * // Get one SubcategoryTranslation
     * const subcategoryTranslation = await prisma.subcategoryTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubcategoryTranslationFindUniqueArgs>(args: SelectSubset<T, SubcategoryTranslationFindUniqueArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubcategoryTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubcategoryTranslationFindUniqueOrThrowArgs} args - Arguments to find a SubcategoryTranslation
     * @example
     * // Get one SubcategoryTranslation
     * const subcategoryTranslation = await prisma.subcategoryTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubcategoryTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, SubcategoryTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubcategoryTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryTranslationFindFirstArgs} args - Arguments to find a SubcategoryTranslation
     * @example
     * // Get one SubcategoryTranslation
     * const subcategoryTranslation = await prisma.subcategoryTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubcategoryTranslationFindFirstArgs>(args?: SelectSubset<T, SubcategoryTranslationFindFirstArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubcategoryTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryTranslationFindFirstOrThrowArgs} args - Arguments to find a SubcategoryTranslation
     * @example
     * // Get one SubcategoryTranslation
     * const subcategoryTranslation = await prisma.subcategoryTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubcategoryTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, SubcategoryTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubcategoryTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubcategoryTranslations
     * const subcategoryTranslations = await prisma.subcategoryTranslation.findMany()
     * 
     * // Get first 10 SubcategoryTranslations
     * const subcategoryTranslations = await prisma.subcategoryTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subcategoryTranslationWithIdOnly = await prisma.subcategoryTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubcategoryTranslationFindManyArgs>(args?: SelectSubset<T, SubcategoryTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubcategoryTranslation.
     * @param {SubcategoryTranslationCreateArgs} args - Arguments to create a SubcategoryTranslation.
     * @example
     * // Create one SubcategoryTranslation
     * const SubcategoryTranslation = await prisma.subcategoryTranslation.create({
     *   data: {
     *     // ... data to create a SubcategoryTranslation
     *   }
     * })
     * 
     */
    create<T extends SubcategoryTranslationCreateArgs>(args: SelectSubset<T, SubcategoryTranslationCreateArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubcategoryTranslations.
     * @param {SubcategoryTranslationCreateManyArgs} args - Arguments to create many SubcategoryTranslations.
     * @example
     * // Create many SubcategoryTranslations
     * const subcategoryTranslation = await prisma.subcategoryTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubcategoryTranslationCreateManyArgs>(args?: SelectSubset<T, SubcategoryTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubcategoryTranslations and returns the data saved in the database.
     * @param {SubcategoryTranslationCreateManyAndReturnArgs} args - Arguments to create many SubcategoryTranslations.
     * @example
     * // Create many SubcategoryTranslations
     * const subcategoryTranslation = await prisma.subcategoryTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubcategoryTranslations and only return the `id`
     * const subcategoryTranslationWithIdOnly = await prisma.subcategoryTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubcategoryTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, SubcategoryTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubcategoryTranslation.
     * @param {SubcategoryTranslationDeleteArgs} args - Arguments to delete one SubcategoryTranslation.
     * @example
     * // Delete one SubcategoryTranslation
     * const SubcategoryTranslation = await prisma.subcategoryTranslation.delete({
     *   where: {
     *     // ... filter to delete one SubcategoryTranslation
     *   }
     * })
     * 
     */
    delete<T extends SubcategoryTranslationDeleteArgs>(args: SelectSubset<T, SubcategoryTranslationDeleteArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubcategoryTranslation.
     * @param {SubcategoryTranslationUpdateArgs} args - Arguments to update one SubcategoryTranslation.
     * @example
     * // Update one SubcategoryTranslation
     * const subcategoryTranslation = await prisma.subcategoryTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubcategoryTranslationUpdateArgs>(args: SelectSubset<T, SubcategoryTranslationUpdateArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubcategoryTranslations.
     * @param {SubcategoryTranslationDeleteManyArgs} args - Arguments to filter SubcategoryTranslations to delete.
     * @example
     * // Delete a few SubcategoryTranslations
     * const { count } = await prisma.subcategoryTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubcategoryTranslationDeleteManyArgs>(args?: SelectSubset<T, SubcategoryTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubcategoryTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubcategoryTranslations
     * const subcategoryTranslation = await prisma.subcategoryTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubcategoryTranslationUpdateManyArgs>(args: SelectSubset<T, SubcategoryTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubcategoryTranslations and returns the data updated in the database.
     * @param {SubcategoryTranslationUpdateManyAndReturnArgs} args - Arguments to update many SubcategoryTranslations.
     * @example
     * // Update many SubcategoryTranslations
     * const subcategoryTranslation = await prisma.subcategoryTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubcategoryTranslations and only return the `id`
     * const subcategoryTranslationWithIdOnly = await prisma.subcategoryTranslation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubcategoryTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, SubcategoryTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubcategoryTranslation.
     * @param {SubcategoryTranslationUpsertArgs} args - Arguments to update or create a SubcategoryTranslation.
     * @example
     * // Update or create a SubcategoryTranslation
     * const subcategoryTranslation = await prisma.subcategoryTranslation.upsert({
     *   create: {
     *     // ... data to create a SubcategoryTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubcategoryTranslation we want to update
     *   }
     * })
     */
    upsert<T extends SubcategoryTranslationUpsertArgs>(args: SelectSubset<T, SubcategoryTranslationUpsertArgs<ExtArgs>>): Prisma__SubcategoryTranslationClient<$Result.GetResult<Prisma.$SubcategoryTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubcategoryTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryTranslationCountArgs} args - Arguments to filter SubcategoryTranslations to count.
     * @example
     * // Count the number of SubcategoryTranslations
     * const count = await prisma.subcategoryTranslation.count({
     *   where: {
     *     // ... the filter for the SubcategoryTranslations we want to count
     *   }
     * })
    **/
    count<T extends SubcategoryTranslationCountArgs>(
      args?: Subset<T, SubcategoryTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubcategoryTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubcategoryTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubcategoryTranslationAggregateArgs>(args: Subset<T, SubcategoryTranslationAggregateArgs>): Prisma.PrismaPromise<GetSubcategoryTranslationAggregateType<T>>

    /**
     * Group by SubcategoryTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryTranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubcategoryTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubcategoryTranslationGroupByArgs['orderBy'] }
        : { orderBy?: SubcategoryTranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubcategoryTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubcategoryTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubcategoryTranslation model
   */
  readonly fields: SubcategoryTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubcategoryTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubcategoryTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subcategory<T extends SubcategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubcategoryDefaultArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubcategoryTranslation model
   */
  interface SubcategoryTranslationFieldRefs {
    readonly id: FieldRef<"SubcategoryTranslation", 'Int'>
    readonly subcategoryId: FieldRef<"SubcategoryTranslation", 'Int'>
    readonly locale: FieldRef<"SubcategoryTranslation", 'Locale'>
    readonly name: FieldRef<"SubcategoryTranslation", 'String'>
    readonly createdAt: FieldRef<"SubcategoryTranslation", 'DateTime'>
    readonly updatedAt: FieldRef<"SubcategoryTranslation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubcategoryTranslation findUnique
   */
  export type SubcategoryTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryTranslation to fetch.
     */
    where: SubcategoryTranslationWhereUniqueInput
  }

  /**
   * SubcategoryTranslation findUniqueOrThrow
   */
  export type SubcategoryTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryTranslation to fetch.
     */
    where: SubcategoryTranslationWhereUniqueInput
  }

  /**
   * SubcategoryTranslation findFirst
   */
  export type SubcategoryTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryTranslation to fetch.
     */
    where?: SubcategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryTranslations to fetch.
     */
    orderBy?: SubcategoryTranslationOrderByWithRelationInput | SubcategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubcategoryTranslations.
     */
    cursor?: SubcategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubcategoryTranslations.
     */
    distinct?: SubcategoryTranslationScalarFieldEnum | SubcategoryTranslationScalarFieldEnum[]
  }

  /**
   * SubcategoryTranslation findFirstOrThrow
   */
  export type SubcategoryTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryTranslation to fetch.
     */
    where?: SubcategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryTranslations to fetch.
     */
    orderBy?: SubcategoryTranslationOrderByWithRelationInput | SubcategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubcategoryTranslations.
     */
    cursor?: SubcategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubcategoryTranslations.
     */
    distinct?: SubcategoryTranslationScalarFieldEnum | SubcategoryTranslationScalarFieldEnum[]
  }

  /**
   * SubcategoryTranslation findMany
   */
  export type SubcategoryTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryTranslations to fetch.
     */
    where?: SubcategoryTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryTranslations to fetch.
     */
    orderBy?: SubcategoryTranslationOrderByWithRelationInput | SubcategoryTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubcategoryTranslations.
     */
    cursor?: SubcategoryTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryTranslations.
     */
    skip?: number
    distinct?: SubcategoryTranslationScalarFieldEnum | SubcategoryTranslationScalarFieldEnum[]
  }

  /**
   * SubcategoryTranslation create
   */
  export type SubcategoryTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a SubcategoryTranslation.
     */
    data: XOR<SubcategoryTranslationCreateInput, SubcategoryTranslationUncheckedCreateInput>
  }

  /**
   * SubcategoryTranslation createMany
   */
  export type SubcategoryTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubcategoryTranslations.
     */
    data: SubcategoryTranslationCreateManyInput | SubcategoryTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubcategoryTranslation createManyAndReturn
   */
  export type SubcategoryTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many SubcategoryTranslations.
     */
    data: SubcategoryTranslationCreateManyInput | SubcategoryTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubcategoryTranslation update
   */
  export type SubcategoryTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a SubcategoryTranslation.
     */
    data: XOR<SubcategoryTranslationUpdateInput, SubcategoryTranslationUncheckedUpdateInput>
    /**
     * Choose, which SubcategoryTranslation to update.
     */
    where: SubcategoryTranslationWhereUniqueInput
  }

  /**
   * SubcategoryTranslation updateMany
   */
  export type SubcategoryTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubcategoryTranslations.
     */
    data: XOR<SubcategoryTranslationUpdateManyMutationInput, SubcategoryTranslationUncheckedUpdateManyInput>
    /**
     * Filter which SubcategoryTranslations to update
     */
    where?: SubcategoryTranslationWhereInput
    /**
     * Limit how many SubcategoryTranslations to update.
     */
    limit?: number
  }

  /**
   * SubcategoryTranslation updateManyAndReturn
   */
  export type SubcategoryTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * The data used to update SubcategoryTranslations.
     */
    data: XOR<SubcategoryTranslationUpdateManyMutationInput, SubcategoryTranslationUncheckedUpdateManyInput>
    /**
     * Filter which SubcategoryTranslations to update
     */
    where?: SubcategoryTranslationWhereInput
    /**
     * Limit how many SubcategoryTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubcategoryTranslation upsert
   */
  export type SubcategoryTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the SubcategoryTranslation to update in case it exists.
     */
    where: SubcategoryTranslationWhereUniqueInput
    /**
     * In case the SubcategoryTranslation found by the `where` argument doesn't exist, create a new SubcategoryTranslation with this data.
     */
    create: XOR<SubcategoryTranslationCreateInput, SubcategoryTranslationUncheckedCreateInput>
    /**
     * In case the SubcategoryTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubcategoryTranslationUpdateInput, SubcategoryTranslationUncheckedUpdateInput>
  }

  /**
   * SubcategoryTranslation delete
   */
  export type SubcategoryTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
    /**
     * Filter which SubcategoryTranslation to delete.
     */
    where: SubcategoryTranslationWhereUniqueInput
  }

  /**
   * SubcategoryTranslation deleteMany
   */
  export type SubcategoryTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubcategoryTranslations to delete
     */
    where?: SubcategoryTranslationWhereInput
    /**
     * Limit how many SubcategoryTranslations to delete.
     */
    limit?: number
  }

  /**
   * SubcategoryTranslation without action
   */
  export type SubcategoryTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryTranslation
     */
    select?: SubcategoryTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryTranslation
     */
    omit?: SubcategoryTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryTranslationInclude<ExtArgs> | null
  }


  /**
   * Model SubcategoryBrand
   */

  export type AggregateSubcategoryBrand = {
    _count: SubcategoryBrandCountAggregateOutputType | null
    _avg: SubcategoryBrandAvgAggregateOutputType | null
    _sum: SubcategoryBrandSumAggregateOutputType | null
    _min: SubcategoryBrandMinAggregateOutputType | null
    _max: SubcategoryBrandMaxAggregateOutputType | null
  }

  export type SubcategoryBrandAvgAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    brandId: number | null
  }

  export type SubcategoryBrandSumAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    brandId: number | null
  }

  export type SubcategoryBrandMinAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    brandId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubcategoryBrandMaxAggregateOutputType = {
    id: number | null
    subcategoryId: number | null
    brandId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubcategoryBrandCountAggregateOutputType = {
    id: number
    subcategoryId: number
    brandId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubcategoryBrandAvgAggregateInputType = {
    id?: true
    subcategoryId?: true
    brandId?: true
  }

  export type SubcategoryBrandSumAggregateInputType = {
    id?: true
    subcategoryId?: true
    brandId?: true
  }

  export type SubcategoryBrandMinAggregateInputType = {
    id?: true
    subcategoryId?: true
    brandId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubcategoryBrandMaxAggregateInputType = {
    id?: true
    subcategoryId?: true
    brandId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubcategoryBrandCountAggregateInputType = {
    id?: true
    subcategoryId?: true
    brandId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubcategoryBrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubcategoryBrand to aggregate.
     */
    where?: SubcategoryBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryBrands to fetch.
     */
    orderBy?: SubcategoryBrandOrderByWithRelationInput | SubcategoryBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubcategoryBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubcategoryBrands
    **/
    _count?: true | SubcategoryBrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubcategoryBrandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubcategoryBrandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubcategoryBrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubcategoryBrandMaxAggregateInputType
  }

  export type GetSubcategoryBrandAggregateType<T extends SubcategoryBrandAggregateArgs> = {
        [P in keyof T & keyof AggregateSubcategoryBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubcategoryBrand[P]>
      : GetScalarType<T[P], AggregateSubcategoryBrand[P]>
  }




  export type SubcategoryBrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubcategoryBrandWhereInput
    orderBy?: SubcategoryBrandOrderByWithAggregationInput | SubcategoryBrandOrderByWithAggregationInput[]
    by: SubcategoryBrandScalarFieldEnum[] | SubcategoryBrandScalarFieldEnum
    having?: SubcategoryBrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubcategoryBrandCountAggregateInputType | true
    _avg?: SubcategoryBrandAvgAggregateInputType
    _sum?: SubcategoryBrandSumAggregateInputType
    _min?: SubcategoryBrandMinAggregateInputType
    _max?: SubcategoryBrandMaxAggregateInputType
  }

  export type SubcategoryBrandGroupByOutputType = {
    id: number
    subcategoryId: number
    brandId: number
    createdAt: Date
    updatedAt: Date
    _count: SubcategoryBrandCountAggregateOutputType | null
    _avg: SubcategoryBrandAvgAggregateOutputType | null
    _sum: SubcategoryBrandSumAggregateOutputType | null
    _min: SubcategoryBrandMinAggregateOutputType | null
    _max: SubcategoryBrandMaxAggregateOutputType | null
  }

  type GetSubcategoryBrandGroupByPayload<T extends SubcategoryBrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubcategoryBrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubcategoryBrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubcategoryBrandGroupByOutputType[P]>
            : GetScalarType<T[P], SubcategoryBrandGroupByOutputType[P]>
        }
      >
    >


  export type SubcategoryBrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategoryBrand"]>

  export type SubcategoryBrandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategoryBrand"]>

  export type SubcategoryBrandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subcategoryBrand"]>

  export type SubcategoryBrandSelectScalar = {
    id?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubcategoryBrandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subcategoryId" | "brandId" | "createdAt" | "updatedAt", ExtArgs["result"]["subcategoryBrand"]>
  export type SubcategoryBrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }
  export type SubcategoryBrandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }
  export type SubcategoryBrandIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategory?: boolean | SubcategoryDefaultArgs<ExtArgs>
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }

  export type $SubcategoryBrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubcategoryBrand"
    objects: {
      subcategory: Prisma.$SubcategoryPayload<ExtArgs>
      brand: Prisma.$BrandPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      subcategoryId: number
      brandId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subcategoryBrand"]>
    composites: {}
  }

  type SubcategoryBrandGetPayload<S extends boolean | null | undefined | SubcategoryBrandDefaultArgs> = $Result.GetResult<Prisma.$SubcategoryBrandPayload, S>

  type SubcategoryBrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubcategoryBrandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubcategoryBrandCountAggregateInputType | true
    }

  export interface SubcategoryBrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubcategoryBrand'], meta: { name: 'SubcategoryBrand' } }
    /**
     * Find zero or one SubcategoryBrand that matches the filter.
     * @param {SubcategoryBrandFindUniqueArgs} args - Arguments to find a SubcategoryBrand
     * @example
     * // Get one SubcategoryBrand
     * const subcategoryBrand = await prisma.subcategoryBrand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubcategoryBrandFindUniqueArgs>(args: SelectSubset<T, SubcategoryBrandFindUniqueArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubcategoryBrand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubcategoryBrandFindUniqueOrThrowArgs} args - Arguments to find a SubcategoryBrand
     * @example
     * // Get one SubcategoryBrand
     * const subcategoryBrand = await prisma.subcategoryBrand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubcategoryBrandFindUniqueOrThrowArgs>(args: SelectSubset<T, SubcategoryBrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubcategoryBrand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryBrandFindFirstArgs} args - Arguments to find a SubcategoryBrand
     * @example
     * // Get one SubcategoryBrand
     * const subcategoryBrand = await prisma.subcategoryBrand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubcategoryBrandFindFirstArgs>(args?: SelectSubset<T, SubcategoryBrandFindFirstArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubcategoryBrand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryBrandFindFirstOrThrowArgs} args - Arguments to find a SubcategoryBrand
     * @example
     * // Get one SubcategoryBrand
     * const subcategoryBrand = await prisma.subcategoryBrand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubcategoryBrandFindFirstOrThrowArgs>(args?: SelectSubset<T, SubcategoryBrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubcategoryBrands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryBrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubcategoryBrands
     * const subcategoryBrands = await prisma.subcategoryBrand.findMany()
     * 
     * // Get first 10 SubcategoryBrands
     * const subcategoryBrands = await prisma.subcategoryBrand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subcategoryBrandWithIdOnly = await prisma.subcategoryBrand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubcategoryBrandFindManyArgs>(args?: SelectSubset<T, SubcategoryBrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubcategoryBrand.
     * @param {SubcategoryBrandCreateArgs} args - Arguments to create a SubcategoryBrand.
     * @example
     * // Create one SubcategoryBrand
     * const SubcategoryBrand = await prisma.subcategoryBrand.create({
     *   data: {
     *     // ... data to create a SubcategoryBrand
     *   }
     * })
     * 
     */
    create<T extends SubcategoryBrandCreateArgs>(args: SelectSubset<T, SubcategoryBrandCreateArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubcategoryBrands.
     * @param {SubcategoryBrandCreateManyArgs} args - Arguments to create many SubcategoryBrands.
     * @example
     * // Create many SubcategoryBrands
     * const subcategoryBrand = await prisma.subcategoryBrand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubcategoryBrandCreateManyArgs>(args?: SelectSubset<T, SubcategoryBrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubcategoryBrands and returns the data saved in the database.
     * @param {SubcategoryBrandCreateManyAndReturnArgs} args - Arguments to create many SubcategoryBrands.
     * @example
     * // Create many SubcategoryBrands
     * const subcategoryBrand = await prisma.subcategoryBrand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubcategoryBrands and only return the `id`
     * const subcategoryBrandWithIdOnly = await prisma.subcategoryBrand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubcategoryBrandCreateManyAndReturnArgs>(args?: SelectSubset<T, SubcategoryBrandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubcategoryBrand.
     * @param {SubcategoryBrandDeleteArgs} args - Arguments to delete one SubcategoryBrand.
     * @example
     * // Delete one SubcategoryBrand
     * const SubcategoryBrand = await prisma.subcategoryBrand.delete({
     *   where: {
     *     // ... filter to delete one SubcategoryBrand
     *   }
     * })
     * 
     */
    delete<T extends SubcategoryBrandDeleteArgs>(args: SelectSubset<T, SubcategoryBrandDeleteArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubcategoryBrand.
     * @param {SubcategoryBrandUpdateArgs} args - Arguments to update one SubcategoryBrand.
     * @example
     * // Update one SubcategoryBrand
     * const subcategoryBrand = await prisma.subcategoryBrand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubcategoryBrandUpdateArgs>(args: SelectSubset<T, SubcategoryBrandUpdateArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubcategoryBrands.
     * @param {SubcategoryBrandDeleteManyArgs} args - Arguments to filter SubcategoryBrands to delete.
     * @example
     * // Delete a few SubcategoryBrands
     * const { count } = await prisma.subcategoryBrand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubcategoryBrandDeleteManyArgs>(args?: SelectSubset<T, SubcategoryBrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubcategoryBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryBrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubcategoryBrands
     * const subcategoryBrand = await prisma.subcategoryBrand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubcategoryBrandUpdateManyArgs>(args: SelectSubset<T, SubcategoryBrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubcategoryBrands and returns the data updated in the database.
     * @param {SubcategoryBrandUpdateManyAndReturnArgs} args - Arguments to update many SubcategoryBrands.
     * @example
     * // Update many SubcategoryBrands
     * const subcategoryBrand = await prisma.subcategoryBrand.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubcategoryBrands and only return the `id`
     * const subcategoryBrandWithIdOnly = await prisma.subcategoryBrand.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubcategoryBrandUpdateManyAndReturnArgs>(args: SelectSubset<T, SubcategoryBrandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubcategoryBrand.
     * @param {SubcategoryBrandUpsertArgs} args - Arguments to update or create a SubcategoryBrand.
     * @example
     * // Update or create a SubcategoryBrand
     * const subcategoryBrand = await prisma.subcategoryBrand.upsert({
     *   create: {
     *     // ... data to create a SubcategoryBrand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubcategoryBrand we want to update
     *   }
     * })
     */
    upsert<T extends SubcategoryBrandUpsertArgs>(args: SelectSubset<T, SubcategoryBrandUpsertArgs<ExtArgs>>): Prisma__SubcategoryBrandClient<$Result.GetResult<Prisma.$SubcategoryBrandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubcategoryBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryBrandCountArgs} args - Arguments to filter SubcategoryBrands to count.
     * @example
     * // Count the number of SubcategoryBrands
     * const count = await prisma.subcategoryBrand.count({
     *   where: {
     *     // ... the filter for the SubcategoryBrands we want to count
     *   }
     * })
    **/
    count<T extends SubcategoryBrandCountArgs>(
      args?: Subset<T, SubcategoryBrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubcategoryBrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubcategoryBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryBrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubcategoryBrandAggregateArgs>(args: Subset<T, SubcategoryBrandAggregateArgs>): Prisma.PrismaPromise<GetSubcategoryBrandAggregateType<T>>

    /**
     * Group by SubcategoryBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubcategoryBrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubcategoryBrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubcategoryBrandGroupByArgs['orderBy'] }
        : { orderBy?: SubcategoryBrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubcategoryBrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubcategoryBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubcategoryBrand model
   */
  readonly fields: SubcategoryBrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubcategoryBrand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubcategoryBrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subcategory<T extends SubcategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubcategoryDefaultArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    brand<T extends BrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrandDefaultArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubcategoryBrand model
   */
  interface SubcategoryBrandFieldRefs {
    readonly id: FieldRef<"SubcategoryBrand", 'Int'>
    readonly subcategoryId: FieldRef<"SubcategoryBrand", 'Int'>
    readonly brandId: FieldRef<"SubcategoryBrand", 'Int'>
    readonly createdAt: FieldRef<"SubcategoryBrand", 'DateTime'>
    readonly updatedAt: FieldRef<"SubcategoryBrand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubcategoryBrand findUnique
   */
  export type SubcategoryBrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryBrand to fetch.
     */
    where: SubcategoryBrandWhereUniqueInput
  }

  /**
   * SubcategoryBrand findUniqueOrThrow
   */
  export type SubcategoryBrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryBrand to fetch.
     */
    where: SubcategoryBrandWhereUniqueInput
  }

  /**
   * SubcategoryBrand findFirst
   */
  export type SubcategoryBrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryBrand to fetch.
     */
    where?: SubcategoryBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryBrands to fetch.
     */
    orderBy?: SubcategoryBrandOrderByWithRelationInput | SubcategoryBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubcategoryBrands.
     */
    cursor?: SubcategoryBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubcategoryBrands.
     */
    distinct?: SubcategoryBrandScalarFieldEnum | SubcategoryBrandScalarFieldEnum[]
  }

  /**
   * SubcategoryBrand findFirstOrThrow
   */
  export type SubcategoryBrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryBrand to fetch.
     */
    where?: SubcategoryBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryBrands to fetch.
     */
    orderBy?: SubcategoryBrandOrderByWithRelationInput | SubcategoryBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubcategoryBrands.
     */
    cursor?: SubcategoryBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubcategoryBrands.
     */
    distinct?: SubcategoryBrandScalarFieldEnum | SubcategoryBrandScalarFieldEnum[]
  }

  /**
   * SubcategoryBrand findMany
   */
  export type SubcategoryBrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * Filter, which SubcategoryBrands to fetch.
     */
    where?: SubcategoryBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubcategoryBrands to fetch.
     */
    orderBy?: SubcategoryBrandOrderByWithRelationInput | SubcategoryBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubcategoryBrands.
     */
    cursor?: SubcategoryBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubcategoryBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubcategoryBrands.
     */
    skip?: number
    distinct?: SubcategoryBrandScalarFieldEnum | SubcategoryBrandScalarFieldEnum[]
  }

  /**
   * SubcategoryBrand create
   */
  export type SubcategoryBrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * The data needed to create a SubcategoryBrand.
     */
    data: XOR<SubcategoryBrandCreateInput, SubcategoryBrandUncheckedCreateInput>
  }

  /**
   * SubcategoryBrand createMany
   */
  export type SubcategoryBrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubcategoryBrands.
     */
    data: SubcategoryBrandCreateManyInput | SubcategoryBrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubcategoryBrand createManyAndReturn
   */
  export type SubcategoryBrandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * The data used to create many SubcategoryBrands.
     */
    data: SubcategoryBrandCreateManyInput | SubcategoryBrandCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubcategoryBrand update
   */
  export type SubcategoryBrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * The data needed to update a SubcategoryBrand.
     */
    data: XOR<SubcategoryBrandUpdateInput, SubcategoryBrandUncheckedUpdateInput>
    /**
     * Choose, which SubcategoryBrand to update.
     */
    where: SubcategoryBrandWhereUniqueInput
  }

  /**
   * SubcategoryBrand updateMany
   */
  export type SubcategoryBrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubcategoryBrands.
     */
    data: XOR<SubcategoryBrandUpdateManyMutationInput, SubcategoryBrandUncheckedUpdateManyInput>
    /**
     * Filter which SubcategoryBrands to update
     */
    where?: SubcategoryBrandWhereInput
    /**
     * Limit how many SubcategoryBrands to update.
     */
    limit?: number
  }

  /**
   * SubcategoryBrand updateManyAndReturn
   */
  export type SubcategoryBrandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * The data used to update SubcategoryBrands.
     */
    data: XOR<SubcategoryBrandUpdateManyMutationInput, SubcategoryBrandUncheckedUpdateManyInput>
    /**
     * Filter which SubcategoryBrands to update
     */
    where?: SubcategoryBrandWhereInput
    /**
     * Limit how many SubcategoryBrands to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubcategoryBrand upsert
   */
  export type SubcategoryBrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * The filter to search for the SubcategoryBrand to update in case it exists.
     */
    where: SubcategoryBrandWhereUniqueInput
    /**
     * In case the SubcategoryBrand found by the `where` argument doesn't exist, create a new SubcategoryBrand with this data.
     */
    create: XOR<SubcategoryBrandCreateInput, SubcategoryBrandUncheckedCreateInput>
    /**
     * In case the SubcategoryBrand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubcategoryBrandUpdateInput, SubcategoryBrandUncheckedUpdateInput>
  }

  /**
   * SubcategoryBrand delete
   */
  export type SubcategoryBrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
    /**
     * Filter which SubcategoryBrand to delete.
     */
    where: SubcategoryBrandWhereUniqueInput
  }

  /**
   * SubcategoryBrand deleteMany
   */
  export type SubcategoryBrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubcategoryBrands to delete
     */
    where?: SubcategoryBrandWhereInput
    /**
     * Limit how many SubcategoryBrands to delete.
     */
    limit?: number
  }

  /**
   * SubcategoryBrand without action
   */
  export type SubcategoryBrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubcategoryBrand
     */
    select?: SubcategoryBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubcategoryBrand
     */
    omit?: SubcategoryBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryBrandInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    subcategoryId: number | null
    brandId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    subcategoryId: number | null
    brandId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    sku: string | null
    categoryId: number | null
    subcategoryId: number | null
    brandId: number | null
    section: $Enums.Section | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    sku: string | null
    categoryId: number | null
    subcategoryId: number | null
    brandId: number | null
    section: $Enums.Section | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    sku: number
    categoryId: number
    subcategoryId: number
    brandId: number
    section: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    categoryId?: true
    subcategoryId?: true
    brandId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    categoryId?: true
    subcategoryId?: true
    brandId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    sku?: true
    categoryId?: true
    subcategoryId?: true
    brandId?: true
    section?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    sku?: true
    categoryId?: true
    subcategoryId?: true
    brandId?: true
    section?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    sku?: true
    categoryId?: true
    subcategoryId?: true
    brandId?: true
    section?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    sku: string
    categoryId: number
    subcategoryId: number | null
    brandId: number | null
    section: $Enums.Section
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    categoryId?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    section?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    subcategory?: boolean | Product$subcategoryArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
    translations?: boolean | Product$translationsArgs<ExtArgs>
    specifications?: boolean | Product$specificationsArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    categoryId?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    section?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    subcategory?: boolean | Product$subcategoryArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    categoryId?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    section?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    subcategory?: boolean | Product$subcategoryArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    sku?: boolean
    categoryId?: boolean
    subcategoryId?: boolean
    brandId?: boolean
    section?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sku" | "categoryId" | "subcategoryId" | "brandId" | "section" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    subcategory?: boolean | Product$subcategoryArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
    translations?: boolean | Product$translationsArgs<ExtArgs>
    specifications?: boolean | Product$specificationsArgs<ExtArgs>
    images?: boolean | Product$imagesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    subcategory?: boolean | Product$subcategoryArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    subcategory?: boolean | Product$subcategoryArgs<ExtArgs>
    brand?: boolean | Product$brandArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      subcategory: Prisma.$SubcategoryPayload<ExtArgs> | null
      brand: Prisma.$BrandPayload<ExtArgs> | null
      translations: Prisma.$ProductTranslationPayload<ExtArgs>[]
      specifications: Prisma.$ProductSpecificationPayload<ExtArgs>[]
      images: Prisma.$ProductImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sku: string
      categoryId: number
      subcategoryId: number | null
      brandId: number | null
      section: $Enums.Section
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Product$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Product$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subcategory<T extends Product$subcategoryArgs<ExtArgs> = {}>(args?: Subset<T, Product$subcategoryArgs<ExtArgs>>): Prisma__SubcategoryClient<$Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    brand<T extends Product$brandArgs<ExtArgs> = {}>(args?: Subset<T, Product$brandArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    translations<T extends Product$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Product$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    specifications<T extends Product$specificationsArgs<ExtArgs> = {}>(args?: Subset<T, Product$specificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    images<T extends Product$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Product$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'Int'>
    readonly subcategoryId: FieldRef<"Product", 'Int'>
    readonly brandId: FieldRef<"Product", 'Int'>
    readonly section: FieldRef<"Product", 'Section'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.category
   */
  export type Product$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Product.subcategory
   */
  export type Product$subcategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subcategory
     */
    select?: SubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subcategory
     */
    omit?: SubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubcategoryInclude<ExtArgs> | null
    where?: SubcategoryWhereInput
  }

  /**
   * Product.brand
   */
  export type Product$brandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    where?: BrandWhereInput
  }

  /**
   * Product.translations
   */
  export type Product$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    where?: ProductTranslationWhereInput
    orderBy?: ProductTranslationOrderByWithRelationInput | ProductTranslationOrderByWithRelationInput[]
    cursor?: ProductTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductTranslationScalarFieldEnum | ProductTranslationScalarFieldEnum[]
  }

  /**
   * Product.specifications
   */
  export type Product$specificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    where?: ProductSpecificationWhereInput
    orderBy?: ProductSpecificationOrderByWithRelationInput | ProductSpecificationOrderByWithRelationInput[]
    cursor?: ProductSpecificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductSpecificationScalarFieldEnum | ProductSpecificationScalarFieldEnum[]
  }

  /**
   * Product.images
   */
  export type Product$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    cursor?: ProductImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductTranslation
   */

  export type AggregateProductTranslation = {
    _count: ProductTranslationCountAggregateOutputType | null
    _avg: ProductTranslationAvgAggregateOutputType | null
    _sum: ProductTranslationSumAggregateOutputType | null
    _min: ProductTranslationMinAggregateOutputType | null
    _max: ProductTranslationMaxAggregateOutputType | null
  }

  export type ProductTranslationAvgAggregateOutputType = {
    id: number | null
    productId: number | null
  }

  export type ProductTranslationSumAggregateOutputType = {
    id: number | null
    productId: number | null
  }

  export type ProductTranslationMinAggregateOutputType = {
    id: number | null
    productId: number | null
    locale: $Enums.Locale | null
    name: string | null
    description: string | null
    shortDesc: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductTranslationMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    locale: $Enums.Locale | null
    name: string | null
    description: string | null
    shortDesc: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductTranslationCountAggregateOutputType = {
    id: number
    productId: number
    locale: number
    name: number
    description: number
    shortDesc: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductTranslationAvgAggregateInputType = {
    id?: true
    productId?: true
  }

  export type ProductTranslationSumAggregateInputType = {
    id?: true
    productId?: true
  }

  export type ProductTranslationMinAggregateInputType = {
    id?: true
    productId?: true
    locale?: true
    name?: true
    description?: true
    shortDesc?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductTranslationMaxAggregateInputType = {
    id?: true
    productId?: true
    locale?: true
    name?: true
    description?: true
    shortDesc?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductTranslationCountAggregateInputType = {
    id?: true
    productId?: true
    locale?: true
    name?: true
    description?: true
    shortDesc?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductTranslation to aggregate.
     */
    where?: ProductTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductTranslations to fetch.
     */
    orderBy?: ProductTranslationOrderByWithRelationInput | ProductTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductTranslations
    **/
    _count?: true | ProductTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductTranslationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductTranslationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductTranslationMaxAggregateInputType
  }

  export type GetProductTranslationAggregateType<T extends ProductTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateProductTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductTranslation[P]>
      : GetScalarType<T[P], AggregateProductTranslation[P]>
  }




  export type ProductTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductTranslationWhereInput
    orderBy?: ProductTranslationOrderByWithAggregationInput | ProductTranslationOrderByWithAggregationInput[]
    by: ProductTranslationScalarFieldEnum[] | ProductTranslationScalarFieldEnum
    having?: ProductTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductTranslationCountAggregateInputType | true
    _avg?: ProductTranslationAvgAggregateInputType
    _sum?: ProductTranslationSumAggregateInputType
    _min?: ProductTranslationMinAggregateInputType
    _max?: ProductTranslationMaxAggregateInputType
  }

  export type ProductTranslationGroupByOutputType = {
    id: number
    productId: number
    locale: $Enums.Locale
    name: string
    description: string | null
    shortDesc: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProductTranslationCountAggregateOutputType | null
    _avg: ProductTranslationAvgAggregateOutputType | null
    _sum: ProductTranslationSumAggregateOutputType | null
    _min: ProductTranslationMinAggregateOutputType | null
    _max: ProductTranslationMaxAggregateOutputType | null
  }

  type GetProductTranslationGroupByPayload<T extends ProductTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], ProductTranslationGroupByOutputType[P]>
        }
      >
    >


  export type ProductTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    locale?: boolean
    name?: boolean
    description?: boolean
    shortDesc?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productTranslation"]>

  export type ProductTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    locale?: boolean
    name?: boolean
    description?: boolean
    shortDesc?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productTranslation"]>

  export type ProductTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    locale?: boolean
    name?: boolean
    description?: boolean
    shortDesc?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productTranslation"]>

  export type ProductTranslationSelectScalar = {
    id?: boolean
    productId?: boolean
    locale?: boolean
    name?: boolean
    description?: boolean
    shortDesc?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "locale" | "name" | "description" | "shortDesc" | "createdAt" | "updatedAt", ExtArgs["result"]["productTranslation"]>
  export type ProductTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductTranslation"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      locale: $Enums.Locale
      name: string
      description: string | null
      shortDesc: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productTranslation"]>
    composites: {}
  }

  type ProductTranslationGetPayload<S extends boolean | null | undefined | ProductTranslationDefaultArgs> = $Result.GetResult<Prisma.$ProductTranslationPayload, S>

  type ProductTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductTranslationCountAggregateInputType | true
    }

  export interface ProductTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductTranslation'], meta: { name: 'ProductTranslation' } }
    /**
     * Find zero or one ProductTranslation that matches the filter.
     * @param {ProductTranslationFindUniqueArgs} args - Arguments to find a ProductTranslation
     * @example
     * // Get one ProductTranslation
     * const productTranslation = await prisma.productTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductTranslationFindUniqueArgs>(args: SelectSubset<T, ProductTranslationFindUniqueArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductTranslationFindUniqueOrThrowArgs} args - Arguments to find a ProductTranslation
     * @example
     * // Get one ProductTranslation
     * const productTranslation = await prisma.productTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductTranslationFindFirstArgs} args - Arguments to find a ProductTranslation
     * @example
     * // Get one ProductTranslation
     * const productTranslation = await prisma.productTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductTranslationFindFirstArgs>(args?: SelectSubset<T, ProductTranslationFindFirstArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductTranslationFindFirstOrThrowArgs} args - Arguments to find a ProductTranslation
     * @example
     * // Get one ProductTranslation
     * const productTranslation = await prisma.productTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductTranslations
     * const productTranslations = await prisma.productTranslation.findMany()
     * 
     * // Get first 10 ProductTranslations
     * const productTranslations = await prisma.productTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productTranslationWithIdOnly = await prisma.productTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductTranslationFindManyArgs>(args?: SelectSubset<T, ProductTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductTranslation.
     * @param {ProductTranslationCreateArgs} args - Arguments to create a ProductTranslation.
     * @example
     * // Create one ProductTranslation
     * const ProductTranslation = await prisma.productTranslation.create({
     *   data: {
     *     // ... data to create a ProductTranslation
     *   }
     * })
     * 
     */
    create<T extends ProductTranslationCreateArgs>(args: SelectSubset<T, ProductTranslationCreateArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductTranslations.
     * @param {ProductTranslationCreateManyArgs} args - Arguments to create many ProductTranslations.
     * @example
     * // Create many ProductTranslations
     * const productTranslation = await prisma.productTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductTranslationCreateManyArgs>(args?: SelectSubset<T, ProductTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductTranslations and returns the data saved in the database.
     * @param {ProductTranslationCreateManyAndReturnArgs} args - Arguments to create many ProductTranslations.
     * @example
     * // Create many ProductTranslations
     * const productTranslation = await prisma.productTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductTranslations and only return the `id`
     * const productTranslationWithIdOnly = await prisma.productTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductTranslation.
     * @param {ProductTranslationDeleteArgs} args - Arguments to delete one ProductTranslation.
     * @example
     * // Delete one ProductTranslation
     * const ProductTranslation = await prisma.productTranslation.delete({
     *   where: {
     *     // ... filter to delete one ProductTranslation
     *   }
     * })
     * 
     */
    delete<T extends ProductTranslationDeleteArgs>(args: SelectSubset<T, ProductTranslationDeleteArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductTranslation.
     * @param {ProductTranslationUpdateArgs} args - Arguments to update one ProductTranslation.
     * @example
     * // Update one ProductTranslation
     * const productTranslation = await prisma.productTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductTranslationUpdateArgs>(args: SelectSubset<T, ProductTranslationUpdateArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductTranslations.
     * @param {ProductTranslationDeleteManyArgs} args - Arguments to filter ProductTranslations to delete.
     * @example
     * // Delete a few ProductTranslations
     * const { count } = await prisma.productTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductTranslationDeleteManyArgs>(args?: SelectSubset<T, ProductTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductTranslations
     * const productTranslation = await prisma.productTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductTranslationUpdateManyArgs>(args: SelectSubset<T, ProductTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductTranslations and returns the data updated in the database.
     * @param {ProductTranslationUpdateManyAndReturnArgs} args - Arguments to update many ProductTranslations.
     * @example
     * // Update many ProductTranslations
     * const productTranslation = await prisma.productTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductTranslations and only return the `id`
     * const productTranslationWithIdOnly = await prisma.productTranslation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductTranslation.
     * @param {ProductTranslationUpsertArgs} args - Arguments to update or create a ProductTranslation.
     * @example
     * // Update or create a ProductTranslation
     * const productTranslation = await prisma.productTranslation.upsert({
     *   create: {
     *     // ... data to create a ProductTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductTranslation we want to update
     *   }
     * })
     */
    upsert<T extends ProductTranslationUpsertArgs>(args: SelectSubset<T, ProductTranslationUpsertArgs<ExtArgs>>): Prisma__ProductTranslationClient<$Result.GetResult<Prisma.$ProductTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductTranslationCountArgs} args - Arguments to filter ProductTranslations to count.
     * @example
     * // Count the number of ProductTranslations
     * const count = await prisma.productTranslation.count({
     *   where: {
     *     // ... the filter for the ProductTranslations we want to count
     *   }
     * })
    **/
    count<T extends ProductTranslationCountArgs>(
      args?: Subset<T, ProductTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductTranslationAggregateArgs>(args: Subset<T, ProductTranslationAggregateArgs>): Prisma.PrismaPromise<GetProductTranslationAggregateType<T>>

    /**
     * Group by ProductTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductTranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductTranslationGroupByArgs['orderBy'] }
        : { orderBy?: ProductTranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductTranslation model
   */
  readonly fields: ProductTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductTranslation model
   */
  interface ProductTranslationFieldRefs {
    readonly id: FieldRef<"ProductTranslation", 'Int'>
    readonly productId: FieldRef<"ProductTranslation", 'Int'>
    readonly locale: FieldRef<"ProductTranslation", 'Locale'>
    readonly name: FieldRef<"ProductTranslation", 'String'>
    readonly description: FieldRef<"ProductTranslation", 'String'>
    readonly shortDesc: FieldRef<"ProductTranslation", 'String'>
    readonly createdAt: FieldRef<"ProductTranslation", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductTranslation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductTranslation findUnique
   */
  export type ProductTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProductTranslation to fetch.
     */
    where: ProductTranslationWhereUniqueInput
  }

  /**
   * ProductTranslation findUniqueOrThrow
   */
  export type ProductTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProductTranslation to fetch.
     */
    where: ProductTranslationWhereUniqueInput
  }

  /**
   * ProductTranslation findFirst
   */
  export type ProductTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProductTranslation to fetch.
     */
    where?: ProductTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductTranslations to fetch.
     */
    orderBy?: ProductTranslationOrderByWithRelationInput | ProductTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductTranslations.
     */
    cursor?: ProductTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductTranslations.
     */
    distinct?: ProductTranslationScalarFieldEnum | ProductTranslationScalarFieldEnum[]
  }

  /**
   * ProductTranslation findFirstOrThrow
   */
  export type ProductTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProductTranslation to fetch.
     */
    where?: ProductTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductTranslations to fetch.
     */
    orderBy?: ProductTranslationOrderByWithRelationInput | ProductTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductTranslations.
     */
    cursor?: ProductTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductTranslations.
     */
    distinct?: ProductTranslationScalarFieldEnum | ProductTranslationScalarFieldEnum[]
  }

  /**
   * ProductTranslation findMany
   */
  export type ProductTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProductTranslations to fetch.
     */
    where?: ProductTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductTranslations to fetch.
     */
    orderBy?: ProductTranslationOrderByWithRelationInput | ProductTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductTranslations.
     */
    cursor?: ProductTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductTranslations.
     */
    skip?: number
    distinct?: ProductTranslationScalarFieldEnum | ProductTranslationScalarFieldEnum[]
  }

  /**
   * ProductTranslation create
   */
  export type ProductTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductTranslation.
     */
    data: XOR<ProductTranslationCreateInput, ProductTranslationUncheckedCreateInput>
  }

  /**
   * ProductTranslation createMany
   */
  export type ProductTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductTranslations.
     */
    data: ProductTranslationCreateManyInput | ProductTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductTranslation createManyAndReturn
   */
  export type ProductTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many ProductTranslations.
     */
    data: ProductTranslationCreateManyInput | ProductTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductTranslation update
   */
  export type ProductTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductTranslation.
     */
    data: XOR<ProductTranslationUpdateInput, ProductTranslationUncheckedUpdateInput>
    /**
     * Choose, which ProductTranslation to update.
     */
    where: ProductTranslationWhereUniqueInput
  }

  /**
   * ProductTranslation updateMany
   */
  export type ProductTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductTranslations.
     */
    data: XOR<ProductTranslationUpdateManyMutationInput, ProductTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ProductTranslations to update
     */
    where?: ProductTranslationWhereInput
    /**
     * Limit how many ProductTranslations to update.
     */
    limit?: number
  }

  /**
   * ProductTranslation updateManyAndReturn
   */
  export type ProductTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * The data used to update ProductTranslations.
     */
    data: XOR<ProductTranslationUpdateManyMutationInput, ProductTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ProductTranslations to update
     */
    where?: ProductTranslationWhereInput
    /**
     * Limit how many ProductTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductTranslation upsert
   */
  export type ProductTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductTranslation to update in case it exists.
     */
    where: ProductTranslationWhereUniqueInput
    /**
     * In case the ProductTranslation found by the `where` argument doesn't exist, create a new ProductTranslation with this data.
     */
    create: XOR<ProductTranslationCreateInput, ProductTranslationUncheckedCreateInput>
    /**
     * In case the ProductTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductTranslationUpdateInput, ProductTranslationUncheckedUpdateInput>
  }

  /**
   * ProductTranslation delete
   */
  export type ProductTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
    /**
     * Filter which ProductTranslation to delete.
     */
    where: ProductTranslationWhereUniqueInput
  }

  /**
   * ProductTranslation deleteMany
   */
  export type ProductTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductTranslations to delete
     */
    where?: ProductTranslationWhereInput
    /**
     * Limit how many ProductTranslations to delete.
     */
    limit?: number
  }

  /**
   * ProductTranslation without action
   */
  export type ProductTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductTranslation
     */
    select?: ProductTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductTranslation
     */
    omit?: ProductTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductTranslationInclude<ExtArgs> | null
  }


  /**
   * Model ProductSpecification
   */

  export type AggregateProductSpecification = {
    _count: ProductSpecificationCountAggregateOutputType | null
    _avg: ProductSpecificationAvgAggregateOutputType | null
    _sum: ProductSpecificationSumAggregateOutputType | null
    _min: ProductSpecificationMinAggregateOutputType | null
    _max: ProductSpecificationMaxAggregateOutputType | null
  }

  export type ProductSpecificationAvgAggregateOutputType = {
    id: number | null
    productId: number | null
  }

  export type ProductSpecificationSumAggregateOutputType = {
    id: number | null
    productId: number | null
  }

  export type ProductSpecificationMinAggregateOutputType = {
    id: number | null
    productId: number | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductSpecificationMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductSpecificationCountAggregateOutputType = {
    id: number
    productId: number
    key: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductSpecificationAvgAggregateInputType = {
    id?: true
    productId?: true
  }

  export type ProductSpecificationSumAggregateInputType = {
    id?: true
    productId?: true
  }

  export type ProductSpecificationMinAggregateInputType = {
    id?: true
    productId?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductSpecificationMaxAggregateInputType = {
    id?: true
    productId?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductSpecificationCountAggregateInputType = {
    id?: true
    productId?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductSpecificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSpecification to aggregate.
     */
    where?: ProductSpecificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSpecifications to fetch.
     */
    orderBy?: ProductSpecificationOrderByWithRelationInput | ProductSpecificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductSpecificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSpecifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSpecifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductSpecifications
    **/
    _count?: true | ProductSpecificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductSpecificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSpecificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductSpecificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductSpecificationMaxAggregateInputType
  }

  export type GetProductSpecificationAggregateType<T extends ProductSpecificationAggregateArgs> = {
        [P in keyof T & keyof AggregateProductSpecification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductSpecification[P]>
      : GetScalarType<T[P], AggregateProductSpecification[P]>
  }




  export type ProductSpecificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductSpecificationWhereInput
    orderBy?: ProductSpecificationOrderByWithAggregationInput | ProductSpecificationOrderByWithAggregationInput[]
    by: ProductSpecificationScalarFieldEnum[] | ProductSpecificationScalarFieldEnum
    having?: ProductSpecificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductSpecificationCountAggregateInputType | true
    _avg?: ProductSpecificationAvgAggregateInputType
    _sum?: ProductSpecificationSumAggregateInputType
    _min?: ProductSpecificationMinAggregateInputType
    _max?: ProductSpecificationMaxAggregateInputType
  }

  export type ProductSpecificationGroupByOutputType = {
    id: number
    productId: number
    key: string
    value: string
    createdAt: Date
    updatedAt: Date
    _count: ProductSpecificationCountAggregateOutputType | null
    _avg: ProductSpecificationAvgAggregateOutputType | null
    _sum: ProductSpecificationSumAggregateOutputType | null
    _min: ProductSpecificationMinAggregateOutputType | null
    _max: ProductSpecificationMaxAggregateOutputType | null
  }

  type GetProductSpecificationGroupByPayload<T extends ProductSpecificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductSpecificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductSpecificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductSpecificationGroupByOutputType[P]>
            : GetScalarType<T[P], ProductSpecificationGroupByOutputType[P]>
        }
      >
    >


  export type ProductSpecificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productSpecification"]>

  export type ProductSpecificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productSpecification"]>

  export type ProductSpecificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productSpecification"]>

  export type ProductSpecificationSelectScalar = {
    id?: boolean
    productId?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductSpecificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "key" | "value" | "createdAt" | "updatedAt", ExtArgs["result"]["productSpecification"]>
  export type ProductSpecificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductSpecificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductSpecificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductSpecificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductSpecification"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      key: string
      value: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productSpecification"]>
    composites: {}
  }

  type ProductSpecificationGetPayload<S extends boolean | null | undefined | ProductSpecificationDefaultArgs> = $Result.GetResult<Prisma.$ProductSpecificationPayload, S>

  type ProductSpecificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductSpecificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductSpecificationCountAggregateInputType | true
    }

  export interface ProductSpecificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductSpecification'], meta: { name: 'ProductSpecification' } }
    /**
     * Find zero or one ProductSpecification that matches the filter.
     * @param {ProductSpecificationFindUniqueArgs} args - Arguments to find a ProductSpecification
     * @example
     * // Get one ProductSpecification
     * const productSpecification = await prisma.productSpecification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductSpecificationFindUniqueArgs>(args: SelectSubset<T, ProductSpecificationFindUniqueArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductSpecification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductSpecificationFindUniqueOrThrowArgs} args - Arguments to find a ProductSpecification
     * @example
     * // Get one ProductSpecification
     * const productSpecification = await prisma.productSpecification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductSpecificationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductSpecificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductSpecification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSpecificationFindFirstArgs} args - Arguments to find a ProductSpecification
     * @example
     * // Get one ProductSpecification
     * const productSpecification = await prisma.productSpecification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductSpecificationFindFirstArgs>(args?: SelectSubset<T, ProductSpecificationFindFirstArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductSpecification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSpecificationFindFirstOrThrowArgs} args - Arguments to find a ProductSpecification
     * @example
     * // Get one ProductSpecification
     * const productSpecification = await prisma.productSpecification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductSpecificationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductSpecificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductSpecifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSpecificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductSpecifications
     * const productSpecifications = await prisma.productSpecification.findMany()
     * 
     * // Get first 10 ProductSpecifications
     * const productSpecifications = await prisma.productSpecification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productSpecificationWithIdOnly = await prisma.productSpecification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductSpecificationFindManyArgs>(args?: SelectSubset<T, ProductSpecificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductSpecification.
     * @param {ProductSpecificationCreateArgs} args - Arguments to create a ProductSpecification.
     * @example
     * // Create one ProductSpecification
     * const ProductSpecification = await prisma.productSpecification.create({
     *   data: {
     *     // ... data to create a ProductSpecification
     *   }
     * })
     * 
     */
    create<T extends ProductSpecificationCreateArgs>(args: SelectSubset<T, ProductSpecificationCreateArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductSpecifications.
     * @param {ProductSpecificationCreateManyArgs} args - Arguments to create many ProductSpecifications.
     * @example
     * // Create many ProductSpecifications
     * const productSpecification = await prisma.productSpecification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductSpecificationCreateManyArgs>(args?: SelectSubset<T, ProductSpecificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductSpecifications and returns the data saved in the database.
     * @param {ProductSpecificationCreateManyAndReturnArgs} args - Arguments to create many ProductSpecifications.
     * @example
     * // Create many ProductSpecifications
     * const productSpecification = await prisma.productSpecification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductSpecifications and only return the `id`
     * const productSpecificationWithIdOnly = await prisma.productSpecification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductSpecificationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductSpecificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductSpecification.
     * @param {ProductSpecificationDeleteArgs} args - Arguments to delete one ProductSpecification.
     * @example
     * // Delete one ProductSpecification
     * const ProductSpecification = await prisma.productSpecification.delete({
     *   where: {
     *     // ... filter to delete one ProductSpecification
     *   }
     * })
     * 
     */
    delete<T extends ProductSpecificationDeleteArgs>(args: SelectSubset<T, ProductSpecificationDeleteArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductSpecification.
     * @param {ProductSpecificationUpdateArgs} args - Arguments to update one ProductSpecification.
     * @example
     * // Update one ProductSpecification
     * const productSpecification = await prisma.productSpecification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductSpecificationUpdateArgs>(args: SelectSubset<T, ProductSpecificationUpdateArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductSpecifications.
     * @param {ProductSpecificationDeleteManyArgs} args - Arguments to filter ProductSpecifications to delete.
     * @example
     * // Delete a few ProductSpecifications
     * const { count } = await prisma.productSpecification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductSpecificationDeleteManyArgs>(args?: SelectSubset<T, ProductSpecificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductSpecifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSpecificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductSpecifications
     * const productSpecification = await prisma.productSpecification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductSpecificationUpdateManyArgs>(args: SelectSubset<T, ProductSpecificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductSpecifications and returns the data updated in the database.
     * @param {ProductSpecificationUpdateManyAndReturnArgs} args - Arguments to update many ProductSpecifications.
     * @example
     * // Update many ProductSpecifications
     * const productSpecification = await prisma.productSpecification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductSpecifications and only return the `id`
     * const productSpecificationWithIdOnly = await prisma.productSpecification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductSpecificationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductSpecificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductSpecification.
     * @param {ProductSpecificationUpsertArgs} args - Arguments to update or create a ProductSpecification.
     * @example
     * // Update or create a ProductSpecification
     * const productSpecification = await prisma.productSpecification.upsert({
     *   create: {
     *     // ... data to create a ProductSpecification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductSpecification we want to update
     *   }
     * })
     */
    upsert<T extends ProductSpecificationUpsertArgs>(args: SelectSubset<T, ProductSpecificationUpsertArgs<ExtArgs>>): Prisma__ProductSpecificationClient<$Result.GetResult<Prisma.$ProductSpecificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductSpecifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSpecificationCountArgs} args - Arguments to filter ProductSpecifications to count.
     * @example
     * // Count the number of ProductSpecifications
     * const count = await prisma.productSpecification.count({
     *   where: {
     *     // ... the filter for the ProductSpecifications we want to count
     *   }
     * })
    **/
    count<T extends ProductSpecificationCountArgs>(
      args?: Subset<T, ProductSpecificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductSpecificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductSpecification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSpecificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductSpecificationAggregateArgs>(args: Subset<T, ProductSpecificationAggregateArgs>): Prisma.PrismaPromise<GetProductSpecificationAggregateType<T>>

    /**
     * Group by ProductSpecification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductSpecificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductSpecificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductSpecificationGroupByArgs['orderBy'] }
        : { orderBy?: ProductSpecificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductSpecificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductSpecificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductSpecification model
   */
  readonly fields: ProductSpecificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductSpecification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductSpecificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductSpecification model
   */
  interface ProductSpecificationFieldRefs {
    readonly id: FieldRef<"ProductSpecification", 'Int'>
    readonly productId: FieldRef<"ProductSpecification", 'Int'>
    readonly key: FieldRef<"ProductSpecification", 'String'>
    readonly value: FieldRef<"ProductSpecification", 'String'>
    readonly createdAt: FieldRef<"ProductSpecification", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductSpecification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductSpecification findUnique
   */
  export type ProductSpecificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * Filter, which ProductSpecification to fetch.
     */
    where: ProductSpecificationWhereUniqueInput
  }

  /**
   * ProductSpecification findUniqueOrThrow
   */
  export type ProductSpecificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * Filter, which ProductSpecification to fetch.
     */
    where: ProductSpecificationWhereUniqueInput
  }

  /**
   * ProductSpecification findFirst
   */
  export type ProductSpecificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * Filter, which ProductSpecification to fetch.
     */
    where?: ProductSpecificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSpecifications to fetch.
     */
    orderBy?: ProductSpecificationOrderByWithRelationInput | ProductSpecificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSpecifications.
     */
    cursor?: ProductSpecificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSpecifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSpecifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSpecifications.
     */
    distinct?: ProductSpecificationScalarFieldEnum | ProductSpecificationScalarFieldEnum[]
  }

  /**
   * ProductSpecification findFirstOrThrow
   */
  export type ProductSpecificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * Filter, which ProductSpecification to fetch.
     */
    where?: ProductSpecificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSpecifications to fetch.
     */
    orderBy?: ProductSpecificationOrderByWithRelationInput | ProductSpecificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductSpecifications.
     */
    cursor?: ProductSpecificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSpecifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSpecifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductSpecifications.
     */
    distinct?: ProductSpecificationScalarFieldEnum | ProductSpecificationScalarFieldEnum[]
  }

  /**
   * ProductSpecification findMany
   */
  export type ProductSpecificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * Filter, which ProductSpecifications to fetch.
     */
    where?: ProductSpecificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductSpecifications to fetch.
     */
    orderBy?: ProductSpecificationOrderByWithRelationInput | ProductSpecificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductSpecifications.
     */
    cursor?: ProductSpecificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductSpecifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductSpecifications.
     */
    skip?: number
    distinct?: ProductSpecificationScalarFieldEnum | ProductSpecificationScalarFieldEnum[]
  }

  /**
   * ProductSpecification create
   */
  export type ProductSpecificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductSpecification.
     */
    data: XOR<ProductSpecificationCreateInput, ProductSpecificationUncheckedCreateInput>
  }

  /**
   * ProductSpecification createMany
   */
  export type ProductSpecificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductSpecifications.
     */
    data: ProductSpecificationCreateManyInput | ProductSpecificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductSpecification createManyAndReturn
   */
  export type ProductSpecificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * The data used to create many ProductSpecifications.
     */
    data: ProductSpecificationCreateManyInput | ProductSpecificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductSpecification update
   */
  export type ProductSpecificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductSpecification.
     */
    data: XOR<ProductSpecificationUpdateInput, ProductSpecificationUncheckedUpdateInput>
    /**
     * Choose, which ProductSpecification to update.
     */
    where: ProductSpecificationWhereUniqueInput
  }

  /**
   * ProductSpecification updateMany
   */
  export type ProductSpecificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductSpecifications.
     */
    data: XOR<ProductSpecificationUpdateManyMutationInput, ProductSpecificationUncheckedUpdateManyInput>
    /**
     * Filter which ProductSpecifications to update
     */
    where?: ProductSpecificationWhereInput
    /**
     * Limit how many ProductSpecifications to update.
     */
    limit?: number
  }

  /**
   * ProductSpecification updateManyAndReturn
   */
  export type ProductSpecificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * The data used to update ProductSpecifications.
     */
    data: XOR<ProductSpecificationUpdateManyMutationInput, ProductSpecificationUncheckedUpdateManyInput>
    /**
     * Filter which ProductSpecifications to update
     */
    where?: ProductSpecificationWhereInput
    /**
     * Limit how many ProductSpecifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductSpecification upsert
   */
  export type ProductSpecificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductSpecification to update in case it exists.
     */
    where: ProductSpecificationWhereUniqueInput
    /**
     * In case the ProductSpecification found by the `where` argument doesn't exist, create a new ProductSpecification with this data.
     */
    create: XOR<ProductSpecificationCreateInput, ProductSpecificationUncheckedCreateInput>
    /**
     * In case the ProductSpecification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductSpecificationUpdateInput, ProductSpecificationUncheckedUpdateInput>
  }

  /**
   * ProductSpecification delete
   */
  export type ProductSpecificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
    /**
     * Filter which ProductSpecification to delete.
     */
    where: ProductSpecificationWhereUniqueInput
  }

  /**
   * ProductSpecification deleteMany
   */
  export type ProductSpecificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductSpecifications to delete
     */
    where?: ProductSpecificationWhereInput
    /**
     * Limit how many ProductSpecifications to delete.
     */
    limit?: number
  }

  /**
   * ProductSpecification without action
   */
  export type ProductSpecificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSpecification
     */
    select?: ProductSpecificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductSpecification
     */
    omit?: ProductSpecificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductSpecificationInclude<ExtArgs> | null
  }


  /**
   * Model ProductImage
   */

  export type AggregateProductImage = {
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  export type ProductImageAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    order: number | null
  }

  export type ProductImageSumAggregateOutputType = {
    id: number | null
    productId: number | null
    order: number | null
  }

  export type ProductImageMinAggregateOutputType = {
    id: number | null
    productId: number | null
    url: string | null
    alt: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductImageMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    url: string | null
    alt: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductImageCountAggregateOutputType = {
    id: number
    productId: number
    url: number
    alt: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductImageAvgAggregateInputType = {
    id?: true
    productId?: true
    order?: true
  }

  export type ProductImageSumAggregateInputType = {
    id?: true
    productId?: true
    order?: true
  }

  export type ProductImageMinAggregateInputType = {
    id?: true
    productId?: true
    url?: true
    alt?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductImageMaxAggregateInputType = {
    id?: true
    productId?: true
    url?: true
    alt?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductImageCountAggregateInputType = {
    id?: true
    productId?: true
    url?: true
    alt?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImage to aggregate.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductImages
    **/
    _count?: true | ProductImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductImageMaxAggregateInputType
  }

  export type GetProductImageAggregateType<T extends ProductImageAggregateArgs> = {
        [P in keyof T & keyof AggregateProductImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductImage[P]>
      : GetScalarType<T[P], AggregateProductImage[P]>
  }




  export type ProductImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductImageWhereInput
    orderBy?: ProductImageOrderByWithAggregationInput | ProductImageOrderByWithAggregationInput[]
    by: ProductImageScalarFieldEnum[] | ProductImageScalarFieldEnum
    having?: ProductImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductImageCountAggregateInputType | true
    _avg?: ProductImageAvgAggregateInputType
    _sum?: ProductImageSumAggregateInputType
    _min?: ProductImageMinAggregateInputType
    _max?: ProductImageMaxAggregateInputType
  }

  export type ProductImageGroupByOutputType = {
    id: number
    productId: number
    url: string
    alt: string | null
    order: number
    createdAt: Date
    updatedAt: Date
    _count: ProductImageCountAggregateOutputType | null
    _avg: ProductImageAvgAggregateOutputType | null
    _sum: ProductImageSumAggregateOutputType | null
    _min: ProductImageMinAggregateOutputType | null
    _max: ProductImageMaxAggregateOutputType | null
  }

  type GetProductImageGroupByPayload<T extends ProductImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
            : GetScalarType<T[P], ProductImageGroupByOutputType[P]>
        }
      >
    >


  export type ProductImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    url?: boolean
    alt?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    url?: boolean
    alt?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    url?: boolean
    alt?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productImage"]>

  export type ProductImageSelectScalar = {
    id?: boolean
    productId?: boolean
    url?: boolean
    alt?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "url" | "alt" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["productImage"]>
  export type ProductImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductImage"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      url: string
      alt: string | null
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productImage"]>
    composites: {}
  }

  type ProductImageGetPayload<S extends boolean | null | undefined | ProductImageDefaultArgs> = $Result.GetResult<Prisma.$ProductImagePayload, S>

  type ProductImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductImageCountAggregateInputType | true
    }

  export interface ProductImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductImage'], meta: { name: 'ProductImage' } }
    /**
     * Find zero or one ProductImage that matches the filter.
     * @param {ProductImageFindUniqueArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductImageFindUniqueArgs>(args: SelectSubset<T, ProductImageFindUniqueArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductImageFindUniqueOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductImageFindFirstArgs>(args?: SelectSubset<T, ProductImageFindFirstArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindFirstOrThrowArgs} args - Arguments to find a ProductImage
     * @example
     * // Get one ProductImage
     * const productImage = await prisma.productImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductImages
     * const productImages = await prisma.productImage.findMany()
     * 
     * // Get first 10 ProductImages
     * const productImages = await prisma.productImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productImageWithIdOnly = await prisma.productImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductImageFindManyArgs>(args?: SelectSubset<T, ProductImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductImage.
     * @param {ProductImageCreateArgs} args - Arguments to create a ProductImage.
     * @example
     * // Create one ProductImage
     * const ProductImage = await prisma.productImage.create({
     *   data: {
     *     // ... data to create a ProductImage
     *   }
     * })
     * 
     */
    create<T extends ProductImageCreateArgs>(args: SelectSubset<T, ProductImageCreateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductImages.
     * @param {ProductImageCreateManyArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductImageCreateManyArgs>(args?: SelectSubset<T, ProductImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductImages and returns the data saved in the database.
     * @param {ProductImageCreateManyAndReturnArgs} args - Arguments to create many ProductImages.
     * @example
     * // Create many ProductImages
     * const productImage = await prisma.productImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductImages and only return the `id`
     * const productImageWithIdOnly = await prisma.productImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductImage.
     * @param {ProductImageDeleteArgs} args - Arguments to delete one ProductImage.
     * @example
     * // Delete one ProductImage
     * const ProductImage = await prisma.productImage.delete({
     *   where: {
     *     // ... filter to delete one ProductImage
     *   }
     * })
     * 
     */
    delete<T extends ProductImageDeleteArgs>(args: SelectSubset<T, ProductImageDeleteArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductImage.
     * @param {ProductImageUpdateArgs} args - Arguments to update one ProductImage.
     * @example
     * // Update one ProductImage
     * const productImage = await prisma.productImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductImageUpdateArgs>(args: SelectSubset<T, ProductImageUpdateArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductImages.
     * @param {ProductImageDeleteManyArgs} args - Arguments to filter ProductImages to delete.
     * @example
     * // Delete a few ProductImages
     * const { count } = await prisma.productImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductImageDeleteManyArgs>(args?: SelectSubset<T, ProductImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductImageUpdateManyArgs>(args: SelectSubset<T, ProductImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductImages and returns the data updated in the database.
     * @param {ProductImageUpdateManyAndReturnArgs} args - Arguments to update many ProductImages.
     * @example
     * // Update many ProductImages
     * const productImage = await prisma.productImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductImages and only return the `id`
     * const productImageWithIdOnly = await prisma.productImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductImage.
     * @param {ProductImageUpsertArgs} args - Arguments to update or create a ProductImage.
     * @example
     * // Update or create a ProductImage
     * const productImage = await prisma.productImage.upsert({
     *   create: {
     *     // ... data to create a ProductImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductImage we want to update
     *   }
     * })
     */
    upsert<T extends ProductImageUpsertArgs>(args: SelectSubset<T, ProductImageUpsertArgs<ExtArgs>>): Prisma__ProductImageClient<$Result.GetResult<Prisma.$ProductImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageCountArgs} args - Arguments to filter ProductImages to count.
     * @example
     * // Count the number of ProductImages
     * const count = await prisma.productImage.count({
     *   where: {
     *     // ... the filter for the ProductImages we want to count
     *   }
     * })
    **/
    count<T extends ProductImageCountArgs>(
      args?: Subset<T, ProductImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductImageAggregateArgs>(args: Subset<T, ProductImageAggregateArgs>): Prisma.PrismaPromise<GetProductImageAggregateType<T>>

    /**
     * Group by ProductImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductImageGroupByArgs['orderBy'] }
        : { orderBy?: ProductImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductImage model
   */
  readonly fields: ProductImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductImage model
   */
  interface ProductImageFieldRefs {
    readonly id: FieldRef<"ProductImage", 'Int'>
    readonly productId: FieldRef<"ProductImage", 'Int'>
    readonly url: FieldRef<"ProductImage", 'String'>
    readonly alt: FieldRef<"ProductImage", 'String'>
    readonly order: FieldRef<"ProductImage", 'Int'>
    readonly createdAt: FieldRef<"ProductImage", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductImage findUnique
   */
  export type ProductImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findUniqueOrThrow
   */
  export type ProductImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage findFirst
   */
  export type ProductImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findFirstOrThrow
   */
  export type ProductImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImage to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductImages.
     */
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage findMany
   */
  export type ProductImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter, which ProductImages to fetch.
     */
    where?: ProductImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductImages to fetch.
     */
    orderBy?: ProductImageOrderByWithRelationInput | ProductImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductImages.
     */
    cursor?: ProductImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductImages.
     */
    skip?: number
    distinct?: ProductImageScalarFieldEnum | ProductImageScalarFieldEnum[]
  }

  /**
   * ProductImage create
   */
  export type ProductImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductImage.
     */
    data: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
  }

  /**
   * ProductImage createMany
   */
  export type ProductImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductImage createManyAndReturn
   */
  export type ProductImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * The data used to create many ProductImages.
     */
    data: ProductImageCreateManyInput | ProductImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductImage update
   */
  export type ProductImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductImage.
     */
    data: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
    /**
     * Choose, which ProductImage to update.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage updateMany
   */
  export type ProductImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to update.
     */
    limit?: number
  }

  /**
   * ProductImage updateManyAndReturn
   */
  export type ProductImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * The data used to update ProductImages.
     */
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyInput>
    /**
     * Filter which ProductImages to update
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductImage upsert
   */
  export type ProductImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductImage to update in case it exists.
     */
    where: ProductImageWhereUniqueInput
    /**
     * In case the ProductImage found by the `where` argument doesn't exist, create a new ProductImage with this data.
     */
    create: XOR<ProductImageCreateInput, ProductImageUncheckedCreateInput>
    /**
     * In case the ProductImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductImageUpdateInput, ProductImageUncheckedUpdateInput>
  }

  /**
   * ProductImage delete
   */
  export type ProductImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
    /**
     * Filter which ProductImage to delete.
     */
    where: ProductImageWhereUniqueInput
  }

  /**
   * ProductImage deleteMany
   */
  export type ProductImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductImages to delete
     */
    where?: ProductImageWhereInput
    /**
     * Limit how many ProductImages to delete.
     */
    limit?: number
  }

  /**
   * ProductImage without action
   */
  export type ProductImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductImage
     */
    select?: ProductImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductImage
     */
    omit?: ProductImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductImageInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    role: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      role: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BrandScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const BrandTranslationScalarFieldEnum: {
    id: 'id',
    brandId: 'brandId',
    locale: 'locale',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BrandTranslationScalarFieldEnum = (typeof BrandTranslationScalarFieldEnum)[keyof typeof BrandTranslationScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    section: 'section',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const CategoryTranslationScalarFieldEnum: {
    id: 'id',
    categoryId: 'categoryId',
    locale: 'locale',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryTranslationScalarFieldEnum = (typeof CategoryTranslationScalarFieldEnum)[keyof typeof CategoryTranslationScalarFieldEnum]


  export const SubcategoryScalarFieldEnum: {
    id: 'id',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubcategoryScalarFieldEnum = (typeof SubcategoryScalarFieldEnum)[keyof typeof SubcategoryScalarFieldEnum]


  export const SubcategoryTranslationScalarFieldEnum: {
    id: 'id',
    subcategoryId: 'subcategoryId',
    locale: 'locale',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubcategoryTranslationScalarFieldEnum = (typeof SubcategoryTranslationScalarFieldEnum)[keyof typeof SubcategoryTranslationScalarFieldEnum]


  export const SubcategoryBrandScalarFieldEnum: {
    id: 'id',
    subcategoryId: 'subcategoryId',
    brandId: 'brandId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubcategoryBrandScalarFieldEnum = (typeof SubcategoryBrandScalarFieldEnum)[keyof typeof SubcategoryBrandScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    sku: 'sku',
    categoryId: 'categoryId',
    subcategoryId: 'subcategoryId',
    brandId: 'brandId',
    section: 'section',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductTranslationScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    locale: 'locale',
    name: 'name',
    description: 'description',
    shortDesc: 'shortDesc',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductTranslationScalarFieldEnum = (typeof ProductTranslationScalarFieldEnum)[keyof typeof ProductTranslationScalarFieldEnum]


  export const ProductSpecificationScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    key: 'key',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductSpecificationScalarFieldEnum = (typeof ProductSpecificationScalarFieldEnum)[keyof typeof ProductSpecificationScalarFieldEnum]


  export const ProductImageScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    url: 'url',
    alt: 'alt',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Locale'
   */
  export type EnumLocaleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Locale'>
    


  /**
   * Reference to a field of type 'Locale[]'
   */
  export type ListEnumLocaleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Locale[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Section'
   */
  export type EnumSectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Section'>
    


  /**
   * Reference to a field of type 'Section[]'
   */
  export type ListEnumSectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Section[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type BrandWhereInput = {
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    id?: IntFilter<"Brand"> | number
    createdAt?: DateTimeFilter<"Brand"> | Date | string
    updatedAt?: DateTimeFilter<"Brand"> | Date | string
    translations?: BrandTranslationListRelationFilter
    products?: ProductListRelationFilter
    subcategoryBrands?: SubcategoryBrandListRelationFilter
  }

  export type BrandOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    translations?: BrandTranslationOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    subcategoryBrands?: SubcategoryBrandOrderByRelationAggregateInput
  }

  export type BrandWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    createdAt?: DateTimeFilter<"Brand"> | Date | string
    updatedAt?: DateTimeFilter<"Brand"> | Date | string
    translations?: BrandTranslationListRelationFilter
    products?: ProductListRelationFilter
    subcategoryBrands?: SubcategoryBrandListRelationFilter
  }, "id">

  export type BrandOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BrandCountOrderByAggregateInput
    _avg?: BrandAvgOrderByAggregateInput
    _max?: BrandMaxOrderByAggregateInput
    _min?: BrandMinOrderByAggregateInput
    _sum?: BrandSumOrderByAggregateInput
  }

  export type BrandScalarWhereWithAggregatesInput = {
    AND?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    OR?: BrandScalarWhereWithAggregatesInput[]
    NOT?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Brand"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Brand"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Brand"> | Date | string
  }

  export type BrandTranslationWhereInput = {
    AND?: BrandTranslationWhereInput | BrandTranslationWhereInput[]
    OR?: BrandTranslationWhereInput[]
    NOT?: BrandTranslationWhereInput | BrandTranslationWhereInput[]
    id?: IntFilter<"BrandTranslation"> | number
    brandId?: IntFilter<"BrandTranslation"> | number
    locale?: EnumLocaleFilter<"BrandTranslation"> | $Enums.Locale
    name?: StringFilter<"BrandTranslation"> | string
    createdAt?: DateTimeFilter<"BrandTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"BrandTranslation"> | Date | string
    brand?: XOR<BrandScalarRelationFilter, BrandWhereInput>
  }

  export type BrandTranslationOrderByWithRelationInput = {
    id?: SortOrder
    brandId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brand?: BrandOrderByWithRelationInput
  }

  export type BrandTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    brandId_locale?: BrandTranslationBrandIdLocaleCompoundUniqueInput
    AND?: BrandTranslationWhereInput | BrandTranslationWhereInput[]
    OR?: BrandTranslationWhereInput[]
    NOT?: BrandTranslationWhereInput | BrandTranslationWhereInput[]
    brandId?: IntFilter<"BrandTranslation"> | number
    locale?: EnumLocaleFilter<"BrandTranslation"> | $Enums.Locale
    name?: StringFilter<"BrandTranslation"> | string
    createdAt?: DateTimeFilter<"BrandTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"BrandTranslation"> | Date | string
    brand?: XOR<BrandScalarRelationFilter, BrandWhereInput>
  }, "id" | "brandId_locale">

  export type BrandTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    brandId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BrandTranslationCountOrderByAggregateInput
    _avg?: BrandTranslationAvgOrderByAggregateInput
    _max?: BrandTranslationMaxOrderByAggregateInput
    _min?: BrandTranslationMinOrderByAggregateInput
    _sum?: BrandTranslationSumOrderByAggregateInput
  }

  export type BrandTranslationScalarWhereWithAggregatesInput = {
    AND?: BrandTranslationScalarWhereWithAggregatesInput | BrandTranslationScalarWhereWithAggregatesInput[]
    OR?: BrandTranslationScalarWhereWithAggregatesInput[]
    NOT?: BrandTranslationScalarWhereWithAggregatesInput | BrandTranslationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BrandTranslation"> | number
    brandId?: IntWithAggregatesFilter<"BrandTranslation"> | number
    locale?: EnumLocaleWithAggregatesFilter<"BrandTranslation"> | $Enums.Locale
    name?: StringWithAggregatesFilter<"BrandTranslation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BrandTranslation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BrandTranslation"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    section?: EnumSectionFilter<"Category"> | $Enums.Section
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    translations?: CategoryTranslationListRelationFilter
    subcategories?: SubcategoryListRelationFilter
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    translations?: CategoryTranslationOrderByRelationAggregateInput
    subcategories?: SubcategoryOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    section?: EnumSectionFilter<"Category"> | $Enums.Section
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    translations?: CategoryTranslationListRelationFilter
    subcategories?: SubcategoryListRelationFilter
    products?: ProductListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    section?: EnumSectionWithAggregatesFilter<"Category"> | $Enums.Section
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type CategoryTranslationWhereInput = {
    AND?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    OR?: CategoryTranslationWhereInput[]
    NOT?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    id?: IntFilter<"CategoryTranslation"> | number
    categoryId?: IntFilter<"CategoryTranslation"> | number
    locale?: EnumLocaleFilter<"CategoryTranslation"> | $Enums.Locale
    name?: StringFilter<"CategoryTranslation"> | string
    createdAt?: DateTimeFilter<"CategoryTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryTranslation"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type CategoryTranslationOrderByWithRelationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
  }

  export type CategoryTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    categoryId_locale?: CategoryTranslationCategoryIdLocaleCompoundUniqueInput
    AND?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    OR?: CategoryTranslationWhereInput[]
    NOT?: CategoryTranslationWhereInput | CategoryTranslationWhereInput[]
    categoryId?: IntFilter<"CategoryTranslation"> | number
    locale?: EnumLocaleFilter<"CategoryTranslation"> | $Enums.Locale
    name?: StringFilter<"CategoryTranslation"> | string
    createdAt?: DateTimeFilter<"CategoryTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryTranslation"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id" | "categoryId_locale">

  export type CategoryTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryTranslationCountOrderByAggregateInput
    _avg?: CategoryTranslationAvgOrderByAggregateInput
    _max?: CategoryTranslationMaxOrderByAggregateInput
    _min?: CategoryTranslationMinOrderByAggregateInput
    _sum?: CategoryTranslationSumOrderByAggregateInput
  }

  export type CategoryTranslationScalarWhereWithAggregatesInput = {
    AND?: CategoryTranslationScalarWhereWithAggregatesInput | CategoryTranslationScalarWhereWithAggregatesInput[]
    OR?: CategoryTranslationScalarWhereWithAggregatesInput[]
    NOT?: CategoryTranslationScalarWhereWithAggregatesInput | CategoryTranslationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CategoryTranslation"> | number
    categoryId?: IntWithAggregatesFilter<"CategoryTranslation"> | number
    locale?: EnumLocaleWithAggregatesFilter<"CategoryTranslation"> | $Enums.Locale
    name?: StringWithAggregatesFilter<"CategoryTranslation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CategoryTranslation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CategoryTranslation"> | Date | string
  }

  export type SubcategoryWhereInput = {
    AND?: SubcategoryWhereInput | SubcategoryWhereInput[]
    OR?: SubcategoryWhereInput[]
    NOT?: SubcategoryWhereInput | SubcategoryWhereInput[]
    id?: IntFilter<"Subcategory"> | number
    categoryId?: IntFilter<"Subcategory"> | number
    createdAt?: DateTimeFilter<"Subcategory"> | Date | string
    updatedAt?: DateTimeFilter<"Subcategory"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    translations?: SubcategoryTranslationListRelationFilter
    products?: ProductListRelationFilter
    subcategoryBrands?: SubcategoryBrandListRelationFilter
  }

  export type SubcategoryOrderByWithRelationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    translations?: SubcategoryTranslationOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    subcategoryBrands?: SubcategoryBrandOrderByRelationAggregateInput
  }

  export type SubcategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubcategoryWhereInput | SubcategoryWhereInput[]
    OR?: SubcategoryWhereInput[]
    NOT?: SubcategoryWhereInput | SubcategoryWhereInput[]
    categoryId?: IntFilter<"Subcategory"> | number
    createdAt?: DateTimeFilter<"Subcategory"> | Date | string
    updatedAt?: DateTimeFilter<"Subcategory"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    translations?: SubcategoryTranslationListRelationFilter
    products?: ProductListRelationFilter
    subcategoryBrands?: SubcategoryBrandListRelationFilter
  }, "id">

  export type SubcategoryOrderByWithAggregationInput = {
    id?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubcategoryCountOrderByAggregateInput
    _avg?: SubcategoryAvgOrderByAggregateInput
    _max?: SubcategoryMaxOrderByAggregateInput
    _min?: SubcategoryMinOrderByAggregateInput
    _sum?: SubcategorySumOrderByAggregateInput
  }

  export type SubcategoryScalarWhereWithAggregatesInput = {
    AND?: SubcategoryScalarWhereWithAggregatesInput | SubcategoryScalarWhereWithAggregatesInput[]
    OR?: SubcategoryScalarWhereWithAggregatesInput[]
    NOT?: SubcategoryScalarWhereWithAggregatesInput | SubcategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subcategory"> | number
    categoryId?: IntWithAggregatesFilter<"Subcategory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Subcategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subcategory"> | Date | string
  }

  export type SubcategoryTranslationWhereInput = {
    AND?: SubcategoryTranslationWhereInput | SubcategoryTranslationWhereInput[]
    OR?: SubcategoryTranslationWhereInput[]
    NOT?: SubcategoryTranslationWhereInput | SubcategoryTranslationWhereInput[]
    id?: IntFilter<"SubcategoryTranslation"> | number
    subcategoryId?: IntFilter<"SubcategoryTranslation"> | number
    locale?: EnumLocaleFilter<"SubcategoryTranslation"> | $Enums.Locale
    name?: StringFilter<"SubcategoryTranslation"> | string
    createdAt?: DateTimeFilter<"SubcategoryTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"SubcategoryTranslation"> | Date | string
    subcategory?: XOR<SubcategoryScalarRelationFilter, SubcategoryWhereInput>
  }

  export type SubcategoryTranslationOrderByWithRelationInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subcategory?: SubcategoryOrderByWithRelationInput
  }

  export type SubcategoryTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    subcategoryId_locale?: SubcategoryTranslationSubcategoryIdLocaleCompoundUniqueInput
    AND?: SubcategoryTranslationWhereInput | SubcategoryTranslationWhereInput[]
    OR?: SubcategoryTranslationWhereInput[]
    NOT?: SubcategoryTranslationWhereInput | SubcategoryTranslationWhereInput[]
    subcategoryId?: IntFilter<"SubcategoryTranslation"> | number
    locale?: EnumLocaleFilter<"SubcategoryTranslation"> | $Enums.Locale
    name?: StringFilter<"SubcategoryTranslation"> | string
    createdAt?: DateTimeFilter<"SubcategoryTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"SubcategoryTranslation"> | Date | string
    subcategory?: XOR<SubcategoryScalarRelationFilter, SubcategoryWhereInput>
  }, "id" | "subcategoryId_locale">

  export type SubcategoryTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubcategoryTranslationCountOrderByAggregateInput
    _avg?: SubcategoryTranslationAvgOrderByAggregateInput
    _max?: SubcategoryTranslationMaxOrderByAggregateInput
    _min?: SubcategoryTranslationMinOrderByAggregateInput
    _sum?: SubcategoryTranslationSumOrderByAggregateInput
  }

  export type SubcategoryTranslationScalarWhereWithAggregatesInput = {
    AND?: SubcategoryTranslationScalarWhereWithAggregatesInput | SubcategoryTranslationScalarWhereWithAggregatesInput[]
    OR?: SubcategoryTranslationScalarWhereWithAggregatesInput[]
    NOT?: SubcategoryTranslationScalarWhereWithAggregatesInput | SubcategoryTranslationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubcategoryTranslation"> | number
    subcategoryId?: IntWithAggregatesFilter<"SubcategoryTranslation"> | number
    locale?: EnumLocaleWithAggregatesFilter<"SubcategoryTranslation"> | $Enums.Locale
    name?: StringWithAggregatesFilter<"SubcategoryTranslation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SubcategoryTranslation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubcategoryTranslation"> | Date | string
  }

  export type SubcategoryBrandWhereInput = {
    AND?: SubcategoryBrandWhereInput | SubcategoryBrandWhereInput[]
    OR?: SubcategoryBrandWhereInput[]
    NOT?: SubcategoryBrandWhereInput | SubcategoryBrandWhereInput[]
    id?: IntFilter<"SubcategoryBrand"> | number
    subcategoryId?: IntFilter<"SubcategoryBrand"> | number
    brandId?: IntFilter<"SubcategoryBrand"> | number
    createdAt?: DateTimeFilter<"SubcategoryBrand"> | Date | string
    updatedAt?: DateTimeFilter<"SubcategoryBrand"> | Date | string
    subcategory?: XOR<SubcategoryScalarRelationFilter, SubcategoryWhereInput>
    brand?: XOR<BrandScalarRelationFilter, BrandWhereInput>
  }

  export type SubcategoryBrandOrderByWithRelationInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subcategory?: SubcategoryOrderByWithRelationInput
    brand?: BrandOrderByWithRelationInput
  }

  export type SubcategoryBrandWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    subcategoryId_brandId?: SubcategoryBrandSubcategoryIdBrandIdCompoundUniqueInput
    AND?: SubcategoryBrandWhereInput | SubcategoryBrandWhereInput[]
    OR?: SubcategoryBrandWhereInput[]
    NOT?: SubcategoryBrandWhereInput | SubcategoryBrandWhereInput[]
    subcategoryId?: IntFilter<"SubcategoryBrand"> | number
    brandId?: IntFilter<"SubcategoryBrand"> | number
    createdAt?: DateTimeFilter<"SubcategoryBrand"> | Date | string
    updatedAt?: DateTimeFilter<"SubcategoryBrand"> | Date | string
    subcategory?: XOR<SubcategoryScalarRelationFilter, SubcategoryWhereInput>
    brand?: XOR<BrandScalarRelationFilter, BrandWhereInput>
  }, "id" | "subcategoryId_brandId">

  export type SubcategoryBrandOrderByWithAggregationInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubcategoryBrandCountOrderByAggregateInput
    _avg?: SubcategoryBrandAvgOrderByAggregateInput
    _max?: SubcategoryBrandMaxOrderByAggregateInput
    _min?: SubcategoryBrandMinOrderByAggregateInput
    _sum?: SubcategoryBrandSumOrderByAggregateInput
  }

  export type SubcategoryBrandScalarWhereWithAggregatesInput = {
    AND?: SubcategoryBrandScalarWhereWithAggregatesInput | SubcategoryBrandScalarWhereWithAggregatesInput[]
    OR?: SubcategoryBrandScalarWhereWithAggregatesInput[]
    NOT?: SubcategoryBrandScalarWhereWithAggregatesInput | SubcategoryBrandScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubcategoryBrand"> | number
    subcategoryId?: IntWithAggregatesFilter<"SubcategoryBrand"> | number
    brandId?: IntWithAggregatesFilter<"SubcategoryBrand"> | number
    createdAt?: DateTimeWithAggregatesFilter<"SubcategoryBrand"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubcategoryBrand"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    sku?: StringFilter<"Product"> | string
    categoryId?: IntFilter<"Product"> | number
    subcategoryId?: IntNullableFilter<"Product"> | number | null
    brandId?: IntNullableFilter<"Product"> | number | null
    section?: EnumSectionFilter<"Product"> | $Enums.Section
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    subcategory?: XOR<SubcategoryNullableScalarRelationFilter, SubcategoryWhereInput> | null
    brand?: XOR<BrandNullableScalarRelationFilter, BrandWhereInput> | null
    translations?: ProductTranslationListRelationFilter
    specifications?: ProductSpecificationListRelationFilter
    images?: ProductImageListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrderInput | SortOrder
    brandId?: SortOrderInput | SortOrder
    section?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    subcategory?: SubcategoryOrderByWithRelationInput
    brand?: BrandOrderByWithRelationInput
    translations?: ProductTranslationOrderByRelationAggregateInput
    specifications?: ProductSpecificationOrderByRelationAggregateInput
    images?: ProductImageOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sku?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    categoryId?: IntFilter<"Product"> | number
    subcategoryId?: IntNullableFilter<"Product"> | number | null
    brandId?: IntNullableFilter<"Product"> | number | null
    section?: EnumSectionFilter<"Product"> | $Enums.Section
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    subcategory?: XOR<SubcategoryNullableScalarRelationFilter, SubcategoryWhereInput> | null
    brand?: XOR<BrandNullableScalarRelationFilter, BrandWhereInput> | null
    translations?: ProductTranslationListRelationFilter
    specifications?: ProductSpecificationListRelationFilter
    images?: ProductImageListRelationFilter
  }, "id" | "sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrderInput | SortOrder
    brandId?: SortOrderInput | SortOrder
    section?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    sku?: StringWithAggregatesFilter<"Product"> | string
    categoryId?: IntWithAggregatesFilter<"Product"> | number
    subcategoryId?: IntNullableWithAggregatesFilter<"Product"> | number | null
    brandId?: IntNullableWithAggregatesFilter<"Product"> | number | null
    section?: EnumSectionWithAggregatesFilter<"Product"> | $Enums.Section
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ProductTranslationWhereInput = {
    AND?: ProductTranslationWhereInput | ProductTranslationWhereInput[]
    OR?: ProductTranslationWhereInput[]
    NOT?: ProductTranslationWhereInput | ProductTranslationWhereInput[]
    id?: IntFilter<"ProductTranslation"> | number
    productId?: IntFilter<"ProductTranslation"> | number
    locale?: EnumLocaleFilter<"ProductTranslation"> | $Enums.Locale
    name?: StringFilter<"ProductTranslation"> | string
    description?: StringNullableFilter<"ProductTranslation"> | string | null
    shortDesc?: StringNullableFilter<"ProductTranslation"> | string | null
    createdAt?: DateTimeFilter<"ProductTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"ProductTranslation"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductTranslationOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    shortDesc?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    productId_locale?: ProductTranslationProductIdLocaleCompoundUniqueInput
    AND?: ProductTranslationWhereInput | ProductTranslationWhereInput[]
    OR?: ProductTranslationWhereInput[]
    NOT?: ProductTranslationWhereInput | ProductTranslationWhereInput[]
    productId?: IntFilter<"ProductTranslation"> | number
    locale?: EnumLocaleFilter<"ProductTranslation"> | $Enums.Locale
    name?: StringFilter<"ProductTranslation"> | string
    description?: StringNullableFilter<"ProductTranslation"> | string | null
    shortDesc?: StringNullableFilter<"ProductTranslation"> | string | null
    createdAt?: DateTimeFilter<"ProductTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"ProductTranslation"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "productId_locale">

  export type ProductTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    shortDesc?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductTranslationCountOrderByAggregateInput
    _avg?: ProductTranslationAvgOrderByAggregateInput
    _max?: ProductTranslationMaxOrderByAggregateInput
    _min?: ProductTranslationMinOrderByAggregateInput
    _sum?: ProductTranslationSumOrderByAggregateInput
  }

  export type ProductTranslationScalarWhereWithAggregatesInput = {
    AND?: ProductTranslationScalarWhereWithAggregatesInput | ProductTranslationScalarWhereWithAggregatesInput[]
    OR?: ProductTranslationScalarWhereWithAggregatesInput[]
    NOT?: ProductTranslationScalarWhereWithAggregatesInput | ProductTranslationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductTranslation"> | number
    productId?: IntWithAggregatesFilter<"ProductTranslation"> | number
    locale?: EnumLocaleWithAggregatesFilter<"ProductTranslation"> | $Enums.Locale
    name?: StringWithAggregatesFilter<"ProductTranslation"> | string
    description?: StringNullableWithAggregatesFilter<"ProductTranslation"> | string | null
    shortDesc?: StringNullableWithAggregatesFilter<"ProductTranslation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProductTranslation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductTranslation"> | Date | string
  }

  export type ProductSpecificationWhereInput = {
    AND?: ProductSpecificationWhereInput | ProductSpecificationWhereInput[]
    OR?: ProductSpecificationWhereInput[]
    NOT?: ProductSpecificationWhereInput | ProductSpecificationWhereInput[]
    id?: IntFilter<"ProductSpecification"> | number
    productId?: IntFilter<"ProductSpecification"> | number
    key?: StringFilter<"ProductSpecification"> | string
    value?: StringFilter<"ProductSpecification"> | string
    createdAt?: DateTimeFilter<"ProductSpecification"> | Date | string
    updatedAt?: DateTimeFilter<"ProductSpecification"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductSpecificationOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductSpecificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductSpecificationWhereInput | ProductSpecificationWhereInput[]
    OR?: ProductSpecificationWhereInput[]
    NOT?: ProductSpecificationWhereInput | ProductSpecificationWhereInput[]
    productId?: IntFilter<"ProductSpecification"> | number
    key?: StringFilter<"ProductSpecification"> | string
    value?: StringFilter<"ProductSpecification"> | string
    createdAt?: DateTimeFilter<"ProductSpecification"> | Date | string
    updatedAt?: DateTimeFilter<"ProductSpecification"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductSpecificationOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductSpecificationCountOrderByAggregateInput
    _avg?: ProductSpecificationAvgOrderByAggregateInput
    _max?: ProductSpecificationMaxOrderByAggregateInput
    _min?: ProductSpecificationMinOrderByAggregateInput
    _sum?: ProductSpecificationSumOrderByAggregateInput
  }

  export type ProductSpecificationScalarWhereWithAggregatesInput = {
    AND?: ProductSpecificationScalarWhereWithAggregatesInput | ProductSpecificationScalarWhereWithAggregatesInput[]
    OR?: ProductSpecificationScalarWhereWithAggregatesInput[]
    NOT?: ProductSpecificationScalarWhereWithAggregatesInput | ProductSpecificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductSpecification"> | number
    productId?: IntWithAggregatesFilter<"ProductSpecification"> | number
    key?: StringWithAggregatesFilter<"ProductSpecification"> | string
    value?: StringWithAggregatesFilter<"ProductSpecification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProductSpecification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductSpecification"> | Date | string
  }

  export type ProductImageWhereInput = {
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    id?: IntFilter<"ProductImage"> | number
    productId?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    alt?: StringNullableFilter<"ProductImage"> | string | null
    order?: IntFilter<"ProductImage"> | number
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string
    updatedAt?: DateTimeFilter<"ProductImage"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductImageOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    alt?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductImageWhereInput | ProductImageWhereInput[]
    OR?: ProductImageWhereInput[]
    NOT?: ProductImageWhereInput | ProductImageWhereInput[]
    productId?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    alt?: StringNullableFilter<"ProductImage"> | string | null
    order?: IntFilter<"ProductImage"> | number
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string
    updatedAt?: DateTimeFilter<"ProductImage"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductImageOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    alt?: SortOrderInput | SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductImageCountOrderByAggregateInput
    _avg?: ProductImageAvgOrderByAggregateInput
    _max?: ProductImageMaxOrderByAggregateInput
    _min?: ProductImageMinOrderByAggregateInput
    _sum?: ProductImageSumOrderByAggregateInput
  }

  export type ProductImageScalarWhereWithAggregatesInput = {
    AND?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    OR?: ProductImageScalarWhereWithAggregatesInput[]
    NOT?: ProductImageScalarWhereWithAggregatesInput | ProductImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductImage"> | number
    productId?: IntWithAggregatesFilter<"ProductImage"> | number
    url?: StringWithAggregatesFilter<"ProductImage"> | string
    alt?: StringNullableWithAggregatesFilter<"ProductImage"> | string | null
    order?: IntWithAggregatesFilter<"ProductImage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductImage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductImage"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BrandCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: BrandTranslationCreateNestedManyWithoutBrandInput
    products?: ProductCreateNestedManyWithoutBrandInput
    subcategoryBrands?: SubcategoryBrandCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: BrandTranslationUncheckedCreateNestedManyWithoutBrandInput
    products?: ProductUncheckedCreateNestedManyWithoutBrandInput
    subcategoryBrands?: SubcategoryBrandUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: BrandTranslationUpdateManyWithoutBrandNestedInput
    products?: ProductUpdateManyWithoutBrandNestedInput
    subcategoryBrands?: SubcategoryBrandUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: BrandTranslationUncheckedUpdateManyWithoutBrandNestedInput
    products?: ProductUncheckedUpdateManyWithoutBrandNestedInput
    subcategoryBrands?: SubcategoryBrandUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandTranslationCreateInput = {
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: BrandCreateNestedOneWithoutTranslationsInput
  }

  export type BrandTranslationUncheckedCreateInput = {
    id?: number
    brandId: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandTranslationUpdateInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type BrandTranslationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandTranslationCreateManyInput = {
    id?: number
    brandId: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandTranslationUpdateManyMutationInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandTranslationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: CategoryTranslationCreateNestedManyWithoutCategoryInput
    subcategories?: SubcategoryCreateNestedManyWithoutCategoryInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput
    subcategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: CategoryTranslationUpdateManyWithoutCategoryNestedInput
    subcategories?: SubcategoryUpdateManyWithoutCategoryNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput
    subcategories?: SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryTranslationCreateInput = {
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutTranslationsInput
  }

  export type CategoryTranslationUncheckedCreateInput = {
    id?: number
    categoryId: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryTranslationUpdateInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type CategoryTranslationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryTranslationCreateManyInput = {
    id?: number
    categoryId: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryTranslationUpdateManyMutationInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryTranslationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutSubcategoriesInput
    translations?: SubcategoryTranslationCreateNestedManyWithoutSubcategoryInput
    products?: ProductCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateInput = {
    id?: number
    categoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: SubcategoryTranslationUncheckedCreateNestedManyWithoutSubcategoryInput
    products?: ProductUncheckedCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
    translations?: SubcategoryTranslationUpdateManyWithoutSubcategoryNestedInput
    products?: ProductUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: SubcategoryTranslationUncheckedUpdateManyWithoutSubcategoryNestedInput
    products?: ProductUncheckedUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryCreateManyInput = {
    id?: number
    categoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryTranslationCreateInput = {
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subcategory: SubcategoryCreateNestedOneWithoutTranslationsInput
  }

  export type SubcategoryTranslationUncheckedCreateInput = {
    id?: number
    subcategoryId: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryTranslationUpdateInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategory?: SubcategoryUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type SubcategoryTranslationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    subcategoryId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryTranslationCreateManyInput = {
    id?: number
    subcategoryId: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryTranslationUpdateManyMutationInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryTranslationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    subcategoryId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryBrandCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    subcategory: SubcategoryCreateNestedOneWithoutSubcategoryBrandsInput
    brand: BrandCreateNestedOneWithoutSubcategoryBrandsInput
  }

  export type SubcategoryBrandUncheckedCreateInput = {
    id?: number
    subcategoryId: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryBrandUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategory?: SubcategoryUpdateOneRequiredWithoutSubcategoryBrandsNestedInput
    brand?: BrandUpdateOneRequiredWithoutSubcategoryBrandsNestedInput
  }

  export type SubcategoryBrandUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    subcategoryId?: IntFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryBrandCreateManyInput = {
    id?: number
    subcategoryId: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryBrandUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryBrandUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    subcategoryId?: IntFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    sku: string
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    subcategory?: SubcategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    translations?: ProductTranslationCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    sku: string
    categoryId: number
    subcategoryId?: number | null
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ProductTranslationUncheckedCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    subcategory?: SubcategoryUpdateOneWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    translations?: ProductTranslationUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ProductTranslationUncheckedUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    sku: string
    categoryId: number
    subcategoryId?: number | null
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductTranslationCreateInput = {
    locale: $Enums.Locale
    name: string
    description?: string | null
    shortDesc?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutTranslationsInput
  }

  export type ProductTranslationUncheckedCreateInput = {
    id?: number
    productId: number
    locale: $Enums.Locale
    name: string
    description?: string | null
    shortDesc?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductTranslationUpdateInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    shortDesc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type ProductTranslationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    shortDesc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductTranslationCreateManyInput = {
    id?: number
    productId: number
    locale: $Enums.Locale
    name: string
    description?: string | null
    shortDesc?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductTranslationUpdateManyMutationInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    shortDesc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductTranslationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    shortDesc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSpecificationCreateInput = {
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutSpecificationsInput
  }

  export type ProductSpecificationUncheckedCreateInput = {
    id?: number
    productId: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductSpecificationUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSpecificationsNestedInput
  }

  export type ProductSpecificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSpecificationCreateManyInput = {
    id?: number
    productId: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductSpecificationUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSpecificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageCreateInput = {
    url: string
    alt?: string | null
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutImagesInput
  }

  export type ProductImageUncheckedCreateInput = {
    id?: number
    productId: number
    url: string
    alt?: string | null
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductImageUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ProductImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageCreateManyInput = {
    id?: number
    productId: number
    url: string
    alt?: string | null
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductImageUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BrandTranslationListRelationFilter = {
    every?: BrandTranslationWhereInput
    some?: BrandTranslationWhereInput
    none?: BrandTranslationWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type SubcategoryBrandListRelationFilter = {
    every?: SubcategoryBrandWhereInput
    some?: SubcategoryBrandWhereInput
    none?: SubcategoryBrandWhereInput
  }

  export type BrandTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubcategoryBrandOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BrandCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BrandMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumLocaleFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleFilter<$PrismaModel> | $Enums.Locale
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BrandScalarRelationFilter = {
    is?: BrandWhereInput
    isNot?: BrandWhereInput
  }

  export type BrandTranslationBrandIdLocaleCompoundUniqueInput = {
    brandId: number
    locale: $Enums.Locale
  }

  export type BrandTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandTranslationAvgOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
  }

  export type BrandTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BrandTranslationSumOrderByAggregateInput = {
    id?: SortOrder
    brandId?: SortOrder
  }

  export type EnumLocaleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleWithAggregatesFilter<$PrismaModel> | $Enums.Locale
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocaleFilter<$PrismaModel>
    _max?: NestedEnumLocaleFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumSectionFilter<$PrismaModel = never> = {
    equals?: $Enums.Section | EnumSectionFieldRefInput<$PrismaModel>
    in?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionFilter<$PrismaModel> | $Enums.Section
  }

  export type CategoryTranslationListRelationFilter = {
    every?: CategoryTranslationWhereInput
    some?: CategoryTranslationWhereInput
    none?: CategoryTranslationWhereInput
  }

  export type SubcategoryListRelationFilter = {
    every?: SubcategoryWhereInput
    some?: SubcategoryWhereInput
    none?: SubcategoryWhereInput
  }

  export type CategoryTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubcategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumSectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Section | EnumSectionFieldRefInput<$PrismaModel>
    in?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionWithAggregatesFilter<$PrismaModel> | $Enums.Section
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSectionFilter<$PrismaModel>
    _max?: NestedEnumSectionFilter<$PrismaModel>
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type CategoryTranslationCategoryIdLocaleCompoundUniqueInput = {
    categoryId: number
    locale: $Enums.Locale
  }

  export type CategoryTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryTranslationAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
  }

  export type CategoryTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryTranslationSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
  }

  export type SubcategoryTranslationListRelationFilter = {
    every?: SubcategoryTranslationWhereInput
    some?: SubcategoryTranslationWhereInput
    none?: SubcategoryTranslationWhereInput
  }

  export type SubcategoryTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubcategoryCountOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
  }

  export type SubcategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryMinOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategorySumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
  }

  export type SubcategoryScalarRelationFilter = {
    is?: SubcategoryWhereInput
    isNot?: SubcategoryWhereInput
  }

  export type SubcategoryTranslationSubcategoryIdLocaleCompoundUniqueInput = {
    subcategoryId: number
    locale: $Enums.Locale
  }

  export type SubcategoryTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryTranslationAvgOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
  }

  export type SubcategoryTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryTranslationSumOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
  }

  export type SubcategoryBrandSubcategoryIdBrandIdCompoundUniqueInput = {
    subcategoryId: number
    brandId: number
  }

  export type SubcategoryBrandCountOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryBrandAvgOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
  }

  export type SubcategoryBrandMaxOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryBrandMinOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubcategoryBrandSumOrderByAggregateInput = {
    id?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type SubcategoryNullableScalarRelationFilter = {
    is?: SubcategoryWhereInput | null
    isNot?: SubcategoryWhereInput | null
  }

  export type BrandNullableScalarRelationFilter = {
    is?: BrandWhereInput | null
    isNot?: BrandWhereInput | null
  }

  export type ProductTranslationListRelationFilter = {
    every?: ProductTranslationWhereInput
    some?: ProductTranslationWhereInput
    none?: ProductTranslationWhereInput
  }

  export type ProductSpecificationListRelationFilter = {
    every?: ProductSpecificationWhereInput
    some?: ProductSpecificationWhereInput
    none?: ProductSpecificationWhereInput
  }

  export type ProductImageListRelationFilter = {
    every?: ProductImageWhereInput
    some?: ProductImageWhereInput
    none?: ProductImageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductSpecificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    section?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    section?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
    section?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    subcategoryId?: SortOrder
    brandId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductTranslationProductIdLocaleCompoundUniqueInput = {
    productId: number
    locale: $Enums.Locale
  }

  export type ProductTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductTranslationAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
  }

  export type ProductTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    locale?: SortOrder
    name?: SortOrder
    description?: SortOrder
    shortDesc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductTranslationSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ProductSpecificationCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSpecificationAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
  }

  export type ProductSpecificationMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSpecificationMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSpecificationSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
  }

  export type ProductImageCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductImageAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
  }

  export type ProductImageMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductImageMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductImageSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    order?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BrandTranslationCreateNestedManyWithoutBrandInput = {
    create?: XOR<BrandTranslationCreateWithoutBrandInput, BrandTranslationUncheckedCreateWithoutBrandInput> | BrandTranslationCreateWithoutBrandInput[] | BrandTranslationUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: BrandTranslationCreateOrConnectWithoutBrandInput | BrandTranslationCreateOrConnectWithoutBrandInput[]
    createMany?: BrandTranslationCreateManyBrandInputEnvelope
    connect?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutBrandInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type SubcategoryBrandCreateNestedManyWithoutBrandInput = {
    create?: XOR<SubcategoryBrandCreateWithoutBrandInput, SubcategoryBrandUncheckedCreateWithoutBrandInput> | SubcategoryBrandCreateWithoutBrandInput[] | SubcategoryBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutBrandInput | SubcategoryBrandCreateOrConnectWithoutBrandInput[]
    createMany?: SubcategoryBrandCreateManyBrandInputEnvelope
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
  }

  export type BrandTranslationUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<BrandTranslationCreateWithoutBrandInput, BrandTranslationUncheckedCreateWithoutBrandInput> | BrandTranslationCreateWithoutBrandInput[] | BrandTranslationUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: BrandTranslationCreateOrConnectWithoutBrandInput | BrandTranslationCreateOrConnectWithoutBrandInput[]
    createMany?: BrandTranslationCreateManyBrandInputEnvelope
    connect?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type SubcategoryBrandUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<SubcategoryBrandCreateWithoutBrandInput, SubcategoryBrandUncheckedCreateWithoutBrandInput> | SubcategoryBrandCreateWithoutBrandInput[] | SubcategoryBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutBrandInput | SubcategoryBrandCreateOrConnectWithoutBrandInput[]
    createMany?: SubcategoryBrandCreateManyBrandInputEnvelope
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BrandTranslationUpdateManyWithoutBrandNestedInput = {
    create?: XOR<BrandTranslationCreateWithoutBrandInput, BrandTranslationUncheckedCreateWithoutBrandInput> | BrandTranslationCreateWithoutBrandInput[] | BrandTranslationUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: BrandTranslationCreateOrConnectWithoutBrandInput | BrandTranslationCreateOrConnectWithoutBrandInput[]
    upsert?: BrandTranslationUpsertWithWhereUniqueWithoutBrandInput | BrandTranslationUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: BrandTranslationCreateManyBrandInputEnvelope
    set?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    disconnect?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    delete?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    connect?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    update?: BrandTranslationUpdateWithWhereUniqueWithoutBrandInput | BrandTranslationUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: BrandTranslationUpdateManyWithWhereWithoutBrandInput | BrandTranslationUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: BrandTranslationScalarWhereInput | BrandTranslationScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutBrandInput | ProductUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutBrandInput | ProductUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutBrandInput | ProductUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type SubcategoryBrandUpdateManyWithoutBrandNestedInput = {
    create?: XOR<SubcategoryBrandCreateWithoutBrandInput, SubcategoryBrandUncheckedCreateWithoutBrandInput> | SubcategoryBrandCreateWithoutBrandInput[] | SubcategoryBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutBrandInput | SubcategoryBrandCreateOrConnectWithoutBrandInput[]
    upsert?: SubcategoryBrandUpsertWithWhereUniqueWithoutBrandInput | SubcategoryBrandUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: SubcategoryBrandCreateManyBrandInputEnvelope
    set?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    disconnect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    delete?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    update?: SubcategoryBrandUpdateWithWhereUniqueWithoutBrandInput | SubcategoryBrandUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: SubcategoryBrandUpdateManyWithWhereWithoutBrandInput | SubcategoryBrandUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: SubcategoryBrandScalarWhereInput | SubcategoryBrandScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BrandTranslationUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<BrandTranslationCreateWithoutBrandInput, BrandTranslationUncheckedCreateWithoutBrandInput> | BrandTranslationCreateWithoutBrandInput[] | BrandTranslationUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: BrandTranslationCreateOrConnectWithoutBrandInput | BrandTranslationCreateOrConnectWithoutBrandInput[]
    upsert?: BrandTranslationUpsertWithWhereUniqueWithoutBrandInput | BrandTranslationUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: BrandTranslationCreateManyBrandInputEnvelope
    set?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    disconnect?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    delete?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    connect?: BrandTranslationWhereUniqueInput | BrandTranslationWhereUniqueInput[]
    update?: BrandTranslationUpdateWithWhereUniqueWithoutBrandInput | BrandTranslationUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: BrandTranslationUpdateManyWithWhereWithoutBrandInput | BrandTranslationUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: BrandTranslationScalarWhereInput | BrandTranslationScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput> | ProductCreateWithoutBrandInput[] | ProductUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutBrandInput | ProductCreateOrConnectWithoutBrandInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutBrandInput | ProductUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ProductCreateManyBrandInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutBrandInput | ProductUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutBrandInput | ProductUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type SubcategoryBrandUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<SubcategoryBrandCreateWithoutBrandInput, SubcategoryBrandUncheckedCreateWithoutBrandInput> | SubcategoryBrandCreateWithoutBrandInput[] | SubcategoryBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutBrandInput | SubcategoryBrandCreateOrConnectWithoutBrandInput[]
    upsert?: SubcategoryBrandUpsertWithWhereUniqueWithoutBrandInput | SubcategoryBrandUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: SubcategoryBrandCreateManyBrandInputEnvelope
    set?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    disconnect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    delete?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    update?: SubcategoryBrandUpdateWithWhereUniqueWithoutBrandInput | SubcategoryBrandUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: SubcategoryBrandUpdateManyWithWhereWithoutBrandInput | SubcategoryBrandUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: SubcategoryBrandScalarWhereInput | SubcategoryBrandScalarWhereInput[]
  }

  export type BrandCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<BrandCreateWithoutTranslationsInput, BrandUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutTranslationsInput
    connect?: BrandWhereUniqueInput
  }

  export type EnumLocaleFieldUpdateOperationsInput = {
    set?: $Enums.Locale
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BrandUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<BrandCreateWithoutTranslationsInput, BrandUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutTranslationsInput
    upsert?: BrandUpsertWithoutTranslationsInput
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutTranslationsInput, BrandUpdateWithoutTranslationsInput>, BrandUncheckedUpdateWithoutTranslationsInput>
  }

  export type CategoryTranslationCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
  }

  export type SubcategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
  }

  export type SubcategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type EnumSectionFieldUpdateOperationsInput = {
    set?: $Enums.Section
  }

  export type CategoryTranslationUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    set?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    disconnect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    delete?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    update?: CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryTranslationUpdateManyWithWhereWithoutCategoryInput | CategoryTranslationUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
  }

  export type SubcategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: SubcategoryUpsertWithWhereUniqueWithoutCategoryInput | SubcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    set?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    disconnect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    delete?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    update?: SubcategoryUpdateWithWhereUniqueWithoutCategoryInput | SubcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: SubcategoryUpdateManyWithWhereWithoutCategoryInput | SubcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput> | CategoryTranslationCreateWithoutCategoryInput[] | CategoryTranslationUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryTranslationCreateOrConnectWithoutCategoryInput | CategoryTranslationCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryTranslationCreateManyCategoryInputEnvelope
    set?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    disconnect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    delete?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    connect?: CategoryTranslationWhereUniqueInput | CategoryTranslationWhereUniqueInput[]
    update?: CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput | CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryTranslationUpdateManyWithWhereWithoutCategoryInput | CategoryTranslationUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
  }

  export type SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput> | SubcategoryCreateWithoutCategoryInput[] | SubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: SubcategoryCreateOrConnectWithoutCategoryInput | SubcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: SubcategoryUpsertWithWhereUniqueWithoutCategoryInput | SubcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: SubcategoryCreateManyCategoryInputEnvelope
    set?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    disconnect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    delete?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    connect?: SubcategoryWhereUniqueInput | SubcategoryWhereUniqueInput[]
    update?: SubcategoryUpdateWithWhereUniqueWithoutCategoryInput | SubcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: SubcategoryUpdateManyWithWhereWithoutCategoryInput | SubcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTranslationsInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTranslationsInput
    upsert?: CategoryUpsertWithoutTranslationsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutTranslationsInput, CategoryUpdateWithoutTranslationsInput>, CategoryUncheckedUpdateWithoutTranslationsInput>
  }

  export type CategoryCreateNestedOneWithoutSubcategoriesInput = {
    create?: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubcategoriesInput
    connect?: CategoryWhereUniqueInput
  }

  export type SubcategoryTranslationCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<SubcategoryTranslationCreateWithoutSubcategoryInput, SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput> | SubcategoryTranslationCreateWithoutSubcategoryInput[] | SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput | SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput[]
    createMany?: SubcategoryTranslationCreateManySubcategoryInputEnvelope
    connect?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type SubcategoryBrandCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<SubcategoryBrandCreateWithoutSubcategoryInput, SubcategoryBrandUncheckedCreateWithoutSubcategoryInput> | SubcategoryBrandCreateWithoutSubcategoryInput[] | SubcategoryBrandUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutSubcategoryInput | SubcategoryBrandCreateOrConnectWithoutSubcategoryInput[]
    createMany?: SubcategoryBrandCreateManySubcategoryInputEnvelope
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
  }

  export type SubcategoryTranslationUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<SubcategoryTranslationCreateWithoutSubcategoryInput, SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput> | SubcategoryTranslationCreateWithoutSubcategoryInput[] | SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput | SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput[]
    createMany?: SubcategoryTranslationCreateManySubcategoryInputEnvelope
    connect?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type SubcategoryBrandUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<SubcategoryBrandCreateWithoutSubcategoryInput, SubcategoryBrandUncheckedCreateWithoutSubcategoryInput> | SubcategoryBrandCreateWithoutSubcategoryInput[] | SubcategoryBrandUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutSubcategoryInput | SubcategoryBrandCreateOrConnectWithoutSubcategoryInput[]
    createMany?: SubcategoryBrandCreateManySubcategoryInputEnvelope
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
  }

  export type CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput = {
    create?: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubcategoriesInput
    upsert?: CategoryUpsertWithoutSubcategoriesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutSubcategoriesInput, CategoryUpdateWithoutSubcategoriesInput>, CategoryUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type SubcategoryTranslationUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<SubcategoryTranslationCreateWithoutSubcategoryInput, SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput> | SubcategoryTranslationCreateWithoutSubcategoryInput[] | SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput | SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput[]
    upsert?: SubcategoryTranslationUpsertWithWhereUniqueWithoutSubcategoryInput | SubcategoryTranslationUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: SubcategoryTranslationCreateManySubcategoryInputEnvelope
    set?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    disconnect?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    delete?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    connect?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    update?: SubcategoryTranslationUpdateWithWhereUniqueWithoutSubcategoryInput | SubcategoryTranslationUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: SubcategoryTranslationUpdateManyWithWhereWithoutSubcategoryInput | SubcategoryTranslationUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: SubcategoryTranslationScalarWhereInput | SubcategoryTranslationScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSubcategoryInput | ProductUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSubcategoryInput | ProductUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSubcategoryInput | ProductUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type SubcategoryBrandUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<SubcategoryBrandCreateWithoutSubcategoryInput, SubcategoryBrandUncheckedCreateWithoutSubcategoryInput> | SubcategoryBrandCreateWithoutSubcategoryInput[] | SubcategoryBrandUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutSubcategoryInput | SubcategoryBrandCreateOrConnectWithoutSubcategoryInput[]
    upsert?: SubcategoryBrandUpsertWithWhereUniqueWithoutSubcategoryInput | SubcategoryBrandUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: SubcategoryBrandCreateManySubcategoryInputEnvelope
    set?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    disconnect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    delete?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    update?: SubcategoryBrandUpdateWithWhereUniqueWithoutSubcategoryInput | SubcategoryBrandUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: SubcategoryBrandUpdateManyWithWhereWithoutSubcategoryInput | SubcategoryBrandUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: SubcategoryBrandScalarWhereInput | SubcategoryBrandScalarWhereInput[]
  }

  export type SubcategoryTranslationUncheckedUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<SubcategoryTranslationCreateWithoutSubcategoryInput, SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput> | SubcategoryTranslationCreateWithoutSubcategoryInput[] | SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput | SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput[]
    upsert?: SubcategoryTranslationUpsertWithWhereUniqueWithoutSubcategoryInput | SubcategoryTranslationUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: SubcategoryTranslationCreateManySubcategoryInputEnvelope
    set?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    disconnect?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    delete?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    connect?: SubcategoryTranslationWhereUniqueInput | SubcategoryTranslationWhereUniqueInput[]
    update?: SubcategoryTranslationUpdateWithWhereUniqueWithoutSubcategoryInput | SubcategoryTranslationUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: SubcategoryTranslationUpdateManyWithWhereWithoutSubcategoryInput | SubcategoryTranslationUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: SubcategoryTranslationScalarWhereInput | SubcategoryTranslationScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput> | ProductCreateWithoutSubcategoryInput[] | ProductUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSubcategoryInput | ProductCreateOrConnectWithoutSubcategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSubcategoryInput | ProductUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: ProductCreateManySubcategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSubcategoryInput | ProductUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSubcategoryInput | ProductUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type SubcategoryBrandUncheckedUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<SubcategoryBrandCreateWithoutSubcategoryInput, SubcategoryBrandUncheckedCreateWithoutSubcategoryInput> | SubcategoryBrandCreateWithoutSubcategoryInput[] | SubcategoryBrandUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: SubcategoryBrandCreateOrConnectWithoutSubcategoryInput | SubcategoryBrandCreateOrConnectWithoutSubcategoryInput[]
    upsert?: SubcategoryBrandUpsertWithWhereUniqueWithoutSubcategoryInput | SubcategoryBrandUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: SubcategoryBrandCreateManySubcategoryInputEnvelope
    set?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    disconnect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    delete?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    connect?: SubcategoryBrandWhereUniqueInput | SubcategoryBrandWhereUniqueInput[]
    update?: SubcategoryBrandUpdateWithWhereUniqueWithoutSubcategoryInput | SubcategoryBrandUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: SubcategoryBrandUpdateManyWithWhereWithoutSubcategoryInput | SubcategoryBrandUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: SubcategoryBrandScalarWhereInput | SubcategoryBrandScalarWhereInput[]
  }

  export type SubcategoryCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<SubcategoryCreateWithoutTranslationsInput, SubcategoryUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutTranslationsInput
    connect?: SubcategoryWhereUniqueInput
  }

  export type SubcategoryUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<SubcategoryCreateWithoutTranslationsInput, SubcategoryUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutTranslationsInput
    upsert?: SubcategoryUpsertWithoutTranslationsInput
    connect?: SubcategoryWhereUniqueInput
    update?: XOR<XOR<SubcategoryUpdateToOneWithWhereWithoutTranslationsInput, SubcategoryUpdateWithoutTranslationsInput>, SubcategoryUncheckedUpdateWithoutTranslationsInput>
  }

  export type SubcategoryCreateNestedOneWithoutSubcategoryBrandsInput = {
    create?: XOR<SubcategoryCreateWithoutSubcategoryBrandsInput, SubcategoryUncheckedCreateWithoutSubcategoryBrandsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutSubcategoryBrandsInput
    connect?: SubcategoryWhereUniqueInput
  }

  export type BrandCreateNestedOneWithoutSubcategoryBrandsInput = {
    create?: XOR<BrandCreateWithoutSubcategoryBrandsInput, BrandUncheckedCreateWithoutSubcategoryBrandsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutSubcategoryBrandsInput
    connect?: BrandWhereUniqueInput
  }

  export type SubcategoryUpdateOneRequiredWithoutSubcategoryBrandsNestedInput = {
    create?: XOR<SubcategoryCreateWithoutSubcategoryBrandsInput, SubcategoryUncheckedCreateWithoutSubcategoryBrandsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutSubcategoryBrandsInput
    upsert?: SubcategoryUpsertWithoutSubcategoryBrandsInput
    connect?: SubcategoryWhereUniqueInput
    update?: XOR<XOR<SubcategoryUpdateToOneWithWhereWithoutSubcategoryBrandsInput, SubcategoryUpdateWithoutSubcategoryBrandsInput>, SubcategoryUncheckedUpdateWithoutSubcategoryBrandsInput>
  }

  export type BrandUpdateOneRequiredWithoutSubcategoryBrandsNestedInput = {
    create?: XOR<BrandCreateWithoutSubcategoryBrandsInput, BrandUncheckedCreateWithoutSubcategoryBrandsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutSubcategoryBrandsInput
    upsert?: BrandUpsertWithoutSubcategoryBrandsInput
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutSubcategoryBrandsInput, BrandUpdateWithoutSubcategoryBrandsInput>, BrandUncheckedUpdateWithoutSubcategoryBrandsInput>
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type SubcategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutProductsInput
    connect?: SubcategoryWhereUniqueInput
  }

  export type BrandCreateNestedOneWithoutProductsInput = {
    create?: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutProductsInput
    connect?: BrandWhereUniqueInput
  }

  export type ProductTranslationCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductTranslationCreateWithoutProductInput, ProductTranslationUncheckedCreateWithoutProductInput> | ProductTranslationCreateWithoutProductInput[] | ProductTranslationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductTranslationCreateOrConnectWithoutProductInput | ProductTranslationCreateOrConnectWithoutProductInput[]
    createMany?: ProductTranslationCreateManyProductInputEnvelope
    connect?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
  }

  export type ProductSpecificationCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductSpecificationCreateWithoutProductInput, ProductSpecificationUncheckedCreateWithoutProductInput> | ProductSpecificationCreateWithoutProductInput[] | ProductSpecificationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSpecificationCreateOrConnectWithoutProductInput | ProductSpecificationCreateOrConnectWithoutProductInput[]
    createMany?: ProductSpecificationCreateManyProductInputEnvelope
    connect?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
  }

  export type ProductImageCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type ProductTranslationUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductTranslationCreateWithoutProductInput, ProductTranslationUncheckedCreateWithoutProductInput> | ProductTranslationCreateWithoutProductInput[] | ProductTranslationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductTranslationCreateOrConnectWithoutProductInput | ProductTranslationCreateOrConnectWithoutProductInput[]
    createMany?: ProductTranslationCreateManyProductInputEnvelope
    connect?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
  }

  export type ProductSpecificationUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductSpecificationCreateWithoutProductInput, ProductSpecificationUncheckedCreateWithoutProductInput> | ProductSpecificationCreateWithoutProductInput[] | ProductSpecificationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSpecificationCreateOrConnectWithoutProductInput | ProductSpecificationCreateOrConnectWithoutProductInput[]
    createMany?: ProductSpecificationCreateManyProductInputEnvelope
    connect?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
  }

  export type ProductImageUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CategoryUpdateOneWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type SubcategoryUpdateOneWithoutProductsNestedInput = {
    create?: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SubcategoryCreateOrConnectWithoutProductsInput
    upsert?: SubcategoryUpsertWithoutProductsInput
    disconnect?: SubcategoryWhereInput | boolean
    delete?: SubcategoryWhereInput | boolean
    connect?: SubcategoryWhereUniqueInput
    update?: XOR<XOR<SubcategoryUpdateToOneWithWhereWithoutProductsInput, SubcategoryUpdateWithoutProductsInput>, SubcategoryUncheckedUpdateWithoutProductsInput>
  }

  export type BrandUpdateOneWithoutProductsNestedInput = {
    create?: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutProductsInput
    upsert?: BrandUpsertWithoutProductsInput
    disconnect?: BrandWhereInput | boolean
    delete?: BrandWhereInput | boolean
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutProductsInput, BrandUpdateWithoutProductsInput>, BrandUncheckedUpdateWithoutProductsInput>
  }

  export type ProductTranslationUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductTranslationCreateWithoutProductInput, ProductTranslationUncheckedCreateWithoutProductInput> | ProductTranslationCreateWithoutProductInput[] | ProductTranslationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductTranslationCreateOrConnectWithoutProductInput | ProductTranslationCreateOrConnectWithoutProductInput[]
    upsert?: ProductTranslationUpsertWithWhereUniqueWithoutProductInput | ProductTranslationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductTranslationCreateManyProductInputEnvelope
    set?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    disconnect?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    delete?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    connect?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    update?: ProductTranslationUpdateWithWhereUniqueWithoutProductInput | ProductTranslationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductTranslationUpdateManyWithWhereWithoutProductInput | ProductTranslationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductTranslationScalarWhereInput | ProductTranslationScalarWhereInput[]
  }

  export type ProductSpecificationUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductSpecificationCreateWithoutProductInput, ProductSpecificationUncheckedCreateWithoutProductInput> | ProductSpecificationCreateWithoutProductInput[] | ProductSpecificationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSpecificationCreateOrConnectWithoutProductInput | ProductSpecificationCreateOrConnectWithoutProductInput[]
    upsert?: ProductSpecificationUpsertWithWhereUniqueWithoutProductInput | ProductSpecificationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductSpecificationCreateManyProductInputEnvelope
    set?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    disconnect?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    delete?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    connect?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    update?: ProductSpecificationUpdateWithWhereUniqueWithoutProductInput | ProductSpecificationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductSpecificationUpdateManyWithWhereWithoutProductInput | ProductSpecificationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductSpecificationScalarWhereInput | ProductSpecificationScalarWhereInput[]
  }

  export type ProductImageUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductTranslationUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductTranslationCreateWithoutProductInput, ProductTranslationUncheckedCreateWithoutProductInput> | ProductTranslationCreateWithoutProductInput[] | ProductTranslationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductTranslationCreateOrConnectWithoutProductInput | ProductTranslationCreateOrConnectWithoutProductInput[]
    upsert?: ProductTranslationUpsertWithWhereUniqueWithoutProductInput | ProductTranslationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductTranslationCreateManyProductInputEnvelope
    set?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    disconnect?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    delete?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    connect?: ProductTranslationWhereUniqueInput | ProductTranslationWhereUniqueInput[]
    update?: ProductTranslationUpdateWithWhereUniqueWithoutProductInput | ProductTranslationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductTranslationUpdateManyWithWhereWithoutProductInput | ProductTranslationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductTranslationScalarWhereInput | ProductTranslationScalarWhereInput[]
  }

  export type ProductSpecificationUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductSpecificationCreateWithoutProductInput, ProductSpecificationUncheckedCreateWithoutProductInput> | ProductSpecificationCreateWithoutProductInput[] | ProductSpecificationUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductSpecificationCreateOrConnectWithoutProductInput | ProductSpecificationCreateOrConnectWithoutProductInput[]
    upsert?: ProductSpecificationUpsertWithWhereUniqueWithoutProductInput | ProductSpecificationUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductSpecificationCreateManyProductInputEnvelope
    set?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    disconnect?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    delete?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    connect?: ProductSpecificationWhereUniqueInput | ProductSpecificationWhereUniqueInput[]
    update?: ProductSpecificationUpdateWithWhereUniqueWithoutProductInput | ProductSpecificationUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductSpecificationUpdateManyWithWhereWithoutProductInput | ProductSpecificationUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductSpecificationScalarWhereInput | ProductSpecificationScalarWhereInput[]
  }

  export type ProductImageUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput> | ProductImageCreateWithoutProductInput[] | ProductImageUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductImageCreateOrConnectWithoutProductInput | ProductImageCreateOrConnectWithoutProductInput[]
    upsert?: ProductImageUpsertWithWhereUniqueWithoutProductInput | ProductImageUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductImageCreateManyProductInputEnvelope
    set?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    disconnect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    delete?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    connect?: ProductImageWhereUniqueInput | ProductImageWhereUniqueInput[]
    update?: ProductImageUpdateWithWhereUniqueWithoutProductInput | ProductImageUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductImageUpdateManyWithWhereWithoutProductInput | ProductImageUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<ProductCreateWithoutTranslationsInput, ProductUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutTranslationsInput
    connect?: ProductWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProductUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<ProductCreateWithoutTranslationsInput, ProductUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutTranslationsInput
    upsert?: ProductUpsertWithoutTranslationsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutTranslationsInput, ProductUpdateWithoutTranslationsInput>, ProductUncheckedUpdateWithoutTranslationsInput>
  }

  export type ProductCreateNestedOneWithoutSpecificationsInput = {
    create?: XOR<ProductCreateWithoutSpecificationsInput, ProductUncheckedCreateWithoutSpecificationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSpecificationsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutSpecificationsNestedInput = {
    create?: XOR<ProductCreateWithoutSpecificationsInput, ProductUncheckedCreateWithoutSpecificationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSpecificationsInput
    upsert?: ProductUpsertWithoutSpecificationsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSpecificationsInput, ProductUpdateWithoutSpecificationsInput>, ProductUncheckedUpdateWithoutSpecificationsInput>
  }

  export type ProductCreateNestedOneWithoutImagesInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutImagesInput
    upsert?: ProductUpsertWithoutImagesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutImagesInput, ProductUpdateWithoutImagesInput>, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumLocaleFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleFilter<$PrismaModel> | $Enums.Locale
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumLocaleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleWithAggregatesFilter<$PrismaModel> | $Enums.Locale
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocaleFilter<$PrismaModel>
    _max?: NestedEnumLocaleFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumSectionFilter<$PrismaModel = never> = {
    equals?: $Enums.Section | EnumSectionFieldRefInput<$PrismaModel>
    in?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionFilter<$PrismaModel> | $Enums.Section
  }

  export type NestedEnumSectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Section | EnumSectionFieldRefInput<$PrismaModel>
    in?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Section[] | ListEnumSectionFieldRefInput<$PrismaModel>
    not?: NestedEnumSectionWithAggregatesFilter<$PrismaModel> | $Enums.Section
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSectionFilter<$PrismaModel>
    _max?: NestedEnumSectionFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BrandTranslationCreateWithoutBrandInput = {
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandTranslationUncheckedCreateWithoutBrandInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandTranslationCreateOrConnectWithoutBrandInput = {
    where: BrandTranslationWhereUniqueInput
    create: XOR<BrandTranslationCreateWithoutBrandInput, BrandTranslationUncheckedCreateWithoutBrandInput>
  }

  export type BrandTranslationCreateManyBrandInputEnvelope = {
    data: BrandTranslationCreateManyBrandInput | BrandTranslationCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutBrandInput = {
    sku: string
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    subcategory?: SubcategoryCreateNestedOneWithoutProductsInput
    translations?: ProductTranslationCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutBrandInput = {
    id?: number
    sku: string
    categoryId: number
    subcategoryId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ProductTranslationUncheckedCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutBrandInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput>
  }

  export type ProductCreateManyBrandInputEnvelope = {
    data: ProductCreateManyBrandInput | ProductCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type SubcategoryBrandCreateWithoutBrandInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    subcategory: SubcategoryCreateNestedOneWithoutSubcategoryBrandsInput
  }

  export type SubcategoryBrandUncheckedCreateWithoutBrandInput = {
    id?: number
    subcategoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryBrandCreateOrConnectWithoutBrandInput = {
    where: SubcategoryBrandWhereUniqueInput
    create: XOR<SubcategoryBrandCreateWithoutBrandInput, SubcategoryBrandUncheckedCreateWithoutBrandInput>
  }

  export type SubcategoryBrandCreateManyBrandInputEnvelope = {
    data: SubcategoryBrandCreateManyBrandInput | SubcategoryBrandCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type BrandTranslationUpsertWithWhereUniqueWithoutBrandInput = {
    where: BrandTranslationWhereUniqueInput
    update: XOR<BrandTranslationUpdateWithoutBrandInput, BrandTranslationUncheckedUpdateWithoutBrandInput>
    create: XOR<BrandTranslationCreateWithoutBrandInput, BrandTranslationUncheckedCreateWithoutBrandInput>
  }

  export type BrandTranslationUpdateWithWhereUniqueWithoutBrandInput = {
    where: BrandTranslationWhereUniqueInput
    data: XOR<BrandTranslationUpdateWithoutBrandInput, BrandTranslationUncheckedUpdateWithoutBrandInput>
  }

  export type BrandTranslationUpdateManyWithWhereWithoutBrandInput = {
    where: BrandTranslationScalarWhereInput
    data: XOR<BrandTranslationUpdateManyMutationInput, BrandTranslationUncheckedUpdateManyWithoutBrandInput>
  }

  export type BrandTranslationScalarWhereInput = {
    AND?: BrandTranslationScalarWhereInput | BrandTranslationScalarWhereInput[]
    OR?: BrandTranslationScalarWhereInput[]
    NOT?: BrandTranslationScalarWhereInput | BrandTranslationScalarWhereInput[]
    id?: IntFilter<"BrandTranslation"> | number
    brandId?: IntFilter<"BrandTranslation"> | number
    locale?: EnumLocaleFilter<"BrandTranslation"> | $Enums.Locale
    name?: StringFilter<"BrandTranslation"> | string
    createdAt?: DateTimeFilter<"BrandTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"BrandTranslation"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutBrandInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutBrandInput, ProductUncheckedUpdateWithoutBrandInput>
    create: XOR<ProductCreateWithoutBrandInput, ProductUncheckedCreateWithoutBrandInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutBrandInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutBrandInput, ProductUncheckedUpdateWithoutBrandInput>
  }

  export type ProductUpdateManyWithWhereWithoutBrandInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutBrandInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    sku?: StringFilter<"Product"> | string
    categoryId?: IntFilter<"Product"> | number
    subcategoryId?: IntNullableFilter<"Product"> | number | null
    brandId?: IntNullableFilter<"Product"> | number | null
    section?: EnumSectionFilter<"Product"> | $Enums.Section
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type SubcategoryBrandUpsertWithWhereUniqueWithoutBrandInput = {
    where: SubcategoryBrandWhereUniqueInput
    update: XOR<SubcategoryBrandUpdateWithoutBrandInput, SubcategoryBrandUncheckedUpdateWithoutBrandInput>
    create: XOR<SubcategoryBrandCreateWithoutBrandInput, SubcategoryBrandUncheckedCreateWithoutBrandInput>
  }

  export type SubcategoryBrandUpdateWithWhereUniqueWithoutBrandInput = {
    where: SubcategoryBrandWhereUniqueInput
    data: XOR<SubcategoryBrandUpdateWithoutBrandInput, SubcategoryBrandUncheckedUpdateWithoutBrandInput>
  }

  export type SubcategoryBrandUpdateManyWithWhereWithoutBrandInput = {
    where: SubcategoryBrandScalarWhereInput
    data: XOR<SubcategoryBrandUpdateManyMutationInput, SubcategoryBrandUncheckedUpdateManyWithoutBrandInput>
  }

  export type SubcategoryBrandScalarWhereInput = {
    AND?: SubcategoryBrandScalarWhereInput | SubcategoryBrandScalarWhereInput[]
    OR?: SubcategoryBrandScalarWhereInput[]
    NOT?: SubcategoryBrandScalarWhereInput | SubcategoryBrandScalarWhereInput[]
    id?: IntFilter<"SubcategoryBrand"> | number
    subcategoryId?: IntFilter<"SubcategoryBrand"> | number
    brandId?: IntFilter<"SubcategoryBrand"> | number
    createdAt?: DateTimeFilter<"SubcategoryBrand"> | Date | string
    updatedAt?: DateTimeFilter<"SubcategoryBrand"> | Date | string
  }

  export type BrandCreateWithoutTranslationsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutBrandInput
    subcategoryBrands?: SubcategoryBrandCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutTranslationsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutBrandInput
    subcategoryBrands?: SubcategoryBrandUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutTranslationsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutTranslationsInput, BrandUncheckedCreateWithoutTranslationsInput>
  }

  export type BrandUpsertWithoutTranslationsInput = {
    update: XOR<BrandUpdateWithoutTranslationsInput, BrandUncheckedUpdateWithoutTranslationsInput>
    create: XOR<BrandCreateWithoutTranslationsInput, BrandUncheckedCreateWithoutTranslationsInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutTranslationsInput, BrandUncheckedUpdateWithoutTranslationsInput>
  }

  export type BrandUpdateWithoutTranslationsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutBrandNestedInput
    subcategoryBrands?: SubcategoryBrandUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutTranslationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutBrandNestedInput
    subcategoryBrands?: SubcategoryBrandUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type CategoryTranslationCreateWithoutCategoryInput = {
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryTranslationUncheckedCreateWithoutCategoryInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryTranslationCreateOrConnectWithoutCategoryInput = {
    where: CategoryTranslationWhereUniqueInput
    create: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryTranslationCreateManyCategoryInputEnvelope = {
    data: CategoryTranslationCreateManyCategoryInput | CategoryTranslationCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type SubcategoryCreateWithoutCategoryInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: SubcategoryTranslationCreateNestedManyWithoutSubcategoryInput
    products?: ProductCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutCategoryInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: SubcategoryTranslationUncheckedCreateNestedManyWithoutSubcategoryInput
    products?: ProductUncheckedCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type SubcategoryCreateManyCategoryInputEnvelope = {
    data: SubcategoryCreateManyCategoryInput | SubcategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCategoryInput = {
    sku: string
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    subcategory?: SubcategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    translations?: ProductTranslationCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: number
    sku: string
    subcategoryId?: number | null
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ProductTranslationUncheckedCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryTranslationUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoryTranslationWhereUniqueInput
    update: XOR<CategoryTranslationUpdateWithoutCategoryInput, CategoryTranslationUncheckedUpdateWithoutCategoryInput>
    create: XOR<CategoryTranslationCreateWithoutCategoryInput, CategoryTranslationUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryTranslationUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoryTranslationWhereUniqueInput
    data: XOR<CategoryTranslationUpdateWithoutCategoryInput, CategoryTranslationUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoryTranslationUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoryTranslationScalarWhereInput
    data: XOR<CategoryTranslationUpdateManyMutationInput, CategoryTranslationUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryTranslationScalarWhereInput = {
    AND?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
    OR?: CategoryTranslationScalarWhereInput[]
    NOT?: CategoryTranslationScalarWhereInput | CategoryTranslationScalarWhereInput[]
    id?: IntFilter<"CategoryTranslation"> | number
    categoryId?: IntFilter<"CategoryTranslation"> | number
    locale?: EnumLocaleFilter<"CategoryTranslation"> | $Enums.Locale
    name?: StringFilter<"CategoryTranslation"> | string
    createdAt?: DateTimeFilter<"CategoryTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryTranslation"> | Date | string
  }

  export type SubcategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    update: XOR<SubcategoryUpdateWithoutCategoryInput, SubcategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<SubcategoryCreateWithoutCategoryInput, SubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type SubcategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: SubcategoryWhereUniqueInput
    data: XOR<SubcategoryUpdateWithoutCategoryInput, SubcategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type SubcategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: SubcategoryScalarWhereInput
    data: XOR<SubcategoryUpdateManyMutationInput, SubcategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type SubcategoryScalarWhereInput = {
    AND?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
    OR?: SubcategoryScalarWhereInput[]
    NOT?: SubcategoryScalarWhereInput | SubcategoryScalarWhereInput[]
    id?: IntFilter<"Subcategory"> | number
    categoryId?: IntFilter<"Subcategory"> | number
    createdAt?: DateTimeFilter<"Subcategory"> | Date | string
    updatedAt?: DateTimeFilter<"Subcategory"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryCreateWithoutTranslationsInput = {
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    subcategories?: SubcategoryCreateNestedManyWithoutCategoryInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutTranslationsInput = {
    id?: number
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    subcategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutTranslationsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
  }

  export type CategoryUpsertWithoutTranslationsInput = {
    update: XOR<CategoryUpdateWithoutTranslationsInput, CategoryUncheckedUpdateWithoutTranslationsInput>
    create: XOR<CategoryCreateWithoutTranslationsInput, CategoryUncheckedCreateWithoutTranslationsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutTranslationsInput, CategoryUncheckedUpdateWithoutTranslationsInput>
  }

  export type CategoryUpdateWithoutTranslationsInput = {
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategories?: SubcategoryUpdateManyWithoutCategoryNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutTranslationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategories?: SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateWithoutSubcategoriesInput = {
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: CategoryTranslationCreateNestedManyWithoutCategoryInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutSubcategoriesInput = {
    id?: number
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutSubcategoriesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
  }

  export type SubcategoryTranslationCreateWithoutSubcategoryInput = {
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryTranslationCreateOrConnectWithoutSubcategoryInput = {
    where: SubcategoryTranslationWhereUniqueInput
    create: XOR<SubcategoryTranslationCreateWithoutSubcategoryInput, SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput>
  }

  export type SubcategoryTranslationCreateManySubcategoryInputEnvelope = {
    data: SubcategoryTranslationCreateManySubcategoryInput | SubcategoryTranslationCreateManySubcategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutSubcategoryInput = {
    sku: string
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    translations?: ProductTranslationCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSubcategoryInput = {
    id?: number
    sku: string
    categoryId: number
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ProductTranslationUncheckedCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSubcategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput>
  }

  export type ProductCreateManySubcategoryInputEnvelope = {
    data: ProductCreateManySubcategoryInput | ProductCreateManySubcategoryInput[]
    skipDuplicates?: boolean
  }

  export type SubcategoryBrandCreateWithoutSubcategoryInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    brand: BrandCreateNestedOneWithoutSubcategoryBrandsInput
  }

  export type SubcategoryBrandUncheckedCreateWithoutSubcategoryInput = {
    id?: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryBrandCreateOrConnectWithoutSubcategoryInput = {
    where: SubcategoryBrandWhereUniqueInput
    create: XOR<SubcategoryBrandCreateWithoutSubcategoryInput, SubcategoryBrandUncheckedCreateWithoutSubcategoryInput>
  }

  export type SubcategoryBrandCreateManySubcategoryInputEnvelope = {
    data: SubcategoryBrandCreateManySubcategoryInput | SubcategoryBrandCreateManySubcategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutSubcategoriesInput = {
    update: XOR<CategoryUpdateWithoutSubcategoriesInput, CategoryUncheckedUpdateWithoutSubcategoriesInput>
    create: XOR<CategoryCreateWithoutSubcategoriesInput, CategoryUncheckedCreateWithoutSubcategoriesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutSubcategoriesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutSubcategoriesInput, CategoryUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type CategoryUpdateWithoutSubcategoriesInput = {
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: CategoryTranslationUpdateManyWithoutCategoryNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutSubcategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type SubcategoryTranslationUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: SubcategoryTranslationWhereUniqueInput
    update: XOR<SubcategoryTranslationUpdateWithoutSubcategoryInput, SubcategoryTranslationUncheckedUpdateWithoutSubcategoryInput>
    create: XOR<SubcategoryTranslationCreateWithoutSubcategoryInput, SubcategoryTranslationUncheckedCreateWithoutSubcategoryInput>
  }

  export type SubcategoryTranslationUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: SubcategoryTranslationWhereUniqueInput
    data: XOR<SubcategoryTranslationUpdateWithoutSubcategoryInput, SubcategoryTranslationUncheckedUpdateWithoutSubcategoryInput>
  }

  export type SubcategoryTranslationUpdateManyWithWhereWithoutSubcategoryInput = {
    where: SubcategoryTranslationScalarWhereInput
    data: XOR<SubcategoryTranslationUpdateManyMutationInput, SubcategoryTranslationUncheckedUpdateManyWithoutSubcategoryInput>
  }

  export type SubcategoryTranslationScalarWhereInput = {
    AND?: SubcategoryTranslationScalarWhereInput | SubcategoryTranslationScalarWhereInput[]
    OR?: SubcategoryTranslationScalarWhereInput[]
    NOT?: SubcategoryTranslationScalarWhereInput | SubcategoryTranslationScalarWhereInput[]
    id?: IntFilter<"SubcategoryTranslation"> | number
    subcategoryId?: IntFilter<"SubcategoryTranslation"> | number
    locale?: EnumLocaleFilter<"SubcategoryTranslation"> | $Enums.Locale
    name?: StringFilter<"SubcategoryTranslation"> | string
    createdAt?: DateTimeFilter<"SubcategoryTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"SubcategoryTranslation"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutSubcategoryInput, ProductUncheckedUpdateWithoutSubcategoryInput>
    create: XOR<ProductCreateWithoutSubcategoryInput, ProductUncheckedCreateWithoutSubcategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutSubcategoryInput, ProductUncheckedUpdateWithoutSubcategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutSubcategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutSubcategoryInput>
  }

  export type SubcategoryBrandUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: SubcategoryBrandWhereUniqueInput
    update: XOR<SubcategoryBrandUpdateWithoutSubcategoryInput, SubcategoryBrandUncheckedUpdateWithoutSubcategoryInput>
    create: XOR<SubcategoryBrandCreateWithoutSubcategoryInput, SubcategoryBrandUncheckedCreateWithoutSubcategoryInput>
  }

  export type SubcategoryBrandUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: SubcategoryBrandWhereUniqueInput
    data: XOR<SubcategoryBrandUpdateWithoutSubcategoryInput, SubcategoryBrandUncheckedUpdateWithoutSubcategoryInput>
  }

  export type SubcategoryBrandUpdateManyWithWhereWithoutSubcategoryInput = {
    where: SubcategoryBrandScalarWhereInput
    data: XOR<SubcategoryBrandUpdateManyMutationInput, SubcategoryBrandUncheckedUpdateManyWithoutSubcategoryInput>
  }

  export type SubcategoryCreateWithoutTranslationsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutSubcategoriesInput
    products?: ProductCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutTranslationsInput = {
    id?: number
    categoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutTranslationsInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutTranslationsInput, SubcategoryUncheckedCreateWithoutTranslationsInput>
  }

  export type SubcategoryUpsertWithoutTranslationsInput = {
    update: XOR<SubcategoryUpdateWithoutTranslationsInput, SubcategoryUncheckedUpdateWithoutTranslationsInput>
    create: XOR<SubcategoryCreateWithoutTranslationsInput, SubcategoryUncheckedCreateWithoutTranslationsInput>
    where?: SubcategoryWhereInput
  }

  export type SubcategoryUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: SubcategoryWhereInput
    data: XOR<SubcategoryUpdateWithoutTranslationsInput, SubcategoryUncheckedUpdateWithoutTranslationsInput>
  }

  export type SubcategoryUpdateWithoutTranslationsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
    products?: ProductUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateWithoutTranslationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryCreateWithoutSubcategoryBrandsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutSubcategoriesInput
    translations?: SubcategoryTranslationCreateNestedManyWithoutSubcategoryInput
    products?: ProductCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutSubcategoryBrandsInput = {
    id?: number
    categoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: SubcategoryTranslationUncheckedCreateNestedManyWithoutSubcategoryInput
    products?: ProductUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutSubcategoryBrandsInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutSubcategoryBrandsInput, SubcategoryUncheckedCreateWithoutSubcategoryBrandsInput>
  }

  export type BrandCreateWithoutSubcategoryBrandsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: BrandTranslationCreateNestedManyWithoutBrandInput
    products?: ProductCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutSubcategoryBrandsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: BrandTranslationUncheckedCreateNestedManyWithoutBrandInput
    products?: ProductUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutSubcategoryBrandsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutSubcategoryBrandsInput, BrandUncheckedCreateWithoutSubcategoryBrandsInput>
  }

  export type SubcategoryUpsertWithoutSubcategoryBrandsInput = {
    update: XOR<SubcategoryUpdateWithoutSubcategoryBrandsInput, SubcategoryUncheckedUpdateWithoutSubcategoryBrandsInput>
    create: XOR<SubcategoryCreateWithoutSubcategoryBrandsInput, SubcategoryUncheckedCreateWithoutSubcategoryBrandsInput>
    where?: SubcategoryWhereInput
  }

  export type SubcategoryUpdateToOneWithWhereWithoutSubcategoryBrandsInput = {
    where?: SubcategoryWhereInput
    data: XOR<SubcategoryUpdateWithoutSubcategoryBrandsInput, SubcategoryUncheckedUpdateWithoutSubcategoryBrandsInput>
  }

  export type SubcategoryUpdateWithoutSubcategoryBrandsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
    translations?: SubcategoryTranslationUpdateManyWithoutSubcategoryNestedInput
    products?: ProductUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateWithoutSubcategoryBrandsInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: SubcategoryTranslationUncheckedUpdateManyWithoutSubcategoryNestedInput
    products?: ProductUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type BrandUpsertWithoutSubcategoryBrandsInput = {
    update: XOR<BrandUpdateWithoutSubcategoryBrandsInput, BrandUncheckedUpdateWithoutSubcategoryBrandsInput>
    create: XOR<BrandCreateWithoutSubcategoryBrandsInput, BrandUncheckedCreateWithoutSubcategoryBrandsInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutSubcategoryBrandsInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutSubcategoryBrandsInput, BrandUncheckedUpdateWithoutSubcategoryBrandsInput>
  }

  export type BrandUpdateWithoutSubcategoryBrandsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: BrandTranslationUpdateManyWithoutBrandNestedInput
    products?: ProductUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutSubcategoryBrandsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: BrandTranslationUncheckedUpdateManyWithoutBrandNestedInput
    products?: ProductUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type CategoryCreateWithoutProductsInput = {
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: CategoryTranslationCreateNestedManyWithoutCategoryInput
    subcategories?: SubcategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: number
    section: $Enums.Section
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: CategoryTranslationUncheckedCreateNestedManyWithoutCategoryInput
    subcategories?: SubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type SubcategoryCreateWithoutProductsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutSubcategoriesInput
    translations?: SubcategoryTranslationCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryUncheckedCreateWithoutProductsInput = {
    id?: number
    categoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: SubcategoryTranslationUncheckedCreateNestedManyWithoutSubcategoryInput
    subcategoryBrands?: SubcategoryBrandUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type SubcategoryCreateOrConnectWithoutProductsInput = {
    where: SubcategoryWhereUniqueInput
    create: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
  }

  export type BrandCreateWithoutProductsInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: BrandTranslationCreateNestedManyWithoutBrandInput
    subcategoryBrands?: SubcategoryBrandCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutProductsInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: BrandTranslationUncheckedCreateNestedManyWithoutBrandInput
    subcategoryBrands?: SubcategoryBrandUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutProductsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
  }

  export type ProductTranslationCreateWithoutProductInput = {
    locale: $Enums.Locale
    name: string
    description?: string | null
    shortDesc?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductTranslationUncheckedCreateWithoutProductInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    description?: string | null
    shortDesc?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductTranslationCreateOrConnectWithoutProductInput = {
    where: ProductTranslationWhereUniqueInput
    create: XOR<ProductTranslationCreateWithoutProductInput, ProductTranslationUncheckedCreateWithoutProductInput>
  }

  export type ProductTranslationCreateManyProductInputEnvelope = {
    data: ProductTranslationCreateManyProductInput | ProductTranslationCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductSpecificationCreateWithoutProductInput = {
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductSpecificationUncheckedCreateWithoutProductInput = {
    id?: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductSpecificationCreateOrConnectWithoutProductInput = {
    where: ProductSpecificationWhereUniqueInput
    create: XOR<ProductSpecificationCreateWithoutProductInput, ProductSpecificationUncheckedCreateWithoutProductInput>
  }

  export type ProductSpecificationCreateManyProductInputEnvelope = {
    data: ProductSpecificationCreateManyProductInput | ProductSpecificationCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductImageCreateWithoutProductInput = {
    url: string
    alt?: string | null
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductImageUncheckedCreateWithoutProductInput = {
    id?: number
    url: string
    alt?: string | null
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductImageCreateOrConnectWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageCreateManyProductInputEnvelope = {
    data: ProductImageCreateManyProductInput | ProductImageCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: CategoryTranslationUpdateManyWithoutCategoryNestedInput
    subcategories?: SubcategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: CategoryTranslationUncheckedUpdateManyWithoutCategoryNestedInput
    subcategories?: SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type SubcategoryUpsertWithoutProductsInput = {
    update: XOR<SubcategoryUpdateWithoutProductsInput, SubcategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<SubcategoryCreateWithoutProductsInput, SubcategoryUncheckedCreateWithoutProductsInput>
    where?: SubcategoryWhereInput
  }

  export type SubcategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: SubcategoryWhereInput
    data: XOR<SubcategoryUpdateWithoutProductsInput, SubcategoryUncheckedUpdateWithoutProductsInput>
  }

  export type SubcategoryUpdateWithoutProductsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
    translations?: SubcategoryTranslationUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: SubcategoryTranslationUncheckedUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type BrandUpsertWithoutProductsInput = {
    update: XOR<BrandUpdateWithoutProductsInput, BrandUncheckedUpdateWithoutProductsInput>
    create: XOR<BrandCreateWithoutProductsInput, BrandUncheckedCreateWithoutProductsInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutProductsInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutProductsInput, BrandUncheckedUpdateWithoutProductsInput>
  }

  export type BrandUpdateWithoutProductsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: BrandTranslationUpdateManyWithoutBrandNestedInput
    subcategoryBrands?: SubcategoryBrandUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: BrandTranslationUncheckedUpdateManyWithoutBrandNestedInput
    subcategoryBrands?: SubcategoryBrandUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type ProductTranslationUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductTranslationWhereUniqueInput
    update: XOR<ProductTranslationUpdateWithoutProductInput, ProductTranslationUncheckedUpdateWithoutProductInput>
    create: XOR<ProductTranslationCreateWithoutProductInput, ProductTranslationUncheckedCreateWithoutProductInput>
  }

  export type ProductTranslationUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductTranslationWhereUniqueInput
    data: XOR<ProductTranslationUpdateWithoutProductInput, ProductTranslationUncheckedUpdateWithoutProductInput>
  }

  export type ProductTranslationUpdateManyWithWhereWithoutProductInput = {
    where: ProductTranslationScalarWhereInput
    data: XOR<ProductTranslationUpdateManyMutationInput, ProductTranslationUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductTranslationScalarWhereInput = {
    AND?: ProductTranslationScalarWhereInput | ProductTranslationScalarWhereInput[]
    OR?: ProductTranslationScalarWhereInput[]
    NOT?: ProductTranslationScalarWhereInput | ProductTranslationScalarWhereInput[]
    id?: IntFilter<"ProductTranslation"> | number
    productId?: IntFilter<"ProductTranslation"> | number
    locale?: EnumLocaleFilter<"ProductTranslation"> | $Enums.Locale
    name?: StringFilter<"ProductTranslation"> | string
    description?: StringNullableFilter<"ProductTranslation"> | string | null
    shortDesc?: StringNullableFilter<"ProductTranslation"> | string | null
    createdAt?: DateTimeFilter<"ProductTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"ProductTranslation"> | Date | string
  }

  export type ProductSpecificationUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductSpecificationWhereUniqueInput
    update: XOR<ProductSpecificationUpdateWithoutProductInput, ProductSpecificationUncheckedUpdateWithoutProductInput>
    create: XOR<ProductSpecificationCreateWithoutProductInput, ProductSpecificationUncheckedCreateWithoutProductInput>
  }

  export type ProductSpecificationUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductSpecificationWhereUniqueInput
    data: XOR<ProductSpecificationUpdateWithoutProductInput, ProductSpecificationUncheckedUpdateWithoutProductInput>
  }

  export type ProductSpecificationUpdateManyWithWhereWithoutProductInput = {
    where: ProductSpecificationScalarWhereInput
    data: XOR<ProductSpecificationUpdateManyMutationInput, ProductSpecificationUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductSpecificationScalarWhereInput = {
    AND?: ProductSpecificationScalarWhereInput | ProductSpecificationScalarWhereInput[]
    OR?: ProductSpecificationScalarWhereInput[]
    NOT?: ProductSpecificationScalarWhereInput | ProductSpecificationScalarWhereInput[]
    id?: IntFilter<"ProductSpecification"> | number
    productId?: IntFilter<"ProductSpecification"> | number
    key?: StringFilter<"ProductSpecification"> | string
    value?: StringFilter<"ProductSpecification"> | string
    createdAt?: DateTimeFilter<"ProductSpecification"> | Date | string
    updatedAt?: DateTimeFilter<"ProductSpecification"> | Date | string
  }

  export type ProductImageUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    update: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
    create: XOR<ProductImageCreateWithoutProductInput, ProductImageUncheckedCreateWithoutProductInput>
  }

  export type ProductImageUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductImageWhereUniqueInput
    data: XOR<ProductImageUpdateWithoutProductInput, ProductImageUncheckedUpdateWithoutProductInput>
  }

  export type ProductImageUpdateManyWithWhereWithoutProductInput = {
    where: ProductImageScalarWhereInput
    data: XOR<ProductImageUpdateManyMutationInput, ProductImageUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductImageScalarWhereInput = {
    AND?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    OR?: ProductImageScalarWhereInput[]
    NOT?: ProductImageScalarWhereInput | ProductImageScalarWhereInput[]
    id?: IntFilter<"ProductImage"> | number
    productId?: IntFilter<"ProductImage"> | number
    url?: StringFilter<"ProductImage"> | string
    alt?: StringNullableFilter<"ProductImage"> | string | null
    order?: IntFilter<"ProductImage"> | number
    createdAt?: DateTimeFilter<"ProductImage"> | Date | string
    updatedAt?: DateTimeFilter<"ProductImage"> | Date | string
  }

  export type ProductCreateWithoutTranslationsInput = {
    sku: string
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    subcategory?: SubcategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    specifications?: ProductSpecificationCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutTranslationsInput = {
    id?: number
    sku: string
    categoryId: number
    subcategoryId?: number | null
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    specifications?: ProductSpecificationUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutTranslationsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutTranslationsInput, ProductUncheckedCreateWithoutTranslationsInput>
  }

  export type ProductUpsertWithoutTranslationsInput = {
    update: XOR<ProductUpdateWithoutTranslationsInput, ProductUncheckedUpdateWithoutTranslationsInput>
    create: XOR<ProductCreateWithoutTranslationsInput, ProductUncheckedCreateWithoutTranslationsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutTranslationsInput, ProductUncheckedUpdateWithoutTranslationsInput>
  }

  export type ProductUpdateWithoutTranslationsInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    subcategory?: SubcategoryUpdateOneWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    specifications?: ProductSpecificationUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutTranslationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    specifications?: ProductSpecificationUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutSpecificationsInput = {
    sku: string
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    subcategory?: SubcategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    translations?: ProductTranslationCreateNestedManyWithoutProductInput
    images?: ProductImageCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSpecificationsInput = {
    id?: number
    sku: string
    categoryId: number
    subcategoryId?: number | null
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ProductTranslationUncheckedCreateNestedManyWithoutProductInput
    images?: ProductImageUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSpecificationsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSpecificationsInput, ProductUncheckedCreateWithoutSpecificationsInput>
  }

  export type ProductUpsertWithoutSpecificationsInput = {
    update: XOR<ProductUpdateWithoutSpecificationsInput, ProductUncheckedUpdateWithoutSpecificationsInput>
    create: XOR<ProductCreateWithoutSpecificationsInput, ProductUncheckedCreateWithoutSpecificationsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSpecificationsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSpecificationsInput, ProductUncheckedUpdateWithoutSpecificationsInput>
  }

  export type ProductUpdateWithoutSpecificationsInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    subcategory?: SubcategoryUpdateOneWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    translations?: ProductTranslationUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSpecificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ProductTranslationUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutImagesInput = {
    sku: string
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutProductsInput
    subcategory?: SubcategoryCreateNestedOneWithoutProductsInput
    brand?: BrandCreateNestedOneWithoutProductsInput
    translations?: ProductTranslationCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutImagesInput = {
    id?: number
    sku: string
    categoryId: number
    subcategoryId?: number | null
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    translations?: ProductTranslationUncheckedCreateNestedManyWithoutProductInput
    specifications?: ProductSpecificationUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutImagesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
  }

  export type ProductUpsertWithoutImagesInput = {
    update: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
    create: XOR<ProductCreateWithoutImagesInput, ProductUncheckedCreateWithoutImagesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutImagesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutImagesInput, ProductUncheckedUpdateWithoutImagesInput>
  }

  export type ProductUpdateWithoutImagesInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    subcategory?: SubcategoryUpdateOneWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    translations?: ProductTranslationUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ProductTranslationUncheckedUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUncheckedUpdateManyWithoutProductNestedInput
  }

  export type BrandTranslationCreateManyBrandInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyBrandInput = {
    id?: number
    sku: string
    categoryId: number
    subcategoryId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryBrandCreateManyBrandInput = {
    id?: number
    subcategoryId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BrandTranslationUpdateWithoutBrandInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandTranslationUncheckedUpdateWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandTranslationUncheckedUpdateManyWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutBrandInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    subcategory?: SubcategoryUpdateOneWithoutProductsNestedInput
    translations?: ProductTranslationUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ProductTranslationUncheckedUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryBrandUpdateWithoutBrandInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategory?: SubcategoryUpdateOneRequiredWithoutSubcategoryBrandsNestedInput
  }

  export type SubcategoryBrandUncheckedUpdateWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    subcategoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryBrandUncheckedUpdateManyWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    subcategoryId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryTranslationCreateManyCategoryInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryCreateManyCategoryInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyCategoryInput = {
    id?: number
    sku: string
    subcategoryId?: number | null
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryTranslationUpdateWithoutCategoryInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryTranslationUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryTranslationUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryUpdateWithoutCategoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: SubcategoryTranslationUpdateManyWithoutSubcategoryNestedInput
    products?: ProductUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: SubcategoryTranslationUncheckedUpdateManyWithoutSubcategoryNestedInput
    products?: ProductUncheckedUpdateManyWithoutSubcategoryNestedInput
    subcategoryBrands?: SubcategoryBrandUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type SubcategoryUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategory?: SubcategoryUpdateOneWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    translations?: ProductTranslationUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ProductTranslationUncheckedUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    subcategoryId?: NullableIntFieldUpdateOperationsInput | number | null
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryTranslationCreateManySubcategoryInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManySubcategoryInput = {
    id?: number
    sku: string
    categoryId: number
    brandId?: number | null
    section: $Enums.Section
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryBrandCreateManySubcategoryInput = {
    id?: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubcategoryTranslationUpdateWithoutSubcategoryInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryTranslationUncheckedUpdateWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryTranslationUncheckedUpdateManyWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutSubcategoryInput = {
    sku?: StringFieldUpdateOperationsInput | string
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    brand?: BrandUpdateOneWithoutProductsNestedInput
    translations?: ProductTranslationUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUpdateManyWithoutProductNestedInput
    images?: ProductImageUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    translations?: ProductTranslationUncheckedUpdateManyWithoutProductNestedInput
    specifications?: ProductSpecificationUncheckedUpdateManyWithoutProductNestedInput
    images?: ProductImageUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    sku?: StringFieldUpdateOperationsInput | string
    categoryId?: IntFieldUpdateOperationsInput | number
    brandId?: NullableIntFieldUpdateOperationsInput | number | null
    section?: EnumSectionFieldUpdateOperationsInput | $Enums.Section
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryBrandUpdateWithoutSubcategoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateOneRequiredWithoutSubcategoryBrandsNestedInput
  }

  export type SubcategoryBrandUncheckedUpdateWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubcategoryBrandUncheckedUpdateManyWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductTranslationCreateManyProductInput = {
    id?: number
    locale: $Enums.Locale
    name: string
    description?: string | null
    shortDesc?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductSpecificationCreateManyProductInput = {
    id?: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductImageCreateManyProductInput = {
    id?: number
    url: string
    alt?: string | null
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductTranslationUpdateWithoutProductInput = {
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    shortDesc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductTranslationUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    shortDesc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductTranslationUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    shortDesc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSpecificationUpdateWithoutProductInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSpecificationUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductSpecificationUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUpdateWithoutProductInput = {
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductImageUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}