export interface GetAllProducts {
    products: AllProducts[],
    isNext: boolean
}

export interface AllProducts {
    id:string,
    productName:string,
    price:number,
    stock:number,
    thumbnailSource:string,
    sellerFullName:string,
    averageScore:number,
    sellerImage:string,
    createdAt:Date,
    totalSold:number
    rowVersion:string
}
