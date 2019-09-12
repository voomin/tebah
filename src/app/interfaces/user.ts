export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
    admin?:boolean;
    rating_name?: string;
}
export interface AdminUserData{
    uid:string;
    createTime?:number;
}
export interface ProductBasket{
    id?: string;
    package_id:string;
    package_title:string;
    package_count:number;
    package_total_price:number;
    package_point_availability:boolean;
}