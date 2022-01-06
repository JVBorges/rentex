import { v4 as uuidV4 } from 'uuid';

class Specification {
  id?: String;
  name: String;
  description: String;
  created_at: Date;

  constructor() {
    this.id = this.id ?? uuidV4();
  }
}

export { Specification }