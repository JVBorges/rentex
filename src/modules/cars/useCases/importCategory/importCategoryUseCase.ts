import fs from 'fs';
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
  
      const parseFile = parse();
  
      stream.pipe(parseFile);
  
      parseFile.on('data', (line) => {
        const [ name, description ] = line;
        categories.push({ name, description });
      })
      .on('end', () => {
        fs.promises.unlink(file.path);
        resolve(categories)
      })
      .on('error', () => reject(categories));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    
    for (const category of categories) {
      const { name, description } = category;

      const foundedCategory = await this.categoriesRepository.findByName(name);

      if (!foundedCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    }
  }
}

export { ImportCategoryUseCase }