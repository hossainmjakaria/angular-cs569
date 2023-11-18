export type User = {
    _id: string,
    fullname: string,
    email: string,
    password: string
}

export type JWT = {
    _id: string,
    fullname: string,
    email: string
}

export type Image = {
    _id: string,
    filename: string,
    originalname: string
}

export type Review = {
    _id: string,
    review: string,
    rating: number,
    by: {
        user_id: string,
        fullname: string
    },
    date: number,
    enableUpdate: boolean
}

export type Owner = {
    user_id: string,
    fullname: string,
    email: string
}

export type Medication = {
    _id: string,
    name: string,
    first_letter: string,
    generic_name: string,
    medication_class: string,
    availability: string,
    image: Image,
    added_by: Owner,
    reviews: Review[]
}

export type IResponse<T> = {
    success: boolean,
    data: T
}

export enum Availability {
    Prescription = 'Prescription',
    OTC = 'OTC'
}

export const LETTER_SET = new Set<string>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
