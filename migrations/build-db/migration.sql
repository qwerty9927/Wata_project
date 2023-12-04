-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2023 at 07:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- -- --------------------------------------------------------
-- 
-- --
-- -- Table structure for table `delivery`
-- --

-- CREATE TABLE `delivery` (
--   `delivery_id` int(10) NOT NULL,
--   `sender_name` varchar(255) NOT NULL,
--   `sender_phone` int(11) NOT NULL,
--   `recipient_name` varchar(255) NOT NULL,
--   `recipient_phone` varchar(255) NOT NULL,
--   `recipient_address` varchar(255) NOT NULL,
--   `delivery_date` date DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `delivery`
--

-- INSERT INTO `delivery` (`delivery_id`, `sender_name`, `sender_phone`, `recipient_name`, `recipient_phone`, `recipient_address`, `delivery_date`) VALUES
-- (1, 'John Doe', 2147483647, 'Alice Smith', 2147483647, '456 Maple Street', '2023-01-10'),
-- (2, 'Jane Doe', 2147483647, 'Bob Johnson', 2147483647, '789 Birch Lane', '2023-01-15');

-- --------------------------------------------------------

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

--
-- Dumping data for table `order`
--

-- INSERT INTO `order` (`order_id`, `order_code`, `order_status`, `fee_transport`, `total_price_product`, `order_price`, `order_date`, `user_id`, `store_id`, `delivery_id`) VALUES
-- (1, 'ORD123', 'pending', 5.00, 1.00, 15.99, '2023-01-10 05:30:00', 2, 1, 1),
-- (2, 'ORD456', 'processing', 3.00, 2.00, 23.98, '2023-01-15 07:45:00', 3, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_detail_id` int(10) NOT NULL,
  `quantity_buy` tinyint(4) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_size_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `order_detail`
--

-- INSERT INTO `order_detail` (`order_detail_id`, `quantity_buy`, `order_id`, `product_id`) VALUES
-- (1, 1, 1, 1),
-- (2, 2, 2, 2);

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
(7, 'Chicken', 'chicken','pizzaTop/products/chicken_hsb1k7.jpg','Topping chicken dry','topping',0);
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
(15,7,1,70000.00);
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
  `quantity_buy` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `report`
--
-- 
-- INSERT INTO `report` (`report_id`, `report_date`, `report_revenue`, `report_total_order`, `report_desc`, `store_id`) VALUES
-- (1, '2023-01-10', 15.99, 1, 'Daily report for SuperMart', 1),
-- (2, '2023-01-15', 23.98, 1, 'Daily report for QuickBites', 2);

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
-- Indexes for table `delivery`
--
-- ALTER TABLE `delivery`
--   ADD PRIMARY KEY (`delivery_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `store_id` (`store_id`);
--   ADD KEY `delivery_id` (`delivery_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `delivery`
--
-- ALTER TABLE `delivery`
--   MODIFY `delivery_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
--   ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`delivery_id`) REFERENCES `delivery` (`delivery_id`);

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