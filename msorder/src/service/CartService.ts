import CartRepository from "../repositories/implementations/CartRepository";

class CartService {
    
    private cartRepository: CartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async createCart(object: any) {
        const cart = await this.cartRepository.save({
            personId: object.personId,
            productId: object.productId
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

        const { personId, productId } = object;
    
        searchCart.personId = personId;    
        searchCart.productId = productId;
            
        const savedCart = await this.cartRepository.update(searchCart);
        return savedCart;        
    }

    async deleteCart(id: number) {
        const searchCart = await this.cartRepository.findById(id);
        await this.cartRepository.delete(searchCart);
    }

}

export default CartService;