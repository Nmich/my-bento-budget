export type Category = {
    id:string,
    user_id: string | null,
    type: 'essentielle' | 'non-essentielle',
    name:string,
    created_at: Date
}

export type CategoryResponse = {
    id: string,
    type: 'essentielle' | 'non-essentielle',
    name: string,
}
