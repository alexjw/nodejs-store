import CartItemInterface from "./cart-item";

export default interface CartInterface {
    total: number,
    items: CartItemInterface[]
}
