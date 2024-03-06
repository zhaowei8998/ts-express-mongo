-- `weilun-financial`.auth_token definition
CREATE TABLE `auth_token` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `userId` int(11) DEFAULT NULL,
    `token` varchar(50) DEFAULT NULL,
    `status` tinyint(4) DEFAULT '1' COMMENT 'token状态，1：有效，2：失效',
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_auth_token_userId` (`userId`),
    KEY `idx_auth_token_token` (`token`)
) ENGINE = InnoDB AUTO_INCREMENT = 1872 DEFAULT CHARSET = utf8mb4;