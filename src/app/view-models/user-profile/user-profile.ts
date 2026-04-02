export interface UserProfile {
    data:{
        firstName:string,
        lastName:string,
        userName:string,
        email:string,
        phoneNumber:string,
        picture:string,
        roles: string[],
        sellerRoleRequestStatus:string
    },
    errorsKeyValue:{
        key:string,
        errors: string[]
    }[]
}