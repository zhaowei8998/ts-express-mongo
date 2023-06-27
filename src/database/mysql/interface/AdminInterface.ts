interface AdminInterface {
    id?: number,
    name: string,
    gender: string,
    phone: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    status?:number
}
export { AdminInterface }
