-- Tắt chế độ kiểm tra khóa ngoại để tránh lỗi khi xóa
SET foreign_key_checks = 0;

-- Xóa tất cả các bảng
DROP TABLE IF EXISTS `order_detail`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `product_price`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `product_size`;
DROP TABLE IF EXISTS `report`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `store`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `report_detail`;

-- Bật lại kiểm tra khóa ngoại
SET foreign_key_checks = 1;
