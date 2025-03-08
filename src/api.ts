import axios, { AxiosInstance, AxiosResponse } from "axios";
import firebase from "firebase/app";
import "firebase/auth";

export enum ORDER_STATUS {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    IN_TRANSIT = 'IN TRANSIT',
    DELIVERED = 'DELIVERED'
}

export interface Paginated<T> {
    data: T[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        totalPages: number;
    }
}

export interface UserDetail {
    lastName: string;
    firstName: string;
    middleName: string;
}

export interface AppUser {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
    phoneNumber: string;
    disabled: boolean;
    userDetail: UserDetail;
}

export interface Resource {
    id: number;
    urls: {
        info: string;
        file: string;
    }
}

export interface Category {
    name: string;
    description: string;
    enabled: boolean;
    thumbnail: Resource;
    children: Category[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: Category;
    thumbnail: Resource;
    images: Resource[];
    enabled: boolean;
}


export interface Cart {
    uuid: string;
    isCheckedOut: boolean;
    dateCheckedOut: Date;
    dateDeleted: Date;
    cartItems: CartItem[];
}
export interface CartItem {
    product: Product;
    quantity: number;
}

export interface PaymentMethod {
    name: string;
    description: string;
    additionalNotes: string;
    enabled: boolean;
}

export interface Address {
    line1: string;
    line2: string;
    cityMunicipality: string;
    province: string;
    zipCode: string;
    recipientName: string;
    contactNumber: string;
}

export interface Order {
    cart: Cart;
    status: ORDER_STATUS;
    address: Address[];
    paymentMethod: PaymentMethod;
}

export class Api {
    private readonly axiosInstance: AxiosInstance;
    constructor(baseURL: string, private readonly user?: firebase.User) {
        this.axiosInstance = axios.create({baseURL});
    }

    getMe = async (): Promise<AxiosResponse<AppUser>> => {
        if(!this.user) {
            throw new Error('Firebase user not available')
        }
        return await this.axiosInstance.get('v1/users/me', {headers: {Authorization: `Bearer ${await this.user.getIdToken()}`}})
    }

    getUsers = async (props: {page?: number; size?: number;}) => {
        if(!this.user) {
            throw new Error('Firebase user not available')
        }
        const { page, size } = props;
        const params = new URLSearchParams();
        if(page) {
            params.append('page', `${page}`);
        }
        if(size) {
            params.append('size', `${size}`);
        }
        return await this.axiosInstance.get('/v1/users', {headers: {Authorization: `Bearer ${await this.user.getIdToken()}`}, params})
    }

    getPaymentMethods = async (props: {page?: number; size?: number }): Promise<AxiosResponse<Paginated<PaymentMethod>>> => {
        const { page, size } = props
        const params = new URLSearchParams();
        if(page) {
            params.append('page', `${page}`);
        }
        if(size) {
            params.append('size', `${size}`)
        }
        return await this.axiosInstance.get('/v1/payment-method', { params })
    }

    getProducts = async (props: {page?: number; size?: number}): Promise<AxiosResponse<Paginated<Product>>> => {
        const { page, size } = props;
        const params = new URLSearchParams();
        if(page) {
            params.append('page', `${page}`);
        }
        if(size) {
            params.append('size', `${size}`);
        }
        return await this.axiosInstance.get('/v1/products', {params})
    }
    getCategoriesTree = async (): Promise<AxiosResponse<Category>> => {
        return await this.axiosInstance.get('/v1/categories/tree')
    }
    getCategories = async (props: {page?: number; size?: number}): Promise<AxiosResponse<Paginated<Category>>> => {
        const { page, size } = props;
        const params = new URLSearchParams();
        if(page) {
            params.append('page', `${page}`);
        }
        if(size) {
            params.append('size', `${size}`);
        }
        return await this.axiosInstance.get('/v1/categories', { params })
    }
    getResources = async (props: {page?: number; size?: number;}): Promise<AxiosResponse<Paginated<Resource>>> => {
        const {page, size} = props;
        const params = new URLSearchParams();
        if(page) {
            params.append('page', `${page}`);
        }
        if(size) {
            params.append('size', `${size}`);
        }
        return await this.axiosInstance.get('/v1/resource', { params })
    }
    getOrders = async (props: {page?: number; size?: number;}): Promise<AxiosResponse<Paginated<Order>>> => {
        const {page, size} = props;
        const params = new URLSearchParams();
        if(page) {
            params.append('page', `${page}`);
        }
        if(size) {
            params.append('size', `${size}`);
        }
        if(!this.user) {
            throw new Error('Firebase user not available')
        }
        return await this.axiosInstance.get('/v1/orders', { headers: {Authorization: `Bearer ${await this.user.getIdToken()}`}, params });
    }
        createProduct = async (productData: Product): Promise<AxiosResponse<Product>> => {
            if (!this.user) {
                throw new Error('Firebase user not available');
            }
            return await this.axiosInstance.post('/v1/products', productData, {
                headers: { Authorization: `Bearer ${await this.user.getIdToken()}` }
            });
        }
        
        updateProduct = async (productId: string, updatedData: Partial<Product>): Promise<AxiosResponse<Product>> => {
            if (!this.user) {
                throw new Error('Firebase user not available');
            }
            return await this.axiosInstance.put(`/v1/products/${productId}`, updatedData, {
                headers: { Authorization: `Bearer ${await this.user.getIdToken()}` }
            });
        }
        
        deleteProduct = async (productId: string): Promise<AxiosResponse<void>> => {
            if (!this.user) {
                throw new Error('Firebase user not available');
            }
            return await this.axiosInstance.delete(`/v1/products/${productId}`, {
                headers: { Authorization: `Bearer ${await this.user.getIdToken()}` }
            });
        }
        
 }
