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
export interface RecipeSideBarProps{
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    setSelectedCategory:React.Dispatch<React.SetStateAction<string>>
    setSelectedMaterials:React.Dispatch<React.SetStateAction<string[]>>
    selectedMaterials:string[]
    selectedCategory:string
}
export interface Comments{
    id:number,
    recipeeId:number,
    userId:number,
    userName:string,
    comment:string,
    base64image:string,
    time:string
}