import { Category } from "../../entity/Category";

describe('Category Entity', () => {

    it('should create a category with the correct properties', () => {        
        const category = new Category();
        category.id = 1;
        category.categoryName = 'Electronics';
        
        expect(category).toBeDefined();
        expect(category.id).toBe(1);
        expect(category.categoryName).toBe('Electronics');
    });

    it('should allow setting and getting the category name', () => {
        const category = new Category();
        category.categoryName = 'Books';
        
        expect(category.categoryName).toBe('Books');        
        category.categoryName = 'Movies';        
        expect(category.categoryName).toBe('Movies');
    });

    it('should allow setting and getting the id', () => {
        const category = new Category();
        category.id = 10;
        expect(category.id).toBe(10);
    });

});
