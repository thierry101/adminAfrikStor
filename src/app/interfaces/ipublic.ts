export interface Ipublic {
    id: number;
    first_name: string,
    last_name: string,
    email: string,
    role: string,
    password: string,
    password_confirm: string,
    image: any,
    phone: string,
    accountMoney: string,
    statut: boolean
}


export interface Icategory {
    id: number
    name: string,
    image: string,
    description: string,
    statut: boolean,
}

export interface ISubcategory {
    id: number,
    category: Icategory,
    name: string,
    image: string,
    description: string,
    statut: boolean,
}

export interface Isize {
    id: number,
    name: string,
    statut: boolean,
}

export interface Icolor {
    name: string,
    code: string,
}

export interface Ibrand {
    id: number,
    name: string,
    image: string,
    description: string,
    statut: boolean
}

export interface IsettingSite {
    mtnMoney: number;
    orangeMoney: number;
    id: number,
    logo: string,
    fav_icon: string,
    phone: number,
    email: string,
    localisation: string,
    link_whatsapp: string,
    link_messenger: string,
    link_facebook: string,
}


export interface IconfigRule {
    confidentiality: string,
    rulerSeller: string,
    rulerBuyer: string,
}

export interface Iprovider {
    id: number,
    name: string,
    surname: string,
    email: string,
    country: string,
    city: string,
    phone: number,
    brand: string,
    brandd: Ibrand,
    entreprise: string,
    state: string,
    name_product: string,
    image: string,
    statut: boolean,
}

export interface Iadvert {
    id: number;
    title: string,
    brand: Ibrand,
    begin_date: string,
    end_date: string,
    statut: boolean,
    img: string,
}

export interface Iproduct {
    user: Ipublic,
    id: number,
    category: Icategory,
    subCategory: ISubcategory,
    title: string,
    brand: Ibrand,
    price: number,
    sold_price: number,
    mainImg: string,
    secondImg: string,
    tableOtherImg: [],
    tableColorImg: [],
    tabOtherImgs: any,
    colorimgs: any,
    colors: any,
    sizes: [],
    description: string,
    availability: boolean,
    validateProd: boolean,
    rejectReason: string,
}