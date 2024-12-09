import CartRepository from "../repositories/implementations/CartRepository";
import ProductService from "./ProductService";

class CartService {
    
    private cartRepository: CartRepository;
    private productService: ProductService;

    constructor() {
        this.cartRepository = new CartRepository();
        this.productService = new ProductService();
    }

    async createCart(object: any) {
        if (!object.productIds || !Array.isArray(object.productIds) || object.productIds.length === 0) {
            throw new Error("Invalid or missing 'productIds'. Expected a non-empty array.");
        }
    
        const searchProduct = await this.productService.findProductsByIds(object.productIds);
    
        if (!searchProduct || searchProduct.length === 0) {
            throw new Error("No products available to create a cart.");
        }
    
        const quantityProduct = searchProduct.length;
        const totalValue = searchProduct.reduce((sum, product) => sum + product.price * product.quantity, 0);
        const productIds = searchProduct.map(product => product.id);
            
        const cart = await this.cartRepository.save({
            personId: object.personId,
            productIds: productIds,
            quantity: quantityProduct,
            total: totalValue, 
        });
    
        return cart;
    }

    async findAllCarts() {
        const carts = await this.cartRepository.findAll();
        return carts;
    }

    async findCartById(id: number) {
        const cart = await this.cartRepository.findById(id);
        return cart;
    }

    async updateCart(id: number, object: any) {
        const searchCart = await this.cartRepository.findById(id);
    
        if (!searchCart) {
            throw new Error(`Cart with ID ${id} not found`);
        }

        const { personId, productIds} = object;
        searchCart.personId = personId;    
        searchCart.productIds = productIds;
            
        const savedCart = await this.cartRepository.update(searchCart);
        return savedCart;        
    }

    async deleteCart(id: number) {
        const searchCart = await this.cartRepository.findById(id);
        await this.cartRepository.delete(searchCart);
    }

}

export default CartService;