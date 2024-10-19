export function convertDataCreatePROD(data: any) {
    if (data.price) {
        data.price = parseInt(data.price.trim());
    }
    if (data.rating) {
        data.rating = parseInt(data.rating.trim());
    }
    if (data.quantity) {
        data.quantity = parseInt(data.quantity.trim());
    }
    if (data.categoryId) {
        data.categoryId = parseInt(data.categoryId.trim());
    }
    if (data.subCategoryId) {
        data.subCategoryId = JSON.parse(data.subCategoryId);
    }

    return data;
}