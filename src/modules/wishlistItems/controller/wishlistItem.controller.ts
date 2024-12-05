import { Body, Controller, Get, Param, Post, Query, HttpException, HttpStatus } from "@nestjs/common";
import { WishlistItemService } from "../services/wishlistItem.service";

@Controller("wishlistItems")  // Sửa lại chính tả controller
export class WishlistsItemController {
    constructor(
        private readonly wishlistsItemService: WishlistItemService,
    ) {}

    // Lấy tất cả sản phẩm trong wishlist
    @Get()
    async getAllWishlistsItems(@Query("userId") userId: string) {
        const parsedUserId = parseInt(userId, 10);
        if (!parsedUserId) {
            throw new HttpException("User ID is required", HttpStatus.BAD_REQUEST);
        }
        return this.wishlistsItemService.getAllWishlistItems(parsedUserId);
    }

    // Thêm Product vào wishlist
    @Post("add/:productId")
    async addProductToWishList(@Body() body, @Param("productId") productId: number) {
        const userId = body.userId;
        if (!userId) {
            throw new HttpException("User ID is required", HttpStatus.BAD_REQUEST);
        }

        try {
            const result = await this.wishlistsItemService.addToProductWishList(userId, productId);
            return result;
        } catch (error) {
            if (error.response && error.response.statusCode === 409) {
                // Trả về lỗi khi sản phẩm đã có trong wishlist
                throw new HttpException(error.response.message, HttpStatus.CONFLICT);
            } else {
                // Các lỗi khác (ví dụ: lỗi khi không tìm thấy người dùng hoặc sản phẩm)
                throw new HttpException(error.response.message, HttpStatus.NOT_FOUND);
            }
        }
    }
}
