-- `weilun-financial`.menu definition
CREATE TABLE `menu` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `parentId` int(11) DEFAULT NULL COMMENT '父菜单Id',
    `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '菜单';