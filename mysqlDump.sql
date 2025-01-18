-- Dump do banco de dados: nome_do_banco
-- Gerado por mysqldump em: 2025-01-17 14:00:00

-- Criando banco de dados
CREATE DATABASE IF NOT EXISTS `inventech`;
USE `inventech`;

-- Criando a tabela 'products'
CREATE TABLE IF NOT EXISTS `products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nameProduct` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `price` FLOAT DEFAULT NULL,
  `image` BLOB DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criando a tabela 'stock'
CREATE TABLE IF NOT EXISTS `stock` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productId` BIGINT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_product_id`
    FOREIGN KEY (`productId`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criando a tabela 'users'
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;