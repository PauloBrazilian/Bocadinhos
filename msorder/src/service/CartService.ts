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
        const searchProduct = await this.productService.findProductById(object.productId);
        
        const cart = await this.cartRepository.save({
            personId: searchProduct.id,
            productIds: object.productId
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