export interface RecipeType{
    id:number
    name: string,
    preparation_time: number,
    base64image: string,
    explanation: string,
    materials: string[],
    category: Category,
    user_id: UserType
}
export interface RecipeListProps{
    filteredRecipes: RecipeType[] | undefined
}
export interface UserType {
    id:number,
    email:string,
    username:string,
    password:string,
    base64image:string
    accountNonExpired:boolean,
    accountNonLocked:boolean,
    account_active:boolean,
    authorities:{
        authority:string
    },
    credentialsNonExpired:boolean,
    enabled:boolean,
    role:{
        id:number,
        name:string
    }
}
export interface Category{
    id:number,
    name:string
}