export interface ProductDetailsVm {
getProductByIdReviewsDTO: getProductByIdReviewsDTO[]
description:string;
id:string;
thumbnail: string;
price: number;
stock:number;
name:string;
isWishlisted:boolean;
}

export interface getProductByIdReviewsDTO{
    review:string;
    user:string;
    stars:number
}
