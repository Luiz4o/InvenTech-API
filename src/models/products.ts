export interface Product {
    id: string
    nameProduct: string
    price: number
    description: string
    image: Buffer | null
    quantity?: number
}