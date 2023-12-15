-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2023 at 07:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET sql_require_primary_key = 0; 
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
-- 
-- --
-- -- Database: `wata_project_db`
-- --


--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(10) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `order_status` enum('pending','processing','done','cancelled','shipping','payment') NOT NULL,
  `fee_transport` double(10,2) DEFAULT NULL,
  `total_price_product` double(10,2) NOT NULL,
  `order_price` double(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(10) NOT NULL,
  `store_id` int(10) NOT NULL,
  `order_address` varchar(255) NOT NULL,
  `recipient_name` varchar(255) NOT NULL,
  `recipient_phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_detail_id` int(10) NOT NULL,
  `quantity` tinyint(4) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_size_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(10) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_slug` varchar(255) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_desc` varchar(255) NOT NULL,
  `category` enum('food','drink','topping') NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_slug`, `product_image`, `product_desc`, `category`, `is_deleted`) VALUES
(1, 'Pizza Margherita', 'pizza-margherita', 'pizzaTop/products/PizzaMargherita_jicwui.jpg', 'Classic Margherita Pizza', 'food', 0),
(2, 'Pizza BBQ Chicken', 'pizza-bbq-chicken', 'pizzaTop/products/PizzaBBQChicken_giijpo.jpg', 'Savory BBQ Chicken Pizza', 'food', 0),
(3, 'Pizza Cheese', 'pizza-cheese', 'pizzaTop/products/pizzaCheese_fdgs47.jpg', 'Pizza Cheese aaaaa', 'food', 0),
(4, 'Coca Cola', 'coca-cola', 'pizzaTop/products/coca_cmbw0t.jpg', 'Refreshing Soda', 'drink', 0),
(5, 'Sting','sting','pizzaTop/products/Sting_smca5t.webp','Sting provip123','drink',0),
(6, 'Cheese','cheese','pizzaTop/products/cheese_qdftox.jpg','Topping cheese provip','topping',0),
(7, 'Chicken', 'chicken','pizzaTop/products/chicken_hsb1k7.jpg','Topping chicken dry','topping',0),
(8, 'Pepperoni Pizza', 'pepperoni-pizza', NULL, 'Classic Pepperoni Pizza', 'food', 0),
(9, 'Sprite', 'sprite', NULL, 'Refreshing Lemon-Lime Soda', 'drink', 0),
(10, 'Olives', 'olives', NULL, 'Topping Olives', 'topping', 0),
(11, 'Veggie Wrap', 'veggie-wrap', NULL, 'Healthy Vegetable Wrap', 'food', 0),
(12, 'Iced Tea', 'iced-tea', NULL, 'Iced Tea with Lemon', 'drink', 0),
(13, 'Tomatoes', 'tomatoes', NULL, 'Topping Tomatoes', 'topping', 0),
(14, 'Margarita', 'margarita', NULL, 'Classic Margarita Drink', 'drink', 0),
(15, 'Onions', 'onions', NULL, 'Topping Onions', 'topping', 0),
(16, 'Chocolate Shake', 'chocolate-shake', NULL, 'Creamy Chocolate Shake', 'drink', 0),
(17, 'Bell Peppers', 'bell-peppers', NULL, 'Topping Bell Peppers', 'topping', 0),
(18, 'Mushroom Pizza', 'mushroom-pizza', NULL, 'Savory Mushroom Pizza', 'food', 0),
(19, 'Lemonade', 'lemonade', NULL, 'Freshly Squeezed Lemonade', 'drink', 0),
(20, 'Sausage', 'sausage', NULL, 'Topping Sausage', 'topping', 0),
(21, 'BBQ Tofu Pizza', 'bbq-tofu-pizza', NULL, 'Barbecue Tofu Pizza', 'food', 0),
(22, 'Ginger Ale', 'ginger-ale', NULL, 'Spicy Ginger Ale', 'drink', 0),
(23, 'Jalapeños', 'jalapenos', NULL, 'Spicy Topping Jalapeños', 'topping', 0),
(24, 'Chicken Alfredo Pizza', 'chicken-alfredo-pizza', NULL, 'Creamy Chicken Alfredo Pizza', 'food', 0),
(25, 'Lime Soda', 'lime-soda', NULL, 'Zesty Lime Soda', 'drink', 0),
(26, 'Feta Cheese', 'feta-cheese', NULL, 'Topping Feta Cheese', 'topping', 0),
(27, 'Mint Mojito', 'mint-mojito', NULL, 'Refreshing Mint Mojito', 'drink', 0),
(28, 'Spinach', 'spinach', NULL, 'Healthy Topping Spinach', 'topping', 0),
(29, 'Banana Smoothie', 'banana-smoothie', NULL, 'Creamy Banana Smoothie', 'drink', 0),
(30, 'Artichokes', 'artichokes', NULL, 'Topping Artichokes', 'topping', 0);
-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `product_size_id` int(10) NOT NULL,
  `size_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product_size`
--

INSERT INTO `product_size` (`product_size_id`, `size_name`) VALUES
(1, 'Small'),
(2, 'Medium'),
(3, 'Large');

-- --------------------------------------------------------

--
-- Table structure for table `product_price`
--

CREATE TABLE `product_price` (
  `product_price_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_size_id` int(10) NOT NULL,
  `product_price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product_price`
--
INSERT INTO `product_price` (`product_price_id`,`product_id`,`product_size_id`,`product_price`) VALUES
(1,1,1,150000.00),
(2,1,2,200000.00),
(3,1,3,250000.00),
(4,2,1,199000.00),
(5,2,2,220000.00),
(6,2,3,300000.00),
(7,3,1,99000.00),
(8,3,2,120000.00),
(9,3,3,170000.00),
(10,4,1,15000.00),
(11,4,2,25000.00),
(12,5,1,15000.00),
(13,5,2,25000.00),
(14,6,1,35000.00),
(15,7,1,70000.00),
(16, 8, 1, -- Giá tiền cho Pepperoni Pizza - Small
150000.00),
(17, 8, 2, -- Giá tiền cho Pepperoni Pizza - Medium
200000.00),
(18, 8, 3, -- Giá tiền cho Pepperoni Pizza - Large
250000.00),
(19, 9, 1, -- Giá tiền cho Sprite - Small
199000.00),
(20, 9, 2, -- Giá tiền cho Sprite - Medium
220000.00),
(21, 9, 3, -- Giá tiền cho Sprite - Large
300000.00),
(22, 10, 1, -- Giá tiền cho Olives Topping - Small
99000.00),
(23, 10, 2, -- Giá tiền cho Olives Topping - Medium
120000.00),
(24, 10, 3, -- Giá tiền cho Olives Topping - Large
170000.00),
(25, 11, 1, -- Giá tiền cho Veggie Wrap - Small
15000.00),
(26, 11, 2, -- Giá tiền cho Veggie Wrap - Medium
25000.00),
(27, 12, 1, -- Giá tiền cho Iced Tea - Small
15000.00),
(28, 12, 2, -- Giá tiền cho Iced Tea - Medium
25000.00),
(29, 13, 1, -- Giá tiền cho Tomatoes Topping - Small
35000.00),
(30, 14, 1, -- Giá tiền cho Margarita Drink - Small
70000.00),
(31, 15, 1, -- Giá tiền cho Onions Topping - Small
15000.00),
(32, 16, 1, -- Giá tiền cho Chocolate Shake - Small
15000.00),
(33, 17, 1, -- Giá tiền cho Bell Peppers Topping - Small
25000.00),
(34, 18, 1, -- Giá tiền cho Mushroom Pizza - Small
15000.00),
(35, 18, 2, -- Giá tiền cho Mushroom Pizza - Medium
25000.00),
(36, 19, 1, -- Giá tiền cho Lemonade - Small
35000.00),
(37, 19, 2, -- Giá tiền cho Lemonade - Medium
70000.00),
(38, 20, 1, -- Giá tiền cho Sausage Topping - Small
99000.00),
(39, 21, 1, -- Giá tiền cho BBQ Tofu Pizza - Small
120000.00),
(40, 22, 1, -- Giá tiền cho Ginger Ale - Small
170000.00),
(41, 23, 1, -- Giá tiền cho Jalapeños Topping - Small
15000.00),
(42, 24, 1, -- Giá tiền cho Chicken Alfredo Pizza - Small
25000.00),
(43, 25, 1, -- Giá tiền cho Lime Soda - Small
15000.00),
(44, 26, 1, -- Giá tiền cho Feta Cheese Topping - Small
25000.00),
(45, 27, 1, -- Giá tiền cho Mint Mojito - Small
35000.00),
(46, 28, 1, -- Giá tiền cho Spinach Topping - Small
70000.00),
(47, 29, 1, -- Giá tiền cho Banana Smoothie - Small
15000.00),
(48, 30, 1, 25000.00);
-- --------------------------------------------------------



--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(10) NOT NULL,
  `create_date` date NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `report_revenue` double(12,2) NOT NULL,
  `report_total_order` int(10) NOT NULL,
  `report_desc` varchar(255) DEFAULT NULL,
  `store_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `report_detail` (
  `report_detail_id` int(10) NOT NULL,
  `report_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_size` varchar(255) NOT NULL,
  `sale_quantity` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(10) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'Customer'),
(3, 'Staff');

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `store_id` int(10) NOT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `store_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`store_id`, `store_name`, `store_address`) VALUES
(1, 'SuperMart', '123 Main Street'),
(2, 'QuickBites', '456 Oak Avenue');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_phone` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
	`token` varchar(255) DEFAULT NULL,
	`verify_token` varchar(255) DEFAULT NULL,
  `role_id` int(10) NOT NULL DEFAULT 2,
  `store_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `full_name`, `user_address`, `user_phone`, `user_email`, `role_id`, `store_id`) VALUES
(1, 'admin', '$2b$10$zo9zE9vvYuhe6Qu35eYtEO5CwmztN5MwL9Fj0sjBkTW8vu9GQvY0S', 'Admin', '1234/ad/d', '0778070683', 'abc@gmail.com', 1, NULL),
(2, 'Tuan', '$2b$10$zo9zE9vvYuhe6Qu35eYtEO5CwmztN5MwL9Fj0sjBkTW8vu9GQvY0S', 'NAT', '123 Duong A, Phuong B, Quan C, HCM', '0147483647', 'nat21102002@gmail.com', 1, NULL),
(3, 'Tan', '$2b$10$zo9zE9vvYuhe6Qu35eYtEO5CwmztN5MwL9Fj0sjBkTW8vu9GQvY0S', 'MinhTan', 'a/b/c', '0778070683', 'tanvo9927@gmail.com', 1, NULL);

-- password Tuan/Tan: 888888888
--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `product_size_id` (`product_size_id`);
 

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`product_size_id`);
 
--
-- Indexes for table `product_price`
--
ALTER TABLE `product_price`
  ADD PRIMARY KEY (`product_price_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `product_size_id` (`product_size_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `report_id` (`report_id`),
  ADD KEY `store_id` (`store_id`);
 
 --
-- Indexes for table `report_detail`
--
ALTER TABLE `report_detail`
  ADD PRIMARY KEY (`report_detail_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `store_id` (`store_id`);


--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `order_detail_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
 
--
-- AUTO_INCREMENT for table `product_price`
--
ALTER TABLE `product_price`
  MODIFY `product_price_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `product_size_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
 
 --
-- AUTO_INCREMENT for table `report_detail`
--
ALTER TABLE `report_detail`
  MODIFY `report_detail_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `order_detail_ibfk_3` FOREIGN KEY (`product_size_id`) REFERENCES `product_size` (`product_size_id`);

--
-- Constraints for table `product price`
--
ALTER TABLE `product_price`
   ADD CONSTRAINT `product_price_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
   ADD CONSTRAINT `product_price_ibfk_2` FOREIGN KEY (`product_size_id`) REFERENCES `product_size` (`product_size_id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);
 
--
-- Constraints for table `order_detail`
--
ALTER TABLE `report_detail`
  ADD CONSTRAINT `report_detail_ibfk_1` FOREIGN KEY (`report_id`) REFERENCES `report` (`report_id`),
  ADD CONSTRAINT `report_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;