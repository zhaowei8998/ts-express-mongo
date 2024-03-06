-- `weilun-financial`.admin_role definition
CREATE TABLE `admin_role` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `userId` int(11) DEFAULT NULL,
    `roleId` int(11) DEFAULT NULL,
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE,
    KEY `idx_admin_role_userId` (`userId`) USING BTREE,
    KEY `idx_admin_role_roleId` (`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;