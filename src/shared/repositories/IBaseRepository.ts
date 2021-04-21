export interface IBase<T, ICreate> {
  create(body: ICreate): Promise<boolean>;
  findOneOrFail(id: string): Promise<T>;
  update(body: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
