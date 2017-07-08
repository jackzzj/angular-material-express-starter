interface IBaseCtrl {

  // Get all
  getAll(req: any, res: any): void;

  // Count all
  count(req: any, res: any): void;

  // Insert
  insert(req: any, res: any): void;

  // Get by id
  get(req: any, res: any): void;

  // Update by id
  update(req: any, res: any): void;

  // Delete by id
  delete(req: any, res: any): void;
}

export default IBaseCtrl;
