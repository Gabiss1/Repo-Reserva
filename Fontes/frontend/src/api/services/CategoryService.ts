import api from "../api";
import { Category } from "../types/entities/Category";
import { CreateCategoryRequest } from "../types/creates/CreateCategoryRequest";
import { UpdateCategoryRequest } from "../types/updates/UpdateCategoryRequest";

export async function getCategories(): Promise<Category[]> {

    const response =
        await api.get("/categories");

    return response.data;

}

export async function createCategory(
    category: CreateCategoryRequest,
): Promise<Category> {

    const response =
        await api.post(
            "/categories",
            category,
        );

    return response.data;

}

export async function getCategoryById(
    id: string,
): Promise<Category> {

    const response =
        await api.get(`/categories/${id}`);

    return response.data;

}

export async function updateCategory(
    id: string,
    category: UpdateCategoryRequest,
): Promise<Category> {

    const response =
        await api.patch(
            `/categories/${id}`,
            category,
        );

    return response.data;

}


export async function deleteCategory(
    id: string,
): Promise<void> {

    await api.delete(
        `/categories/${id}`,
    );

}